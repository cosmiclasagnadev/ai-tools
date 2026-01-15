# Quick Start Guide

## Prerequisites
- [Bun](https://bun.sh/) installed
- Supabase PostgreSQL database
- OpenAI API key

## Installation (5 minutes)

```bash
# Install dependencies
bun install

# Copy environment template and fill in your values
cp .env.example .env
# Edit .env with your credentials

# Create database and run migrations
bun run db:migrate

# Start development servers
bun run dev
```

**That's it!** Your stack is now running:
- 🌐 Frontend: http://localhost:3000
- ⚡ API: http://localhost:3001
- 📚 Swagger Docs: http://localhost:3001/swagger

## Common Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start all servers |
| `bun run dev:web` | Frontend only |
| `bun run dev:api` | Backend only |
| `bun run build` | Build all |
| `bun run db:generate` | Create migration |
| `bun run db:migrate` | Apply migration |
| `bun run db:studio` | Open Drizzle Studio |
| `bun run typecheck` | Check types |
| `bun run lint` | Run linter |

## Adding Dependencies

```bash
# Frontend
cd apps/web && bun add <package>

# Backend  
cd apps/api && bun add <package>

# Shared
cd packages/shared && bun add <package>
```

## Import Shared Code

```typescript
// Anywhere in apps/web or apps/api
import { formatDate, slugify } from '@aitools/shared';
import { db, tools } from '@aitools/db';
import type { Tool, User } from '@aitools/shared';
```

## Environment Variables

**Essential:**
```
DATABASE_URL=postgresql://...        # Supabase
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

**Optional (for Phase 2+):**
```
ENABLE_USER_ACCOUNTS=false
ENABLE_AI_CHAT=false
POLAR_ACCESS_TOKEN=...
FIRECRAWL_API_KEY=...
```

See `.env` for complete list.

## Project Structure Quick Reference

```
apps/web/          → Next.js frontend (http://3000)
apps/api/          → ElysiaJS backend (http://3001)
packages/db/       → Database schema & client
packages/shared/   → Types, constants, utils
docs/              → Architecture & user stories
```

## Next Steps

After setup is complete:

1. **Read** `docs/site-revamp-outline.md` for architecture overview
2. **Check** `docs/user-stories.md` for the roadmap
3. **Start** with Phase 1 features (Tool Directory, Admin Dashboard, etc.)
4. **Use** feature flags to control releases

## Troubleshooting

**Bun not found:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Dependencies not installing:**
```bash
rm -rf node_modules
bun install
```

**Database connection error:**
- Check `DATABASE_URL` in `.env`
- Verify Supabase project is active
- Ensure pgvector extension is enabled

**Port 3000/3001 already in use:**
```bash
# Change in apps/web/package.json and apps/api/src/index.ts
bun run dev -- --port 3002
```

## Support

- Architecture: See `docs/site-revamp-outline.md`
- Features: See `docs/user-stories.md`
- Setup issues: See `SETUP.md`

