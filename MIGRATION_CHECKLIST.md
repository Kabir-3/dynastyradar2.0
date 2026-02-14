# Streamlit Migration Checklist

## Phase 1: API Foundation (Done)

- [x] Create FastAPI app scaffold (`backend/main.py`)
- [x] Add valuation endpoint (`POST /v1/valuations`)
- [x] Reuse existing valuation engine (`value_engine.py`)
- [x] Add typed request/response models (`backend/schemas.py`)
- [x] Add backend run docs (`backend/README.md`)

## Phase 2: Extract Streamlit Business Logic

- [ ] Move Sleeper fetch logic to backend service module
- [ ] Move weekly stats/snap% merge logic to backend service module
- [ ] Move trade tools composition to backend endpoint
- [ ] Move lineup optimizer composition to backend endpoint
- [ ] Remove data-fetch side effects from Streamlit UI layer

## Phase 3: Expand API Surface

- [x] `POST /v1/league/load` (fetch and normalize league roster)
- [x] `POST /v1/lineup/recommend`
- [x] `POST /v1/trade/targets`
- [x] `POST /v1/fa/upgrades`
- [ ] `POST /v1/player/lookup`

## Phase 4: Frontend

- [ ] Bootstrap Next.js app
- [ ] Build layout/navigation for current Streamlit tabs
- [ ] Replace Streamlit tables/charts with React components
- [ ] Wire frontend to backend endpoints
- [ ] Add loading/error states per endpoint

## Phase 5: Production

- [ ] Add auth (Clerk/Auth0/Supabase Auth)
- [ ] Add persistence for saved league IDs (DB)
- [ ] Add caching layer for expensive data pulls
- [ ] Add rate limits and request logging
- [ ] Add CI checks and deployment pipeline
