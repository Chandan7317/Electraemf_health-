import React, { useState } from 'react';
import { 
  ShieldCheck, Award, CheckCircle2, AlertOctagon, 
  Building2, GraduationCap, Scale, Stethoscope, 
  MapPin, Phone, Mail, ArrowRight, UserCheck, ShieldAlert
} from 'lucide-react';
import { electraData } from '../data/electraData';

export default function AboutScreen({ onNavigate, onOpenCall }) {
  const [activeTab, setActiveTab] = useState('overview');

  const industries = [
    { name: "Residential & Family Estates", icon: Building2, desc: "From Manhattan apartments and luxury Hamptons estates to single-family homes across NY, NJ, PA, CT & DE." },
    { name: "Schools & Educational Districts", icon: GraduationCap, desc: "Testing classrooms, athletic fields, computer labs and high-density WiFi environments for developing children." },
    { name: "Hospitals & Clinical Offices", icon: Stethoscope, desc: "Protecting patients with pacemakers, ICDs, neurostimulators, and diagnostic imaging equipment." },
    { name: "Corporate Headquarters", icon: Building2, desc: "Fortune 500 headquarters, server centers, audio/video multimedia broadcast studios, and municipal dispatch." },
    { name: "Law Enforcement & Police Stations", icon: ShieldCheck, desc: "Trusted by PBA, FOP, and county police departments for radio dispatch, cell tower, and building EMF audits." },
    { name: "Legal, Real Estate & Attorneys", icon: Scale, desc: "Expert witness testimony, pre-closing buyer inspections, contract disputes, and stigmatized property recovery." }
  ];

  return (
    <div className="space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0c1c38] to-[#1a365d] text-white rounded-3xl p-5 shadow-lg border border-white/10 relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
            ESTABLISHED 2003 • 25+ YEARS EXPERIENCE
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading mt-2">
            About electraEMF Health™
          </h1>
          <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
            State & Industry-Licensed IBEW Electronics & Communications Engineers & Medically Integrated EMF Experts.
          </p>
        </div>

        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Company Overview
        </button>
        <button
          onClick={() => setActiveTab('credentials')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'credentials' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Licensure & Science
        </button>
        <button
          onClick={() => setActiveTab('industries')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'industries' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Industries Served
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 font-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Dedicated Practice & Ethical Commitment</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We are dedicated about our practice given what we have seen of the effects of EMF—some being most heartbreaking on infants, children, and vulnerable families. We have conducted over <strong>1,000 exposure research studies</strong> over a lifetime of experience.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              All EMF/EMI studies are conducted exclusively by mandatory licensed, highly experienced electronics and communications engineers with clinical medical integration. We will not reference or cite the many fake, unaccredited, non-peer-reviewed amateur papers that are meaningless, vague, and ambiguous.
            </p>

            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">No Commercial Conflicts of Interest</strong>
                <span>We do not sell meters, shielding fabrics, grounding pads, or pendants. We provide pure, unbiased, certified scientific analysis and on-site remediation at no fee.</span>
              </div>
            </div>
          </div>

          {/* Lead Expert Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 font-heading">
              Our Lead Medical & Engineering Expert
            </h2>

            <div className="flex items-start gap-3.5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img 
                  src="/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg" 
                  alt="Prof. Dr. Josef Dumanov, Esq." 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-sm text-slate-900">
                  {electraData.company.leadExpert.name}
                </h3>
                <p className="text-[11px] text-blue-600 font-semibold">
                  {electraData.company.leadExpert.title}
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    IEEE Member
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    IBEW Licensed
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Author of Volume One: <em>"A Powerful Introduction to EMF – 5G and the Detection, Measurement and Reporting Electromagnetic Radiation"</em>. Formulator of the partial diagnostic equation electraEMF (sC-Ve) on the effects of environmental electromagnetic quantum exposures.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Credentials & Real Science vs Fake Certs */}
      {activeTab === 'credentials' && (
        <div className="space-y-4">
          {/* Warning on Fake EMF Certifications */}
          <div className="bg-rose-50 rounded-3xl p-5 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-800">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
              <h2 className="text-xs font-extrabold uppercase tracking-wide">
                Consumer Alert: Fake EMF "Certificates"
              </h2>
            </div>
            <p className="text-xs text-rose-950/90 leading-relaxed">
              EMF certification is frequently an overnight sham piece of paper given to anyone that will pay for it. They are unaccredited, legally unrecognized for any technical or court evidence, and possess no statutory authority.
            </p>
            <p className="text-xs text-rose-950/90 leading-relaxed">
              When dealing with power lines, substations, 5G antennas, medical implants, or legal real estate disputes, only <strong>state-licensed electronics and communications engineers</strong> carry the legal authority and technical education to produce admissible findings.
            </p>
          </div>

          {/* Genuine Credentials */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 font-heading">
              electraEMF Verified Licensure & Foundation
            </h2>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>State & Industry Licensure:</strong> IBEW electronics and communications engineering credentials compliant with state professional licensing boards.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>RCA Sarnoff Princeton Heritage:</strong> Decades of scientific pedigree in electromagnetic wave propagation, high-frequency radar, and telecommunications.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Clinical & Molecular Integration:</strong> Over 20 years of continuous clinical exposure studies investigating neurological, cellular, and physiological impacts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Daubert/Frye Court Trial Admissibility:</strong> Certified reports designed to withstand federal and state court scrutiny in civil, tort, and real estate litigation.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: Industries Served */}
      {activeTab === 'industries' && (
        <div className="space-y-3">
          <div className="px-1">
            <h2 className="text-sm font-extrabold text-slate-900 font-heading">
              Organizations & Sectors We Protect
            </h2>
            <p className="text-xs text-slate-500">
              From Fortune 500 headquarters to family nurseries
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="bg-slate-50 rounded-3xl p-4 border border-slate-200/80 text-center space-y-2">
        <h3 className="font-heading font-bold text-xs text-slate-900">
          Need Guidance for Your Property or Organization?
        </h3>
        <p className="text-[11px] text-slate-500">
          Your agents, attorneys, engineers, and physicians may call and review our practice directly.
        </p>
        <button
          onClick={onOpenCall}
          className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all"
        >
          Call For Free Review
        </button>
      </div>
    </div>
  );
}

