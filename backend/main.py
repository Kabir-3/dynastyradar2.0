from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import (
    FAUpgradesRequest,
    FAUpgradesResponse,
    LeagueLoadRequest,
    LeagueLoadResponse,
    LineupRecommendRequest,
    LineupRecommendResponse,
    MarketDefaultResponse,
    ModelBacktestRequest,
    ModelBacktestAutoRequest,
    ModelBacktestResponse,
    TradeEvaluateRequest,
    TradeEvaluateResponse,
    TradeTargetsRequest,
    TradeTargetsResponse,
    ValuationRequest,
    ValuationResponse,
)
from backend.services import (
    build_fa_upgrades,
    build_league_load,
    build_lineup_recommendation,
    build_model_backtest,
    build_model_backtest_auto,
    build_trade_evaluation,
    build_trade_targets,
    build_valuations,
    load_default_market,
)

app = FastAPI(title="Dynasty Radar API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/v1/valuations", response_model=ValuationResponse)
def valuations(payload: ValuationRequest) -> ValuationResponse:
    try:
        players = build_valuations(payload)
        return ValuationResponse(players=players)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # Keep endpoint stable while frontend migration is in progress.
        raise HTTPException(
            status_code=500,
            detail=f"valuation_failed: {type(exc).__name__}: {str(exc)[:240]}",
        ) from exc


@app.post("/v1/lineup/recommend", response_model=LineupRecommendResponse)
def lineup_recommend(payload: LineupRecommendRequest) -> LineupRecommendResponse:
    try:
        return LineupRecommendResponse(**build_lineup_recommendation(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"lineup_recommend_failed: {type(exc).__name__}") from exc


@app.post("/v1/league/load", response_model=LeagueLoadResponse)
def league_load(payload: LeagueLoadRequest) -> LeagueLoadResponse:
    try:
        return LeagueLoadResponse(players=build_league_load(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"league_load_failed: {type(exc).__name__}") from exc


@app.post("/v1/trade/targets", response_model=TradeTargetsResponse)
def trade_targets(payload: TradeTargetsRequest) -> TradeTargetsResponse:
    try:
        return TradeTargetsResponse(**build_trade_targets(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"trade_targets_failed: {type(exc).__name__}") from exc


@app.post("/v1/trade/evaluate", response_model=TradeEvaluateResponse)
def trade_evaluate(payload: TradeEvaluateRequest) -> TradeEvaluateResponse:
    try:
        return TradeEvaluateResponse(**build_trade_evaluation(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"trade_evaluate_failed: {type(exc).__name__}") from exc


@app.post("/v1/fa/upgrades", response_model=FAUpgradesResponse)
def fa_upgrades(payload: FAUpgradesRequest) -> FAUpgradesResponse:
    try:
        return FAUpgradesResponse(**build_fa_upgrades(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"fa_upgrades_failed: {type(exc).__name__}") from exc


@app.get("/v1/market/default", response_model=MarketDefaultResponse)
def market_default() -> MarketDefaultResponse:
    try:
        return MarketDefaultResponse(players=load_default_market())
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"market_default_failed: {type(exc).__name__}") from exc


@app.post("/v1/model/backtest", response_model=ModelBacktestResponse)
def model_backtest(payload: ModelBacktestRequest) -> ModelBacktestResponse:
    try:
        return ModelBacktestResponse(**build_model_backtest(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"model_backtest_failed: {type(exc).__name__}") from exc


@app.post("/v1/model/backtest/auto", response_model=ModelBacktestResponse)
def model_backtest_auto(payload: ModelBacktestAutoRequest) -> ModelBacktestResponse:
    try:
        return ModelBacktestResponse(**build_model_backtest_auto(payload))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"model_backtest_auto_failed: {type(exc).__name__}: {exc}",
        ) from exc
