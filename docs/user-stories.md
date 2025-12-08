# AITools.sh - User Stories

This document contains user stories extracted from the site revamp plan, organized by epic. Each story includes acceptance criteria based on the implementation details.

**Note:** Epics are ordered by implementation priority. User Authentication & Tokens and AI Chat System are behind feature flags for post-MVP release.

---

## Epic 0: Project Foundation (Bun Workspaces)

### US-0.1: Initialize Bun Workspaces Monorepo ✅

**As a** developer  
**I want to** set up a Bun workspaces monorepo  
**So that** I can manage frontend and backend code in a single repository

**Acceptance Criteria:**
- [x] Initialize monorepo with `bun init`
- [x] Configure `workspaces` array in root `package.json`
- [x] Create folder structure: `apps/`, `packages/`
- [x] Set up root scripts for dev, build, lint
- [x] Configure shared TypeScript base config
- [x] Add `.env.example` with all required variables

---

### US-0.2: Create Next.js Frontend App ✅

**As a** developer  
**I want to** set up the Next.js 15 frontend  
**So that** I can build the public-facing website

**Acceptance Criteria:**
- [x] Create `apps/web` with Next.js 15 (App Router)
- [x] Configure Tailwind CSS
- [x] Set up shadcn/ui components (placeholder)
- [x] Configure environment variables
- [x] Add workspace dependencies: `"@aitools/db": "workspace:*"`
- [x] Add dev script to package.json

---

### US-0.3: Create ElysiaJS Backend App ✅

**As a** developer  
**I want to** set up the ElysiaJS backend  
**So that** I can build the API server and business logic

**Acceptance Criteria:**
- [x] Create `apps/api` with ElysiaJS + Bun
- [x] Configure CORS for frontend URL
- [x] Set up Swagger documentation
- [x] Configure environment variables
- [x] Add workspace dependencies: `"@aitools/db": "workspace:*"`
- [x] Add dev script: `bun run --hot src/index.ts`

---

### US-0.4: Create Shared Database Package ✅

**As a** developer  
**I want to** create a shared database package  
**So that** both frontend and backend use the same schema and client

**Acceptance Criteria:**
- [x] Create `packages/db` with Drizzle ORM
- [x] Define complete database schema (tools, users, etc.)
- [x] Configure Supabase connection with pooling
- [x] Set up migration workflow (`db:generate`, `db:migrate`)
- [x] Export typed database client
- [x] Add pgvector support for embeddings

---

### US-0.5: Create Shared Types Package ✅

**As a** developer  
**I want to** create a shared types/utilities package  
**So that** I can share TypeScript types and constants between apps

**Acceptance Criteria:**
- [x] Create `packages/shared` with TypeScript
- [x] Define shared types (Tool, User, Category, etc.)
- [x] Define shared constants (industries, categories, pricing types)
- [x] Define feature flags configuration
- [x] Export utility functions (formatting, validation)

---

### US-0.6: Configure Development Environment ✅

**As a** developer  
**I want to** run the full stack locally  
**So that** I can develop and test features

**Acceptance Criteria:**
- [x] `bun run dev` starts both apps concurrently
- [x] Hot reload works for both frontend and backend
- [x] Shared packages changes reflect immediately
- [x] Environment variables loaded from `.env`
- [x] Database migrations run with `bun run db:migrate`
- [x] README with setup instructions

---

## Epic 1: Tool Directory

### US-1.1: Browse All Tools

**As a** visitor  
**I want to** browse all AI tools  
**So that** I can discover what's available

**Acceptance Criteria:**
- [ ] Grid/list view of all published tools
- [ ] Tool card shows: logo, name, tagline, categories, pricing type
- [ ] Pagination or infinite scroll
- [ ] Sort options: newest, popular, alphabetical

---

### US-1.2: Filter Tools

**As a** visitor  
**I want to** filter tools by various criteria  
**So that** I can narrow down my options

**Acceptance Criteria:**
- [ ] Filter by industry (marketing, sales, design, etc.)
- [ ] Filter by category (copywriting, image-generation, etc.)
- [ ] Filter by pricing (free, freemium, paid)
- [ ] Filter by open source (yes/no)
- [ ] Multiple filters can be combined
- [ ] URL params update with filters (shareable)
- [ ] Clear all filters button

---

### US-1.3: View Tool Details

**As a** visitor  
**I want to** view detailed information about a tool  
**So that** I can evaluate if it's right for me

**Acceptance Criteria:**
- [ ] Tool detail page at `/tool/[slug]`
- [ ] Display: logo, name, tagline, full description
- [ ] Features list with pros/cons
- [ ] Pricing information (tiers if available)
- [ ] External link to tool website
- [ ] Categories and industries tags
- [ ] Review summary (if available)
- [ ] Alternatives section

---

### US-1.4: Browse by Industry

**As a** visitor  
**I want to** browse tools by industry  
**So that** I can find tools relevant to my field

**Acceptance Criteria:**
- [ ] Industry hub pages at `/tools/[industry]`
- [ ] Industry overview content
- [ ] Top tools for industry
- [ ] Common use cases
- [ ] Category breakdown within industry

---

### US-1.5: Basic Keyword Search

**As a** visitor  
**I want to** search for tools by keywords  
**So that** I can quickly find specific tools

**Acceptance Criteria:**
- [ ] Search input in header/toolbar
- [ ] Search by tool name, description, categories
- [ ] Display matching results
- [ ] Highlight search terms in results
- [ ] "No results" state with suggestions

---

## Epic 2: Open Source Tools Section

### US-2.1: Browse Open Source Tools

**As a** visitor  
**I want to** browse open source AI tools specifically  
**So that** I can find free, self-hostable options

**Acceptance Criteria:**
- [ ] Dedicated page at `/open-source`
- [ ] Only show tools where `is_open_source = true`
- [ ] Display GitHub badge (stars, forks, language, license)
- [ ] Show "Active" indicator if recent commits
- [ ] Different card design emphasizing OSS features

---

### US-2.2: Filter OSS Tools

**As a** visitor  
**I want to** filter open source tools by specific criteria  
**So that** I can find exactly what I need

**Acceptance Criteria:**
- [ ] Filter by license (MIT, Apache, GPL, etc.)
- [ ] Filter by primary language (Python, TypeScript, Go, etc.)
- [ ] Filter by minimum GitHub stars (100+, 1k+, 5k+, 10k+)
- [ ] Filter by self-hostable only
- [ ] Filter by Docker support
- [ ] Filter by setup difficulty (easy, medium, hard)

---

### US-2.3: View OSS Tool Details

**As a** visitor  
**I want to** view detailed open source tool information  
**So that** I can evaluate and set it up

**Acceptance Criteria:**
- [ ] GitHub stats section (stars, forks, watchers, open issues)
- [ ] Last commit date with activity indicator
- [ ] License badge
- [ ] Primary language badge
- [ ] Contributors count
- [ ] Installation instructions (Docker, from source)
- [ ] Link to repository
- [ ] Self-hosting guide (if available)

---

### US-2.4: Sync GitHub Stats

**As a** system  
**I want to** automatically update GitHub stats  
**So that** users see current information

**Acceptance Criteria:**
- [ ] Daily cron job to update GitHub stats
- [ ] Fetch via GitHub API (authenticated for rate limits)
- [ ] Update: stars, forks, watchers, open issues, last commit
- [ ] Store in `github_stats` table
- [ ] Handle API errors gracefully
- [ ] Rate limit: 1 second delay between requests

---

## Epic 3: Content Engine & Tool Submissions

### US-3.1: Submit Tool (User)

**As a** visitor  
**I want to** submit an AI tool I discovered  
**So that** it can be added to the directory

**Acceptance Criteria:**
- [ ] Public submission page at `/submit`
- [ ] Form fields: tool name, website URL, description (optional), submitter email (optional)
- [ ] Basic validation (required fields, valid URL)
- [ ] Honeypot field for spam prevention
- [ ] Rate limiting (max 5 submissions per IP per day)
- [ ] Success message with "We'll review your submission"
- [ ] Create `scraped_tools` record with source "user_submission"
- [ ] Auto-push to top of admin review queue
- [ ] Trigger AI enrichment automatically

---

### US-3.2: Scrape Tool Sources

**As a** system  
**I want to** automatically scrape sources for new AI tools  
**So that** the directory stays current

**Acceptance Criteria:**
- [ ] Firecrawl integration for scraping
- [ ] Configurable sources (Product Hunt, GitHub Trending, Awesome Lists)
- [ ] Daily/weekly schedule per source
- [ ] Extract: name, description, website, source URL
- [ ] Store in `scraped_tools` table with status "pending"
- [ ] Respect robots.txt and rate limits

---

### US-3.3: Detect Duplicates

**As a** system  
**I want to** detect duplicate tools  
**So that** we don't publish the same tool twice

**Acceptance Criteria:**
- [ ] Check 1: Exact URL match
- [ ] Check 2: Fuzzy name similarity (>90%)
- [ ] Check 3: Embedding similarity (>95%)
- [ ] Mark duplicates with status "duplicate"
- [ ] Skip enrichment for duplicates

---

### US-3.4: AI Enrichment

**As a** system  
**I want to** enrich scraped/submitted tools with AI-generated content  
**So that** listings are complete and useful

**Acceptance Criteria:**
- [ ] Generate enhanced description
- [ ] Auto-categorize (categories, industries, use cases)
- [ ] Find related articles and tutorials
- [ ] Scrape reviews (if available) and summarize
- [ ] Detect if open source and extract GitHub URL
- [ ] Detect pricing type
- [ ] Generate embedding for vector search
- [ ] Calculate confidence score (0-1)
- [ ] User submissions get priority processing

---

### US-3.5: Admin Review Queue

**As an** admin  
**I want to** review scraped/submitted tools before publishing  
**So that** I can ensure quality and accuracy

**Acceptance Criteria:**
- [ ] Dashboard at `/admin/tools`
- [ ] List pending tools sorted by: user submissions first, then by confidence score
- [ ] Show submission source (user_submission, product_hunt, github, etc.)
- [ ] Show submitter email for user submissions (if provided)
- [ ] Show all enriched data with edit capabilities
- [ ] Edit description, categories, pricing
- [ ] Preview how tool card will look
- [ ] Actions: Approve, Reject, Save Draft
- [ ] Badge showing pending count

---

### US-3.6: Publish Tool

**As an** admin  
**I want to** approve and publish a tool  
**So that** it appears on the public directory

**Acceptance Criteria:**
- [ ] Create `tools` record from `scraped_tools` data
- [ ] Generate URL slug
- [ ] Set status to "approved"
- [ ] Set `published_at` timestamp
- [ ] Add to newsletter queue
- [ ] Tool immediately visible on site
- [ ] Optional: Send thank you email to submitter

---

## Epic 4: Affiliate System

### US-4.1: Track Affiliate Clicks

**As a** system  
**I want to** track clicks on affiliate links  
**So that** we can measure performance

**Acceptance Criteria:**
- [ ] Redirect endpoint at `/go/[tool-slug]`
- [ ] Log click in `affiliate_clicks` table
- [ ] Store: tool ID, user ID (if logged in), session ID
- [ ] Store: referrer, user agent, country
- [ ] Store: UTM parameters
- [ ] Hash IP for privacy (don't store raw IP)
- [ ] Redirect to affiliate URL or regular website

---

### US-4.2: Display Affiliate Indicator

**As a** visitor  
**I want to** know when a link is an affiliate link  
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Small "Affiliate" badge next to affiliate links
- [ ] "Partner" badge on tool cards for affiliate tools
- [ ] Tooltip explaining affiliate relationship
- [ ] `rel="sponsored noopener"` attribute on links
- [ ] Dedicated disclosure page at `/affiliate-disclosure`

---

### US-4.3: View Affiliate Stats

**As an** admin  
**I want to** view affiliate click statistics  
**So that** I can track revenue potential

**Acceptance Criteria:**
- [ ] Dashboard at `/admin/affiliates`
- [ ] Total clicks by tool
- [ ] Clicks over time (chart)
- [ ] Top referring pages
- [ ] Geographic breakdown
- [ ] UTM campaign performance

---

## Epic 5: Advertising

### US-5.1: Display Header Ad

**As a** system  
**I want to** display a non-intrusive header ad  
**So that** we generate ad revenue

**Acceptance Criteria:**
- [ ] Leaderboard ad slot (728x90) on main pages
- [ ] Load AdSense script lazily
- [ ] "Advertisement" label below ad
- [ ] Don't show on /chat, /dashboard, /admin, /submit

---

### US-5.2: Display Sidebar Ad

**As a** system  
**I want to** display sidebar ads  
**So that** we monetize without interrupting content

**Acceptance Criteria:**
- [ ] Rectangle ad slot (300x250) in sidebar
- [ ] Sticky positioning (follows scroll)
- [ ] Only on pages with sidebar

---

### US-5.3: Display In-Feed Ad

**As a** system  
**I want to** display ads within tool listings  
**So that** we monetize directory pages

**Acceptance Criteria:**
- [ ] Inline ad slot (468x60) every 8 tools
- [ ] Styled to match tool card spacing
- [ ] Max 3 ads per page

---

## Epic 6: User Authentication & Tokens (Feature Flagged)

> **Note:** This epic is behind a feature flag. Implement infrastructure but hide UI until AI Chat is ready.

### US-6.1: User Registration

**As a** visitor  
**I want to** create an account with my email or Google  
**So that** I can access token-based features and save my preferences

**Acceptance Criteria:**
- [ ] Email/password registration with Better Auth
- [ ] Google OAuth integration
- [ ] Email verification flow
- [ ] User profile fields: name, role, industry, company
- [ ] Redirect to dashboard after successful registration
- [ ] Store user in `users` table with default 0 tokens
- [ ] Feature flag: `ENABLE_USER_ACCOUNTS`

---

### US-6.2: User Login

**As a** registered user  
**I want to** log in to my account  
**So that** I can access my tokens, conversations, and saved tools

**Acceptance Criteria:**
- [ ] Email/password login
- [ ] Google OAuth login
- [ ] Session management with Better Auth
- [ ] "Remember me" functionality (7-day session)
- [ ] Redirect to previous page or dashboard after login

---

### US-6.3: Token Balance Display

**As a** registered user  
**I want to** see my current token balance  
**So that** I know how many AI chat messages I can send

**Acceptance Criteria:**
- [ ] Token balance displayed in header (when logged in)
- [ ] Token balance displayed prominently in dashboard
- [ ] Show approximate message count (1 token = 1 message)
- [ ] "Buy more" link visible when balance is low

---

### US-6.4: Token Purchase

**As a** registered user  
**I want to** purchase tokens  
**So that** I can continue using the AI assistant

**Acceptance Criteria:**
- [ ] Display 4 token packages: Starter (100/$10), Regular (500/$40), Power (1000/$70), Enterprise (2500/$150)
- [ ] Highlight "Popular" package (Regular)
- [ ] Show per-token price for each package
- [ ] Polar checkout integration
- [ ] Webhook handler for successful payments
- [ ] Tokens added to user balance immediately after payment
- [ ] Purchase history stored in `token_purchases` table
- [ ] Confirmation email sent via Resend

---

### US-6.5: Coupon Redemption

**As a** registered user  
**I want to** redeem a coupon code  
**So that** I can receive free tokens

**Acceptance Criteria:**
- [ ] Coupon code input field on purchase page and dashboard
- [ ] Validate coupon: exists, active, not expired, not at max uses
- [ ] Check user hasn't already redeemed this coupon
- [ ] Add tokens to user balance
- [ ] Increment coupon `used_count`
- [ ] Create `coupon_usages` record
- [ ] Display success message with tokens granted
- [ ] Display appropriate error messages for invalid coupons

---

### US-6.6: Save Favorite Tools

**As a** registered user  
**I want to** save tools to my favorites  
**So that** I can quickly access them later

**Acceptance Criteria:**
- [ ] Heart/bookmark icon on tool cards (visible when logged in)
- [ ] Toggle favorite on click
- [ ] Store in `favorites` table
- [ ] View all favorites in dashboard
- [ ] Remove from favorites

---

### US-6.7: Anonymous Session Tracking

**As an** anonymous visitor  
**I want to** use the chat without registering (limited)  
**So that** I can try the service before committing

**Acceptance Criteria:**
- [ ] Generate anonymous session ID (stored in cookie/localStorage)
- [ ] Track message count per session (max 4)
- [ ] Display remaining free questions counter
- [ ] Prompt registration after 4 questions
- [ ] Anonymous conversations stored with `is_anonymous: true`

---

## Epic 7: AI Chat System (Feature Flagged)

> **Note:** This epic is behind a feature flag. Enable when ready to launch AI assistant.
> Feature flag: `ENABLE_AI_CHAT`

### US-7.1: Start New Conversation

**As a** user  
**I want to** start a new AI chat conversation  
**So that** I can get personalized tool recommendations

**Acceptance Criteria:**
- [ ] "New Chat" button on chat page
- [ ] Create new conversation record in database
- [ ] Generate unique conversation ID
- [ ] Display template question buttons for quick start:
  - "Find tools for my industry"
  - "Build a workflow for..."
  - "Find cheaper alternatives to..."

---

### US-7.2: Send Chat Message (Anonymous)

**As an** anonymous visitor  
**I want to** send a chat message  
**So that** I can get AI tool recommendations

**Acceptance Criteria:**
- [ ] Text input with send button
- [ ] Check message count < 4 for anonymous users
- [ ] Trigger Upstash Workflow for AI generation
- [ ] Stream response via Upstash Realtime channel
- [ ] Display "X free questions remaining" counter
- [ ] Show registration prompt after 4th question

---

### US-7.3: Send Chat Message (Authenticated)

**As a** registered user  
**I want to** send a chat message using my tokens  
**So that** I can get unlimited AI tool recommendations

**Acceptance Criteria:**
- [ ] Check user token balance >= 1
- [ ] Deduct 1 token per message sent
- [ ] Show "INSUFFICIENT_TOKENS" error if balance is 0
- [ ] Trigger Upstash Workflow for AI generation
- [ ] Stream response via Upstash Realtime channel
- [ ] Update token balance display in real-time
- [ ] Save message to conversation history

---

### US-7.4: Durable Stream Reconnection

**As a** user  
**I want to** continue receiving the AI response after a page refresh  
**So that** I don't lose the assistant's reply

**Acceptance Criteria:**
- [ ] GET endpoint subscribes to Upstash Realtime channel with history
- [ ] Replay missed chunks on reconnection
- [ ] Close stream on "finish" event
- [ ] Workflow executes durably (retries on failure)
- [ ] Chat history stored in Redis sorted sets

---

### US-7.5: RAG-Powered Tool Recommendations

**As a** user  
**I want to** receive relevant tool recommendations based on my query  
**So that** I get accurate suggestions, not hallucinations

**Acceptance Criteria:**
- [ ] Generate embedding for user query (text-embedding-3-small)
- [ ] Vector similarity search in Supabase pgvector
- [ ] Return top 10 relevant tools
- [ ] Inject relevant tools as context in system prompt
- [ ] LLM references only tools from database (no hallucination)

---

### US-7.6: Tool Call - Search Tools

**As a** user  
**I want** the AI to search our tool database  
**So that** I get specific tool recommendations

**Acceptance Criteria:**
- [ ] Tool definition: `search_tools(query, industry?, categories?, priceRange?, isOpenSource?)`
- [ ] Execute vector search + filters
- [ ] Return tool name, slug, tagline, pricing, isOpenSource
- [ ] Display tool results inline in chat
- [ ] Link to tool detail pages

---

### US-7.7: Tool Call - Find Alternatives

**As a** user  
**I want to** find alternatives to a specific tool  
**So that** I can compare options (cheaper, easier, open-source)

**Acceptance Criteria:**
- [ ] Tool definition: `find_alternatives(toolName, criteria)`
- [ ] Criteria: "cheaper", "easier", "more-features", "open-source"
- [ ] Find original tool by name (fuzzy match)
- [ ] Search for tools in same categories
- [ ] Filter by criteria
- [ ] Return comparison with differentiators

---

### US-7.8: Tool Call - Compare Tools

**As a** user  
**I want to** compare multiple tools side by side  
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Tool definition: `compare_tools(toolNames[])`
- [ ] Accept 2-4 tool names
- [ ] Fetch full tool data for each
- [ ] Generate comparison matrix (features, pricing, pros/cons)
- [ ] Provide "best for" recommendations

---

### US-7.9: Tool Call - Generate Workflow

**As a** user  
**I want** the AI to generate a complete workflow  
**So that** I have a step-by-step implementation plan

**Acceptance Criteria:**
- [ ] Tool definition: `generate_workflow(goal, industry?, budget?, teamSize?)`
- [ ] Analyze goal and constraints
- [ ] Select appropriate tools from database
- [ ] Generate step-by-step workflow
- [ ] Include tool links and estimated costs

---

### US-7.10: Export Playbook

**As a** registered user  
**I want to** export my conversation as a playbook  
**So that** I have a document to reference and share

**Acceptance Criteria:**
- [ ] "Export Playbook" button (requires authentication)
- [ ] Deduct 5 tokens for export
- [ ] Generate structured playbook from conversation:
  - Current situation summary
  - Recommended tool stack
  - Competitor analysis & differentiators
  - Implementation roadmap (week by week)
  - Success metrics
  - Risk mitigation
  - Resources & next steps
- [ ] Download as PDF or Markdown
- [ ] Save playbook to conversation record

---

### US-7.11: Conversation History

**As a** registered user  
**I want to** view my past conversations  
**So that** I can continue where I left off

**Acceptance Criteria:**
- [ ] List conversations in dashboard (newest first)
- [ ] Show conversation title or first message preview
- [ ] Show date and message count
- [ ] Click to continue conversation
- [ ] Delete conversation option

---

### US-7.12: AI-Powered Search (Directory)

**As a** visitor  
**I want to** search for tools using natural language  
**So that** I can find tools that match my needs

**Acceptance Criteria:**
- [ ] Search input with AI icon (when feature flag enabled)
- [ ] Accept natural language queries ("tools to transcribe meetings")
- [ ] Generate embedding for query
- [ ] Vector similarity search in pgvector
- [ ] Display semantically relevant results
- [ ] Fallback to keyword search if confidence low

---

## Epic 8: Admin Dashboard

### US-8.1: Admin Dashboard Home (MVP)

**As an** admin  
**I want to** see an overview of site activity  
**So that** I can monitor the platform's health

**Acceptance Criteria:**
- [ ] Admin layout with navigation sidebar
- [ ] Quick stats cards: pending tools, published tools, submissions today
- [ ] Recent activity feed (tool approvals, submissions)
- [ ] Quick links to review queue and affiliate stats
- [ ] Protected route (admin-only access)

---

### US-8.2: Manual Tool Entry (MVP)

**As an** admin  
**I want to** manually add tools to the database  
**So that** I can seed the directory with initial content

**Acceptance Criteria:**
- [ ] "Add Tool" button in admin dashboard
- [ ] Form with all tool fields (name, URL, description, categories, etc.)
- [ ] Option to mark as open source (shows GitHub fields)
- [ ] Option to add affiliate URL
- [ ] Preview tool card before saving
- [ ] Save directly to `tools` table (skip review queue)
- [ ] Bulk import from CSV (optional)

---

### US-8.3: View MVP Analytics

**As an** admin  
**I want to** view basic site analytics  
**So that** I can measure MVP success

**Acceptance Criteria:**
- [ ] Tools published (total and this week)
- [ ] Tool submissions received
- [ ] Affiliate clicks (total and by tool)
- [ ] Top viewed tools
- [ ] Open source vs closed source breakdown

---

### US-8.4: Create Coupon (Post-MVP)

**As an** admin  
**I want to** create promotional coupon codes  
**So that** I can run marketing campaigns

**Acceptance Criteria:**
- [ ] Form to create coupon: code, tokens, max uses, expiry
- [ ] Auto-uppercase code
- [ ] Preview coupon card
- [ ] Store in `coupons` table
- [ ] Copy code to clipboard button

---

### US-8.5: Manage Coupons (Post-MVP)

**As an** admin  
**I want to** view and manage all coupons  
**So that** I can track usage and deactivate as needed

**Acceptance Criteria:**
- [ ] List all coupons with stats
- [ ] Show: code, tokens, used count, remaining uses
- [ ] Show: created date, expiry date
- [ ] Active/inactive status badge
- [ ] Deactivate coupon action
- [ ] View usage details (who redeemed)

---

### US-8.6: View Full Analytics (Post-MVP)

**As an** admin  
**I want to** view comprehensive site analytics  
**So that** I can measure all success metrics

**Acceptance Criteria:**
- [ ] User signups over time
- [ ] Token purchases (revenue)
- [ ] Chat conversations started
- [ ] Playbooks exported
- [ ] Conversion funnels
- [ ] Revenue dashboard

---

## Epic 9: Newsletter

### US-9.1: Subscribe to Newsletter

**As a** visitor  
**I want to** subscribe to the newsletter  
**So that** I receive updates about new AI tools

**Acceptance Criteria:**
- [ ] Email input in sidebar/footer
- [ ] Optional: select industry preferences
- [ ] Store in `newsletter_subscribers` table
- [ ] Send welcome email via Resend
- [ ] Prevent duplicate subscriptions

---

### US-9.2: Generate Newsletter

**As a** system  
**I want to** auto-generate weekly newsletters  
**So that** subscribers stay informed

**Acceptance Criteria:**
- [ ] Weekly cron job
- [ ] Fetch tools published in last week
- [ ] Structure: Hot this week, By category, Community favorites
- [ ] Store in `newsletters` table with status "draft"
- [ ] Notify admin for review

---

### US-9.3: Send Newsletter

**As an** admin  
**I want to** review and send newsletters  
**So that** subscribers receive quality content

**Acceptance Criteria:**
- [ ] Preview newsletter in admin
- [ ] Edit subject, preview text, sections
- [ ] Schedule send or send immediately
- [ ] Send via Resend to all active subscribers
- [ ] Track: opens, clicks, unsubscribes
- [ ] Update newsletter status to "sent"

---

### US-9.4: Unsubscribe from Newsletter

**As a** subscriber  
**I want to** unsubscribe from the newsletter  
**So that** I stop receiving emails

**Acceptance Criteria:**
- [ ] Unsubscribe link in every email
- [ ] One-click unsubscribe (no login required)
- [ ] Update status to "unsubscribed"
- [ ] Set `unsubscribed_at` timestamp
- [ ] Confirmation page

---

## Priority Order

### MVP (Launch with existing v1 traffic)

| Priority | Epic | Stories | Notes |
|----------|------|---------|-------|
| 0 | **Project Foundation** | US-0.1 - US-0.6 | **Bun workspaces, shared packages** |
| 1 | Tool Directory | US-1.1 - US-1.5 | Core browsing experience |
| 2 | Open Source Section | US-2.1 - US-2.4 | Differentiated content |
| 3 | Admin Dashboard (MVP) | US-8.1 - US-8.3 | Manual tool entry, review queue |
| 4 | Content Engine | US-3.1 - US-3.6 | Including `/submit` page |
| 5 | Affiliate System | US-4.1 - US-4.3 | Early monetization |
| 6 | Advertising | US-5.1 - US-5.3 | AdSense revenue |

### Post-MVP (Feature Flagged)

| Priority | Epic | Stories | Notes |
|----------|------|---------|-------|
| 7 | User Auth & Tokens | US-6.1 - US-6.7 | Behind `ENABLE_USER_ACCOUNTS` flag |
| 8 | AI Chat System | US-7.1 - US-7.12 | Behind `ENABLE_AI_CHAT` flag |
| 9 | Admin Dashboard (Extended) | US-8.4 - US-8.6 | Coupon management, full analytics |
| 10 | Newsletter | US-9.1 - US-9.4 | Email marketing |

### Feature Flags

```typescript
// packages/shared/src/config/features.ts
export const FEATURES = {
  ENABLE_USER_ACCOUNTS: process.env.ENABLE_USER_ACCOUNTS === 'true',
  ENABLE_AI_CHAT: process.env.ENABLE_AI_CHAT === 'true',
  ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH === 'true',
} as const;
```

### Monorepo Structure (Bun Workspaces)

```
aitools/
├── apps/
│   ├── web/                 # Next.js 15 frontend (MVP)
│   └── api/                 # ElysiaJS backend (MVP)
├── packages/
│   ├── db/                  # Drizzle schema & client (MVP)
│   └── shared/              # Types, constants, utils (MVP)
├── package.json             # Root with "workspaces" config
├── bun.lockb                # Bun lockfile
├── tsconfig.json            # Base TypeScript config
└── .env                     # Environment variables
```

### New Pages for MVP

| Route | App | Purpose |
|-------|-----|---------|
| `/` | web | Homepage with tool highlights |
| `/tools` | web | Full tool directory with filters |
| `/tools/[industry]` | web | Industry hub pages |
| `/tool/[slug]` | web | Individual tool pages |
| `/open-source` | web | OSS tools section |
| `/submit` | web | User tool submission form |
| `/go/[slug]` | web | Affiliate redirect endpoint |
| `/affiliate-disclosure` | web | Legal disclosure |
| `/admin` | web | Admin dashboard home |
| `/admin/tools` | web | Admin review queue + manual entry |
| `/admin/affiliates` | web | Affiliate stats |

### API Endpoints (MVP)

| Endpoint | App | Purpose |
|----------|-----|---------|
| `GET /api/tools` | api | List tools with filters |
| `GET /api/tools/:slug` | api | Get tool details |
| `POST /api/tools` | api | Create tool (admin) |
| `PUT /api/tools/:id` | api | Update tool (admin) |
| `POST /api/submissions` | api | Submit tool (public) |
| `GET /api/admin/pending` | api | Get pending tools |
| `POST /api/admin/approve/:id` | api | Approve tool |
| `GET /api/affiliates/click/:slug` | api | Track affiliate click |
| `GET /api/affiliates/stats` | api | Get affiliate stats (admin) |
