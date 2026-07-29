import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Send, Phone, CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
];

export default function ViewingEnquiryForm({ propertyTitle, agent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitType, setSubmitType] = useState('viewing');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    setSubmitType(type);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
      className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#D4A44A]/30"
    >
      <div className="mb-6">
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
          Book a <span className="gold-text">Viewing</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-light">
          Arrange a private viewing of <span className="text-[#D4A44A]">{propertyTitle}</span> with{' '}
          {agent.name}, {agent.role}.
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
            {agent.name} will contact you within 2 business hours to confirm your appointment.
          </p>
        </motion.div>
      ) : (
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4A44A]" />
                Full Name
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
                Email
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
              Phone Number
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
              type="submit"
              onClick={(e) => handleSubmit(e, 'viewing')}
              className="flex-1 py-3.5 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4A44A]/20"
            >
              <Send className="w-4 h-4" />
              Book Viewing
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'callback')}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4A44A]/40 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-[#D4A44A]" />
              Request Callback
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
