// src/components/PropertyModal.jsx
import React, { useState } from 'react';
import { X, Bed, Bath, Maximize, MapPin, CheckCircle2, Phone, Mail, Send, Award, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../utils/api';

export default function PropertyModal({ property, onClose, onOpenValuationModal }) {
  const [selectedImg, setSelectedImg] = useState(property?.image);
  const [enquirySent, setEnquirySent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  if (!property) return null;

  // --- BACKEND API SUBMISSION ---
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
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          intent: property.type?.toLowerCase() || 'buy', // 'buy', 'rent', or 'let'
          lead_type: 'property_enquiry',                 // Marks lead as a viewing enquiry
          property_id: property.id || null,               // Links lead to property ID
          property_address: `${property.title} - ${property.location || 'Birmingham'}`,
          message: formData.message || `Requesting a private viewing for ${property.title}`,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setEnquirySent(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setErrorMsg(result.error || 'Failed to submit viewing enquiry.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server connection failed. Ensure your Node.js API is running on port 5000.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#071B35] border border-[#D4A44A]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#051329]/90 shrink-0">
            <div>
              <span className="text-xs font-bold gold-text uppercase tracking-widest block mb-1">
                {property.status} Listing • {property.type}
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                {property.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Body Scrollable */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedImg || property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl text-lg sm:text-xl font-serif-luxury font-bold text-[#D4A44A] border border-[#D4A44A]/30">
                  {property.priceFormatted || `£${Number(property.price).toLocaleString()}`}
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {property.gallery && property.gallery.length > 0 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {property.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(imgUrl)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        selectedImg === imgUrl ? 'border-[#D4A44A] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 glass-panel p-4 rounded-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
                  <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A44A]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Bedrooms</p>
                  <p className="text-xs sm:text-sm font-bold text-white">{property.bedrooms} Beds</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
                  <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A44A]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Bathrooms</p>
                  <p className="text-xs sm:text-sm font-bold text-white">{property.bathrooms} Baths</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A44A]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Internal Area</p>
                  <p className="text-xs sm:text-sm font-bold text-white">{property.areaSqFt} sq ft</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A44A]" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Location</p>
                  <p className="text-xs sm:text-sm font-bold text-white truncate max-w-[80px] sm:max-w-[120px]">{property.location}</p>
                </div>
              </div>
            </div>

            {/* Description & Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-3">About Property</h3>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-4">Key Features & Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features?.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200 glass-panel-light p-3 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A44A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Private Viewing Enquiry Form */}
              <div className="glass-panel p-6 rounded-2xl border border-[#D4A44A]/30">
                <h4 className="font-serif-luxury text-lg font-bold text-white mb-1">Arrange Private Viewing</h4>
                <p className="text-slate-400 text-xs mb-4">Speak directly with our Birmingham property consultants.</p>

                {enquirySent ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="font-bold">Enquiry Received!</p>
                    <p>Our senior agent will contact you within 2 business hours.</p>
                    <button
                      onClick={() => setEnquirySent(false)}
                      className="text-[#D4A44A] underline text-[11px] font-semibold mt-2 inline-block cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {errorMsg && (
                      <div className="bg-red-500/15 border border-red-500/30 text-red-300 p-2.5 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4A44A]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4A44A]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4A44A]"
                    />
                    <textarea
                      rows="3"
                      placeholder="Message (Optional)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#051329]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4A44A] resize-none"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Viewing</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <a href="tel:+441212345678" className="flex items-center gap-1 hover:text-[#D4A44A]">
                    <Phone className="w-3 h-3 text-[#D4A44A]" />
                    0121 234 5678
                  </a>
                  <span className="flex items-center gap-1 text-[#D4A44A]">
                    <ShieldCheck className="w-3 h-3" /> Confidential
                  </span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}