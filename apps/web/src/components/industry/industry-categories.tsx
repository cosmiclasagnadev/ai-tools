import Link from 'next/link';

interface IndustryCategoriesProps {
  categories: { name: string; count: number }[];
  industry: string;
}

export function IndustryCategories({ categories, industry }: IndustryCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
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
  );
}
