import { FilterColumn } from './filter-column';
import { cn } from '@/lib/utils';
import { INDUSTRIES, CATEGORIES, PRICING_TYPES } from '@aitools/shared';

interface InlineFiltersProps {
  isOpen: boolean;
  selectedIndustries: string[];
  selectedCategories: string[];
  selectedPricing: string[];
  industryCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
  pricingCounts: Record<string, number>;
  onIndustryChange: (industry: string) => void;
  onCategoryChange: (category: string) => void;
  onPricingChange: (pricing: string) => void;
}

export function InlineFilters({
  isOpen,
  selectedIndustries,
  selectedCategories,
  selectedPricing,
  industryCounts,
  categoryCounts,
  pricingCounts,
  onIndustryChange,
  onCategoryChange,
  onPricingChange,
}: InlineFiltersProps) {
  const formatPricingLabel = (option: string) =>
    option.charAt(0).toUpperCase() + option.slice(1);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
      )}
    >
      <FilterColumn
        title="Industries"
        options={INDUSTRIES}
        selected={selectedIndustries}
        counts={industryCounts}
        onToggle={onIndustryChange}
      />
      <FilterColumn
        title="Categories"
        options={CATEGORIES}
        selected={selectedCategories}
        counts={categoryCounts}
        onToggle={onCategoryChange}
      />
      <FilterColumn
        title="Pricing"
        options={PRICING_TYPES}
        selected={selectedPricing}
        counts={pricingCounts}
        onToggle={onPricingChange}
        formatLabel={formatPricingLabel}
      />
    </div>
  );
}
