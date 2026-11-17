import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FileText, Phone, Mail, ShieldAlert, ArrowRight,
  ChevronDown, ChevronUp, Star, CheckSquare, Square,
  AlertTriangle, BookOpen, ExternalLink, ShieldCheck, Scale, Zap, Radio, Sparkles,
  MapPin, CheckCircle2, Clock, Activity
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
      {/* 1. TOP EVIDENTIARY REVIEWS BAR */}
      <div className="bg-white rounded-2xl p-2.5 px-3.5 border border-slate-200/70 flex items-center justify-between shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
        <div className="min-w-0 pr-2">
          <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block leading-tight">
            COURT-CERTIFIED EVIDENTIARY REVIEWS
          </span>
          <span className="text-[11px] font-bold text-slate-800 truncate block leading-tight mt-0.5">
            IBEW Licensed Technical, Medical & Legal Experts
          </span>
        </div>
        <button
          onClick={onOpenCall}
          className="h-8 px-3.5 rounded-full bg-[#0b162c] hover:bg-[#122e5a] text-white text-[10.5px] font-extrabold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all shadow-2xs cursor-pointer"
        >
          <Phone className="w-3 h-3" />
          <span>Call Expert</span>
        </button>
      </div>

      {/* 2. RECEIVED A REPORT FROM AN AMATEUR "EMF CONSULTANT"? */}
      <div className="rounded-[26px] bg-gradient-to-br from-[#0c1c38] via-[#0d2a58] to-[#123e7e] text-white p-5 shadow-xl space-y-3">
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
            className="w-full h-11 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Forensic Hotline: 347-491-9867</span>
          </a>

          <button
            onClick={() => {
              toast.success('Opening consultation portal to submit report...', { id: 'report-toast' });
              onNavigate('consultation');
            }}
            className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 active:scale-95 transition-all cursor-pointer"
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
          <span className="text-[10px] text-[#1d61f2] font-bold">Tap To Read Full Dossier</span>
        </div>

        {featuredCases.map((cs) => (
          <div
            key={cs.id}
            onClick={() => setActiveArticle(cs)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-blue-200/80 transition-all cursor-pointer group active:scale-[0.99]"
          >
            {/* Enlarged Cinematic Image Container (No button on image) */}
            <div className="relative h-48 sm:h-52 w-full bg-slate-900 overflow-hidden">
              <img
                src={cs.image}
                alt={cs.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] font-bold text-white flex items-center gap-1 shadow-sm border border-white/10">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{cs.location}</span>
              </div>
            </div>

            {/* Card Content: Heading, Outcome & CTA */}
            <div className="p-4 space-y-2.5">
              <h3 className="font-heading font-extrabold text-[14.5px] sm:text-base text-slate-900 leading-snug group-hover:text-[#1d61f2] transition-colors">
                {cs.title}
              </h3>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[10px] font-bold text-emerald-700 truncate">
                    {cs.outcome}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#1d61f2] group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Read Dossier</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
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
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#edf3fe] text-[#1d61f2] flex items-center justify-center shrink-0 shadow-2xs">
              <BookOpen className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block">
                ELECTRAEMF SCIENCE LIBRARY
              </span>
              <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-tight truncate">
                Educational Research & Guides
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9.5px] font-extrabold shrink-0">
            4 Guides
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          Peer-reviewed guides, meter teardowns, and shielding physics authored by IBEW engineers and clinical researchers.
        </p>

        <div className="space-y-2.5 pt-0.5">
          {educationalArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-[#edf3fe]/60 border border-slate-100 hover:border-blue-200/80 transition-all cursor-pointer group active:scale-[0.99] space-y-2 shadow-2xs"
            >
              <h4 className="font-heading font-extrabold text-[13px] sm:text-sm text-slate-900 group-hover:text-[#1d61f2] transition-colors leading-snug">
                {art.title}
              </h4>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 text-[10.5px]">
                <span className="text-[9.5px] font-semibold text-slate-500 bg-white/90 border border-slate-200/60 px-2 py-0.5 rounded-md">
                  {art.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#1d61f2] group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </span>
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


      {/* 6. DOES YOUR CASE REQUIRE LICENSED SCRUTINY? */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#edf3fe] text-[#1d61f2] flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#1d61f2]" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block">
              DIAGNOSTIC CRITERIA
            </span>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-tight">
              Does Your Case Require Licensed Scrutiny?
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              Primary forensic markers requiring certified engineering investigation:
            </p>
          </div>
        </div>

        {/* 4 Clean Indicator Cards (No Checkboxes) */}
        <div className="space-y-2 pt-0.5">
          {[
            {
              icon: Zap,
              color: 'text-amber-500 bg-amber-50 border-amber-200/60',
              title: 'Stray Ground Voltage & Pool Currents',
              desc: 'Shock or tingling sensations, water surface voltage leaks, or underground utility grounding faults.'
            },
            {
              icon: Activity,
              color: 'text-rose-500 bg-rose-50 border-rose-200/60',
              title: 'Neuropathological & Sleep Symptoms',
              desc: 'Unexplained auditory clicking/humming, sleep fragmentation, or peripheral muscle twitching.'
            },
            {
              icon: Radio,
              color: 'text-[#1d61f2] bg-[#edf3fe] border-blue-200/60',
              title: 'Utility Grid & 5G MIMO Proximity',
              desc: 'Proximity to HV power lines, sub-station step-downs, or rooftop 5G/6G cellular arrays.'
            },
            {
              icon: Scale,
              color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60',
              title: 'Real Estate & Escrow Disputes',
              desc: 'Pending property transactions or claims stigmatized by uncalibrated amateur meter readings.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#f8fafc] border border-slate-100 flex items-start gap-3 transition-colors"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0 space-y-0.5 flex-1">
                  <h4 className="font-heading font-extrabold text-xs text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onOpenCall}
            className="w-full h-10 px-4 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-xs cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Consult Licensed Engineering Staff</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* 7. FOOTER CERTIFICATION BOX */}
      <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 text-center space-y-1.5 text-xs text-slate-600">
        <span className="text-[9px] font-black uppercase text-[#1d61f2] block">
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
        onNavigateToContact={() => onNavigate && onNavigate('consultation')}
      />

      <StandardsComparisonModal
        isOpen={isStandardsOpen}
        onClose={() => setIsStandardsOpen(false)}
        onNavigateToContact={() => onNavigate && onNavigate('consultation')}
      />
    </div>
  );
}

