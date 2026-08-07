// src/components/WhyChooseUs.jsx
import React, { useState } from 'react';
import { Globe, Camera, UserCheck, Compass, ShieldCheck, Sparkles, CheckCircle2, Send, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE_US_DATA } from '../data/properties';
import { supabase } from '../supabaseClient';
import StatsSection from './StatsSection';

export default function WhyChooseUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const getIcon = (name) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-[#D4A44A]" />;
      case 'Camera': return <Camera className="w-5 h-5 text-[#D4A44A]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#D4A44A]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#D4A44A]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#D4A44A]" />;
      default: return <Sparkles className="w-5 h-5 text-[#D4A44A]" />;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 relative overflow-hidden bg-[#051329]/90">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The FK&CO Difference
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Why High-Net-Worth Clients <span className="gold-text">Choose FK&CO</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            We combine high-street personal relationship management with modern digital marketing to maximize property values across Birmingham.
          </p>
        </div>

        {/* SINGLE BIG CONTAINER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 sm:p-10 rounded-3xl relative border border-[#D4A44A]/30 bg-gradient-to-br from-[#071B35]/95 via-[#0a2345]/90 to-[#071B35]/95 shadow-2xl"
        >
          {/* Card Header - Only About Us */}
          <div className="pb-6 border-b border-white/10 mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              About Us
            </h3>
          </div>

          {/* Flex Column on Mobile, Grid on Desktop */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* 1. Features (Order 1 on Mobile & Desktop) */}
            <div className="order-1 lg:order-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
              {WHY_CHOOSE_US_DATA.map((item) => (
                <div 
                  key={item.id} 
                  className="p-5 rounded-2xl bg-[#051329]/60 border border-white/5 hover:border-[#D4A44A]/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#071B35] border border-[#D4A44A]/30 flex items-center justify-center mb-3 group-hover:border-[#D4A44A] transition-all">
                    {getIcon(item.iconName)}
                  </div>
                  <h4 className="font-serif-luxury text-base font-bold text-white group-hover:text-[#D4A44A] transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-300 text-xs font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 2. Stats Section (Order 2 on Mobile, Order 3 on Desktop) */}
            <div className="order-2 lg:order-3 lg:col-span-12 w-full">
              <StatsSection />
            </div>

            {/* 3. Integrated Contact Form (Order 3 on Mobile [Bottom], Order 2 on Desktop [Right]) */}
            <div id="contact" className="order-3 lg:order-2 lg:col-span-5 scroll-mt-28 w-full">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#051329]/80 border border-[#D4A44A]/30 shadow-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gold-bg text-[#071B35] text-[10px] font-extrabold uppercase tracking-widest mb-3">
                  <Mail className="w-3 h-3" /> Get In Touch
                </div>
                <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-2">
                  Contact FK&CO Estate
                </h4>
                <p className="text-slate-300 text-xs font-light leading-relaxed mb-5">
                  Have a query regarding property advisory or investments? Leave your details and our senior team will get back to you.
                </p>

                {submitted ? (
                  <div className="bg-[#D4A44A]/15 border border-[#D4A44A]/40 p-5 rounded-xl text-center my-2">
                    <CheckCircle2 className="w-8 h-8 text-[#D4A44A] mx-auto mb-2" />
                    <h5 className="text-white font-semibold text-sm">Message Sent!</h5>
                    <p className="text-slate-300 text-xs mt-1">We will contact you shortly.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-3 text-[11px] text-[#D4A44A] underline font-medium hover:text-white"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    {error && (
                      <p className="text-red-400 text-xs bg-red-500/10 p-2 rounded border border-red-500/20">
                        {error}
                      </p>
                    )}

                    <div className="relative">
                      <User className="w-4 h-4 text-[#D4A44A]/70 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        className="w-full bg-[#071B35]/80 border border-white/10 text-white pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D4A44A]/70 absolute left-3 top-3" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-[#071B35]/80 border border-white/10 text-white pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#D4A44A]/70 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number (Optional)"
                        className="w-full bg-[#071B35]/80 border border-white/10 text-white pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-[#D4A44A]/70 absolute left-3 top-3" />
                      <textarea
                        name="message"
                        required
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we assist you today?"
                        className="w-full bg-[#071B35]/80 border border-white/10 text-white pl-9 pr-3 py-2.5 rounded-xl text-xs outline-none focus:border-[#D4A44A] transition placeholder:text-slate-500 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl gold-bg gold-bg-hover text-[#071B35] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4A44A]/20 cursor-pointer flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}