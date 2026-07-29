import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertySearch from '../components/PropertySearch';
import FeaturedProperties from '../components/FeaturedProperties';
import WhyChooseUs from '../components/WhyChooseUs';
import LandlordSection from '../components/LandlordSection';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import ValuationCTA from '../components/ValuationCTA';

import { PROPERTIES_DATA } from '../data/properties';

export default function Home() {
  const { onOpenValuationModal, onSelectProperty } = useOutletContext();
  // Property Filter State
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

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((item) => {
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
  }, [filterState]);

  const isFilterActive = Object.values(filterState).some((val) => val !== '');

  return (
    <>
      {/* Hero Section */}
      <Hero
        onOpenValuationModal={onOpenValuationModal}
        onExploreClick={() => {
          const el = document.getElementById('properties');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Property Search Filter Component */}
      <PropertySearch
        filterState={filterState}
        setFilterState={setFilterState}
        onResetFilters={handleResetFilters}
      />

      {/* Featured Properties Grid */}
      <FeaturedProperties
        properties={filteredProperties}
        onSelectProperty={onSelectProperty}
        filterActive={isFilterActive}
      />

      {/* Why Choose Us */}
      <WhyChooseUs onOpenValuationModal={onOpenValuationModal} />

      {/* Landlord to Landlord Section */}
      <LandlordSection onOpenValuationModal={onOpenValuationModal} />

      {/* Key Statistics Bar */}
      <StatsSection />

      {/* Client Testimonials Slider */}
      <Testimonials />

      {/* Valuation Call to Action */}
      <ValuationCTA onOpenValuationModal={onOpenValuationModal} />
    </>
  );
}
