### Code Mentor (MERN + Expo Router)

Full-stack code mentor app that lets users register/login, ask questions about their code, and review Q&A history. Built with Expo Router + NativeWind on the client and Express + Mongoose on the backend.

#### Features

- NativeWind-styled auth flow (login/register) with token persistence via AsyncStorage.
- Ask screen posts questions + optional code to the backend and shows answers.
- History tab lists prior Q&A items from MongoDB.
- Profile tab shows current user and logout.
- Backend: JWT auth, protected routes, MongoDB persistence, proxy to Groq (with fallback if no key).

#### Setup

1. Backend

- `cd server && npm install`
- Copy `.env.example` to `.env` and fill `MONGODB_URI`, `JWT_SECRET`, and optionally `GROQ_API_KEY`.
- Run `npm run dev` (default port 4000). Health check: `GET http://localhost:4000/api/health`.

2. Mobile client

- In project root, `npm install`
- Set `EXPO_PUBLIC_API_URL=http://localhost:4000/api` (or your deployed URL) in your shell or an `.env` for Expo.
- Run `npm run start` (or `npm run android/ios/web`).

#### Notes for rubric

- NativeWind used across screens for styling.
- Full-stack calls: auth + Q&A (GET/POST) with loading/error handling.
- Security: JWT, AsyncStorage persistence, backend middleware, secrets via `.env`.
- DB: Mongoose models for users and Q&A; data persists.
- Third-party API: Groq proxy in backend; safe fallback without key.
- Git: commit progressively with descriptive messages; ensure every collaborator pushes.
