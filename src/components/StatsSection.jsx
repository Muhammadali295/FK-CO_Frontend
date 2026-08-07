// src/components/StatsSection.jsx
import React from 'react';
import { STATS_DATA } from '../data/properties';
import { Award, Users, Calendar, ThumbsUp } from 'lucide-react';

export default function StatsSection() {
  const getStatIcon = (index) => {
    switch (index) {
      case 0: return <Award className="w-6 h-6 text-[#D4A44A]" />;
      case 1: return <Users className="w-6 h-6 text-[#D4A44A]" />;
      case 2: return <Calendar className="w-6 h-6 text-[#D4A44A]" />;
      case 3: return <ThumbsUp className="w-6 h-6 text-[#D4A44A]" />;
      default: return <Award className="w-6 h-6 text-[#D4A44A]" />;
    }
  };

  return (
    <div className="pt-8 border-t border-white/10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS_DATA.map((stat, index) => (
          <div
            key={index}
            className="p-4 sm:p-5 rounded-2xl bg-[#051329]/60 border border-white/5 hover:border-[#D4A44A]/30 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#071B35] border border-[#D4A44A]/30 flex items-center justify-center mx-auto mb-3 shadow-md shadow-[#D4A44A]/10">
              {getStatIcon(index)}
            </div>

            <h4 className="font-serif-luxury text-2xl sm:text-4xl font-extrabold gold-text tracking-tight mb-1">
              {stat.value}
            </h4>

            <p className="text-white font-bold text-xs sm:text-sm mb-1">
              {stat.label}
            </p>

            <p className="text-slate-400 text-[11px] font-light leading-tight">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}