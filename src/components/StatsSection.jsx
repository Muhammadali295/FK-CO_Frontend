import React from 'react';
import { motion } from 'framer-motion';
import { STATS_DATA } from '../data/properties';
import { Award, Users, Calendar, ThumbsUp } from 'lucide-react';

export default function StatsSection() {
  const getStatIcon = (index) => {
    switch (index) {
      case 0: return <Award className="w-8 h-8 text-[#D4A44A]" />;
      case 1: return <Users className="w-8 h-8 text-[#D4A44A]" />;
      case 2: return <Calendar className="w-8 h-8 text-[#D4A44A]" />;
      case 3: return <ThumbsUp className="w-8 h-8 text-[#D4A44A]" />;
      default: return <Award className="w-8 h-8 text-[#D4A44A]" />;
    }
  };

  return (
    <section className="py-20 relative bg-[#051329]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glassmorphic Container Grid */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#D4A44A]/30 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#D4A44A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STATS_DATA.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl glass-panel-light border border-white/5 hover:border-[#D4A44A]/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#071B35] border border-[#D4A44A]/30 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#D4A44A]/10">
                  {getStatIcon(index)}
                </div>

                <h3 className="font-serif-luxury text-4xl sm:text-5xl font-extrabold gold-text tracking-tight mb-2">
                  {stat.value}
                </h3>

                <p className="text-white font-bold text-base mb-1">
                  {stat.label}
                </p>

                <p className="text-slate-400 text-xs font-light">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
