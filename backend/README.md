# SkillFoundry Backend API

Node.js/Express API (TypeScript) that powers SkillFoundry’s AI-driven curricula, lessons, quizzes, resources, social connections, and progress tracking.

## Features
- AI-generated curricula, lessons, quizzes, and resource recommendations
- JWT authentication with bcrypt-based password hashing
- MongoDB persistence via Mongoose
- RESTful endpoints with validation and error handling
- CORS configuration for the frontend

## Stack
- Node.js 18+, TypeScript, Express
- MongoDB (Mongoose)
- JWT, bcryptjs, express-validator
- Configurable LLM API (OpenAI-compatible)

## Project structure
```
src/
  controllers/   request handlers
  models/        MongoDB schemas
  routes/        API routes
  services/      business logic + AI integration
  middleware/    auth, validation, errors
  types/         shared types
  db/            database connection
  server.ts      entrypoint
```

## Setup
```bash
cd backend
npm install
cp .env.example .env
```
Configure `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/skillfoundry
JWT_SECRET=change-me
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
AI_MODEL_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL_API_KEY=your-openai-key
AI_MODEL_NAME=gpt-3.5-turbo
```

## Scripts
- `npm run dev` — start in watch mode
- `npm run build` — compile TypeScript
- `npm start` — run compiled server

## Key endpoints (base `/api`)
- Auth: `POST /auth/register`, `POST /auth/login`
- Curriculum: `POST /curriculum`, `GET /curriculum`, `GET /curriculum/week/:week`, `GET /curriculum/dashboard`
- Lessons/Quizzes: `POST /lessons/subtopic/:subtopicId/:curriculumId`, `GET /lessons/:lessonId`, `GET /lessons/:lessonId/quiz`, `POST /lessons/quiz/:quizId/submit`
- Resources/Projects: `GET /resources/topics/:topicId/:curriculumId`, `GET /resources/modules/:moduleId/:curriculumId/projects`, `POST /resources/:resourceId/complete`, `POST /resources/projects/:projectId/complete`, `GET /resources/portfolio`
- Social: `GET /social/connections`, `POST /social/connect`, `DELETE /social/disconnect/:platform`, `POST /social/camp-network/verify`
- Health: `GET /health`

## Deployment
1) Build: `npm run build`
2) Run: `npm start`
3) Host on your Node platform of choice (Render, Railway, Fly.io, VPS with PM2, Docker, etc.)
4) Set production env vars (DB URI, JWT secret, AI keys, CORS frontend URL)

## Notes
- Use strong JWT secrets and secure MongoDB credentials in production.
- Apply rate limiting and logging before public exposure.
- Update CORS allowlist in `server.ts` if you add multiple frontend origins.
