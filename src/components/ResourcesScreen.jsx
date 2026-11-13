import React, { useState } from 'react';
import { 
  BookOpen, FileText, Activity, AlertTriangle, 
  ChevronRight, ArrowRight, X, HeartPulse, ShieldCheck, 
  Share2, CheckCircle2, Zap, HelpCircle
} from 'lucide-react';
import { electraData } from '../data/electraData';

export default function ResourcesScreen({ 
  onSelectCaseStudy, 
  selectedCaseStudy, 
  onCloseCaseStudyModal,
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('case-studies');
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0c1f3d] to-[#154378] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
            KNOWLEDGE BASE & CASE ARCHIVES
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading mt-2">
            Technical Reports & Science
          </h1>
          <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
            Real forensic investigations, peer-reviewed medical data, and educational articles.
          </p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('case-studies')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'case-studies' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Case Studies ({electraData.caseStudies.length})
        </button>
        <button
          onClick={() => setActiveTab('educational')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'educational' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Educational Articles ({electraData.educationalArticles.length})
        </button>
        <button
          onClick={() => setActiveTab('health-effects')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'health-effects' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Health & Standards
        </button>
      </div>

      {/* TAB 1: CASE STUDIES */}
      {activeTab === 'case-studies' && (
        <div className="space-y-3">
          {electraData.caseStudies.map((cs) => (
            <div
              key={cs.id}
              onClick={() => onSelectCaseStudy(cs)}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/assets/children_playing_near_high_voltage_lines.png";
                  }}
                />
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-cyan-300">
                  {cs.category}
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <span className="text-[10px] text-blue-200 block">{cs.location} • {cs.date}</span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base leading-snug drop-shadow-md">
                    {cs.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {cs.summary}
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50 text-blue-600 font-bold">
                <span>View Full Investigation Report</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: EDUCATIONAL ARTICLES */}
      {activeTab === 'educational' && (
        <div className="space-y-3">
          {electraData.educationalArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded-md">
                  {art.category}
                </span>
                <span className="text-slate-400 font-medium">{art.readTime}</span>
              </div>

              <h3 className="font-heading font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                {art.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {art.summary}
              </p>

              <div className="flex items-center justify-between text-xs pt-1 text-slate-700 font-semibold">
                <span className="text-blue-600 text-xs font-bold">Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: HEALTH EFFECTS & STANDARDS MATRIX */}
      {activeTab === 'health-effects' && (
        <div className="space-y-4">
          {/* Medical Symptoms Breakdown */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                20+ Years Clinical Studies (electraEMF Protocol sC-Ve)
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 font-heading mt-0.5">
                Reported Physiological & Clinical Symptoms
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Documented across over 1,000 cases of environmental electromagnetic exposure.
              </p>
            </div>

            <div className="space-y-3">
              {electraData.healthSpecialization.symptomCategories.map((cat, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                    <span>{cat.category}</span>
                  </h3>
                  <ul className="space-y-1">
                    {cat.symptoms.map((sym, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Standards Comparison Table */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h2 className="text-sm font-extrabold text-slate-900 font-heading">
              Thermal (FCC/IEEE) vs Biological Guidelines
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                    <th className="py-2 pr-2">Exposure Field</th>
                    <th className="py-2 px-2">FCC / IEEE Limit (Thermal)</th>
                    <th className="py-2 pl-2 text-emerald-700 font-bold">electraEMF Biological Guideline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 pr-2 font-semibold">Magnetic Field (60 Hz)</td>
                    <td className="py-2.5 px-2 text-slate-500">1,000 - 2,000 mG</td>
                    <td className="py-2.5 pl-2 text-emerald-600 font-bold">&lt; 1.0 mG (sleeping)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 font-semibold">Electric Body Voltage</td>
                    <td className="py-2.5 px-2 text-slate-500">Not regulated</td>
                    <td className="py-2.5 pl-2 text-emerald-600 font-bold">&lt; 100 mV AC</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 font-semibold">Radiofrequency (RFR)</td>
                    <td className="py-2.5 px-2 text-slate-500">10,000 mW/m²</td>
                    <td className="py-2.5 pl-2 text-emerald-600 font-bold">&lt; 10 µW/m²</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-2 font-semibold">Dirty Electricity</td>
                    <td className="py-2.5 px-2 text-slate-500">No standard</td>
                    <td className="py-2.5 pl-2 text-emerald-600 font-bold">&lt; 50 GS Units</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDY DETAIL MODAL */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-100 flex flex-col">
            <div className="relative h-48 w-full bg-slate-900 shrink-0">
              <img 
                src={selectedCaseStudy.image} 
                alt={selectedCaseStudy.title} 
                className="w-full h-full object-cover opacity-85"
                onError={(e) => {
                  e.target.src = "/assets/children_playing_near_high_voltage_lines.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button 
                onClick={onCloseCaseStudyModal}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 mb-1 inline-block">
                  {selectedCaseStudy.location} • {selectedCaseStudy.date}
                </span>
                <h3 className="font-heading font-extrabold text-base leading-tight">
                  {selectedCaseStudy.title}
                </h3>
              </div>
            </div>

            <div className="p-5 space-y-4 text-slate-700 flex-1">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Headline</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedCaseStudy.headline}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{selectedCaseStudy.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Investigation Details
                </h4>
                <ul className="mt-2 space-y-2">
                  {selectedCaseStudy.details.map((det, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <span className="font-bold block flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Remediation & Outcome:
                </span>
                <p>{selectedCaseStudy.outcome}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2.5">
              <button
                onClick={onCloseCaseStudyModal}
                className="w-full py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all text-center"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-100 flex flex-col">
            <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedArticle.category} • {selectedArticle.readTime}
                </span>
                <h3 className="font-heading font-extrabold text-base text-slate-900 mt-1.5 leading-snug">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-slate-700 flex-1">
              <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {selectedArticle.summary}
              </p>

              {selectedArticle.content && (
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              )}

              {selectedArticle.items && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Identified Emitters & Mitigations
                  </h4>
                  {selectedArticle.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <strong className="text-slate-900 font-bold block">{idx + 1}. {item.name}</strong>
                      <span className="text-slate-600 mt-0.5 block">{item.desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all text-center"
              >
                Finished Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

