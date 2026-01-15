'use client';

import { FilterColumn } from '@/components/tools/filter-column';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { OSSFilterOptions } from '@aitools/shared';

interface OSSInlineFiltersProps {
  isOpen: boolean;
  filters: OSSFilterOptions;
  licenseCounts: Record<string, number>;
  languageCounts: Record<string, number>;
  starRangeCounts: Record<string, number>;
  selectedLicenses: string[];
  selectedLanguages: string[];
  selectedMinStars: string[];
  selfHostable: boolean;
  dockerSupport: boolean;
  selfHostableCount?: number;
  dockerSupportCount?: number;
  onLicenseChange: (license: string) => void;
  onLanguageChange: (language: string) => void;
  onMinStarsChange: (minStars: string) => void;
  onSelfHostableChange: (value: boolean) => void;
  onDockerSupportChange: (value: boolean) => void;
}

export function OSSInlineFilters({
  isOpen,
  filters,
  licenseCounts,
  languageCounts,
  starRangeCounts,
  selectedLicenses,
  selectedLanguages,
  selectedMinStars,
  selfHostable,
  dockerSupport,
  selfHostableCount,
  dockerSupportCount,
  onLicenseChange,
  onLanguageChange,
  onMinStarsChange,
  onSelfHostableChange,
  onDockerSupportChange,
}: OSSInlineFiltersProps) {
  const licenses = filters.licenses.map(l => l.value);
  const languages = filters.languages.map(l => l.value);
  const starRanges = filters.starRanges.map(r => r.label);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
      )}
    >
      <FilterColumn
        title="License"
        options={licenses}
        selected={selectedLicenses}
        counts={licenseCounts}
        onToggle={onLicenseChange}
      />
      <FilterColumn
        title="Language"
        options={languages}
        selected={selectedLanguages}
        counts={languageCounts}
        onToggle={onLanguageChange}
      />
      <FilterColumn
        title="Min Stars"
        options={starRanges}
        selected={selectedMinStars}
        counts={starRangeCounts}
        onToggle={onMinStarsChange}
      />
      <div className="flex flex-col border border-accent-foreground/20 rounded-lg bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground" htmlFor="self-hostable">
              Self-hostable
            </label>
            <Switch
              id="self-hostable"
              checked={selfHostable}
              onCheckedChange={onSelfHostableChange}
            />
          </div>
          {selfHostableCount !== undefined && (
            <span className="text-xs text-muted-foreground">{selfHostableCount} tools</span>
          )}
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground" htmlFor="docker-support">
              Docker Support
            </label>
            <Switch
              id="docker-support"
              checked={dockerSupport}
              onCheckedChange={onDockerSupportChange}
            />
          </div>
          {dockerSupportCount !== undefined && (
            <span className="text-xs text-muted-foreground">{dockerSupportCount} tools</span>
          )}
        </div>
      </div>
    </div>
  );
}
