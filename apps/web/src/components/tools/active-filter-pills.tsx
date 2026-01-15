import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveFilterPillsProps {
  selectedIndustries: string[];
  selectedCategories: string[];
  selectedPricing: string[];
  openSourceFilter: 'all' | 'open-source';
  onRemoveIndustry: (industry: string) => void;
  onRemoveCategory: (category: string) => void;
  onRemovePricing: (pricing: string) => void;
  onRemoveOpenSource: () => void;
  onClearAll: () => void;
}

function formatLabel(option: string) {
  return option.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/60 rounded-full text-sm text-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="hover:text-foreground transition-colors"
      >
        <X className="size-3" />
      </button>
    </span>
  );
}

export function ActiveFilterPills({
  selectedIndustries,
  selectedCategories,
  selectedPricing,
  openSourceFilter,
  onRemoveIndustry,
  onRemoveCategory,
  onRemovePricing,
  onRemoveOpenSource,
  onClearAll,
}: ActiveFilterPillsProps) {
  const hasActiveFilters =
    selectedIndustries.length > 0 ||
    selectedCategories.length > 0 ||
    selectedPricing.length > 0 ||
    openSourceFilter === 'open-source';

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {selectedCategories.map((cat) => (
        <Pill
          key={cat}
          label={`Category: ${formatLabel(cat)}`}
          onRemove={() => onRemoveCategory(cat)}
        />
      ))}
      {selectedIndustries.map((ind) => (
        <Pill
          key={ind}
          label={`Industry: ${formatLabel(ind)}`}
          onRemove={() => onRemoveIndustry(ind)}
        />
      ))}
      {selectedPricing.map((price) => (
        <Pill
          key={price}
          label={`Pricing: ${formatLabel(price)}`}
          onRemove={() => onRemovePricing(price)}
        />
      ))}
      {openSourceFilter === 'open-source' && (
        <Pill label="Open Source Only" onRemove={onRemoveOpenSource} />
      )}
      <button
        type="button"
        onClick={onClearAll}
        className={cn(
          'text-sm transition-colors',
          'text-muted-foreground hover:text-foreground'
        )}
      >
        Clear all
      </button>
    </div>
  );
}
