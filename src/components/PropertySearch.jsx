import React, { useState } from 'react';
import { Search, MapPin, Home, PoundSterling, Bed, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertySearch({ filterState, setFilterState, onResetFilters }) {
  const [activeTab, setActiveTab] = useState(filterState.status || 'All');

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
        className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#D4A44A]/30"
      >
        {/* Status Tabs: Buy / Let / Rent / All */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#051329]/80 border border-white/10">
            {['All', 'Buy', 'Let', 'Rent'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'gold-bg text-[#071B35] shadow-lg shadow-[#D4A44A]/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'All' ? 'All Properties' : tab}
              </button>
            ))}
          </div>

          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 text-xs font-semibold text-[#D4A44A] hover:text-[#E5B85C] transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 cursor-pointer"
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

        {/* Search Submit Action Button */}
        <div className="mt-6 flex justify-end">
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
