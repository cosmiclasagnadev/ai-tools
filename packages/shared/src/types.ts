// Tool types
export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  website: string;
  logo?: string;
  categories: string[];
  industries: string[];
  useCases: string[];
  pricingType?: 'free' | 'freemium' | 'paid' | 'contact';
  features?: string[];
  pros?: string[];
  cons?: string[];
  reviewSummary?: string;
  reviewCount?: number;
  averageRating?: number;
  isOpenSource: boolean;
  repository?: string;
  license?: string;
  selfHostable?: boolean;
  dockerSupport?: boolean;
  setupDifficulty?: 'easy' | 'medium' | 'hard';
  hasAffiliate: boolean;
  affiliateUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  confidence?: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role?: string;
  industry?: string;
  company?: string;
  tokens: number;
  createdAt: Date;
  updatedAt: Date;
}

// Conversation types
export interface Conversation {
  id: string;
  userId?: string;
  isAnonymous: boolean;
  sessionId?: string;
  messageCount: number;
  playbook?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Message types
export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  toolCalls?: unknown;
  tokensUsed?: number;
  createdAt: Date;
}

// Submission types
export interface ToolSubmission {
  id: string;
  name: string;
  description?: string;
  website: string;
  submitterEmail?: string;
  source: 'user_submission' | 'producthunt' | 'github' | 'twitter';
  status: 'pending' | 'approved' | 'rejected' | 'duplicate';
  confidence?: number;
  enrichedData?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// Affiliate types
export interface AffiliateClick {
  id: string;
  toolId: string;
  userId?: string;
  sessionId?: string;
  referrer?: string;
  userAgent?: string;
  ipHash?: string;
  country?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: Date;
}

