import React from 'react';
import { Award, ArrowRight, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ValuationCTA({ onOpenValuationModal }) {
  return (
    <section id="valuation" className="py-24 relative overflow-hidden bg-[#051329]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glowing Banner Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-16 border border-[#D4A44A]/50 shadow-2xl bg-gradient-to-r from-[#071B35] via-[#0D2548] to-[#071B35] text-center"
        >
          {/* Background Decorative Pattern & Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4A44A]/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-bg text-[#071B35] text-xs font-extrabold uppercase tracking-widest shadow-lg">
              <Award className="w-4 h-4" />
              Instant & No-Obligation Service
            </div>

            <h2 className="font-serif-luxury text-[26px] min-[375px]:text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Book Your Free Property <span className="gold-text">Valuation Today</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Discover the true market value of your property with an in-depth valuation from Birmingham's leading luxury property specialists.
            </p>

            {/* Quick Benefits Pills */}
            <div className="flex flex-wrap items-center justify-center gap-6 py-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4A44A]" /> Takes under 60 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D4A44A]" /> Local Birmingham experts
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4A44A]" /> 100% Free & Confidential
              </span>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenValuationModal}
                className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 rounded-full gold-bg gold-bg-hover text-[#071B35] font-extrabold text-sm sm:text-base tracking-wide shadow-2xl shadow-[#D4A44A]/30 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Schedule Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
