import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertySearch from './components/PropertySearch';
import FeaturedProperties from './components/FeaturedProperties';
import PropertyModal from './components/PropertyModal';
import WhyChooseUs from './components/WhyChooseUs';
import LandlordSection from './components/LandlordSection';
import StatsSection from './components/StatsSection';
import Testimonials from './components/Testimonials';
import ValuationCTA from './components/ValuationCTA';
import ValuationModal from './components/ValuationModal';
import Footer from './components/Footer';

import { PROPERTIES_DATA } from './data/properties';

export default function App() {
  const [valuationModalOpen, setValuationModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
    <div className="min-h-screen bg-[#051329] text-slate-100 font-sans-luxury selection:bg-[#D4A44A] selection:text-[#071B35] relative">
      
      {/* Navigation Header */}
      <Navbar onOpenValuationModal={() => setValuationModalOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenValuationModal={() => setValuationModalOpen(true)}
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
          onSelectProperty={(property) => setSelectedProperty(property)}
          filterActive={isFilterActive}
        />

        {/* Why Choose Us */}
        <WhyChooseUs onOpenValuationModal={() => setValuationModalOpen(true)} />

        {/* Landlord to Landlord Section */}
        <LandlordSection onOpenValuationModal={() => setValuationModalOpen(true)} />

        {/* Key Statistics Bar */}
        <StatsSection />

        {/* Client Testimonials Slider */}
        <Testimonials />

        {/* Valuation Call to Action */}
        <ValuationCTA onOpenValuationModal={() => setValuationModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenValuationModal={() => setValuationModalOpen(true)} />

      {/* Property Details Dialog Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenValuationModal={() => {
            setSelectedProperty(null);
            setValuationModalOpen(true);
          }}
        />
      )}

      {/* Book Valuation Multi-Step Modal */}
      <ValuationModal
        isOpen={valuationModalOpen}
        onClose={() => setValuationModalOpen(false)}
      />

    </div>
  );
}
