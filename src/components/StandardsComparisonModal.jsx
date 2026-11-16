import React, { useState } from 'react';
import { 
  Sliders, X, ShieldCheck, AlertTriangle, Scale, 
  ArrowRight, CheckCircle2, Zap, Radio, Activity, HelpCircle 
} from 'lucide-react';

export default function StandardsComparisonModal({ isOpen, onClose, onNavigateToContact }) {
  const [activeCategory, setActiveCategory] = useState('magnetic'); // 'magnetic' | 'rf' | 'electric' | 'stray'
  const [converterValue, setConverterValue] = useState(1);
  const [converterUnit, setConverterUnit] = useState('mG'); // 'mG' or 'uT'

  if (!isOpen) return null;

  const standardsData = {
    magnetic: {
      name: "60 Hz Low-Frequency Magnetic Fields",
      source: "High-voltage transmission lines, pad transformers, breaker panels, wiring errors",
      unit: "mG (milliGauss)",
      levels: [
        {
          standard: "electraEMF sC-Ve™ Biological Guideline",
          value: "< 0.5 – 1.0 mG",
          status: "Safe / Health Target",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          barWidth: "4%",
          desc: "Target sleeping area limit to avoid neuro-endocrine disruption and cellular stress."
        },
        {
          standard: "Building Biology SBM-2015",
          value: "< 1.0 mG",
          status: "Precautionary",
          color: "text-blue-700 bg-blue-50 border-blue-200",
          barWidth: "8%",
          desc: "Slight anomaly threshold for continuous sleeping sanctuary exposure."
        },
        {
          standard: "BioInitiative 2012 Scientific Review",
          value: "1.0 – 2.0 mG",
          status: "Epidemiological Risk Limit",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          barWidth: "15%",
          desc: "Peer-reviewed epidemiological threshold for childhood leukemia statistical doubling."
        },
        {
          standard: "FCC / IEEE C95.1 & ICNIRP (Thermal Only)",
          value: "1,000 – 2,000 mG",
          status: "Extreme Acute Thermal Limit",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          barWidth: "100%",
          desc: "Gross heating threshold from 1990s. Blind to chronic subclinical health effects."
        }
      ],
      insight: "Consumer meters like the Trifield trigger arbitrary alerts, while official FCC standards only regulate thermal tissue boiling (1,000 mG). electraEMF identifies subclinical magnetic fields at court-recognized evidentiary standards."
    },
    rf: {
      name: "Radio Frequency Radiation (RF / 5G / Microwave)",
      source: "5G MIMO small cells, cell towers, Wi-Fi 6/7, smart meters, Bluetooth arrays",
      unit: "µW/m² (microWatts/m²)",
      levels: [
        {
          standard: "electraEMF sC-Ve™ Biological Guideline",
          value: "< 10 µW/m²",
          status: "Safe Sleeping Zone",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          barWidth: "2%",
          desc: "Target limit in bedrooms to protect sleep architecture and melatonin secretion."
        },
        {
          standard: "Building Biology SBM-2015",
          value: "< 100 µW/m²",
          status: "Precautionary Limit",
          color: "text-blue-700 bg-blue-50 border-blue-200",
          barWidth: "10%",
          desc: "Slight anomaly limit for modern wireless indoor environments."
        },
        {
          standard: "BioInitiative 2012 Recommendation",
          value: "30 – 60 µW/m²",
          status: "Epidemiological Target",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          barWidth: "18%",
          desc: "Empirical baseline preventing neurological and blood-brain barrier permeability."
        },
        {
          standard: "FCC / IEEE Regulatory Standard",
          value: "10,000,000 µW/m²",
          status: "Extreme Acute Limit",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          barWidth: "100%",
          desc: "Calculated solely for 6-minute thermal head heating. Millions of times higher than biological sensitivity."
        }
      ],
      insight: "5G beamforming pulses millisecond bursts of extreme power density that standard averaging meters miss completely. Our spectrum analyzers record peak pulse power density."
    },
    electric: {
      name: "60 Hz AC Electric Fields & Body Voltage",
      source: "Unshielded Romex wiring inside bedroom walls, power cords, ungrounded lamps",
      unit: "V/m (Volts/meter) or mV Body Voltage",
      levels: [
        {
          standard: "electraEMF sC-Ve™ Biological Target",
          value: "< 5 – 10 V/m (< 50 mV)",
          status: "Relaxed Biology",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          barWidth: "5%",
          desc: "Natural capacitive charge level allowing autonomic nervous system rest."
        },
        {
          standard: "Building Biology SBM-2015",
          value: "< 10 V/m (< 100 mV)",
          status: "Low Anomaly",
          color: "text-blue-700 bg-blue-50 border-blue-200",
          barWidth: "12%",
          desc: "Standard precautionary residential sleeping area recommendation."
        },
        {
          standard: "Typical Unshielded Bedroom",
          value: "20 – 60 V/m (500 – 2000 mV)",
          status: "Elevated Common",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          barWidth: "45%",
          desc: "Everyday North American home with live wiring 2 feet from headboards."
        },
        {
          standard: "IEEE / OSHA Workplace Standard",
          value: "5,000 V/m",
          status: "Extreme Spark Threshold",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          barWidth: "100%",
          desc: "Prevents acute electrical flashover shocks in industrial switchyards."
        }
      ],
      insight: "Improper 'grounding sheets' or ungrounded canopies can amplify body voltage by acting as receiving antennas for 60Hz ambient fields. Grounding requires professional impedance testing."
    },
    stray: {
      name: "Stray Ground Voltage & Pool Current",
      source: "Substation return loop through water table, pool bonding defects, foundation faults",
      unit: "V AC/DC Differential",
      levels: [
        {
          standard: "electraEMF Neutralized Target",
          value: "< 0.1 V (100 mV)",
          status: "Completely Safe",
          color: "text-emerald-700 bg-emerald-50 border-emerald-200",
          barWidth: "5%",
          desc: "Zero perceptible differential across wet human skin or pool coping."
        },
        {
          standard: "Perception Threshold (Wet Feet)",
          value: "0.5 – 1.0 V",
          status: "Perceptible Tingling",
          color: "text-blue-700 bg-blue-50 border-blue-200",
          barWidth: "20%",
          desc: "Mild shocks reported when touching handrails, pool water, or lawn bare feet."
        },
        {
          standard: "Hazardous Contact Voltage",
          value: "2.0 – 5.0 V",
          status: "Acute Hazard",
          color: "text-amber-700 bg-amber-50 border-amber-200",
          barWidth: "60%",
          desc: "Forces families out of pools. Muscle involuntary contraction risk."
        },
        {
          standard: "Utility Allowed Neutral Drop",
          value: "10.0+ V",
          status: "Utility Maximum",
          color: "text-rose-700 bg-rose-50 border-rose-200",
          barWidth: "100%",
          desc: "Utility line return voltage allowed before mandatory circuit de-energization."
        }
      ],
      insight: "electraEMF resolved the famous Brick, NJ swimming pool stray voltage mystery using differential oscilloscopy when local utilities claimed 'nothing is wrong'."
    }
  };

  const current = standardsData[activeCategory];

  // Quick unit conversion
  const convertResult = () => {
    const val = parseFloat(converterValue) || 0;
    if (converterUnit === 'mG') {
      return `${(val * 0.1).toFixed(2)} µT (microTesla)`;
    } else {
      return `${(val * 10).toFixed(2)} mG (milliGauss)`;
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92%] h-[90%] overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-3.5 px-4 bg-gradient-to-r from-[#0c1c38] to-[#122e60] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 border border-cyan-400/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 block">
                SCIENTIFIC REGULATORY DOSIMETRY
              </span>
              <h3 className="font-heading font-extrabold text-xs text-white">
                IEEE / FCC vs. sC-Ve™ Biological Standards
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 text-slate-800">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100">
            {[
              { id: 'magnetic', label: '60Hz Magnetic', icon: Zap },
              { id: 'rf', label: 'RF / 5G / Wi-Fi', icon: Radio },
              { id: 'electric', label: 'Electric Field', icon: Activity },
              { id: 'stray', label: 'Stray Voltage', icon: Sliders }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    isActive 
                      ? 'bg-white text-blue-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Current Category Info */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900">{current.name}</h4>
              <span className="text-[9.5px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Unit: {current.unit}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <strong>Common Sources:</strong> {current.source}
            </p>
          </div>

          {/* Standards Levels Comparison Cards */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Exposure Threshold Comparison (Strict Biological vs Thermal)
            </span>

            {current.levels.map((lvl, idx) => (
              <div 
                key={idx} 
                className={`p-3.5 rounded-2xl border transition-all ${lvl.color}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-extrabold text-xs">{lvl.standard}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-white/80 shadow-2xs">
                    {lvl.value}
                  </span>
                </div>
                <div className="w-full bg-white/60 h-1.5 rounded-full overflow-hidden my-2">
                  <div 
                    className="h-full bg-current rounded-full" 
                    style={{ width: lvl.barWidth }} 
                  />
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {lvl.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Expert Insight Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>electraEMF Engineering Diagnostic Rule:</span>
            </div>
            <p className="text-[11.5px] text-amber-900/90 leading-relaxed pl-5.5">
              {current.insight}
            </p>
          </div>

          {/* Interactive Unit Converter */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Interactive Engineering Unit Converter
              </span>
              <span className="text-[9px] font-bold text-blue-600">NIST Standard</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                value={converterValue}
                onChange={(e) => setConverterValue(e.target.value)}
                className="w-24 h-9 bg-white rounded-xl px-3 text-xs font-bold border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <select
                value={converterUnit}
                onChange={(e) => setConverterUnit(e.target.value)}
                className="h-9 bg-white rounded-xl px-2.5 text-xs font-bold border border-slate-200 focus:outline-none"
              >
                <option value="mG">mG (milliGauss)</option>
                <option value="uT">µT (microTesla)</option>
              </select>
              <span className="text-xs text-slate-400 font-bold">=</span>
              <div className="flex-1 h-9 bg-blue-50 rounded-xl px-3 flex items-center font-extrabold text-xs text-blue-900 border border-blue-100 truncate">
                {convertResult()}
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              Formula: 1 µT = 10 mG • 1 mG = 0.1 µT
            </p>
          </div>

          {/* CTA Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white space-y-2">
            <h4 className="text-xs font-extrabold text-white">
              Need on-site evidentiary verification?
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Our state-licensed engineers conduct spatial contour falloff mapping and provide court-admissible certificates across NY, NJ, CT, PA, & DE.
            </p>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToContact) onNavigateToContact();
              }}
              className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-md shadow-blue-600/30"
            >
              <span>Schedule Professional Dosimetry Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
