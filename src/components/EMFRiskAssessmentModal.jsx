import React, { useState } from 'react';
import { Sliders, X, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function EMFRiskAssessmentModal({ isOpen, onClose, onNavigateToContact }) {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('home');
  const [selectedEmitters, setSelectedEmitters] = useState([]);
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState([]);

  if (!isOpen) return null;

  const emitters = [
    { id: 'lines', label: 'Overhead High-Voltage Power Lines (< 500 ft)', weight: 3 },
    { id: 'substation', label: 'Neighborhood Utility Substation or Pad Transformer', weight: 3 },
    { id: '5g', label: 'Rooftop Cell Tower or 5G Small Cell Node nearby', weight: 3 },
    { id: 'smart', label: 'Bank of Smart Utility Meters on Bedroom Wall', weight: 2 },
    { id: 'ev', label: 'High-Amperage Electric Vehicle (EV) Home Charger', weight: 2 },
    { id: 'pool', label: 'Swimming Pool or Yard with Tingling / Stray Shocks', weight: 4 },
  ];

  const vulnerabilities = [
    { id: 'infants', label: 'Infants or Young Children in residence', weight: 3 },
    { id: 'implant', label: 'Occupant with Pacemaker, ICD, or Neurostimulator', weight: 4 },
    { id: 'symptoms', label: 'Unexplained severe insomnia, tinnitus, or migraines', weight: 3 },
    { id: 'closing', label: 'Under Contract / Pre-Closing Real Estate Inspection', weight: 2 }
  ];

  const toggleEmitter = (id) => {
    setSelectedEmitters(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleVulnerability = (id) => {
    setSelectedVulnerabilities(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculate score
  const totalScore = selectedEmitters.reduce((acc, id) => {
    const item = emitters.find(e => e.id === id);
    return acc + (item ? item.weight : 0);
  }, 0) + selectedVulnerabilities.reduce((acc, id) => {
    const item = vulnerabilities.find(v => v.id === id);
    return acc + (item ? item.weight : 0);
  }, 0);

  const getRiskLevel = () => {
    if (totalScore >= 7) return { level: 'Elevated Risk Potential', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', action: 'Immediate on-site engineering testing strongly recommended.' };
    if (totalScore >= 4) return { level: 'Moderate Risk Potential', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', action: 'Professional spectrum analysis & contour mapping advised.' };
    return { level: 'Low / Baseline Potential', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', action: 'Standard precautionary verification & distance checks.' };
  };

  const risk = getRiskLevel();

  const reset = () => {
    setStep(1);
    setSelectedEmitters([]);
    setSelectedVulnerabilities([]);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 p-5 space-y-4 max-h-[85%] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">EMF Risk Self-Check</h3>
              <p className="text-[10px] text-slate-400">Step {step} of 3</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Property & Emitters */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-bold text-xs text-slate-900">
                1. Select Nearby Infrastructure & Emitters
              </h4>
              <p className="text-[11px] text-slate-500">Check all that exist within or near your property:</p>
            </div>

            <div className="space-y-2">
              {emitters.map(e => (
                <button
                  key={e.id}
                  onClick={() => toggleEmitter(e.id)}
                  className={`w-full p-3 rounded-2xl text-left text-xs flex items-center justify-between border transition-all ${
                    selectedEmitters.includes(e.id)
                      ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="pr-2">{e.label}</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedEmitters.includes(e.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedEmitters.includes(e.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-95 transition-all text-center"
            >
              Next: Vulnerabilities & Symptoms →
            </button>
          </div>
        )}

        {/* STEP 2: Occupants & Health */}
        {step === 2 && (
          <div className="space-y-3">
            <div>
              <h4 className="font-heading font-bold text-xs text-slate-900">
                2. Occupant Health & Sensitivity Factors
              </h4>
              <p className="text-[11px] text-slate-500">Check any factors present:</p>
            </div>

            <div className="space-y-2">
              {vulnerabilities.map(v => (
                <button
                  key={v.id}
                  onClick={() => toggleVulnerability(v.id)}
                  className={`w-full p-3 rounded-2xl text-left text-xs flex items-center justify-between border transition-all ${
                    selectedVulnerabilities.includes(v.id)
                      ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="pr-2">{v.label}</span>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedVulnerabilities.includes(v.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedVulnerabilities.includes(v.id) && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-2.5 px-4 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-2.5 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 active:scale-95 transition-all text-center"
              >
                Calculate Assessment Result
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className={`p-4 rounded-2xl ${risk.bg} border ${risk.border} text-center space-y-1.5`}>
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">
                Preliminary Assessment Result
              </span>
              <h3 className={`font-heading font-extrabold text-lg ${risk.color}`}>
                {risk.level}
              </h3>
              <p className="text-xs text-slate-700 font-medium">
                {risk.action}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-slate-900">Identified Key Factors:</p>
              <p>• {selectedEmitters.length} environmental emitter sources flagged</p>
              <p>• {selectedVulnerabilities.length} clinical/occupant vulnerability factors indicated</p>
              <p className="text-[11px] text-slate-500 pt-1">
                Note: True risk can only be verified using laboratory-calibrated fluxgate magnetometers and RF spectrum analyzers on-site.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToContact();
                }}
                className="w-full h-11 px-4 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 active:scale-95 transition-all text-center shadow-md shadow-blue-600/20 flex items-center justify-center"
              >
                Request Free Expert Review for This Property
              </button>

              <button
                onClick={reset}
                className="w-full h-10 px-4 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200 active:scale-95 transition-all text-center flex items-center justify-center"
              >
                Restart Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

