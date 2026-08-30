import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Home,
  PoundSterling,
  Bed,
  Bath,
  Tag,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTER_BASE_CLASS =
  'w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors placeholder:text-slate-500';

const FILTER_LABEL_CLASS =
  'text-xs font-semibold text-slate-300 flex items-center gap-1.5';

export default function BuyPropertyFilters({ filterState, setFilterState, onSearch, onResetFilters }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({ ...prev, [name]: value }));
  };

  const activeFilterCount = Object.values(filterState).filter((val) => val !== '').length;

  const filterFields = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* LOCATION - Now an Input field */}
      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <MapPin className="w-3.5 h-3.5 text-[#D4A44A]" />
          Location
        </label>
        <input
          type="text"
          name="location"
          value={filterState.location || ''}
          onChange={handleChange}
          placeholder="e.g. Birmingham, Solihull..."
          className={FILTER_BASE_CLASS}
        />
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <Home className="w-3.5 h-3.5 text-[#D4A44A]" />
          Property Type
        </label>
        <select
          name="type"
          value={filterState.type || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">All Types</option>
          <option value="Country House">Terrace House</option>
          <option value="Detached Villa">Detached House  </option>
          <option value="Country House">Semi-Detached House</option>
          <option value="Penthouse Apartment">Penthouse Apartment</option>
          {/* <option value="Period Property">Period Property</option> */}
          <option value="Townhouse">Townhouse</option>
          {/* <option value="Contemporary Home">Contemporary Home</option> */}
          {/* <option value="Heritage Home">Heritage Home</option> */}
          {/* <option value="Executive Home">Executive Home</option> */}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
          Minimum Price
        </label>
        <select
          name="minPrice"
          value={filterState.minPrice || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">No Minimum</option>
          <option value="50000">£50,000</option>
          <option value="100000">£100,000</option>
          <option value="250000">£250,000</option>
          <option value="500000">£500,000</option>
          <option value="750000">£750,000</option>
          <option value="1000000">£1,000,000</option>
          <option value="1500000">£1,500,000</option>
          <option value="2000000">£2,000,000</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
          Maximum Price
        </label>
        <select
          name="maxPrice"
          value={filterState.maxPrice || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">No Maximum</option>
          <option value="100000">£100,000</option>
          <option value="250000">£250,000</option>
          <option value="500000">£500,000</option>
          <option value="750000">£750,000</option>
          <option value="1000000">£1,000,000</option>
          <option value="1500000">£1,500,000</option>
          <option value="2000000">£2,000,000</option>
          <option value="2500000">£2,500,000</option>
          <option value="3000000">£3,000,000+</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <Bed className="w-3.5 h-3.5 text-[#D4A44A]" />
          Bedrooms
        </label>
        <select
          name="bedrooms"
          value={filterState.bedrooms || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">Any Bedrooms</option>
          <option value="1">1+ Beds</option>
          <option value="2">2+ Beds</option>
          <option value="3">3+ Beds</option>
          <option value="4">4+ Beds</option>
          <option value="5">5+ Beds</option>
          <option value="6">6+ Beds</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <Bath className="w-3.5 h-3.5 text-[#D4A44A]" />
          Bathrooms
        </label>
        <select
          name="bathrooms"
          value={filterState.bathrooms || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">Any Bathrooms</option>
          <option value="1">1+ Baths</option>
          <option value="2">2+ Baths</option>
          <option value="3">3+ Baths</option>
          <option value="4">4+ Baths</option>
          <option value="5">5+ Baths</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className={FILTER_LABEL_CLASS}>
          <Tag className="w-3.5 h-3.5 text-[#D4A44A]" />
          Property Status
        </label>
        <select
          name="listingStatus"
          value={filterState.listingStatus || ''}
          onChange={handleChange}
          className={`${FILTER_BASE_CLASS} cursor-pointer`}
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Under Offer">Under Offer</option>
          <option value="Sold STC">Sold STC</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={onSearch}
          className="w-full py-3 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-sm shadow-lg shadow-[#D4A44A]/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Search className="w-4 h-4" />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-4 sm:p-8 rounded-3xl shadow-2xl border border-[#D4A44A]/30"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Refine Your <span className="gold-text">Search</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-light">
              Filter our exclusive portfolio to find your perfect home
            </p>
          </div>

          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 text-xs font-semibold text-[#D4A44A] hover:text-[#E5B85C] transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#051329]/80 border border-white/10 text-slate-200 text-sm font-medium mb-4 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#D4A44A]" />
            Property Filters
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full gold-bg text-[#071B35] text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#D4A44A] transition-transform duration-300 ${
              mobileFiltersOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div className="hidden lg:block">{filterFields}</div>

        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              {filterFields}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}