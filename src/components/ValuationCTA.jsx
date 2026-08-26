// src/components/ValuationCTA.jsx
import React, { useState } from 'react';
import { Award, ArrowRight, ShieldCheck, Clock, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../utils/api';

export default function ValuationCTA({ onOpenValuationModal, intent = 'sell' }) {
  // Local state for inline valuation submission
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    property_address: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          intent: intent || 'sell',      // 'sell', 'let', 'buy', or 'rent'
          lead_type: 'valuation',        // Crucial for Admin Dashboard filtering
          property_address: formData.property_address,
          message: 'Requested via Valuation CTA Section',
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
        setFormData({ full_name: '', email: '', phone: '', property_address: '' });
      } else {
        setErrorMsg(result.error || 'Failed to submit valuation request.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server connection failed. Ensure your Node.js server is running on port 5000.');
    }
  };

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
              Discover the true market value of your property with an in-depth valuation from Birmingham's leading property specialists.
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

            {/* Action Area: Trigger Modal OR Render Embedded Form */}
            <div className="pt-4">
              {onOpenValuationModal ? (
                /* Modal Trigger Button */
                <button
                  onClick={onOpenValuationModal}
                  className="w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 rounded-full gold-bg gold-bg-hover text-[#071B35] font-extrabold text-sm sm:text-base tracking-wide shadow-2xl shadow-[#D4A44A]/30 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer group"
                >
                  <span>Schedule Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : submitted ? (
                /* Success View after Inline Submission */
                <div className="bg-[#051329]/80 border border-[#D4A44A]/40 p-6 rounded-2xl max-w-xl mx-auto space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#D4A44A] mx-auto" />
                  <h3 className="text-white font-serif text-xl font-bold">Valuation Request Received</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Thank you! Our senior property experts are analyzing your address details and will contact you shortly with an accurate appraisal.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#D4A44A] text-xs underline font-semibold cursor-pointer pt-2 inline-block hover:text-white transition"
                  >
                    Submit another valuation request
                  </button>
                </div>
              ) : (
                /* Inline Valuation Form */
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
                  {errorMsg && (
                    <div className="bg-red-500/15 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className="bg-[#051329]/90 border border-white/10 text-white p-3.5 rounded-xl text-sm outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                    />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className="bg-[#051329]/90 border border-white/10 text-white p-3.5 rounded-xl text-sm outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="bg-[#051329]/90 border border-white/10 text-white p-3.5 rounded-xl text-sm outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                    />
                    <input
                      required
                      type="text"
                      name="property_address"
                      value={formData.property_address}
                      onChange={handleChange}
                      placeholder="Property Address to Value *"
                      className="bg-[#051329]/90 border border-white/10 text-white p-3.5 rounded-xl text-sm outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-extrabold text-sm tracking-wide shadow-2xl shadow-[#D4A44A]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Valuation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}