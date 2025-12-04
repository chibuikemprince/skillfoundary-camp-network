# Setup Guide

This walkthrough gets SkillFoundry running locally with separate backend and frontend dev servers.

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud)
- AI API key (OpenAI-compatible)
- Git

## 1) Clone
```bash
git clone <your-repository-url>
cd SkillFoundry
```

## 2) Backend setup
```bash
cd backend
npm install
cp .env.example .env
```
Edit `.env` with your MongoDB URI, JWT secret, and AI settings:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/skillfoundry
JWT_SECRET=change-me
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
AI_MODEL_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL_API_KEY=your-api-key
AI_MODEL_NAME=gpt-3.5-turbo
```
Start the API:
```bash
npm run dev
```

## 3) Frontend setup
```bash
cd ../frontend
npm install
cp .env.example .env
```
Set the API URL (and Origin client ID if using social linking):
```
REACT_APP_API_URL=http://localhost:3000/api
VITE_ORIGIN_CLIENT_ID=
```
Start the app:
```bash
npm run dev
```

## 4) Access
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Health: http://localhost:3000/health

## Common issues
- **MongoDB connection:** ensure mongod is running and URI is correct.
- **Port conflicts:** find and stop the process using the port (`lsof -i :3000` or OS equivalent).
- **AI errors:** confirm API key, quota, and URL.
- **CORS:** ensure `FRONTEND_URL` matches your frontend origin.

## Reset and reinstall
```bash
rm -rf backend/node_modules frontend/node_modules
npm run install-all
npm run dev:backend   # in one terminal
npm run dev:frontend  # in another
```
