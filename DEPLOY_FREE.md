# Free Deployment (Render + Vercel)

This project is ready for a free split deploy:

- Backend API on Render (free web service)
- Frontend on Vercel (free Next.js hosting)

## 1. Push code to GitHub

Render and Vercel both deploy from a Git repo.

## 2. Deploy backend on Render

1. Go to https://render.com and create an account.
2. Click **New +** -> **Blueprint**.
3. Connect your repo and deploy.
4. Render will detect `render.yaml` and create:
   - `dynasty-radar-api`
5. Wait for deploy, then copy backend URL:
   - Example: `https://dynasty-radar-api.onrender.com`
6. Confirm health check:
   - Open `https://dynasty-radar-api.onrender.com/health`
   - Should return `{"status":"ok"}`

Notes:
- Free Render services sleep after inactivity. First request can be slow.
- Backend is configured with:
  - Build: `pip install -r requirements-api.txt`
  - Start: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`

## 3. Deploy frontend on Vercel

1. Go to https://vercel.com and create an account.
2. Click **Add New...** -> **Project**.
3. Import the same repo.
4. Set **Root Directory** to `frontend`.
5. Add environment variable:
   - `NEXT_PUBLIC_API_BASE` = your Render backend URL
   - Example: `https://dynasty-radar-api.onrender.com`
6. Deploy.

## 4. Verify app

1. Open your Vercel app URL.
2. In the app, ensure API Base URL matches `NEXT_PUBLIC_API_BASE`.
3. Test:
   - `Load League`
   - `Run Valuations`
   - `Run Trade`
   - `Run Lineup`

## 5. Updating after code changes

- Push to GitHub.
- Render and Vercel auto-redeploy.

