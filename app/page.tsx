"use client";

import React, { useState, useEffect, useRef } from "react";

// Inline Custom SVG Check Circle
const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-[#263238] shrink-0 mt-0.5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

// Chevron Icon for Accordion
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-6 h-6 text-[#263238] shrink-0 transition-transform duration-300 ${
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
            observer.unobserve(entry.target); // Animates once
          }
        });
      },
      { threshold: 0.05 } // Triggers when 5% of the element is visible
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
  
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
            Timeline may vary depending on workload, documentation accuracy, or portal delays.
          </p>
        </div>
      ),
    },
    {
      question: "What is the difference between a Business Name and a Company (Ltd)?",
      answer: (
        <div className="space-y-3">
          <div>
            <strong className="text-[#263238]">Business Name (BN):</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Suitable for small/solo businesses.</li>
              <li>Not separate from the owner (you bear full liability).</li>
              <li>Cheaper and easier to register.</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#263238]">Company (Limited Liability - Ltd):</strong>
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
            <strong className="text-[#263238]">For Business Name:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li>Proposed business names</li>
              <li>Nature of business</li>
              <li>Owner's details</li>
              <li>Valid Government ID</li>
              <li>Passport photograph</li>
            </ul>
          </div>
          <div>
            <strong className="text-[#263238]">For Company (Ltd):</strong>
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

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcff] text-[#263238] font-sans selection:bg-[#ffd700]/30">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 transition-all duration-300 w-full bg-transparent md:bg-[#fcfcff] border-b-0 md:border-b md:border-gray-100/50">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-8 py-4">
          <a href="#" className="flex items-center hover:opacity-90 transition-opacity">
            <img
              src="/logo.png"
              alt="The CAC Oracle Global Consult Logo"
              className="h-10 w-auto object-contain"
            />
          </a>
          <nav className="flex items-center gap-8">
            <a
              href="#services"
              className="text-[#263238] font-semibold text-sm tracking-wider hover:text-[#ffd700] hover:underline hover:underline-offset-8 decoration-3 transition-colors duration-200"
            >
              SERVICES
            </a>
            <a
              href="#pricing"
              className="text-[#263238] font-semibold text-sm tracking-wider hover:text-[#ffd700] hover:underline hover:underline-offset-8 decoration-3 transition-colors duration-200"
            >
              PRICING
            </a>
            <a
              href="#founder"
              className="text-[#263238] font-semibold text-sm tracking-wider hover:text-[#ffd700] hover:underline hover:underline-offset-8 decoration-3 transition-colors duration-200"
            >
              THE FOUNDER
            </a>
            <a
              href="#mentorship"
              className="text-[#263238] font-semibold text-sm tracking-wider hover:text-[#ffd700] hover:underline hover:underline-offset-8 decoration-3 transition-colors duration-200"
            >
              MENTORSHIP
            </a>
            <a
              href="#faqs"
              className="text-[#263238] font-semibold text-sm tracking-wider hover:text-[#ffd700] hover:underline hover:underline-offset-8 decoration-3 transition-colors duration-200"
            >
              FAQs
            </a>
          </nav>
        </div>

        {/* Mobile Navigation Header */}
        <div className="block md:hidden w-full">
          <div className="bg-[#011049] rounded-b-[28px] px-6 py-4 flex items-center justify-between shadow-lg">
            <a href="#" className="flex items-center active:scale-98 transition-transform">
              <img
                src="/logo.png"
                alt="The CAC Oracle Global Consult Logo"
                className="h-9 w-auto object-contain"
              />
            </a>
            
            {/* Hamburger Button with click/hover micro-animations */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-[#ffd700] active:scale-90 transition-all duration-200 p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/30"
              aria-label="Open menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu Drawer (Animated slide-in from right) */}
        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          {/* Backdrop with fade-in blur */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer container with slide-in from right */}
          <div className={`relative flex flex-col w-80 max-w-[85vw] bg-white h-full p-6 shadow-2xl z-10 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <img
                src="/logo.png"
                alt="The CAC Oracle Global Consult Logo"
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-400 hover:text-red-500 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 transform hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-col gap-2">
              <a
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-[#263238] font-bold text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>SERVICES</span>
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-[#263238] font-bold text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>PRICING</span>
              </a>
              <a
                href="#founder"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-[#263238] font-bold text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>THE FOUNDER</span>
              </a>
              <a
                href="#mentorship"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-[#263238] font-bold text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0-.001h6v-1a6 6 0 00-9-5.197M13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4z" />
                </svg>
                <span>MENTORSHIP</span>
              </a>
              <a
                href="#faqs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 text-[#263238] font-bold text-lg py-3.5 px-4 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>FAQs</span>
              </a>
            </nav>

            {/* Quick Contact & Action Panel inside drawer */}
            <div className="mt-auto border-t border-gray-100 pt-6">
              <p className="text-xs text-gray-400 font-medium mb-3 tracking-wider text-center uppercase">Get Started Instantly</p>
              <a
                href="https://wa.link/p7s0qx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold text-base rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-98"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.407 9.864-9.825.002-2.623-1.023-5.086-2.884-6.951-1.864-1.865-4.343-2.891-6.963-2.891-5.439 0-9.865 4.408-9.869 9.827-.001 1.73.454 3.418 1.316 4.908l-.961 3.513 3.602-.937zm11.025-4.996c-.302-.151-1.791-.884-2.073-.986-.282-.103-.488-.152-.693.151-.205.304-.795.986-.974 1.189-.179.203-.359.228-.661.077-1.127-.565-2.023-1.024-2.825-2.404-.204-.352.204-.326.58-.988.11-.19.055-.357-.027-.508-.083-.151-.693-1.671-.95-2.285-.25-.6-.525-.52-.72-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.401-.293.32-1.12 1.094-1.12 2.67 0 1.574 1.147 3.097 1.307 3.3 1.6 2.1 3.5 3.3 5.4 4.1.9.4 1.7.6 2.3.5.7-.1 1.5-.6 1.7-.9.2-.3.2-.6.1-.9-.1-.3-.3-.4-.6-.6z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[10px] text-gray-400 text-center mt-3 font-medium">Mon - Sat: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Column 1: Details */}
        <FadeInSection className="md:col-span-7 flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          
          {/* Logo on Mobile (Hidden on Desktop) */}
          <div className="md:hidden mb-2">
            <img
              src="/logo.png"
              alt="The CAC Oracle Global Consult Logo"
              className="h-12 w-auto object-contain mx-auto"
            />
          </div>

          {/* Headline - Desktop Only */}
          <h1 className="hidden md:block text-5xl lg:text-6xl font-extrabold tracking-tight text-[#263238] leading-tight">
            Your Brand <br />
            Registration Agency
          </h1>

          {/* Headline - Mobile Only */}
          <h1 className="block md:hidden text-4xl font-extrabold tracking-tight text-[#263238] leading-none mb-1">
            Your Brand <br />
            Registration Agency
          </h1>

          {/* Hero Flyer Image - Mobile Only (Placed between Title and Subhead) */}
          <div className="block md:hidden w-full max-w-md mx-auto my-4 rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src="/register.jpg"
              alt="The CAC Oracle Global Consult Brand Flyer Mobile"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Subheading / Description */}
          <p className="text-lg md:text-xl lg:text-2xl text-[#3e4581] font-medium leading-relaxed max-w-2xl">
            We simplify everything and anything brand registration by answering all your questions and making the registration process smoother, easier and convenient.
          </p>

          {/* Action CTA Button */}
          <a
            href="https://wa.link/p7s0qx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#ffd700] hover:bg-[#263238] text-[#263238] hover:text-white font-semibold text-lg lg:text-xl px-10 py-4 rounded-md shadow-sm transition-all duration-300 hover:scale-105 w-full md:w-auto text-center"
          >
            Start now
          </a>
        </FadeInSection>

        {/* Column 2: Desktop Flyer Image (Hidden on Mobile) */}
        <FadeInSection className="hidden md:flex md:col-span-5 justify-end">
          <div className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] border border-gray-100">
            <img
              src="/register.jpg"
              alt="The CAC Oracle Global Consult Brand Flyer Desktop"
              className="w-full h-auto object-cover"
            />
          </div>
        </FadeInSection>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="bg-[#fcfcff] py-16 md:py-24 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#263238] mb-12 md:mb-16">
              Our Brand <br className="md:hidden" />
              <span className="text-[#ffd700] bg-[#263238] px-4 py-1.5 rounded-sm inline-block mt-2 md:mt-0 md:ml-2">Registration Services</span>
            </h2>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Service 1: CAC Registration */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447eb39b6db_1.svg"
                  alt="CAC icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">CAC Registration</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Gives you access to business accounts, contracts, corporate loans & grants. Also makes your business legal and gives it credibility.
              </p>
            </div>

            {/* Service 2: Trademark Registration */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447ec0357e9_2.svg"
                  alt="Trademark icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">Trademark Registration</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Want to protect your brand identity? Trademarking your name, logo, or tagline safeguards your brand asset from infringement.
              </p>
            </div>

            {/* Service 3: Export License */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447ed5cfd79_3.svg"
                  alt="Export icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">Export License</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Want to expand and ship your goods safely to other countries from Nigeria? We help you process your export license certificate.
              </p>
            </div>

            {/* Service 4: SCUML Registration */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447eeb589c1_4.svg"
                  alt="SCUML icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">SCUML Registration</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Want to avoid corporate banking restrictions and handle high-value compliance transactions? We facilitate SCUML certification.
              </p>
            </div>

            {/* Service 5: International Passport */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447f0ca69c0_6.svg"
                  alt="Passport icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">International Passport</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Planning to travel abroad for business, study, or vacation? We assist in simplifying the passport acquisition process.
              </p>
            </div>

            {/* Service 6: NIN Registration */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xs border border-gray-100/80 hover:shadow-md hover:border-gray-200 transition-all duration-300">
              <div className="mb-4 text-[#ffd700]">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/67447f1ff0955_update-svgrepo-com.svg"
                  alt="NIN icon"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-[#263238] mb-3">NIN Registration</h3>
              <p className="text-base text-[#3e4581] leading-relaxed">
                Need to secure, update, or retrieve your National Identity Number card? We make the documentation process quick and stress-free.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- PRICE LISTS SECTION --- */}
      <section id="pricing" className="bg-[#fcfcff] py-16 md:py-24 px-6 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#263238] mb-12 md:mb-16">
              Our <span className="text-[#ffd700] bg-[#263238] px-4 py-1.5 rounded-sm inline-block">Price Lists</span>
            </h2>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Price Card 1: Business Name */}
            <div className="bg-white md:bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between max-md:bg-[#fff3b3]">
              <div>
                <h3 className="text-2xl font-bold text-[#263238] mb-1">Business Name</h3>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-5xl font-extrabold text-[#ffd700] tracking-tight">50K</span>
                  <span className="text-sm font-medium text-gray-500">/ package</span>
                </div>
                
                <ul className="space-y-3.5 my-8">
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>CAC Certificate</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Status Report</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Firs tin</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Free Letterhead Design</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Smedan Certificate</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/c/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center rounded-md border border-[#ffd700] text-[#ffd700] font-semibold text-lg hover:bg-[#ffd700] hover:text-[#263238] transition-all duration-300 inline-block max-md:bg-[#ffd700] max-md:text-[#263238] max-md:hover:bg-[#263238] max-md:hover:text-white"
              >
                Start now
              </a>
            </div>

            {/* Price Card 2: LLC - 1 Million Shares (HIGHLIGHTED CARD) */}
            <div className="bg-[#fff3b3] rounded-2xl p-8 border-2 border-[#ffd700] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative transform lg:scale-105 z-10">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-[#263238] text-[#ffd700] text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-xs">
                POPULAR
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#263238] mb-1">LLC - 1 Million Shares</h3>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-5xl font-extrabold text-[#ffd700] tracking-tight">80K</span>
                  <span className="text-sm font-medium text-gray-500">/ package</span>
                </div>
                
                <ul className="space-y-3.5 my-8">
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>CAC Certificate</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Status Report</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Mermart</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>FIRS TIN</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Free Letterhead Design</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/c/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center rounded-md bg-[#ffd700] text-[#263238] font-bold text-lg hover:bg-[#263238] hover:text-white transition-all duration-300 inline-block shadow-xs"
              >
                Start now
              </a>
            </div>

            {/* Price Card 3: Incorporated Trustee */}
            <div className="bg-white md:bg-white rounded-2xl p-8 border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between max-md:bg-[#fff3b3]">
              <div>
                <h3 className="text-2xl font-bold text-[#263238] mb-1">Incorporated Trustee</h3>
                <div className="flex items-baseline gap-1 my-6">
                  <span className="text-5xl font-extrabold text-[#ffd700] tracking-tight">140K</span>
                  <span className="text-sm font-medium text-gray-500">/ package</span>
                </div>
                
                <ul className="space-y-3.5 my-8">
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>CAC Certificate</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Status Report</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Trustee Constitution</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Minutes of Meeting</span>
                  </li>
                  <li className="flex items-start text-base text-[#263238]">
                    <CheckCircleIcon />
                    <span>Newspaper Publication</span>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/c/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center rounded-md border border-[#ffd700] text-[#ffd700] font-semibold text-lg hover:bg-[#ffd700] hover:text-[#263238] transition-all duration-300 inline-block max-md:bg-[#ffd700] max-md:text-[#263238] max-md:hover:bg-[#263238] max-md:hover:text-white"
              >
                Start now
              </a>
            </div>

          </FadeInSection>
        </div>
      </section>

      {/* --- MEET THE FOUNDER SECTION --- */}
      <section id="founder" className="bg-[#fcfcff] py-16 px-6 border-t border-gray-100 scroll-mt-20">
        <FadeInSection className="max-w-4xl mx-auto w-full flex flex-col items-center">
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#263238] mb-10 max-md:font-luckiest">
            <span className="text-[#ffd700] bg-[#263238] px-4 py-1.5 rounded-sm inline-block">MEET THE FOUNDER</span>
          </h2>

          {/* Founder Image */}
          <div className="relative w-[300px] h-[300px] md:w-[334px] md:h-[334px] rounded-full overflow-hidden shadow-2xl border-4 border-white mb-8 md:mb-12">
            <img
              src="/pascal.jpg"
              alt="Ejiaka Pascal Nnchdonna - Founder"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Biography Container */}
          <div className="bg-[#f0f0f0] border-4 border-[#273329] rounded-[27px] p-6 md:p-10 shadow-md text-[#263238] leading-relaxed text-lg max-w-2xl font-medium max-md:bg-gray-100 max-md:border-2">
            <p className="mb-4">
              <strong className="text-xl font-bold">Ejiaka Pascal Nnchdonna</strong> is a Certified Business Consultant, certified by the Institute of Certified Business Consultants (ICBC), Nigeria, and the founder of <strong className="text-[#011049]">The CAC Oracle Global Consult</strong>.
            </p>
            <p className="mb-4">
              He specialises in helping business owners make informed decisions before registration and providing professional support throughout their registration and compliance journey.
            </p>
            <p className="mb-4">
              He offers services in CAC registration, post-incorporation services, Annual Returns, NIN modifications, SCUML processing, International Passport processing, Tax Promax processing, and other business support services.
            </p>
            <p className="mb-4">
              As <strong>The CAC Oracle</strong>, he is passionate about making business registration and compliance clear, accessible, and affordable for everyday business owners.
            </p>
            <div className="bg-white/60 rounded-xl p-5 my-6 border border-gray-200 text-center">
              <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-1">His approach is simple:</p>
              <p className="text-xl font-extrabold text-[#011049]">Clarify first. Advise properly. Then proceed.</p>
            </div>
            <p className="mb-4">
              He believes business owners should understand what they are registering, why it matters, and what obligations come after registration before making a commitment.
            </p>
            <div className="mt-8 text-center border-t border-gray-300/40 pt-4">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">THE CAC ORACLE</p>
              <p className="text-lg font-extrabold text-[#011049]">Clarity Before Your Registration.</p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* --- MENTORSHIP WAITLIST SECTION --- */}
      <section id="mentorship" className="bg-[#fcfcff] py-16 md:py-24 px-6 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Header */}
          <FadeInSection className="text-center mb-12 md:mb-16">
            <span className="text-[#011049] font-bold text-xs uppercase tracking-widest border border-[#011049]/20 px-3.5 py-1.5 rounded-full bg-[#011049]/5 mb-4 inline-block">
              LEARN FROM THE ORACLE
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight mt-2">
              Mentorship & Training Programs
            </h2>
            <p className="text-lg md:text-xl text-[#3e4581] font-medium leading-relaxed max-w-2xl mx-auto mt-4">
              Unlock the secrets of corporate registrations. Choose a path that fits your goals.
            </p>
          </FadeInSection>

          {/* Grid */}
          <FadeInSection className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Card 1: Free Class */}
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="relative w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src="/freeclassflier.png"
                    alt="Free Business Registration Masterclass"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-[#263238] mb-3">Free Registration Class</h3>
                  <p className="text-[#3e4581] text-base leading-relaxed font-medium">
                    Learn the fundamentals of corporate registrations. A free, action-packed class designed to clarify the basics of CAC filings, NIN modifications, and SCUML registrations.
                  </p>
                </div>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <a
                  href="https://wa.link/p7s0qx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 text-center rounded-xl bg-[#011049] hover:bg-[#263238] text-white font-bold text-base transition-all duration-300 inline-block shadow-sm"
                >
                  Get Free Access
                </a>
              </div>
            </div>

            {/* Card 2: Paid Mentorship (Highlighted) */}
            <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#ffd700] shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
              <div className="absolute top-4 right-4 bg-[#ffd700] text-[#263238] text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full z-10 shadow-xs">
                RECOMMENDED
              </div>
              <div>
                <div className="relative w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src="/paidclass.png"
                    alt="Premium Mentorship Program"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-[#263238] mb-3">Premium CAC Mentorship</h3>
                  <p className="text-[#3e4581] text-base leading-relaxed font-medium">
                    Ready to scale your registration business? Join my exclusive paid waitlist for step-by-step mentorship, industry secrets, NIN processing training, and priority cohort access.
                  </p>
                </div>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <a
                  href="https://chat.whatsapp.com/HLBJpd3hVZTGt40vB0KZve?s=cl&p=a&ilr=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 text-center rounded-xl bg-[#ffd700] hover:bg-[#263238] text-[#263238] hover:text-white font-bold text-base transition-all duration-300 inline-block shadow-md"
                >
                  Join Mentorship Group
                </a>
              </div>
            </div>

          </FadeInSection>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="bg-[#fcfcff] py-16 md:py-24 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto w-full">
          
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#d683a4] mb-12 md:mb-16 tracking-tight">
              HEAR FROM OUR CLIENTS
            </h2>
          </FadeInSection>

          <FadeInSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[101px] h-auto"
                />
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  "I’m so happy I finally get to do this CAC. And you did it so well. And you really helped me. Thank you and God bless the works of your hand."
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <span className="text-base font-bold text-[#263238]">Motunrayo Fashola</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[101px] h-auto"
                />
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  "I had a smooth experience working with you. Thank you for your honesty, prompt feedback, and response."
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <span className="text-base font-bold text-[#263238]">Mrs Fabulous Empire</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <img
                  src="https://d1yei2z3i6k35z.cloudfront.net/systeme-common/65b78043ae733_stars.svg"
                  alt="5 Stars"
                  className="w-[101px] h-auto"
                />
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  "Thumbs up to The CAC Oracle. Your customer service is top notch. Thank you for your integrity and transparency in delivering your jobs. God bless you."
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <span className="text-base font-bold text-[#263238]">Eugene</span>
              </div>
            </div>

          </FadeInSection>
        </div>
      </section>

      {/* --- CERTIFICATION SECTION --- */}
      <section className="bg-[#fcfcff] py-16 px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
          
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#263238] mb-10 max-md:font-luckiest">
              OUR CERTIFICATION
            </h2>
          </FadeInSection>

          {/* Certificate Image Viewer with Link to PDF */}
          <FadeInSection className="max-w-md w-full flex flex-col items-center">
            <a
              href="/cac.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              title="Click to view full PDF certification"
            >
              {/* Image of first page */}
              <img
                src="/cac.png"
                alt="The CAC Oracle Global Consult Certification Document"
                className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-95"
              />
              
              {/* Premium Hover Overlay Banner */}
              <div className="absolute inset-0 bg-[#263238]/70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2.5 transition-opacity duration-300 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ffd700] text-[#263238] flex items-center justify-center shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  {/* Eye / View icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75">
                  Click to View Full PDF
                </span>
                <span className="text-white/80 text-sm font-medium leading-relaxed max-w-xs transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
                  Certified by the Institute of Certified Business Consultants
                </span>
              </div>
            </a>
          </FadeInSection>
        </div>
      </section>

      {/* --- FAQS SECTION --- */}
      <section id="faqs" className="bg-[#fcfcff] py-16 px-6 border-t border-gray-100 scroll-mt-20">
        <div className="max-w-3xl mx-auto w-full">
          
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#3e4581] mb-10 max-md:font-patua">
              FAQs
            </h2>
          </FadeInSection>

          <FadeInSection className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#f1f4f8] rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left text-lg font-bold text-[#263238] hover:bg-gray-100/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronIcon isOpen={isOpen} />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[800px] border-t border-gray-200/50" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 text-base text-[#3e4581] font-medium leading-relaxed bg-[#f1f4f8]/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </FadeInSection>
        </div>
      </section>

      {/* --- FOOTER CTA (CONTACT US) --- */}
      <section className="bg-[#fcfcff] py-16 px-6 border-t border-gray-100">
        <FadeInSection className="max-w-4xl mx-auto w-full text-center">
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#263238] tracking-tight leading-tight mb-8">
            Want to Contact US? <br />
            <span className="text-2xl md:text-3xl font-medium text-gray-500 block mt-2">Speak to me directly or explore my services catalog</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            {/* Primary: Speak to Me Directly */}
            <div className="bg-[#263238] border border-white/20 rounded-2xl p-6 shadow-2xl w-full sm:w-1/2 flex flex-col justify-between h-48">
              <p className="text-white/70 text-sm font-semibold mb-2">Have a question or problem?</p>
              <h3 className="text-white text-lg font-bold mb-4">Speak to Me Directly</h3>
              <a
                href="https://wa.link/p7s0qx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center bg-[#ffd700] hover:bg-white text-[#263238] font-bold text-base rounded-xl transition-all duration-300 hover:scale-105"
              >
                Chat Direct Support
              </a>
            </div>

            {/* Secondary: View WhatsApp Catalog */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl w-full sm:w-1/2 flex flex-col justify-between h-48">
              <p className="text-[#3e4581] text-sm font-semibold mb-2">Explore all our business offers</p>
              <h3 className="text-[#263238] text-lg font-bold mb-4">WhatsApp Catalogue</h3>
              <a
                href="https://wa.me/c/2348130156361"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-center border-2 border-[#263238] hover:bg-[#263238] text-[#263238] hover:text-white font-bold text-base rounded-xl transition-all duration-300 hover:scale-105"
              >
                View Catalogue
              </a>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#263238] py-8 px-6 text-center border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full text-sm text-[#ffd700] leading-loose">
          {/* Social Links Row */}
          <div className="flex justify-center items-center gap-6 mb-6 text-[#ffd700]">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/TheCACOracle/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-white/10"
              aria-label="Facebook Page"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@thecacoracle?_r=1&_t=ZS-99D2ACzt5SW"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-white/10"
              aria-label="TikTok Page"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.95-1.72-.1.67-.1 1.35-.1 2.03-.02 3.32-1.39 6.77-4.48 8.16-3.24 1.57-7.73.74-9.98-2.21-2.21-2.86-1.54-7.53 1.45-9.61 2.05-1.47 4.91-1.63 7.09-.5v4.21c-1.25-.79-2.99-.75-4.14.19-1.12.91-1.42 2.65-.67 3.89.74 1.29 2.5 1.91 3.9 1.39 1.43-.5 2.42-2.02 2.42-3.64.02-3.93.01-7.86.01-11.8z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thecacoracle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-white/10"
              aria-label="LinkedIn Page"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* WhatsApp Catalogue */}
            <a
              href="https://wa.me/c/2348130156361"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 active:scale-95 transition-transform p-1.5 rounded-full hover:bg-white/10"
              aria-label="WhatsApp Catalogue"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.407 9.864-9.825.002-2.623-1.023-5.086-2.884-6.951-1.864-1.865-4.343-2.891-6.963-2.891-5.439 0-9.865 4.408-9.869 9.827-.001 1.73.454 3.418 1.316 4.908l-.961 3.513 3.602-.937zm11.025-4.996c-.302-.151-1.791-.884-2.073-.986-.282-.103-.488-.152-.693.151-.205.304-.795.986-.974 1.189-.179.203-.359.228-.661.077-1.127-.565-2.023-1.024-2.825-2.404-.204-.352.204-.326.58-.988.11-.19.055-.357-.027-.508-.083-.151-.693-1.671-.95-2.285-.25-.6-.525-.52-.72-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.401-.293.32-1.12 1.094-1.12 2.67 0 1.574 1.147 3.097 1.307 3.3 1.6 2.1 3.5 3.3 5.4 4.1.9.4 1.7.6 2.3.5.7-.1 1.5-.6 1.7-.9.2-.3.2-.6.1-.9-.1-.3-.3-.4-.6-.6z"/>
              </svg>
            </a>
          </div>

          
          <p className="mt-2 text-white/50 text-xs">
            © {new Date().getFullYear()} The CAC Oracle Global Consult. All rights reserved. Registered in Nigeria.
          </p>
        </div>
      </footer>

    </div>
  );
}
