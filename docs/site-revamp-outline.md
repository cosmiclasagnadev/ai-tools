# AITools.sh Site Revamp - High-Level Outline

## 1. Project Overview

**AITools.sh** is being revamped to become a comprehensive repository for AI tools that professionals across any industry can use to 10x their workflow. The platform serves dual purposes:

1. **Discovery Platform** - A curated directory of AI tools with intelligent search, filtering, and recommendations
2. **Lead Magnet** - An AI-powered chatbot that provides personalized tool recommendations and exports actionable playbooks

### Goals
- Help users discover the right AI tools for their specific industry and use case
- Generate leads through valuable AI-powered consultations
- Monetize through token-based AI chat, affiliate links, and advertising
- Automate content curation through intelligent scraping and AI enrichment

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Monorepo** | Bun Workspaces | Native workspace support, fast installs |
| **Frontend** | Next.js 15 (App Router) | SSR/SSG for SEO, React Server Components |
| **Backend** | ElysiaJS (Bun runtime) | High-performance API server, business logic |
| **Database** | Supabase PostgreSQL + pgvector | Relational data + vector embeddings for RAG |
| **ORM** | Drizzle | Type-safe database queries (shared package) |
| **Auth** | Better Auth | User authentication and session management |
| **Payments** | Polar | Token-based purchases, usage tracking |
| **Durable Streams** | Upstash Workflow + Realtime + Redis | Resilient AI chat with reconnection support |
| **AI** | OpenAI | GPT-4o-mini (chat), text-embedding-3-small (RAG) |
| **Email** | Resend | Transactional emails and newsletters |
| **Scraping** | Firecrawl | Automated tool discovery from sources |

### Key Infrastructure Decisions

- **Bun Workspaces**: Simple monorepo setup with native Bun support, no extra tooling needed
- **Supabase over Neon**: Built-in pgvector, connection pooling, and familiar Postgres tooling
- **ElysiaJS over Express**: Better performance with Bun, native TypeScript, elegant plugin system
- **Upstash for Durable Streams**: Chat survives page refresh, network interruptions, and server crashes
- **Drizzle over Prisma**: Lighter weight, better edge compatibility, SQL-like syntax

### Monorepo Structure

```
aitools/
├── apps/
│   ├── web/                    # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   ├── components/     # React components
│   │   │   └── lib/            # Frontend utilities
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── api/                    # ElysiaJS backend
│       ├── src/
│       │   ├── routes/         # API routes
│       │   ├── services/       # Business logic
│       │   ├── middleware/     # Auth, rate limiting
│       │   └── cron/           # Scheduled jobs
│       ├── index.ts            # Elysia entry point
│       └── package.json
│
├── packages/
│   ├── db/                     # Shared Drizzle schema & client
│   │   ├── src/
│   │   │   ├── schema.ts       # Drizzle schema definitions
│   │   │   ├── client.ts       # Database client
│   │   │   └── migrations/     # SQL migrations
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   │
│   └── shared/                 # Shared types, constants, utilities
│       ├── src/
│       │   ├── types/          # TypeScript types
│       │   ├── constants/      # Shared constants
│       │   └── utils/          # Shared utilities
│       └── package.json
│
├── package.json                # Root package.json with workspaces
├── bun.lockb                   # Bun lockfile
├── tsconfig.json               # Base TypeScript config
└── .env.example                # Environment variables template
```

### Bun Workspaces Configuration

```json
// Root package.json
{
  "name": "aitools",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "bun run --filter '*' dev",
    "dev:web": "bun run --filter web dev",
    "dev:api": "bun run --filter api dev",
    "build": "bun run --filter '*' build",
    "db:generate": "bun run --filter @aitools/db generate",
    "db:migrate": "bun run --filter @aitools/db migrate",
    "lint": "bun run --filter '*' lint",
    "typecheck": "bun run --filter '*' typecheck"
  }
}
```

### Package Dependencies (workspace:*)

```json
// apps/web/package.json
{
  "name": "web",
  "dependencies": {
    "@aitools/db": "workspace:*",
    "@aitools/shared": "workspace:*"
  }
}

// apps/api/package.json
{
  "name": "api",
  "dependencies": {
    "@aitools/db": "workspace:*",
    "@aitools/shared": "workspace:*"
  }
}
```

### Development Commands

```bash
# Install all dependencies (from root)
bun install

# Run all apps in dev mode
bun run dev

# Run specific app
bun run dev:web
bun run dev:api

# Add dependency to specific workspace
cd apps/web && bun add zod

# Add shared package dependency
cd apps/api && bun add @aitools/db
```

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NEXT.JS FRONTEND                                   │
│  (SSR/SSG for SEO, Chat UI, Tool Directory, Auth UI)                        │
│                                                                              │
│  Chat Flow:                                                                  │
│  1. POST /api/chat → triggers Upstash Workflow                              │
│  2. GET /api/chat?id=xxx → SSE stream from Upstash Realtime channel         │
└──────────────────────────────┬──────────────────────────────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
┌────────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐
│  UPSTASH STACK     │  │ ELYSIAJS BACKEND│  │       SUPABASE                  │
│                    │  │     (Bun)       │  │                                 │
│  ┌──────────────┐  │  │                 │  │  ┌─────────────────────────┐   │
│  │ Workflow     │  │  │  - Better Auth  │  │  │  PostgreSQL + pgvector  │   │
│  │ (Durable AI  │  │  │  - Polar        │  │  │  - Tools (embeddings)   │   │
│  │  execution)  │──┼──│  - Content Eng. │──│──│  - Users, Tokens        │   │
│  └──────────────┘  │  │  - Cron Jobs    │  │  │  - Conversations        │   │
│                    │  │  - Newsletter   │  │  │  - Affiliates           │   │
│  ┌──────────────┐  │  │                 │  │  └─────────────────────────┘   │
│  │ Realtime     │  │  └─────────────────┘  │                                 │
│  │ (Pub/Sub for │  │                       │  Connection pooling via         │
│  │  streaming)  │  │                       │  Supabase Transaction Mode      │
│  └──────────────┘  │                       └─────────────────────────────────┘
│                    │
│  ┌──────────────┐  │
│  │ Redis        │  │          ┌──────────────────────────────┐
│  │ (Chat history│  │          │       EXTERNAL APIS          │
│  │  + sessions) │  │          │  - OpenAI (LLM + Embeddings) │
│  └──────────────┘  │          │  - GitHub API (OSS stats)    │
└────────────────────┘          │  - Firecrawl (scraping)      │
                                └──────────────────────────────┘
```

### Durable Chat Stream Flow

```
┌─────────┐     POST /chat          ┌───────────────┐
│ Browser │ ──────────────────────► │ Elysia Route  │
│         │  {id, message}          │               │
└────┬────┘                         └───────┬───────┘
     │                                      │
     │                                      │ Triggers Upstash Workflow
     │                                      ▼
     │                              ┌───────────────────────────────────┐
     │                              │     UPSTASH WORKFLOW (Durable)    │
     │                              │                                   │
     │                              │  1. Store message in Redis        │
     │                              │  2. RAG: Query pgvector           │
     │                              │  3. Call OpenAI with tools        │
     │                              │  4. Execute tool calls            │
     │                              │  5. Stream chunks to Realtime     │
     │                              │  6. Save final response           │
     │                              └───────────────┬───────────────────┘
     │                                              │
     │  GET /chat?id=xxx (SSE)                      │ Emit chunks
     │ ◄────────────────────────────────────────────┤
     │  Reconnects & replays history                │
     │                                              ▼
     │                              ┌───────────────────────────────────┐
     │ ◄────────────────────────────│     UPSTASH REALTIME CHANNEL     │
     │   Stream: ai.chunk events    │  - Persists chunk history        │
     └──────────────────────────────│  - Allows reconnection           │
                                    │  - Replays missed chunks         │
                                    └───────────────────────────────────┘
```

**Benefits of Durable Streams:**
- User refreshes page → reconnects and receives remaining chunks
- Network interruption → auto-reconnects with history replay
- Workflow crashes → Upstash retries automatically
- Chat history persisted in Redis (sorted sets)

---

## 4. Site Structure

```
aitools.sh/
│
├── /                          # Homepage
│   ├── Hero with featured tools
│   ├── Industry quick links
│   ├── Latest additions
│   └── Submit tool CTA
│
├── /tools                     # Tool Directory (MVP)
│   ├── Search bar
│   ├── Filters (industry, category, pricing, OSS)
│   └── Tool grid/list view
│
├── /tools/[industry]          # Industry Hub Pages (MVP)
│   └── /tools/[industry]/[category]
│
├── /tool/[slug]               # Individual Tool Pages (MVP)
│   ├── Description, features, pricing
│   ├── GitHub stats (if OSS)
│   ├── Review summary
│   ├── Alternatives
│   └── Affiliate link with indicator
│
├── /open-source               # OSS Tools Section (MVP)
│   ├── License filter
│   ├── Language filter
│   ├── Stars filter
│   ├── Self-hostable toggle
│   └── Docker support toggle
│
├── /submit                    # User Tool Submission (MVP)
│   ├── Submission form
│   ├── Basic validation
│   └── Success confirmation
│
├── /go/[slug]                 # Affiliate Redirect (MVP)
│   └── Track click & redirect
│
├── /affiliate-disclosure      # Legal Disclosure (MVP)
│
├── /compare                   # Tool Comparison (Post-MVP)
│   └── Dynamic multi-tool comparison
│
├── /chat                      # AI Assistant (Feature Flagged)
│   ├── Template question buttons
│   ├── Natural language chat
│   ├── Tool call results display
│   ├── Playbook export
│   └── Token/registration gate
│
├── /dashboard                 # User Dashboard (Feature Flagged)
│   ├── Token balance
│   ├── Purchase tokens
│   ├── Redeem coupon
│   ├── Conversation history
│   ├── Saved playbooks
│   └── Favorite tools
│
├── /admin                     # Super Admin (MVP)
│   ├── /admin                 # Dashboard home with stats (MVP)
│   ├── /admin/tools           # Review queue + manual entry (MVP)
│   ├── /admin/affiliates      # Affiliate stats (MVP)
│   ├── /admin/coupons         # Coupon management (Post-MVP)
│   └── /admin/newsletter      # Newsletter management (Post-MVP)
```

### Feature Flags

```typescript
// src/config/features.ts
export const FEATURES = {
  ENABLE_USER_ACCOUNTS: process.env.ENABLE_USER_ACCOUNTS === 'true',
  ENABLE_AI_CHAT: process.env.ENABLE_AI_CHAT === 'true',
  ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH === 'true',
} as const;
```

---

## 5. Monetization Model

### Token System

| Tier | Access | Cost |
|------|--------|------|
| **Anonymous** | 4 free questions, no export | Free |
| **Registered** | Unlimited browse, buy tokens | Free signup |
| **Token Usage** | 1 token/message, 5 tokens/playbook | $0.07-0.10/token |

### Token Packages

| Package | Tokens | Price | Per Token |
|---------|--------|-------|-----------|
| Starter | 100 | $10 | $0.10 |
| Regular | 500 | $40 | $0.08 |
| Power | 1,000 | $70 | $0.07 |
| Enterprise | 2,500 | $150 | $0.06 |

### Revenue Streams

1. **Token Sales** - Primary revenue from AI chat usage
2. **Affiliate Links** - Commission from tool signups (clearly indicated)
3. **Google AdSense** - Non-intrusive placements on directory pages
4. **Coupon Codes** - Promotional tokens for marketing campaigns

### Future Revenue (Post-traction)

- Premium placement ads for AI tool companies
- Sponsored tool listings
- Newsletter sponsorships

---

## 6. Key Features

### 6.1 AI Assistant Chatbot

**Capabilities:**
- Search tools by industry, use case, or natural language query
- Find alternatives (cheaper, easier, open-source)
- Compare multiple tools side-by-side
- Generate implementation workflows
- Export personalized playbooks with competitor analysis

**Tool Calls:**
```
search_tools(query, industry?, categories?, priceRange?, isOpenSource?)
find_alternatives(toolName, criteria: "cheaper" | "easier" | "open-source")
compare_tools(toolNames[])
generate_workflow(goal, industry?, budget?, teamSize?)
```

**Playbook Export Structure:**
- Current situation summary
- Recommended tool stack with reasoning
- Competitor analysis & differentiators
- Week-by-week implementation roadmap
- Success metrics
- Risk mitigation strategies
- Resources and next steps

### 6.2 RAG-Powered Search

- Tool descriptions embedded with text-embedding-3-small
- pgvector cosine similarity search
- Semantic understanding of user queries
- Relevant tools injected as LLM context

### 6.3 Content Engine

**Pipeline:**
```
┌─────────────────────────────────────────────────────────┐
│                    CONTENT SOURCES                       │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ User Submit  │  │  Firecrawl   │  │   GitHub     │  │
│  │  /submit     │  │  (Daily)     │  │  Trending    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
└─────────┼─────────────────┼──────────────────┼──────────┘
          │                 │                  │
          └─────────────────┼──────────────────┘
                            ▼
                   ┌─────────────────┐
                   │ Duplicate Check │
                   └────────┬────────┘
                            ▼
                   ┌─────────────────┐
                   │ AI Enrichment   │
                   │ (GPT-4o-mini)   │
                   └────────┬────────┘
                            ▼
                   ┌─────────────────┐
                   │ Confidence Score│
                   └────────┬────────┘
                            ▼
          ┌─────────────────────────────────┐
          │     ADMIN REVIEW QUEUE          │
          │  (User submissions at top)      │
          │                                 │
          │  [Approve] [Edit] [Reject]      │
          └────────────────┬────────────────┘
                           ▼
                  ┌─────────────────┐
                  │ Published Tool  │
                  │ + Newsletter Q  │
                  └─────────────────┘
```

**Sources:**
- **User Submissions** (/submit page) - Prioritized in queue
- Product Hunt (AI category)
- GitHub Trending (AI topics)
- Awesome Lists (awesome-ai-tools, etc.)

**User Submission Flow:**
1. User fills form at `/submit` (name, URL, optional description)
2. Basic validation + spam prevention (honeypot, rate limit)
3. Creates `scraped_tools` record with source "user_submission"
4. Auto-triggers AI enrichment
5. Pushed to top of admin review queue
6. Optional: Thank you email to submitter on approval

### 6.4 Open Source Tools Section

**Special Features:**
- GitHub stats (stars, forks, last commit, language, license)
- Self-hostable indicator
- Docker support indicator
- Setup difficulty rating
- Installation instructions
- Activity status (active/inactive based on commits)

**Filters:**
- License type (MIT, Apache, GPL, etc.)
- Primary language
- Minimum stars
- Self-hostable only
- Docker support only

### 6.5 Affiliate System

- Click tracking with privacy-preserving IP hashing
- UTM parameter capture
- Redirect endpoint: `/go/[tool-slug]`
- Clear affiliate indicators on UI
- `rel="sponsored noopener"` on affiliate links
- Dedicated disclosure page

### 6.6 Newsletter Automation

- Auto-generated from newly published tools
- Weekly digest format
- Segmented by industry preference
- Managed through admin dashboard
- Sent via Resend

---

## 7. Database Schema Overview

### Core Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts, tokens, preferences |
| `sessions` | Better Auth sessions |
| `accounts` | OAuth providers |
| `tools` | Tool directory with embeddings |
| `github_stats` | OSS tool GitHub metrics |
| `conversations` | Chat sessions |
| `messages` | Individual chat messages |
| `favorites` | User-saved tools |
| `token_purchases` | Payment records |
| `coupons` | Promotional codes |
| `coupon_usages` | Redemption tracking |
| `affiliate_clicks` | Click analytics |
| `scraped_tools` | Content engine queue |
| `newsletters` | Newsletter archive |
| `newsletter_subscribers` | Subscriber list |

### Key Indexes

- `tools.embedding` - HNSW index for vector search
- `tools.slug` - Unique index for URL lookups
- `tools.status` - Filter by publication status
- `affiliate_clicks.created_at` - Time-series analytics

---

## 8. Environment Variables

```bash
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."  # For migrations

# Auth (Better Auth)
BETTER_AUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Payments (Polar)
POLAR_ACCESS_TOKEN="..."
POLAR_WEBHOOK_SECRET="..."
POLAR_TOKEN_PRODUCT_ID="..."

# AI (OpenAI)
OPENAI_API_KEY="..."

# Upstash
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
QSTASH_TOKEN="..."
UPSTASH_WORKFLOW_URL="..."

# Content Engine
FIRECRAWL_API_KEY="..."
GITHUB_TOKEN="..."

# Email
RESEND_API_KEY="..."

# Ads
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-..."
NEXT_PUBLIC_ADSENSE_HEADER_SLOT="..."
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT="..."
NEXT_PUBLIC_ADSENSE_INFEED_SLOT="..."

# App
NEXT_PUBLIC_APP_URL="https://aitools.sh"
BACKEND_URL="https://api.aitools.sh"
```

---

## 9. Development Phases

### Phase 1: MVP Foundation (Weeks 1-2)

**Bun Workspaces Setup:**
- [ ] Initialize monorepo with Bun workspaces in root `package.json`
- [ ] Create `apps/web` (Next.js 15)
- [ ] Create `apps/api` (ElysiaJS + Bun)
- [ ] Create `packages/db` (Drizzle schema & client)
- [ ] Create `packages/shared` (types, constants)
- [ ] Configure workspace scripts (dev, build, lint)
- [ ] Set up shared TypeScript config

**Database & Admin:**
- [ ] Supabase project setup with pgvector extension
- [ ] Drizzle schema in `packages/db`
- [ ] Database migrations workflow
- [ ] Admin dashboard with protected routes (apps/web)
- [ ] Manual tool entry form (seed initial content)

**Core Pages:**
- [ ] Tool directory pages (browse, filter, search)
- [ ] Individual tool detail pages
- [ ] Industry hub pages
- [ ] Basic keyword search

### Phase 2: MVP Features (Weeks 3-4)
- [ ] Open source tools section with GitHub stats
- [ ] OSS-specific filters (license, language, stars)
- [ ] `/submit` page for user tool submissions
- [ ] Content engine: AI enrichment pipeline
- [ ] Admin review queue (prioritize user submissions)
- [ ] Publishing workflow
- [ ] Basic admin analytics (tools published, submissions)

### Phase 3: MVP Monetization (Weeks 5-6)
- [ ] Affiliate link tracking (`/go/[slug]` endpoint)
- [ ] Affiliate indicators on UI
- [ ] Affiliate disclosure page
- [ ] Google AdSense integration
- [ ] Ad slots: header, sidebar, in-feed
- [ ] Admin affiliate stats dashboard
- [ ] **MVP Launch!**

### Phase 4: AI Chat System (Post-MVP, Feature Flagged)
- [ ] Better Auth integration
- [ ] User registration & login
- [ ] Upstash Workflow Elysia adapter
- [ ] Chat UI with durable streaming
- [ ] RAG implementation with pgvector
- [ ] Tool calling functions
- [ ] Playbook generation and export
- [ ] Token system with Polar
- [ ] Coupon system
- [ ] Enable feature flags

### Phase 5: Polish & Growth
- [ ] Newsletter automation
- [ ] Firecrawl automated scraping
- [ ] AI-powered search (feature flagged)
- [ ] Analytics dashboard
- [ ] Performance optimization

---

## 10. Success Metrics

### MVP Metrics (Launch)

**Traffic & Engagement:**
- Page views per day
- Tools viewed per session
- Return visitor rate
- Time on site
- Bounce rate

**Content:**
- Tools published per week
- User submissions received
- Approval rate (submitted → published)
- Open source tools coverage

**Revenue:**
- Affiliate click-through rate
- Affiliate conversions (if trackable)
- Ad revenue (CPM)
- Ad viewability rate

### Post-MVP Metrics (AI Chat)

**Lead Generation:**
- Email signups per day
- Chat conversations started
- Playbooks exported
- Free → Registered conversion rate

**AI Engagement:**
- Chat messages per conversation
- Tool recommendations clicked
- Playbook exports

**Token Revenue:**
- Token purchase revenue
- Average tokens per user
- Coupon redemption rate

### Content Engine
- Tools scraped per week
- Duplicate detection rate
- Average confidence score
- Newsletter open/click rates

