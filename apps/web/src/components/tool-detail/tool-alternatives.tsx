import Link from 'next/link';
import { Star, GitFork } from 'lucide-react';
import type { ToolWithGitHubStats } from '@aitools/shared';

interface ToolAlternativesProps {
  currentToolName: string;
  alternatives: ToolWithGitHubStats[];
}

function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return '0';
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function ToolAlternatives({ currentToolName, alternatives }: ToolAlternativesProps) {
  if (alternatives.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Similar open source alternatives to {currentToolName}
        </h2>
        <Link
          href="/open-source"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          View all OSS tools →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternatives.map((tool) => (
          <Link
            key={tool.id}
            href={`/tool/${tool.slug}`}
            className="group flex flex-col bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-10 h-10 rounded-lg bg-accent/10 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                  {tool.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {tool.tagline || tool.description}
                </p>
              </div>
            </div>

            {tool.githubStats && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                <div className="flex items-center gap-1">
                  <Star className="size-3 text-yellow-500" />
                  <span>{formatNumber(tool.githubStats.stars)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="size-3 text-blue-500" />
                  <span>{formatNumber(tool.githubStats.forks)}</span>
                </div>
                {tool.githubStats.primaryLanguage && (
                  <span>{tool.githubStats.primaryLanguage}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
