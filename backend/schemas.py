from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class RosterPlayer(BaseModel):
    name: str
    pos: str
    age: Optional[float] = None
    display_name: Optional[str] = None
    team: Optional[str] = None
    player_id: Optional[str] = None
    sleeper_id: Optional[str] = None
    id: Optional[str] = None


class WeeklyStat(BaseModel):
    name_key: Optional[str] = None
    name: Optional[str] = None
    pos: Optional[str] = None
    week: int
    points: float = 0.0
    targets: Optional[float] = None
    routes_run: Optional[float] = None
    snap_share: Optional[float] = None
    rush_att: Optional[float] = None
    snaps: Optional[float] = None
    player_id: Optional[str] = None
    id: Optional[str] = None


class MarketPlayer(BaseModel):
    name: str
    pos: str
    market_value: float


class FallbackMarketPlayer(BaseModel):
    name: str
    pos: str
    Rank: float


class ValuationRequest(BaseModel):
    roster: List[RosterPlayer] = Field(default_factory=list)
    weekly: Optional[List[WeeklyStat]] = None
    market: Optional[List[MarketPlayer]] = None
    fallback_market: Optional[List[FallbackMarketPlayer]] = None
    superflex: bool = False
    te_premium: bool = False
    ppr: bool = True
    age_weight: float = 1.0
    youth_bonus: float = 3.0
    age_cap: float = 8.0
    w_dp: float = 0.7
    w_fp: float = 0.3


class PlayerValuation(BaseModel):
    name: str
    pos: str
    age: Optional[float] = None
    true_value: float
    risk_adjusted_value: Optional[float] = None
    floor_value: Optional[float] = None
    ceiling_value: Optional[float] = None
    confidence: float
    risk_index: Optional[float] = None
    stability_score: Optional[float] = None
    buy_score: Optional[float] = None
    future_mult: float
    games: Optional[float] = None
    market_value: Optional[float] = None
    edge: Optional[float] = None
    edge_z_adj: Optional[float] = None
    display_name: Optional[str] = None
    team: Optional[str] = None
    player_id: Optional[str] = None
    sleeper_id: Optional[str] = None
    id: Optional[str] = None


class ValuationResponse(BaseModel):
    players: List[PlayerValuation]


class LineupPlayer(BaseModel):
    name: str
    pos: str
    team: Optional[str] = None
    market_value: Optional[float] = None
    ppg: Optional[float] = None
    ewma: Optional[float] = None
    trend: Optional[float] = None
    games_played: Optional[float] = None


class LineupConfigInput(BaseModel):
    qb: int = 1
    rb: int = 2
    wr: int = 2
    te: int = 1
    flex: int = 1
    superflex: int = 0
    k: int = 0
    te_premium: bool = False


class LineupRecommendRequest(BaseModel):
    roster: List[LineupPlayer] = Field(default_factory=list)
    config: Optional[LineupConfigInput] = None
    pos_prior: Optional[Dict[str, float]] = None
    superflex: bool = False
    te_premium: bool = False


class LineupPlayerView(BaseModel):
    name: str
    pos: str
    proj_week: float
    slot: Optional[str] = None
    team: Optional[str] = None


class LineupRecommendResponse(BaseModel):
    starters: List[LineupPlayerView]
    bench: List[LineupPlayerView]
    total_projected_points: float


class LeagueLoadRequest(BaseModel):
    league_id: str


class LeaguePlayer(BaseModel):
    display_name: str
    player_id: str
    name: str
    pos: str
    age: Optional[float] = None
    team: Optional[str] = None


class LeagueLoadResponse(BaseModel):
    players: List[LeaguePlayer]


class TradePoolPlayer(BaseModel):
    name: str
    pos: str
    display_name: str
    true_value: Optional[float] = None
    risk_adjusted_value: Optional[float] = None
    floor_value: Optional[float] = None
    ceiling_value: Optional[float] = None
    confidence: Optional[float] = None
    risk_index: Optional[float] = None
    market_value: Optional[float] = None
    edge: Optional[float] = None
    edge_z_adj: Optional[float] = None
    WinNowScore: Optional[float] = None


class TradeTargetsRequest(BaseModel):
    players: List[TradePoolPlayer] = Field(default_factory=list)
    my_team: str
    partner: Optional[str] = None
    top_n: int = 25
    need_thresh: float = -0.10
    surplus_thresh: float = 0.10


class TradeCandidate(BaseModel):
    name: str
    pos: str
    display_name: str
    true_value: Optional[float] = None
    risk_adjusted_value: Optional[float] = None
    floor_value: Optional[float] = None
    ceiling_value: Optional[float] = None
    confidence: Optional[float] = None
    risk_index: Optional[float] = None
    market_value: Optional[float] = None
    edge: Optional[float] = None
    edge_z_adj: Optional[float] = None
    WinNowScore: Optional[float] = None


class TeamStrength(BaseModel):
    display_name: str
    QB: float = 0.0
    RB: float = 0.0
    WR: float = 0.0
    TE: float = 0.0
    K: float = 0.0
    TOTAL: float = 0.0


class TradeTargetsResponse(BaseModel):
    needs: List[str]
    surplus: List[str]
    targets: List[TradeCandidate]
    give_candidates: List[TradeCandidate]
    receive_candidates: List[TradeCandidate]
    my_team_pool: List[TradeCandidate]
    partner_pool: List[TradeCandidate]
    team_strength: List[TeamStrength]


class TradeEvaluateRequest(BaseModel):
    players: List[TradePoolPlayer] = Field(default_factory=list)
    my_team: str
    partner: str
    send_names: List[str] = Field(default_factory=list)
    receive_names: List[str] = Field(default_factory=list)


class TradeEvaluateResponse(BaseModel):
    send_players: List[TradeCandidate]
    receive_players: List[TradeCandidate]
    send_total_market: float
    receive_total_market: float
    market_diff: float
    fairness_score: float
    send_total_true_value: float
    receive_total_true_value: float
    true_value_diff: float
    send_total_risk_adjusted_value: float = 0.0
    receive_total_risk_adjusted_value: float = 0.0
    risk_adjusted_value_diff: float = 0.0
    send_package_quality: float = 0.0
    receive_package_quality: float = 0.0
    package_quality_diff: float = 0.0
    deal_score: float = 0.0
    deal_verdict: str = "neutral"


class FAUpgradesRequest(BaseModel):
    roster: List[LineupPlayer] = Field(default_factory=list)
    league_roster: List[RosterPlayer] = Field(default_factory=list)
    dp_market: List[MarketPlayer] = Field(default_factory=list)
    config: Optional[LineupConfigInput] = None
    pos_prior: Optional[Dict[str, float]] = None
    superflex: bool = False
    te_premium: bool = False
    min_delta: float = 0.5
    max_results: int = 8


class FAUpgrade(BaseModel):
    slot: str
    replace: str
    add: str
    proj_add: float
    proj_replace: float
    delta_pts: float
    pos: str


class FAUpgradesResponse(BaseModel):
    starters: List[LineupPlayerView]
    bench: List[LineupPlayerView]
    fa_pool: List[LineupPlayerView]
    upgrades: List[FAUpgrade]
    total_projected_points: float


class MarketDefaultResponse(BaseModel):
    players: List[MarketPlayer]


class ModelBacktestRequest(BaseModel):
    weekly: List[WeeklyStat] = Field(default_factory=list)
    min_history_games: int = 3
    ewma_alpha: float = 0.6


class ModelBacktestResponse(BaseModel):
    observations: int
    model_mae: float
    baseline_mae: float
    model_rmse: float
    baseline_rmse: float
    model_spearman: float
    baseline_spearman: float
    mae_improvement_pct: float


class ModelBacktestAutoRequest(BaseModel):
    season_from: int = 2022
    season_to: int = 2024
    min_history_games: int = 3
    ewma_alpha: float = 0.6
