import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Camera,
  Globe,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  BadgePercent,
  Eye,
  Handshake,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Phone,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import PropertyCard from "../components/PropertyCard";

// 1. Import the custom hook
import { useProperties } from "../hooks/useProperties";

// ─── Data ──────────────────────────────────────────────────────────────────────

const WHY_SELL_ITEMS = [
  {
    icon: Award,
    title: "Free Property Valuation",
    description:
      "Accurate, data-driven valuations by local experts who know Birmingham's premium property market inside out.",
  },
  {
    icon: MapPin,
    title: "Local Market Experts",
    description:
      "Deep knowledge of Edgbaston, Solihull, Harborne, Sutton Coldfield and the wider West Midlands market.",
  },
  {
    icon: Camera,
    title: "Professional Photography",
    description:
      "Bespoke 4K photography and drone videography that showcases your property in its absolute best light.",
  },
  {
    icon: Globe,
    title: "Maximum Online Exposure",
    description:
      "Listed on Rightmove, Zoopla, and our exclusive buyer database to maximise visibility from day one.",
  },
  {
    icon: UserCheck,
    title: "Qualified Buyers Only",
    description:
      "We pre-qualify every buyer so you only receive serious, financially verified offers — no time-wasters.",
  },
  {
    icon: TrendingUp,
    title: "Dedicated Sales Progression",
    description:
      "Your dedicated property manager keeps the sale on track from listing to completion.",
  },
  {
    icon: BadgePercent,
    title: "No Sale, No Fee",
    description:
      "You only pay when your property sells. Zero upfront fees, total peace of mind guaranteed.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Communication",
    description:
      "Weekly updates, instant offer notifications, and honest advice throughout your entire selling journey.",
  },
];

const SELLING_STEPS = [
  {
    number: "01",
    icon: Award,
    title: "Free Property Valuation",
    description:
      "Our local experts visit your property and provide an accurate market valuation based on recent sales and live demand data.",
  },
  {
    number: "02",
    icon: Camera,
    title: "Professional Photography",
    description:
      "Our in-house photographers capture stunning 4K images, floor plans and drone footage to make your listing stand out.",
  },
  {
    number: "03",
    icon: Globe,
    title: "Property Listing Goes Live",
    description:
      "Your property is launched across Rightmove, Zoopla, our website and to our exclusive registered buyer database.",
  },
  {
    number: "04",
    icon: Eye,
    title: "Viewings & Feedback",
    description:
      "We conduct and manage all viewings on your behalf, collecting detailed buyer feedback after each visit.",
  },
  {
    number: "05",
    icon: Handshake,
    title: "Receive & Negotiate Offers",
    description:
      "All offers are presented to you in writing. We negotiate hard on your behalf to achieve the best possible price.",
  },
  {
    number: "06",
    icon: FileText,
    title: "Completion",
    description:
      "We liaise with solicitors and all parties to ensure a smooth, stress-free exchange and completion.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How much is my property worth?",
    answer:
      "Property values vary significantly based on location, size, condition, and current market demand. Our local expert will provide a free, no-obligation valuation based on recent comparable sales in your area and live buyer demand data. Book your free valuation to get an accurate figure.",
  },
  {
    question: "How long does selling a property take?",
    answer:
      "The average sale in Birmingham takes 12–16 weeks from listing to completion. However, with our pre-qualified buyer database and proactive sales progression, many of our properties sell within days and complete significantly faster than the market average.",
  },
  {
    question: "Do I pay anything if my property doesn't sell?",
    answer:
      "Absolutely not. FK&CO Estate operates on a strict No Sale, No Fee basis. You only pay our agreed commission if and when your property successfully sells and completes. There are no upfront fees or cancellation charges.",
  },
  {
    question: "What documents do I need to sell my property?",
    answer:
      "You will need: proof of identity (passport or driving licence), proof of address, your title deeds (or Land Registry title number), Energy Performance Certificate (EPC), any planning permissions or building regulation certificates, and mortgage redemption statement if applicable. Our team will guide you through the full requirements.",
  },
  {
    question: "Should I sell before buying a new property?",
    answer:
      "This depends on your personal circumstances, financial position, and current market conditions. We recommend speaking with one of our local experts who can advise on the best strategy — whether that's selling first, buying first, or negotiating a simultaneous exchange.",
  },
  {
    question: "How do you market my property?",
    answer:
      "We provide a comprehensive marketing package: professional 4K photography, HD floor plans, drone videography, Rightmove and Zoopla listings with premium placement, social media campaigns, email campaigns to our registered buyer database, and private showcasing at our Birmingham office.",
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
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

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

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
        <span className="font-serif-luxury text-white text-base sm:text-lg font-semibold group-hover:text-[#D4A44A] transition-colors">
          {item.question}
        </span>
        <span
          className={`shrink-0 p-1.5 rounded-full border border-white/10 text-[#D4A44A] transition-all duration-300 ${open ? "bg-[#D4A44A] text-[#071B35] border-[#D4A44A]" : ""}`}
        >
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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

export default function SellProperties() {
  const { onSelectProperty } = useOutletContext(); 
  const [savedProperties, setSavedProperties] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // Fetch live properties from backend
  const { properties, loading, error } = useProperties();

  // Smart filter to identify properties listed for 'buy/sell'
  const sellProperties = useMemo(() => {
    return properties.filter((item) => {
      const rawPurpose = (item.purpose || item.status || item.type || "")
        .toString()
        .toLowerCase();
      return rawPurpose === "buy" || rawPurpose === "sell";
    });
  }, [properties]);

  const handleToggleSave = (id) => {
    setSavedProperties((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-[#071B35] min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury property exterior"
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35]/70 via-[#071B35]/60 to-[#071B35]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071B35]/80 via-transparent to-[#071B35]/40" />
          
          {/* Dynamic Blur Overlay */}
          <div 
            className={`absolute inset-0 bg-[#051329]/60 backdrop-blur-md transition-all duration-700 ease-in-out ${
              showMore ? "opacity-100 visible" : "opacity-0 invisible"
            }`} 
          />
        </div>

        {/* Decorative Gold Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4A44A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-[#D4A44A]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sell With FK&CO Estate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-luxury text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Sell Your Property
            <br />
            <span className="gold-text">with Confidence</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-3xl mx-auto"
          >
            <p className="text-slate-200 text-base sm:text-xl leading-relaxed font-light">
              Our experienced local experts help you achieve the best possible
              price with professional marketing and trusted advice.
            </p>

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 space-y-5 text-sm sm:text-base text-slate-300 font-light leading-relaxed text-left sm:text-left">
                    <p>
                      Selling your home can be one of the biggest financial and emotional decisions you will make.
                    </p>
                    <p>
                      You need an agent who understands that getting the right result is not simply about putting a property online. It is about presentation, marketing, communication, negotiation and having someone beside you who genuinely takes responsibility for progressing your sale.
                    </p>
                    <p>
                      We take the time to understand your property, your circumstances and what you want to achieve before recommending the best way forward.
                    </p>
                    <p>
                      From the first valuation to handing over the keys, our aim is to make you feel informed, supported and confident that your property is receiving the attention it deserves.
                    </p>
                    <p className="font-bold text-[#D4A44A] pt-2 text-lg">
                      Your home matters. Your move matters. And the result matters.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-6 text-[#D4A44A] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 focus:outline-none"
            >
              {showMore ? (
                <>See Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>See More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {/* <a
              href="tel:+441216306776"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Speak to an Expert
            </a> */}
             <a
              href="https://valuation.fkandcoestate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              Get Free Instant Valuation In 60 Seconds
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { icon: BadgePercent, label: "No Sale, No Fee" },
              { icon: Award, label: "Free Valuation" },
              { icon: Camera, label: "4K Photography" },
              { icon: Clock, label: "24hr Response" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="glass-panel rounded-xl px-3 py-3 flex items-center justify-center gap-2"
              >
                <Icon className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <span className="text-white text-[10px] sm:text-xs font-medium">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── VALUATION CTA ── */}
      <section id="valuation-form" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#D4A44A]/6 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-12">
            <SectionLabel>Book Your Valuation</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Request a <span className="gold-text">Free Sell Valuation</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              Find out how much your property is worth in 60 seconds with our instant online valuation tool.
            </p>
          </FadeInUp>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 sm:p-14 border border-[#D4A44A]/20 text-center flex flex-col items-center justify-center bg-gradient-to-b from-white/5 to-transparent"
          >
            <div className="w-16 h-16 rounded-full bg-[#D4A44A]/10 flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-[#D4A44A]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white font-bold mb-4">Instant Property Valuation</h3>
            <p className="text-slate-300 max-w-md mx-auto mb-8 text-sm sm:text-base">
              Get an immediate estimate of your home's current market value based on live data and recent sales in your area.
            </p>
            <a
              href="https://valuation.fkandcoestate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-5 rounded-full gold-bg text-[#071B35] font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#D4A44A]/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Start Free Valuation
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES DB INTEGRATION ── */}
      {(loading || error || sellProperties.length > 0) && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp className="text-center mb-14">
              <SectionLabel>Featured Portfolio</SectionLabel>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Properties <span className="gold-text">For Sale</span>
              </h2>
              <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
                Explore our exclusive collection of premium properties currently on the market.
              </p>
            </FadeInUp>

            {loading ? (
              <div className="py-12 text-center text-[#D4AF37] font-serif text-xl">
                Loading featured properties...
              </div>
            ) : error ? (
              <div className="py-12 text-center text-red-400">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Slicing to show top 3 featured items on the Sell landing page */}
                {sellProperties.slice(0, 3).map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewType="grid"
                    onSelect={onSelectProperty}
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

      {/* ── WHY SELL WITH FK&CO ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Why Sell With <span className="gold-text">FK&CO Estate</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
              We combine local expertise, premium marketing and a client-first
              approach to deliver exceptional results every time.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_SELL_ITEMS.map((item, i) => {
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
                    <h3 className="font-serif-luxury text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SELLING PROCESS TIMELINE ── */}
      <section className="py-24 bg-[#051329]/60 border-y border-[#D4A44A]/10 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A44A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our <span className="gold-text">Selling Process</span>
            </h2>
            <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto">
              A clear, proven process designed to maximise your sale price and
              minimise stress.
            </p>
          </FadeInUp>

          <div className="relative">
            {/* Vertical connector line (hidden on mobile) */}
            <div className="hidden sm:block absolute left-[calc(50%-1px)] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#D4A44A]/40 via-[#D4A44A]/20 to-transparent pointer-events-none" />

            <div className="space-y-8">
              {SELLING_STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className={`flex flex-col sm:flex-row items-center gap-6 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <div className="flex-1 glass-card rounded-2xl p-6 flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl gold-bg flex items-center justify-center shrink-0 shadow-md shadow-[#D4A44A]/20">
                        <Icon className="w-5 h-5 text-[#071B35]" />
                      </div>
                      <div>
                        <span className="text-[#D4A44A] text-xs font-bold uppercase tracking-widest">
                          Step {step.number}
                        </span>
                        <h3 className="font-serif-luxury text-lg font-bold text-white mt-1 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Central circle node */}
                    <div className="shrink-0 hidden sm:flex w-12 h-12 rounded-full gold-bg items-center justify-center font-serif-luxury font-bold text-[#071B35] text-sm shadow-lg shadow-[#D4A44A]/30 z-10">
                      {i + 1}
                    </div>

                    {/* Spacer for right-side offset */}
                    <div className="flex-1 hidden sm:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#051329]/40 border-t border-[#D4A44A]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-14">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
          </FadeInUp>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80"
            alt="Premium property"
            loading="lazy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071B35] via-[#071B35]/90 to-[#071B35]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/30 text-[#D4A44A] text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Take the First Step
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white leading-tight">
              Ready to <span className="gold-text">Sell?</span>
            </h2>
            <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
              Speak with one of our Birmingham property experts today —
              completely free, no obligation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://valuation.fkandcoestate.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl gold-bg text-[#071B35] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D4A44A]/30 hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                Book Free Valuation
              </a>
              <a
                href="tel:+441216306776"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Contact an Agent
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}