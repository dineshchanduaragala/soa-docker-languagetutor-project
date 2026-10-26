# LanguageTutor Frontend

React single-page application built with Vite and Bootstrap. The UI supports tutor listing, search and filters, add, edit, delete, and dashboard summaries.

## Local development

Install dependencies and start the Vite development server:

```powershell
npm ci
npm run dev
```

Vite serves the app at `http://localhost:5173` and proxies `/api` requests to the backend at `http://localhost:8080`. Start the backend first.

## Checks and production build

```powershell
npm run lint
npm run build
```

The production Docker image calls the backend at `http://localhost:2025/api` by default. Set `VITE_API_BASE_URL` at image build time when the backend is hosted at a different browser-accessible address.
