import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages - 1) pages.push('...');

    pages.push(totalPages);
    return pages;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-[#D4A44A]/50 hover:text-[#D4A44A] hover:bg-[#D4A44A]/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-slate-300 disabled:hover:bg-white/5 transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1.5">
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-slate-500 text-sm select-none">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`min-w-[40px] h-10 px-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                currentPage === page
                  ? 'gold-bg text-[#071B35] shadow-lg shadow-[#D4A44A]/25 scale-105'
                  : 'border border-white/10 bg-white/5 text-slate-300 hover:border-[#D4A44A]/40 hover:text-[#D4A44A] hover:bg-[#D4A44A]/10'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:border-[#D4A44A]/50 hover:text-[#D4A44A] hover:bg-[#D4A44A]/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:hover:text-slate-300 disabled:hover:bg-white/5 transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.nav>
  );
}
