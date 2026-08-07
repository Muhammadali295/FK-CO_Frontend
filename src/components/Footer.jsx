import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenValuationModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <footer id="footer" className="bg-[#051329] border-t border-[#D4A44A]/30 text-slate-300 text-sm relative z-10">
      
      {/* Upper Newsletter Bar */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#D4A44A]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#D4A44A]">
                The Private Journal
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
                Subscribe to Off-Market Luxury Insights
              </h3>
              <p className="text-slate-400 text-xs font-light max-w-lg">
                Receive confidential notifications on prime Birmingham properties before they hit Rightmove & Zoopla.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {subscribed ? (
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed to VIP Off-Market Alerts!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full sm:w-80 bg-[#071B35] border border-white/15 rounded-full px-5 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4A44A]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-full gold-bg gold-bg-hover text-[#071B35] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gold-bg flex items-center justify-center font-serif-luxury font-bold text-xl text-[#071B35]">
                FK
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl font-bold tracking-wider text-white">
                  FK&CO <span className="gold-text font-light">ESTATE</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D4A44A] uppercase font-sans">
                  {/* Luxury Real Estate Agency */}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs font-light leading-relaxed max-w-sm">
              FK&CO Estate is a  real estate agency built on transparency, deep Birmingham market intelligence, and uncompromised client dedication.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ), 
                  label: 'Instagram' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ), 
                  label: 'LinkedIn' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ), 
                  label: 'Facebook' 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
                      <path d="m10 15 5-3-5-3z"/>
                    </svg>
                  ), 
                  label: 'YouTube' 
                }
              ].map((soc, i) => (
                <a
                  key={i}
                  href="#footer"
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#D4A44A] hover:bg-[#D4A44A]/10 hover:border-[#D4A44A]/40 transition-colors"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-white text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs font-light text-slate-400">
              <li><a href="#home" className="hover:text-[#D4A44A] transition-colors">Home</a></li>
              <li><a href="/buy" className="hover:text-[#D4A44A] transition-colors">Buy Property</a></li>
              <li><a href="#valuation" className="hover:text-[#D4A44A] transition-colors">Sell Property</a></li>
              <li><a href="#landlord" className="hover:text-[#D4A44A] transition-colors">Landlord Services</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Lettings & Renting</a></li>
              <li><a href="#why-us" className="hover:text-[#D4A44A] transition-colors">Why Choose Us</a></li>
            </ul>
          </div>

          {/* Key Locations */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-white text-base">Prime Locations</h4>
            <ul className="space-y-2 text-xs font-light text-slate-400">
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Edgbaston Luxury Villas</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Solihull Country Estates</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Sutton Coldfield Manors</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">City Centre Penthouses</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Jewellery Quarter Lofts</a></li>
              <li><a href="#properties" className="hover:text-[#D4A44A] transition-colors">Harborne Period Homes</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-white text-base">Contact Us</h4>
            <div className="space-y-3 text-xs font-light text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A44A] shrink-0 mt-0.5" />
                <span>125 Colmore Row, Birmingham, B3 3SD, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <a href="tel:+441212345678" className="hover:text-white">0121 234 5678</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <a href="mailto:enquiries@fkcoestate.co.uk" className="hover:text-white">enquiries@fkcoestate.co.uk</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <span>Mon - Sat: 8:30am - 7:00pm</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenValuationModal}
                className="w-full py-2.5 rounded-xl border border-[#D4A44A]/40 text-[#D4A44A] font-bold text-xs hover:bg-[#D4A44A] hover:text-[#071B35] transition-colors cursor-pointer"
              >
                Book Free Valuation
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-6 bg-[#030D1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
          <p>© {new Date().getFullYear()} FK&CO Estate Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#footer" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#footer" className="hover:text-slate-300 transition-colors">Terms of Business</a>
            <a href="#footer" className="hover:text-slate-300 transition-colors">PRS Compliant</a>
            <a href="#footer" className="hover:text-slate-300 transition-colors">CMP Protected</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
