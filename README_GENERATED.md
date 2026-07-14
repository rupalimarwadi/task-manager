# Task Manager

A full-stack task management application (React + Express + Prisma + PostgreSQL).

---

## Project Structure

- `backend/` — Express + TypeScript server with Prisma ORM
- `frontend/` — React + Vite TypeScript SPA

---

## Tech Stack

- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express, TypeScript
- ORM: Prisma
- Database: PostgreSQL

---

## Prerequisites

- Node.js 18+ (or compatible)
- PostgreSQL (local or remote)

---

## Backend — Setup & Run

1. Copy or create a `.env` file in the `backend/` folder with at least:

```env
DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DATABASE
PORT=3000
```

2. Install dependencies and generate Prisma client:

```bash
cd backend
npm install
npx prisma generate
```

3. Apply migrations and seed the DB (development):

```bash
# apply migrations (use migrate dev during development)
npx prisma migrate dev --name init

# run the configured seed script
npx prisma db seed
```

4. Run the server in development mode:

```bash
npm run dev
```

Build and run production bundle:

```bash
npm run build
npm run start
```

Notes:
- The backend serves the API at `http://localhost:3000/api/tasks` by default (see [backend/src/index.ts](backend/src/index.ts#L1-L50)).
- Prisma expects `DATABASE_URL` to point to your PostgreSQL instance (configured in [backend/prisma.config.ts](backend/prisma.config.ts#L1-L40)).

---

## Frontend — Setup & Run

1. Install dependencies and start Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

2. Build and preview production files:

```bash
npm run build
npm run preview
```

Notes:
- The frontend expects the API base URL at `http://localhost:3000/api` by default (see [frontend/src/config.ts](frontend/src/config.ts#L1-L10)). Update that file if your backend uses a different host/port.

---

## Useful Scripts

- Backend (in `backend/`):
  - `npm run dev` — run server via `tsx watch src/index.ts`
  - `npm run build` — compile TypeScript to `dist/`
  - `npm run start` — run compiled server from `dist/`

- Frontend (in `frontend/`):
  - `npm run dev` — start Vite dev server
  - `npm run build` — compile production assets
  - `npm run preview` — preview the production build

---

## Database Seeding

The repository includes a seed script at [backend/prisma/seed.ts](backend/prisma/seed.ts#L1-L200). After running `npx prisma db seed` you should see example tasks inserted.

---

## Tips

- If you prefer one terminal for the full stack, run the backend on a different port and update `frontend/src/config.ts` accordingly.

