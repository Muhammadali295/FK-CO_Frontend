import React, { useState } from 'react';
import { Phone, Mail, Clock, X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import rightmoveLogo from '../assets/Rightmove.png';
import onthemarketLogo from '../assets/Onthemarket.png';
import { companyInfo } from '../utils/companyInfo';

import prsCertificatePDF from '../assets/PRS_Membership_Certificate.pdf';
import prsLogo from '../assets/PRS_Logo_high.png'; 
import tdsLogo from '../assets/tds.png'; 

export default function Footer() {
  const [isPrsModalOpen, setIsPrsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // 🚀 NEW: Privacy Policy State

  // Security to block right click copy (for PRS PDF)
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
                FK&COEstate is a trading name of:<br/>
                FK & CO PROPERTY GROUP LTD<br/>
                Registered in England and Wales. Company No. 17319471. Registered Office address:<br/>
                C/O Bluewater Quadrant Court, 49 Calthorpe Road, Birmingham, England, B15 1TH
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
              <h4 className="font-serif-luxury font-bold text-white text-xl">
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
              <h4 className="font-serif-luxury font-bold text-white text-xl">
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
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0 px-2 py-1.5 rounded-md opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* 🚀 FIXED: Privacy Policy is now a clickable button */}
              <button 
                onClick={() => setIsPrivacyModalOpen(true)}
                className="hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
              >
                Privacy Policy
              </button>
              <a href="#footer" className="hover:text-slate-300 transition-colors">
                {/* Terms of Business */}
              </a>
              <a href="#footer" className="hover:text-slate-300 transition-colors">
                {/* CMP Protected */}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- SECURE PRS PDF VIEWER MODAL --- */}
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

              <div className="relative w-full h-[65vh] sm:h-[80vh] bg-[#323639]">
                <div className="absolute inset-0 z-10" onContextMenu={handleSecurity}></div>
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

      {/* --- PRIVACY POLICY MODAL --- */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051329]/90 backdrop-blur-md p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-[#071B35] border border-[#D4A44A]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="bg-[#0A1B3D] px-6 py-5 flex items-center justify-between border-b border-[#D4A44A]/20 shrink-0">
                <div className="flex items-center gap-3 text-white">
                  <Lock className="w-5 h-5 text-[#D4A44A]" />
                  <span className="font-semibold text-sm tracking-wider uppercase">Privacy Policy</span>
                </div>
                <button 
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#051329] text-slate-300 text-sm leading-relaxed custom-scrollbar">
                
                <div className="border-b border-white/10 pb-6">
                  <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white mb-2">FK & CO Estate – Privacy Notice</h1>
                  <p className="text-[#D4A44A] font-semibold text-xs uppercase tracking-wider">Last updated: 30 August 2026</p>
                </div>

                <p>
                  FK & CO PROPERTY GROUP LTD, trading as FK & CO Estate, respects your privacy and is committed to protecting your personal information.
                </p>
                <p>
                  This Privacy Notice explains how we collect, use, store and protect your personal information when you visit our website, contact us, enquire about our services, request a property valuation, instruct us to provide services, or submit information through an online advertisement or lead form, including through Facebook or Instagram.
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">1. Who we are</h3>
                  <p>FK & CO PROPERTY GROUP LTD provides estate agency and property-related services under the trading name FK & CO Estate.</p>
                  <p>For the purposes of UK data protection law, the data controller responsible for your personal information is:</p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="font-bold text-white">FK & CO PROPERTY GROUP LTD</p>
                    <p>Trading as: FK & CO Estate</p>
                    <p>C/O Bluewater Quadrant Court</p>
                    <p>49 Calthorpe Road</p>
                    <p>Birmingham, England, B15 1TH</p>
                    <p className="mt-3"><strong>Telephone:</strong> 0121 630 6776</p>
                    <p><strong>Email:</strong> info@fkandcoestate.com</p>
                  </div>
                  <p>If you have any questions about this Privacy Notice or how we use your personal information, please contact us using the details above.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">2. Personal information we collect</h3>
                  <p>Depending on how you interact with us, we may collect information including:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li>your name;</li>
                    <li>email address;</li>
                    <li>telephone number;</li>
                    <li>property address and postcode;</li>
                    <li>information about the type of property you own, occupy, wish to sell, let, buy or otherwise enquire about;</li>
                    <li>your anticipated timeframe for selling or moving;</li>
                    <li>information you provide when requesting a property valuation;</li>
                    <li>details of enquiries and communications with us;</li>
                    <li>information necessary to provide estate agency or property-related services;</li>
                    <li>marketing preferences and records of any consent you provide; and</li>
                    <li>technical and usage information generated when you use our website, where applicable.</li>
                  </ul>
                  <p>We seek to collect only personal information that is relevant to the purposes for which it will be used.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">3. Facebook, Instagram and online lead forms</h3>
                  <p>If you submit an enquiry through an FK & CO Estate advertisement or lead form on Facebook, Instagram or another online platform, we receive the information you choose to provide through that form.</p>
                  <p>For a property valuation enquiry, this may include your:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li>full name;</li>
                    <li>email address;</li>
                    <li>telephone number;</li>
                    <li>property postcode;</li>
                    <li>property type; and</li>
                    <li>anticipated selling timeframe.</li>
                  </ul>
                  <p>We use this information primarily to respond to your enquiry, assess your valuation request and contact you about the property valuation or estate agency service you have requested.</p>
                  <p>Meta Platforms and other online platforms may separately process information about your use of their services in accordance with their own privacy policies. Their independent processing is governed by their respective privacy terms.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">4. How we use your personal information</h3>
                  <p>We may use your personal information to respond to enquiries and property valuation requests, including contacting you to discuss your property and arranging or providing the valuation you requested.</p>
                  <p>If you instruct us, or ask us to take steps towards providing services to you, we may process your information to provide those services and manage our relationship with you.</p>
                  <p>We may also use personal information to communicate with you in connection with your enquiry or services, operate and administer our business, maintain appropriate business records, protect our systems and legal rights, and comply with legal and regulatory obligations.</p>
                  <p>Where permitted by law, we may also use personal information to communicate with you about relevant FK & CO Estate services. Where consent is required for a particular form of direct marketing, we will seek the appropriate consent.</p>
                  <p>You can object to direct marketing at any time.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">5. Our lawful bases for processing</h3>
                  <p>UK data protection law requires us to have a lawful basis for processing personal information. The lawful basis we rely upon will depend upon the circumstances. We may rely on:</p>
                  <ul className="space-y-4 mt-2">
                    <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <strong className="text-white">Contract and steps before entering into a contract</strong> — where processing is necessary to take steps at your request before entering into a contract or to perform a contract with you.
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <strong className="text-white">Legitimate interests</strong> — where processing is necessary for our legitimate business interests or those of a third party, provided those interests are not overridden by your rights and freedoms. This may include dealing with enquiries, administering our business, maintaining security, preventing misuse and establishing or defending legal rights.
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <strong className="text-white">Legal obligation</strong> — where processing is necessary for us to comply with applicable legal or regulatory requirements.
                    </li>
                    <li className="bg-white/5 p-4 rounded-lg border border-white/5">
                      <strong className="text-white">Consent</strong> — where we have specifically asked you to consent to a particular use of your information.
                    </li>
                  </ul>
                  <p>Where we rely on consent, you may withdraw that consent at any time. Withdrawal does not affect the lawfulness of processing carried out before consent was withdrawn.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">6. Marketing communications</h3>
                  <p>Submitting a property valuation or estate agency enquiry does not, by itself, mean that you have agreed to receive unrelated electronic marketing from us.</p>
                  <p>We may contact you as reasonably necessary to respond to and deal with the valuation or other estate agency enquiry you have made.</p>
                  <p>Where we wish to send electronic direct marketing beyond communications connected with your enquiry, we will do so only where permitted by applicable law. Where consent is legally required, we will seek it separately.</p>
                  <p>You can ask us to stop sending direct marketing communications at any time by contacting us at <a href="mailto:info@fkandcoestate.com" className="text-[#D4A44A] hover:underline">info@fkandcoestate.com</a> or by using any unsubscribe mechanism provided in the communication.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">7. Sharing your personal information</h3>
                  <p>Where reasonably necessary, we may share personal information with organisations that assist us in operating our business or providing our services. These may include:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li>IT, website and hosting providers;</li>
                    <li>customer relationship management and communications providers;</li>
                    <li>professional advisers, including accountants, solicitors and compliance advisers;</li>
                    <li>contractors and property-service providers where relevant to a service you have requested;</li>
                    <li>regulators, public authorities, law-enforcement agencies or other bodies where disclosure is required or permitted by law; and</li>
                    <li>other suppliers processing information on our behalf.</li>
                  </ul>
                  <p>Where organisations process personal information on our behalf, we take appropriate steps to require them to protect that information and process it only for authorised purposes.</p>
                  <p className="font-bold text-white mt-2">We do not sell your personal information.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">8. International transfers</h3>
                  <p>Some technology or service providers used by FK & CO Estate may process personal information outside the United Kingdom.</p>
                  <p>Where personal information is transferred internationally, we take appropriate steps to ensure that the transfer complies with applicable UK data protection law and that appropriate safeguards are used where required.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">9. How long we keep your information</h3>
                  <p>We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including satisfying applicable legal, regulatory, accounting and reporting requirements.</p>
                  <p>For property valuation enquiries that do not result in an instruction, we normally retain the enquiry and associated personal information for up to 12 months from our last meaningful interaction with you, unless we are required or permitted by law to retain it for longer.</p>
                  <p>Where you become a client, different retention periods may apply to information and records connected with the services we provide and our legal and regulatory obligations.</p>
                  <p>We may retain limited information where necessary to record and respect a request not to receive direct marketing communications.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">10. Security</h3>
                  <p>We take appropriate technical and organisational measures designed to protect personal information against unauthorised or unlawful access, use, alteration, disclosure, loss or destruction.</p>
                  <p>Access to personal information is limited to people and service providers who have a legitimate need to access it.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">11. Your data protection rights</h3>
                  <p>Depending on the circumstances, UK data protection law may give you rights including the right to:</p>
                  <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li>request access to personal information we hold about you;</li>
                    <li>request correction of inaccurate or incomplete information;</li>
                    <li>request erasure of your personal information in certain circumstances;</li>
                    <li>request restriction of processing in certain circumstances;</li>
                    <li>object to certain processing, including direct marketing;</li>
                    <li>request portability of certain personal information;</li>
                    <li>withdraw consent where we rely upon consent; and</li>
                    <li>complain about our handling of your personal information.</li>
                  </ul>
                  <p>These rights are subject to applicable legal conditions and exemptions.</p>
                  <p>To exercise any of your rights, contact: <a href="mailto:info@fkandcoestate.com" className="text-[#D4A44A] hover:underline">info@fkandcoestate.com</a></p>
                  <p>We may need to verify your identity before acting on a request.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">12. Complaints</h3>
                  <p>If you have concerns about how FK & CO Estate handles your personal information, please contact us first so that we have an opportunity to investigate and address your concerns.</p>
                  <p>You also have the right to complain to the Information Commissioner's Office (ICO), the UK's data protection regulator.</p>
                  <p className="font-bold">Information Commissioner's Office</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">13. Changes to this Privacy Notice</h3>
                  <p>We may update this Privacy Notice from time to time to reflect changes to our services, business practices, technology or legal and regulatory requirements.</p>
                  <p>The latest version will be published on the FK & CO Estate website and will show the date on which it was last updated.</p>
                </div>
                
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