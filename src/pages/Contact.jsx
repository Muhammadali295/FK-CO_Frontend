import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Globe,
  Home,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';
import API_BASE_URL from '../utils/api';

const initialForm = { fullName: '', email: '', phone: '', enquiryType: '', message: '', consent: false };
const enquiryTypes = ['Buying a Property', 'Selling a Property', 'Letting a Property', 'Renting a Property', 'Property Management', 'General Enquiry'];
const faqs = [
  ['How can I contact FK&CO Estate?', 'Call us on 0121 234 5678, email enquiries@fkcoestate.co.uk, or send a message through the form on this page.'],
  ['How do I book a property viewing?', 'Contact our team with the property you are interested in and we will arrange a convenient viewing time.'],
  ['How can I get a free property valuation?', 'Use our valuation form on the Sell page for a free, no-obligation property appraisal.'],
  ['Do you help landlords manage properties?', 'Yes. Our lettings and management services cover tenant sourcing, rent collection, maintenance and compliance.'],
  ['How quickly will I receive a response?', 'We aim to respond to all enquiries within one working day.'],
];
const socialLinks = [
  ['Facebook', Globe],
  ['Instagram', Camera],
  ['LinkedIn', ExternalLink],
  ['WhatsApp', MessageCircle],
];

export default function Contact() {
  const { onOpenValuationModal } = useOutletContext();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState('');

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  const submitForm = async (event) => {
    event.preventDefault();
    
    if (!form.fullName.trim() || !form.email.trim() || !form.enquiryType || !form.message.trim() || !form.consent) {
      setError('Please complete all required fields and give consent to be contacted.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.phone && !/^[+()\d\s-]{7,20}$/.test(form.phone)) {
      setError('Please enter a valid phone number.');
      return;
    }
    
    setError('');
    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('idle');
        setError(result.error || 'Failed to send enquiry. Please try again.');
      }
    } catch (err) {
      setStatus('idle');
      setError('Server connection failed. Ensure your Node.js API is running.');
    }
  };

  return (
    <>
      <section className="relative min-h-[68vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90" alt="FK&CO Estate office" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#051329]/95 via-[#071B35]/85 to-[#071B35]/65" /><div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-[#051329]/75" /></div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/40 text-[#F3E7C4] text-xs font-semibold uppercase tracking-[0.2em]"><Sparkles className="w-4 h-4 text-[#D4A44A]" /> We are here to help</span>
          <h1 className="mt-7 font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">Let's Talk About Your <span className="gold-text italic font-normal">Property</span></h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">Whether you're buying, selling, letting or renting, our team is ready to help.</p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4"><button onClick={onOpenValuationModal} className="px-7 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold inline-flex items-center justify-center gap-2"><Sparkles className="w-5 h-5" /> Get Free Valuation</button><Link to="/buy" className="px-7 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"><Home className="w-5 h-5 text-[#D4A44A]" /> Browse Properties</Link></div>
        </motion.div>
      </section>

      <section className="py-20 bg-[#051329]"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid sm:grid-cols-3 lg:grid-cols- gap-4">{[
        ['Call Us', '0121 234 5678', 'Call Now', Phone, 'tel:+441212345678'],
        ['Email Us', 'enquiries@fkcoestate.co.uk', 'Send Email', Mail, 'mailto:enquiries@fkcoestate.co.uk'],
        
      ].map(([title, detail, action, Icon, href]) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 border border-white/10"><Icon className="w-7 h-7 text-[#D4A44A]" /><h2 className="mt-5 font-serif-luxury text-xl font-bold text-white">{title}</h2><p className="mt-3 min-h-10 text-sm text-slate-300 leading-relaxed">{detail}</p><a href={href} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#D4A44A] hover:text-white transition-colors">{action} <ArrowRight className="w-4 h-4" /></a></motion.div>)}<motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6 border border-white/10"><Clock className="w-7 h-7 text-[#D4A44A]" /><h2 className="mt-5 font-serif-luxury text-xl font-bold text-white">Opening Hours</h2><div className="mt-3 space-y-1 text-sm text-slate-300"><p>Monday - Friday <span className="float-right text-white">9:00 AM - 5:30 PM</span></p><p>Saturday <span className="float-right text-white">9:00 AM - 4:00 PM</span></p><p>Sunday <span className="float-right text-white">Closed</span></p></div></motion.div></div></div></section>

      <section className="py-24 bg-[#071B35]/90 border-y border-[#D4A44A]/15"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start"><div><p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">Send an enquiry</p><h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Start a <span className="gold-text">conversation</span></h2><p className="mt-5 text-slate-300 leading-relaxed">Tell us a little about what you need and a member of our team will be in touch. This form is ready to connect to the FK&CO backend when your endpoint is available.</p><div className="mt-8 space-y-4 text-sm text-slate-300"><p className="flex gap-3"><ShieldIcon /> Clear, professional advice</p><p className="flex gap-3"><ShieldIcon /> No obligation, no pressure</p><p className="flex gap-3"><ShieldIcon /> A response within one working day</p></div></div><div className="glass-panel rounded-3xl p-6 sm:p-9 border border-[#D4A44A]/30"><form onSubmit={submitForm} noValidate>{status === 'success' ? <div className="py-12 text-center"><CheckCircle2 className="w-14 h-14 text-[#D4A44A] mx-auto" /><h3 className="mt-5 font-serif-luxury text-2xl font-bold text-white">Enquiry received</h3><p className="mt-3 text-sm text-slate-300">Thank you. Our team will review your message and respond shortly.</p><button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm text-[#D4A44A] underline">Send another enquiry</button></div> : <><div className="grid sm:grid-cols-2 gap-4"><Field label="Full Name" name="fullName" value={form.fullName} onChange={updateField} required placeholder="Your full name" /><Field label="Email Address" name="email" type="email" value={form.email} onChange={updateField} required placeholder="you@example.com" /><Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={updateField} placeholder="Optional" /><label className="text-sm text-slate-300">Enquiry Type <span className="text-[#D4A44A]">*</span><select required name="enquiryType" value={form.enquiryType} onChange={updateField} className="mt-2 w-full rounded-xl bg-[#051329] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#D4A44A]"><option value="">Select an option</option>{enquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label></div><label className="block mt-4 text-sm text-slate-300">Message <span className="text-[#D4A44A]">*</span><textarea required maxLength={1000} name="message" value={form.message} onChange={updateField} rows="6" placeholder="How can we help?" className="mt-2 w-full resize-y rounded-xl bg-[#051329] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#D4A44A] placeholder:text-slate-500" /><span className="block mt-1 text-right text-xs text-slate-500">{form.message.length}/1000</span></label><label className="mt-3 flex items-start gap-3 text-xs text-slate-400"><input type="checkbox" name="consent" checked={form.consent} onChange={updateField} className="mt-0.5 accent-[#D4A44A]" /> <span>I agree to be contacted regarding my enquiry.</span></label>{error && <p role="alert" className="mt-4 flex items-center gap-2 text-xs text-red-300"><AlertCircle className="w-4 h-4" /> {error}</p>}<button type="submit" disabled={status === 'loading'} className="mt-6 w-full rounded-full gold-bg gold-bg-hover py-4 font-bold text-[#071B35] flex items-center justify-center gap-2 disabled:opacity-60">{status === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending Enquiry...</> : <><Send className="w-5 h-5" /> Send Enquiry</>}</button></>}</form></div></div></section>

      <section className="py-20 bg-[#051329]"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-3xl border border-[#D4A44A]/50 bg-gradient-to-r from-[#071B35] via-[#0D2548] to-[#071B35] p-8 sm:p-14 text-center"><div className="relative"><p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">A considered next step</p><h2 className="mt-4 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">What's Your Property <span className="gold-text">Worth?</span></h2><p className="mt-4 text-slate-300">Get a free, no-obligation property valuation from our experienced team.</p><Link to="/sell#valuation-form" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full gold-bg gold-bg-hover px-7 py-4 font-bold text-[#071B35]"><Sparkles className="w-5 h-5" /> Get Free Valuation</Link></div></div></div></section>

      <section className="py-24 bg-[#051329]"><div className="max-w-3xl mx-auto px-4 sm:px-6"><div className="text-center mb-12"><p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">Need to know more?</p><h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Frequently asked <span className="gold-text">questions</span></h2></div><div className="space-y-3">{faqs.map(([question, answer], index) => <div key={question} className="glass-panel rounded-xl border border-white/10 overflow-hidden"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-5 flex items-center justify-between gap-4 text-left text-white font-semibold"><span>{question}</span><ChevronDown className={`w-5 h-5 text-[#D4A44A] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 pb-5 text-sm text-slate-300 leading-relaxed">{answer}</motion.p>}</div>)}</div></div></section>

      <section className="py-20 bg-[#071B35]/90 border-y border-[#D4A44A]/15"><div className="max-w-4xl mx-auto px-4 text-center"><p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">Stay connected</p><h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Follow <span className="gold-text">Us</span></h2><div className="mt-8 flex flex-wrap justify-center gap-3">{socialLinks.map(([label, Icon]) => <a key={label} href="#footer" aria-label={`${label} placeholder link`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-slate-200 hover:border-[#D4A44A]/50 hover:text-[#D4A44A] transition-colors"><Icon className="w-4 h-4 text-[#D4A44A]" /> {label}</a>)}</div></div></section>

      <section className="py-20 bg-[#051329]"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-3xl border border-[#D4A44A]/50 bg-gradient-to-r from-[#071B35] via-[#0D2548] to-[#071B35] p-8 sm:p-16 text-center shadow-2xl"><div className="relative max-w-3xl mx-auto"><h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Your Property Journey <span className="gold-text">Starts Here.</span></h2><p className="mt-5 text-slate-300 text-base sm:text-lg">Speak with our experienced team today.</p><div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"><button onClick={onOpenValuationModal} className="rounded-full gold-bg gold-bg-hover px-7 py-4 font-bold text-[#071B35]">Get Free Valuation</button></div></div></div></div></section>
    </>
  );
}

function Field({ label, name, type = 'text', value, onChange, required, placeholder }) {
  return <label className="text-sm text-slate-300">{label} {required && <span className="text-[#D4A44A]">*</span>}<input required={required} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="mt-2 w-full rounded-xl bg-[#051329] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#D4A44A] placeholder:text-slate-500" /></label>;
}

function ShieldIcon() {
  return <CheckCircle2 className="w-5 h-5 text-[#D4A44A] shrink-0" />;
}