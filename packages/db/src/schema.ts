import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  uuid,
  jsonb,
  decimal,
  index,
} from 'drizzle-orm/pg-core';

// Tools table
export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  tagline: text('tagline'),
  description: text('description').notNull(),
  website: varchar('website', { length: 512 }).notNull(),
  logo: varchar('logo', { length: 512 }),
  previewImage: varchar('preview_image').default('https://placehold.co/600x400'),
  categories: text('categories').array(),
  industries: text('industries').array(),
  useCases: text('use_cases').array(),
  pricingType: varchar('pricing_type', { length: 50 }),
  features: text('features').array(),
  pros: text('pros').array(),
  cons: text('cons').array(),
  reviewSummary: text('review_summary'),
  reviewCount: integer('review_count').default(0),
  averageRating: decimal('average_rating', { precision: 3, scale: 2 }),
  isOpenSource: boolean('is_open_source').default(false),
  repository: varchar('repository', { length: 512 }),
  license: varchar('license', { length: 50 }),
  selfHostable: boolean('self_hostable').default(false),
  dockerSupport: boolean('docker_support').default(false),
  setupDifficulty: varchar('setup_difficulty', { length: 50 }),
  hasAffiliate: boolean('has_affiliate').default(false),
  affiliateUrl: varchar('affiliate_url', { length: 512 }),
  status: varchar('status', { length: 50 }).default('approved'),
  confidence: decimal('confidence', { precision: 3, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
}, (table) => ({
  slugIdx: index('tools_slug_idx').on(table.slug),
  statusIdx: index('tools_status_idx').on(table.status),
}));

// Scraped tools (pending review)
export const scrapedTools = pgTable('scraped_tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  website: varchar('website', { length: 512 }).notNull(),
  source: varchar('source', { length: 100 }).notNull(),
  sourceUrl: varchar('source_url', { length: 512 }),
  submitterEmail: varchar('submitter_email', { length: 255 }),
  status: varchar('status', { length: 50 }).default('pending'),
  confidence: decimal('confidence', { precision: 3, scale: 2 }),
  enrichedData: jsonb('enriched_data'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  statusIdx: index('scraped_tools_status_idx').on(table.status),
  sourceIdx: index('scraped_tools_source_idx').on(table.source),
}));

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 512 }),
  role: varchar('role', { length: 50 }).default('user'),
  industry: varchar('industry', { length: 100 }),
  company: varchar('company', { length: 255 }),
  tokens: integer('tokens').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
}));

// Conversations table
export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  isAnonymous: boolean('is_anonymous').default(true),
  sessionId: varchar('session_id', { length: 255 }),
  messageCount: integer('message_count').default(0),
  playbook: jsonb('playbook'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('conversations_user_id_idx').on(table.userId),
  sessionIdIdx: index('conversations_session_id_idx').on(table.sessionId),
}));

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  tokensUsed: integer('tokens_used').default(1),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  conversationIdIdx: index('messages_conversation_id_idx').on(table.conversationId),
}));

// Token purchases table
export const tokenPurchases = pgTable('token_purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  amount: integer('amount').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  polarOrderId: varchar('polar_order_id', { length: 255 }).unique(),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('token_purchases_user_id_idx').on(table.userId),
  statusIdx: index('token_purchases_status_idx').on(table.status),
}));

// Coupons table
export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).unique().notNull(),
  tokens: integer('tokens').notNull(),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').default(0),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  codeIdx: index('coupons_code_idx').on(table.code),
}));

// Coupon usages table
export const couponUsages = pgTable('coupon_usages', {
  id: uuid('id').primaryKey().defaultRandom(),
  couponId: uuid('coupon_id').notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Affiliate clicks table
export const affiliateClicks = pgTable('affiliate_clicks', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id').notNull(),
  userId: uuid('user_id'),
  sessionId: varchar('session_id', { length: 255 }),
  referrer: varchar('referrer', { length: 512 }),
  userAgent: text('user_agent'),
  ipHash: varchar('ip_hash', { length: 255 }),
  country: varchar('country', { length: 100 }),
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  toolIdIdx: index('affiliate_clicks_tool_id_idx').on(table.toolId),
  userIdIdx: index('affiliate_clicks_user_id_idx').on(table.userId),
  createdAtIdx: index('affiliate_clicks_created_at_idx').on(table.createdAt),
}));

// Favorites table
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  toolId: uuid('tool_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdToolIdIdx: index('favorites_user_id_tool_id_idx').on(table.userId, table.toolId),
}));

// Newsletter subscribers table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  industries: text('industries').array(),
  status: varchar('status', { length: 50 }).default('active'),
  unsubscribedAt: timestamp('unsubscribed_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  emailIdx: index('newsletter_subscribers_email_idx').on(table.email),
  statusIdx: index('newsletter_subscribers_status_idx').on(table.status),
}));

// Newsletters table
export const newsletters = pgTable('newsletters', {
  id: uuid('id').primaryKey().defaultRandom(),
  subject: varchar('subject', { length: 255 }).notNull(),
  preview: varchar('preview', { length: 255 }),
  content: text('content').notNull(),
  sections: jsonb('sections'),
  status: varchar('status', { length: 50 }).default('draft'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  statusIdx: index('newsletters_status_idx').on(table.status),
}));

// GitHub stats table (for OSS tools)
export const githubStats = pgTable('github_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  toolId: uuid('tool_id').notNull(),
  repository: varchar('repository', { length: 255 }).unique().notNull(),
  stars: integer('stars').default(0),
  forks: integer('forks').default(0),
  watchers: integer('watchers').default(0),
  openIssues: integer('open_issues').default(0),
  lastCommitDate: timestamp('last_commit_date'),
  contributors: integer('contributors').default(0),
  primaryLanguage: varchar('primary_language', { length: 100 }),
  license: varchar('license', { length: 50 }),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  toolIdIdx: index('github_stats_tool_id_idx').on(table.toolId),
  repositoryIdx: index('github_stats_repository_idx').on(table.repository),
}));

// Better Auth - Sessions table
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 255 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('sessions_user_id_idx').on(table.userId),
  tokenIdx: index('sessions_token_idx').on(table.token),
}));

// Better Auth - Accounts table (for OAuth)
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  idToken: text('id_token'),
  password: text('password'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('accounts_user_id_idx').on(table.userId),
  accountProviderIdx: index('accounts_account_provider_idx').on(table.accountId, table.providerId),
}));

// Better Auth - Verifications table
export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  identifierIdx: index('verifications_identifier_idx').on(table.identifier),
}));

