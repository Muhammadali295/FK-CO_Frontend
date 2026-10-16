import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Heart,
  Home,
  KeyRound,
  Megaphone,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";

const values = [
  {
    title: "Trust",
    description:
      "Building lasting relationships through honesty and transparency.",
    icon: ShieldCheck,
  },
  {
    title: "Excellence",
    description: "Delivering a consistently high standard of service.",
    icon: Star,
  },
  {
    title: "Local Expertise",
    description:
      "Using our knowledge of the local property market to provide informed advice.",
    icon: Search,
  },
  {
    title: "Customer First",
    description:
      "Putting our clients' needs and goals at the heart of everything we do.",
    icon: Heart,
  },
];

const reasons = [
  ["Professional Property Marketing", Megaphone],
  ["Local Market Knowledge", Search],
  ["Dedicated Support", Users],
  ["Transparent Communication", MessageCircle],
  ["Experienced Team", ShieldCheck],
  ["Personalised Service", Heart],
];

const expertise = [
  {
    label: "BUY",
    text: "Helping buyers find suitable properties.",
    href: "/buy",
    icon: Home,
  },
  {
    label: "SELL",
    text: "Professional marketing and sales support.",
    href: "/sell",
    icon: Megaphone,
  },
  {
    label: "LET",
    text: "Helping landlords find and manage suitable tenants.",
    href: "/let",
    icon: KeyRound,
  },
  {
    label: "RENT",
    text: "Helping tenants find quality rental properties.",
    href: "/rent",
    icon: Search,
  },
  {
    label: "PROPERTY MANAGEMENT",
    text: "Professional management and ongoing support.",
    href: "/services",
    icon: ShieldCheck,
  },
];

const approach = [
  ["01", "Understand", "We listen to the client's requirements."],
  ["02", "Advise", "We provide professional property advice."],
  [
    "03",
    "Market",
    "We present properties professionally to the right audience.",
  ],
  ["04", "Negotiate", "We work to achieve the best possible outcome."],
  ["05", "Support", "We remain involved throughout the process."],
];

const team = [
  {
    name: "Faisal Khan",
    position: "Managing Director",
    bio: "Leading FK&CO with a clear focus on trust, results and lasting client relationships.",
  },
  {
    name: "Amelia Hart",
    position: "Senior Property Consultant",
    bio: "Combining thoughtful advice with a deep understanding of Birmingham’s prime residential market.",
  },
  {
    name: "Daniel Morgan",
    position: "Head of Lettings",
    bio: "Helping landlords and tenants move forward with calm, responsive and practical support.",
  },
  {
    name: "Sophie Williams",
    position: "Client Experience Manager",
    bio: "Making every interaction feel personal, clear and carefully looked after from start to finish.",
  },
];

export default function About() {
  const [showMore, setShowMore] = useState(false);

  const contact = () =>
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
            alt="Elegant property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051329]/95 via-[#071B35]/85 to-[#071B35]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-[#051329]/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/40 text-[#F3E7C4] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-[#D4A44A]" /> The FK&CO Estate
            story
          </span>
          <h1 className="mt-7 font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            More Than Property.
            <br />
            <span className="gold-text italic font-normal">
              It's Your Future.
            </span>
          </h1>

          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              At FK&Co Estate, we believe property is about more than simply
              buying, selling or letting a home; it is about providing honest
              advice, dependable service and achieving the right result for
              every client.
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
                  <div className="pt-4 space-y-4 text-sm sm:text-base text-slate-300 font-light leading-relaxed text-left sm:text-left">
                    <p></p>
                    <p>
                      We are a modern, independent estate and letting agency
                      specialising in Sales, Lettings and Property Management.
                      As landlords and property owners ourselves, we understand
                      the property market from both sides. We know the
                      importance of finding reliable tenants, protecting your
                      investment, keeping properties compliant and dealing with
                      problems quickly and professionally.
                    </p>
                    <p>
                      We combine strong local knowledge with modern property
                      marketing, professional presentation and exposure across
                      leading property platforms to give every property the
                      attention it deserves.
                    </p>
                    <p>
                      We are particularly focused on building long-term
                      relationships with landlords, homeowners, buyers and
                      tenants. Our reputation matters to us, which is why we aim
                      to treat every property we manage or market with the same
                      care and attention we would give our own.
                    </p>
                    <p className="font-semibold text-[#D4A44A] pt-2">
                      FK&Co Estate — Trusted to Sell. Trusted to Let. <br />
                      Local knowledge. Expert advice. Better results.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-4 text-[#D4A44A] hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 focus:outline-none"
            >
              {showMore ? (
                <>
                  See Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  See More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={contact}
              className="px-7 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#D4A44A]" /> Contact Our
              Team
            </button>
            <a
              href="https://valuation.fkandcoestate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Get Free Instant Valuation In 60 Seconds
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-[#051329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85"
              alt="FK&CO property consultation"
              className="w-full aspect-[4/3] object-cover rounded-3xl border border-[#D4A44A]/30 shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
              Our story
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Built around <span className="gold-text">people</span>
            </h2>
            <div className="mt-6 text-slate-300 leading-relaxed">
              <p>
                Our approach is straightforward: personal service, clear
                communication and no unnecessary complications. Whether
                you are selling your home, looking for a tenant, searching
                for your next property or need someone to manage your
                investment, you will deal with people who understand the
                process and take responsibility for getting things done.
              </p>
            </div>
            <p className="mt-4 text-slate-300 leading-relaxed">
              From buying and selling to letting, renting and property
              management, we give every client clear advice and dependable
              support at every stage.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {[
                "Buying",
                "Selling",
                "Letting",
                "Renting",
                "Property management",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <Check className="w-4 h-4 text-[#D4A44A]" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#071B35]/90 border-y border-[#D4A44A]/15">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Target className="w-12 h-12 text-[#D4A44A] mx-auto" />
          <p className="mt-6 text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
            Our mission
          </p>
          <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
            Advice with <span className="gold-text">purpose</span>
          </h2>
          <p className="mt-6 text-lg sm:text-2xl text-slate-200 font-serif-luxury italic leading-relaxed">
            “To provide honest advice, exceptional service and professional
            property solutions while putting our clients' goals first.”
          </p>
          <div className="w-20 h-px bg-[#D4A44A] mx-auto mt-8" />
        </div>
      </section>

      <section className="py-24 bg-[#051329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
              What guides us
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Our <span className="gold-text">values</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ title, description, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-card rounded-2xl p-7 border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D4A44A]" />
                </div>
                <h3 className="mt-6 font-serif-luxury text-2xl font-bold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  {description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#071B35]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
              The FK&CO difference
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Why Choose <span className="gold-text">FK&CO Estate?</span>
            </h2>
            <p className="mt-5 text-slate-300 leading-relaxed">
              Property Is Personal. So Is Our Service. At FK&Co Estate, we
              understand that a property is rarely just bricks and mortar. For a
              homeowner, it may be the place where a family was raised and years
              of memories were made. For a landlord, it may represent years of
              hard work, savings and an important part of their family's
              financial future. That is why we believe you deserve more than an
              estate agent who simply lists your property and waits for the
              phone to ring. We are a modern, independent estate and letting
              agency specialising in Sales, Lettings and Property Management,
              built around one simple principle: we treat your property as if it
              were our own.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.map(([title, Icon], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="glass-panel-light rounded-2xl p-5 flex items-center gap-4"
              >
                <Icon className="w-6 h-6 text-[#D4A44A] shrink-0" />
                <span className="text-white font-semibold text-sm">
                  {title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#051329]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
              Our expertise
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Property, <span className="gold-text">properly considered</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {expertise.map(({ label, text, href, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <Link
                  to={href}
                  className="group block h-full glass-card rounded-2xl p-6 border border-white/10"
                >
                  <Icon className="w-6 h-6 text-[#D4A44A]" />
                  <h3 className="mt-6 text-white font-bold tracking-wider text-sm">
                    {label}
                  </h3>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                    {text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs text-[#D4A44A] font-semibold">
                    Explore{" "}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#071B35]/90 border-y border-[#D4A44A]/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
              How we work
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
              Our <span className="gold-text">approach</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {approach.map(([number, title, text], index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative text-center md:text-left"
              >
                <span className="text-[#D4A44A] font-serif-luxury text-3xl italic">
                  {number}
                </span>
                <h3 className="mt-2 text-white font-bold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {text}
                </p>
                {index < approach.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-3 -right-3 w-5 h-5 text-[#D4A44A]/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 bg-[#051329]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#D4A44A]/50 bg-gradient-to-r from-[#071B35] via-[#0D2548] to-[#071B35] p-8 sm:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4A44A]/15 via-transparent to-transparent" />
            <div className="relative max-w-3xl mx-auto">
              <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">
                Start a conversation
              </p>
              <h2 className="mt-4 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">
                Let's Talk About Your
                <span className="gold-text">Property</span>
              </h2>
              <p className="mt-5 text-slate-300 text-base sm:text-lg">
                Whether you're buying, selling, letting or renting, our team is
                here to help.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={contact}
                  className="px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-[#D4A44A]" />
                  <Link to="/contact">Contact Us</Link>
                </button>
                <a
                  href="https://valuation.fkandcoestate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Get Free Instant Valuation In 60 Seconds
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}