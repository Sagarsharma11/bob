'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-orange-500 hover:text-white disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-800"
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...' || page === currentPage}
          className={`px-3 py-2 rounded-lg font-semibold transition-all ${
            page === currentPage
              ? 'bg-orange-500 text-white shadow-lg'
              : page === '...'
                ? 'bg-transparent text-gray-600 dark:text-gray-400 cursor-default'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-orange-500 hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-orange-500 hover:text-white disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-800"
      >
        Next →
      </button>
    </div>
  );
}
