import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Home, PoundSterling, Bed, Bath, Sofa, Car, PawPrint, Calendar,
  CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Phone, Sparkles,
  UserCheck, Clock, ShieldCheck, Zap, Heart, LayoutGrid, List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROPERTIES_DATA } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import PropertySearch from '../components/PropertySearch';
import Testimonials from '../components/Testimonials';

// ─── Data ──────────────────────────────────────────────────────────────────────

const WHY_RENT_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description: 'Every property on our platform is physically verified and meets strict safety and quality standards.'
  },
  {
    icon: Calendar,
    title: 'Flexible Viewing Appointments',
    description: 'Book viewings 7 days a week, including evenings, to fit around your busy schedule.'
  },
  {
    icon: MapPin,
    title: 'Local Experts',
    description: 'Our team lives and breathes Birmingham. We can advise on transport links, schools, and local amenities.'
  },
  {
    icon: PoundSterling,
    title: 'Transparent Pricing',
    description: 'No hidden fees. We clearly outline the rent, deposit, and any permitted charges upfront.'
  },
  {
    icon: Zap,
    title: 'Fast Application Process',
    description: 'Streamlined online referencing and digital lease signing means you can move in faster.'
  },
  {
    icon: Phone,
    title: 'Ongoing Tenant Support',
    description: '24/7 dedicated maintenance reporting and a dedicated property manager for your peace of mind.'
  },
];

const RENTAL_PROCESS = [
  {
    number: '01',
    icon: Search,
    title: 'Search Properties',
    description: 'Browse our exclusive portfolio of rental properties tailored to your specific requirements.'
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Schedule Viewing',
    description: 'Book an accompanied viewing with one of our local lettings experts at a time that suits you.'
  },
  {
    number: '03',
    icon: CheckCircle2,
    title: 'Submit Application',
    description: 'Place a holding deposit and complete our simple online application form to secure the property.'
  },
  {
    number: '04',
    icon: UserCheck,
    title: 'Tenant Referencing',
    description: 'We process your references, credit checks, and Right to Rent documentation swiftly and securely.'
  },
  {
    number: '05',
    icon: ShieldCheck,
    title: 'Sign Agreement',
    description: 'Review and sign your digital tenancy agreement and pay your first month\'s rent and security deposit.'
  },
  {
    number: '06',
    icon: Home,
    title: 'Move In',
    description: 'Collect your keys, receive your comprehensive inventory, and settle into your new home.'
  },
];

const TENANT_RESOURCES = [
  {
    title: 'Renting Guide',
    description: 'Everything you need to know about renting in the UK, from your rights to responsibilities.',
    link: '#'
  },
  {
    title: 'Required Documents',
    description: 'A checklist of the ID, financial, and employment documents needed for referencing.',
    link: '#'
  },
  {
    title: 'Deposit Information',
    description: 'Learn how your security deposit is protected under a government-approved tenancy deposit scheme.',
    link: '#'
  },
  {
    title: 'Moving Checklist',
    description: 'Our step-by-step guide to ensure a smooth transition into your new rental property.',
    link: '#'
  },
];

const FAQ_ITEMS = [
  {
    question: 'How do I book a viewing?',
    answer: 'You can request a viewing directly through the property listing on our website, or by calling our lettings team. We offer flexible appointments 7 days a week.'
  },
  {
    question: 'What documents do I need to rent a property?',
    answer: 'You will typically need photographic ID (Passport or Driving Licence), proof of current address (e.g., utility bill), 3 months of bank statements, and proof of income/employment. We will also conduct a Right to Rent check.'
  },
  {
    question: 'Can I reserve a property?',
    answer: 'Yes, once your offer is accepted by the landlord, you can reserve the property by paying a holding deposit (equivalent to one week\'s rent). This takes the property off the market while referencing is completed.'
  },
  {
    question: 'How much deposit is required?',
    answer: 'By law, the security deposit is capped at a maximum of five weeks\' rent for properties with an annual rent under £50,000. This is held securely in a government-approved deposit protection scheme.'
  },
  {
    question: 'Are pets allowed?',
    answer: 'This varies depending on the specific landlord and property. Use the "Pets Allowed" filter in our advanced search to find pet-friendly properties, or ask our team for recommendations.'
  },
];

// ─── Shared Sub-Components ─────────────────────────────────────────────────────

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

// ─── FAQ Item ──────────────────────────────────────────────────────────────────

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


// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function RentProperties() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [viewType, setViewType] = useState('grid'); // 'grid' | 'list'
  const [sortOption, setSortOption] = useState('newest');

  // Search filter state
  const [filterState, setFilterState] = useState({
    status: 'Rent',
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    furnished: '',
    parking: '',
    petsAllowed: '',
    availableFrom: ''
  });

  const handleResetFilters = () => {
    setFilterState({
      status: 'Rent',
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      furnished: '',
      parking: '',
      petsAllowed: '',
      availableFrom: ''
    });
  };

  const handleToggleSave = (id) => {
    setSavedProperties(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    let result = PROPERTIES_DATA.filter(p => p.status === 'Rent' || p.status === 'Let');

    if (filterState.location) {
      result = result.filter(p => p.location.includes(filterState.location));
    }
    if (filterState.type) {
      result = result.filter(p => p.type === filterState.type);
    }
    if (filterState.minPrice) {
      result = result.filter(p => p.price >= parseInt(filterState.minPrice, 10));
    }
    if (filterState.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filterState.maxPrice, 10));
    }
    if (filterState.bedrooms) {
      result = result.filter(p => p.bedrooms >= parseInt(filterState.bedrooms, 10));
    }
    if (filterState.bathrooms) {
       result = result.filter(p => p.bathrooms >= parseInt(filterState.bathrooms, 10));
    }
    if (filterState.furnished) {
       result = result.filter(p => p.furnished === filterState.furnished);
    }
    // Note: parking, pets, availableFrom are omitted for simplicity in this mock data implementation

    // Sorting
    switch (sortOption) {
      case 'lowest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'highest':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        break;
    }

    return result;
  }, [filterState, sortOption]);

  return (
    <div className="bg-[#071B35] min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury rental apartment"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35]/70 via-[#071B35]/60 to-[#071B35]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B35]/80 via-transparent to-[#071B35]/40" />
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
            Premium Lettings
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-luxury text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Find Your Perfect<br />
            <span className="gold-text">Rental Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-200 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Browse high-quality rental properties with flexible options and trusted local expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#properties"
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Rentals
            </a>
            <a
              href="tel:+441214960000"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact Lettings Team
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ADVANCED RENTAL SEARCH ────────────────────────────────────────── */}
      <PropertySearch
        filterState={filterState}
        setFilterState={setFilterState}
        onResetFilters={handleResetFilters}
        isRental={true}
      />

      {/* ── FEATURED RENTAL LISTINGS ────────────────────────────────────── */}
      <section id="properties" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <FadeInUp>
              <SectionLabel>Available Properties</SectionLabel>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Featured <span className="gold-text">Rentals</span>
              </h2>
              <p className="mt-3 text-slate-300 text-sm">Showing {filteredProperties.length} results</p>
            </FadeInUp>

            {/* Sorting & View Options */}
            <FadeInUp delay={0.1} className="flex flex-wrap items-center gap-4">
              <div className="glass-panel rounded-xl px-3 py-1.5 flex items-center gap-2 border border-white/10">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#071B35]">Newest Listings</option>
                  <option value="popular" className="bg-[#071B35]">Recently Available</option>
                  <option value="lowest" className="bg-[#071B35]">Lowest Rent</option>
                  <option value="highest" className="bg-[#071B35]">Highest Rent</option>
                </select>
              </div>

              <div className="glass-panel rounded-xl p-1 flex items-center border border-white/10">
                <button
                  onClick={() => setViewType('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    viewType === 'grid' ? 'bg-[#D4A44A] text-[#071B35]' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewType('list')}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    viewType === 'list' ? 'bg-[#D4A44A] text-[#071B35]' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </FadeInUp>
          </div>

          {filteredProperties.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewType === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}
            >
              <AnimatePresence>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewType={viewType}
                    onSelect={() => {}}
                    isSaved={savedProperties.includes(property.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20 glass-card rounded-3xl">
              <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-serif-luxury text-white mb-2">No properties found</h3>
              <p className="text-slate-400 text-sm">Try adjusting your search filters to find what you're looking for.</p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2 rounded-xl border border-[#D4A44A]/40 text-[#D4A44A] text-sm font-semibold hover:bg-[#D4A44A] hover:text-[#071B35] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── RENTAL PROCESS TIMELINE ──────────────────────────────────────── */}
      <section className="py-24 bg-[#051329]/60 border-y border-[#D4A44A]/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our <span className="gold-text">Rental Process</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              A smooth, transparent process from your first viewing to collecting the keys to your new home.
            </p>
          </FadeInUp>

          <div className="relative">
            <div className="hidden sm:block absolute left-[calc(50%-1px)] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#D4A44A]/40 via-[#D4A44A]/20 to-transparent pointer-events-none" />

            <div className="space-y-8">
              {RENTAL_PROCESS.map((step, i) => {
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

      {/* ── WHY RENT WITH FK&CO ─────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>Tenant Benefits</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Why Rent With <span className="gold-text">FK&CO</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              We treat our tenants with respect, offering transparent terms, quality properties, and responsive support.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_RENT_ITEMS.map((item, i) => {
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
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TENANT RESOURCES ────────────────────────────────────────────── */}
      <section className="py-20 bg-[#051329]/60 border-y border-[#D4A44A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <SectionLabel>Helpful Guides</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tenant <span className="gold-text">Resources</span>
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TENANT_RESOURCES.map((resource, i) => (
              <motion.a
                key={resource.title}
                href={resource.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 group hover:border-[#D4A44A]/50 transition-all cursor-pointer block"
              >
                <h3 className="font-serif-luxury text-lg font-bold text-white mb-2 group-hover:text-[#D4A44A] transition-colors">{resource.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{resource.description}</p>
                <div className="text-[#D4A44A] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#051329]/40 border-t border-[#D4A44A]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-14">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Tenant <span className="gold-text">FAQs</span>
            </h2>
          </FadeInUp>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80"
            alt="Find your next home"
            loading="lazy"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35] via-[#071B35]/90 to-[#071B35]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Start Your Search
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Ready to Find<br />
              <span className="gold-text">Your Next Home?</span>
            </h2>
            <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
              Browse our latest properties to rent in Birmingham and surrounding areas, or speak to our friendly lettings advisors.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#properties"
                className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Browse Available Rentals
              </a>
              <a
                href="tel:+441214960000"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Speak to an Advisor
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

    </div>
  );
}
