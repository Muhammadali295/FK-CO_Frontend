import React, { useState } from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import rightmoveLogo from '../assets/Rightmove.png';
import onthemarketLogo from '../assets/Onthemarket.png';
import { companyInfo } from '../utils/companyInfo';
import estatelogo from '../assets/fkco-estate-logo4.png';

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
    <footer id="footer" className="bg-[#0A1B3D] border-t border-[#D4A44A]/30 text-slate-300 text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/fkco-estate-logo4.png" alt="FK&CO Estate logo" className="brand-logo brand-logo-footer" />
            </div>
            <p className="text-slate-400 text-xs font-light leading-relaxed max-w-sm">
              {companyInfo.name} is a real estate agency built on transparency, deep Birmingham market intelligence, and uncompromised client dedication.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <YouTubeIcon />, label: 'YouTube' }
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

          <div className="space-y-3">
            <h4 className="font-serif-luxury font-bold text-white text-base">Contact Us</h4>
            <div className="space-y-3 text-xs font-light text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <a href={companyInfo.phoneHref} className="hover:text-white">{companyInfo.phone}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A44A] shrink-0" />
                <a href={companyInfo.emailHref} className="hover:text-white">{companyInfo.email}</a>
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

      {/* Copyright Bar - 🚀 SIRF ONTHEMARKET BADA KIYA HAI, RIGHTMOVE FIX RAKHA */}
      <div className="border-t border-white/10 py-8 bg-[#060E20]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-light">
          <p>© {new Date().getFullYear()} {companyInfo.name} Ltd. All rights reserved.</p>
          
          {/* 
             Rightmove ko h-12 (fix) rakha hai. 
             OnTheMarket ko h-20 (super big) kar diya hai taake wo size mein match kare!
          */}
          <div className="flex items-center gap-6">
            <img 
              src={rightmoveLogo} 
              alt="Rightmove" 
              className="h-12 w-auto object-contain flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            />
            <img 
              src={onthemarketLogo} 
              alt="OnTheMarket / Zoopla" 
              className="h-20 w-auto object-contain flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

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

// SVG Icons
const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);