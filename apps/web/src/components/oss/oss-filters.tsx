'use client';

import { useState } from 'react';
import { OSSInlineFilters } from './oss-inline-filters';
import type { OSSFilterOptions, OSSFilterCounts } from '@aitools/shared';

interface OSSFiltersProps {
  filters: OSSFilterOptions;
  counts: OSSFilterCounts;
  currentFilters: {
    license: string;
    language: string;
    minStars: string;
    selfHostable: boolean;
    dockerSupport: boolean;
  };
  onFilterChange: (key: string, value: string | boolean) => void;
}

export function OSSFilters({ filters, counts, currentFilters, onFilterChange }: OSSFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedMinStars, setSelectedMinStars] = useState<string[]>([]);

  const handleClearFilters = () => {
    setSelectedLicenses([]);
    setSelectedLanguages([]);
    setSelectedMinStars([]);
    onFilterChange('license', '');
    onFilterChange('language', '');
    onFilterChange('minStars', '');
    onFilterChange('selfHostable', false);
    onFilterChange('dockerSupport', false);
  };

  const hasActiveFilters = selectedLicenses.length > 0 || 
    selectedLanguages.length > 0 || 
    selectedMinStars.length > 0 ||
    currentFilters.license || 
    currentFilters.language || 
    currentFilters.minStars ||
    currentFilters.selfHostable || 
    currentFilters.dockerSupport;

  const handleLicenseChange = (license: string) => {
    const newSelection = selectedLicenses.includes(license)
      ? selectedLicenses.filter(l => l !== license)
      : [...selectedLicenses, license];
    setSelectedLicenses(newSelection);
    onFilterChange('license', newSelection.join(','));
  };

  const handleLanguageChange = (language: string) => {
    const newSelection = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newSelection);
    onFilterChange('language', newSelection.join(','));
  };

  const handleMinStarsChange = (minStars: string) => {
    const newSelection = selectedMinStars.includes(minStars)
      ? selectedMinStars.filter(s => s !== minStars)
      : [...selectedMinStars, minStars];
    setSelectedMinStars(newSelection);
    onFilterChange('minStars', newSelection.join(','));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Filter icon</title>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span className="text-sm font-medium">Filters</span>
        </button>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <OSSInlineFilters
        isOpen={isFiltersOpen}
        filters={filters}
        licenseCounts={counts.licenseCounts}
        languageCounts={counts.languageCounts}
        starRangeCounts={counts.starRangeCounts}
        selectedLicenses={selectedLicenses}
        selectedLanguages={selectedLanguages}
        selectedMinStars={selectedMinStars}
        selfHostable={currentFilters.selfHostable}
        dockerSupport={currentFilters.dockerSupport}
        selfHostableCount={counts.selfHostableCount}
        dockerSupportCount={counts.dockerSupportCount}
        onLicenseChange={handleLicenseChange}
        onLanguageChange={handleLanguageChange}
        onMinStarsChange={handleMinStarsChange}
        onSelfHostableChange={(value) => onFilterChange('selfHostable', value)}
        onDockerSupportChange={(value) => onFilterChange('dockerSupport', value)}
      />
    </div>
  );
}
