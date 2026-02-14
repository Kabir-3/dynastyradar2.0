# Frontend (Next.js)

## Run

```bash
cd "/Users/younggoat/Downloads/new dynasty app/frontend"
npm install
npm run dev
```

Open:

- `http://127.0.0.1:3000`

## One-Command Full Stack Run

From project root:

```bash
cd "/Users/younggoat/Downloads/new dynasty app"
./run-dev.sh
```

This starts backend (`:8000`) and frontend (`:3000`) together in one terminal.

## Backend URL

By default, the frontend uses:

- `http://127.0.0.1:8000`

To change it:

1. Copy `.env.local.example` to `.env.local`
2. Set `NEXT_PUBLIC_API_BASE` to your backend URL

## Implemented Pages

- `/` Home
- `/valuations` -> `POST /v1/valuations`
- `/lineup` -> `POST /v1/lineup/recommend`
- `/workspace` -> full flow (league load + valuations + lineup + trade + FA + model QA)
