import { eq, desc, sql, and, gte } from 'drizzle-orm';
import { db, tools, githubStats } from '@aitools/db';

export interface OSSFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  license?: string;
  language?: string;
  minStars?: number;
  selfHostable?: boolean;
  dockerSupport?: boolean;
  difficulty?: string;
}

export interface OSSFilterOptions {
  licenses: { value: string; label: string }[];
  languages: { value: string; label: string }[];
  starRanges: { label: string; min: number; max?: number }[];
}

export interface OSSToolWithStats {
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
  isOpenSource: boolean | null;
  repository: string | null;
  license: string | null;
  selfHostable: boolean | null;
  dockerSupport: boolean | null;
  setupDifficulty: string | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
  githubStats: {
    stars: number | null;
    forks: number | null;
    watchers: number | null;
    openIssues: number | null;
    lastCommitDate: Date | null;
    contributors: number | null;
    primaryLanguage: string | null;
    license: string | null;
    isActive: boolean;
  };
}

export async function getOSSFilters(): Promise<OSSFilterOptions> {
  const licenses = [
    { value: 'MIT', label: 'MIT License' },
    { value: 'Apache-2.0', label: 'Apache 2.0' },
    { value: 'GPL-3.0', label: 'GPL v3' },
    { value: 'BSD-3-Clause', label: 'BSD 3-Clause' },
    { value: 'AGPL-3.0', label: 'AGPL v3' },
    { value: 'ISC', label: 'ISC' },
  ];

  const languages = [
    { value: 'Python', label: 'Python' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Go', label: 'Go' },
    { value: 'Rust', label: 'Rust' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'Ruby', label: 'Ruby' },
  ];

  const starRanges = [
    { label: '100+', min: 100 },
    { label: '1k+', min: 1000 },
    { label: '5k+', min: 5000 },
    { label: '10k+', min: 10000 },
    { label: '50k+', min: 50000 },
  ];

  return { licenses, languages, starRanges };
}

export async function getOSSTools(filters: OSSFilters = {}): Promise<{
  tools: OSSToolWithStats[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const {
    page = 1,
    pageSize = 12,
    search,
    license,
    language,
    minStars,
    selfHostable,
    dockerSupport,
    difficulty,
  } = filters;
  const offset = (page - 1) * pageSize;

  const conditions = [
    eq(tools.status, 'approved'),
    eq(tools.isOpenSource, true),
  ];

  if (search) {
    const searchTerm = `%${search}%`;
    conditions.push(
      sql`(${tools.name} ILIKE ${searchTerm} OR ${tools.tagline} ILIKE ${searchTerm} OR ${tools.description} ILIKE ${searchTerm})`
    );
  }

  if (license) {
    conditions.push(eq(tools.license, license));
  }

  if (language) {
    conditions.push(sql`${githubStats.primaryLanguage} = ${language}`);
  }

  if (minStars !== undefined) {
    conditions.push(gte(githubStats.stars, minStars));
  }

  if (selfHostable) {
    conditions.push(eq(tools.selfHostable, true));
  }

  if (dockerSupport) {
    conditions.push(eq(tools.dockerSupport, true));
  }

  if (difficulty) {
    conditions.push(eq(tools.setupDifficulty, difficulty));
  }

  const [toolResults, countResult] = await Promise.all([
    db
      .select({
        tool: tools,
        githubStats: githubStats,
      })
      .from(tools)
      .innerJoin(githubStats, eq(tools.id, githubStats.toolId))
      .where(and(...conditions))
      .orderBy(desc(githubStats.stars))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(tools)
      .innerJoin(githubStats, eq(tools.id, githubStats.toolId))
      .where(and(...conditions)),
  ]);

  const toolsWithStats = toolResults.map(({ tool, githubStats: stats }) => {
    const lastCommitDate = stats.lastCommitDate;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return {
      ...tool,
      githubStats: {
        stars: stats.stars,
        forks: stats.forks,
        watchers: stats.watchers,
        openIssues: stats.openIssues,
        lastCommitDate: stats.lastCommitDate,
        contributors: stats.contributors,
        primaryLanguage: stats.primaryLanguage,
        license: stats.license,
        isActive: lastCommitDate ? lastCommitDate > sixMonthsAgo : false,
      },
    };
  });

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

export async function getOSSToolBySlug(slug: string): Promise<OSSToolWithStats | null> {
  const result = await db
    .select({
      tool: tools,
      githubStats: githubStats,
    })
    .from(tools)
    .innerJoin(githubStats, eq(tools.id, githubStats.toolId))
    .where(and(eq(tools.slug, slug), eq(tools.status, 'approved')))
    .limit(1);

  if (result.length === 0) return null;

  const tool = result[0].tool;
  const stats = result[0].githubStats;
  const lastCommitDate = stats.lastCommitDate;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return {
    ...tool,
    githubStats: {
      stars: stats.stars,
      forks: stats.forks,
      watchers: stats.watchers,
      openIssues: stats.openIssues,
      lastCommitDate: stats.lastCommitDate,
      contributors: stats.contributors,
      primaryLanguage: stats.primaryLanguage,
      license: stats.license,
      isActive: lastCommitDate ? lastCommitDate > sixMonthsAgo : false,
    },
  };
}

export async function getOSSFilterCounts() {
  const baseConditions = and(eq(tools.status, 'approved'), eq(tools.isOpenSource, true));

  const [licenseResults, languageResults, starResults, selfHostableResult, dockerResult] =
    await Promise.all([
      db
        .select({ value: tools.license, count: sql<number>`count(*)` })
        .from(tools)
        .where(baseConditions)
        .groupBy(tools.license),
      db
        .select({ value: githubStats.primaryLanguage, count: sql<number>`count(*)` })
        .from(tools)
        .innerJoin(githubStats, eq(tools.id, githubStats.toolId))
        .where(baseConditions)
        .groupBy(githubStats.primaryLanguage),
      db
        .select({ stars: githubStats.stars })
        .from(tools)
        .innerJoin(githubStats, eq(tools.id, githubStats.toolId))
        .where(baseConditions),
      db
        .select({ count: sql<number>`count(*)` })
        .from(tools)
        .where(and(baseConditions, eq(tools.selfHostable, true))),
      db
        .select({ count: sql<number>`count(*)` })
        .from(tools)
        .where(and(baseConditions, eq(tools.dockerSupport, true))),
    ]);

  const starRanges = [
    { label: '100+', min: 100, max: 1000 },
    { label: '1k+', min: 1000, max: 5000 },
    { label: '5k+', min: 5000, max: 10000 },
    { label: '10k+', min: 10000, max: 50000 },
    { label: '50k+', min: 50000, max: undefined },
  ];

  const starRangeCounts: Record<string, number> = {};
  for (const range of starRanges) {
    starRangeCounts[range.label] = starResults.filter(s => {
      if (s.stars === null) return false;
      if (range.max === undefined) return s.stars >= range.min;
      return s.stars >= range.min && s.stars < range.max;
    }).length;
  }

  return {
    licenseCounts: Object.fromEntries(
      licenseResults.map(r => [r.value || 'Unknown', Number(r.count)])
    ),
    languageCounts: Object.fromEntries(
      languageResults.map(r => [r.value || 'Unknown', Number(r.count)])
    ),
    starRangeCounts,
    selfHostableCount: Number(selfHostableResult[0]?.count ?? 0),
    dockerSupportCount: Number(dockerResult[0]?.count ?? 0),
  };
}
