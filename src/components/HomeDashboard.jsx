import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, MessageSquare, Phone, Mail, 
  ArrowRight, ChevronRight, ChevronLeft, Star, AlertCircle,
  Activity, ShieldCheck, Scale, Zap, CheckCircle2,
  Sliders, Compass, FileText, Building2, School, HeartPulse,
  ExternalLink, Sparkles, Award, Radio
} from 'lucide-react';
import { electraData } from '../data/electraData';

export default function HomeDashboard({ 
  onNavigate, 
  onOpenSearch,
  onOpenChat, 
  onOpenCall, 
  onSelectService,
  onOpenAssessmentModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 5 Authentic Slides matching electraemfhealth.com website
  const heroSlides = [
    {
      id: 1,
      badge: "COURT-CERTIFIED CLINICAL & LEGAL EXPERTS",
      badgeIcon: "⚡",
      badgeColor: "text-amber-300",
      title: "Professional EMF Testing, Health & Safety Experts",
      subtitle: "State-licensed IBEW electronics engineers & clinical industrial hygienists conducting exposure dosimetry across NY, NJ, CT, PA & DE since 2003.",
      image: "/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg",
      primaryCta: "Explore Services",
      primaryTarget: "services",
      secondaryCta: "Book Consultation",
      secondaryTarget: "profile",
      pillLeft: "NY • NJ • CT • PA • DE",
      pillRight: "Lic. Since 2003"
    },
    {
      id: 2,
      badge: "POWER UTILITY & SUBSTATION DOSIMETRY",
      badgeIcon: "⚡",
      badgeColor: "text-cyan-300",
      title: "Substations, Power Lines & Stray Ground Voltage",
      subtitle: "Scientific magnetic field falloff contour analysis, 60 Hz harmonic deconstruction & 100% stray underground voltage neutralization.",
      image: "/assets/Power-systems.jpg",
      primaryCta: "View Utility Studies",
      primaryTarget: "services",
      secondaryCta: "Schedule Audit",
      secondaryTarget: "profile",
      pillLeft: "60 Hz Low-Freq Magnetic",
      pillRight: "100% Discharged"
    },
    {
      id: 3,
      badge: "HIGH-FREQUENCY TELECOM SPECTRUM",
      badgeIcon: "📡",
      badgeColor: "text-blue-300",
      title: "Rooftop 5G Arrays & Small-Cell Microwave Radiation",
      subtitle: "Multi-generational cellular spectrum diagnostics up to 60 GHz. Measuring peak pulse power densities & certified architectural RF shielding.",
      image: "/assets/5G-antenna-1030x896.jpg",
      primaryCta: "Inspect 5G Levels",
      primaryTarget: "services",
      secondaryCta: "Call Direct Line",
      secondaryTarget: "call",
      pillLeft: "Sub-6GHz to 60GHz mmWave",
      pillRight: "Isotropic Calibrated"
    },
    {
      id: 4,
      badge: "CLINICAL & CARDIAC IMPLANT SAFETY",
      badgeIcon: "❤️",
      badgeColor: "text-rose-300",
      title: "Electromagnetic Interference (EMI) for Medical Implants",
      subtitle: "Critical safety clearance zoning for cardiac pacemakers, ICDs, and insulin pumps near high-voltage lines, EV chargers & industrial equipment.",
      image: "/assets/Electro-Magentic-Interferece-EMI-2003-1.jpg",
      primaryCta: "Medical Protocols",
      primaryTarget: "services",
      secondaryCta: "Clinical Review",
      secondaryTarget: "profile",
      pillLeft: "ISO/AAMI 14117 Compliant",
      pillRight: "Electrophysiology DX"
    },
    {
      id: 5,
      badge: "EDUCATIONAL DISTRICT AUDITS",
      badgeIcon: "🏫",
      badgeColor: "text-emerald-300",
      title: "School District & Campus Environmental EMF Testing",
      subtitle: "Comprehensive exposure studies for classrooms, computer labs, and playgrounds across NY, NJ, CT & PA. Protecting children & faculty.",
      image: "/assets/children_playing_near_high_voltage_lines.png",
      primaryCta: "School Safety Dossier",
      primaryTarget: "reports",
      secondaryCta: "Consult Experts",
      secondaryTarget: "profile",
      pillLeft: "District-Wide Testing",
      pillRight: "Child Safety Advocates"
    }
  ];

  // Auto-slide effect every 4.5 seconds (paused on touch/hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      } else {
        // Swiped right -> prev
        setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
      }
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const categories = [
    { id: 'all', label: 'All Studies', count: 14 },
    { id: 'residential', label: 'Residential EMF', count: 6 },
    { id: 'commercial', label: 'Commercial EMF', count: 4 },
    { id: 'medical', label: 'Medical / ICD', count: 3 },
    { id: 'legal', label: 'Legal Witness', count: 2 },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch(searchQuery);
    } else {
      onNavigate('services');
    }
  };

  const activeSlideData = heroSlides[currentSlide];

  return (
    <div className="space-y-4 pb-24">
      {/* 1. TOP SEARCH BAR */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => {
              if (onOpenSearch) onOpenSearch(searchQuery);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search EMF testing, 5G/6G, power lines..."
            className="w-full bg-white rounded-full pl-9 pr-24 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs placeholder:text-slate-400 font-medium cursor-pointer"
          />
          <button
            type="submit"
            className="h-9 px-4.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all shadow-xs active:scale-95 absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </form>

      {/* 2. LICENSED SERVICE AREA STRIP */}
      <div className="bg-white rounded-2xl p-2.5 px-3.5 border border-slate-100 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block leading-tight">
              LICENSED SERVICE AREA
            </span>
            <span className="text-xs font-bold text-slate-800 truncate block leading-tight mt-0.5">
              NY, NJ, CT, PA, DE <span className="text-slate-400 font-normal">(Tri-State Metro...)</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="h-7.5 px-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-bold transition-all active:scale-95 shrink-0 flex items-center justify-center"
        >
          Change
        </button>
      </div>

      {/* 3. HERO SECTION – AUTOMATIC IMAGE CAROUSEL */}
      <div 
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-950 text-white shadow-lg select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Image with Dynamic Fade Transition */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-7000 ease-out"
                onError={(e) => {
                  e.target.src = "/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg";
                }}
              />
              {/* High Contrast Multi-Layer Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071328] via-[#071328]/75 to-black/35" />
            </div>
          ))}

          {/* Top Floating Pill Tags */}
          <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between text-[8.5px] font-bold">
            <span className="bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-full text-white border border-white/15 flex items-center gap-1 shadow-xs">
              <span className={activeSlideData.badgeColor}>{activeSlideData.badgeIcon}</span>
              <span>{activeSlideData.badge}</span>
            </span>
            <span className="bg-blue-600/90 backdrop-blur-md px-1.5 py-0.5 rounded-full text-white shadow-xs font-black">
              {currentSlide + 1} / {heroSlides.length}
            </span>
          </div>

          {/* Slide Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-3.5 sm:p-4">
            <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <h1 className="text-sm sm:text-base font-heading font-extrabold text-white leading-tight drop-shadow-sm line-clamp-2">
                {activeSlideData.title}
              </h1>

              <p className="text-[10.5px] text-blue-100/90 leading-tight line-clamp-1 sm:line-clamp-2 drop-shadow-xs max-w-sm">
                {activeSlideData.subtitle}
              </p>

              {/* Action Buttons in Hero */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    if (activeSlideData.primaryTarget === 'call') onOpenCall();
                    else onNavigate(activeSlideData.primaryTarget);
                  }}
                  className="flex-1 sm:flex-none h-8.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold shadow-md shadow-blue-950/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{activeSlideData.primaryCta}</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => {
                    if (activeSlideData.secondaryTarget === 'call') onOpenCall();
                    else onNavigate(activeSlideData.secondaryTarget);
                  }}
                  className="flex-1 sm:flex-none h-8.5 px-3 rounded-xl bg-white/15 hover:bg-white/20 text-white text-[11px] font-bold border border-white/25 active:scale-95 transition-all flex items-center justify-center text-center backdrop-blur-xs cursor-pointer"
                >
                  {activeSlideData.secondaryCta}
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Left / Right Navigation Chevrons */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-xs flex items-center justify-center active:scale-90 transition-all border border-white/10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-xs flex items-center justify-center active:scale-90 transition-all border border-white/10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Pagination Indicators */}
        <div className="bg-[#071328] px-3.5 py-1.5 flex items-center justify-between border-t border-white/10 text-[9.5px]">
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-5 bg-blue-500 shadow-xs' 
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span className="truncate">{activeSlideData.pillRight}</span>
          </div>
        </div>
      </div>

      {/* 4. OUR LICENSED EXPERTS ARE HERE TO HELP (Authority Card) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 leading-snug">
              <span>Our Licensed Experts are here to help.</span>
              <span className="text-rose-500">❤️</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              IBEW Licensed Electronics Engineers & Clinical Industrial Hygienists since 2003. Zero-fee triage.
            </p>
          </div>

          {/* Expert Avatar */}
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-xs">
                <img 
                  src="/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg" 
                  alt="Dr. J. Dumanov" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
            </div>
            <span className="text-[10px] font-bold text-slate-800 mt-1">Dr. J. Dumanov</span>
            <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded border border-blue-200/50 mt-0.5">
              IBEW & Chief DX
            </span>
          </div>
        </div>

        {/* 3 Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <button
            onClick={onOpenChat}
            className="h-11 px-2.5 rounded-xl bg-blue-50/90 hover:bg-blue-100/90 text-blue-700 text-xs font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs border border-blue-100/50"
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Chat</span>
          </button>

          <button
            onClick={onOpenCall}
            className="h-11 px-2.5 rounded-xl bg-blue-50/90 hover:bg-blue-100/90 text-blue-700 text-xs font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs border border-blue-100/50"
          >
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Call Direct</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="relative h-11 px-2.5 rounded-xl bg-blue-50/90 hover:bg-blue-100/90 text-blue-700 text-xs font-extrabold transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs border border-blue-100/50"
          >
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Free Consult</span>
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[7.5px] font-black uppercase shadow-xs">
              Free
            </span>
          </button>
        </div>
      </div>

      {/* 5. EXPLORE BY CATEGORY */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            EXPLORE BY CATEGORY
          </h2>
          <button 
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            <span>Full Technical Guide</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 h-8.5 px-3.5 rounded-full text-xs whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#0b162c] text-white font-extrabold shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. FOUR 2-COLUMN ACTION DOMAIN CARDS */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card 1: Dark Navy */}
        <button
          onClick={() => onNavigate('services')}
          className="text-left rounded-2xl p-3.5 bg-[#0b1b36] hover:bg-[#0e2347] text-white shadow-md active:scale-98 transition-all flex flex-col justify-between h-34 border border-blue-900/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Search className="w-4 h-4 text-blue-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-[9px] font-black text-white">
              14 Protocols
            </span>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1">
              <span>Find Services</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-tight">
              Residential, Commercial & Schools
            </p>
          </div>
        </button>

        {/* Card 2: Forest Emerald */}
        <button
          onClick={() => onNavigate('reports')}
          className="text-left rounded-2xl p-3.5 bg-[#0b3824] hover:bg-[#0e472e] text-white shadow-md active:scale-98 transition-all flex flex-col justify-between h-34 border border-emerald-900/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sliders className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-[9px] font-black text-white">
              Interactive
            </span>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1">
              <span>EMF vs EMI Guide</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-[10px] text-emerald-100 mt-1 line-clamp-2 leading-tight">
              60Hz Magnetic vs 60GHz RFR
            </p>
          </div>
        </button>

        {/* Card 3: Warm Rust / Caramel */}
        <button
          onClick={() => onNavigate('experts')}
          className="text-left rounded-2xl p-3.5 bg-[#662a05] hover:bg-[#7e3407] text-white shadow-md active:scale-98 transition-all flex flex-col justify-between h-34 border border-amber-900/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-600 text-[9px] font-black text-white">
              sC-Ve ®™
            </span>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1">
              <span>Clinical DX</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-[10px] text-amber-100 mt-1 line-clamp-2 leading-tight">
              Neuropathology & cancer risk
            </p>
          </div>
        </button>

        {/* Card 4: Deep Ocean Blue */}
        <button
          onClick={() => onNavigate('experts')}
          className="text-left rounded-2xl p-3.5 bg-[#094269] hover:bg-[#0c5282] text-white shadow-md active:scale-98 transition-all flex flex-col justify-between h-34 border border-cyan-900/40 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Scale className="w-4 h-4 text-cyan-300" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-600 text-[9px] font-black text-white">
              Court Proven
            </span>
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs sm:text-sm leading-tight flex items-center gap-1">
              <span>Legal & Realty</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </h3>
            <p className="text-[10px] text-cyan-100 mt-1 line-clamp-2 leading-tight">
              Buyer/seller due diligence
            </p>
          </div>
        </button>
      </div>

      {/* 7. RESIDENTIAL & COMMERCIAL EMF TESTING SPOTLIGHT */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 block">
              FEATURED SCIENTIFIC PROTOCOLS
            </span>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 mt-0.5">
              Comprehensive On-Site Diagnostics
            </h3>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Service 1 */}
          <div 
            onClick={() => onNavigate('services')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200/80">
              <img 
                src="/assets/EMF-safe-home-testing.jpg" 
                alt="Residential EMF"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => { e.target.src = "/assets/Power-systems.jpg"; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[8.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">
                  Residential
                </span>
                <span className="text-[10px] text-slate-400">Low-Freq 60Hz</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-slate-900 truncate mt-0.5 group-hover:text-blue-600 transition-colors">
                Residential EMF & Stray Ground Voltage Testing
              </h4>
              <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                Substations, power lines, pool shocks & whole-house passive grounding solutions.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
          </div>

          {/* Service 2 */}
          <div 
            onClick={() => onNavigate('services')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200/80">
              <img 
                src="/assets/5G-antenna-1030x896.jpg" 
                alt="5G Telecom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => { e.target.src = "/assets/rooftop_garden_radiation-1030x550.jpg"; }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[8.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800">
                  Telecom
                </span>
                <span className="text-[10px] text-slate-400">High-Freq RFR</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-slate-900 truncate mt-0.5 group-hover:text-blue-600 transition-colors">
                4G, 5G & 6G Wireless Antenna Diagnostics
              </h4>
              <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                Rooftop arrays, small-cell beamforming & certified architectural RF window film.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
          </div>

          {/* Service 3 */}
          <div 
            onClick={() => onNavigate('services')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200/80">
              <img 
                src="/assets/Electro-Magentic-Interferece-EMI-2003-1.jpg" 
                alt="Medical Implant EMI"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[8.5px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-100 text-rose-700">
                  Life Safety
                </span>
                <span className="text-[10px] text-slate-400">ISO/AAMI 14117</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-slate-900 truncate mt-0.5 group-hover:text-blue-600 transition-colors">
                Medical Implant (ICD / Pacemaker) EMI Triage
              </h4>
              <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                Level 2/3 EV fast chargers, induction cooktops & workplace electrical zoning.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
          </div>
        </div>
      </div>

      {/* 8. FEATURED CASE STUDY PREVIEW */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c234a] via-[#0d346c] to-[#124285] text-white p-4.5 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
            <span>🔬</span>
            <span>PUBLISHED FORENSIC CASE STUDY</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            100% Neutralized
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-heading font-extrabold text-sm sm:text-base leading-snug">
            Brick, NJ: Residential Stray Ground Voltage Resolved
          </h3>
          <p className="text-xs text-blue-100/90 leading-relaxed">
            Severe ground voltage shocks up to 14.8 Volts AC around swimming pool and plumbing neutralized through differential oscilloscopy and physical passive dissipation barriers.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => onNavigate('reports')}
            className="h-9 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-xs"
          >
            <span>Read Case Dossier</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="h-9 px-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all active:scale-95"
          >
            Request Inspection
          </button>
        </div>
      </div>

      {/* 9. CLIENT ENDORSEMENT CARD */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              Client Endorsement
            </span>
          </div>
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Verified Study
          </span>
        </div>

        <p className="text-xs text-slate-700 italic leading-relaxed">
          "My professional clients have been very pleased with me for locating the only fully licensed EMF technical and medical expert. Comprehensive and highly detailed technical and clinical exposure services."
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
              AB
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Abe Berman</p>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">Licensed Real Estate Agent • Princeton, NJ</p>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">June 17</span>
        </div>
      </div>

      {/* 10. IMMEDIATE EXPOSURE CONCERNS & DISPATCH HOTLINE */}
      <div className="bg-[#f0f4fc] rounded-3xl p-4 border border-blue-100 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold uppercase tracking-wide text-rose-600 block leading-tight">
              IMMEDIATE EXPOSURE CONCERNS?
            </span>
            <p className="text-xs font-extrabold text-slate-900 leading-tight mt-0.5">
              Call Direct: 347-491-9867
            </p>
            <p className="text-[10px] text-slate-500 truncate leading-tight mt-0.5">
              EMFmedicalExpert@gmail.com
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCall}
          className="h-10 px-4.5 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm shrink-0 active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
}
