import Link from 'next/link';
import { Star, GitFork, Activity, Home, Box } from 'lucide-react';
import type { OSSToolWithStats } from '@aitools/shared';
import { GitHubStatsBadge } from './github-stats-badge';

interface OSSToolCardProps {
  tool: OSSToolWithStats;
}

function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function OSSToolCard({ tool }: OSSToolCardProps) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className="group flex flex-col bg-card rounded-xl border border-border p-5 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {tool.logo ? (
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-12 h-12 rounded-lg bg-accent/10 object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
              {tool.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            {tool.license && (
              <span className="text-xs text-muted-foreground">{tool.license}</span>
            )}
          </div>
        </div>
        <GitHubStatsBadge stats={tool.githubStats} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
        {tool.tagline || tool.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tool.githubStats?.primaryLanguage && (
          <span className="text-xs bg-accent/50 px-2 py-1 rounded-full text-muted-foreground">
            {tool.githubStats.primaryLanguage}
          </span>
        )}
        {tool.selfHostable && (
          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
            <Home className="size-3" />
            Self-hostable
          </span>
        )}
        {tool.dockerSupport && (
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full flex items-center gap-1">
            <Box className="size-3" />
            Docker
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Star className="size-3.5 text-yellow-500" />
            {formatNumber(tool.githubStats?.stars)}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3.5 text-blue-500" />
            {formatNumber(tool.githubStats?.forks)}
          </span>
        </div>
        <span className={`flex items-center gap-1 ${tool.githubStats?.isActive ? 'text-green-500' : 'text-red-500'}`}>
          <Activity className="size-3.5" />
          {tool.githubStats?.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </Link>
  );
}
