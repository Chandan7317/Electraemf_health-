import React, { useState, useEffect, useRef } from 'react';
import {
  Search, MapPin, MessageSquare, Phone, Mail,
  ArrowRight, ChevronRight, Star, AlertCircle,
  Activity, ShieldCheck, Scale, Zap, CheckCircle2,
  Sliders, Compass, FileText, Building2, School, HeartPulse,
  ExternalLink, Sparkles, Award, Radio
} from 'lucide-react';
import { FiMessageSquare, FiPhone, FiChevronRight } from 'react-icons/fi';
import { RiFileUserLine } from 'react-icons/ri';
import { electraData } from '../data/electraData';

export default function HomeDashboard({
  onNavigate,
  onOpenSearch,
  onOpenChat,
  onOpenCall,
  onSelectService,
  onOpenAssessmentModal,
  onOpenEMFMeter
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Horizontal Category Scroll Ref & Mouse Dragging / Wheel Support
  const categoryScrollRef = useRef(null);
  const isDraggingCategories = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasDraggedCategory = useRef(false);

  // Enable Mouse Wheel Horizontal Scrolling on Category Pills
  useEffect(() => {
    const el = categoryScrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleCategoryMouseDown = (e) => {
    if (!categoryScrollRef.current) return;
    isDraggingCategories.current = true;
    hasDraggedCategory.current = false;
    dragStartX.current = e.pageX - categoryScrollRef.current.offsetLeft;
    dragStartScrollLeft.current = categoryScrollRef.current.scrollLeft;
  };

  const handleCategoryMouseMove = (e) => {
    if (!isDraggingCategories.current || !categoryScrollRef.current) return;
    const x = e.pageX - categoryScrollRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.4;
    if (Math.abs(x - dragStartX.current) > 5) {
      hasDraggedCategory.current = true;
    }
    categoryScrollRef.current.scrollLeft = dragStartScrollLeft.current - walk;
  };

  const handleCategoryMouseUpOrLeave = () => {
    isDraggingCategories.current = false;
  };

  // Hero Carousel State (Default to index 3: Medical Implants to match reference screenshot)
  const [currentSlide, setCurrentSlide] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 5 Authentic Slides matching electraemfhealth.com website
  const heroSlides = [
    {
      id: 1,
      badge: "POWER UTILITY & SUBSTATION DOSIMETRY",
      badgeIcon: "⚡",
      badgeColor: "text-cyan-300 bg-cyan-950/60 border-cyan-500/30",
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
      id: 2,
      badge: "COURT-CERTIFIED CLINICAL & LEGAL EXPERTS",
      badgeIcon: "⚡",
      badgeColor: "text-amber-300 bg-amber-950/60 border-amber-500/30",
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
      id: 3,
      badge: "HIGH-FREQUENCY TELECOM SPECTRUM",
      badgeIcon: "📡",
      badgeColor: "text-blue-300 bg-blue-950/60 border-blue-500/30",
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
      badgeColor: "text-rose-300 bg-rose-950/60 border-rose-500/30",
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
      badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-500/30",
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

  // Auto-slide effect every 5 seconds (paused on touch/hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
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

  // Dynamic scientific protocols matching electraemf scientific capabilities
  const allProtocols = [
    {
      id: 'res-stray-ground',
      title: 'Residential EMF & Stray Ground Voltage Testing',
      category: 'residential',
      categoryLabel: 'Residential',
      badgeColor: 'bg-blue-100 text-blue-700',
      freqSpec: 'Low-Freq 60Hz',
      description: 'Substations, power lines, pool shocks & whole-house passive grounding solutions.',
      image: '/assets/EMF-safe-home-testing.jpg'
    },
    {
      id: 'telecom-5g-arrays',
      title: '4G, 5G & 6G Wireless Antenna Diagnostics',
      category: 'all',
      categoryLabel: 'Telecom',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      freqSpec: 'High-Freq RFR',
      description: 'Rooftop arrays, small-cell beamforming & certified architectural RF window film.',
      image: '/assets/5G-antenna-1030x896.jpg'
    },
    {
      id: 'medical-implant-triage',
      title: 'Medical Implant (ICD / Pacemaker) EMI Triage',
      category: 'medical',
      categoryLabel: 'Life Safety',
      badgeColor: 'bg-rose-100 text-rose-700',
      freqSpec: 'ISO/AAMI 14117',
      description: 'Level 2/3 EV fast chargers, induction cooktops & workplace electrical zoning.',
      image: '/assets/Electro-Magentic-Interferece-EMI-2003-1.jpg'
    },
    {
      id: 'comm-power-substation',
      title: 'Commercial, Industrial & Power Utility Studies',
      category: 'commercial',
      categoryLabel: 'Commercial',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      freqSpec: 'Substations & Grid',
      description: 'High-voltage step-down substations, server room ground current loops & OSHA compliance.',
      image: '/assets/power_substation.jpg'
    },
    {
      id: 'legal-due-diligence',
      title: 'Legal & Realty Expert Witness Due Diligence',
      category: 'legal',
      categoryLabel: 'Legal & Realty',
      badgeColor: 'bg-amber-100 text-amber-800',
      freqSpec: 'Court Certified',
      description: 'Pre-purchase buyer due diligence, real estate disclosure reports & expert witness testimony.',
      image: '/assets/Hudsone-Valley-Westchester-EMF-Testing-Expert.jpg'
    },
    {
      id: 'res-living-space',
      title: 'Living Space & Nursery Room Shielding Audits',
      category: 'residential',
      categoryLabel: 'Living Space',
      badgeColor: 'bg-blue-100 text-blue-700',
      freqSpec: 'Magnetic & Electric',
      description: 'Bedrooms, children rooms, smart meter RF pulses, and plumbing current leakage.',
      image: '/assets/Long-Island-EMF-Testing.jpg'
    }
  ];

  // Filter protocols according to selected tab
  const displayedProtocols = selectedCategory === 'all'
    ? allProtocols.slice(0, 4)
    : allProtocols.filter(p => p.category === selectedCategory || (selectedCategory === 'residential' && p.category === 'residential'));

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
    <div className="space-y-3.5 pb-24">
      {/* 1. TOP SEARCH BAR (Section 3: Full-width rounded search input) */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center bg-white rounded-full border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] pl-4 pr-1.5 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchQuery}
            onFocus={() => {
              if (onOpenSearch) onOpenSearch(searchQuery);
            }}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search EMF testing, 5G/6G, power lines..."
            className="flex-1 bg-transparent text-xs text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none min-w-0"
          />
          <button
            type="submit"
            className="h-8.5 px-4 rounded-full bg-[#1d61f2] hover:bg-blue-600 text-white text-xs font-extrabold transition-all shadow-xs active:scale-95 shrink-0 flex items-center justify-center cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* 2. LICENSED SERVICE AREA STRIP (Section 4: Location Pin, State Area, Change Button) */}
      <div className="bg-white rounded-2xl p-2.5 px-3.5 border border-slate-200/80 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <MapPin className="w-4 h-4 stroke-[2.2]" />
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
          className="h-7.5 px-3 rounded-full bg-blue-50 hover:bg-blue-100/90 text-blue-600 text-[11px] font-bold transition-all active:scale-95 shrink-0 flex items-center justify-center border border-blue-100/60 cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* 3. HERO SECTION – AUTOMATIC IMAGE CAROUSEL */}
      <div
        className="relative overflow-hidden rounded-[26px] bg-slate-900 text-white shadow-lg select-none border border-slate-200/40"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Banner Stage: Natural Brightness Background Image */}
        <div className="relative h-[235px] sm:h-[250px] w-full overflow-hidden">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center brightness-105 contrast-[1.02]"
                  onError={(e) => {
                    e.target.src = "/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg";
                  }}
                />
                {/* Subtle bottom-focused gradient only behind lower text to keep background bright & clear */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 via-50% to-transparent pointer-events-none" />
              </div>
            );
          })}

          {/* Slide Content: Displays active slide's heading and buttons directly over the image */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-3.5 px-4 sm:px-5 pointer-events-none">
            <div
              key={activeSlideData.id}
              className="space-y-2 animate-in fade-in duration-300 pointer-events-auto"
            >
              {/* Bold Banner Heading */}
              <h1 className="text-[15px] sm:text-[16px] font-heading font-extrabold text-white leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] line-clamp-2">
                {activeSlideData.title}
              </h1>

              {/* Compact CTA Buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => {
                    if (activeSlideData.primaryTarget === 'call') onOpenCall();
                    else onNavigate(activeSlideData.primaryTarget);
                  }}
                  className="h-7.5 px-3.5 rounded-full bg-[#1d61f2] hover:bg-blue-600 text-white text-[10.5px] font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>{activeSlideData.primaryCta}</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.2]" />
                </button>

                <button
                  onClick={() => {
                    if (activeSlideData.secondaryTarget === 'call') onOpenCall();
                    else onNavigate(activeSlideData.secondaryTarget);
                  }}
                  className="h-7.5 px-3 rounded-full bg-black/45 hover:bg-black/65 text-white text-[10.5px] font-medium border border-white/30 active:scale-95 transition-all flex items-center justify-center text-center backdrop-blur-sm cursor-pointer shrink-0"
                >
                  {activeSlideData.secondaryCta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Pagination: Centered horizontally, no right-side content */}
        <div className="bg-[#071328] py-2 px-4 flex items-center justify-center border-t border-white/10">
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide
                  ? 'w-4.5 bg-[#1d61f2] shadow-xs'
                  : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4. LICENSED CLINICAL TRIAGE CARD */}
      <div className="bg-white rounded-[26px] p-4.5 border border-slate-100 shadow-[0_3px_12px_rgba(0,0,0,0.03)] space-y-3.5">
        <div>
          <h2 className="text-[17px] font-heading font-extrabold text-slate-900 leading-tight">
            Licensed Clinical Triage
          </h2>
          <p className="text-[11.5px] text-slate-500 mt-1 leading-normal">
            Direct physician-engineering consultation. Rapid zero-fee intake.
          </p>
        </div>

        {/* 3 Quick Action Buttons: Live Chat, Call Direct, Free DX (using react-icons) */}
        <div className="grid grid-cols-3 gap-2.5 pt-0.5">
          {/* Button 1: Live Chat */}
          <button
            onClick={onOpenChat}
            className="p-3 py-3.5 rounded-2xl bg-[#edf3fe] hover:bg-blue-100/90 text-center flex flex-col items-center justify-center transition-all active:scale-95 border border-blue-100/60 shadow-2xs cursor-pointer group"
          >
            <FiMessageSquare className="w-5 h-5 text-[#1d61f2] stroke-[2.2] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-extrabold text-slate-900 mt-2 leading-none">Live Chat</span>
          </button>

          {/* Button 2: Call Direct */}
          <button
            onClick={onOpenCall}
            className="p-3 py-3.5 rounded-2xl bg-[#edf3fe] hover:bg-blue-100/90 text-center flex flex-col items-center justify-center transition-all active:scale-95 border border-blue-100/60 shadow-2xs cursor-pointer group"
          >
            <FiPhone className="w-5 h-5 text-[#1d61f2] stroke-[2.2] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-extrabold text-slate-900 mt-2 leading-none">Call Direct</span>
          </button>

          {/* Button 3: Free DX */}
          <div className="relative">
            <span className="absolute -top-1.5 -right-1 px-2 py-0.5 rounded-full bg-[#1d61f2] text-white text-[8px] font-black uppercase shadow-xs tracking-wider z-10 pointer-events-none">
              FREE
            </span>
            <button
              onClick={() => onNavigate('profile')}
              className="w-full h-full p-3 py-3.5 rounded-2xl bg-[#dfeafd] hover:bg-blue-200/80 text-center flex flex-col items-center justify-center transition-all active:scale-95 border border-blue-200/60 shadow-2xs cursor-pointer group"
            >
              <RiFileUserLine className="w-5 h-5 text-[#1d61f2] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-extrabold text-slate-900 mt-2 leading-none">Free DX</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. EXPLORE BY CATEGORY (Section 7: Filter tabs, count badges, horizontal scroll) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            EXPLORE BY CATEGORY
          </h2>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Full Technical Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Category Filter Pills with Mouse Wheel & Drag Support */}
        <div
          ref={categoryScrollRef}
          onMouseDown={handleCategoryMouseDown}
          onMouseMove={handleCategoryMouseMove}
          onMouseUp={handleCategoryMouseUpOrLeave}
          onMouseLeave={handleCategoryMouseUpOrLeave}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 select-none cursor-grab active:cursor-grabbing"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (hasDraggedCategory.current) return;
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 h-9 px-4 rounded-full text-xs whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 ${isSelected
                  ? 'bg-[#0b162c] text-white font-extrabold shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 font-bold'
                  }`}
              >
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isSelected ? 'bg-[#1d61f2] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. FOUR 2-COLUMN ACTION DOMAIN CARDS (Proper clear image, natural vignette, no color wash or blur) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card 1: Find Services */}
        <button
          onClick={() => onNavigate('services')}
          className="relative overflow-hidden text-left rounded-2xl p-3.5 bg-slate-950 text-white shadow-md active:scale-98 transition-all flex flex-col justify-end h-[140px] sm:h-[148px] border border-blue-500/30 group cursor-pointer"
        >
          {/* Proper Full-Color Category Background Image */}
          <img
            src="/assets/EMF-safe-home-testing.jpg"
            alt="Find Services"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 pointer-events-none"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Clean Natural Vignette: Dark bottom for text contrast, clear top/center */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-50% to-black/20 pointer-events-none" />

          {/* Bottom Row: Title + Subtitle */}
          <div className="relative z-10">
            <h3 className="font-heading font-extrabold text-[13.5px] sm:text-sm leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>Find Services</span>
              <FiChevronRight className="w-3.5 h-3.5 text-blue-300 opacity-90 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </h3>
            <p className="text-[10px] text-white/90 mt-1 line-clamp-2 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Residential, Commercial & Schools
            </p>
          </div>
        </button>

        {/* Card 2: EMF vs EMI Guide */}
        <button
          onClick={() => onNavigate('reports')}
          className="relative overflow-hidden text-left rounded-2xl p-3.5 bg-slate-950 text-white shadow-md active:scale-98 transition-all flex flex-col justify-end h-[140px] sm:h-[148px] border border-emerald-500/30 group cursor-pointer"
        >
          {/* Proper Full-Color Category Background Image */}
          <img
            src="/assets/rooftop_garden_radiation-1030x550.jpg"
            alt="EMF vs EMI Guide"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 pointer-events-none"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Clean Natural Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-50% to-black/20 pointer-events-none" />

          {/* Bottom Row: Title + Subtitle */}
          <div className="relative z-10">
            <h3 className="font-heading font-extrabold text-[13.5px] sm:text-sm leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>EMF vs EMI Guide</span>
              <FiChevronRight className="w-3.5 h-3.5 text-emerald-300 opacity-90 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </h3>
            <p className="text-[10px] text-white/90 mt-1 line-clamp-2 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              60Hz Magnetic vs 60GHz RFR
            </p>
          </div>
        </button>

        {/* Card 3: Clinical DX */}
        <button
          onClick={() => onNavigate('experts')}
          className="relative overflow-hidden text-left rounded-2xl p-3.5 bg-slate-950 text-white shadow-md active:scale-98 transition-all flex flex-col justify-end h-[140px] sm:h-[148px] border border-amber-500/30 group cursor-pointer"
        >
          {/* Proper Full-Color Category Background Image */}
          <img
            src="/assets/Electro-Magentic-Interferece-EMI-2003-1.jpg"
            alt="Clinical DX"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 pointer-events-none"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Clean Natural Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-50% to-black/20 pointer-events-none" />

          {/* Bottom Row: Title + Subtitle */}
          <div className="relative z-10">
            <h3 className="font-heading font-extrabold text-[13.5px] sm:text-sm leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>Clinical DX</span>
              <FiChevronRight className="w-3.5 h-3.5 text-amber-300 opacity-90 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </h3>
            <p className="text-[10px] text-white/90 mt-1 line-clamp-2 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Neuropathology & cancer risk
            </p>
          </div>
        </button>

        {/* Card 4: Legal & Realty */}
        <button
          onClick={() => onNavigate('experts')}
          className="relative overflow-hidden text-left rounded-2xl p-3.5 bg-slate-950 text-white shadow-md active:scale-98 transition-all flex flex-col justify-end h-[140px] sm:h-[148px] border border-cyan-500/30 group cursor-pointer"
        >
          {/* Proper Full-Color Category Background Image */}
          <img
            src="/assets/Hudsone-Valley-Westchester-EMF-Testing-Expert.jpg"
            alt="Legal & Realty"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 pointer-events-none"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Clean Natural Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-50% to-black/20 pointer-events-none" />

          {/* Bottom Row: Title + Subtitle */}
          <div className="relative z-10">
            <h3 className="font-heading font-extrabold text-[13.5px] sm:text-sm leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>Legal & Realty</span>
              <FiChevronRight className="w-3.5 h-3.5 text-cyan-300 opacity-90 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </h3>
            <p className="text-[10px] text-white/90 mt-1 line-clamp-2 leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Buyer/seller due diligence
            </p>
          </div>
        </button>
      </div>

      {/* 7. FEATURED SCIENTIFIC PROTOCOLS (Section 9: Compact horizontal cards, badges, navigation) */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block">
              FEATURED SCIENTIFIC PROTOCOLS
            </span>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 mt-0.5">
              Comprehensive On-Site Diagnostics
            </h3>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {displayedProtocols.map((protocol) => (
            <div
              key={protocol.id}
              onClick={() => onNavigate('services')}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200/80">
                <img
                  src={protocol.image}
                  alt={protocol.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => { e.target.src = "/assets/Power-systems.jpg"; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[8.5px] font-bold uppercase px-1.5 py-0.2 rounded ${protocol.badgeColor}`}>
                    {protocol.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {protocol.freqSpec}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-xs text-slate-900 truncate mt-0.5 group-hover:text-blue-600 transition-colors">
                  {protocol.title}
                </h4>
                <p className="text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                  {protocol.description}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 8. FEATURED FORENSIC CASE STUDY (Section 10: Deep-blue gradient, 100% Neutralized, 2 buttons) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c234a] via-[#0d346c] to-[#071936] text-white p-5 shadow-lg border border-blue-400/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <span>🔬</span>
            <span>PUBLISHED FORENSIC CASE STUDY</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
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
            className="h-9 px-4 rounded-xl bg-[#1d61f2] hover:bg-blue-500 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-blue-950/40 cursor-pointer"
          >
            <span>Read Case Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="h-9 px-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            Request Inspection
          </button>
        </div>
      </div>

      {/* 9. CLIENT TESTIMONIAL (Section 11: 5 Stars, Verified Study, Abe Berman quote) */}
      <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-2.5">
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
          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Verified Study
          </span>
        </div>

        <p className="text-xs text-slate-700 italic leading-relaxed">
          "My professional clients have been very pleased with me for locating the only fully licensed EMF technical and medical expert. Comprehensive and highly detailed technical and clinical exposure services."
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7.5 h-7.5 rounded-full bg-blue-100 text-[#1d61f2] flex items-center justify-center text-xs font-bold border border-blue-200/60">
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

      {/* 10. EMERGENCY CONTACT SECTION (Section 12: Immediate exposure concerns, call & email) */}
      <div className="bg-[#f0f4fc] rounded-3xl p-4 border border-blue-100 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9.5 h-9.5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200/50">
            <AlertCircle className="w-4.5 h-4.5" />
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
          className="h-10 px-4.5 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm shrink-0 active:scale-95 transition-all cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call</span>
        </button>
      </div>
    </div>
  );
}
