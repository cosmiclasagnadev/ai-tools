'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/tools/search-bar';
import { SortDropdown } from '@/components/tools/sort-dropdown';
import { OpenSourceDropdown } from '@/components/tools/open-source-dropdown';
import { InlineFilters } from '@/components/tools/inline-filters';
import { ActiveFilterPills } from '@/components/tools/active-filter-pills';
import { ToolGrid } from '@/components/tools/tool-grid';
import { Pagination } from '@/components/ui/pagination';
import { MOCK_TOOLS } from '@/lib/mock-data';

const ITEMS_PER_PAGE = 12;

export function ToolDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [openSourceFilter, setOpenSourceFilter] = useState<'all' | 'open-source'>('all');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const filterCounts = useMemo(() => {
    const industryCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    const pricingCounts: Record<string, number> = {};

    MOCK_TOOLS.forEach((tool) => {
      tool.industries.forEach((ind) => {
        industryCounts[ind] = (industryCounts[ind] || 0) + 1;
      });
      tool.categories.forEach((cat) => {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
      if (tool.pricingType) {
        pricingCounts[tool.pricingType] = (pricingCounts[tool.pricingType] || 0) + 1;
      }
    });

    return { industryCounts, categoryCounts, pricingCounts };
  }, []);

  const filteredTools = useMemo(() => {
    return MOCK_TOOLS.filter((tool) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesDescription = tool.description.toLowerCase().includes(query);
        const matchesTagline = tool.tagline?.toLowerCase().includes(query);
        if (!matchesName && !matchesDescription && !matchesTagline) return false;
      }

      if (selectedIndustries.length > 0) {
        if (!tool.industries.some((ind) => selectedIndustries.includes(ind))) return false;
      }

      if (selectedCategories.length > 0) {
        if (!tool.categories.some((cat) => selectedCategories.includes(cat))) return false;
      }

      if (selectedPricing.length > 0) {
        if (!tool.pricingType || !selectedPricing.includes(tool.pricingType)) return false;
      }

      if (openSourceFilter === 'open-source' && !tool.isOpenSource) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'popular':
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedIndustries, selectedCategories, selectedPricing, openSourceFilter, sortBy]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const currentTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSelectedIndustries([]);
    setSelectedCategories([]);
    setSelectedPricing([]);
    setOpenSourceFilter('all');
    setIsFiltersOpen(false);
  };

  const toggleFilter = (list: string[], item: string, setList: (l: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <section id="tools" className="container max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-4 w-full">
        <SearchBar 
          onSearch={setSearchQuery} 
          onFilterClick={() => setIsFiltersOpen(!isFiltersOpen)}
          isFiltersOpen={isFiltersOpen}
        />
        <OpenSourceDropdown value={openSourceFilter} onChange={setOpenSourceFilter} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <InlineFilters
        isOpen={isFiltersOpen}
        selectedIndustries={selectedIndustries}
        selectedCategories={selectedCategories}
        selectedPricing={selectedPricing}
        industryCounts={filterCounts.industryCounts}
        categoryCounts={filterCounts.categoryCounts}
        pricingCounts={filterCounts.pricingCounts}
        onIndustryChange={(ind: string) => toggleFilter(selectedIndustries, ind, setSelectedIndustries)}
        onCategoryChange={(cat: string) => toggleFilter(selectedCategories, cat, setSelectedCategories)}
        onPricingChange={(price: string) => toggleFilter(selectedPricing, price, setSelectedPricing)}
      />

      <ActiveFilterPills
        selectedIndustries={selectedIndustries}
        selectedCategories={selectedCategories}
        selectedPricing={selectedPricing}
        openSourceFilter={openSourceFilter}
        onRemoveIndustry={(ind: string) => toggleFilter(selectedIndustries, ind, setSelectedIndustries)}
        onRemoveCategory={(cat: string) => toggleFilter(selectedCategories, cat, setSelectedCategories)}
        onRemovePricing={(price: string) => toggleFilter(selectedPricing, price, setSelectedPricing)}
        onRemoveOpenSource={() => setOpenSourceFilter('all')}
        onClearAll={handleClearFilters}
      />

      <ToolGrid tools={currentTools} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
