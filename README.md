# AITools.sh - AI Tool Repository & Lead Magnet

A modern AI tool repository platform with integrated AI chatbot lead magnet, content automation engine, and monetization features.

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [ElysiaJS](https://elysiajs.com/) running on [Bun](https://bun.sh/)
- **Database**: [Supabase PostgreSQL](https://supabase.com/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Auth**: [Better Auth](https://better-auth.vercel.app/)
- **Payments**: [Polar](https://polar.sh/)
- **AI**: [OpenAI](https://openai.com/)
- **Email**: [Resend](https://resend.com/)
- **Content Engine**: [Firecrawl](https://firecrawl.dev/)

## Project Structure

```
aitools/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   └── components/  # React components
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── postcss.config.js
│   └── api/                 # ElysiaJS backend
│       ├── src/
│       │   └── index.ts     # API entry point
│       └── package.json
├── packages/
│   ├── db/                  # Drizzle ORM & schema
│   │   ├── src/
│   │   │   ├── schema.ts    # Database tables
│   │   │   ├── client.ts    # DB client
│   │   │   └── index.ts
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   └── shared/              # Shared types & utilities
│       ├── src/
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   ├── utils.ts
│       │   ├── features.ts
│       │   └── index.ts
│       └── package.json
├── docs/
│   ├── site-revamp-outline.md     # Architecture & detailed plan
│   └── user-stories.md             # Implementation roadmap
├── package.json              # Root workspace config
├── tsconfig.json            # Shared TypeScript config
└── .env                     # Environment variables
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- PostgreSQL database (Supabase recommended)

### Installation

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Run migrations
bun run db:migrate

# Start development servers
bun run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:3001) concurrently.

### Development Commands

```bash
# Start all apps in development mode
bun run dev

# Start only frontend
bun run dev:web

# Start only API
bun run dev:api

# Build all apps
bun run build

# Generate database migrations
bun run db:generate

# Run database migrations
bun run db:migrate

# Lint all packages
bun run lint

# Type check all packages
bun run typecheck

# Clean build artifacts
bun run clean
```

## Workspace Management

This is a Bun workspaces monorepo. Each app/package is independently versioned and deployed.

### Adding Dependencies

To add a dependency to a specific workspace:

```bash
# Add to frontend
cd apps/web && bun add <package>

# Add to backend
cd apps/api && bun add <package>

# Add to shared package
cd packages/shared && bun add <package>

# Add to database package
cd packages/db && bun add <package>
```

### Using Shared Packages

Frontend and API automatically have access to shared packages via workspace aliases:

```typescript
// In apps/web or apps/api
import { formatDate, slugify } from '@aitools/shared';
import { db } from '@aitools/db';
```

## Feature Flags

Features are controlled via environment variables:

```bash
ENABLE_USER_ACCOUNTS=false    # User auth & tokens
ENABLE_AI_CHAT=false          # AI chatbot
ENABLE_AI_SEARCH=false        # AI-powered search
```

## MVP Features (Phase 1)

- ✅ Tool Directory (browse, filter, search)
- ✅ Open Source Section (dedicated OSS tools)
- ✅ Admin Dashboard (manual tool entry, review queue)
- ✅ Content Engine (Firecrawl integration, AI enrichment)
- ✅ Affiliate System (click tracking, indicators)
- ✅ Advertising (Google AdSense)

## Roadmap

**Phase 2 (Feature Flagged)**:
- User Authentication & Token System
- AI Chat Chatbot with RAG
- Premium Placements

**Phase 3+**:
- Newsletter System
- Advanced Analytics
- Community Features

## Environment Variables

See `.env` file for all required variables. Key ones:

```
DATABASE_URL=postgresql://...         # Supabase connection
OPENAI_API_KEY=sk-...                 # OpenAI API key
FIRECRAWL_API_KEY=...                 # Content scraping
POLAR_ACCESS_TOKEN=...                # Payment processing
NEXT_PUBLIC_APP_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
```

## API Documentation

Once the API is running, visit: http://localhost:3001/swagger

## Database Management

### Generate Schema Changes

```bash
bun run db:generate
```

### Apply Migrations

```bash
bun run db:migrate
```

### Open Drizzle Studio

```bash
bun run db:studio
```

## Building for Production

```bash
# Build all apps
bun run build

# Frontend builds to apps/web/.next
# API builds to apps/api/dist
```

## Deployment

- **Frontend**: Deploy `apps/web` to Vercel
- **API**: Deploy `apps/api` to Bun Cloud or any Node.js host
- **Database**: Use Supabase's managed PostgreSQL

## Documentation

- [Site Revamp Outline](./docs/site-revamp-outline.md) - Architecture & technical details
- [User Stories](./docs/user-stories.md) - Feature specifications & acceptance criteria

## License

MIT
