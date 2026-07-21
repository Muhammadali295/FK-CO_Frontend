import React from 'react';
import { CheckCircle2, Building2, Shield, ArrowRight, TrendingUp, Users, FileCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandlordSection({ onOpenValuationModal }) {
  const landlordBullets = [
    { title: 'Maximise Rental Income', desc: 'Optimized pricing strategy based on live Birmingham rental yield dynamics.' },
    { title: 'Find Reliable Tenants', desc: 'Rigorous 5-point background checks, employer verification, and open banking checks.' },
    { title: 'Stay 100% Compliant', desc: 'Full adherence to UK Renters’ Rights, EPC requirements, Gas Safety, and HMO regulations.' },
    { title: 'Reduce Voids and Stress', desc: 'Proactive renewal management ensuring an average tenant duration of 2.8 years.' },
    { title: 'Property Managed Like Our Own', desc: 'Direct oversight by active portfolio landlords who understand maintenance costs.' }
  ];

  return (
    <section id="landlord" className="py-28 relative overflow-hidden bg-[#071B35] border-y border-[#D4A44A]/20">
      
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4A44A]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Card Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#D4A44A]/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Landlord Property Management"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-transparent" />

              {/* Floating Stat Overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-5 rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gold-bg flex items-center justify-center shrink-0 shadow-lg">
                    <Building2 className="w-6 h-6 text-[#071B35]" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif-luxury font-bold text-lg">Active Portfolio Owners</h4>
                    <p className="text-slate-300 text-xs font-light">Managing over £85M in residential assets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Pill */}
            <div className="absolute -top-6 -right-6 glass-panel py-3 px-5 rounded-2xl border border-[#D4A44A]/40 shadow-xl hidden sm:flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#D4A44A]" />
              <span className="text-xs font-bold text-white">99.4% Rent Collection Rate</span>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Bullets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A44A]/10 border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-4">
                <Shield className="w-3.5 h-3.5" />
                By Landlords, For Landlords
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Landlord to <span className="gold-text">Landlord</span>
              </h2>
            </div>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              We own and manage our own property portfolio, giving us first-hand experience of the challenges landlords face daily in the West Midlands market.
            </p>

            {/* Bullet Points List */}
            <div className="space-y-4 pt-2">
              {landlordBullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-4 p-3.5 rounded-2xl glass-panel-light border border-white/5 hover:border-[#D4A44A]/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#D4A44A]/20 border border-[#D4A44A]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A44A]" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold">{bullet.title}</h4>
                    <p className="text-slate-300 text-xs font-light mt-0.5">{bullet.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenValuationModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold text-sm shadow-xl shadow-[#D4A44A]/20 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Request Landlord Pack</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Free initial lettings consultation
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
