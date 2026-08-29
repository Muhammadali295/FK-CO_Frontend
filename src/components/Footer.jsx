import React, { useState } from 'react';
import { Phone, Mail, Clock, X, ShieldCheck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import rightmoveLogo from '../assets/Rightmove.png';
import onthemarketLogo from '../assets/Onthemarket.png';
import { companyInfo } from '../utils/companyInfo';

// Imported Files
import prsCertificatePDF from '../assets/PRS_Membership_Certificate.pdf';
import prsLogo from '../assets/PRS_Logo_high.png'; 
import tdsLogo from '../assets/tds.png'; // 🚀 NEW: TDS Logo imported here

export default function Footer() {
  const [isPrsModalOpen, setIsPrsModalOpen] = useState(false);

  const handleSecurity = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <footer
        id="footer"
        className="bg-[#0A1B3D] border-t border-[#D4A44A]/30 text-slate-300 text-sm relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* TOP SECTION: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/fkco-estate-logo4.png"
                  alt="FK&CO Estate logo"
                  className="brand-logo brand-logo-footer"
                />
              </div>
              <p className="text-slate-400 text-xs font-light leading-relaxed max-w-sm">
                FK&COEstate<br/><br/>
                FK & CO PROPERTY GROUP LTD Company number 17319471 <br/>
                Registered office address C/O Bluewater Quadrant
                Court, 49 Calthorpe Road, Birmingham, England, B15 1TH
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                {[
                  { 
                    icon: <InstagramIcon />, 
                    label: "Instagram", 
                    href: "https://www.instagram.com/fkandcoestate/" 
                  },
                  { 
                    icon: <FacebookIcon />, 
                    label: "Facebook", 
                    href: "https://www.facebook.com/profile.php?id=61593761881805" 
                  },
                ].map((soc, i) => (
                  <a
                    key={i}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#D4A44A] hover:bg-[#D4A44A]/10 hover:border-[#D4A44A]/40 transition-colors"
                  >
                    {soc.icon}
                  </a>
                ))}
              </div>
            </div>
            

            <div className="space-y-3">
              <h4 className="font-serif-luxury font-bold text-white text-base text-xl">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs font-light text-slate-400">
                <li>
                  <a href="#home" className="hover:text-[#D4A44A] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/buy" className="hover:text-[#D4A44A] transition-colors">
                    Buy Property
                  </a>
                </li>
                <li>
                  <a href="#valuation" className="hover:text-[#D4A44A] transition-colors">
                    Sell Property
                  </a>
                </li>
                <li>
                  <a href="#landlord" className="hover:text-[#D4A44A] transition-colors">
                    Landlord Services
                  </a>
                </li>
                <li>
                  <a href="#properties" className="hover:text-[#D4A44A] transition-colors">
                    Lettings & Renting
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-[#D4A44A] transition-colors">
                    Why Choose Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3 lg:col-span-2">
              <h4 className="font-serif-luxury font-bold text-white text-base text-xl">
                Contact Us
              </h4>
              <div className="space-y-3 text-xs font-light text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4A44A] shrink-0" />
                  <a href={companyInfo.phoneHref} className="hover:text-white">
                    {companyInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4A44A] shrink-0" />
                  <a href={companyInfo.emailHref} className="hover:text-white">
                    {companyInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4A44A] shrink-0" />
                  <span>Mon - Fri: 9:00am - 19:00pm</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#D4A44A] shrink-0" />
                  <span>Saturday: 9:00am - 16:30pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Line + PRS Logo & Button */}
          <div className="mt-10 lg:mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex-1">
              <img 
                src={prsLogo} 
                alt="Property Redress Scheme" 
                className="h-10 sm:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
              />
            </div>

            <button 
              onClick={() => setIsPrsModalOpen(true)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/5 border border-[#D4A44A]/30 text-[#D4A44A] hover:bg-[#D4A44A]/10 hover:text-white transition-all duration-300 group cursor-pointer shrink-0"
            >
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase">PRS Membership Certificate</span>
            </button>
          </div>

        </div>

        {/* BOTTOM BAR: Copyright, Logos & Legal Links */}
        <div className="border-t border-white/10 py-8 bg-[#060E20]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-light">
            <p>
              © {new Date().getFullYear()} {companyInfo.name} Ltd. All rights
              reserved.
            </p>

            {/* 🚀 FIXED: Added TDS Logo here next to OnTheMarket */}
            <div className="flex flex-wrap items-center justify-center gap-6">
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
              <img
                src={tdsLogo}
                alt="Tenancy Deposit Scheme"
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#footer" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#footer" className="hover:text-slate-300 transition-colors">
                Terms of Business
              </a>
              <a href="#footer" className="hover:text-slate-300 transition-colors">
                CMP Protected
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SECURE PDF VIEWER MODAL --- */}
      <AnimatePresence>
        {isPrsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051329]/90 backdrop-blur-md p-4 sm:p-8"
            onContextMenu={handleSecurity}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0A1B3D] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
              onCopy={handleSecurity}
              onCut={handleSecurity}
              onDragStart={handleSecurity}
            >
              {/* Header */}
              <div className="bg-[#0A1B3D] px-6 py-4 flex items-center justify-between border-b border-[#D4A44A]/20 shrink-0">
                <div className="flex items-center gap-3 text-white">
                  <ShieldCheck className="w-5 h-5 text-[#D4A44A]" />
                  <span className="font-semibold text-sm tracking-wider uppercase">PRS Membership Certificate</span>
                </div>
                <button 
                  onClick={() => setIsPrsModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PDF Viewer Container */}
              <div className="relative w-full h-[65vh] sm:h-[80vh] bg-[#323639]">
                
                {/* Security Overlay */}
                <div 
                  className="absolute inset-0 z-10" 
                  onContextMenu={handleSecurity}
                ></div>

                {/* PDF iframe */}
                <iframe 
                  src={`${prsCertificatePDF}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="absolute inset-0 w-full h-full border-none"
                  title="PRS Membership Certificate"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);