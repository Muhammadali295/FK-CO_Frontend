import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Building2, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenValuationModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Buy', href: '#properties' },
    { name: 'Sell', href: '#valuation' },
    { name: 'Let', href: '#landlord' },
    { name: 'Rent', href: '#properties' },
    { name: 'Services', href: '#why-us' },
    { name: 'About', href: '#landlord' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#071B35]/90 backdrop-blur-xl border-b border-[#D4A44A]/20 py-3 shadow-2xl' 
        : 'bg-gradient-to-b from-[#051329]/90 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg gold-bg flex items-center justify-center shadow-lg shadow-[#D4A44A]/20 group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif-luxury font-bold text-xl text-[#071B35]">FK</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold tracking-wider text-white flex items-center gap-1">
                FK&CO <span className="gold-text font-light">ESTATE</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4A44A] uppercase font-sans-luxury">
                Luxury Real Estate
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 glass-panel-light px-4 py-1.5 rounded-full border border-white/10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveNav(item.name)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeNav === item.name
                    ? 'text-white bg-[#D4A44A]/20 border border-[#D4A44A]/40 shadow-sm'
                    : 'text-slate-300 hover:text-[#D4A44A] hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+441212345678" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#D4A44A] transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A44A]" />
              <span>0121 234 5678</span>
            </a>

            <button
              onClick={onOpenValuationModal}
              className="gold-bg gold-bg-hover text-[#071B35] px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide shadow-lg shadow-[#D4A44A]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Book Free Valuation</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenValuationModal}
              className="gold-bg text-[#071B35] px-3 py-1.5 rounded-full text-xs font-bold sm:hidden"
            >
              Valuation
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4A44A]" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#071B35]/95 backdrop-blur-2xl border-b border-[#D4A44A]/20 shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl text-slate-200 hover:text-white hover:bg-[#D4A44A]/10 hover:border hover:border-[#D4A44A]/30 text-sm font-medium transition-all"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4A44A]/60" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href="tel:+441212345678"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-[#D4A44A]" />
                  <span>Call 0121 234 5678</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenValuationModal();
                  }}
                  className="w-full gold-bg text-[#071B35] font-semibold py-3 rounded-xl shadow-lg text-sm flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Book Free Valuation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
