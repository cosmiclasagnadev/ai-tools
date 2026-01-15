interface ToolDescriptionProps {
  description: string;
  features?: string[] | null;
  pros?: string[] | null;
  cons?: string[] | null;
}

export function ToolDescription({ description, features, pros, cons }: ToolDescriptionProps) {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      {features && features.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {pros && pros.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Pros</h2>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-green-500 mt-1">+</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cons && cons.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Cons</h2>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-red-500 mt-1">−</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
