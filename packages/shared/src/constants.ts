// Industries
export const INDUSTRIES = [
  'marketing',
  'sales',
  'design',
  'development',
  'finance',
  'legal',
  'hr',
  'content-creation',
  'education',
  'healthcare',
  'ecommerce',
  'productivity',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

// Categories
export const CATEGORIES = [
  'copywriting',
  'image-generation',
  'video-editing',
  'audio-generation',
  'data-analysis',
  'automation',
  'customer-support',
  'research',
  'code-generation',
  'design',
  'analytics',
  'collaboration',
  'transcription',
  'summarization',
] as const;

export type Category = (typeof CATEGORIES)[number];

// Pricing types
export const PRICING_TYPES = ['free', 'freemium', 'paid', 'contact'] as const;
export type PricingType = (typeof PRICING_TYPES)[number];

// Setup difficulty
export const SETUP_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
export type SetupDifficulty = (typeof SETUP_DIFFICULTIES)[number];

// Licenses
export const LICENSES = [
  'MIT',
  'Apache-2.0',
  'GPL-3.0',
  'BSD-3-Clause',
  'AGPL-3.0',
  'ISC',
  'UNLICENSE',
] as const;

export type License = (typeof LICENSES)[number];

// Tool statuses
export const TOOL_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type ToolStatus = (typeof TOOL_STATUSES)[number];

// Submission statuses
export const SUBMISSION_STATUSES = ['pending', 'approved', 'rejected', 'duplicate'] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

// Feature flags
export const FEATURES = {
  ENABLE_USER_ACCOUNTS: process.env.ENABLE_USER_ACCOUNTS === 'true',
  ENABLE_AI_CHAT: process.env.ENABLE_AI_CHAT === 'true',
  ENABLE_AI_SEARCH: process.env.ENABLE_AI_SEARCH === 'true',
} as const;

