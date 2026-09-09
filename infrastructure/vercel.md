# Vercel Infrastructure

The monorepo is deployed as two Vercel projects from the same Git repository.

## Projects

Create two Vercel projects:

| Project | Root Directory | Framework | Config |
| --- | --- | --- | --- |
| `ranking-gourmet-frontend` | `apps/frontend` | Next.js | `apps/frontend/vercel.json` |
| `ranking-gourmet-backend` | `apps/backend` | Express | `apps/backend/vercel.json` |

Use `gru1` for both projects when possible. Keep the database in a nearby region.

## Database

Use a managed PostgreSQL provider, such as Neon or Prisma Postgres. Do not run PostgreSQL inside a Vercel container or function.

Use the pooled connection string for the backend runtime:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST/dbname?sslmode=require
```

Use the provider's direct connection string from your local terminal when restoring dumps or running migrations manually.

## Environment Variables

Copy the relevant variables from `infrastructure/vercel.env.example` into each Vercel project.

Backend project variables:

```bash
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_BASE_URL=
FRONTEND_URL=
NODE_ENV=production
```

Frontend project variables:

```bash
BACKEND_API_URL=
BETTER_AUTH_BACKEND_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_AUTH_URL=/api/auth
```

## Deploy Flow

1. Restore the database dump into the managed PostgreSQL database.
2. Run backend migrations against the managed database:

```bash
cd apps/backend
npm run db:migrate:deploy
```

3. Deploy `ranking-gourmet-backend` from Vercel.
4. Deploy `ranking-gourmet-frontend` from Vercel.
5. Test login and CRUD operations before moving DNS.

## GitHub Actions Release Deploy

The workflow `.github/workflows/deploy-vercel.yml` deploys production when a tag matching `v*.*.*` or `V*.*.*` is pushed.

Configure these repository secrets in GitHub:

```bash
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID_BACKEND=
VERCEL_PROJECT_ID_FRONTEND=
PRODUCTION_DATABASE_URL=
```

`PRODUCTION_DATABASE_URL` should be the direct PostgreSQL connection string used for migrations. The backend Vercel project should still use the runtime connection string in its own `DATABASE_URL` environment variable.

Release command:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Local Development

The root `docker-compose.yml` remains for local development:

```bash
docker compose up --build
```
