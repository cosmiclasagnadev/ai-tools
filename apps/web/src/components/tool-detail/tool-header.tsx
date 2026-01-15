import { ExternalLink, Star } from 'lucide-react';

interface ToolHeaderProps {
  name: string;
  tagline?: string;
  logo?: string;
  website: string;
  hasAffiliate: boolean;
  affiliateUrl?: string;
}

export function ToolHeader({ name, tagline, logo, website, hasAffiliate, affiliateUrl }: ToolHeaderProps) {
  const displayUrl = new URL(website).hostname;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-16 h-16 rounded-xl bg-accent/10 object-cover border border-border"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border border-primary/20">
            {name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{name}</h1>
          {tagline && (
            <p className="text-lg text-muted-foreground mt-1">{tagline}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={affiliateUrl || website}
          target={hasAffiliate ? "_blank" : undefined}
          rel={hasAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <ExternalLink className="size-4" />
          Visit {displayUrl}
        </a>
        {hasAffiliate && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
            <Star className="size-3 mr-1" />
            Affiliate
          </span>
        )}
      </div>
    </div>
  );
}
