⚠️ Archived Project  
This repository represents an earlier PluralPost implementation and is no longer actively maintained. It is preserved for historical/reference purposes.

# PluralPost

PluralPost is a multi-site headless CMS for teams managing content, subscribers, and email campaigns across multiple websites from one admin app.

## What it does

- Manage multiple websites from one dashboard.
- Create/edit/publish/unpublish/delete posts.
- Upload post and featured images.
- Manage subscribers per website.
- Draft and send bulk email campaigns.
- Support multiple user roles (`admin`, `editor`, `user`).
- Trigger site revalidation/build hooks after post updates.

## Tech stack

- **Frontend:** React + TypeScript (Create React App)
- **Backend:** Node.js + Express + TypeScript
- **Database:** MongoDB + Mongoose
- **Editor:** CKEditor 5 custom build

## Repository layout

- `frontend/` — React SPA admin app.
- `backend/` — Express API, auth, business logic, templates.
- `docs/API.md` — API reference for backend endpoints.

## Local development

From repo root:

```bash
npm install
npm run dev
```

This starts both apps concurrently:

- Frontend on `http://localhost:3000`
- Backend API on `http://localhost:3030/api/v1`

Useful root scripts:

- `npm run dev` — frontend + backend dev mode.
- `npm run build` — frontend production build.
- `npm run client` — frontend only.
- `npm run server-dev` — backend TS watch + nodemon.
- `npm run start` — frontend + backend start scripts.

## Environment configuration

### Backend (`/backend/config.env`)

- `NODE_ENV` — `development` or `production`
- `PORT` — e.g. `3030`
- `DATABASE` — MongoDB URI containing `<password>` placeholder
- `DATABASE_PASSWORD` — password for `DATABASE` URI
- `CLIENT_URL` — frontend base URL used in password reset email links
- `IMAGE_STORAGE_POSTS` — file-system path for post images (e.g. `dist/public/img/`)
- `JWT_SECRET` — JWT signing key
- `JWT_EXPIRES_IN` — token lifetime (e.g. `1d`, `1h`)
- `JWT_COOKIE_EXPIRES_IN` — auth cookie expiry in days
- `JWT_PHOTO` — token used by protected image upload path
- `SERVER_URL` — backend public base URL (used for generated asset URLs)
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`, `EMAIL_FROM` — SMTP settings
- `REVALIDATE_TOKEN` — token sent to Next.js revalidation endpoint

### Frontend (`/frontend/.env.development` or `.env.production`)

Do not place secrets in frontend env files.

- `REACT_APP_SERVER_URL` — API base URL, e.g. `http://localhost:3030/api/v1`
- `REACT_APP_SERVER` — backend origin, e.g. `http://localhost:3030/`

## Architecture notes

- Cookie-based JWT auth (`jwt` cookie, `credentials: include` from frontend).
- Role-based route protection in API (`restrictTo`).
- Multi-tenant content model: website-specific collections (`Post`, `Subscribers`, `Email`) are resolved from `/:website/...` route params.
- Website metadata and users are stored in shared collections.

## API docs

See [docs/API.md](docs/API.md) for endpoint details, auth notes, and example payloads.
