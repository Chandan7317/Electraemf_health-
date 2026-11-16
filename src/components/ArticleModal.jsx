import React from 'react';
import { toast } from 'react-hot-toast';
import { 
  X, FileText, Phone, Calendar, User, ShieldCheck, 
  Share2, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink, ArrowLeft 
} from 'lucide-react';

export default function ArticleModal({ isOpen, onClose, article, onOpenCall, onNavigateToContact }) {
  if (!isOpen || !article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary || article.headline || 'electraEMF Certified Engineering Dossier',
        url: window.location.href,
      }).then(() => {
        toast.success('Dossier link shared successfully!', { id: 'share-toast' });
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      toast.success('Dossier link copied to clipboard!', { id: 'share-toast' });
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92%] h-[90%] overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Sticky Header */}
        <div className="p-3.5 px-4 bg-gradient-to-r from-[#0c1c38] to-[#122e60] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <button 
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all shrink-0 cursor-pointer"
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/30">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 block leading-tight">
                {article.category || 'CERTIFIED FORENSIC DOSSIER'}
              </span>
              <h3 className="font-heading font-extrabold text-xs text-white truncate leading-tight mt-0.5">
                {article.title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
              title="Share Article"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 text-slate-800">
          {/* Article Banner / Image if available */}
          {article.image && (
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xs shrink-0">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {article.location && (
                <div className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[9.5px] font-bold text-white">
                  📍 {article.location}
                </div>
              )}
            </div>
          )}

          {/* Metadata Bar */}
          <div className="flex items-center justify-between text-[10.5px] text-slate-500 pb-2 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-bold text-slate-700">Prof. Dr. Joseph Dumanov, Esq.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold text-[9px]">
                IBEW Lic. #7002
              </span>
              <span>•</span>
              <span>Est. 2003</span>
            </div>
          </div>

          {/* Headline / Summary */}
          {article.headline && (
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
              <h4 className="text-xs font-black text-blue-950 leading-snug">
                {article.headline}
              </h4>
              {article.summary && (
                <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                  {article.summary}
                </p>
              )}
            </div>
          )}

          {/* Case Details Bullet Points (if case study) */}
          {article.details && Array.isArray(article.details) && (
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Forensic Investigation Findings & Sequence
              </span>
              <div className="space-y-2">
                {article.details.map((point, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100/90 flex items-start gap-2.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolution Outcome if available */}
          {article.outcome && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-extrabold text-emerald-900 block">Confirmed Engineering Resolution:</strong>
                <p className="text-[11.5px] text-emerald-800 leading-relaxed mt-0.5">{article.outcome}</p>
              </div>
            </div>
          )}

          {/* Sections from allPagesFull (if standard website article) */}
          {article.sections && Array.isArray(article.sections) && (
            <div className="space-y-3 pt-1">
              {article.sections.map((sec, idx) => {
                if (sec.tag === 'h1' || sec.tag === 'h2') {
                  return (
                    <h3 key={idx} className="font-heading font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-100 first:border-0 first:pt-0">
                      {sec.text}
                    </h3>
                  );
                }
                if (sec.tag === 'h3' || sec.tag === 'h4') {
                  return (
                    <h4 key={idx} className="font-heading font-bold text-xs text-blue-900 pt-1">
                      {sec.text}
                    </h4>
                  );
                }
                if (sec.tag === 'li') {
                  return (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 pl-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <p className="leading-relaxed">{sec.text}</p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-xs text-slate-600 leading-relaxed">
                    {sec.text}
                  </p>
                );
              })}
            </div>
          )}

          {/* Full Content Paragraph fallback */}
          {article.content && (
            <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line p-1">
              {article.content}
            </div>
          )}

          {/* CTA Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white space-y-2.5 mt-4">
            <span className="text-[9px] font-black uppercase text-cyan-300 tracking-wider block">
              EXPERIENCING A SIMILAR SITUATION?
            </span>
            <p className="text-[11px] text-slate-200 leading-relaxed">
              Contact our state-licensed IBEW electronics engineers and clinical hygienists for immediate on-site triage and court-admissible reports.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:3474919867"
                className="h-9.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Expert</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToContact) onNavigateToContact();
                }}
                className="h-9.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/20 active:scale-95 transition-all"
              >
                <span>Request Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
