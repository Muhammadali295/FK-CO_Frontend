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
    <section id="landlord" className="py-28 relative overflow-hidden bg-[#071B35] border-y border-[#D4A44A]/20 mb-6.5">

      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4A44A]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto space-y-6 text-center"
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

          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-4xl mx-auto">
            We own and manage our own property portfolio, giving us first-hand
            experience of the challenges landlords face daily in the West Midlands
            market.
          </p>

          {/* Bullet Points List */}
          <div className="space-y-4 pt-2 max-w-4xl mx-auto text-left">
            {landlordBullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3.5 rounded-2xl glass-panel-light border border-white/5 hover:border-[#D4A44A]/30 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#D4A44A]/20 border border-[#D4A44A]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4A44A]" />
                </div>

                <div>
                  <h4 className="text-white text-sm font-bold">
                    {bullet.title}
                  </h4>
                  <p className="text-slate-300 text-xs font-light mt-0.5">
                    {bullet.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
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

    </section>
  );
}
