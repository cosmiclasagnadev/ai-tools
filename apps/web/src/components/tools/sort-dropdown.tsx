import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none bg-stone-950 text-foreground pl-4 pr-10 py-2.5 rounded-lg cursor-pointer hover:border-accent-foreground/40 focus:outline-none focus:border-accent-foreground focus:ring-1 focus:ring-accent-foreground transition-colors text-sm shadow-sm inset-shadow-[0px_1px_1px_0px_rgba(255,255,255,0.2)]"
          >
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        </div>
    </div>
  );
}


