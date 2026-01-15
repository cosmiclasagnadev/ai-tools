import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { IndustryHeader } from '@/components/industry/industry-header';
import { ToolGrid } from '@/components/tools/tool-grid';
import type { IndustryHub, ToolWithGitHubStats } from '@aitools/shared';

interface IndustryPageProps {
  params: Promise<{ industry: string }>;
}

async function getIndustryData(industry: string): Promise<IndustryHub | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/industries/${industry}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function getIndustryTools(industry: string): Promise<{ tools: ToolWithGitHubStats[]; total: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/tools?industry=${industry}&pageSize=12`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { tools: [], total: 0 };
  }

  return res.json();
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { industry } = await params;
  const data = await getIndustryData(industry);

  if (!data) {
    return {
      title: 'Industry Not Found',
    };
  }

  return {
    title: `${data.displayName} AI Tools - AI Tools Directory`,
    description: data.description,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { industry } = await params;
  const [data, toolsData] = await Promise.all([
    getIndustryData(industry),
    getIndustryTools(industry),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
            ← Browse all industries
          </Link>
        </div>

        <IndustryHeader
          displayName={data.displayName}
          description={data.description}
          toolCount={data.toolCount}
        />

        {data.categories && data.categories.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {data.categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/tools?industry=${industry}&category=${cat.name}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <span className="capitalize text-foreground">{cat.name.replace(/-/g, ' ')}</span>
                  <span className="text-xs text-muted-foreground bg-accent/50 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {data.topTools && data.topTools.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Featured Tools</h2>
            </div>
            <ToolGrid tools={data.topTools} />
          </div>
        )}

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">All {data.displayName} Tools</h2>
            <span className="text-sm text-muted-foreground">{toolsData.total} tools</span>
          </div>
          <ToolGrid tools={toolsData.tools} />
        </div>
      </div>
    </div>
  );
}
