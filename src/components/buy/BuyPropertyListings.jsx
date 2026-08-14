import React from 'react';
import { LayoutGrid, List, ArrowUpDown, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../PropertyCard';
import Pagination from '../Pagination';

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price Low to High' },
  { value: 'price-desc', label: 'Price High to Low' },
  { value: 'newest', label: 'Newest Listings' },
  { value: 'popular', label: 'Most Popular' },
];

export default function BuyPropertyListings({
  properties,
  totalCount,
  viewType,
  setViewType,
  sortBy,
  setSortBy,
  currentPage,
  totalPages,
  onPageChange,
  onSelectProperty,
  savedIds,
  onToggleSave,
  filterActive,
}) {
  return (
    <section id="listings" className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A44A]/10 border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Listings
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
               <span className="gold-text">Properties</span>
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-xl font-light">
              Hand-selected residences across Birmingham and the West Midlands, ready for your next chapter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4A44A] pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort properties"
                className="w-full sm:w-auto pl-9 pr-4 py-2.5 rounded-xl bg-[#051329]/90 border border-white/15 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer appearance-none min-w-[200px]"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center p-1 rounded-xl bg-[#051329]/80 border border-white/10">
              <button
                onClick={() => setViewType('grid')}
                aria-label="Grid view"
                aria-pressed={viewType === 'grid'}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  viewType === 'grid'
                    ? 'gold-bg text-[#071B35] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewType('list')}
                aria-label="List view"
                aria-pressed={viewType === 'list'}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  viewType === 'list'
                    ? 'gold-bg text-[#071B35] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <span className="text-xs sm:text-sm text-slate-400 font-medium">
            Showing{' '}
            <span className="text-[#D4A44A] font-bold">{properties.length}</span> of{' '}
            <span className="text-white font-bold">{totalCount}</span> properties
          </span>
          {filterActive && (
            <span className="text-[11px] text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Filtered Results
            </span>
          )}
        </div>

        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-3xl text-center max-w-xl mx-auto"
          >
            <Tag className="w-12 h-12 text-[#D4A44A] mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">
              No Matching Properties Found
            </h3>
            <p className="text-slate-400 text-sm">
              We couldn't find properties matching your criteria. Try adjusting your filters or expanding your price range.
            </p>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewType}-${currentPage}-${sortBy}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  viewType === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8'
                    : 'flex flex-col gap-6'
                }
              >
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewType={viewType}
                    onSelect={onSelectProperty}
                    isSaved={savedIds.has(property.id)}
                    onToggleSave={onToggleSave}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </section>
  );
}
