# 🎯 AI Career Roadmap Tracker

Personal 6-month AI career checklist — GitHub Pages frontend + Cloudflare Worker + D1 backend.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vite + React → GitHub Pages |
| Backend | Cloudflare Worker |
| Database | Cloudflare D1 (SQLite) |
| Auth | PIN gate (secret stored as Worker secret) |

---

## Deploy Guide — Do This Once

### Step 1 — Create the GitHub repo

```bash
# On GitHub: create a new repo called "ai-roadmap-tracker" (public or private)
# Then locally:
git init
git remote add origin https://github.com/YOUR_USERNAME/ai-roadmap-tracker.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Done — the workflow will handle the rest on every push

### Step 3 — Create the Cloudflare D1 database

```bash
cd worker
npm install

# Log in to Cloudflare (opens browser)
npx wrangler login

# Create the D1 database
npx wrangler d1 create ai-roadmap-db
```

Copy the `database_id` from the output and paste it into `worker/wrangler.toml`:
```toml
database_id = "PASTE_YOUR_ID_HERE"
```

### Step 4 — Run the database schema

```bash
npx wrangler d1 execute ai-roadmap-db --file=schema.sql
```

### Step 5 — Set your PIN (keep it secret)

```bash
npx wrangler secret put APP_PIN
# Type your chosen PIN when prompted (e.g. a word + numbers: roadmap2025)
```

### Step 6 — Deploy the Worker

```bash
npx wrangler deploy
```

Copy the Worker URL from the output — it looks like:
`https://ai-roadmap-worker.YOUR-SUBDOMAIN.workers.dev`

### Step 7 — Add Worker URL to GitHub Secrets

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_WORKER_URL`
4. Value: `https://ai-roadmap-worker.YOUR-SUBDOMAIN.workers.dev`
5. Save

### Step 8 — Push to trigger deploy

```bash
git add .
git commit -m "Add worker URL"
git push
```

GitHub Actions will build and deploy the frontend automatically.

Your app will be live at:
`https://YOUR_USERNAME.github.io/ai-roadmap-tracker/`

---

## Local Development

```bash
# Frontend
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local → set VITE_WORKER_URL to your deployed worker URL
npm run dev

# Worker (in a separate terminal)
cd worker
npm install
npx wrangler dev
```

---

## Updating tasks

All task data lives in `frontend/src/data.js`. Edit it there and push — GitHub Actions redeploys automatically.

---

## Multiple users

Each browser gets a unique `user_id` stored in localStorage. Progress is stored separately per user in D1. Share the URL + PIN with anyone you want to give access.
