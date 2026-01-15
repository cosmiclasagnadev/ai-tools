import { Star, GitFork, Clock, ExternalLink, Code } from 'lucide-react';
import type { GitHubStats } from '@aitools/shared';

interface ToolSidebarProps {
  pricingType?: string | null;
  reviewCount?: number | null;
  averageRating?: number | null;
  reviewSummary?: string | null;
  isOpenSource: boolean;
  githubStats?: GitHubStats | null;
  repository?: string | null;
}

function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return 'Unknown';
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export function ToolSidebar({
  pricingType,
  reviewCount,
  averageRating,
  reviewSummary,
  isOpenSource,
  githubStats,
  repository,
}: ToolSidebarProps) {
  return (
    <div className="sticky top-8 space-y-6">
      {isOpenSource && githubStats && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Code className="size-5" />
            GitHub Stats
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="size-4 text-yellow-500" />
              <span className="font-medium text-foreground">{formatNumber(githubStats.stars)}</span>
              <span className="text-xs">stars</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GitFork className="size-4 text-blue-500" />
              <span className="font-medium text-foreground">{formatNumber(githubStats.forks)}</span>
              <span className="text-xs">forks</span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {githubStats.lastCommitDate && (
              <div className="flex justify-between text-muted-foreground">
                <span>Last commit</span>
                <span className="text-foreground">{formatDate(githubStats.lastCommitDate)}</span>
              </div>
            )}
            {githubStats.primaryLanguage && (
              <div className="flex justify-between text-muted-foreground">
                <span>Language</span>
                <span className="text-foreground">{githubStats.primaryLanguage}</span>
              </div>
            )}
            {githubStats.license && (
              <div className="flex justify-between text-muted-foreground">
                <span>License</span>
                <span className="text-foreground">{githubStats.license}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Activity</span>
              <span className={`font-medium ${githubStats.isActive ? 'text-green-500' : 'text-red-500'}`}>
                {githubStats.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>

          {repository && (
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="size-4" />
              View Repository
            </a>
          )}
        </div>
      )}

      {pricingType && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="text-sm text-muted-foreground mb-1">Pricing</div>
          <div className="text-2xl font-bold text-foreground capitalize">
            {pricingType.replace('-', ' ')}
          </div>
        </div>
      )}

      {(reviewCount !== undefined && reviewCount !== null && reviewCount > 0) && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-4 ${
                    star <= Math.round(averageRating || 0)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">
              {averageRating?.toFixed(1) || '0.0'}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {reviewCount} reviews
          </div>
          {reviewSummary && (
            <p className="text-sm text-muted-foreground mt-3 italic">
              "{reviewSummary}"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
