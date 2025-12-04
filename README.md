# SkillFoundry

SkillFoundry is an AI-driven learning companion that turns any goal into a structured, multi-week curriculum with lessons, quizzes, resources, and progress tracking. The stack is TypeScript end-to-end (React + Vite on the frontend, Node.js/Express on the backend) with MongoDB for persistence and a pluggable LLM service for content generation.

## Features
- AI-generated curricula with weekly plans, lessons, quizzes, and curated resources
- Personalization by skill, level, time per week, and learning goals
- Progress dashboard with completion tracking and mastery indicators
- JWT authentication and protected routes
- Social connections via Origin SDK (Camp) for verified sharing

## Tech Stack
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), JWT auth
- **AI:** Configurable chat-completions API (OpenAI-compatible)

## Quick Start
```bash
git clone <repository-url>
cd SkillFoundry
```

### Backend
```bash
cd backend
npm install
cp .env.example .env   # set MongoDB URI, JWT secret, AI keys
npm run dev            # or: npm run build && npm start
```

### Frontend
```bash
cd ../frontend
npm install
cp .env.example .env   # set API base URL and Origin client ID if used
npm run dev            # or: npm run build
```

Default ports: API on `http://localhost:3000`, frontend on `http://localhost:3001`.

## Environment
Backend (.env):
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/skillfoundry
JWT_SECRET=change-me
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
AI_MODEL_API_URL=https://api.openai.com/v1/chat/completions
AI_MODEL_API_KEY=your-key
AI_MODEL_NAME=gpt-3.5-turbo
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:3000/api
VITE_ORIGIN_CLIENT_ID=your-origin-client-id   # optional, for Camp/Origin social linking
```

## Project Structure
```
backend/   Express API (controllers, routes, services, models, middleware)
frontend/  React app (components, pages, services, types, utils)
```

## API Overview
- `POST /api/auth/register`, `POST /api/auth/login`
- `POST /api/curriculum`, `GET /api/curriculum`, `GET /api/curriculum/week/:week`, `GET /api/curriculum/dashboard`
- `POST /api/lessons/subtopic/:subtopicId/:curriculumId`, `GET /api/lessons/:lessonId`, `GET /api/lessons/:lessonId/quiz`, `POST /api/lessons/quiz/:quizId/submit`
- `GET /api/resources/topics/:topicId/:curriculumId`, `GET /api/resources/modules/:moduleId/:curriculumId/projects`, `POST /api/resources/:resourceId/complete`, `POST /api/resources/projects/:projectId/complete`, `GET /api/resources/portfolio`
- `GET /api/social/connections`, `POST /api/social/connect`, `DELETE /api/social/disconnect/:platform`, `POST /api/social/camp-network/verify`
- `GET /api/health`

## Deployment Notes
- Build backend: `npm run build` then `npm start`
- Build frontend: `npm run build` (deploy `dist/` to static hosting)
- Configure CORS (`FRONTEND_URL`) and production secrets
- Add monitoring/logging and rate limiting before going live

## Contributing
1. Fork and create a feature branch
2. Add or update tests where applicable
3. Keep TypeScript strict and lint clean
4. Submit a PR with a concise summary of changes

## License
MIT
