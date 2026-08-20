import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertySearch from '../components/PropertySearch';
import FeaturedProperties from '../components/FeaturedProperties';
import WhyChooseUs from '../components/WhyChooseUs';
import LandlordSection from '../components/LandlordSection';
import Testimonials from '../components/Testimonials';
import ValuationCTA from '../components/ValuationCTA';
import rightmoveLogo from '../assets/Rightmove.png';
import zooplaLogo from '../assets/Onthemarket.png';

import { useProperties } from '../hooks/useProperties';

export default function Home() {
  const { onOpenValuationModal, onSelectProperty } = useOutletContext();
  
  const { properties, loading, error } = useProperties();
  
  const [filterState, setFilterState] = useState({
    location: '',
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  const handleResetFilters = () => {
    setFilterState({
      location: '',
      type: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: ''
    });
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((item) => {
      if (filterState.location && !item.location.toLowerCase().includes(filterState.location.toLowerCase())) {
        return false;
      }
      if (filterState.type && item.type !== filterState.type) {
        return false;
      }
      if (filterState.status && item.status.toLowerCase() !== filterState.status.toLowerCase()) {
        return false;
      }
      if (filterState.bedrooms && item.bedrooms < parseInt(filterState.bedrooms, 10)) {
        return false;
      }
      if (filterState.minPrice && item.price < parseInt(filterState.minPrice, 10)) {
        return false;
      }
      if (filterState.maxPrice && item.price > parseInt(filterState.maxPrice, 10)) {
        return false;
      }
      return true;
    });
  }, [filterState, properties]);

  const isFilterActive = Object.values(filterState).some((val) => val !== '');

  return (
    <>
      <Hero
        onOpenValuationModal={onOpenValuationModal}
        onExploreClick={() => {
          const el = document.getElementById('properties');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <LandlordSection onOpenValuationModal={onOpenValuationModal} />

      <PropertySearch
        filterState={filterState}
        setFilterState={setFilterState}
        onResetFilters={handleResetFilters}
      />

      {loading ? (
        <div className="py-24 text-center text-[#D4AF37] font-serif text-xl bg-[#051329]">
          Loading exclusive portfolio...
        </div>
      ) : error ? (
        <div className="py-24 text-center text-red-400 bg-[#051329]">
          {error}
        </div>
      ) : (
        <FeaturedProperties
          properties={filteredProperties}
          onSelectProperty={onSelectProperty}
          filterActive={isFilterActive}
        />
      )}

      <WhyChooseUs onOpenValuationModal={onOpenValuationModal} />

      <ValuationCTA onOpenValuationModal={onOpenValuationModal} />

      <Testimonials />
    </>
  );
}