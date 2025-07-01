# AI Interview Practice Platform 🎙️

An AI-powered interview simulator that:
- Parses your resume
- Asks real-time questions via OpenAI GPT
- Responds to your answers
- Provides feedback + transcript

## 🔧 Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node app.js
```

## 🔐 Environment

Create `.env` in backend:
```
OPENAI_API_KEY=sk-xxxx
PORT=5000
```

## 🌿 GitHub Flow
1. `main` – production only
2. `dev` – staging/integration
3. `feature/resume-parser`, `feature/chat-ui`, etc.
4. Make PRs from `feature/*` to `dev`
5. Merge `dev` to `main` when fully tested
