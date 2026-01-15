import Link from 'next/link';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import type { Tool } from '@aitools/shared';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link 
      href={`/tool/${tool.slug}`}
      className="group flex flex-col bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden inset-shadow-[0px_1px_1px_0px_rgba(255,255,255,0.2)]"
    >
      {/* Preview Image Section */}
      <div className="relative aspect-16/10 w-full overflow-hidden">
        {tool.previewImg ? (
          <img 
            src={tool.previewImg} 
            alt={`${tool.name} preview`} 
            className="w-full h-full object-cover rounded-2xl p-2"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/10">
            <span className="text-muted-foreground text-sm font-medium">No preview</span>
          </div>
        )}
        
        <div className="absolute top-5 right-5">
            <div className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/70 text-white backdrop-blur-sm border border-white/10 flex items-center gap-1">
            <span className={`text-[10px] uppercase font-bold tracking-wider`}>
                {tool.pricingType || 'Unknown'}
              </span>
            </div>
          </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {tool.logo ? (
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`} 
                className="size-10 rounded-lg bg-accent/20 object-cover border border-border"
              />
            ) : (
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-primary border border-primary/20">
                {tool.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <div className="flex flex-wrap gap-x-2 gap-y-0 text-sm mt-0.5 max-h-[1.25rem] overflow-hidden">
                {tool.categories.slice(0, 3).map((cat, i) => (
                  <span key={cat} className="text-muted-foreground capitalize text-xs flex items-center">
                    {cat.replace(/-/g, ' ')}
                    {i < Math.min(tool.categories.length, 3) - 1 && (
                      <span className="ml-2 text-muted-foreground/40">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-1 leading-relaxed">
          {tool.tagline || tool.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {/* Stats or Pricing */}
          {tool.isOpenSource && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Star className="size-3.5" />
                <span className="font-medium">12.5k</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <GitFork className="size-3.5" />
                <span className="font-medium">1.2k</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}


