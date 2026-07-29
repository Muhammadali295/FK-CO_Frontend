import React from 'react';
import { Globe, Camera, UserCheck, Compass, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US_DATA } from '../data/properties';

export default function WhyChooseUs({ onOpenValuationModal }) {
  const getIcon = (name) => {
    switch (name) {
      case 'Globe': return <Globe className="w-7 h-7 text-[#D4A44A]" />;
      case 'Camera': return <Camera className="w-7 h-7 text-[#D4A44A]" />;
      case 'UserCheck': return <UserCheck className="w-7 h-7 text-[#D4A44A]" />;
      case 'Compass': return <Compass className="w-7 h-7 text-[#D4A44A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-[#D4A44A]" />;
      default: return <Sparkles className="w-7 h-7 text-[#D4A44A]" />;
    }
  };

  return (
    <section id="why-us" className="py-28 relative overflow-hidden bg-[#051329]/90">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The FK&CO Difference
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Why High-Net-Worth Clients <span className="gold-text">Choose FK&CO</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base font-light leading-relaxed">
            We combine high-street personal relationship management with modern digital marketing to maximize property values across Birmingham.
          </p>
        </div>

        {/* 5 Feature Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 sm:p-8 rounded-3xl relative group flex flex-col justify-between ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#071B35] border border-[#D4A44A]/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#D4A44A] transition-all duration-300 shadow-lg shadow-[#D4A44A]/10">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-white mb-3 group-hover:text-[#D4A44A] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D4A44A] font-semibold">
                <span>Guaranteed Standard</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </motion.div>
          ))}

          {/* Bonus Guarantee Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#D4A44A]/40 flex flex-col justify-between bg-gradient-to-br from-[#071B35] to-[#0D2548]"
          >
            <div>
              <div className="inline-block px-3 py-1 rounded-full gold-bg text-[#071B35] text-[10px] font-extrabold uppercase tracking-widest mb-4">
                Bespoke Marketing Guarantee
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3">
                Ready to Sell or Let Your Property?
              </h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">
                Receive an accurate valuation backed by recent land registry sales data and active buyer demand.
              </p>
            </div>

            <button
              onClick={onOpenValuationModal}
              className="w-full py-3.5 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4A44A]/20 cursor-pointer"
            >
              Book Valuation Today
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
