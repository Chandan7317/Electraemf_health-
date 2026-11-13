import React from 'react';
import { 
  ShieldCheck, Phone, Mail, Award, CheckCircle2, 
  XCircle, AlertTriangle, BookOpen, Scale, ArrowRight,
  ExternalLink, Building2, UserCheck, Stethoscope
} from 'lucide-react';

export default function ExpertsScreen({ onOpenCall, onNavigate }) {
  return (
    <div className="space-y-4 pb-24">
      {/* 1. TOP LICENSURE STRIP (Exact Image 3) */}
      <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wide text-slate-500 px-0.5">
        <span className="flex items-center gap-1 text-blue-600">
          <span className="text-amber-500">⚡</span>
          State & Industry Licensed: NY • NJ • CT • PA • DE
        </span>
        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold">
          EST. 2003
        </span>
      </div>

      {/* 2. CHIEF SCIENTIST PROFILE CARD (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        {/* Doctor Photo & Badges */}
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-white shadow-md shrink-0">
            <img 
              src="/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg" 
              alt="Prof. Dr. Joseph Dumanov" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
          </div>

          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.2 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase">
                CHIEF SCIENTIST
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">
                IEEE & Eng
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-base text-slate-900 leading-snug">
              Prof. Dr. Joseph Dumanov
            </h2>

            <p className="text-[11px] font-bold text-blue-600 leading-tight">
              Chief Clinical Industrial Hygienist & Electronics Engineer
            </p>

            <p className="text-[10px] text-slate-400 leading-tight">
              Former IBEW Systems Engineering • Tri-State Forensic Specialist
            </p>
          </div>
        </div>

        {/* 4 Credential Pills */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <div className="p-1.5 px-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[10px] font-bold text-blue-900 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">IBEW State & Industry Licensed</span>
          </div>
          <div className="p-1.5 px-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[10px] font-bold text-blue-900 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Court-Certified Expert Witness</span>
          </div>
          <div className="p-1.5 px-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[10px] font-bold text-blue-900 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Clinical Epidemiologist & Toxicologist</span>
          </div>
          <div className="p-1.5 px-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[10px] font-bold text-blue-900 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">Child Protection Court Advocate</span>
          </div>
        </div>

        {/* 3 Detailed Practice Highlights */}
        <div className="space-y-2 pt-1 border-t border-slate-50 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900">20+ Years Specialized Engineering Practice:</strong> Conducting certified EMF/RF hazard dosimetry and clinical epidemiology across NY, NJ, CT, DE, and PA since 2003.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900">Electrobiological Authority:</strong> Utilizing communications engineering tenure with published research in molecular DNA electroporation, neurology, and oncological correlation.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-900">Court-Appointed Special Advocate:</strong> Under sworn oath serving child protection services and family welfare regarding toxic environmental exposure hazards.
            </p>
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={onOpenCall}
            className="h-10 px-3.5 rounded-xl bg-[#0c1f3d] hover:bg-[#122e5a] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>347-491-9867</span>
          </button>

          <a
            href="mailto:EMFmedicalExpert@gmail.com"
            className="h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Expert</span>
          </a>
        </div>
      </div>

      {/* 3. FIELD DIAGNOSTICS & FORENSIC UNITS PHOTOS (Exact Image 3) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wide px-1">
          <span>FIELD DIAGNOSTICS & FORENSIC UNITS</span>
          <span className="text-[10px] text-blue-600 font-bold">Tri-State Archive</span>
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

      {/* 4. WHY LICENSURE & MEDICAL AUTHORITY MATTER (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              Why Licensure & Medical Authority Matter
            </h3>
            <p className="text-[10px] text-slate-400">
              Mandatory state credentials vs. amateur "meter readers"
            </p>
          </div>
        </div>

        {/* Box A: IBEW STATE-LICENSED ENGINEER */}
        <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-extrabold uppercase">
              IBEW STATE-LICENSED ENGINEER
            </span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="font-heading font-extrabold text-xs text-slate-900">
            Lawful Authority to Inspect Live Circuits & Sub-Panels
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            10,000+ required professional hours before state engineering examination. Lawfully certified to place scientific probes, trace grounding loops, and measure contact current safely without risk of shock or fire.
          </p>
        </div>

        {/* Box B: UNLICENSED "EMF CONSULTANT" */}
        <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-extrabold uppercase">
              UNLICENSED "EMF CONSULTANT"
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <h4 className="font-heading font-extrabold text-xs text-slate-900">
            Zero Legal Standing • Unlawful Circuit Tampering
          </h4>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Self-appointed "ghostbuster" meter readers with 2-day online certificates. Unlawfully prohibited from opening breaker boxes or touching conductors; reports are systematically rejected in court proceedings.
          </p>
        </div>

        {/* Peer Review Callout */}
        <div className="p-3 rounded-2xl bg-[#0c1f3d] text-white flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cyan-300 shrink-0" />
          <div className="text-[11px] leading-snug">
            <strong className="block text-white font-extrabold">Peer-Review Editorial Oversight</strong>
            <span className="text-slate-300">Decoding the critical safety shortcomings and blindspots of outdated IEEE, FCC, ICNIRP, and CDC exposure levels.</span>
          </div>
        </div>
      </div>

      {/* 5. sC-Ve ®™ CLINICAL DIAGNOSTIC PROTOCOL (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
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
              <span className="w-2 h-2 rounded-full bg-blue-600" />
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
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
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
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-0.5">
            <span className="text-[9px] font-black uppercase text-blue-600 block">SETTLEMENT EFFICACY</span>
            <span className="font-heading font-black text-2xl text-blue-700 block">95%</span>
            <span className="text-[10px] text-slate-600 block">Resolved favorably prior to trial</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-0.5">
            <span className="text-[9px] font-black uppercase text-blue-600 block">REHABILITATED VALUE</span>
            <span className="font-heading font-black text-2xl text-blue-700 block">Up to 80%</span>
            <span className="text-[10px] text-slate-600 block">Stigmatized property equity restored</span>
          </div>
        </div>

        <ul className="space-y-2 pt-1 text-xs text-slate-600">
          <li className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Judicial Jurisdictions:</strong> Sworn testimony delivered in New York Supreme Courts (Manhattan, Westchester), New Jersey Superior Courts, and administrative arbitration panels.</p>
          </li>
          <li className="flex items-start gap-2">
            <Scale className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Transactional Due Diligence:</strong> Providing definitive technical evidence for commercial lease rescissions, buyer escrow cancellations, and property tort settlements.</p>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p><strong className="text-slate-900">Municipal & Union Trust:</strong> Retained for electromagnetic exposure audits by PBA, FOP police officers, public school districts, and Fortune 500 communications centers.</p>
          </li>
        </ul>
      </div>

      {/* 7. DIRECT ACCESS CHANNEL BANNER (Exact Image 3) */}
      <div className="rounded-3xl bg-[#0b1c3b] text-white p-5 shadow-xl space-y-3">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300">
            • DIRECT ACCESS CHANNEL
          </span>
          <h3 className="font-heading font-extrabold text-base text-white">
            Speak Directly With Dr. Joseph Dumanov
          </h3>
          <p className="text-xs text-blue-100/90 leading-relaxed">
            Free initial case evaluations for home buyers, affected families, physicians, attorneys, and corporate facility directors.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="tel:3474919867"
            className="w-full h-11 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call (347) 491-9867</span>
          </a>

          <a
            href="mailto:EMFmedicalExpert@gmail.com"
            className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMFmedicalExpert@gmail.com</span>
          </a>
        </div>

        <p className="text-[9px] text-center text-blue-200/60 pt-1 border-t border-white/10">
          Serving NY • NJ • CT • PA • DE since 2003. Confidential and court-compliant.
        </p>
      </div>
    </div>
  );
}

