import Link from 'next/link';

interface ToolTagsProps {
  categories: string[] | null;
  industries: string[] | null;
  isOpenSource: boolean;
  license?: string | null;
  setupDifficulty?: string | null;
  selfHostable?: boolean | null;
  dockerSupport?: boolean | null;
}

export function ToolTags({
  categories,
  industries,
  isOpenSource,
  license,
  setupDifficulty,
  selfHostable,
  dockerSupport,
}: ToolTagsProps) {
  const allTags: { label: string; href?: string; color: string }[] = [];

  if (categories) {
    categories.forEach((cat) => {
      allTags.push({
        label: cat.replace(/-/g, ' '),
        href: `/tools?category=${cat}`,
        color: 'bg-blue-500/20 text-blue-400',
      });
    });
  }

  if (industries) {
    industries.forEach((ind) => {
      allTags.push({
        label: ind.replace(/-/g, ' '),
        href: `/tools/${ind}`,
        color: 'bg-purple-500/20 text-purple-400',
      });
    });
  }

  if (isOpenSource && license) {
    allTags.push({
      label: license,
      color: 'bg-green-500/20 text-green-400',
    });
  }

  if (isOpenSource && setupDifficulty) {
    allTags.push({
      label: `Setup: ${setupDifficulty}`,
      color: 'bg-orange-500/20 text-orange-400',
    });
  }

  if (isOpenSource && selfHostable) {
    allTags.push({
      label: 'Self-hostable',
      color: 'bg-cyan-500/20 text-cyan-400',
    });
  }

  if (isOpenSource && dockerSupport) {
    allTags.push({
      label: 'Docker',
      color: 'bg-blue-500/20 text-blue-400',
    });
  }

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag, index) => (
        tag.href ? (
          <Link
            key={index}
            href={tag.href}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors hover:opacity-80 ${tag.color}`}
          >
            {tag.label}
          </Link>
        ) : (
          <span
            key={index}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}
          >
            {tag.label}
          </span>
        )
      ))}
    </div>
  );
}
