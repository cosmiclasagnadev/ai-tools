import { Star, GitFork } from 'lucide-react';
import type { GitHubStats } from '@aitools/shared';

interface GitHubStatsBadgeProps {
  stats: GitHubStats | null | undefined;
}

function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0';
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function GitHubStatsBadge({ stats }: GitHubStatsBadgeProps) {
  if (!stats) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Star className="size-4 text-yellow-500" />
        <span className="font-medium text-foreground">{formatNumber(stats.stars)}</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground">
        <GitFork className="size-4 text-blue-500" />
        <span className="font-medium text-foreground">{formatNumber(stats.forks)}</span>
      </div>
    </div>
  );
}
