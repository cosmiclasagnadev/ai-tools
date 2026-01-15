import { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterColumnProps {
  title: string;
  options: readonly string[];
  selected: string[];
  counts: Record<string, number>;
  onToggle: (option: string) => void;
  formatLabel?: (option: string) => string;
}

export function FilterColumn({
  title,
  options,
  selected,
  counts,
  onToggle,
  formatLabel,
}: FilterColumnProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return options
      .filter((opt) => opt.toLowerCase().includes(term))
      .sort((a, b) => {
        const aSelected = selected.includes(a);
        const bSelected = selected.includes(b);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return (counts[b] || 0) - (counts[a] || 0);
      });
  }, [options, searchTerm, selected, counts]);

  const defaultFormatLabel = (option: string) =>
    option.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="flex flex-col border border-accent-foreground/20 rounded-lg bg-card">
      <div className="relative border-b border-accent-foreground/10 px-4 py-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          className="w-full h-8 pl-8 pr-2 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        {filteredOptions.map((option) => {
          const isSelected = selected.includes(option);
          const count = counts[option] || 0;
          return (
            <button
              type="button"
              key={option}
              onClick={() => onToggle(option)}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors',
                isSelected
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent/40 hover:text-foreground'
              )}
            >
              <div
                className={cn(
                  'flex size-4 items-center justify-center rounded border',
                  isSelected
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-accent-foreground/40'
                )}
              >
                {isSelected && <Check className="size-3" />}
              </div>
              <span className="flex-1 text-left">
                {formatLabel ? formatLabel(option) : defaultFormatLabel(option)}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
        {filteredOptions.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}
