// Tool types
export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  website: string;
  logo?: string;
  previewImg: string;
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

export interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  lastCommitDate: Date | null;
  contributors: number;
  primaryLanguage: string | null;
  license: string | null;
  isActive: boolean;
}

export interface ToolWithGitHubStats extends Tool {
  githubStats?: GitHubStats | null;
}

export interface OSSToolWithStats extends Tool {
  githubStats: GitHubStats;
}

export interface IndustryHub {
  industry: string;
  displayName: string;
  description: string;
  toolCount: number;
  topTools: ToolWithGitHubStats[];
  categories: { name: string; count: number }[];
}

export interface SearchResult {
  tools: ToolWithGitHubStats[];
  total: number;
  query: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface OSSFilterOptions {
  licenses: { value: string; label: string }[];
  languages: { value: string; label: string }[];
  starRanges: { label: string; min: number; max?: number }[];
}

export interface OSSFilterCounts {
  licenseCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  starRangeCounts: Record<string, number>;
  selfHostableCount: number;
  dockerSupportCount: number;
}

export interface OSSFilters {
  page?: number;
  pageSize?: number;
  license?: string;
  language?: string;
  minStars?: number;
  selfHostable?: boolean;
  dockerSupport?: boolean;
  difficulty?: string;
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

