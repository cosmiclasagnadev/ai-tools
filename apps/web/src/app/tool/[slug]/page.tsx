import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ToolHeader } from '@/components/tool-detail/tool-header';
import { ToolDescription } from '@/components/tool-detail/tool-description';
import { ToolSidebar } from '@/components/tool-detail/tool-sidebar';
import { ToolTags } from '@/components/tool-detail/tool-tags';
import { ToolAlternatives } from '@/components/tool-detail/tool-alternatives';
import { ToolShare } from '@/components/tool-detail/tool-share';
import type { ToolWithGitHubStats } from '@aitools/shared';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string): Promise<ToolWithGitHubStats | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/tools/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function getAlternatives(slug: string): Promise<{ tools: ToolWithGitHubStats[] }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}/api/tools/${slug}/alternatives?limit=6`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { tools: [] };
  }

  return res.json();
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: `${tool.name} - AI Tools Directory`,
    description: tool.tagline || tool.description.slice(0, 160),
    openGraph: {
      title: tool.name,
      description: tool.tagline || tool.description.slice(0, 160),
      images: tool.previewImg ? [tool.previewImg] : [],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const [tool, alternativesData] = await Promise.all([
    getTool(slug),
    getAlternatives(slug),
  ]);

  if (!tool) {
    notFound();
  }

  const alternatives = alternativesData.tools.filter(t => t.id !== tool.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a href="/tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2">
            ← Back to Tools
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ToolHeader
              name={tool.name}
              tagline={tool.tagline}
              logo={tool.logo}
              website={tool.website}
              hasAffiliate={tool.hasAffiliate}
              affiliateUrl={tool.affiliateUrl}
            />

            {tool.previewImg && (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-accent/10">
                <img
                  src={tool.previewImg}
                  alt={`${tool.name} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <ToolDescription
              description={tool.description}
              features={tool.features}
              pros={tool.pros}
              cons={tool.cons}
            />

            {(tool.categories && tool.categories.length > 0) && (
              <ToolTags
                categories={tool.categories}
                industries={tool.industries}
                isOpenSource={tool.isOpenSource}
                license={tool.license}
                setupDifficulty={tool.setupDifficulty}
                selfHostable={tool.selfHostable}
                dockerSupport={tool.dockerSupport}
              />
            )}

            <ToolShare name={tool.name} slug={tool.slug} />

            <ToolAlternatives
              currentToolName={tool.name}
              alternatives={alternatives}
            />
          </div>

          <div className="lg:col-span-1">
            <ToolSidebar
              pricingType={tool.pricingType}
              reviewCount={tool.reviewCount}
              averageRating={tool.averageRating}
              reviewSummary={tool.reviewSummary}
              isOpenSource={tool.isOpenSource}
              githubStats={tool.githubStats}
              repository={tool.repository}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
