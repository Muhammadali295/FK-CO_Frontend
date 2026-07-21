import React from 'react';
import { Bed, Bath, Maximize, MapPin, Eye, Tag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedProperties({ properties, onSelectProperty, filterActive }) {
  return (
    <section id="properties" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A44A]/10 border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Curated Portfolio
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured <span className="gold-text">Properties</span>
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-xl font-light">
              Explore our hand-picked selection of luxury residences, penthouses, and period manors across Birmingham & West Midlands.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium block">
              Showing <span className="text-[#D4A44A] font-bold">{properties.length}</span> Premium Listings
            </span>
            {filterActive && (
              <span className="inline-block mt-1 text-[11px] text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Filtered Results
              </span>
            )}
          </div>
        </div>

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-xl mx-auto my-8">
            <Tag className="w-12 h-12 text-[#D4A44A] mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-serif-luxury font-bold text-white mb-2">No Matching Properties Found</h3>
            <p className="text-slate-400 text-sm mb-6">
              We couldn't find properties matching your exact criteria. Try adjusting your search filters or price range.
            </p>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B35] via-transparent to-black/30" />

                {/* Status & Tag Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full gold-bg text-[#071B35] text-xs font-bold uppercase tracking-wider shadow-lg">
                    {property.status}
                  </span>
                  {property.tag && (
                    <span className="px-3 py-1 rounded-full bg-[#051329]/80 backdrop-blur-md text-slate-200 border border-white/20 text-xs font-medium">
                      {property.tag}
                    </span>
                  )}
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-2xl font-serif-luxury font-bold text-white drop-shadow-md">
                    {property.priceFormatted}
                  </span>
                  <span className="text-xs bg-black/50 backdrop-blur-md text-slate-300 px-2.5 py-1 rounded-lg border border-white/10">
                    EPC: {property.epcRating}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#D4A44A] mb-2 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{property.location}</span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D4A44A] transition-colors mb-2">
                    {property.title}
                  </h3>

                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed font-light mb-6">
                    {property.description}
                  </p>
                </div>

                {/* Specs Row */}
                <div>
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-slate-300 text-xs mb-6">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#D4A44A]" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#D4A44A]" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-[#D4A44A]" />
                      <span>{property.areaSqFt} sq ft</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => onSelectProperty(property)}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#D4A44A] hover:text-[#071B35] border border-white/10 hover:border-[#D4A44A] text-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span>View Details</span>
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
