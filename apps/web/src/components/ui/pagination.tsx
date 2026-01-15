import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-accent/40 border border-accent-foreground/20 text-muted-foreground hover:text-foreground hover:border-accent-foreground/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent/40 border border-accent-foreground/20 text-muted-foreground hover:text-foreground hover:border-accent-foreground/40'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-accent/40 border border-accent-foreground/20 text-muted-foreground hover:text-foreground hover:border-accent-foreground/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}


