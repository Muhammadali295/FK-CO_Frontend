import React from 'react';
import { Bed, Bath, Maximize, MapPin, Eye, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyCard({ property, viewType = 'grid', onSelect, isSaved, onToggleSave }) {
  const isList = viewType === 'list';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`glass-card rounded-3xl overflow-hidden group flex transition-all duration-500 ${
        isList ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden shrink-0 ${
        isList ? 'h-64 md:h-auto md:w-80' : 'h-64'
      }`}>
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/70 via-transparent to-black/30" />

        {/* Status & Tag Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full gold-bg text-[#071B35] text-xs font-bold uppercase tracking-wider shadow-lg">
            {property.status}
          </span>
          {property.listingStatus && (
            <span className={`px-3 py-1 rounded-full backdrop-blur-md text-xs font-semibold border ${
              property.listingStatus === 'Available'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : property.listingStatus === 'Under Offer'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
            }`}>
              {property.listingStatus}
            </span>
          )}
          {property.tag && (
            <span className="px-3 py-1 rounded-full bg-[#051329]/80 backdrop-blur-md text-slate-200 border border-white/20 text-xs font-medium">
              {property.tag}
            </span>
          )}
        </div>

        {/* Save/Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(property.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer ${
            isSaved 
              ? 'bg-rose-500/20 border-rose-500 text-rose-500 scale-110' 
              : 'bg-black/40 border-white/10 text-white hover:text-rose-400 hover:bg-black/60'
          }`}
          aria-label={isSaved ? "Saved Property" : "Save Property"}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* EPC tag for List view on desktop (rendered on bottom corner of image) */}
        {isList && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-white/10">
            EPC: {property.epcRating || 'B'}
          </div>
        )}
      </div>

      {/* Property Details Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-serif-luxury font-bold text-white">
              {property.priceFormatted}
            </span>
            {!isList && (
              <span className="text-[10px] bg-black/40 backdrop-blur-md text-slate-400 px-2 py-0.5 rounded border border-white/5">
                EPC: {property.epcRating || 'B'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#D4A44A] font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.location}</span>
          </div>

          <h3 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#D4A44A] transition-colors leading-tight">
            {property.title}
          </h3>

          <p className="text-slate-300 text-xs font-light leading-relaxed line-clamp-2 md:line-clamp-3">
            {property.description}
          </p>
        </div>

        {/* Specs & CTA Buttons */}
        <div className={`mt-6 space-y-4 ${isList ? 'md:mt-4' : ''}`}>
          
          {/* Specifications Row */}
          <div className="grid grid-cols-3 gap-1 py-3 border-y border-white/10 text-slate-300 text-[10px] min-[375px]:text-xs">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-[#D4A44A] shrink-0" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-[#D4A44A] shrink-0" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-3.5 h-3.5 text-[#D4A44A] shrink-0" />
              <span className="truncate">{property.areaSqFt} sq ft</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelect(property)}
              className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-[#D4A44A] hover:text-[#071B35] border border-white/10 hover:border-[#D4A44A] text-slate-200 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group/btn"
            >
              <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>View Details</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property.id);
              }}
              className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                isSaved
                  ? 'bg-rose-500/20 border border-rose-500/50 text-rose-400 hover:bg-rose-500/30'
                  : 'bg-white/5 hover:gold-bg hover:text-[#071B35] border border-white/10 hover:border-[#D4A44A] text-slate-200'
              }`}
              aria-label={isSaved ? 'Remove from saved' : 'Save property'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
