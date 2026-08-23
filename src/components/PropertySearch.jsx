import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, PoundSterling, Bed, Bath, Sofa, Car, PawPrint, Calendar, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertySearch({ filterState, setFilterState, onResetFilters, isRental = false, purpose = undefined }) {
  const [activeTab, setActiveTab] = useState(filterState.status || purpose || 'All');

  useEffect(() => {
    if (purpose) {
      setActiveTab(purpose);
      setFilterState((prev) => ({ ...prev, status: purpose }));
    }
    // Only run on mount when purpose is provided
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose]);

  const handleTabChange = (status) => {
    setActiveTab(status);
    setFilterState((prev) => ({ ...prev, status: status === 'All' ? '' : status }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFilterState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-4 sm:p-8 rounded-3xl shadow-2xl border border-[#D4A44A]/30"
      >
        {/* Status Tabs: Buy / Let / Rent / All */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          {!purpose && (
            <div className="grid grid-cols-4 gap-1 w-full sm:flex sm:items-center sm:gap-2 sm:w-auto p-1 rounded-2xl sm:rounded-full bg-[#051329]/80 border border-white/10">
              {['All', 'Buy', 'Let', 'Rent'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-2 sm:px-5 py-2 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center whitespace-nowrap ${
                    activeTab === tab
                      ? 'gold-bg text-[#071B35] shadow-lg shadow-[#D4A44A]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'All' ? 'All' : tab}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-[#D4A44A] hover:text-[#E5B85C] transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 cursor-pointer w-full sm:w-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4A44A]" />
              Location
            </label>
            <select
              name="location"
              value={filterState.location || ''}
              onChange={handleSelectChange}
              className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
            >
              <option value="">All Locations</option>
              <option value="Edgbaston">Edgbaston</option>
              <option value="Solihull">Solihull</option>
              <option value="Sutton Coldfield">Sutton Coldfield</option>
              <option value="Jewellery Quarter">Jewellery Quarter</option>
              <option value="Harborne">Harborne</option>
              <option value="City Centre">City Centre</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#D4A44A]" />
              Property Type
            </label>
            <select
              name="type"
              value={filterState.type || ''}
              onChange={handleSelectChange}
              className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
            >
              <option value="">All Types</option>
              <option value="Detached Villa">Detached Villa</option>
              <option value="Penthouse Apartment">Penthouse Apartment</option>
              <option value="Luxury House">Luxury House</option>
              <option value="Loft Apartment">Loft Apartment</option>
              <option value="Country House">Country House</option>
              <option value="Period Property">Period Property</option>
            </select>
          </div>

          {/* Min Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
              Min Price
            </label>
            <select
              name="minPrice"
              value={filterState.minPrice || ''}
              onChange={handleSelectChange}
              className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
            >
              <option value="">No Min</option>
              <option value="1000">£1,000 / pcm</option>
              <option value="2000">£2,000 / pcm</option>
              <option value="500000">£500,000</option>
              <option value="1000000">£1,000,000</option>
              <option value="1500000">£1,500,000</option>
            </select>
          </div>

          {/* Max Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
              Max Price
            </label>
            <select
              name="maxPrice"
              value={filterState.maxPrice || ''}
              onChange={handleSelectChange}
              className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
            >
              <option value="">No Max</option>
              <option value="3000">£3,000 / pcm</option>
              <option value="1000000">£1,000,000</option>
              <option value="2000000">£2,000,000</option>
              <option value="3000000">£3,000,000+</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-[#D4A44A]" />
              Bedrooms
            </label>
            <select
              name="bedrooms"
              value={filterState.bedrooms || ''}
              onChange={handleSelectChange}
              className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
            >
              <option value="">Any Bedrooms</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

        </div>

        {/* Rental Specific Filters */}
        {isRental && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-white/10">
            {/* Bathrooms */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#D4A44A]" />
                Bathrooms
              </label>
              <select
                name="bathrooms"
                value={filterState.bathrooms || ''}
                onChange={handleSelectChange}
                className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
              >
                <option value="">Any Bathrooms</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
                <option value="4">4+ Baths</option>
              </select>
            </div>

            {/* Furnished Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sofa className="w-3.5 h-3.5 text-[#D4A44A]" />
                Furnished
              </label>
              <select
                name="furnished"
                value={filterState.furnished || ''}
                onChange={handleSelectChange}
                className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
              >
                <option value="">Any Status</option>
                <option value="Furnished">Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Part Furnished">Part Furnished</option>
              </select>
            </div>

            {/* Parking */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-[#D4A44A]" />
                Parking
              </label>
              <select
                name="parking"
                value={filterState.parking || ''}
                onChange={handleSelectChange}
                className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
              >
                <option value="">Any</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Pets Allowed */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <PawPrint className="w-3.5 h-3.5 text-[#D4A44A]" />
                Pets Allowed
              </label>
              <select
                name="petsAllowed"
                value={filterState.petsAllowed || ''}
                onChange={handleSelectChange}
                className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
              >
                <option value="">Any</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Available From */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A44A]" />
                Available From
              </label>
              <select
                name="availableFrom"
                value={filterState.availableFrom || ''}
                onChange={handleSelectChange}
                className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#D4A44A] transition-colors cursor-pointer"
              >
                <option value="">Any Date</option>
                <option value="Immediately">Immediately</option>
                <option value="Within 1 Month">Within 1 Month</option>
                <option value="Within 3 Months">Within 3 Months</option>
              </select>
            </div>

          </div>
        )}
        {/* Search Submit Action Button */}
        <div className="mt-6 flex justify-end w-full">
          <a
            href="#properties"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-sm shadow-lg shadow-[#D4A44A]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search Properties</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
