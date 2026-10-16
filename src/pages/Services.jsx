import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  Handshake,
  KeyRound,
  LineChart,
  Mail,
  Megaphone,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import StatsSection from '../components/StatsSection';
import Testimonials from '../components/Testimonials';
import ValuationCTA from '../components/ValuationCTA';

const services = [
  { title: 'Buying Property', icon: Search, items: ['Expert guidance', 'Property search assistance', 'Negotiation support'] },
  { title: 'Selling Property', icon: Building2, items: ['Free valuation', 'Professional marketing', 'Sales progression'] },
  { title: 'Lettings', icon: KeyRound, items: ['Tenant sourcing', 'Referencing', 'Property advertising'] },
  { title: 'Property Management', icon: ShieldCheck, items: ['Rent collection', 'Maintenance coordination', 'Regular inspections', 'Compliance management'] },
  { title: 'Property Marketing', icon: Camera, items: ['Professional photography', 'Floor plans', 'Virtual tours', 'Premium listings'] },
  { title: 'Investment Advice', icon: LineChart, items: ['Buy-to-let guidance', 'Market analysis', 'ROI consultation'] },
];

const reasons = [
  ['Experienced Local Experts', Users],
  ['Transparent Communication', MessageCircle],
  ['Dedicated Account Managers', Handshake],
  ['Fast Response Times', Sparkles],
  ['Professional Marketing', Megaphone],
  ['Trusted Reputation', ShieldCheck],
];

const process = ['Consultation', 'Planning', 'Marketing', 'Negotiation', 'Completion', 'Aftercare Support'];
const faqs = [
  ['What services do you provide?', 'We support buyers, sellers, landlords, tenants and investors with a complete range of property services.'],
  ['Do you manage rental properties?', 'Yes. Our management service covers tenant sourcing, rent collection, maintenance, inspections and compliance.'],
  ['How do I book a valuation?', 'Use the valuation button anywhere on the site or contact our team to arrange a convenient appointment.'],
  ['Can you help investors?', 'Our local market analysis and buy-to-let guidance help investors make confident, informed decisions.'],
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToContact = () => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90" alt="Luxury estate interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051329]/95 via-[#071B35]/80 to-[#071B35]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051329] via-transparent to-[#051329]/70" />
        </div>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#D4A44A]/40 text-[#F3E7C4] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-4 h-4 text-[#D4A44A]" /> Full-service property experts
          </span>
          <h1 className="mt-7 font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Our Property <span className="gold-text italic font-normal">Services</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-light leading-relaxed">
            From buying and selling to lettings and full property management, we provide professional real estate solutions tailored to your needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={scrollToContact} className="px-7 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#D4A44A]" /> Contact Our Team
            </button>
            <a
              href="https://valuation.fkandcoestate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold shadow-xl shadow-[#D4A44A]/20 inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Get Free Instant Valuation In 60 Seconds
            </a>
          </div>
        </motion.div>
      </section>

      {/* SERVICES LIST SECTION */}
      <section className="py-24 bg-[#051329]" id="services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">One trusted partner</p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">A more considered way to <span className="gold-text">move forward</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ title, icon: Icon, items }, index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="glass-card rounded-2xl p-7 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center"><Icon className="w-6 h-6 text-[#D4A44A]" /></div>
                <h3 className="mt-6 font-serif-luxury text-2xl font-bold text-white">{title}</h3>
                <ul className="mt-5 space-y-3">
                  {items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-[#D4A44A] shrink-0" /> {item}</li>)}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE SECTION */}
      <section className="py-24 bg-[#071B35]/90 border-y border-[#D4A44A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">The FK&CO difference</p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Why choose <span className="gold-text">FK&CO</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reasons.map(([title, Icon], index) => (
              <motion.div key={title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass-panel-light rounded-2xl p-6 flex items-center gap-4">
                <Icon className="w-6 h-6 text-[#D4A44A] shrink-0" />
                <span className="text-white font-semibold">{title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-[#051329]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">A clear path</p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Our <span className="gold-text">process</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {process.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative text-center">
                <div className="w-12 h-12 mx-auto rounded-full gold-bg text-[#071B35] flex items-center justify-center font-bold text-lg">{index + 1}</div>
                <p className="mt-4 text-white text-sm font-semibold">{step}</p>
                {index < process.length - 1 && <ArrowRight className="hidden md:block absolute top-4 -right-3 w-6 h-6 text-[#D4A44A]/50" />}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8 md:hidden"><ArrowDown className="w-5 h-5 text-[#D4A44A]" /></div>
        </div>
      </section>

      <Testimonials />

      {/* FAQS SECTION */}
      <section className="py-24 bg-[#071B35]/90">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">Need to know more?</p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Frequently asked <span className="gold-text">questions</span></h2>
          </div>
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <div key={question} className="glass-panel rounded-xl border border-white/10 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-5 flex items-center justify-between gap-4 text-left text-white font-semibold">
                  <span>{question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#D4A44A] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-5 pb-5 text-sm text-slate-300 leading-relaxed">
                    {answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="py-20 bg-[#051329]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-[#D4A44A]/50 bg-gradient-to-r from-[#071B35] via-[#0D2548] to-[#071B35] p-8 sm:p-16 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4A44A]/15 via-transparent to-transparent" />
            <div className="relative max-w-3xl mx-auto">
              <p className="text-[#D4A44A] uppercase tracking-[0.2em] text-xs font-bold">Your next move starts here</p>
              <h2 className="mt-4 font-serif-luxury text-3xl sm:text-5xl font-bold text-white">Let's Discuss Your <span className="gold-text">Property Goals</span></h2>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="https://valuation.fkandcoestate.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" /> Get Free Instant Valuation In 60 Seconds
                </a>
                <button onClick={scrollToContact} className="px-7 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-[#D4A44A]" /> Contact FK&CO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Note: ValuationCTA has been kept, assuming it has been updated directly in its component file to not require props anymore */}
      <ValuationCTA />
    </>
  );
}