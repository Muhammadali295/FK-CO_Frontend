import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { getAmenityDetails } from '../../data/amenityIcons';

export default function PropertyFeatures({ property }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-[#D4A44A]" />
          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
            Property <span className="gold-text">Features</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {property.amenities.map((key, index) => {
            const { label, icon: Icon } = getAmenityDetails(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4A44A]/40 hover:bg-[#D4A44A]/5 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-[#D4A44A]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-200">{label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {property.features?.length > 0 && (
        <div className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10">
          <h3 className="font-serif-luxury text-lg font-bold text-white mb-4">
            Key Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm text-slate-300 glass-panel-light p-3.5 rounded-xl border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4A44A] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
