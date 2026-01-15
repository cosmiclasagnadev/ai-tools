interface IndustryHeaderProps {
  displayName: string;
  description: string;
  toolCount: number;
}

export function IndustryHeader({ displayName, description, toolCount }: IndustryHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-foreground">{displayName}</h1>
      <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{toolCount}</span>
        <span>AI tools</span>
      </div>
    </div>
  );
}
