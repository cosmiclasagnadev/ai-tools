/**
 * Feature flag checks
 */

export function isUserAccountsEnabled(): boolean {
  return process.env.ENABLE_USER_ACCOUNTS === 'true';
}

export function isAIChatEnabled(): boolean {
  return process.env.ENABLE_AI_CHAT === 'true';
}

export function isAISearchEnabled(): boolean {
  return process.env.ENABLE_AI_SEARCH === 'true';
}

