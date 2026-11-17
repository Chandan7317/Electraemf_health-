import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  ShieldCheck, Phone, Mail, Award, CheckCircle2,
  XCircle, AlertTriangle, BookOpen, Scale, ArrowRight,
  ExternalLink, Building2, UserCheck, Stethoscope, MapPin, Clock
} from 'lucide-react';

export default function ExpertsScreen({ onOpenCall, onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState('NY');

  const regionalHubs = {
    NY: {
      name: "New York Metro & Long Island Division",
      phone: "(347) 491-9867",
      rawPhone: "3474919867",
      response: "Same-Day Priority Triage",
      lead: "Dr. Joseph Dumanov Direct NYC",
      areas: "Manhattan, Brooklyn, Queens, Bronx, Staten Island, Nassau & Suffolk Counties (The Hamptons), Westchester, Rockland, and Hudson Valley.",
      specialty: "High-rise 5G MIMO, Sub-station step-downs, luxury real estate due diligence"
    },
    NJ: {
      name: "New Jersey Central & Coastal Division",
      phone: "(973) 726-9559",
      rawPhone: "9737269559",
      response: "2 – 4 Hour Emergency Triage",
      lead: "RCA Sarnoff Princeton Engineering Unit",
      areas: "Bergen, Morris, Essex, Somerset, Union, Monmouth, Ocean County (Brick/Toms River), and Mercer (Princeton).",
      specialty: "Stray ground voltage pool remediation, utility high-voltage line falloff contours"
    },
    CT: {
      name: "Connecticut Coastal & Fairfield County",
      phone: "(347) 491-9867",
      rawPhone: "3474919867",
      response: "Same-Day / 24-Hour Dispatch",
      lead: "Tri-State Clinical Hygiene Unit",
      areas: "Fairfield County (Greenwich, Stamford, Darien, New Canaan, Westport), New Haven, and Hartford Metro.",
      specialty: "Estate baseline assessments, school district audits, medical implant clearance"
    },
    PA: {
      name: "Pennsylvania & Delaware Valley",
      phone: "(973) 726-9559",
      rawPhone: "9737269559",
      response: "24-Hour Field Dispatch",
      lead: "Philadelphia Regional Engineering Staff",
      areas: "Philadelphia Metro, Bucks, Montgomery, Chester, and Delaware Counties.",
      specialty: "Industrial power utility lines, commercial data centers, residential audits"
    },
    DE: {
      name: "Delaware Mid-Atlantic Corridor",
      phone: "(973) 726-9559",
      rawPhone: "9737269559",
      response: "Scheduled Triage / 24 Hours",
      lead: "Mid-Atlantic Field Engineering",
      areas: "Wilmington, New Castle County, Newark, and Delaware River Basin.",
      specialty: "Substation baseline studies, pre-purchase home inspections, stray voltage"
    }
  };

  const hub = regionalHubs[selectedRegion];
  return (
    <div className="space-y-4 pb-24">
      {/* 1. CHIEF SCIENTIST PROFILE CARD */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-3.5 pb-4">
        {/* Full Visual Banner Image */}
        <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
          <img
            src="/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg"
            alt="Prof. Dr. Joseph Dumanov - Chief Scientist"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          {/* Bottom Title on Image Gradient */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h2 className="font-heading font-extrabold text-base sm:text-lg text-white leading-tight">
              Prof. Dr. Joseph Dumanov
            </h2>
            <p className="text-[11px] text-cyan-300 font-bold leading-tight">
              Chief Clinical Industrial Hygienist & Electronics Engineer
            </p>
            <div className="flex items-center gap-1 text-[10px] text-slate-300 font-medium mt-0.5">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Tri-State Lead • NY, NJ, CT, PA, DE</span>
            </div>
          </div>
        </div>

        {/* Card Body Container */}
        <div className="px-4 space-y-3">
          {/* 3-Column Credential Stats Strip with React Icons */}
          <div className="grid grid-cols-3 gap-1 py-2 px-1 bg-slate-50/90 rounded-2xl text-center">
            <div className="flex flex-col items-center justify-center p-1">
              <ShieldCheck className="w-4 h-4 text-[#1d61f2] mb-0.5" />
              <span className="font-heading font-extrabold text-xs text-slate-900">20+ Years</span>
              <span className="text-[9px] text-slate-500 font-medium">Field Practice</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1 border-x border-slate-200">
              <Award className="w-4 h-4 text-[#1d61f2] mb-0.5" />
              <span className="font-heading font-extrabold text-xs text-[#1d61f2]">State Lic.</span>
              <span className="text-[9px] text-slate-500 font-medium">IBEW Systems</span>
            </div>
            <div className="flex flex-col items-center justify-center p-1">
              <Scale className="w-4 h-4 text-amber-500 mb-0.5" />
              <span className="font-heading font-extrabold text-xs text-slate-900">Court Expert</span>
              <span className="text-[9px] text-slate-500 font-medium">Sworn Witness</span>
            </div>
          </div>

          {/* Clean 4 Feature Pills with React Icons (Replaces text clutter) */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-700">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-[#1d61f2] shrink-0" />
              <span className="truncate">EMF / RF Dosimetry</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Stethoscope className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">Clinical Epidemiology</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Scale className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">Court Expert Witness</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">Child CASA Advocate</span>
            </div>
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onOpenCall}
              className="h-9 px-2.5 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer min-w-0"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">347-491-9867</span>
            </button>

            <a
              href="mailto:EMFmedicalExpert@gmail.com"
              className="h-9 px-2.5 rounded-xl bg-[#1d61f2] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer min-w-0"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Email Expert</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. FIELD DIAGNOSTICS & FORENSIC UNITS PHOTOS (Exact Image 3) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wide px-1">
          <span>FIELD DIAGNOSTICS & FORENSIC UNITS</span>
          <span className="text-[10px] text-[#1d61f2] font-bold">Tri-State Archive</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative h-28 rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
            <img
              src="/assets/power_substation.jpg"
              alt="Substation Audit"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[10px] font-extrabold text-white">
              Substation Audit (NJ)
            </span>
          </div>

          <div className="relative h-28 rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
            <img
              src="/assets/5G-antenna-1030x896.jpg"
              alt="5G MIMO Analysis"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[10px] font-extrabold text-white">
              5G MIMO Analysis (NYC)
            </span>
          </div>
        </div>
      </div>

      {/* 3B. TRI-STATE REGIONAL ENGINEERING DISPATCH HUBS */}
      <div className="bg-white rounded-[26px] p-5 border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#edf3fe] text-[#1d61f2] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block">
                LICENSED REGIONAL DISPATCH
              </span>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">
                Tri-State Engineering Hubs
              </h3>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9.5px] font-extrabold border border-emerald-200/60">
            Active On-Call
          </span>
        </div>

        {/* State Selector Tabs */}
        <div className="grid grid-cols-5 gap-1.5 p-1 rounded-2xl bg-slate-100">
          {['NY', 'NJ', 'CT', 'PA', 'DE'].map(stateCode => (
            <button
              key={stateCode}
              type="button"
              onClick={() => setSelectedRegion(stateCode)}
              className={`h-9 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center justify-center cursor-pointer ${selectedRegion === stateCode
                ? 'bg-[#0b162c] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              {stateCode}
            </button>
          ))}
        </div>

        {/* Active Hub Card Details */}
        <div className="p-4 rounded-2xl bg-[#edf3fe]/60 border border-blue-100/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-900">{hub.name}</h4>
            <span className="text-[9.5px] font-black px-2 py-0.5 rounded-md bg-[#1d61f2] text-white">
              {hub.response}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600">
            <p className="leading-relaxed">
              <strong className="text-slate-900">Coverage:</strong> {hub.areas}
            </p>
            <p className="leading-relaxed text-[11px] text-slate-500">
              <strong className="text-slate-700">Specialties:</strong> {hub.specialty}
            </p>
          </div>

          <div className="pt-2 border-t border-blue-100/80 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Regional Direct Line</span>
              <span className="text-xs font-black text-slate-900">{hub.phone}</span>
            </div>
            <a
              href={`tel:${hub.rawPhone}`}
              onClick={() => toast.success(`Connecting to ${hub.name}...`, { id: 'expert-toast' })}
              className="h-8.5 px-3.5 rounded-xl bg-[#1d61f2] hover:bg-blue-600 text-white text-xs font-extrabold flex items-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hub</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. WHY LICENSURE & MEDICAL AUTHORITY MATTER */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1d61f2] to-[#0b162c] text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#1d61f2] block">
              CREDENTIAL INTEGRITY
            </span>
            <h3 className="font-heading font-extrabold text-sm text-slate-900 leading-tight">
              Why Licensure & Medical Authority Matter
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              Mandatory state credentials vs. amateur "meter readers"
            </p>
          </div>
        </div>

        {/* Box A: IBEW STATE-LICENSED ENGINEER */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#edf3fe]/80 to-white border border-blue-200/60 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-[#1d61f2] text-white text-[9px] font-extrabold uppercase tracking-wide">
              IBEW STATE-LICENSED ENGINEER
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-200/50">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Lawfully Authorized</span>
            </span>
          </div>

          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 leading-snug">
              Lawful Authority to Inspect Live Circuits & Sub-Panels
            </h4>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d61f2] mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">10,000+ required professional hours</strong> before state engineering board examination.
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d61f2] mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">Lawfully certified</strong> to place scientific probes, trace grounding loops, and measure contact current safely without risk of shock or fire.
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1d61f2] mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">Forensic legal standing</strong> admissible across judicial, insurance, and municipal venues.
              </p>
            </div>
          </div>
        </div>

        {/* Box B: UNLICENSED "EMF CONSULTANT" */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-rose-50/60 to-white border border-rose-200/70 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-extrabold uppercase tracking-wide">
              UNLICENSED "EMF CONSULTANT"
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-100/80 text-rose-800 border border-rose-200/50">
              <XCircle className="w-3 h-3 text-rose-600 shrink-0" />
              <span>Prohibited by Law</span>
            </span>
          </div>

          <div>
            <h4 className="font-heading font-extrabold text-xs text-slate-900 leading-snug">
              Zero Legal Standing • Unlawful Circuit Tampering
            </h4>
          </div>

          <div className="space-y-1.5 text-[11px] text-slate-600">
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">Self-appointed "meter readers"</strong> with 2-day online non-accredited certificates.
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">Unlawfully prohibited</strong> from opening breaker boxes or touching conductors under state electrical safety codes.
              </p>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <p className="leading-snug">
                <strong className="text-slate-800">Systematically rejected</strong> in court proceedings and insurance reimbursement claims.
              </p>
            </div>
          </div>
        </div>

        {/* Peer Review Callout */}
        <div className="p-3.5 rounded-2xl bg-[#0b162c] text-white flex items-start gap-3 shadow-xs border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-300 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <strong className="font-heading font-extrabold text-xs text-white">
                Peer-Review Editorial Oversight
              </strong>
              <span className="px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 text-[8.5px] font-bold">
                FORENSIC
              </span>
            </div>
            <p className="text-[10.5px] text-slate-300 leading-relaxed font-normal">
              Decoding the critical safety shortcomings and blindspots of outdated IEEE, FCC, ICNIRP, and CDC exposure levels.
            </p>
          </div>
        </div>
      </div>

      {/* 5. sC-Ve ®™ CLINICAL DIAGNOSTIC PROTOCOL (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#edf3fe] text-[#1d61f2] flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              sC-Ve ®™ Clinical Diagnostic Protocol
            </h3>
            <p className="text-[10px] text-slate-400">
              Patented Interdisciplinary Exposure Dosimetry
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          electraEMF's proprietary clinical diagnostic framework correlates direct electrical energies in environmental niches with cellular pathology, identifying acute risks invisible to standard consumer instruments.
        </p>

        <div className="space-y-2 pt-1">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1d61f2]" />
              Neuropathological Symptoms
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Diagnoses peripheral twitching, acoustic knocking, sleep fragmentation, and heavy static neurological resonance.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Static Electric Fields (Up to 500 kV/m)
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Advanced metering across Manhattan high-rise flooring and DC subway transit lines, preventing dangerous kickback potentials.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Oncology & Pediatric Correlation
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Epidemiological risk evaluations for leukemia, lymphomas, osteosarcoma, breast, and endocrine carcinomas.
            </p>
          </div>
        </div>
      </div>

      {/* 6. COURT-ADMISSIBLE EVIDENTIARY STANDARDS (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#edf3fe] text-[#1d61f2] flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              Court-Admissible Evidentiary Standards
            </h3>
            <p className="text-[10px] text-slate-400">
              Binding forensic reporting in civil, tort, & municipal venues
            </p>
          </div>
        </div>

        {/* 2 Big Stat Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-[#edf3fe]/70 border border-blue-100/80 text-center space-y-0.5">
            <span className="text-[9px] font-black uppercase text-[#1d61f2] block">SETTLEMENT EFFICACY</span>
            <span className="font-heading font-black text-2xl text-[#0b162c] block">95%</span>
            <span className="text-[10px] text-slate-600 block">Resolved favorably prior to trial</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#edf3fe]/70 border border-blue-100/80 text-center space-y-0.5">
            <span className="text-[9px] font-black uppercase text-[#1d61f2] block">REHABILITATED VALUE</span>
            <span className="font-heading font-black text-2xl text-[#0b162c] block">Up to 80%</span>
            <span className="text-[10px] text-slate-600 block">Stigmatized property equity restored</span>
          </div>
        </div>

        <ul className="space-y-2 pt-1 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-[#1d61f2] shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Judicial Jurisdictions:</strong> Sworn testimony delivered in New York Supreme Courts (Manhattan, Westchester), New Jersey Superior Courts, and administrative arbitration panels.</p>
          </li>
          <li className="flex items-start gap-2">
            <Scale className="w-4 h-4 text-[#1d61f2] shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Transactional Due Diligence:</strong> Providing definitive technical evidence for commercial lease rescissions, buyer escrow cancellations, and property tort settlements.</p>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1d61f2] shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Municipal & Union Trust:</strong> Retained for electromagnetic exposure audits by PBA, FOP police officers, public school districts, and Fortune 500 communications centers.</p>
          </li>
        </ul>
      </div>

      {/* 7. DIRECT ACCESS CHANNEL BANNER (Exact Image 3) */}
      <div className="rounded-3xl bg-[#0b162c] border border-white/10 text-white p-5 shadow-xl space-y-3">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300">
            • DIRECT ACCESS CHANNEL
          </span>
          <h3 className="font-heading font-extrabold text-base text-white">
            Speak Directly With Dr. Joseph Dumanov
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Free initial case evaluations for home buyers, affected families, physicians, attorneys, and corporate facility directors.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="tel:3474919867"
            className="w-full h-11 rounded-xl bg-[#1d61f2] hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (347) 491-9867</span>
          </a>

          <a
            href="mailto:EMFmedicalExpert@gmail.com"
            className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMFmedicalExpert@gmail.com</span>
          </a>
        </div>

        <p className="text-[9px] text-center text-slate-400 pt-1 border-t border-white/10">
          Serving NY • NJ • CT • PA • DE since 2003. Confidential and court-compliant.
        </p>
      </div>
    </div>
  );
}

