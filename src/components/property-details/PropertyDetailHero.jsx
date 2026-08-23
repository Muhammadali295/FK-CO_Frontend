import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Car, MapPin, Home, ChevronLeft, Sparkles } from 'lucide-react';

const STATUS_STYLES = {
  'Available for Sale': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'To Let': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Available: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'Under Offer': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  'Let Agreed': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  Sold: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
};

export default function PropertyDetailHero({ property }) {
  const statusClass = STATUS_STYLES[property.displayStatus] || STATUS_STYLES.Available;

  return (
    <section className="relative pt-28 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={property.image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-105 filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#051329]/80 via-[#071B35]/90 to-[#051329]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to={property.purpose === 'Buy' ? '/buy' : property.purpose === 'Let' ? '/let' : property.purpose === 'Rent' ? '/rent' : '/'}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#D4A44A] transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {property.purpose === 'Buy' ? 'Buy Properties' : property.purpose === 'Let' ? 'Let Properties' : property.purpose === 'Rent' ? 'Rent Properties' : 'Properties'}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A44A]/10 border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              {property.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}>
              {property.displayStatus}
            </span>
            {property.tag && (
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs border border-white/20">
                {property.tag}
              </span>
            )}
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
            {property.title}
          </h1>

          <p className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold gold-text">
            {property.priceFormatted}
          </p>

          <div className="flex items-start gap-2 text-slate-300">
            <MapPin className="w-5 h-5 text-[#D4A44A] shrink-0 mt-0.5" />
            <p className="text-base sm:text-lg font-light">{property.fullAddress}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <span className="flex items-center gap-2 text-slate-200 text-sm">
              <Bed className="w-4 h-4 text-[#D4A44A]" />
              {property.bedrooms} Bedrooms
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2 text-slate-200 text-sm">
              <Bath className="w-4 h-4 text-[#D4A44A]" />
              {property.bathrooms} Bathrooms
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2 text-slate-200 text-sm">
              <Car className="w-4 h-4 text-[#D4A44A]" />
              {property.garages} {property.garages === 1 ? 'Garage' : 'Garages'}
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-2 text-slate-200 text-sm">
              <Home className="w-4 h-4 text-[#D4A44A]" />
              {property.purpose}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
