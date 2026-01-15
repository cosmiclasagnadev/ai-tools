'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { OSSFilters } from '@/components/oss/oss-filters';
import { OSSToolCard } from '@/components/oss/oss-tool-card';
import type { OSSToolWithStats, OSSFilterOptions, OSSFilterCounts } from '@aitools/shared';

interface OSSPageContentProps {
  initialFilters: OSSFilterOptions;
}

function OSSPageContent({ initialFilters }: OSSPageContentProps) {
  const searchParams = useSearchParams();
  const [tools, setTools] = useState<OSSToolWithStats[]>([]);
  const [counts, setCounts] = useState<OSSFilterCounts | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    license: searchParams.get('license') || '',
    language: searchParams.get('language') || '',
    minStars: searchParams.get('minStars') || '',
    selfHostable: searchParams.get('selfHostable') === 'true',
    dockerSupport: searchParams.get('dockerSupport') === 'true',
  });

  const fetchCounts = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/oss/filter-counts`);
      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error('Failed to fetch filter counts:', error);
    }
  }, []);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('pageSize', '12');
    if (filters.search) params.set('search', filters.search);
    if (filters.license) params.set('license', filters.license);
    if (filters.language) params.set('language', filters.language);
    if (filters.minStars) params.set('minStars', filters.minStars);
    if (filters.selfHostable) params.set('selfHostable', 'true');
    if (filters.dockerSupport) params.set('dockerSupport', 'true');

    try {
      const res = await fetch(`${apiUrl}/api/oss?${params.toString()}`);
      const data = await res.json();
      setTools(data.tools || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Failed to fetch OSS tools:', error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  const handleFilterChange = (key: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Open Source AI Tools</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover free, self-hostable AI tools with full transparency
          </p>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="size-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search open source tools..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-zinc-950 rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-accent-foreground focus:ring-1 focus:ring-accent-foreground transition-colors inset-shadow-[0px_1px_1px_0px_rgba(255,255,255,0.2)]"
              />
            </div>
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
          </div>
        </div>

        {counts && isFiltersOpen && (
          <OSSFilters
            filters={initialFilters}
            counts={counts}
            currentFilters={filters}
            onFilterChange={handleFilterChange}
          />
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-muted-foreground">
              {loading ? 'Loading...' : `${total} open source tools`}
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* eslint-disable-next-line react/no-array-index-key */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-4 animate-pulse">
                  <div className="h-10 w-10 bg-accent rounded-lg mb-4" />
                  <div className="h-5 bg-accent rounded w-3/4 mb-2" />
                  <div className="h-4 bg-accent rounded w-full mb-4" />
                  <div className="h-4 bg-accent rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-white mb-2">No OSS tools found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <OSSToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-card border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OSSPage() {
  const [filters, setFilters] = useState<OSSFilterOptions | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/oss/filters`)
      .then((res) => res.json())
      .then((data) => setFilters(data))
      .catch(console.error);
  }, []);

  if (!filters) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-accent rounded w-1/3" />
            <div className="h-6 bg-accent rounded w-1/2" />
            <div className="h-12 bg-accent rounded w-full mt-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {/* eslint-disable-next-line react/no-array-index-key */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 bg-accent rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <OSSPageContent initialFilters={filters} />
    </Suspense>
  );
}
