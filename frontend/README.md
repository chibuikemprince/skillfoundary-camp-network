# SkillFoundry Frontend

React + TypeScript single-page app built with Vite and Tailwind. It delivers the learner dashboard, curriculum views, lessons, quizzes, and social connections (Origin SDK).

## Features
- Protected routes for dashboard, week view, and lessons
- Curriculum/lesson rendering with quizzes and resource links
- Origin SDK integration for Camp social linking (optional)
- JWT-based auth with local storage
- Tailwind styling and Lucide icons
- TanStack Query for server-state fetching

## Stack
- React 18, TypeScript, Vite
- Tailwind CSS, React Router v6
- TanStack Query, React Hook Form
- Axios for HTTP

## Project structure
```
src/
  components/   reusable UI
  pages/        route components
  services/     API clients
  types/        shared interfaces
  utils/        helpers
  App.tsx       routes
  main.tsx      entry + providers
```

## Setup
```bash
cd frontend
npm install
cp .env.example .env
```
Configure:
```
REACT_APP_API_URL=http://localhost:3000/api
VITE_ORIGIN_CLIENT_ID=your-origin-client-id   # optional
```

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview build output
- `npm run lint` — lint source

## Deployment
Build with `npm run build` and deploy `dist/` to your static host (Netlify, Vercel, Cloudflare Pages, S3+CDN, etc.). Set environment variables in your host to point at the backend API and (optionally) the Origin client ID.

## Notes
- The app expects the backend at `REACT_APP_API_URL`.
- For Origin/Camp social linking, the Origin client ID is required; without it, the linking UI will remain disabled.
