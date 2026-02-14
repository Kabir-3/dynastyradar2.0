# Backend Scaffold

This is the first migration step away from Streamlit: a standalone API using FastAPI.

## Run

```bash
python -m pip install -r requirements-api.txt
python -m uvicorn backend.main:app --reload
```

Then open:

- `http://127.0.0.1:8000/health`
- `http://127.0.0.1:8000/docs`

## Endpoints

- `GET /health`
- `POST /v1/valuations`
- `POST /v1/lineup/recommend`
- `POST /v1/league/load`
- `POST /v1/trade/targets`
- `POST /v1/trade/evaluate`
- `POST /v1/fa/upgrades`
- `GET /v1/market/default`
- `POST /v1/model/backtest`
- `POST /v1/model/backtest/auto`

`/v1/model/backtest/auto` pulls nflverse player_stats and runs walk-forward QA
against baseline PPG using adaptive EWMA/PPG blending by position.

## Example Request

```json
{
  "roster": [
    {"name": "Josh Allen", "pos": "QB", "age": 29, "display_name": "My Team"},
    {"name": "Bijan Robinson", "pos": "RB", "age": 24, "display_name": "My Team"}
  ],
  "superflex": true,
  "te_premium": false,
  "ppr": true
}
```

## Notes

- The endpoint reuses your existing valuation logic in `value_engine.py`.
- Use `requirements-api.txt` for backend migration work. The legacy Streamlit app still uses `requirements.txt`.

## Lineup Example Request

```json
{
  "roster": [
    {"name": "Josh Allen", "pos": "QB", "team": "BUF", "ppg": 23.4, "ewma": 24.1, "trend": 0.9, "games_played": 17, "market_value": 98},
    {"name": "Bijan Robinson", "pos": "RB", "team": "ATL", "ppg": 17.1, "ewma": 18.0, "trend": 0.8, "games_played": 17, "market_value": 95},
    {"name": "CeeDee Lamb", "pos": "WR", "team": "DAL", "ppg": 20.2, "ewma": 19.8, "trend": 0.5, "games_played": 17, "market_value": 97}
  ],
  "superflex": true,
  "te_premium": false
}
```

## League Load Example

```json
{
  "league_id": "1195252934627844096"
}
```

## Trade Targets Example

```json
{
  "my_team": "My Team",
  "players": [
    {"name": "Player A", "pos": "WR", "display_name": "My Team", "true_value": 87, "market_value": 80, "edge_z_adj": 1.2},
    {"name": "Player B", "pos": "RB", "display_name": "Other Team", "true_value": 76, "market_value": 70, "edge_z_adj": 0.8}
  ]
}
```

## FA Upgrades Example

```json
{
  "roster": [
    {"name": "Josh Allen", "pos": "QB", "team": "BUF", "ppg": 23.4, "ewma": 24.1, "trend": 0.9, "games_played": 17, "market_value": 98}
  ],
  "league_roster": [
    {"name": "Josh Allen", "pos": "QB"}
  ],
  "dp_market": [
    {"name": "Some FA", "pos": "QB", "market_value": 50}
  ],
  "superflex": true
}
```
