# WRX Frontend (Next.js 16 + React 19)

Runs on **port 3000**. Expects the backend at **http://127.0.0.1:8000** (run from `backend/` first).

## Setup

```bash
cd frontend
npm install
```

## Run

**Development** (with hot reload):

```bash
npm run dev
```

→ http://localhost:3000

**Production build and run:**

```bash
npm run build
npm run start
```

## Environment

Optional: create `.env.local` and set:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

If unset, the app uses `http://127.0.0.1:8000` by default.
