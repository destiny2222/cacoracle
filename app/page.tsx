"use client";

import React, { useState, useEffect, useRef } from "react";

// Inline Custom SVG Check Circle
const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-[#FDCE52] shrink-0 mt-0.5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

// Chevron Icon for Accordion
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-6 h-6 text-[#0C186C] shrink-0 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Reusable Scroll-driven Animation Component
function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const CAC_SERVICES = [
    {
      title: "CAC Pre-Incorporation",
      desc: "Register your Business Name, Private Limited Company (Ltd), or Incorporated Trustees (NGOs/Churches) from scratch with absolute legal compliance.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "CAC Post-Incorporation",
      desc: "Process modifications, management changes, object adjustments, and other corporate updates safely within official registries.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.001-4v4h-.001" />
        </svg>
      )
    },
    {
      title: "Annual Returns & Compliance",
      desc: "File mandatory annual reports to preserve active corporate status and bypass registry penalties or strike-offs.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Business/Company Modifications",
      desc: "Implement share capital restructuring, corporate name updates, or general organizational changes with total accuracy.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Business Registration Support",
      desc: "Get expert, custom advisory before you register, helping you pick the ideal structure and understand your compliance duties.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const OTHER_SERVICES = [
    {
      title: "NIN Modifications",
      desc: "Modify, correct, or update details of your National Identity Number (NIN) including name spelling, ordering, and phone details.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "SCUML Processing",
      desc: "Acquire mandatory Special Control Unit Against Money Laundering (SCUML) certificates required for compliance in corporate banking.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "International Passport Processing",
      desc: "Navigate Nigerian passport applications, renewals, and data alignment seamlessly with clear guide paths.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 002-2V7a2 2 0 00-2-2H18a2 2 0 01-2-2V3.052M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Tax Promax Processing",
      desc: "Manage corporate tax registrations, TIN acquisition, and submit your filings correctly on the FIRS Taxpromax portal.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Trademark Registration",
      desc: "Protect your brand assets, logo designs, business names, and slogans legally against commercial copycats.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12a3 3 0 100-6 3 3 0 000 6zm6-3h2m0 0h2m-2 0v2m0-2V7m-6 13h10a2 2 0 002-2v-3a2 2 0 00-2-2H9a2 2 0 00-2 2v3a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const faqData = [
    {
      question: "How long does it take to register a business name or company with CAC?",
      answer: (
        <div>
          <p className="mb-2">Typically:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Business Name:</strong> 3–7 working days
            </li>
            <li>
              <strong>Limited Liability Company:</strong> 1–2 weeks
            </li>
          </ul>
          <p className="mt-2 text-sm text-gray-500 italic">
            Timeline may vary depending on registry workload, documentation accuracy, or portal delays.
          </p>
        </div>
      ),
    },
    {
      question: "What is the difference between a Business Name and a Company (Ltd)?",
      answer: (
        <div className="space-y-3">
          <div>
            <strong className="text-[#0C186C]">Business Name (BN):</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Suitable for small/solo businesses.</li>
              <li>Not separate from the owner (you bear full liability).</li>
              <li>Cheaper and easier to register.</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#0C186C]">Company (Limited Liability - Ltd):</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>A separate legal entity.</li>
              <li>Owners/shareholders have limited liability.</li>
              <li>Better for scaling, contracts, corporate banking, and foreign clients.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "What documents are required for CAC registration?",
      answer: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="text-[#0C186C]">For Business Name:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Proposed business names</li>
              <li>Nature of business</li>
              <li>Owner's details</li>
              <li>Valid Government ID</li>
              <li>Passport photograph</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#0C186C]">For Company (Ltd):</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Proposed company names</li>
              <li>Directors' & Shareholders' details</li>
              <li>Share structure/ownership ratios</li>
              <li>Identification documents</li>
              <li>Articles of Association (auto-generated or custom)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "How do I update or correct my CAC information after registration?",
      answer: (
        <div>
          <p className="mb-2">You can apply for post-incorporation changes, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Change of Business Name</strong></li>
            <li><strong>Change of Directors/Secretary</strong></li>
            <li><strong>Change of Registered Address</strong></li>
            <li><strong>Change of Shareholding Structure</strong></li>
            <li><strong>Annual Return Filing</strong></li>
          </ul>
          <p className="mt-2 text-sm text-gray-500">
            These updates are filed through the official <strong>CAC portal</strong> with supporting documents and resolutions.
          </p>
        </div>
      ),
    },
  ];

  // Red Alert Popup State
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showPopup]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div id="home" className="flex flex-col min-h-screen bg-white text-[#111111] font-sans selection:bg-[#FDCE52]/30">
      
      {/* RED ALERT POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#0C186C] text-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-red-600 animate-[pulse_2s_ease-in-out_infinite] transition-all duration-300">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="p-8 text-center flex flex-col gap-4 mt-2">
              <div className="text-red-500 mx-auto bg-red-500/10 p-3 rounded-full w-fit">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-2xl font-black text-red-500 uppercase tracking-tight">🚨 Red Alert! 🚨</h3>
              <p className="text-lg font-bold text-[#FDCE52]">
                Why settle for a free class when you can MASTER everything?
              </p>
              <p className="text-white/90 text-sm">
                Get <span className="font-extrabold text-white text-lg">50% OFF</span> the Complete Mentorship Class <span className="underline decoration-red-500 decoration-2">TODAY ONLY</span>! 
              </p>
              <div className="bg-red-600 text-white font-mono font-bold text-2xl py-3 rounded-xl mt-2 border border-red-400/50 shadow-inner">
                {formatTime(timeLeft)}
              </div>
              <a
                href="https://wa.link/4lhvag"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPopup(false)}
                className="mt-4 w-full py-4 text-center rounded-xl bg-[#FDCE52] hover:bg-white text-[#0C186C] font-extrabold text-lg transition-all duration-300 shadow-lg transform hover:scale-105"
              >
                CLAIM 50% DISCOUNT NOW
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* --- HEADER --- */}
      <header
        className="sticky top-0 z-50 transition-all duration-300 w-full backdrop-blur-md border-b border-white/10"
        style={{ backgroundColor: "rgba(12, 24, 108, 0.95)" }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <a href="#home" className="flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/logo.png"
              alt="The CAC Oracle Global Consult Logo"
              className="h-10 w-auto object-contain"
            />
          </a>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-[#FDCE52] font-semibold text-sm tracking-wider transition-colors duration-200">HOME</a>
            <a href="#about" className="text-white hover:text-[#FDCE52] font-semibold text-sm tracking-wider transition-colors duration-200">ABOUT</a>
            <a href="#services" className="text-white hover:text-[#FDCE52] font-semibold text-sm tracking-wider transition-colors duration-200">SERVICES</a>
            <a href="#resources" className="text-white hover:text-[#FDCE52] font-semibold text-sm tracking-wider transition-colors duration-200">RESOURCES</a>
            <a href="#contact" className="text-white hover:text-[#FDCE52] font-semibold text-sm tracking-wider transition-colors duration-200">CONTACT</a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/2348130156361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center bg-[#FDCE52] hover:bg-white text-[#0C186C] px-6 py-1.5 rounded-lg shadow-sm transition-all duration-300 hover:scale-105"
            >
              <span className="font-bold text-sm">TALK TO THE CAC ORACLE</span>
              <span className="text-[10px] font-semibold opacity-80 -mt-0.5">Stuck in registration?</span>
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="block md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#FDCE52] hover:text-white active:scale-90 transition-all duration-200 p-2.5 rounded-xl bg-[#0C186C] hover:bg-[#060c3b] focus:outline-none border border-[#FDCE52]/20 shadow-md"
              aria-label="Open menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu Drawer (Animated slide-in from right) */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none invisible"}`}>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 backdrop-blur-xs transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: "rgba(17, 17, 17, 0.7)" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Drawer Panel */}
        <div
          className={`relative flex flex-col w-80 max-w-[85vw] text-white h-full p-6 shadow-2xl z-10 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "#0c186c" }}
        >
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <img
              src="/logo.png"
              alt="The CAC Oracle Global Consult Logo"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#FDCE52] hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200 focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 transform hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-2">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-white font-semibold text-lg py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              HOME
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-white font-semibold text-lg py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              ABOUT
            </a>
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-white font-semibold text-lg py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              SERVICES
            </a>
            <a
              href="#resources"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-white font-semibold text-lg py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              RESOURCES
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-4 text-white font-semibold text-lg py-3 px-4 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              CONTACT
            </a>
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <a
              href="https://wa.me/2348130156361"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-base rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-98"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.407 9.864-9.825.002-2.623-1.023-5.086-2.884-6.951-1.864-1.865-4.343-2.891-6.963-2.891-5.439 0-9.865 4.408-9.869 9.827-.001 1.73.454 3.418 1.316 4.908l-.961 3.513 3.602-.937zm11.025-4.996c-.302-.151-1.791-.884-2.073-.986-.282-.103-.488-.152-.693.151-.205.304-.795.986-.974 1.189-.179.203-.359.228-.661.077-1.127-.565-2.023-1.024-2.825-2.404-.204-.352.204-.326.58-.988.11-.19.055-.357-.027-.508-.083-.151-.693-1.671-.95-2.285-.25-.6-.525-.52-.72-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.401-.293.32-1.12 1.094-1.12 2.67 0 1.574 1.147 3.097 1.307 3.3 1.6 2.1 3.5 3.3 5.4 4.1.9.4 1.7.6 2.3.5.7-.1 1.5-.6 1.7-.9.2-.3.2-.6.1-.9-.1-.3-.3-.4-.6-.6z"/>
              </svg>
              <span>Talk to the CAC Oracle</span>
            </a>
            <p className="text-[10px] text-white/50 text-center mt-3 font-medium">Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section
        className="relative text-white overflow-hidden py-16 lg:py-28 px-6"
        style={{ background: "linear-gradient(to bottom right, #0c186c, #060c3b)" }}
      >
        {/* Subtle geometric decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDCE52]/15 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FDCE52]/5 rounded-full blur-2xl pointer-events-none transform -translate-x-20 translate-y-20"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Left Column */}
          <FadeInSection className="lg:col-span-7 text-center lg:text-left flex flex-col gap-6 items-center lg:items-start">
            <span className="text-[#FDCE52] font-bold text-xs lg:text-sm tracking-widest uppercase bg-[#FDCE52]/10 px-4 py-1.5 rounded-full border border-[#FDCE52]/20">
              THE CAC ORACLE GLOBAL CONSULT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white uppercase font-sans">
              CLARITY BEFORE <br />YOUR REGISTRATION
            </h1>
            <p className="text-lg lg:text-xl text-white/80 font-medium leading-relaxed max-w-2xl font-sans">
              Business Registration & Compliance Guidance Made Clear. We answer your questions and guide your decisions before you proceed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <a
                href="https://wa.me/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center bg-[#FDCE52] hover:bg-white text-[#0C186C] px-8 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 text-center"
              >
                <span className="font-bold text-lg">TALK TO THE CAC ORACLE</span>
                <span className="text-xs font-semibold opacity-80 mt-0.5">Stuck in registration? Get expert help</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center border-2 border-[#FDCE52] text-[#FDCE52] hover:bg-[#FDCE52] hover:text-[#0C186C] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 text-center"
              >
                VIEW OUR SERVICES
              </a>
            </div>
          </FadeInSection>

          {/* Hero Right Column (Services Flyer) */}
          <FadeInSection className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Offset gold frames background */}
              <div className="absolute -inset-2 rounded-2xl border-2 border-[#FDCE52]/30 transform translate-x-3 translate-y-3 pointer-events-none"></div>
              <div className="absolute -inset-2 rounded-2xl border border-[#FDCE52]/20 transform -translate-x-2 -translate-y-2 pointer-events-none"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FDCE52] w-full max-w-[450px] aspect-square bg-[#0c186c]">
                <img
                  src="/register.jpg"
                  alt="Our Services - The CAC Oracle"
                  className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="bg-white py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Pillar Differentiators Header */}
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0C186C] font-bold text-xs uppercase tracking-widest bg-[#0C186C]/5 border border-[#0C186C]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              WHY THE CAC ORACLE STANDS OUT
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0C186C] leading-tight uppercase font-sans">
              Simplifying Business compliance
            </h2>
            <p className="text-lg text-[#111111]/70 font-medium leading-relaxed max-w-2xl mx-auto mt-4 font-sans">
              Professional business registration and compliance guidance made accessible and affordable for everyday business owners.
            </p>
          </FadeInSection>

          {/* Differentiator Cards */}
          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#FDCE52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="w-12 h-12 rounded-xl bg-[#0C186C]/5 text-[#0C186C] flex items-center justify-center font-bold text-xl border border-[#0C186C]/10">1</div>
              <h3 className="text-xl font-bold text-[#0C186C] uppercase">ACCESSIBLE</h3>
              <p className="text-[#111111]/85 leading-relaxed font-sans">
                Professional guidance without the intimidating barriers often associated with traditional professional services. We speak your language.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#FDCE52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="w-12 h-12 rounded-xl bg-[#0C186C]/5 text-[#0C186C] flex items-center justify-center font-bold text-xl border border-[#0C186C]/10">2</div>
              <h3 className="text-xl font-bold text-[#0C186C] uppercase">AFFORDABLE</h3>
              <p className="text-[#111111]/85 leading-relaxed font-sans">
                Quality business-registration and compliance support without heavy professional fees. Premium services priced for growing enterprises.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-[#FDCE52] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="w-12 h-12 rounded-xl bg-[#0C186C]/5 text-[#0C186C] flex items-center justify-center font-bold text-xl border border-[#0C186C]/10">3</div>
              <h3 className="text-xl font-bold text-[#0C186C] uppercase">PRACTICAL</h3>
              <p className="text-[#111111]/85 leading-relaxed font-sans">
                We explain things in simple, practical language and help business owners make the right decisions before they proceed or pay.
              </p>
            </div>
          </FadeInSection>

          {/* Mentorship waitlists */}
          <div className="mb-24">
            <FadeInSection className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
              
              {/* Free Class Card */}
              <div className="bg-[#f7f9fc] rounded-3xl overflow-hidden border border-[#0C186C]/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div>
                  <div
                    className="relative w-full overflow-hidden aspect-square"
                    style={{ backgroundColor: "#0c186c" }}
                  >
                    <img
                      src="/freeclassflier.png"
                      alt="Free Business Registration Masterclass"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0C186C] mb-3 uppercase">Free Masterclass</h3>
                    <p className="text-[#111111]/80 text-sm leading-relaxed font-sans">
                      Learn the fundamentals of corporate registrations. A free, action-packed class designed to clarify the basics of CAC filings, NIN modifications, and SCUML registrations.
                    </p>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <a
                    href="https://chat.whatsapp.com/Im6xxVJJ6TfJvG4vaOdJPC?s=cl&p=a&ilr=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 text-center rounded-xl bg-[#0C186C] hover:bg-[#0C186C]/90 text-white font-bold text-sm transition-all duration-300 inline-block shadow-sm"
                  >
                    GET FREE ACCESS
                  </a>
                </div>
              </div>

              {/* Paid Mentorship Card */}
              <div className="bg-[#f7f9fc] rounded-3xl overflow-hidden border-2 border-[#FDCE52] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 relative">
                <div className="absolute top-4 right-4 bg-[#FDCE52] text-[#0C186C] text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full z-10">
                  RECOMMENDED
                </div>
                <div>
                  <div
                    className="relative w-full overflow-hidden aspect-square"
                    style={{ backgroundColor: "#0c186c" }}
                  >
                    <img
                      src="/paidclass.png"
                      alt="Premium Mentorship Program"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#0C186C] mb-3 uppercase">Premium CAC Mentorship</h3>
                    <p className="text-[#111111]/80 text-sm leading-relaxed font-sans">
                      Ready to scale your registration business? Join my exclusive paid waitlist for step-by-step mentorship, industry secrets, NIN processing training, and priority cohort access.
                    </p>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <a
                    href="https://chat.whatsapp.com/HLBJpd3hVZTGt40vB0KZve?s=cl&p=a&ilr=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 text-center rounded-xl bg-[#FDCE52] hover:bg-[#0C186C] hover:text-white text-[#0C186C] font-bold text-sm transition-all duration-300 inline-block shadow-md"
                  >
                    JOIN MENTORSHIP GROUP
                  </a>
                </div>
              </div>

            </FadeInSection>
          </div>

          {/* Founder Biography */}
          <div className="bg-[#fcfcff] border border-[#0C186C]/10 rounded-3xl p-8 lg:p-14 shadow-xs relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <FadeInSection className="lg:col-span-4 flex flex-col items-center">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#FDCE52] shadow-md bg-[#0C186C]">
                  <img
                    src="/pascal.jpg"
                    alt="Ejiaka Pascal Nnchdonna - Founder"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                </div>
                <div className="text-center mt-4">
                  <span className="text-[#0C186C] font-bold text-lg block">Ejiaka Pascal Nnchdonna</span>
                  <span className="text-[#111111]/50 text-xs font-semibold uppercase tracking-wider">Founder, The CAC Oracle Global Consult</span>
                </div>
              </FadeInSection>

              <FadeInSection className="lg:col-span-8 text-[#111111] font-sans leading-relaxed text-base flex flex-col gap-5">
                <div className="flex flex-col gap-1 border-l-4 border-[#FDCE52] pl-4">
                  <span className="text-[#FDCE52] font-bold text-xs uppercase tracking-widest">FOUNDER PROFILE</span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0C186C] font-sans">MEET THE FOUNDER</h3>
                </div>

                <p>
                  <strong>Ejiaka Pascal Nnchdonna</strong> is a Certified Business Consultant, certified by the Institute of Certified Business Consultants (ICBC), Nigeria, and the founder of <strong className="text-[#0C186C]">The CAC Oracle Global Consult</strong>.
                </p>
                <p>
                  He specialises in helping business owners make informed decisions before registration and providing professional support throughout their registration and compliance journey.
                </p>
                <p>
                  As <strong>The CAC Oracle</strong>, he is passionate about making business registration and compliance clear, accessible, and affordable for everyday business owners. He believes business owners should understand what they are registering, why it matters, and what obligations come after registration before making a financial commitment.
                </p>
                
                {/* Brand Philosophy Highlights */}
                <div
                  className="rounded-2xl p-6 mt-4 text-white relative shadow-sm border border-[#FDCE52]/20"
                  style={{ backgroundColor: "#0c186c" }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDCE52]/10 rounded-full blur-xl pointer-events-none"></div>
                  <p className="text-xs uppercase tracking-widest text-[#FDCE52] font-bold mb-1">Our Core Communication Principle</p>
                  <p className="text-lg font-extrabold text-white mb-3">Educate → Clarify → Guide → Process</p>
                  <p className="text-xs uppercase tracking-widest text-[#FDCE52] font-bold mb-1">Our Core Philosophy</p>
                  <p className="text-lg font-extrabold text-white">Explain the issue → Show the implications → Present the options → Help the client decide.</p>
                </div>
              </FadeInSection>

            </div>
          </div>

        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="bg-[#f7f9fc] py-20 px-6 border-t border-[#0C186C]/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0C186C] font-bold text-xs uppercase tracking-widest bg-[#0C186C]/5 border border-[#0C186C]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              OUR SERVICE DIRECTORY
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0C186C] uppercase leading-tight font-sans">
              Expert Solutions
            </h2>
            <p className="text-lg text-[#111111]/70 font-medium leading-relaxed max-w-2xl mx-auto mt-4 font-sans">
              Professional guidance and processing support across corporate registrations and personal modifications.
            </p>
          </FadeInSection>

          {/* Group 1: CAC Services */}
          <div className="mb-16">
            <FadeInSection className="flex items-center gap-3 mb-8 pb-3 border-b border-[#0C186C]/10">
              <div className="w-2.5 h-6 bg-[#FDCE52] rounded-full"></div>
              <h3 className="text-2xl font-extrabold text-[#0C186C] uppercase tracking-wide">CAC Services</h3>
            </FadeInSection>

            <FadeInSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {CAC_SERVICES.map((srv, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-[#0C186C]/5 hover:border-[#0C186C]/15 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C186C] text-[#FDCE52] flex items-center justify-center shadow-xs">
                    {srv.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#0C186C]">{srv.title}</h4>
                  <p className="text-[#111111]/70 text-sm leading-relaxed font-sans">{srv.desc}</p>
                </div>
              ))}
            </FadeInSection>
          </div>

          {/* Group 2: Other Services */}
          <div className="mb-20">
            <FadeInSection className="flex items-center gap-3 mb-8 pb-3 border-b border-[#0C186C]/10">
              <div className="w-2.5 h-6 bg-[#FDCE52] rounded-full"></div>
              <h3 className="text-2xl font-extrabold text-[#0C186C] uppercase tracking-wide">Other Services</h3>
            </FadeInSection>

            <FadeInSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {OTHER_SERVICES.map((srv, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-[#0C186C]/5 hover:border-[#0C186C]/15 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0C186C] text-[#FDCE52] flex items-center justify-center shadow-xs">
                    {srv.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#0C186C]">{srv.title}</h4>
                  <p className="text-[#111111]/70 text-sm leading-relaxed font-sans">{srv.desc}</p>
                </div>
              ))}
            </FadeInSection>
          </div>

          {/* Fixed Pricing Table */}
          <div className="mt-24 pt-10 border-t border-[#0C186C]/10">
            <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#FDCE52] font-bold text-xs uppercase tracking-widest bg-[#0C186C] px-4 py-1.5 rounded-full inline-block mb-3">
                CLEAR & FIXED PACKAGES
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C186C] uppercase font-sans">Service pricing</h3>
            </FadeInSection>

            <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              
              {/* Business Name Package */}
              <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#0C186C] uppercase">Business Name</h4>
                  <div className="flex items-baseline gap-1 my-6 border-b border-[#0C186C]/5 pb-4">
                    <span className="text-4xl font-extrabold text-[#0C186C] tracking-tight">₦50,000</span>
                    <span className="text-xs font-semibold text-[#111111]/50">/ flat fee</span>
                  </div>
                  
                  <ul className="space-y-3.5 my-8">
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Official CAC Certificate</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Official Status Report</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Tax Identification Number (TIN)</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Free Digital Letterhead Design</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>SMEDAN Registration Certificate</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/2348130156361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-center rounded-lg border-2 border-[#0C186C] text-[#0C186C] font-bold hover:bg-[#0C186C] hover:text-white transition-all duration-300 inline-block text-sm"
                >
                  START REGISTRATION
                </a>
              </div>

              {/* LLC Package - Highlighted */}
              <div
                className="text-white rounded-2xl p-8 border-2 border-[#FDCE52] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative transform lg:scale-105 z-10"
                style={{ backgroundColor: "#0c186c" }}
              >
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#FDCE52] text-[#0C186C] text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md">
                  MOST POPULAR
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-[#FDCE52] uppercase">LLC (1 Million Shares)</h4>
                  <div className="flex items-baseline gap-1 my-6 border-b border-white/10 pb-4">
                    <span className="text-4xl font-extrabold text-[#FDCE52] tracking-tight">₦80,000</span>
                    <span className="text-xs font-semibold text-white/60">/ flat fee</span>
                  </div>
                  
                  <ul className="space-y-3.5 my-8">
                    <li className="flex items-start text-sm text-white/90">
                      <CheckCircleIcon />
                      <span>Official CAC Certificate</span>
                    </li>
                    <li className="flex items-start text-sm text-white/90">
                      <CheckCircleIcon />
                      <span>Official Status Report</span>
                    </li>
                    <li className="flex items-start text-sm text-white/90">
                      <CheckCircleIcon />
                      <span>Memorandum & Articles of Association (MEMART)</span>
                    </li>
                    <li className="flex items-start text-sm text-white/90">
                      <CheckCircleIcon />
                      <span>FIRS Tax Identification Number (TIN)</span>
                    </li>
                    <li className="flex items-start text-sm text-white/90">
                      <CheckCircleIcon />
                      <span>Free Digital Letterhead Design</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/2348130156361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-center rounded-lg bg-[#FDCE52] text-[#0C186C] font-extrabold hover:bg-white hover:text-[#0C186C] transition-all duration-300 inline-block text-sm shadow-md"
                >
                  START REGISTRATION
                </a>
              </div>

              {/* Trustee Package */}
              <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/10 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#0C186C] uppercase">Incorporated Trustee</h4>
                  <div className="flex items-baseline gap-1 my-6 border-b border-[#0C186C]/5 pb-4">
                    <span className="text-4xl font-extrabold text-[#0C186C] tracking-tight">₦140,000</span>
                    <span className="text-xs font-semibold text-[#111111]/50">/ flat fee</span>
                  </div>
                  
                  <ul className="space-y-3.5 my-8">
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Official CAC Certificate</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Official Status Report</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Approved Trustee Constitution</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Official Minutes of Meeting</span>
                    </li>
                    <li className="flex items-start text-sm text-[#111111]/85">
                      <CheckCircleIcon />
                      <span>Mandatory Newspaper Publications</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="https://wa.me/2348130156361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-center rounded-lg border-2 border-[#0C186C] text-[#0C186C] font-bold hover:bg-[#0C186C] hover:text-white transition-all duration-300 inline-block text-sm"
                >
                  START REGISTRATION
                </a>
              </div>

            </FadeInSection>
          </div>

        </div>
      </section>

      {/* --- RESOURCES SECTION --- */}
      <section id="resources" className="bg-white py-20 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0C186C] font-bold text-xs uppercase tracking-widest bg-[#0C186C]/5 border border-[#0C186C]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              RESOURCES & EDUCATION
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0C186C] uppercase leading-tight font-sans">
              Knowledge & verification
            </h2>
            <p className="text-lg text-[#111111]/70 font-medium leading-relaxed max-w-2xl mx-auto mt-4 font-sans">
              Learn business registration fundamentals or verify our professional consultant credentials.
            </p>
          </FadeInSection>



          {/* Credentials / Certification */}
          <div className="mb-24 pt-12 border-t border-[#0C186C]/10">
            <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
              
              <FadeInSection className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C186C] uppercase tracking-wide">
                  OUR PROFESSIONAL CERTIFICATIONS
                </h3>
                <p className="text-sm text-[#111111]/65 font-semibold mt-1">Certified qualifications and professional credentials</p>
              </FadeInSection>

              {/* Certificate Image Viewers with Links to PDFs */}
              <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
                
                {/* Cert 1 */}
                <a
                  href="/cac.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer bg-[#fcfcff]"
                  title="Click to view full PDF certification"
                >
                  <img
                    src="/cac.png"
                    alt="Institute of Certified Business Consultants Certificate"
                    className="w-full h-full aspect-[3/4] object-contain p-4 transition-opacity duration-300 group-hover:opacity-95"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2.5 transition-opacity duration-300 p-6 text-center"
                    style={{ backgroundColor: "rgba(12, 24, 108, 0.8)" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FDCE52] text-[#0C186C] flex items-center justify-center shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                      Click to View PDF
                    </span>
                    <span className="text-white/80 text-sm font-medium leading-relaxed max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
                      Institute of Certified Business Consultants
                    </span>
                  </div>
                </a>

                {/* Cert 2 */}
                <a
                  href="/NOTINCERTIFICATE.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer bg-[#fcfcff]"
                  title="Click to view full PDF certification"
                >
                  <img
                    src="/notincertificate.png"
                    alt="NOTIN Certificate"
                    className="w-full h-full aspect-[3/4] object-contain p-4 transition-opacity duration-300 group-hover:opacity-95"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2.5 transition-opacity duration-300 p-6 text-center"
                    style={{ backgroundColor: "rgba(12, 24, 108, 0.8)" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FDCE52] text-[#0C186C] flex items-center justify-center shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                      Click to View PDF
                    </span>
                    <span className="text-white/80 text-sm font-medium leading-relaxed max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
                      NOTIN Certification
                    </span>
                  </div>
                </a>

                {/* Cert 3 */}
                <a
                  href="/SCUMLCONCEPTS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer bg-[#fcfcff]"
                  title="Click to view full PDF certification"
                >
                  <img
                    src="/scumlconcepts.png"
                    alt="SCUML Concepts Certification"
                    className="w-full h-full aspect-[3/4] object-contain p-4 transition-opacity duration-300 group-hover:opacity-95"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2.5 transition-opacity duration-300 p-6 text-center"
                    style={{ backgroundColor: "rgba(12, 24, 108, 0.8)" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FDCE52] text-[#0C186C] flex items-center justify-center shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                      Click to View PDF
                    </span>
                    <span className="text-white/80 text-sm font-medium leading-relaxed max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
                      SCUML Concepts Certification
                    </span>
                  </div>
                </a>

              </FadeInSection>
            </div>
          </div>

          {/* FAQs section */}
          <div className="pt-12 border-t border-[#0C186C]/10">
            <div className="max-w-3xl mx-auto w-full">
              
              <FadeInSection className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0C186C] uppercase font-sans">
                  FREQUENTLY ASKED QUESTIONS
                </h3>
              </FadeInSection>

              <FadeInSection className="space-y-4">
                {faqData.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-[#f7f9fc] rounded-xl overflow-hidden transition-all duration-300 border border-[#0C186C]/5 shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-5 text-left text-base lg:text-lg font-bold text-[#0C186C] hover:bg-[#0C186C]/5 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronIcon isOpen={isOpen} />
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? "max-h-[800px] border-t border-[#0C186C]/10" : "max-h-0"
                        }`}
                      >
                        <div className="p-5 text-sm lg:text-base text-[#111111]/80 font-medium leading-relaxed bg-[#f7f9fc]">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </FadeInSection>
            </div>
          </div>

        </div>
      </section>

      {/* --- CLIENT TESTIMONIALS SECTION --- */}
      <section className="bg-[#f7f9fc] py-20 px-6 border-t border-[#0C186C]/5">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0C186C] font-bold text-xs uppercase tracking-widest bg-[#0C186C]/5 border border-[#0C186C]/10 px-4 py-1.5 rounded-full inline-block mb-3">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0C186C] uppercase font-sans">
              HEAR FROM OUR CLIENTS
            </h2>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[100px] h-auto"
                />
                <p className="text-[#111111]/80 leading-relaxed font-sans text-sm">
                  "I’m so happy I finally get to do this CAC. And you did it so well. And you really helped me. Thank you and God bless the works of your hand."
                </p>
              </div>
              <div className="mt-6 border-t border-[#0C186C]/5 pt-4">
                <span className="text-sm font-bold text-[#0C186C] block">Motunrayo Fashola</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[100px] h-auto"
                />
                <p className="text-[#111111]/80 leading-relaxed font-sans text-sm">
                  "I had a smooth experience working with you. Thank you for your honesty, prompt feedback, and response."
                </p>
              </div>
              <div className="mt-6 border-t border-[#0C186C]/5 pt-4">
                <span className="text-sm font-bold text-[#0C186C] block">Mrs Fabulous Empire</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#0C186C]/5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[100px] h-auto"
                />
                <p className="text-[#111111]/80 leading-relaxed font-sans text-sm">
                  "Thumbs up to The CAC Oracle. Your customer service is top notch. Thank you for your integrity and transparency in delivering your jobs. God bless you."
                </p>
              </div>
              <div className="mt-6 border-t border-[#0C186C]/5 pt-4">
                <span className="text-sm font-bold text-[#0C186C] block">Eugene</span>
              </div>
            </div>

          </FadeInSection>
        </div>
      </section>

      {/* --- FOOTER CTA (CONTACT US) --- */}
      <section id="contact" className="bg-[#fcfcff] py-20 px-6 border-t border-[#0C186C]/5 animate-none">
        <FadeInSection className="max-w-5xl mx-auto w-full text-center">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0C186C] tracking-tight leading-tight mb-4 uppercase">
            Ready to secure your business?
          </h2>
          <p className="text-lg text-[#111111]/70 font-medium max-w-2xl mx-auto mb-10">
            Speak to me directly for registration support or explore our active WhatsApp services catalogue.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* Primary: Speak to Me Directly */}
            <div
              className="border border-[#FDCE52]/30 rounded-2xl p-6 shadow-lg w-full sm:w-1/2 flex flex-col justify-between h-48 text-left"
              style={{ backgroundColor: "#0c186c" }}
            >
              <div>
                <p className="text-[#FDCE52] text-xs font-bold tracking-widest uppercase mb-1">Direct support</p>
                <h3 className="text-white text-lg font-bold">Speak to me directly</h3>
              </div>
              <a
                href="https://wa.me/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 flex flex-col items-center justify-center bg-[#FDCE52] hover:bg-white text-[#0C186C] rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span className="font-bold text-sm uppercase">TALK TO THE CAC ORACLE</span>
                <span className="text-[10px] font-semibold opacity-80 mt-0.5">Stuck in registration? Get expert help</span>
              </a>
            </div>

            {/* Secondary: View WhatsApp Catalog */}
            <div className="bg-white border border-[#0C186C]/15 rounded-2xl p-6 shadow-md w-full sm:w-1/2 flex flex-col justify-between h-48 text-left">
              <div>
                <p className="text-[#0C186C]/70 text-xs font-bold tracking-widest uppercase mb-1">Catalog index</p>
                <h3 className="text-[#0C186C] text-lg font-bold">WhatsApp Catalogue</h3>
              </div>
              <a
                href="https://wa.me/c/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center border-2 border-[#0C186C] hover:bg-[#0C186C] hover:text-white text-[#0C186C] font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 uppercase"
              >
                View Catalogue
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* --- FOOTER --- */}
      <footer
        className="py-12 px-6 text-center border-t border-white/10 text-white animate-none"
        style={{ backgroundColor: "#0c186c" }}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-6">
          <img
            src="/logo.png"
            alt="The CAC Oracle Global Consult Logo"
            className="h-10 w-auto object-contain"
          />
          <p className="text-[#FDCE52] text-sm tracking-wider uppercase font-bold">
            CLARITY BEFORE YOUR REGISTRATION
          </p>
          
          {/* Social Links Row in Platform Official Colors */}
          <div className="flex justify-center items-center gap-6 mt-2">
            {/* WhatsApp */}
            <a
              href="https://wa.me/2348130156361"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 border border-white/10 shadow-xs hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
              aria-label="WhatsApp"
              style={{ color: "#25D366" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.407 9.864-9.825.002-2.623-1.023-5.086-2.884-6.951-1.864-1.865-4.343-2.891-6.963-2.891-5.439 0-9.865 4.408-9.869 9.827-.001 1.73.454 3.418 1.316 4.908l-.961 3.513 3.602-.937zm11.025-4.996c-.302-.151-1.791-.884-2.073-.986-.282-.103-.488-.152-.693.151-.205.304-.795.986-.974 1.189-.179.203-.359.228-.661.077-1.127-.565-2.023-1.024-2.825-2.404-.204-.352.204-.326.58-.988.11-.19.055-.357-.027-.508-.083-.151-.693-1.671-.95-2.285-.25-.6-.525-.52-.72-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.401-.293.32-1.12 1.094-1.12 2.67 0 1.574 1.147 3.097 1.307 3.3 1.6 2.1 3.5 3.3 5.4 4.1.9.4 1.7.6 2.3.5.7-.1 1.5-.6 1.7-.9.2-.3.2-.6.1-.9-.1-.3-.3-.4-.6-.6z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/TheCACOracle/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 border border-white/10 shadow-xs hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10"
              aria-label="Facebook"
              style={{ color: "#1877F2" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@thecacoracle?_r=1&_t=ZS-99D2ACzt5SW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 border border-white/10 shadow-xs hover:border-white/30 hover:bg-white/10"
              aria-label="TikTok"
              style={{ color: "#ffffff" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1.67-.1 1.35-.1 2.03-.02 3.32-1.39 6.77-4.48 8.16-3.24 1.57-7.73.74-9.98-2.21-2.21-2.86-1.54-7.53 1.45-9.61 2.05-1.47 4.91-1.63 7.09-.5v4.21c-1.25-.79-2.99-.75-4.14.19-1.12.91-1.42 2.65-.67 3.89.74 1.29 2.5 1.91 3.9 1.39 1.43-.5 2.42-2.02 2.42-3.64.02-3.93.01-7.86.01-11.8z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thecacoracle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 border border-white/10 shadow-xs hover:border-[#0077B5]/40 hover:bg-[#0077B5]/10"
              aria-label="LinkedIn"
              style={{ color: "#0077B5" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/thecacoracle?igsi=amdmcGwwOHZkMXZ5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-all p-2 rounded-full bg-white/5 border border-white/10 shadow-xs hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10"
              aria-label="Instagram"
              style={{ color: "#E4405F" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>

          <p className="mt-4 text-white/40 text-xs">
            © {new Date().getFullYear()} The CAC Oracle Global Consult. All rights reserved. Registered in Nigeria.
          </p>
        </div>
      </footer>

    </div>
  );
}
