import React, { useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import BuyHero from '../components/buy/BuyHero';
import BuyPropertyFilters from '../components/buy/BuyPropertyFilters';
import BuyPropertyListings from '../components/buy/BuyPropertyListings';
import ValuationCTA from '../components/ValuationCTA';

import { useProperties } from '../hooks/useProperties';

const ITEMS_PER_PAGE = 6;

const DEFAULT_FILTERS = {
  location: '',
  type: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  listingStatus: '',
};

function sortProperties(properties, sortBy) {
  const sorted = [...properties];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    default:
      return sorted;
  }
}

// UPGRADED: Smarter, fault-tolerant filtering
function filterBuyProperties(properties, filters) {
  return properties.filter((item) => {
    // Safely check if it's a Buy/Sell property (checks both status and type)
    const isBuy = 
      item.status?.toLowerCase() === 'buy' || 
      item.type?.toLowerCase() === 'buy' ||
      item.status?.toLowerCase() === 'sell' ||
      item.type?.toLowerCase() === 'sell';

    if (!isBuy) return false;

    if (filters.location && !(item.location || '').toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    // Only filter by exact type if a filter is actually selected in the dropdown
    if (filters.type && item.type !== filters.type && item.status !== filters.type) {
      return false;
    }
    if (filters.bedrooms && item.bedrooms < parseInt(filters.bedrooms, 10)) return false;
    if (filters.bathrooms && item.bathrooms < parseInt(filters.bathrooms, 10)) return false;
    if (filters.listingStatus && item.listingStatus !== filters.listingStatus) return false;
    if (filters.minPrice && item.price < parseInt(filters.minPrice, 10)) return false;
    if (filters.maxPrice && item.price > parseInt(filters.maxPrice, 10)) return false;

    return true;
  });
}

export default function BuyProperties() {
  const { onOpenValuationModal, onSelectProperty } = useOutletContext();
  
  const { properties, loading, error } = useProperties();

  const [filterState, setFilterState] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState(new Set());

  const handleSearch = useCallback(() => {
    setAppliedFilters({ ...filterState });
    setCurrentPage(1);
    const el = document.getElementById('listings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [filterState]);

  const handleResetFilters = useCallback(() => {
    setFilterState(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleToggleSave = useCallback((id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filteredProperties = useMemo(() => {
    const filtered = filterBuyProperties(properties, appliedFilters);
    return sortProperties(filtered, sortBy);
  }, [appliedFilters, sortBy, properties]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const handlePageChange = useCallback(
    (page) => {
      setCurrentPage(page);
      const el = document.getElementById('listings');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    []
  );

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const isFilterActive = Object.values(appliedFilters).some((val) => val !== '');

  return (
    <>
      <BuyHero />

      <BuyPropertyFilters
        filterState={filterState}
        setFilterState={setFilterState}
        onSearch={handleSearch}
        onResetFilters={handleResetFilters}
      />

      {loading ? (
        <div className="py-24 text-center text-[#D4AF37] font-serif text-xl bg-[#051329]">
          Loading exclusive properties...
        </div>
      ) : error ? (
        <div className="py-24 text-center text-red-400 bg-[#051329]">
          {error}
        </div>
      ) : (
        <BuyPropertyListings
          properties={paginatedProperties}
          totalCount={filteredProperties.length}
          viewType={viewType}
          setViewType={setViewType}
          sortBy={sortBy}
          setSortBy={handleSortChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onSelectProperty={onSelectProperty}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          filterActive={isFilterActive}
        />
      )}

      <ValuationCTA onOpenValuationModal={onOpenValuationModal} />
    </>
  );
}