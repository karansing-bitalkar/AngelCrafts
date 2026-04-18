import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1.5 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl border border-pink-100 flex items-center justify-center text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              "w-9 h-9 rounded-xl text-sm font-semibold transition-all",
              currentPage === page
                ? "bg-gradient-primary text-white shadow-soft"
                : "border border-pink-100 text-gray-600 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-700"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl border border-pink-100 flex items-center justify-center text-gray-500 hover:bg-primary/10 hover:border-primary/30 hover:text-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
