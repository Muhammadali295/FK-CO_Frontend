import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Home } from 'lucide-react';

export default function BuyHero() {
  return (
    <section className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury property for sale"
          className="w-full h-full object-cover scale-105 filter brightness-75"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051329]/95 via-[#071B35]/85 to-[#051329]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-[#051329]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#D4A44A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-[#D4A44A]/40 mb-6"
        >
          <Home className="w-3.5 h-3.5 text-[#D4A44A]" />
          <span className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium text-[#F3E7C4]">
            Properties For Sale
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4A44A]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif-luxury text-[32px] min-[375px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl mx-auto"
        >
          Find Your Dream <span className="gold-text italic font-normal">Home.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Discover exceptional properties carefully selected for modern living.
        </motion.p>
      </div>
    </section>
  );
}
