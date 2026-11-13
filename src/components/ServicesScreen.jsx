import React, { useState } from 'react';
import { 
  Search, ShieldAlert, Phone, Mail, Calendar, FileText, 
  CheckCircle2, ArrowRight, X, ChevronRight, AlertTriangle,
  Building, GraduationCap, Home, Wifi, Scale, HeartPulse, Sparkles
} from 'lucide-react';

export default function ServicesScreen({ onNavigate, onOpenCall, onBookService }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalProtocol, setActiveModalProtocol] = useState(null);

  const filters = [
    { id: 'all', label: 'All Protocols (14)' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial & Industrial' },
    { id: 'medical', label: 'Medical Life-Safety' },
    { id: 'telecom', label: 'Telecom 5G/6G' },
    { id: 'schools', label: 'Schools' },
    { id: 'legal', label: 'Legal & Realty' }
  ];

  const protocols = [
    {
      id: 'residential-stray-voltage',
      title: 'Residential EMF & Stray Voltage Testing',
      tagTop: 'sC-Ve Diagnostic',
      tagImgLeft: '60Hz & Stray RF Mobile',
      protocolCode: 'Protocol #01-A',
      image: '/assets/EMF-safe-home-testing.jpg',
      category: 'residential',
      description: 'Full diagnostic inspection of low frequency 60Hz utility lines, internal grounding faults, under-pavement current leakage in pools and lawns, and micro-voltage high-voltage DC transmission lines.',
      badges: [
        { title: '60 Hz Magnetic', desc: 'Critical in bedrooms (<0.5mG)' },
        { title: 'Low Fault Current', desc: 'Ground AC/DC circuit faults' }
      ],
      actionLabel: 'Schedule Audit'
    },
    {
      id: 'commercial-power-utility',
      title: 'Commercial, Industrial & Power Utility Studies',
      tagTop: 'Substation & Grid',
      tagImgLeft: '60Hz & 20kHz - 100+ kHz',
      protocolCode: 'Protocol #05-IND',
      image: '/assets/power_substation.jpg',
      category: 'commercial',
      description: 'Assessment of commercial facility high-voltage step-down substations, server room ground current loops, industrial high-amperage induction motors, and corporate real estate centers.',
      badges: [
        { title: 'OSHA Compliance', desc: 'Worker exposure audits' },
        { title: 'Remediation Blueprints', desc: 'Direct engineering fixes' }
      ],
      actionLabel: 'Request Study'
    },
    {
      id: 'medical-implant-emi',
      title: 'Medical Implant Interference Testing (EMI)',
      isCritical: true,
      tagTop: 'CRITICAL LIFE-SAFETY',
      tagImgLeft: 'Pacemakers & ICD Protection',
      protocolCode: 'Protocol #MED-04',
      image: '/assets/Human-Systems-Technology-electraEMF-EMI-Testing-Medcial-Implant-Devices2023A2-1-246x300.jpg',
      category: 'medical',
      description: 'Electromagnetic interference safety profiling for active cardiac ICDs, pacemakers, CRT-D, neurostimulators, and insulin pumps from battery machinery, high-amps circuits, and cellular microcells.',
      badges: [
        { title: 'AAMI / ISO 14117', desc: 'Cardiac device profiling' },
        { title: 'Emergency Triage', desc: 'Work & home safety mapping' }
      ],
      actionLabel: 'Emergency Consult',
      actionPhone: true
    },
    {
      id: 'telecom-5g-subsystems',
      title: 'Multi-Generational Telecom: 4G, 5G & 6G Subsystems',
      tagTop: 'Rooftop & Street Cells',
      tagImgLeft: 'Sub-6GHz & mmWave 39GHz',
      protocolCode: 'Protocol #TEL-02',
      image: '/assets/5G-antenna-1030x896.jpg',
      category: 'telecom',
      description: 'High precision spectrum analysis of concealed rooftop arrays, 5G MIMO beamforming antennas, millimeter wave small cell nodes, and 28-39 GHz high-density transmission across penthouse terraces and dwellings.',
      badges: [
        { title: 'Rooftop RF Audit', desc: 'Real spatial power densities' },
        { title: 'Far-Field Attenuation', desc: 'Window and wall shielding specs' }
      ],
      actionLabel: 'Survey Property'
    },
    {
      id: 'schools-educational-safety',
      title: 'Educational Districts & School Safety Audits',
      tagTop: 'School Board Due Diligence',
      tagImgLeft: 'Classroom Wi-Fi & Utility Lines',
      protocolCode: 'Protocol #SCH-03',
      image: '/assets/school_emf.jpg',
      category: 'schools',
      description: 'Comprehensive environmental evaluations of classroom Wi-Fi densities, high-voltage line rights-of-way proximity, laptop setups, and playground power infrastructure exposure.',
      badges: [
        { title: 'Pediatric Protection', desc: 'Shielding developing bodies' },
        { title: 'School Board Briefs', desc: 'Clear legal presentations' }
      ],
      actionLabel: 'Request School Audit'
    },
    {
      id: 'real-estate-due-diligence',
      title: 'Real Estate Due Diligence & Court Expert Witness',
      tagTop: 'USPAP & Closing Due Diligence',
      tagImgLeft: 'Stigmatized Property Recovery',
      protocolCode: 'Protocol #LEG-08',
      image: '/assets/ls-slider-1-slide-4.jpg',
      category: 'legal',
      description: 'Court-certified forensic environmental engineering reviews for high-end residential acquisitions, contract dispute support, property seller stigmatization clearing, and sworn expert witness testimony.',
      badges: [
        { title: 'Title Disclosure', desc: 'Shielding buyer liability' },
        { title: 'Valuation Recovery', desc: 'Rebuttal of amateur meter reports' }
      ],
      actionLabel: 'Retain Witness'
    },
    {
      id: 'corporate-server-rooms',
      title: 'Corporate Data Centers, Server Rooms & Due Diligence',
      tagTop: 'Critical Infrastructure Diagnostic',
      tagImgLeft: 'Enterprise Grounding & Power Quality',
      protocolCode: 'Protocol #COR-07',
      image: '/assets/NYC-Office-EMF-testing-for-helath-and-safety-2023.jpg',
      category: 'commercial',
      description: 'Shielded digital enterprise engineering preventing transient noise in server clusters, audio/visual recording facilities, power backups, and establishing certified corporate baseline safety standards.',
      badges: [
        { title: 'Liability Reduction', desc: 'Boardroom accountability' },
        { title: 'Server Reliability', desc: 'Eliminate ground loop noise' }
      ],
      actionLabel: 'Propose Assessment'
    }
  ];

  const filtered = protocols.filter(p => {
    const matchesFilter = selectedFilter === 'all' || p.category === selectedFilter;
    const matchesQuery = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.protocolCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-4 pb-24">
      {/* 1. DIRECTORY TITLE & METADATA (Exact Image 1) */}
      <div className="space-y-1.5 px-0.5">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
          <span className="flex items-center gap-1 text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            FIELD-PROVEN DIAGNOSTICS
          </span>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
            25+ YEARS EXP • TRI-STATE
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900 leading-tight">
          Clinical & Industrial EMF Directory
        </h1>

        <p className="text-xs text-slate-600 leading-relaxed">
          14 Comprehensive Technical Doctor Protocols conducted by certified electronic engineers and published industrial hygienists.
        </p>
      </div>

      {/* 2. SEARCH BAR (Exact Image 1) */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by protocol, frequencies, or symptom..."
          className="w-full bg-white rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-xs placeholder:text-slate-400"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3. FILTER PILLS (Exact Image 1) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {filters.map((f) => {
          const isSelected = selectedFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-bold transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* 4. PROTOCOL CARDS LISTING (Exact Image 1) */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-3.5 pb-4"
          >
            {/* Critical Red Banner if Medical */}
            {item.isCritical && (
              <div className="bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider px-4 py-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" />
                <span>CRITICAL LIFE-SAFETY</span>
              </div>
            )}

            {/* Banner Image with Tags */}
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover opacity-90"
                onError={(e) => {
                  e.target.src = "/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Tag */}
              {!item.isCritical && item.tagTop && (
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-extrabold text-white border border-white/10">
                  {item.tagTop}
                </div>
              )}

              {/* Bottom Image Badges */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-bold text-white">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                  {item.tagImgLeft}
                </span>
                <span className="bg-blue-600 px-2.5 py-0.5 rounded-full text-white">
                  {item.protocolCode}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="px-4 space-y-2.5">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              {/* 2 Feature Badges in Gray Container */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {item.badges.map((b, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] space-y-0.5">
                    <span className="font-bold text-slate-800 block truncate">
                      {b.title}
                    </span>
                    <span className="text-slate-500 block truncate">
                      {b.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => setActiveModalProtocol(item)}
                  className="h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Protocol</span>
                </button>

                <button
                  onClick={() => {
                    if (item.actionPhone) {
                      onOpenCall();
                    } else {
                      onBookService(item);
                    }
                  }}
                  className="h-10 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  {item.actionPhone ? <Phone className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                  <span>{item.actionLabel}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. EMERGENCY TRI-STATE DISPATCH BANNER (Exact Image 1) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c1c38] via-[#0d2a58] to-[#123e7e] text-white p-5 shadow-xl space-y-3">
        <div className="space-y-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            EMERGENCY TRI-STATE DISPATCH
          </span>
          <h2 className="font-heading font-extrabold text-base sm:text-lg text-white leading-snug">
            Need an urgent on-site study in NY, NJ, CT, PA, or DE?
          </h2>
          <p className="text-xs text-blue-100/90 leading-relaxed">
            Direct dispatch triage with Chief Engineer & Clinical Industrial Hygienist Prof. Dr. J. Dumanov. Non-commercial consulting practice.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="tel:3474919867"
            className="w-full h-11 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-950/20 active:scale-95 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Direct Line: 347-491-9867</span>
          </a>

          <a
            href="mailto:EMFmedicalExpert@gmail.com"
            className="w-full h-11 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMFmedicalExpert@gmail.com</span>
          </a>
        </div>

        <div className="flex items-center justify-between text-[9px] text-blue-200/70 pt-1 border-t border-white/10">
          <span>Same-day priority bookings available</span>
          <span>Strict Evidentiary Confidentiality</span>
        </div>
      </div>

      {/* DETAIL MODAL */}
      {activeModalProtocol && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-3xl max-h-[85%] overflow-y-auto no-scrollbar shadow-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                  {activeModalProtocol.protocolCode}
                </span>
                <h3 className="font-heading font-extrabold text-base text-slate-900 mt-0.5">
                  {activeModalProtocol.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProtocol(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeModalProtocol.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 space-y-1">
              <span className="font-bold block">Testing Methodology & Scope:</span>
              <p>Conducted by mandatory licensed electronics & communications engineers with direct oscilloscopy, calibrated isotropic antennae, and magnetic fluxgate sensors. Certified reports admissible in state court proceedings.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActiveModalProtocol(null)}
                className="py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const prot = activeModalProtocol;
                  setActiveModalProtocol(null);
                  onBookService(prot);
                }}
                className="py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
              >
                Request Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
