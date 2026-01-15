import { eq, desc, and, sql } from 'drizzle-orm';
import { db, tools, githubStats } from '@aitools/db';

export interface ToolFilters {
  page?: number;
  pageSize?: number;
  industry?: string;
  category?: string;
  pricing?: string;
  isOpenSource?: boolean;
}

export interface ToolWithGitHubStats {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description: string;
  website: string;
  logo?: string | null;
  previewImage: string | null;
  categories: string[] | null;
  industries: string[] | null;
  useCases: string[] | null;
  pricingType: string | null;
  features: string[] | null;
  pros: string[] | null;
  cons: string[] | null;
  reviewSummary: string | null;
  reviewCount: number | null;
  averageRating: string | null;
  isOpenSource: boolean | null;
  repository: string | null;
  license: string | null;
  selfHostable: boolean | null;
  dockerSupport: boolean | null;
  setupDifficulty: string | null;
  hasAffiliate: boolean | null;
  affiliateUrl: string | null;
  status: string | null;
  confidence: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
  githubStats?: {
    stars: number | null;
    forks: number | null;
    watchers: number | null;
    openIssues: number | null;
    lastCommitDate: Date | null;
    contributors: number | null;
    primaryLanguage: string | null;
    license: string | null;
  } | null;
}

export async function getToolBySlug(slug: string): Promise<ToolWithGitHubStats | null> {
  const result = await db
    .select()
    .from(tools)
    .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
    .where(and(eq(tools.slug, slug), eq(tools.status, 'approved')))
    .limit(1);

  if (result.length === 0) return null;

  const tool = result[0].tools;
  const stats = result[0].github_stats;

  return {
    ...tool,
    githubStats: stats ? {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
    } : null,
  };
}

export async function getTools(filters: ToolFilters = {}): Promise<{
  tools: ToolWithGitHubStats[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const { page = 1, pageSize = 12, industry, category, pricing, isOpenSource } = filters;
  const offset = (page - 1) * pageSize;

  const conditions = [eq(tools.status, 'approved')];

  if (industry) {
    conditions.push(sql`${tools.industries} @> ${[industry]}`);
  }

  if (category) {
    conditions.push(sql`${tools.categories} @> ${[category]}`);
  }

  if (pricing) {
    conditions.push(eq(tools.pricingType, pricing));
  }

  if (isOpenSource !== undefined) {
    conditions.push(eq(tools.isOpenSource, isOpenSource));
  }

  const [toolResults, countResult] = await Promise.all([
    db
      .select({
        tool: tools,
        githubStats: githubStats,
      })
      .from(tools)
      .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
      .where(and(...conditions))
      .orderBy(desc(tools.publishedAt), desc(tools.createdAt))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(tools)
      .where(and(...conditions)),
  ]);

  const toolsWithStats = toolResults.map(({ tool, githubStats: stats }) => ({
    ...tool,
    githubStats: stats ? {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
    } : null,
  }));

  const total = Number(countResult[0]?.count ?? 0);
  const totalPages = Math.ceil(total / pageSize);

  return {
    tools: toolsWithStats,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getAlternatives(toolId: string, limit = 6): Promise<ToolWithGitHubStats[]> {
  const tool = await db
    .select()
    .from(tools)
    .where(eq(tools.id, toolId))
    .limit(1);

  if (tool.length === 0) return [];

  const categories = tool[0].categories;

  if (!categories || categories.length === 0) {
    const similar = await db
      .select({
        tool: tools,
        githubStats: githubStats,
      })
      .from(tools)
      .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
      .where(and(eq(tools.status, 'approved'), sql`${tools.id} != ${toolId}`))
      .limit(limit);

    return similar.map(({ tool: t, githubStats: stats }) => ({
      ...t,
      githubStats: stats ? {
        stars: stats.stars,
        forks: stats.forks,
        watchers: stats.watchers,
        openIssues: stats.openIssues,
        lastCommitDate: stats.lastCommitDate,
        contributors: stats.contributors,
        primaryLanguage: stats.primaryLanguage,
        license: stats.license,
      } : null,
    }));
  }

  const result = await db
    .select({
      tool: tools,
      githubStats: githubStats,
    })
    .from(tools)
    .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
    .where(
      and(
        eq(tools.status, 'approved'),
        sql`${tools.id} != ${toolId}`,
        sql`${tools.categories} && ${categories}`
      )
    )
    .limit(limit);

  return result.map(({ tool: t, githubStats: stats }) => ({
    ...t,
    githubStats: stats ? {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
    } : null,
  }));
}

export async function searchTools(query: string, limit = 20): Promise<ToolWithGitHubStats[]> {
  const searchTerm = `%${query}%`;

  const result = await db
    .select({
      tool: tools,
      githubStats: githubStats,
    })
    .from(tools)
    .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
    .where(
      and(
        eq(tools.status, 'approved'),
        sql`(${tools.name} ILIKE ${searchTerm} OR ${tools.tagline} ILIKE ${searchTerm} OR ${tools.description} ILIKE ${searchTerm})`
      )
    )
    .limit(limit);

  return result.map(({ tool: t, githubStats: stats }) => ({
    ...t,
    githubStats: stats ? {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
    } : null,
  }));
}

export async function getIndustryInfo(industry: string): Promise<{
  industry: string;
  displayName: string;
  description: string;
  toolCount: number;
  categories: { name: string; count: number }[];
} | null> {
  const industryDisplayNames: Record<string, { displayName: string; description: string }> = {
    marketing: { displayName: 'Marketing', description: 'AI tools for marketing automation, content creation, and campaign management' },
    sales: { displayName: 'Sales', description: 'AI tools for lead generation, prospecting, and sales automation' },
    design: { displayName: 'Design', description: 'AI tools for graphic design, UI/UX, and creative workflows' },
    development: { displayName: 'Development', description: 'AI tools for coding, debugging, and software development' },
    finance: { displayName: 'Finance', description: 'AI tools for financial analysis, forecasting, and accounting' },
    legal: { displayName: 'Legal', description: 'AI tools for legal research, contract analysis, and compliance' },
    hr: { displayName: 'Human Resources', description: 'AI tools for recruitment, employee management, and HR automation' },
    content: { displayName: 'Content Creation', description: 'AI tools for video, audio, and multimedia content creation' },
    education: { displayName: 'Education', description: 'AI tools for learning, tutoring, and educational content' },
    healthcare: { displayName: 'Healthcare', description: 'AI tools for medical research, diagnosis, and patient care' },
    ecommerce: { displayName: 'E-Commerce', description: 'AI tools for online stores, product recommendations, and sales optimization' },
    productivity: { displayName: 'Productivity', description: 'AI tools for task management, notes, and workflow automation' },
  };

  const info = industryDisplayNames[industry];
  if (!info) return null;

  const [countResult, categoryResults] = await Promise.all([
    db
      .select({ count: sql<number>`count(*)` })
      .from(tools)
      .where(and(eq(tools.status, 'approved'), sql`${tools.industries} @> ${[industry]}`)),
    db
      .select({
        category: sql<string>`UNNEST(${tools.categories})`,
        count: sql<number>`count(*)`,
      })
      .from(tools)
      .where(and(eq(tools.status, 'approved'), sql`${tools.industries} @> ${[industry]}`))
      .groupBy(sql`UNNEST(${tools.categories})`),
  ]);

  return {
    industry,
    displayName: info.displayName,
    description: info.description,
    toolCount: Number(countResult[0]?.count ?? 0),
    categories: categoryResults.map((r) => ({
      name: r.category,
      count: Number(r.count),
    })),
  };
}

export async function getTopToolsByIndustry(industry: string, limit = 6): Promise<ToolWithGitHubStats[]> {
  const result = await db
    .select({
      tool: tools,
      githubStats: githubStats,
    })
    .from(tools)
    .leftJoin(githubStats, eq(tools.id, githubStats.toolId))
    .where(and(eq(tools.status, 'approved'), sql`${tools.industries} @> ${[industry]}`))
    .orderBy(desc(tools.publishedAt), desc(tools.createdAt))
    .limit(limit);

  return result.map(({ tool: t, githubStats: stats }) => ({
    ...t,
    githubStats: stats ? {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
    } : null,
  }));
}

export async function getIndustryList(): Promise<{ industry: string; count: number }[]> {
  const result = await db
    .select({
      industry: sql<string>`UNNEST(${tools.industries})`,
      count: sql<number>`count(*)`,
    })
    .from(tools)
    .where(eq(tools.status, 'approved'))
    .groupBy(sql`UNNEST(${tools.industries})`)
    .orderBy(sql`count(*) DESC`);

  return result.map((r) => ({
    industry: r.industry,
    count: Number(r.count),
  }));
}
