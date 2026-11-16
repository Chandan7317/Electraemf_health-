import React from 'react';
import { toast } from 'react-hot-toast';
import { Phone, X, ShieldCheck, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { electraData } from '../data/electraData';

export default function QuickCallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-all shrink-0 cursor-pointer"
              aria-label="Back"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">Direct Expert Lines</h3>
              <p className="text-[10px] text-slate-400">Zero-Fee Initial Consultation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Operating Hours */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-[11px] text-slate-600">
          <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Available Mon-Sun: 8:00 AM - 5:00 PM EST</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {/* NYC / CT / Long Island Line */}
          <a
            href="tel:3474919867"
            onClick={() => toast.success('Connecting to NYC/CT direct line: (347) 491-9867', { id: 'call-toast' })}
            className="w-full h-13 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-blue-600/20 active:scale-95 transition-all hover:bg-blue-700"
          >
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wide text-blue-200 block">NYC • CT • Hudson Valley • Long Island</span>
              <span className="text-sm font-extrabold">(347) 491-9867</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* NJ / PA / DE Line */}
          <a
            href="tel:9737269559"
            onClick={() => toast.success('Connecting to NJ/PA direct line: (973) 726-9559', { id: 'call-toast' })}
            className="w-full h-13 px-4 rounded-xl bg-cyan-700 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-cyan-700/20 active:scale-95 transition-all hover:bg-cyan-800"
          >
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-wide text-cyan-200 block">New Jersey • PA • Delaware Valley</span>
              <span className="text-sm font-extrabold">(973) 726-9559</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
          </a>
        </div>

        <p className="text-[10px] text-center text-slate-400">
          For clients in law enforcement, school administration, or litigation, confidential callback is guaranteed.
        </p>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200 active:scale-95 transition-all text-center flex items-center justify-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

