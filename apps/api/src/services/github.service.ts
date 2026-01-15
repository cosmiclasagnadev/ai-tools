import { eq } from 'drizzle-orm';
import { db, tools, githubStats } from '@aitools/db';

interface GitHubRepoInfo {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  lastCommitDate: Date | null;
  contributors: number;
  primaryLanguage: string | null;
  license: string | null;
}

function extractRepoPath(repoUrl: string): string | null {
  const githubMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!githubMatch) return null;

  let owner = githubMatch[1];
  let repo = githubMatch[2];

  repo = repo.replace(/\.git$/, '');

  return `${owner}/${repo}`;
}

export async function fetchRepoStats(repoUrl: string): Promise<GitHubRepoInfo | null> {
  const repoPath = extractRepoPath(repoUrl);
  if (!repoPath) return null;

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('GITHUB_TOKEN not set, skipping stats fetch');
    return null;
  }

  try {
    const [repoRes, commitsRes, contributorsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }),
      fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }),
      fetch(`https://api.github.com/repos/${repoPath}/contributors?per_page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }),
    ]);

    if (!repoRes.ok) {
      console.error(`Failed to fetch repo info for ${repoPath}: ${repoRes.status}`);
      return null;
    }

    const repoData = await repoRes.json();

    let lastCommitDate: Date | null = null;
    if (commitsRes.ok) {
      const commitsData = await commitsRes.json();
      if (commitsData.length > 0 && commitsData[0].commit) {
        lastCommitDate = new Date(commitsData[0].commit.author?.date || commitsData[0].commit.committer?.date);
      }
    }

    let contributors = 0;
    const contributorsLink = contributorsRes.headers.get('Link');
    if (contributorsLink) {
      const lastPageMatch = contributorsLink.match(/page=(\d+)>; rel="last"/);
      if (lastPageMatch) {
        contributors = parseInt(lastPageMatch[1], 10);
      }
    } else if (contributorsRes.ok) {
      const contributorsData = await contributorsRes.json();
      contributors = contributorsData.length;
    }

    return {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.watchers_count || 0,
      openIssues: repoData.open_issues_count || 0,
      lastCommitDate,
      contributors,
      primaryLanguage: repoData.language,
      license: repoData.license?.spdx_id || null,
    };
  } catch (error) {
    console.error(`Error fetching stats for ${repoPath}:`, error);
    return null;
  }
}

export async function syncAllStats(): Promise<{ synced: number; failed: number }> {
  const allTools = await db
    .select({ id: tools.id, repository: tools.repository })
    .from(tools)
    .where(eq(tools.isOpenSource, true));

  let synced = 0;
  let failed = 0;

  for (const tool of allTools) {
    if (!tool.repository) continue;

    const stats = await fetchRepoStats(tool.repository);

    if (stats) {
      await db
        .insert(githubStats)
        .values({
          toolId: tool.id,
          repository: tool.repository,
          stars: stats.stars,
          forks: stats.forks,
          watchers: stats.watchers,
          openIssues: stats.openIssues,
          lastCommitDate: stats.lastCommitDate,
          contributors: stats.contributors,
          primaryLanguage: stats.primaryLanguage,
          license: stats.license,
        })
        .onConflictDoUpdate({
          target: githubStats.repository,
          set: {
            stars: stats.stars,
            forks: stats.forks,
            watchers: stats.watchers,
            openIssues: stats.openIssues,
            lastCommitDate: stats.lastCommitDate,
            contributors: stats.contributors,
            primaryLanguage: stats.primaryLanguage,
            license: stats.license,
            updatedAt: new Date(),
          },
        });
      synced++;
    } else {
      failed++;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return { synced, failed };
}

export async function syncSingleToolStats(toolId: string, repository: string): Promise<void> {
  const stats = await fetchRepoStats(repository);

  if (stats) {
    await db
      .insert(githubStats)
      .values({
        toolId,
        repository,
        stars: stats.stars,
        forks: stats.forks,
        watchers: stats.watchers,
        openIssues: stats.openIssues,
        lastCommitDate: stats.lastCommitDate,
        contributors: stats.contributors,
        primaryLanguage: stats.primaryLanguage,
        license: stats.license,
      })
      .onConflictDoUpdate({
        target: githubStats.repository,
        set: {
          stars: stats.stars,
          forks: stats.forks,
          watchers: stats.watchers,
          openIssues: stats.openIssues,
          lastCommitDate: stats.lastCommitDate,
          contributors: stats.contributors,
          primaryLanguage: stats.primaryLanguage,
          license: stats.license,
          updatedAt: new Date(),
        },
      });
  }
}
