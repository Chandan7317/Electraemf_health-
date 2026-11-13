import React from 'react';
import { User, X, Phone, Mail, Bookmark, ShieldCheck, Smartphone, Tablet, Monitor, Info, ExternalLink } from 'lucide-react';
import { electraData } from '../data/electraData';

export default function ProfileDrawer({ 
  isOpen, 
  onClose, 
  currentDeviceMode, 
  onSetDeviceMode,
  onNavigate 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#0c1c38] to-[#122e60] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-[#0c1c38] rounded-[14px] flex items-center justify-center text-cyan-300 font-extrabold text-sm">
                EMF
              </div>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm">electraEMF Client Hub</h3>
              <p className="text-[10px] text-cyan-300">Confidential Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 text-xs text-slate-700">
          {/* Client Status Card */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Status</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                Active Tri-State
              </span>
            </div>
            <p className="font-heading font-bold text-slate-900 text-sm">
              Prospective Client / Consultation Guest
            </p>
            <p className="text-[11px] text-slate-500">
              Zero-fee preliminary review active for New York, New Jersey, Pennsylvania, Connecticut & Delaware.
            </p>
          </div>

          {/* Device Preview Switcher (Awesome for responsive testing) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Mobile Preview Mode
            </span>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => onSetDeviceMode('iphone')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  currentDeviceMode === 'iphone' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 mb-0.5" />
                <span>iPhone / PlanEnroll</span>
              </button>

              <button
                onClick={() => onSetDeviceMode('tablet')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  currentDeviceMode === 'tablet' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-4 h-4 mb-0.5" />
                <span>Tablet Frame</span>
              </button>

              <button
                onClick={() => onSetDeviceMode('fluid')}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${
                  currentDeviceMode === 'fluid' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-4 h-4 mb-0.5" />
                <span>Responsive Full</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
              Quick Shortcuts
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onNavigate('services');
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 font-semibold flex items-center justify-between"
              >
                <span>Browse All 10 Services</span>
                <span className="text-blue-600">→</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('resources');
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 font-semibold flex items-center justify-between"
              >
                <span>Case Studies & Scientific Articles</span>
                <span className="text-blue-600">→</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 font-semibold flex items-center justify-between"
              >
                <span>Request Formal Consultation</span>
                <span className="text-blue-600">→</span>
              </button>
            </div>
          </div>

          {/* Official Verification Notice */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 text-blue-950 space-y-1 text-[11px] leading-relaxed">
            <div className="flex items-center gap-1 font-bold text-blue-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Licensure</span>
            </div>
            <p>
              electraEMF operates under state and industry IBEW electrical and communications engineering licensure with medical integration.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-[10px] text-slate-400 space-y-1">
          <p>© 2003-{new Date().getFullYear()} electraEMF LLC. All Rights Reserved.</p>
          <p>Official Website: electraemfhealth.com</p>
        </div>
      </div>
    </div>
  );
}

