import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  isFiltersOpen?: boolean;
}

export function SearchBar({ onSearch, onFilterClick, isFiltersOpen }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="size-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search tools..."
        className="w-full h-10 pl-9 pr-22 bg-zinc-950 rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent-foreground focus:ring-1 focus:ring-accent-foreground transition-colors inset-shadow-[0px_1px_1px_0px_rgba(255,255,255,0.2)]"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 right-2 flex items-center">
        <button
          type="button"
          onClick={onFilterClick}
          className={cn(
            'flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors',
            isFiltersOpen
              ? 'bg-primary text-primary-foreground'
              : 'bg-stone-950 hover:bg-stone-900 text-foreground'
          )}
        >
          <SlidersHorizontal className="size-4" />
          Filters
        </button>
      </div>
    </div>
  );
}


