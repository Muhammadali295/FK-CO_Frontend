import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PropertyModal from './PropertyModal';
import ValuationModal from './ValuationModal';

export default function Layout() {
  const [valuationModalOpen, setValuationModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const outletContext = {
    onOpenValuationModal: () => setValuationModalOpen(true),
    onSelectProperty: (property) => setSelectedProperty(property),
  };

  return (
    <div className="min-h-screen bg-[#051329] text-slate-100 font-sans-luxury selection:bg-[#D4A44A] selection:text-[#071B35] relative overflow-x-hidden">
      <Navbar onOpenValuationModal={() => setValuationModalOpen(true)} />

      <main>
        <Outlet context={outletContext} />
      </main>

      <Footer onOpenValuationModal={() => setValuationModalOpen(true)} />

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

      <ValuationModal
        isOpen={valuationModalOpen}
        onClose={() => setValuationModalOpen(false)}
      />
    </div>
  );
}
