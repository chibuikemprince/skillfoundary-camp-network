# Deployment Guide

SkillFoundry ships as a TypeScript/Node API and a Vite/React frontend. Deploy them separately or together; the steps below cover common targets.

## Backend
1) Install and build
```bash
cd backend
npm install
npm run build
```
2) Configure environment (`.env`)
```
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain
AI_MODEL_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL_API_KEY=your-openai-api-key
AI_MODEL_NAME=gpt-3.5-turbo
```
3) Run
```bash
npm start
```
4) Hosting options (choose one)
- Any Node host (Render, Railway, Fly.io, Heroku, VPS with PM2)
- Docker: build the app, copy `dist/`, run `node dist/server.js`

## Frontend
1) Install and build
```bash
cd frontend
npm install
npm run build
```
2) Configure environment (`.env`)
```
REACT_APP_API_URL=https://your-backend-domain/api
VITE_ORIGIN_CLIENT_ID=your-origin-client-id   # optional, for Camp/Origin social linking
```
3) Deploy `dist/` to static hosting (Netlify, Vercel, Cloudflare Pages, S3 + CDN, etc.).

## Local development (split servers)
```bash
# terminal 1
cd backend && cp .env.example .env && npm run dev

# terminal 2
cd frontend && cp .env.example .env && npm run dev
```
Frontend runs on `http://localhost:3001`, API on `http://localhost:3000` by default.

## CORS
Set `FRONTEND_URL` in backend `.env` to your deployed frontend origin. For multiple origins, update the CORS allowlist in `backend/src/server.ts`.

## Health checks
- Backend: `GET /health`
- Frontend: hit the deployed URL and verify API calls succeed

## Production checklist
- Strong `JWT_SECRET` and locked-down `.env`
- HTTPS everywhere
- CORS restricted to trusted origins
- MongoDB secured (auth + network rules)
- Rate limiting and logging enabled
- Error tracking and monitoring in place
