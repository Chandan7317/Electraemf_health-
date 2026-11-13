import React, { useState } from 'react';
import { 
  FileText, Phone, Mail, ShieldAlert, ArrowRight, 
  ChevronDown, ChevronUp, Star, CheckSquare, Square,
  AlertTriangle, BookOpen, ExternalLink, ShieldCheck
} from 'lucide-react';

export default function ReportsScreen({ onOpenCall, onNavigate }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleCheck = (idx) => {
    const updated = [...checkedItems];
    updated[idx] = !updated[idx];
    setCheckedItems(updated);
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

      {/* 3. FEATURED FIELD INVESTIGATIONS (Exact Image 5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wide px-1">
          <span>FEATURED FIELD INVESTIGATIONS</span>
          <span className="text-[10px] text-blue-600 font-bold">Rev. Tri-State Cases</span>
        </div>

        {/* Investigation 1: Brick, NJ */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm space-y-3 pb-4">
          <div className="relative h-40 w-full bg-slate-900">
            <img 
              src="/assets/children_playing_near_high_voltage_lines.png" 
              alt="Brick NJ Case" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white">
              Brick, Ocean County, NJ
            </div>
            <div className="absolute bottom-2.5 right-3 bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
              ABC NEWS "MYSTERY"
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-extrabold px-2 py-0.2 rounded bg-blue-50 text-blue-700">
                SUB-STATION GROUND FAULT
              </span>
              <span className="text-[9px] font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                Stray AC/DC Differential
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
              Brick, NJ Ground Voltage Pool & Lawn Remediation Case
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Stray underground AC/DC ground voltages into residential swimming pools and yards prevented family from using their backyard lawn and pool equipment. Frequent water skin shocks logged at 4V. electraEMF laboratory differential oscilloscopy traced secondary utility conduit return leakage, and implemented confirmed technical ground remediation.
            </p>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-slate-500 font-medium">
              <span className="text-emerald-600 font-bold">Resolution: 100% Remediated Ground Voltage</span>
              <span className="text-blue-600 font-bold hover:underline cursor-pointer">Full Archive Dossier</span>
            </div>
          </div>
        </div>

        {/* Investigation 2: Hartford 5G */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm space-y-3 pb-4">
          <div className="relative h-40 w-full bg-slate-900">
            <img 
              src="/assets/5G-antenna-1030x896.jpg" 
              alt="Hartford 5G Case" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white">
              Hartford, Connecticut
            </div>
            <div className="absolute bottom-2.5 right-3 bg-rose-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md">
              Medical DX Study
            </div>
          </div>

          <div className="px-4 space-y-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-extrabold px-2 py-0.2 rounded bg-blue-50 text-blue-700">
                MULTI-SPECTRUM RFR
              </span>
              <span className="text-[9px] font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                Sub-6 & 39GHz Transmitters
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
              Hartford Debilitating 5G Early Subsystem Case
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Biomechanical clinical medical investigation of sensory organ and high-frequency RF saturation causing severe neurocardiological symptoms in a 42-year-old female resident 240 ft from underlying cell facilities. Complete spatial RF frequency deconstruction identified pulsed micro-wave bursts of 45 thousand microwatts/sq meter.
            </p>

            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50 text-slate-500 font-medium">
              <span className="text-blue-600 font-bold">Clinical DX: ISO/AAMI 14117 Clinical Clearance</span>
              <span className="text-blue-600 font-bold hover:underline cursor-pointer">Full Case Dossier</span>
            </div>
          </div>
        </div>

        {/* Investigation 3: Lower Manhattan Static Fields */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
              PEDESTRIAN TIER HIGH-RISE
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              800 V/m Electrostatic
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
            Lower Manhattan Luxury High-Rise Static Fields
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            Residents experienced severe peripheral neurological sensations and auditory clicking. Testing identified non-conductive flooring generating static electric potentials up to 500 V/m coupled with street D.C. tramway return loops. Physical whole-residence Faraday grounded passive conductive dissipation barriers.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-center text-[10px]">
            <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100">
              <span className="text-slate-500 block">Defects: DC Rail Floor</span>
              <strong className="text-blue-800 font-bold">500 V/m Static</strong>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-slate-500 block">Remedy: Passive Bar</span>
              <strong className="text-emerald-800 font-bold">500 V/m Discharged</strong>
            </div>
          </div>
        </div>

        {/* Investigation 4: Hudson Valley & Hamptons Real Estate */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
              PROPERTY VALUATION RECOVERY
            </span>
            <span className="text-[10px] font-bold text-emerald-600">
              100% PRICE RESTORED
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-snug">
            Hudson Valley & Hamptons Real Estate Rehabilitation
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed">
            High-end properties severely devalued and stalled after amateur "ghost-buster" consultants produced terrifying, fabricated claims near distant substations. electraEMF's certified engineering reports definitively disproved bogus claims, rehabilitating property market valuation by over 80%.
          </p>

          <p className="text-[10px] text-blue-600 font-bold pt-1 border-t border-slate-50 flex items-center justify-between">
            <span>Overruled in Supreme Court of Westchester</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </p>
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
    </div>
  );
}

