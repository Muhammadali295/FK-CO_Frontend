import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck, TrendingUp, Settings, Banknote, Wrench, ShieldCheck,
  Lock, ClipboardList, Award, Camera, Globe, Eye, FileSearch,
  KeyRound, BarChart3, Phone, Sparkles, MapPin, Bed, Bath,
  Maximize, CheckCircle2, ChevronDown, ChevronUp, ArrowRight,
  CalendarCheck, Clock, Home, Star, PieChart, Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Star as StarIcon, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import { useProperties } from '../hooks/useProperties';


const LANDLORD_BENEFITS = [
  {
    icon: UserCheck,
    title: 'Professional Tenant Screening',
    description: 'Full credit checks, employment verification, previous landlord references and Right to Rent checks on every applicant.'
  },
  {
    icon: TrendingUp,
    title: 'Maximum Rental Income',
    description: "We position your property at the optimal rent level backed by live market data to achieve the highest sustainable return."
  },
  {
    icon: Settings,
    title: 'Full Property Management',
    description: 'From routine inspections to emergency repairs — we handle every aspect of managing your property on your behalf.'
  },
  {
    icon: Banknote,
    title: 'Guaranteed Rent Collection',
    description: 'Rent collected, processed and transferred to your account each month with a full transparent statement.'
  },
  {
    icon: Wrench,
    title: 'Property Maintenance',
    description: 'Access to our vetted network of qualified contractors for repairs, maintenance and property improvements.'
  },
  {
    icon: ShieldCheck,
    title: 'Legal Compliance',
    description: 'We keep your property fully compliant — gas safety, electrical certificates, EPC, HMO licensing and more.'
  },
  {
    icon: Lock,
    title: 'Deposit Protection',
    description: 'All deposits registered with a government-approved scheme within 30 days of receipt, fully documented.'
  },
  {
    icon: ClipboardList,
    title: 'Regular Property Inspections',
    description: 'Quarterly inspections with full written and photographic reports sent to you after every visit.'
  },
];

const LETTING_STEPS = [
  {
    number: '01',
    icon: Award,
    title: 'Rental Valuation',
    description: 'Our lettings specialists assess your property and provide a free, accurate rental valuation based on current live market demand in your area.'
  },
  {
    number: '02',
    icon: Camera,
    title: 'Professional Photography',
    description: '4K property photography, detailed floor plans and premium listing content crafted to attract quality tenants quickly.'
  },
  {
    number: '03',
    icon: Globe,
    title: 'Marketing Your Property',
    description: 'Launched across Rightmove, Zoopla, SpareRoom and our exclusive registered tenant database for maximum exposure.'
  },
  {
    number: '04',
    icon: Eye,
    title: 'Tenant Viewings',
    description: 'We conduct and coordinate all viewings, gathering detailed feedback and managing all applicant communications.'
  },
  {
    number: '05',
    icon: FileSearch,
    title: 'Tenant Referencing',
    description: 'Comprehensive referencing including credit history, employment verification, affordability assessment and previous landlord checks.'
  },
  {
    number: '06',
    icon: KeyRound,
    title: 'Move In',
    description: 'Full check-in process including detailed inventory, key handover, utility registration and deposit protection registration.'
  },
  {
    number: '07',
    icon: Settings,
    title: 'Ongoing Property Management',
    description: 'We manage your property throughout the tenancy — rent collection, maintenance, inspections and renewals handled seamlessly.'
  },
];

const SERVICES = [
  {
    icon: Settings,
    title: 'Fully Managed',
    description: 'Our premium end-to-end service. We handle everything — so you can enjoy the income without the hassle.',
    highlight: true,
    badge: 'Most Popular'
  },
  {
    icon: UserCheck,
    title: 'Tenant Find Only',
    description: 'We find and reference your ideal tenant, then hand back management once they move in.'
  },
  {
    icon: Banknote,
    title: 'Rent Collection',
    description: 'Monthly rent collection, processing and detailed statements — keeping your cashflow healthy.'
  },
  {
    icon: Wrench,
    title: 'Property Maintenance',
    description: 'Access to our trusted contractor network for reactive repairs and planned maintenance works.'
  },
  {
    icon: ShieldCheck,
    title: 'Legal Compliance',
    description: 'We keep your certificates, licensing and notices up to date — protecting you from costly penalties.'
  },
  {
    icon: ClipboardList,
    title: 'Inventory Management',
    description: 'Professional check-in and check-out inventories with timestamped photographic evidence.'
  },
  {
    icon: Wrench,
    title: 'Emergency Repairs',
    description: '24/7 emergency maintenance line ensuring your property and tenants are never left without support.'
  },
  {
    icon: Eye,
    title: 'Annual Inspections',
    description: 'Scheduled inspections with full photographic reports to keep your property in prime condition.'
  },
];

const STATS = [
  { value: '500+', label: 'Properties Managed', icon: Building2 },
  { value: '99%', label: 'Rent Collected On Time', icon: Banknote },
  { value: '97%', label: 'Occupancy Rate', icon: PieChart },
  { value: '15+', label: 'Years Experience', icon: Award },
];

const FAQ_ITEMS = [
  {
    question: 'How quickly can you find tenants?',
    answer: "On average, we source and reference a quality tenant within 10–14 days of your property going live. Our pre-registered tenant database means many properties are matched before they even reach the portals."
  },
  {
    question: 'What management packages do you offer?',
    answer: 'We offer Tenant Find Only, Rent Collection, and our premium Fully Managed package. Each package is tailored to your needs and portfolio size. Speak with our lettings team to find the right fit.'
  },
  {
    question: 'How are tenants screened?',
    answer: 'Every applicant undergoes a comprehensive referencing process: full credit check, employment verification and income assessment, current and previous landlord references, Right to Rent identity verification, and an affordability analysis to ensure rent is sustainable.'
  },
  {
    question: 'How is rent collected?',
    answer: 'Rent is collected by standing order on the due date each month. Once received and cleared, it is transferred directly to your nominated bank account along with a full itemised monthly statement.'
  },
  {
    question: 'Do you handle all maintenance?',
    answer: "Yes. Under our Fully Managed package, all maintenance requests are handled by our in-house team who coordinate with our vetted contractor network. You'll receive a notification and approval request for any works above your pre-agreed threshold."
  },
  {
    question: 'What happens if a tenant stops paying rent?',
    answer: 'We offer optional Rent Guarantee Insurance that protects your income even if the tenant defaults. In all cases, we manage the arrears process on your behalf including formal notices and legal proceedings if required.'
  },
];

const LANDLORD_TESTIMONIALS = [
  {
    id: 'lt-1',
    name: 'Marcus Vance',
    role: 'Portfolio Landlord — 14 Units',
    location: 'Solihull & City Centre',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: "As a landlord myself, finding FK&CO's Landlord to Landlord management service was a game-changer. They look after my properties with the same rigor as their own portfolio. Void periods have dropped to near zero."
  },
  {
    id: 'lt-2',
    name: 'Priya Sharma',
    role: 'BTL Landlord — 6 Properties',
    location: 'Edgbaston & Harborne',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'Switched to FK&CO after years of self-managing. The difference is night and day. My properties are always tenanted, rent arrives on time every month, and I finally sleep soundly. Genuinely cannot recommend highly enough.'
  },
  {
    id: 'lt-3',
    name: 'David Thornton',
    role: 'First-Time Landlord',
    location: 'Jewellery Quarter, Birmingham',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    text: 'As a first-time landlord I was nervous. FK&CO guided me through every step — from the rental valuation to tenant move-in. Everything was handled professionally and I had a tenant within 12 days of going live.'
  },
];

const PROPERTY_TYPES = ['Detached House', 'Semi-Detached House', 'Terraced House', 'Flat / Apartment', 'Bungalow', 'HMO', 'Studio', 'Other'];

const FadeInUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-4">
    <Sparkles className="w-3.5 h-3.5" />
    {children}
  </div>
);

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left glass-card rounded-2xl px-6 py-5 flex items-center justify-between gap-4 cursor-pointer group hover:border-[#D4A44A]/50 transition-all duration-300"
        aria-expanded={open}
      >
        <span className="font-serif-luxury text-white text-base sm:text-lg font-semibold group-hover:text-[#D4A44A] transition-colors pr-2">
          {item.question}
        </span>
        <span className={`shrink-0 p-1.5 rounded-full border border-white/10 text-[#D4A44A] transition-all duration-300 ${open ? 'bg-[#D4A44A] text-[#071B35] border-[#D4A44A]' : ''}`}>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pt-3 pb-5 text-slate-300 text-sm leading-relaxed border-x border-b border-[#D4A44A]/20 rounded-b-2xl bg-[#051329]/50 -mt-1">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LandlordTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () =>
    setCurrentIndex(prev => (prev === 0 ? LANDLORD_TESTIMONIALS.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex(prev => (prev + 1) % LANDLORD_TESTIMONIALS.length);

  const current = LANDLORD_TESTIMONIALS[currentIndex];

  return (
    <section className="py-28 relative overflow-hidden bg-[#071B35]/90 border-t border-[#D4A44A]/20">
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4A44A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Landlord Testimonials</SectionLabel>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
            What Our <span className="gold-text">Landlords Say</span>
          </h2>
          <p className="mt-3 text-slate-300 text-base font-light">
            Hear from portfolio landlords and first-time investors who trust FK&CO with their properties.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-6 sm:p-12 rounded-3xl border border-[#D4A44A]/30 shadow-2xl relative"
            >
              <Quote className="w-10 h-10 sm:w-16 sm:h-16 text-[#D4A44A]/15 absolute top-4 right-4 sm:top-6 sm:right-8 pointer-events-none" />
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 fill-[#D4A44A] text-[#D4A44A]" />
                ))}
              </div>
              <p className="text-slate-200 text-lg sm:text-xl font-serif-luxury italic leading-relaxed mb-8">
                "{current.text}"
              </p>
              <div className="flex items-center gap-3 sm:gap-4 pt-6 border-t border-white/10">
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-[#D4A44A] shrink-0"
                />
                <div>
                  <h4 className="font-serif-luxury font-bold text-white text-lg">{current.name}</h4>
                  <p className="text-xs text-[#D4A44A] font-semibold">{current.role} · {current.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {LANDLORD_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx ? 'w-8 gold-bg' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="p-3 rounded-full glass-panel hover:bg-[#D4A44A] text-slate-300 hover:text-[#071B35] transition-all duration-300 cursor-pointer" aria-label="Previous">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={handleNext} className="p-3 rounded-full glass-panel hover:bg-[#D4A44A] text-slate-300 hover:text-[#071B35] transition-all duration-300 cursor-pointer" aria-label="Next">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RentalValuationForm() {
  const [formData, setFormData] = useState({
    address: '',
    postcode: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    currentRent: '',
    ownerName: '',
    phone: '',
    email: '',
    additionalInfo: '',
    agreeContact: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // NEW: Error tracking

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleReset = () => {
    setFormData({
      address: '', postcode: '', propertyType: '', bedrooms: '',
      bathrooms: '', currentRent: '', ownerName: '', phone: '',
      email: '', additionalInfo: '', agreeContact: false,
    });
    setSubmitted(false);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeContact) return;
    setLoading(true);
    setErrorMsg('');

    const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          intent: 'let',
          lead_type: 'valuation',
          property_address: `${formData.address}, ${formData.postcode}`,
          message: `Service: Letting | Type: ${formData.propertyType} (${formData.bedrooms} Beds, ${formData.bathrooms} Baths) | Postcode: ${formData.postcode} | Est Rent: ${formData.currentRent || 'Not provided'} | Notes: ${formData.additionalInfo || 'None'}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || 'Failed to submit rental valuation request.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Please ensure your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-[#051329]/80 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4A44A]/60 focus:ring-1 focus:ring-[#D4A44A]/30 transition-all duration-200";
  const labelClass = "block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-6"
      >
        <div className="w-20 h-20 rounded-full gold-bg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4A44A]/30">
          <CheckCircle2 className="w-10 h-10 text-[#071B35]" />
        </div>
        <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3">Rental Valuation Request Received!</h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto mb-8">
          Thank you, <span className="text-[#D4A44A] font-semibold">{formData.ownerName || 'valued landlord'}</span>. Our lettings team will contact you within <span className="text-[#D4A44A] font-semibold">24 hours</span> to arrange your free rental valuation.
        </p>
        <button
          onClick={handleReset}
          className="px-8 py-3 rounded-xl border border-[#D4A44A]/40 text-[#D4A44A] text-sm font-semibold hover:bg-[#D4A44A] hover:text-[#071B35] transition-all duration-300 cursor-pointer"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-semibold text-center mb-4">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Property Address *</label>
          <input name="address" value={formData.address} onChange={handleChange} required placeholder="e.g. 14 Harborne Road" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Postcode *</label>
          <input name="postcode" value={formData.postcode} onChange={handleChange} required placeholder="e.g. B15 3JU" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Property Type *</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} required className={inputClass}>
            <option value="">Select type...</option>
            {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Bedrooms *</label>
          <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} required className={inputClass}>
            <option value="">Select...</option>
            {[1,2,3,4,5,6,7,'8+'].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Bathrooms *</label>
          <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} required className={inputClass}>
            <option value="">Select...</option>
            {[1,2,3,4,'5+'].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Current Rental Income (Optional)</label>
        <input name="currentRent" value={formData.currentRent} onChange={handleChange} placeholder="e.g. £1,800 / pcm or 'Currently vacant'" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={labelClass}>Your Full Name *</label>
          <input name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="e.g. Sarah Jones" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="e.g. 07700 123456" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="e.g. sarah@email.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Information (Optional)</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Any details about your property, current situation, or specific requirements..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="agreeContactLet"
          name="agreeContact"
          type="checkbox"
          checked={formData.agreeContact}
          onChange={handleChange}
          required
          className="mt-1 w-4 h-4 rounded border-[#D4A44A]/40 bg-[#051329] accent-[#D4A44A] cursor-pointer shrink-0"
        />
        <label htmlFor="agreeContactLet" className="text-slate-400 text-xs leading-relaxed cursor-pointer">
          I agree to be contacted by FK&CO Estate regarding my rental valuation request. Your data is handled in accordance with our{' '}
          <span className="text-[#D4A44A] underline underline-offset-2">Privacy Policy</span>.
        </label>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || !formData.agreeContact}
          className="flex-1 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending Request...
            </>
          ) : (
            <>
              <BarChart3 className="w-4 h-4" />
              Request Rental Valuation
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="sm:w-auto px-8 py-4 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:border-white/30 text-sm font-semibold transition-all duration-300 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default function LetProperties() {
  const [savedProperties, setSavedProperties] = useState([]);

  const { properties, loading, error } = useProperties();

  const rentalProperties = useMemo(
    () => properties.filter(p => (p.purpose || p.status || p.type) === 'Let' || (p.purpose || p.status || p.type) === 'let'),
    [properties]
  );

  const handleToggleSave = (id) => {
    setSavedProperties(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#071B35] min-h-screen">

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury managed property"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35]/65 via-[#071B35]/55 to-[#071B35]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B35]/75 via-transparent to-[#071B35]/35" />
        </div>

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4A44A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-[#D4A44A]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Landlord & Lettings Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-luxury text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Let Your Property<br />
            <span className="gold-text">with Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            We help landlords maximise rental income while providing complete property management and tenant sourcing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#rental-valuation-form"
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Get Rental Valuation
            </a>
            <a
              href="tel:+441214960000"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Speak to a Lettings Expert
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { icon: UserCheck, label: 'Tenant Screening' },
              { icon: Banknote, label: '99% Rent On Time' },
              { icon: ShieldCheck, label: 'Fully Compliant' },
              { icon: Clock, label: '24hr Response' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="glass-panel rounded-xl px-3 py-3 flex items-center justify-center gap-2">
                <Icon className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <span className="text-white text-[10px] sm:text-xs font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="rental-valuation-form" className="py-24 bg-[#051329]/50 border-y border-[#D4A44A]/10 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#D4A44A]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <SectionLabel>Free Rental Valuation</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Request a <span className="gold-text">Rental Valuation</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              Complete the form and our lettings team will be in touch within 24 hours with a precise rental estimate.
            </p>
          </FadeInUp>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-6 sm:p-10 border border-[#D4A44A]/20"
          >
            <RentalValuationForm />
          </motion.div>
        </div>
      </section>


      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Landlord <span className="gold-text">Benefits</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              Everything you need to maximise returns, protect your investment and enjoy true peace of mind.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LANDLORD_BENEFITS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl gold-bg flex items-center justify-center shadow-md shadow-[#D4A44A]/20 shrink-0">
                    <Icon className="w-5 h-5 text-[#071B35]" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#051329]/60 border-y border-[#D4A44A]/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our <span className="gold-text">Letting Process</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              A transparent, step-by-step process designed to find quality tenants fast and manage your property with care.
            </p>
          </FadeInUp>

          <div className="relative">
            <div className="hidden sm:block absolute left-[calc(50%-1px)] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#D4A44A]/40 via-[#D4A44A]/20 to-transparent pointer-events-none" />

            <div className="space-y-8">
              {LETTING_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.55, delay: i * 0.07 }}
                    className={`flex flex-col sm:flex-row items-center gap-6 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    <div className="flex-1 glass-card rounded-2xl p-6 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl gold-bg flex items-center justify-center shrink-0 shadow-md shadow-[#D4A44A]/20">
                        <Icon className="w-5 h-5 text-[#071B35]" />
                      </div>
                      <div>
                        <span className="text-[#D4A44A] text-xs font-bold uppercase tracking-widest">Step {step.number}</span>
                        <h3 className="font-serif-luxury text-lg font-bold text-white mt-1 mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    <div className="shrink-0 hidden sm:flex w-12 h-12 rounded-full gold-bg items-center justify-center font-serif-luxury font-bold text-[#071B35] text-sm shadow-lg shadow-[#D4A44A]/30 z-10">
                      {i + 1}
                    </div>
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Landlord <span className="gold-text">Service Packages</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              Choose the level of service that suits your portfolio — from full management to tenant-find only.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`glass-card rounded-2xl p-6 flex flex-col gap-4 relative ${service.highlight ? 'border-[#D4A44A]/50 shadow-lg shadow-[#D4A44A]/10' : ''}`}
                >
                  {service.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full gold-bg text-[#071B35] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-md">
                        {service.badge}
                      </span>
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${service.highlight ? 'gold-bg shadow-[#D4A44A]/30' : 'bg-white/5 border border-white/10'}`}>
                    <Icon className={`w-5 h-5 ${service.highlight ? 'text-[#071B35]' : 'text-[#D4A44A]'}`} />
                  </div>
                  <div>
                    <h3 className={`font-serif-luxury text-lg font-bold mb-2 ${service.highlight ? 'gold-text' : 'text-white'}`}>{service.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{service.description}</p>
                  </div>
                  {service.highlight && (
                    <a
                      href="#rental-valuation-form"
                      className="mt-auto pt-4 text-[#D4A44A] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-[#071B35]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-xl gold-bg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#071B35]" />
                  </div>
                  <p className="font-serif-luxury text-3xl sm:text-4xl font-bold gold-text">{stat.value}</p>
                  <p className="text-slate-400 text-xs mt-1 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {(loading || error || rentalProperties.length > 0) && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp className="text-center mb-14">
              <SectionLabel>Available Now</SectionLabel>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Featured <span className="gold-text">Rental Properties</span>
              </h2>
              <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
                Premium properties available to let now — professionally managed and immediately available.
              </p>
            </FadeInUp>

            {loading ? (
              <div className="py-12 text-center text-[#D4AF37] font-serif text-xl">
                Loading exclusive rentals...
              </div>
            ) : error ? (
              <div className="py-12 text-center text-red-400">
                {error}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentalProperties.map((property, i) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewType="grid"
                    onSelect={() => {}}
                    isSaved={savedProperties.includes(property.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}

            <FadeInUp delay={0.3} className="text-center mt-12">
              <Link
                to="/buy"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#D4A44A]/40 text-[#D4A44A] font-semibold text-sm uppercase tracking-wider hover:bg-[#D4A44A] hover:text-[#071B35] transition-all duration-300"
              >
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeInUp>
          </div>
        </section>
      )}

      <LandlordTestimonials />
      <section className="py-24 bg-[#051329]/40 border-t border-[#D4A44A]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-14">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Landlord <span className="gold-text">FAQs</span>
            </h2>
          </FadeInUp>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1920&q=80"
            alt="Property management"
            loading="lazy"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35] via-[#071B35]/90 to-[#071B35]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Stress-Free Lettings
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Looking for Stress-Free<br />
              <span className="gold-text">Property Management?</span>
            </h2>
            <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
              Let us handle everything — from finding quality tenants to managing your property day to day. Completely stress-free.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#rental-valuation-form"
                className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Book Rental Valuation
              </a>
              <a
                href="tel:+441214960000"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact Lettings Team
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

    </div>
  );
}