from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List

import numpy as np
import pandas as pd

from backend.schemas import (
    FAUpgradesRequest,
    LeagueLoadRequest,
    LineupRecommendRequest,
    ModelBacktestAutoRequest,
    ModelBacktestRequest,
    TradeEvaluateRequest,
    TradeTargetsRequest,
    ValuationRequest,
)
from lineup_optimizer import (
    LineupConfig,
    default_config,
    fa_upgrade_suggestions,
    prepare_fa_pool,
    project_points_this_week,
    recommend_lineup_with_cfg,
)
from sleeper_pull import fetch_league_data
from team_tools import (
    give_list_for_partner,
    pos_strength_table,
    quick_balance_score,
    receive_list_from_partner,
    team_needs,
    trade_targets_for_team,
)
from value_engine import attach_markets, compute_true_value


def build_valuations(request: ValuationRequest) -> List[Dict[str, Any]]:
    if not request.roster:
        return []

    roster_df = pd.DataFrame([p.model_dump() for p in request.roster])
    weekly_df = None
    market_df = None
    fallback_df = None

    if request.weekly:
        weekly_df = pd.DataFrame([w.model_dump() for w in request.weekly])
    if request.market:
        market_df = pd.DataFrame([m.model_dump() for m in request.market])
    if request.fallback_market:
        fallback_df = pd.DataFrame([m.model_dump() for m in request.fallback_market])

    out = compute_true_value(
        roster_df=roster_df,
        superflex=request.superflex,
        te_premium=request.te_premium,
        ppr=request.ppr,
        age_weight=request.age_weight,
        youth_bonus=request.youth_bonus,
        age_cap=request.age_cap,
        weekly_df=weekly_df,
    )

    if market_df is not None or fallback_df is not None:
        out = attach_markets(
            out,
            dp_df=market_df,
            fp_df=fallback_df,
            w_dp=request.w_dp,
            w_fp=request.w_fp,
        )

    def _out_num(col: str, default: float = np.nan) -> pd.Series:
        if col in out.columns:
            return pd.to_numeric(out[col], errors="coerce")
        return pd.Series(default, index=out.index, dtype=float)

    out["true_value"] = _out_num("true_value", 0.0).fillna(0.0)
    out["confidence"] = _out_num("confidence", 0.55).fillna(0.55).clip(0.0, 1.0)
    out["market_value"] = _out_num("market_value", np.nan)
    out["games"] = _out_num("games", 0.0).fillna(0.0)
    out["mean_var"] = _out_num("mean_var", 0.0).fillna(0.0)
    out["std_var"] = _out_num("std_var", 0.0).fillna(0.0)

    # Guardrail: when production evidence is weak (or no weekly payload), anchor closer to market.
    has_market = out["market_value"].notna() & (out["market_value"] > 0)
    prod_conf = (0.65 * (out["games"] / 8.0).clip(0.0, 1.0) + 0.35 * out["confidence"]).clip(0.0, 1.0)
    if not request.weekly:
        # No weekly input means prior-only model; rely mostly on market to avoid prospect overpricing.
        prod_conf = (0.08 + 0.32 * prod_conf).clip(0.08, 0.40)
    out.loc[has_market, "true_value"] = (
        prod_conf.loc[has_market] * out.loc[has_market, "true_value"]
        + (1.0 - prod_conf.loc[has_market]) * out.loc[has_market, "market_value"]
    )
    if not request.weekly:
        # Keep prior-only valuations close to market to reduce one-off outliers.
        out.loc[has_market, "true_value"] = out.loc[has_market, "true_value"].clip(
            lower=out.loc[has_market, "market_value"] * 0.82,
            upper=out.loc[has_market, "market_value"] * 1.18,
        )
        # If player has no market and no weekly signal, hard-cap to conservative placeholder values.
        no_signal = (~has_market) & (out["games"] <= 0)
        pos_cap = out["pos"].map(
            {
                "QB": 46.0 if request.superflex else 33.0,
                "RB": 28.0,
                "WR": 30.0,
                "TE": 22.0,
                "K": 8.0,
                "DST": 8.0,
                "DEF": 8.0,
            }
        ).fillna(20.0)
        out.loc[no_signal, "true_value"] = np.minimum(out.loc[no_signal, "true_value"], pos_cap.loc[no_signal])
        out.loc[no_signal, "confidence"] = np.minimum(out.loc[no_signal, "confidence"], 0.35)

    consistency = (1.0 - (out["std_var"] / (out["mean_var"] + 1.0)).clip(lower=0.0, upper=1.0)).clip(0.0, 1.0)
    sample_conf = (1.0 - np.exp(-out["games"] / 6.0)).clip(0.0, 1.0)
    out["risk_index"] = (
        0.45 * (1.0 - out["confidence"])
        + 0.35 * (1.0 - consistency)
        + 0.20 * (1.0 - sample_conf)
    ).clip(0.0, 1.0)
    out["stability_score"] = (1.0 - out["risk_index"]).clip(0.0, 1.0)

    floor_mult = (0.72 + 0.20 * out["confidence"] - 0.18 * out["risk_index"]).clip(0.55, 0.96)
    ceil_mult = (1.05 + 0.25 * out["confidence"] + 0.20 * (1.0 - out["risk_index"])).clip(1.02, 1.40)
    out["floor_value"] = out["true_value"] * floor_mult
    out["ceiling_value"] = out["true_value"] * ceil_mult
    out["risk_adjusted_value"] = (
        out["true_value"] * (0.65 + 0.35 * out["confidence"]) * (1.0 - 0.25 * out["risk_index"])
    )
    out["buy_score"] = out["risk_adjusted_value"] - out["market_value"].fillna(0.0)

    cols = [
        "name",
        "pos",
        "age",
        "true_value",
        "risk_adjusted_value",
        "floor_value",
        "ceiling_value",
        "confidence",
        "risk_index",
        "stability_score",
        "buy_score",
        "future_mult",
        "market_value",
        "edge",
        "edge_z_adj",
        "games",
        "display_name",
        "team",
        "player_id",
        "sleeper_id",
        "id",
    ]
    for col in cols:
        if col not in out.columns:
            out[col] = None

    ordered = out[cols].copy()

    def _num_series(frame: pd.DataFrame, col: str, default: float) -> pd.Series:
        if col in frame.columns:
            return pd.to_numeric(frame[col], errors="coerce")
        return pd.Series(default, index=frame.index, dtype=float)

    ordered["true_value"] = _num_series(ordered, "true_value", 0.0).fillna(0.0)
    ordered["confidence"] = _num_series(ordered, "confidence", 0.55).fillna(0.55).clip(0.0, 1.0)
    ordered["future_mult"] = _num_series(ordered, "future_mult", 1.0).fillna(1.0)
    ordered["risk_adjusted_value"] = _num_series(ordered, "risk_adjusted_value", np.nan).fillna(ordered["true_value"])
    ordered["risk_index"] = _num_series(ordered, "risk_index", 0.5).fillna(0.5).clip(0.0, 1.0)
    ordered["stability_score"] = _num_series(ordered, "stability_score", 0.5).fillna(0.5).clip(0.0, 1.0)
    ordered["floor_value"] = _num_series(ordered, "floor_value", np.nan).fillna(ordered["true_value"] * 0.8)
    ordered["ceiling_value"] = _num_series(ordered, "ceiling_value", np.nan).fillna(ordered["true_value"] * 1.1)
    market_num = _num_series(ordered, "market_value", 0.0).fillna(0.0)
    ordered["buy_score"] = _num_series(ordered, "buy_score", np.nan).fillna(ordered["risk_adjusted_value"] - market_num)

    ordered = ordered.sort_values("risk_adjusted_value", ascending=False, kind="mergesort")
    ordered = _clean_for_json(ordered)
    result = ordered.to_dict(orient="records")
    return result


def _serialize_lineup_frame(df: pd.DataFrame) -> List[Dict[str, Any]]:
    cols = ["name", "pos", "proj_week", "slot", "team"]
    if df is None or df.empty:
        return []
    safe = df.copy()
    for col in cols:
        if col not in safe.columns:
            safe[col] = None
    safe = _clean_for_json(safe[cols])
    return safe.to_dict(orient="records")


def build_lineup_recommendation(request: LineupRecommendRequest) -> Dict[str, Any]:
    if not request.roster:
        return {"starters": [], "bench": [], "total_projected_points": 0.0}

    roster_df = pd.DataFrame([p.model_dump() for p in request.roster])

    if request.config is not None:
        cfg = LineupConfig(**request.config.model_dump())
    else:
        cfg = default_config(
            superflex=request.superflex,
            te_premium=request.te_premium,
        )

    starters_df, bench_df, total = recommend_lineup_with_cfg(
        roster_df=roster_df,
        cfg=cfg,
        pos_prior=request.pos_prior,
    )
    return {
        "starters": _serialize_lineup_frame(starters_df),
        "bench": _serialize_lineup_frame(bench_df),
        "total_projected_points": float(total),
    }


def _serialize_records(df: pd.DataFrame, cols: List[str]) -> List[Dict[str, Any]]:
    if df is None or df.empty:
        return []
    safe = df.copy()
    for col in cols:
        if col not in safe.columns:
            safe[col] = None
    safe = _clean_for_json(safe[cols])
    return safe.to_dict(orient="records")


def _clean_for_json(df: pd.DataFrame) -> pd.DataFrame:
    # JSON serialization cannot handle NaN/Inf; normalize to None.
    clean = df.replace([np.inf, -np.inf], np.nan)
    return clean.where(pd.notna(clean), None)


def build_league_load(request: LeagueLoadRequest) -> List[Dict[str, Any]]:
    df = fetch_league_data(request.league_id)
    if df is None or df.empty:
        return []
    cols = ["display_name", "player_id", "name", "pos", "age", "team"]
    out = _clean_for_json(df[cols].copy())
    return out.to_dict(orient="records")


def build_trade_targets(request: TradeTargetsRequest) -> Dict[str, Any]:
    if not request.players:
        return {
            "needs": [],
            "surplus": [],
            "targets": [],
            "give_candidates": [],
            "receive_candidates": [],
            "my_team_pool": [],
            "partner_pool": [],
            "team_strength": [],
        }

    df = pd.DataFrame([p.model_dump() for p in request.players])
    needs, surplus = team_needs(
        df,
        team=request.my_team,
        need_thresh=request.need_thresh,
        surplus_thresh=request.surplus_thresh,
    )
    targets_df = trade_targets_for_team(
        df,
        my_team=request.my_team,
        top_n=request.top_n,
        need_thresh=request.need_thresh,
        surplus_thresh=request.surplus_thresh,
    )

    give_df = pd.DataFrame()
    recv_df = pd.DataFrame()
    if request.partner:
        give_df = give_list_for_partner(
            df,
            my_team=request.my_team,
            partner=request.partner,
            top_n=min(20, request.top_n),
            need_thresh=request.need_thresh,
            surplus_thresh=request.surplus_thresh,
        )
        recv_df = receive_list_from_partner(
            df,
            my_team=request.my_team,
            partner=request.partner,
            top_n=min(20, request.top_n),
            need_thresh=request.need_thresh,
            surplus_thresh=request.surplus_thresh,
        )

    my_pool = df[df["display_name"] == request.my_team].copy()
    partner_pool = df[df["display_name"] == request.partner].copy() if request.partner else pd.DataFrame()

    strength = pos_strength_table(df).reset_index().rename(columns={"index": "display_name"})
    strength_cols = ["display_name", "QB", "RB", "WR", "TE", "K", "TOTAL"]
    candidate_cols = [
        "name",
        "pos",
        "display_name",
        "true_value",
        "risk_adjusted_value",
        "floor_value",
        "ceiling_value",
        "confidence",
        "risk_index",
        "market_value",
        "edge",
        "edge_z_adj",
        "WinNowScore",
    ]

    def _sort_candidates(df_in: pd.DataFrame) -> pd.DataFrame:
        if df_in is None or df_in.empty:
            return df_in
        if "risk_adjusted_value" in df_in.columns:
            return df_in.sort_values("risk_adjusted_value", ascending=False)
        return df_in.sort_values("true_value", ascending=False)

    return {
        "needs": needs,
        "surplus": surplus,
        "targets": _serialize_records(_sort_candidates(targets_df), candidate_cols),
        "give_candidates": _serialize_records(_sort_candidates(give_df), candidate_cols),
        "receive_candidates": _serialize_records(_sort_candidates(recv_df), candidate_cols),
        "my_team_pool": _serialize_records(_sort_candidates(my_pool), candidate_cols),
        "partner_pool": _serialize_records(_sort_candidates(partner_pool), candidate_cols),
        "team_strength": _serialize_records(strength, strength_cols),
    }


def build_trade_evaluation(request: TradeEvaluateRequest) -> Dict[str, Any]:
    if not request.players:
        return {
            "send_players": [],
            "receive_players": [],
            "send_total_market": 0.0,
            "receive_total_market": 0.0,
            "market_diff": 0.0,
            "fairness_score": 1.0,
            "send_total_true_value": 0.0,
            "receive_total_true_value": 0.0,
            "true_value_diff": 0.0,
            "send_total_risk_adjusted_value": 0.0,
            "receive_total_risk_adjusted_value": 0.0,
            "risk_adjusted_value_diff": 0.0,
            "send_package_quality": 0.0,
            "receive_package_quality": 0.0,
            "package_quality_diff": 0.0,
            "deal_score": 0.0,
            "deal_verdict": "neutral",
            "acceptance_likelihood_pct": 50.0,
            "partner_acceptance": "medium",
            "warnings": [],
        }

    df = pd.DataFrame([p.model_dump() for p in request.players])
    send_set = set(request.send_names)
    recv_set = set(request.receive_names)

    send_df = df[(df["display_name"] == request.my_team) & (df["name"].isin(send_set))].copy()
    recv_df = df[(df["display_name"] == request.partner) & (df["name"].isin(recv_set))].copy()

    for col in ("market_value", "true_value"):
        if col not in send_df.columns:
            send_df[col] = 0.0
        if col not in recv_df.columns:
            recv_df[col] = 0.0

    send_total_market, receive_total_market, market_diff, fairness = quick_balance_score(send_df, recv_df)
    send_total_true = float(pd.to_numeric(send_df["true_value"], errors="coerce").fillna(0).sum())
    receive_total_true = float(pd.to_numeric(recv_df["true_value"], errors="coerce").fillna(0).sum())
    send_ra = pd.to_numeric(send_df["risk_adjusted_value"], errors="coerce") if "risk_adjusted_value" in send_df.columns else pd.Series(0.0, index=send_df.index, dtype=float)
    recv_ra = pd.to_numeric(recv_df["risk_adjusted_value"], errors="coerce") if "risk_adjusted_value" in recv_df.columns else pd.Series(0.0, index=recv_df.index, dtype=float)
    send_total_risk_adj = float(send_ra.fillna(0).sum())
    recv_total_risk_adj = float(recv_ra.fillna(0).sum())

    def _package_quality(df_in: pd.DataFrame) -> float:
        if df_in is None or df_in.empty:
            return 0.0
        base = (
            pd.to_numeric(df_in["risk_adjusted_value"], errors="coerce")
            if "risk_adjusted_value" in df_in.columns
            else pd.to_numeric(df_in["true_value"], errors="coerce")
        )
        vals = base.fillna(0.0).sort_values(ascending=False).to_numpy(dtype=float)
        if vals.size == 0:
            return 0.0
        # Diminishing returns: first asset matters most, throw-ins count less.
        weights = np.array([0.0] * vals.size, dtype=float)
        for i in range(vals.size):
            if i == 0:
                weights[i] = 1.0
            elif i == 1:
                weights[i] = 0.72
            elif i == 2:
                weights[i] = 0.52
            else:
                weights[i] = 0.36 / (1.0 + 0.25 * (i - 3))
        quality = float(np.sum(vals * weights))
        # Star premium: elite centerpiece value is hard to replicate with depth pieces.
        top = float(vals[0])
        second = float(vals[1]) if vals.size > 1 else 0.0
        star_gap = max(0.0, top - second)
        quality += 0.18 * star_gap
        return quality

    send_quality = _package_quality(send_df)
    recv_quality = _package_quality(recv_df)
    quality_diff = recv_quality - send_quality
    # Blend legacy fairness with quality-aware fairness.
    qual_ratio = min(send_quality, recv_quality) / max(send_quality, recv_quality, 1e-9)
    fairness = 0.6 * float(fairness) + 0.4 * float(np.clip(qual_ratio, 0.0, 1.0))

    # Directional decision score: positive means good for your side.
    deal_score = float(
        0.50 * quality_diff
        + 0.35 * float(recv_total_risk_adj - send_total_risk_adj)
        + 0.15 * float(market_diff)
    )
    if deal_score >= 8:
        verdict = "strong_accept"
    elif deal_score >= 2:
        verdict = "accept"
    elif deal_score <= -8:
        verdict = "strong_decline"
    elif deal_score <= -2:
        verdict = "decline"
    else:
        verdict = "neutral"

    # Realism layer: estimate whether partner would ever accept this structure.
    send_count = int(len(send_df))
    recv_count = int(len(recv_df))
    send_top = float(send_ra.fillna(0.0).max()) if send_count else 0.0
    recv_top = float(recv_ra.fillna(0.0).max()) if recv_count else 0.0
    top_gap = recv_top - send_top
    warnings: List[str] = []
    if recv_top > (send_top * 1.30) and recv_count <= send_count:
        warnings.append("Star mismatch: package lacks a comparable centerpiece asset.")
    if abs(send_count - recv_count) >= 2:
        warnings.append("Large player-count imbalance can reduce acceptance odds.")
    if quality_diff > 0 and (recv_total_risk_adj - send_total_risk_adj) > 0:
        warnings.append("You receive more consolidated value than you send; likely countered.")

    acceptance = 68.0
    acceptance -= max(0.0, quality_diff) * 1.15
    acceptance -= max(0.0, recv_total_risk_adj - send_total_risk_adj) * 0.65
    acceptance -= max(0.0, top_gap) * 0.90
    acceptance -= abs(send_count - recv_count) * 4.0
    acceptance = float(np.clip(acceptance, 1.0, 99.0))
    if acceptance >= 70:
        partner_acceptance = "high"
    elif acceptance >= 40:
        partner_acceptance = "medium"
    else:
        partner_acceptance = "low"

    candidate_cols = [
        "name",
        "pos",
        "display_name",
        "true_value",
        "market_value",
        "edge",
        "edge_z_adj",
        "WinNowScore",
    ]
    return {
        "send_players": _serialize_records(send_df, candidate_cols),
        "receive_players": _serialize_records(recv_df, candidate_cols),
        "send_total_market": float(send_total_market),
        "receive_total_market": float(receive_total_market),
        "market_diff": float(market_diff),
        "fairness_score": float(fairness),
        "send_total_true_value": send_total_true,
        "receive_total_true_value": receive_total_true,
        "true_value_diff": float(receive_total_true - send_total_true),
        "send_total_risk_adjusted_value": send_total_risk_adj,
        "receive_total_risk_adjusted_value": recv_total_risk_adj,
        "risk_adjusted_value_diff": float(recv_total_risk_adj - send_total_risk_adj),
        "send_package_quality": float(send_quality),
        "receive_package_quality": float(recv_quality),
        "package_quality_diff": float(quality_diff),
        "deal_score": deal_score,
        "deal_verdict": verdict,
        "acceptance_likelihood_pct": acceptance,
        "partner_acceptance": partner_acceptance,
        "warnings": warnings,
    }


def build_fa_upgrades(request: FAUpgradesRequest) -> Dict[str, Any]:
    if not request.roster:
        return {
            "starters": [],
            "bench": [],
            "fa_pool": [],
            "upgrades": [],
            "total_projected_points": 0.0,
        }

    roster_df = pd.DataFrame([p.model_dump() for p in request.roster])
    league_df = pd.DataFrame([p.model_dump() for p in request.league_roster]) if request.league_roster else pd.DataFrame()
    market_df = pd.DataFrame([p.model_dump() for p in request.dp_market]) if request.dp_market else pd.DataFrame()

    if request.config is not None:
        cfg = LineupConfig(**request.config.model_dump())
    else:
        cfg = default_config(
            superflex=request.superflex,
            te_premium=request.te_premium,
        )

    starters_df, bench_df, total = recommend_lineup_with_cfg(
        roster_df=roster_df,
        cfg=cfg,
        pos_prior=request.pos_prior,
    )

    fa_pool_df = prepare_fa_pool(market_df, league_df)
    fa_scored = project_points_this_week(fa_pool_df, pos_prior=request.pos_prior)
    upgrades_df = fa_upgrade_suggestions(
        starters_df=starters_df,
        fa_df=fa_scored,
        cfg=cfg,
        min_delta=request.min_delta,
        max_results=request.max_results,
    )

    fa_cols = ["name", "pos", "proj_week", "team"]
    upgrades_cols = ["slot", "replace", "add", "proj_add", "proj_replace", "delta_pts", "pos"]
    return {
        "starters": _serialize_lineup_frame(starters_df),
        "bench": _serialize_lineup_frame(bench_df),
        "fa_pool": _serialize_records(fa_scored, fa_cols),
        "upgrades": _serialize_records(upgrades_df, upgrades_cols),
        "total_projected_points": float(total),
    }


def load_default_market() -> List[Dict[str, Any]]:
    market_path = Path(__file__).resolve().parents[1] / "market.csv"
    if not market_path.exists():
        return []

    df = pd.read_csv(market_path)
    if df.empty:
        return []
    cols = ["name", "pos", "market_value"]
    for col in cols:
        if col not in df.columns:
            return []
    out = _clean_for_json(df[cols].copy())
    return out.to_dict(orient="records")


def _rank_spearman(a: pd.Series, b: pd.Series) -> float:
    if len(a) < 3 or len(b) < 3:
        return 0.0
    ar = a.rank(method="average")
    br = b.rank(method="average")
    c = float(ar.corr(br))
    if pd.isna(c):
        return 0.0
    return c


def _empty_backtest() -> Dict[str, Any]:
    return {
        "observations": 0,
        "model_mae": 0.0,
        "baseline_mae": 0.0,
        "model_rmse": 0.0,
        "baseline_rmse": 0.0,
        "model_spearman": 0.0,
        "baseline_spearman": 0.0,
        "mae_improvement_pct": 0.0,
    }


def _normalize_backtest_weekly(w: pd.DataFrame, min_history_games: int, ewma_alpha: float) -> Dict[str, Any]:
    if w.empty:
        return _empty_backtest()

    needed = {"week", "points"}
    if any(c not in w.columns for c in needed):
        raise ValueError("weekly payload requires week and points")

    if "pos" not in w.columns:
        raise ValueError("weekly payload requires pos")

    if "season" not in w.columns:
        w["season"] = 0
    if "name_key" not in w.columns:
        if "name" in w.columns:
            w["name_key"] = w["name"].astype(str).str.lower().str.replace(r"[^a-z0-9 ]", "", regex=True).str.strip()
        else:
            w["name_key"] = pd.Series(w.index, index=w.index).astype(str)

    w["season"] = pd.to_numeric(w["season"], errors="coerce").fillna(0).astype(int)
    w["week"] = pd.to_numeric(w["week"], errors="coerce").fillna(0).astype(int)
    w["points"] = pd.to_numeric(w["points"], errors="coerce").fillna(0.0)
    w["pos"] = w["pos"].astype(str).str.upper()
    w["name_key"] = w["name_key"].astype(str)
    w = w.sort_values(["season", "week"])

    rows: List[Dict[str, float]] = []
    perf: Dict[str, Dict[str, float]] = {"__global__": {"ew_abs": 0.0, "ppg_abs": 0.0, "n": 0.0}}

    def _w_ewma(pos: str) -> float:
        p = perf.get(pos, None)
        g = perf["__global__"]
        src = p if p and p.get("n", 0.0) >= 60 else g
        n = float(src.get("n", 0.0))
        if n < 30:
            return 0.35
        ew_mae = float(src.get("ew_abs", 0.0)) / max(1.0, n)
        pp_mae = float(src.get("ppg_abs", 0.0)) / max(1.0, n)
        denom = ew_mae + pp_mae
        if denom <= 1e-9:
            return 0.35
        # If EWMA is not clearly better than baseline, keep it as a secondary feature.
        if ew_mae >= pp_mae * 0.99:
            return 0.20
        # inverse-error weighting (if EWMA has lower error historically, weight it more).
        w = pp_mae / denom
        return float(np.clip(w, 0.20, 0.75))
    for (season, week), target in w.groupby(["season", "week"], dropna=False):
        hist = w[(w["season"] == season) & (w["week"] < week)].copy()
        if hist.empty:
            continue
        agg = hist.groupby(["name_key", "pos"], as_index=False).agg(
            games_played=("points", "count"),
            ppg=("points", "mean"),
        )
        if agg.empty:
            continue
        agg = agg[agg["games_played"] >= max(1, int(min_history_games))]
        if agg.empty:
            continue
        ew = (
            hist.sort_values("week")
            .groupby(["name_key", "pos"])["points"]
            .apply(lambda s: s.ewm(alpha=float(ewma_alpha), adjust=False).mean().iloc[-1])
            .reset_index(name="ewma")
        )
        recent = (
            hist.sort_values("week")
            .groupby(["name_key", "pos"])["points"]
            .apply(lambda s: float(s.tail(3).mean()))
            .reset_index(name="recent3")
        )
        med = (
            hist.groupby(["name_key", "pos"], as_index=False)["points"]
            .median()
            .rename(columns={"points": "median"})
        )
        # History volatility is used as a trust penalty for high-variance weekly scorers.
        vol = (
            hist.groupby(["name_key", "pos"], as_index=False)["points"]
            .std(ddof=0)
            .rename(columns={"points": "hist_std"})
        )
        feat = (
            agg.merge(ew, on=["name_key", "pos"], how="left")
            .merge(recent, on=["name_key", "pos"], how="left")
            .merge(med, on=["name_key", "pos"], how="left")
            .merge(vol, on=["name_key", "pos"], how="left")
        )
        if "ewma" not in feat.columns:
            feat["ewma"] = feat["ppg"]
        else:
            feat["ewma"] = pd.to_numeric(feat["ewma"], errors="coerce").fillna(feat["ppg"])
        feat["recent3"] = pd.to_numeric(feat.get("recent3", feat["ppg"]), errors="coerce").fillna(feat["ppg"])
        feat["median"] = pd.to_numeric(feat.get("median", feat["ppg"]), errors="coerce").fillna(feat["ppg"])
        feat["hist_std"] = pd.to_numeric(feat.get("hist_std", 0.0), errors="coerce").fillna(0.0)
        feat["w_ewma"] = feat["pos"].map(lambda p: _w_ewma(str(p).upper()))
        delta_ew = (feat["ewma"] - feat["ppg"]).astype(float)
        delta_recent = (feat["recent3"] - feat["ppg"]).astype(float)
        delta_med = (feat["median"] - feat["ppg"]).astype(float)
        delta = (0.55 * delta_ew) + (0.30 * delta_recent) + (0.15 * delta_med)
        # Require enough history before letting EWMA move projection materially.
        hist_conf = ((feat["games_played"] - float(min_history_games)) / 8.0).clip(0.0, 1.0)
        # Penalize unstable weekly producers; keeps MAE from being dragged by noisy tails.
        vol_penalty = (1.0 / (1.0 + (feat["hist_std"] / feat["ppg"].abs().clip(lower=1.0)))).clip(0.35, 1.0)
        # Convert adaptive EWMA weight into a signed trust factor around baseline.
        ew_trust = (0.30 + 0.70 * ((feat["w_ewma"] - 0.20) / 0.55).clip(0.0, 1.0)).clip(0.30, 1.0)
        # Smooth confidence curve: avoid all-or-nothing behavior that collapses to baseline.
        trend_strength = (delta.abs() / (feat["hist_std"] + 1.0)).clip(0.0, 2.0)
        trend_gate = (trend_strength / 2.0).clip(0.15, 1.0)
        move_strength = (hist_conf * vol_penalty * ew_trust * trend_gate).clip(0.0, 1.0)
        pos_cap = feat["pos"].map(
            {
                "QB": 1.8,
                "RB": 1.4,
                "WR": 1.3,
                "TE": 1.2,
                "K": 0.8,
                "DEF": 0.9,
                "DST": 0.9,
            }
        ).fillna(1.1)
        # Keep adjustments conservative, but allow enough movement to improve ranking signal.
        adj = (delta * move_strength).clip(lower=-(pos_cap * 0.9), upper=(pos_cap * 0.9))
        feat["proj_week"] = (feat["ppg"] + adj).astype(float)
        pred = feat[["name_key", "pos", "ppg", "ewma", "proj_week"]]
        obs = target.groupby(["name_key", "pos"], as_index=False)["points"].sum().rename(columns={"points": "actual"})
        cmp = pred.merge(obs, on=["name_key", "pos"], how="inner")
        if cmp.empty:
            continue
        cmp["baseline"] = cmp["ppg"]
        # Update adaptive weights with realized errors from this week.
        cmp["abs_ew"] = (cmp["ewma"] - cmp["actual"]).abs()
        cmp["abs_pp"] = (cmp["ppg"] - cmp["actual"]).abs()
        by_pos = cmp.groupby("pos", as_index=False).agg(
            ew_abs=("abs_ew", "sum"),
            ppg_abs=("abs_pp", "sum"),
            n=("abs_ew", "count"),
        )
        for _, r in by_pos.iterrows():
            pos = str(r["pos"]).upper()
            if pos not in perf:
                perf[pos] = {"ew_abs": 0.0, "ppg_abs": 0.0, "n": 0.0}
            perf[pos]["ew_abs"] += float(r["ew_abs"])
            perf[pos]["ppg_abs"] += float(r["ppg_abs"])
            perf[pos]["n"] += float(r["n"])
            perf["__global__"]["ew_abs"] += float(r["ew_abs"])
            perf["__global__"]["ppg_abs"] += float(r["ppg_abs"])
            perf["__global__"]["n"] += float(r["n"])
        rows.extend(cmp[["proj_week", "baseline", "actual"]].to_dict(orient="records"))

    if not rows:
        return _empty_backtest()

    m = pd.DataFrame(rows)
    model_err = (m["proj_week"] - m["actual"]).abs()
    base_err = (m["baseline"] - m["actual"]).abs()
    model_mae = float(model_err.mean())
    base_mae = float(base_err.mean())
    model_rmse = float(np.sqrt(((m["proj_week"] - m["actual"]) ** 2).mean()))
    base_rmse = float(np.sqrt(((m["baseline"] - m["actual"]) ** 2).mean()))
    model_spear = _rank_spearman(m["proj_week"], m["actual"])
    base_spear = _rank_spearman(m["baseline"], m["actual"])
    improvement = float(((base_mae - model_mae) / base_mae) * 100.0) if base_mae > 0 else 0.0
    return {
        "observations": int(len(m)),
        "model_mae": model_mae,
        "baseline_mae": base_mae,
        "model_rmse": model_rmse,
        "baseline_rmse": base_rmse,
        "model_spearman": model_spear,
        "baseline_spearman": base_spear,
        "mae_improvement_pct": improvement,
    }


def build_model_backtest(request: ModelBacktestRequest) -> Dict[str, Any]:
    if not request.weekly:
        return _empty_backtest()
    w = pd.DataFrame([x.model_dump() for x in request.weekly])
    return _normalize_backtest_weekly(
        w=w,
        min_history_games=int(request.min_history_games),
        ewma_alpha=float(request.ewma_alpha),
    )


def build_model_backtest_auto(request: ModelBacktestAutoRequest) -> Dict[str, Any]:
    start = int(min(request.season_from, request.season_to))
    end = int(max(request.season_from, request.season_to))
    if end < 1999 or start > 2100:
        raise ValueError("invalid season range")

    # Primary source: nflverse player stats release parquet (fastest).
    parquet_url = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.parquet"
    csv_url = "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.csv"
    try:
        src = pd.read_parquet(parquet_url)
    except Exception as exc:
        try:
            src = pd.read_csv(csv_url, low_memory=False)
        except Exception as exc2:
            raise ValueError(
                f"unable_to_load_nflverse_player_stats: {type(exc).__name__}/{type(exc2).__name__}"
            ) from exc2

    cols = {c.lower(): c for c in src.columns}
    season_col = cols.get("season")
    week_col = cols.get("week")
    pos_col = cols.get("position") or cols.get("pos")
    name_col = cols.get("player_display_name") or cols.get("player_name") or cols.get("name")
    points_col = (
        cols.get("fantasy_points_ppr")
        or cols.get("fantasy_points")
        or cols.get("fantasy_points_half_ppr")
    )
    if not all([season_col, week_col, pos_col, name_col, points_col]):
        raise ValueError("nflverse schema missing required columns")

    w = src[[season_col, week_col, pos_col, name_col, points_col]].copy()
    w.columns = ["season", "week", "pos", "name", "points"]
    w["season"] = pd.to_numeric(w["season"], errors="coerce").fillna(0).astype(int)
    w = w[(w["season"] >= start) & (w["season"] <= end)]
    if w.empty:
        return _empty_backtest()
    w["name_key"] = (
        w["name"]
        .astype(str)
        .str.lower()
        .str.replace(r"[^a-z0-9 ]", "", regex=True)
        .str.replace(r"\s+", " ", regex=True)
        .str.strip()
    )
    return _normalize_backtest_weekly(
        w=w,
        min_history_games=int(request.min_history_games),
        ewma_alpha=float(request.ewma_alpha),
    )
