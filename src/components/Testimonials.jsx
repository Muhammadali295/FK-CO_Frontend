import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/properties';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-28 relative overflow-hidden bg-[#071B35]/90 border-t border-[#D4A44A]/20">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4A44A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Client Testimonials
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            What Our <span className="gold-text">Clients Say</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base font-light">
            Read firsthand experiences from homeowners, buyers, and portfolio landlords in Birmingham.
          </p>
        </div>

        {/* Carousel Card Box */}
        <div className="relative max-w-4xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 sm:p-12 rounded-3xl border border-[#D4A44A]/30 shadow-2xl relative"
            >
              <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-[#D4A44A]/15 absolute top-4 right-4 sm:top-6 sm:right-8 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4A44A] text-[#D4A44A]" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <p className="text-slate-200 text-lg sm:text-xl font-serif-luxury italic leading-relaxed mb-8">
                "{current.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-3 sm:gap-4 pt-6 border-t border-white/10">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#D4A44A] shrink-0"
                />
                <div>
                  <h4 className="font-serif-luxury font-bold text-white text-lg">
                    {current.name}
                  </h4>
                  <p className="text-xs text-[#D4A44A] font-semibold">
                    {current.role} • {current.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 gold-bg' : 'w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full glass-panel hover:bg-[#D4A44A] text-slate-300 hover:text-[#071B35] transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full glass-panel hover:bg-[#D4A44A] text-slate-300 hover:text-[#071B35] transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
