// src/components/ValuationModal.jsx
import React, { useState } from 'react';
import { X, Award, CheckCircle2, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../utils/api';

export default function ValuationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    postcode: '',
    address: '',
    propertyType: 'Detached House',
    bedrooms: '4',
    service: 'Selling',
    timeline: 'As soon as possible',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      submitToBackend(); // Submit to Express server on Step 3
    }
  };

  // --- BACKEND API SUBMISSION ---
  const submitToBackend = async () => {
    setLoading(true);
    setErrorMsg('');

    // Map form service to backend intent ('sell', 'let', 'buy', 'rent')
    let intentCategory = 'sell';
    if (formData.service.toLowerCase().includes('let')) intentCategory = 'let';

    // Combine notes and extra details into message string
    const fullMessage = `Service: ${formData.service} | Timeline: ${formData.timeline} | Type: ${formData.propertyType} (${formData.bedrooms} Beds) | Postcode: ${formData.postcode} | Notes: ${formData.notes || 'None'}`;

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          intent: intentCategory,
          lead_type: 'valuation', // Identifies lead in Admin Dashboard
          property_address: `${formData.address}, ${formData.postcode}`,
          message: fullMessage,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || 'Failed to submit valuation request.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server connection failed. Ensure Node.js server is running on port 5000.');
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setErrorMsg('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#071B35] border border-[#D4A44A]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#051329]/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-bg flex items-center justify-center">
                <Award className="w-5 h-5 text-[#071B35]" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Free Property Valuation
                </h3>
                <p className="text-xs text-slate-400 font-light">FK&CO Estate • Birmingham UK</p>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            
            {submitted ? (
              /* Success Screen */
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h4 className="font-serif-luxury text-2xl font-bold text-white">
                  Valuation Booking Requested!
                </h4>

                <p className="text-slate-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="text-[#D4A44A] font-semibold">{formData.fullName}</span>. One of our senior Birmingham valuation directors will review your details and contact you shortly.
                </p>

                <div className="glass-panel p-4 rounded-2xl max-w-sm mx-auto text-xs text-slate-300 space-y-1 text-left">
                  <p><strong>Property:</strong> {formData.address || 'Birmingham Address'}</p>
                  <p><strong>Service:</strong> {formData.service}</p>
                  <p><strong>Reference:</strong> FK-VAL-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetAndClose}
                    className="px-8 py-3 rounded-full gold-bg text-[#071B35] font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#c5a059] transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Multi-step Form */
              <div>
                {/* Progress Indicators */}
                <div className="flex items-center justify-between mb-8 px-4">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        step === s
                          ? 'gold-bg text-[#071B35] shadow-lg'
                          : step > s
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}>
                        {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:inline ${
                        step === s ? 'text-[#D4A44A]' : 'text-slate-400'
                      }`}>
                        {s === 1 ? 'Property' : s === 2 ? 'Requirements' : 'Contact'}
                      </span>
                    </div>
                  ))}
                </div>

                {errorMsg && (
                  <div className="bg-red-500/15 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleNext} className="space-y-6">
                  {/* Step 1: Property Details */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Postcode 
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          required
                          placeholder="e.g. B15, B91, B74"
                          value={formData.postcode}
                          onChange={handleChange}
                          className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Full Property Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="Street address & town"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Property Type
                          </label>
                          <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                          >
                            <option value="Detached House">Detached House</option>
                            <option value="Semi-Detached">Semi-Detached</option>
                            <option value="Apartment / Penthouse">Apartment / Penthouse</option>
                            <option value="Period Manor">Period Manor</option>
                            <option value="Terraced">Terraced</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Bedrooms
                          </label>
                          <select
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                          >
                            <option value="1">1 Bed</option>
                            <option value="2">2 Beds</option>
                            <option value="3">3 Beds</option>
                            <option value="4">4 Beds</option>
                            <option value="5+">5+ Beds</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Intent & Timeline */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                          What is your primary intent?
                        </label>
                        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3">
                          {['Selling', 'Letting / Lettings', 'Curiosity / Portfolio Check', 'Probate / Legal'].map((svc) => (
                            <button
                              type="button"
                              key={svc}
                              onClick={() => setFormData({ ...formData, service: svc })}
                              className={`p-3.5 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer ${
                                formData.service === svc
                                  ? 'gold-bg text-[#071B35] border-[#D4A44A]'
                                  : 'glass-panel text-slate-300 border-white/10 hover:border-white/30'
                              }`}
                            >
                              {svc}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estimated Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                        >
                          <option value="As soon as possible">As soon as possible</option>
                          <option value="Within 1-3 months">Within 1-3 months</option>
                          <option value="Within 3-6 months">Within 3-6 months</option>
                          <option value="Just researching market">Just researching market</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Lord / Lady / Mr / Mrs Name"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="07123 456789"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="notes"
                          rows="2"
                          placeholder="Any specific features or extensions to note..."
                          value={formData.notes}
                          onChange={handleChange}
                          className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                    ) : <div />}

                    <button
                      type="submit"
                      disabled={loading}
                      className="gold-bg gold-bg-hover text-[#071B35] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4A44A]/20 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>{step === 3 ? 'Confirm Booking' : 'Continue'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}