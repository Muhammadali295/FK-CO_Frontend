// src/components/ViewingEnquiryForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Send, Phone, CheckCircle2, User, Mail, MessageSquare, Loader2, AlertCircle } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
];

export default function ViewingEnquiryForm({ propertyTitle, propertyId, agent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitType, setSubmitType] = useState('viewing'); // 'viewing' | 'callback'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- BACKEND API SUBMISSION ---
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    setSubmitType(type);
    setLoading(true);
    setErrorMsg('');

    const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

    // Format full request message with date/time preference
    const formattedMessage = type === 'viewing'
      ? `[Private Viewing Request] Preferred Date: ${formData.date || 'Not specified'}, Time: ${formData.time || 'Not specified'}. Notes: ${formData.message || 'None'}`
      : `[Callback Request] Preferred Date: ${formData.date || 'ASAP'}, Time: ${formData.time || 'ASAP'}. Notes: ${formData.message || 'None'}`;

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
          intent: 'buy',                        // 'buy', 'rent', or 'let'
          lead_type: 'property_enquiry',       // Identifies as Private Viewing / Callback
          property_id: propertyId || null,     // Connects lead to specific property
          property_address: propertyTitle || 'Birmingham Property',
          message: formattedMessage,
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || 'Failed to submit enquiry request.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Server connection failed. Ensure Node.js server is running on port 5000.');
    }
  };

  const inputClass =
    'w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4A44A] transition-colors';

  const today = new Date().toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="book-viewing"
      className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#D4A44A]/30 font-sans"
    >
      <div className="mb-6">
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
          Book a <span className="gold-text">Viewing</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-light">
          Arrange a private viewing of <span className="text-[#D4A44A] font-medium">{propertyTitle}</span> with{' '}
          {agent?.name || 'our senior luxury agent'}{agent?.role ? `, ${agent.role}` : ''}.
        </p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            {submitType === 'viewing' ? 'Viewing Request Received!' : 'Callback Request Received!'}
          </h3>
          <p className="text-sm text-slate-400">
            {agent?.name || 'Our estate director'} will contact you within 2 business hours to confirm your appointment.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#D4A44A] text-xs underline font-semibold mt-2 inline-block cursor-pointer hover:text-white transition"
          >
            Submit another enquiry
          </button>
        </motion.div>
      ) : (
        <form className="space-y-4">
          {errorMsg && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4A44A]" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4A44A]" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4A44A]" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="07XXX XXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4A44A]" />
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4A44A]" />
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#D4A44A]" />
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Any specific requirements or questions..."
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'viewing')}
              className="flex-1 py-3.5 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4A44A]/20 disabled:opacity-50"
            >
              {loading && submitType === 'viewing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Book Viewing</span>
                </>
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e, 'callback')}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4A44A]/40 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
            >
              {loading && submitType === 'callback' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Requesting...</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 text-[#D4A44A]" />
                  <span>Request Callback</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}