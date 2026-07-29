import React from 'react';
import { motion } from 'framer-motion';
import {
  PoundSterling,
  Bed,
  Bath,
  Car,
  Maximize,
  Home,
  Tag,
  Calendar,
  Receipt,
  Zap,
} from 'lucide-react';

const OVERVIEW_ITEMS = [
  { key: 'priceFormatted', label: 'Price', icon: PoundSterling, highlight: true },
  { key: 'bedrooms', label: 'Bedrooms', icon: Bed, suffix: ' Beds' },
  { key: 'bathrooms', label: 'Bathrooms', icon: Bath, suffix: ' Baths' },
  { key: 'garages', label: 'Garages', icon: Car, suffix: '' },
  { key: 'areaSqFt', label: 'Property Area', icon: Maximize, suffix: ' sq ft' },
  { key: 'type', label: 'Property Type', icon: Home },
  { key: 'purpose', label: 'Purpose', icon: Tag },
  { key: 'displayStatus', label: 'Status', icon: Tag },
  { key: 'yearBuilt', label: 'Year Built', icon: Calendar },
  { key: 'councilTaxBand', label: 'Council Tax Band', icon: Receipt, prefix: 'Band ' },
  { key: 'epcRating', label: 'EPC Rating', icon: Zap, prefix: 'Rating ' },
];

function formatValue(property, item) {
  const raw = property[item.key];
  if (item.key === 'garages') {
    return `${raw} ${raw === 1 ? 'Garage' : 'Garages'}`;
  }
  return `${item.prefix || ''}${raw}${item.suffix || ''}`;
}

export default function PropertyOverview({ property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#D4A44A]/20"
    >
      <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-6">
        Property <span className="gold-text">Overview</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OVERVIEW_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                item.highlight
                  ? 'bg-[#D4A44A]/10 border-[#D4A44A]/30'
                  : 'bg-white/5 border-white/10 hover:border-[#D4A44A]/30'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#D4A44A]" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className={`text-sm font-bold truncate ${item.highlight ? 'gold-text text-lg' : 'text-white'}`}>
                  {formatValue(property, item)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
