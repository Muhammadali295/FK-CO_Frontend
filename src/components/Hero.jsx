// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-32 overflow-hidden">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury Birmingham Property"
          className="w-full h-full object-cover scale-105 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051329]/95 via-[#071B35]/80 to-[#051329]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-[#051329]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Floating Luxury Circles */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4A44A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-[#D4A44A]/40 mb-8 max-w-full overflow-hidden"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A44A]" />
          <span className="text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-medium text-[#F3E7C4] truncate">
            Birmingham's Real Estate Agency
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A44A] animate-pulse shrink-0" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif-luxury text-[32px] min-[375px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.15] max-w-5xl mx-auto"
        >
          Trusted to Sell. <br />
          <span className="gold-text italic font-normal">Trusted to Let.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
        >
          A modern estate agency built on honesty, local knowledge and exceptional service across Birmingham & the West Midlands.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href="#properties"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#D4A44A]" />
          </a>

          {/* Updated Valuation Link */}
          <a
            href="https://valuation.fkandcoestate.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold text-base shadow-xl shadow-[#D4A44A]/25 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Award className="w-5 h-5" />
            <span>Get Free Instant Valuation In 60 Seconds</span>
          </a>
        </motion.div>

        {/* Floating Quick Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#D4A44A]" />
            </div>
            <div>
              <p className="text-white text-xs font-bold">No Sale, No Fee</p>
              <p className="text-slate-400 text-[11px]">100% Risk Free</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#D4A44A]" />
            </div>
            <div>
              <p className="text-white text-xs font-bold">Local Experts</p>
              <p className="text-slate-400 text-[11px]">Birmingham , West Mids & Solihull</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
              <span className="font-serif-luxury font-bold text-[#D4A44A] text-sm">4K</span>
            </div>
            <div>
              <p className="text-white text-xs font-bold">Bespoke Media</p>
              <p className="text-slate-400 text-[11px]">3D Tours & Drones</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
              <span className="font-serif-luxury font-bold text-[#D4A44A] text-sm">98%</span>
            </div>
            <div>
              <p className="text-white text-xs font-bold">Satisfaction</p>
              <p className="text-slate-400 text-[11px]">Verified Reviews</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}