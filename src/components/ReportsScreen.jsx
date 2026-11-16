import React, { useState } from 'react';
import { 
  FileText, Phone, Mail, ShieldAlert, ArrowRight, 
  ChevronDown, ChevronUp, Star, CheckSquare, Square,
  AlertTriangle, BookOpen, ExternalLink, ShieldCheck, Scale, Zap, Radio, Sparkles
} from 'lucide-react';
import ArticleModal from './ArticleModal';
import StandardsComparisonModal from './StandardsComparisonModal';
import { electraData } from '../data/electraData';
import { allPagesFull } from '../data/allPagesFull';

export default function ReportsScreen({ onOpenCall, onNavigate }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
  const [activeArticle, setActiveArticle] = useState(null);
  const [isStandardsOpen, setIsStandardsOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleCheck = (idx) => {
    const updated = [...checkedItems];
    updated[idx] = !updated[idx];
    setCheckedItems(updated);
  };

  const featuredCases = [
    {
      id: 'nj-stray-voltage-pool',
      title: 'Brick, NJ Ground Voltage Pool & Lawn Remediation Case',
      headline: 'ABC News Investigative Coverage: Stray Ground Voltage Mystery Solved',
      location: 'Brick, Ocean County, NJ',
      category: 'Stray Voltage & Ground Current',
      image: '/assets/children_playing_near_high_voltage_lines.png',
      badgeTop: 'SUB-STATION GROUND FAULT',
      badgeSub: 'Stray AC/DC Differential',
      tagCorner: 'ABC NEWS "MYSTERY"',
      summary: 'Stray underground AC/DC ground voltages into residential swimming pools and yards prevented family from using their backyard lawn and pool equipment. Frequent water skin shocks logged at 4V. electraEMF laboratory differential oscilloscopy traced secondary utility conduit return leakage, and implemented confirmed technical ground remediation.',
      details: [
        'Family reported unexplainable electric shocks whenever stepping into their swimming pool or walking barefoot on the grass.',
        'Local power utility claimed all neighborhood transformers and neutral conductors were within regulatory specs.',
        "electraEMF's licensed electronics engineer deployed multi-point ground voltage dataloggers and uncovered elevated return currents traversing the water table from distant utility substations.",
        'Engineering report compelled utility remediation and protected family from hazardous contact voltage.'
      ],
      outcome: '100% Remediated Ground Voltage. Zero contact voltage detected across pool coping and lawn.'
    },
    {
      id: 'hartford-5g-telecom',
      title: 'Hartford Debilitating 5G Early Subsystem Case',
      headline: 'Clinical Neuro-Cardiological Investigation of Micro-Cell Exposure',
      location: 'Hartford, Connecticut',
      category: 'Telecom & High-Frequency RF',
      image: '/assets/5G-antenna-1030x896.jpg',
      badgeTop: 'MULTI-SPECTRUM RFR',
      badgeSub: 'Sub-6 & 39GHz Transmitters',
      tagCorner: 'Medical DX Study',
      summary: 'Biomechanical clinical medical investigation of sensory organ and high-frequency RF saturation causing severe neurocardiological symptoms in a 42-year-old female resident 240 ft from underlying cell facilities. Complete spatial RF frequency deconstruction identified pulsed micro-wave bursts of 45 thousand microwatts/sq meter.',
      details: [
        'Resident suffered acute sleep fragmentation, chronic migraines, and sensory paresthesias following rooftop 5G deployment.',
        'Directional isotropic spectrum analysis recorded peak pulse emissions over 45,000 µW/m² penetrating bedroom glass.',
        'electraEMF designed custom architectural multi-layer RF attenuation barriers reducing indoor fields by 99.8%.',
        'Formal ISO/AAMI 14117 medical device and neurological clearance certificate issued.'
      ],
      outcome: 'Indoor RF power density lowered below 10 µW/m²; complete resolution of clinical symptoms.'
    },
    {
      id: 'manhattan-high-rise-static',
      title: 'Lower Manhattan Luxury High-Rise Static Fields',
      headline: 'High-Rise Electrostatic Accumulation & DC Transit Resonance',
      location: 'Manhattan, New York City',
      category: 'Electrostatic & DC Grounding',
      image: '/assets/NYC-Office-EMF-testing-for-helath-and-safety-2023.jpg',
      badgeTop: 'PEDESTRIAN TIER HIGH-RISE',
      badgeSub: '800 V/m Electrostatic',
      tagCorner: '500 V/m DISCHARGED',
      summary: 'Residents experienced severe peripheral neurological sensations and auditory clicking. Testing identified non-conductive flooring generating static electric potentials up to 500 V/m coupled with street D.C. tramway return loops. Physical whole-residence Faraday grounded passive conductive dissipation barriers.',
      details: [
        'Penthouse residents reported tingling sensations across skin, static shocks touching doorknobs, and sleep disturbances.',
        'Testing identified non-conductive flooring building static electric potentials up to 500 V/m coupled with municipal DC rail return loops.',
        'electraEMF engineered passive dissipative conductive floor transitions connected to a dedicated equipotential ground plane.',
        'Full static discharge verified with zero residual electrostatic accumulation.'
      ],
      outcome: '500 V/m Static completely discharged to safe baseline (< 10 V/m).'
    },
    {
      id: 'westchester-real-estate-recovery',
      title: 'Hudson Valley & Hamptons Real Estate Rehabilitation',
      headline: 'Defeating Inadmissible Gadget Reports in Court and Restoring Property Value',
      location: 'Westchester County & Hamptons, NY',
      category: 'Real Estate Due Diligence & Court Testimony',
      image: '/assets/EMF-safe-home-testing.jpg',
      badgeTop: 'PROPERTY VALUATION RECOVERY',
      badgeSub: '100% Price Restored',
      tagCorner: 'SUPREME COURT OVERRULED',
      summary: 'High-end properties severely devalued and stalled after amateur "ghost-buster" consultants produced terrifying, fabricated claims near distant substations. electraEMF\'s certified engineering reports definitively disproved bogus claims, rehabilitating property market valuation by over 80%.',
      details: [
        'Luxury property transaction stalled when buyer presented uncalibrated hobbyist meter reading claiming lethal fields.',
        'electraEMF IBEW licensed engineer conducted certified 3D magnetic falloff contour study under legal chain of custody.',
        'Demonstrated that distant 60Hz power utility lines attenuated to ambient baseline (< 0.4 mG) at the property line.',
        'Certified evidentiary dossier accepted by court and escrow title, releasing millions in stalled real estate value.'
      ],
      outcome: 'Stigmatized property cleared; transaction successfully closed at 100% full market value.'
    }
  ];

  const educationalArticles = [
    {
      id: '10-household-items-that-produce-em-waves',
      title: 'From Microwave to TV: 10 Household Items Producing EM Waves',
      category: 'Home EMF Safety',
      readTime: '4 min read',
      tag: 'Scientific Breakdown',
      excerpt: 'Explore the 10 everyday household appliances emitting electromagnetic waves, their operating frequencies, and practical biological protection.'
    },
    {
      id: '01-what-is-the-best-meter-for-emf-testing',
      title: 'Why Hobbyist Meters (Trifield, Cornet) Fail in Real Testing',
      category: 'Consumer Protection',
      readTime: '6 min read',
      tag: 'Industry Truth',
      excerpt: 'Why uncalibrated commercial gadget meters produce terrifying false positives and lack legal standing in real estate and court.'
    },
    {
      id: 'understanding-the-ieee-emf-exposure-standards',
      title: 'Understanding IEEE & FCC Standards vs. Biological Reality',
      category: 'Regulatory Standards',
      readTime: '8 min read',
      tag: 'sC-Ve™ Protocol',
      excerpt: 'How 1990s FCC thermal guidelines ignore chronic subclinical health effects, and why electraEMF tests to biological safety limits.'
    },
    {
      id: 'how_does_emf_shielding_work_to_prevent_emf_exposure',
      title: 'How Does EMF Shielding Really Work to Prevent Exposure?',
      category: 'Remediation & Physics',
      readTime: '5 min read',
      tag: 'Shielding Science',
      excerpt: 'The physics of MuMetal, RF window films, and why ungrounded bed canopies often amplify whole-body voltage.'
    }
  ];

  const handleOpenArticle = (item) => {
    // Check if full article exists in allPagesFull
    const full = allPagesFull[item.id];
    if (full && full.sections && full.sections.length > 0) {
      setActiveArticle({
        ...item,
        title: full.title || item.title,
        sections: full.sections
      });
    } else {
      setActiveArticle(item);
    }
  };

  const accordions = [
    {
      title: "The Truth About Common EMF Meters",
      content: "Popular consumer meters such as the Trifield TF2 or Cornet lack directional NIST calibration and exhibit severe non-linear response curves. They bundle magnetic, electric, and radio frequencies into arbitrary uncalibrated sums, generating terrifying false positives from harmless static electricity while remaining blind to high-frequency pulsed 5G digital beamforming."
    },
    {
      title: 'The "Faraday Cage" Myth & Flaw Nets',
      content: "Uncertified bed canopies, grounding mats, and metal window screens without continuous single-point RF drainage act as re-radiating antennae. Improperly grounded conductive fabrics often concentrate stray 60Hz ambient electric fields onto the sleeping occupant, exponentially increasing whole-body capacitive voltage."
    },
    {
      title: "Fake Smartphone Sensor Applications",
      content: "Mobile apps claiming to detect EMF radiation merely utilize the internal compass magnetometer calibrated for geomagnetic navigation (Earth's 50 µT static field). They are physically incapable of detecting 60Hz AC magnetic power waves or microwave cellular frequencies."
    },
    {
      title: "Warning: Unlicensed Meter-Reader Fraud",
      content: "Overnight 'EMF Consultants' certified through 2-day internet courses hold zero engineering license or court standing. They frequently exploit family fears to sell thousands of dollars in ineffective pendants, filters, and grounding plugs. Their reports are inadmissible in real estate disputes or legal proceedings."
    }
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* 1. TOP EVIDENTIARY REVIEWS BAR (Exact Image 5) */}
      <div className="bg-white rounded-2xl p-2.5 px-3.5 border border-slate-100 flex items-center justify-between shadow-xs">
        <div className="min-w-0 pr-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 block leading-tight">
            COURT-CERTIFIED EVIDENTIARY REVIEWS
          </span>
          <span className="text-[11px] font-bold text-slate-800 truncate block leading-tight mt-0.5">
            IBEW Licensed Technical, Medical & Legal Experts
          </span>
        </div>
        <button
          onClick={onOpenCall}
          className="h-8 px-3.5 rounded-full bg-[#0c1f3d] hover:bg-[#122e5a] text-white text-[10.5px] font-extrabold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <Phone className="w-3 h-3" />
          <span>Call Expert</span>
        </button>
      </div>

      {/* 2. RECEIVED A REPORT FROM AN AMATEUR "EMF CONSULTANT"? (Exact Image 5) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c1c38] via-[#0d2a58] to-[#123e7e] text-white p-5 shadow-lg space-y-3">
        <div className="space-y-1.5">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300">
            EVIDENTIARY DEFECT COUNTER-AUDIT
          </span>
          <h2 className="font-heading font-extrabold text-base sm:text-lg text-white leading-snug">
            Received a Report from an Amateur "EMF Consultant"?
          </h2>
          <p className="text-xs text-blue-100/90 leading-relaxed">
            Unlicensed gadget-readers lack legal standing, medical diagnostics, and electrical authority. Bring your findings to electraEMF's court-certified IBEW engineers and clinical industrial hygienists for a conclusive forensic review.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="tel:3474919867"
            className="w-full h-11 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Forensic Hotline: 347-491-9867</span>
          </a>

          <button
            onClick={() => onNavigate('profile')}
            className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Submit Report For Re-Examination</span>
          </button>
        </div>
      </div>

      {/* 3. FEATURED FIELD INVESTIGATIONS (Interactive Archive Dossiers) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wide px-1">
          <span>FEATURED FIELD INVESTIGATIONS</span>
          <span className="text-[10px] text-blue-600 font-bold">Tap To Read Full Dossier</span>
        </div>

        {featuredCases.map((cs) => (
          <div 
            key={cs.id}
            onClick={() => setActiveArticle(cs)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm space-y-3 pb-4 hover:border-blue-200 transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="relative h-40 w-full bg-slate-900">
              <img 
                src={cs.image} 
                alt={cs.title} 
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white">
                {cs.location}
              </div>
              <div className="absolute bottom-2.5 right-3 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
                {cs.tagCorner}
              </div>
            </div>

            <div className="px-4 space-y-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-extrabold px-2 py-0.2 rounded bg-blue-50 text-blue-700">
                  {cs.badgeTop}
                </span>
                <span className="text-[9px] font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                  {cs.badgeSub}
                </span>
              </div>

              <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                {cs.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {cs.summary}
              </p>

              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-slate-500 font-medium">
                <span className="text-emerald-600 font-bold truncate max-w-[200px]">
                  {cs.outcome}
                </span>
                <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5 shrink-0">
                  <span>Full Archive Dossier</span>
                  <ArrowRight className="w-3 h-3 inline" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3B. SCIENTIFIC STANDARDS & UNIT CONVERTER TOOL (Interactive Feature from electraemfhealth.com) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c1f3d] via-[#112d59] to-[#1a3f7c] text-white p-5 shadow-md space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 block">
                DOSIMETRY REFERENCE CALCULATOR
              </span>
              <h3 className="font-heading font-extrabold text-sm text-white">
                IEEE vs. sC-Ve™ Exposure Standards
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-[9px] font-bold border border-cyan-400/30">
            Interactive
          </span>
        </div>

        <p className="text-xs text-blue-100/90 leading-relaxed">
          Compare outdated 1990s FCC thermal limits against strict biological guidelines across 60Hz magnetic fields, 5G RF radiation, electric fields, and stray voltage.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={() => setIsStandardsOpen(true)}
            className="h-10 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Open Standards Tool</span>
          </button>
          <button
            type="button"
            onClick={() => setIsStandardsOpen(true)}
            className="h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 active:scale-98 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            <span>Unit Converter (mG/µT)</span>
          </button>
        </div>
      </div>

      {/* 3C. ELECTRAEMF SCIENTIFIC LIBRARY (48 Articles from electraemfhealth.com) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 block">
                ELECTRAEMF SCIENCE LIBRARY
              </span>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">
                Educational Research & Guides
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            Published Articles
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Peer-reviewed articles, meter teardowns, and shielding physics authored by IBEW engineers and clinical researchers.
        </p>

        <div className="space-y-2 pt-1">
          {educationalArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="p-3 rounded-2xl bg-slate-50/70 hover:bg-blue-50/60 border border-slate-100/80 hover:border-blue-200 transition-all cursor-pointer group space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="px-2 py-0.2 rounded bg-white text-blue-700 font-extrabold border border-blue-100 shadow-2xs">
                  {art.category}
                </span>
                <span className="text-slate-400 font-medium">{art.readTime}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {art.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                {art.excerpt}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-blue-600 font-extrabold">
                <span>Read Full Article</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONSUMER PROTECTION & SCIENTIFIC TRUTH (Exact Image 5 Accordion) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-wide text-blue-600 block">
            PUBLIC SAFETY ADVISORY
          </span>
          <h2 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 mt-0.5">
            Consumer Protection & Scientific Truth
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Addressing critical electromagnetic physics errors, commercial frauds, internet myths, and ungrounded gadget swindles.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          {accordions.map((item, idx) => {
            const isOpen = openAccordion === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 overflow-hidden transition-all bg-slate-50/50"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-3.5 text-left text-xs font-bold text-slate-800 flex items-center justify-between gap-2 hover:bg-slate-100/70"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    {item.title}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. VERIFIED CLIENT TESTIMONIALS SLIDER (Exact Image 5) */}
      <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-extrabold text-slate-900 uppercase">
              Verified Client Testimonials
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <span>★★★★★</span>
            <span className="text-slate-500 text-[10px]">5.0</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2">
          <div className="flex items-center text-amber-500 text-xs">
            ★★★★★
          </div>
          <p className="text-xs text-slate-700 italic leading-relaxed">
            "My professional clients have been very pleased with me for locating the only fully licensed EMF technical and medical expert. Thank you for your comprehensive and clinical exposure studies on such short notice."
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-50">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
              AB
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Abe Berman</p>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">Real Estate Agent • Princeton, NJ</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. DOES YOUR CASE REQUIRE LICENSED SCRUTINY? CHECKBOXES (Exact Image 5) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-xs sm:text-sm text-slate-900">
              Does Your Case Require Licensed Scrutiny?
            </h3>
            <p className="text-[10px] text-slate-400">
              Check any symptoms or environmental markers present:
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {[
            "Shock/tingling, ground shocks, or swimming pool stray voltage",
            "Unexplained auditory humming, twitching, or acute sleep disorder",
            "Proximity to HV power lines, rooftop antennas, or 5G/6G small cells",
            "Pending property sale stigmatized by previous amateur meter scan"
          ].map((text, idx) => (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`w-full p-3 rounded-2xl text-left text-xs flex items-center gap-2.5 border transition-all ${
                checkedItems[idx] 
                  ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                  : 'bg-slate-50/70 border-slate-100 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {checkedItems[idx] ? (
                <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-300 shrink-0" />
              )}
              <span className="leading-tight">{text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. FOOTER CERTIFICATION BOX (Exact Image 5) */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-1.5 text-xs text-slate-600">
        <span className="text-[9px] font-black uppercase text-blue-600 block">
          COURT-RECOGNIZED TRANSACTIONS & LITIGATION
        </span>
        <p className="text-[11px] leading-relaxed">
          Serving NY, NJ, CT, PA, and DE since 2003. All forensic reports certified under oath for Supreme, Superior, and District court proceedings.
        </p>
        <div className="flex items-center justify-center gap-3 pt-1 text-slate-900 font-bold text-xs">
          <a href="tel:3474919867" className="hover:text-blue-600">(347) 491-9867</a>
          <span>•</span>
          <a href="mailto:EMFmedicalExpert@gmail.com" className="hover:text-blue-600">EMFmedicalExpert@gmail.com</a>
        </div>
      </div>

      {/* Global Modals for Articles & Standards Tool */}
      <ArticleModal
        isOpen={Boolean(activeArticle)}
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onOpenCall={onOpenCall}
        onNavigateToContact={() => onNavigate && onNavigate('profile')}
      />

      <StandardsComparisonModal
        isOpen={isStandardsOpen}
        onClose={() => setIsStandardsOpen(false)}
        onNavigateToContact={() => onNavigate && onNavigate('profile')}
      />
    </div>
  );
}

