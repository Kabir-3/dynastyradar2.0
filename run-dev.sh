#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT_DIR"
FRONTEND_DIR="$ROOT_DIR/frontend"

if [ ! -d "$ROOT_DIR/.venv" ]; then
  echo "Missing virtual environment at $ROOT_DIR/.venv"
  echo "Create it first and install backend deps:"
  echo "  python3.12 -m venv .venv"
  echo "  source .venv/bin/activate"
  echo "  python -m pip install -r requirements-api.txt"
  exit 1
fi

cleanup() {
  if [ -n "${API_PID:-}" ] && kill -0 "$API_PID" 2>/dev/null; then
    kill "$API_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "Starting backend on http://127.0.0.1:8000 ..."
(
  cd "$BACKEND_DIR"
  source .venv/bin/activate
  python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
) &
API_PID=$!

sleep 1

if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "Installing frontend deps..."
  (cd "$FRONTEND_DIR" && npm install)
fi

echo "Starting frontend on http://127.0.0.1:3000 ..."
cd "$FRONTEND_DIR"
npm run dev
