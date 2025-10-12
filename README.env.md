Environment variables for RoomMate (frontend + backend)

Overview
- The project has two parts:
  - server/ (Express backend)
  - client/ (Vite + React frontend)

Files added
- server/.env.example  - template for backend env
- server/.env          - local backend env (DO NOT COMMIT secrets)
- client/.env.example  - template for frontend env (Vite)
- client/.env          - local frontend env (used by Vite in dev)

Backend variables (server/.env)
- PORT: port the Express server listens on (default: 5000)
- GEMINI_API_KEY: API key for Google Generative AI (Gemini). Keep secret.
- NODE_ENV (optional): development | production
- CORS_ORIGIN (optional): specify allowed origin (e.g., http://localhost:5173)

Frontend variables (client/.env)
- VITE_API_URL: URL of backend API (e.g., http://localhost:5000). Vite only exposes variables prefixed with VITE_.
- VITE_*: Any other public config keys. Beware these are visible to users.

How to use
1) Copy examples to local .env files:
   - macOS / Linux: cp server/.env.example server/.env
   - macOS / Linux: cp client/.env.example client/.env
   - Windows PowerShell: Copy-Item server/.env.example server/.env
   - Windows PowerShell: Copy-Item client/.env.example client/.env
   (Or create the files manually in a text editor)

2) Fill in the real GEMINI_API_KEY in `server/.env`.

3) Run the backend:
   - From project root: cd server; npm install; npm run dev (or node index.js)

4) Run the frontend:
   - From project root: cd client; npm install; npm run dev

Note: After changing `server/.env` restart the backend process so the new environment
variables are loaded (process.env is read at startup).

Notes
- Do NOT commit real secret keys. Use the `.env.example` files as templates only.
- The frontend reads `VITE_API_URL` via `import.meta.env.VITE_API_URL`.
