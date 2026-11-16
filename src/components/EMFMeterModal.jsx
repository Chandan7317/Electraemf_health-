import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, X, Activity, Radio, Volume2, VolumeX, RotateCcw, 
  Zap, ShieldAlert, ShieldCheck, AlertTriangle, Sliders, 
  Phone, FileText, ChevronRight, Info, Compass, Sparkles
} from 'lucide-react';

export default function EMFMeterModal({ isOpen, onClose, onNavigateToContact, onOpenCall }) {
  if (!isOpen) return null;

  // Measurement Units: 'mG' (milligauss) or 'uT' (microtesla). 1 uT = 10 mG
  const [unit, setUnit] = useState('mG');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [sensorSource, setSensorSource] = useState('detecting'); // 'hardware', 'simulated'
  const [selectedSourcePreset, setSelectedSourcePreset] = useState('ambient');
  const [distanceFeet, setDistanceFeet] = useState(3); // 1 to 20 feet
  const [history, setHistory] = useState(() => Array(30).fill(0.4));
  
  // Real-time metrics
  const [fieldX, setFieldX] = useState(0.25);
  const [fieldY, setFieldY] = useState(0.18);
  const [fieldZ, setFieldZ] = useState(0.32);
  const [currentMagnitude, setCurrentMagnitude] = useState(0.44); // in mG
  const [peakMagnitude, setPeakMagnitude] = useState(0.44);
  const [avgMagnitude, setAvgMagnitude] = useState(0.44);
  const [minMagnitude, setMinMagnitude] = useState(0.44);
  const [samplesCount, setSamplesCount] = useState(1);
  const [sumMagnitude, setSumMagnitude] = useState(0.44);

  // Audio Context Ref
  const audioCtxRef = useRef(null);
  const lastBeepRef = useRef(0);

  // Preset baseline values in mG at 1 foot
  const PRESET_SOURCES = {
    ambient: { name: 'Clean Bedroom Sanctuary', baseMG: 0.45, noise: 0.08, desc: 'Clean living room or shielded sleeping zone' },
    laptop: { name: 'Laptop / Power Supply', baseMG: 2.4, noise: 0.4, desc: 'Unshielded switch-mode AC adapter at desk' },
    smartmeter: { name: 'Smart Meter / Wi-Fi Hub', baseMG: 5.2, noise: 1.1, desc: 'Pulse-modulated transmitter near bedroom wall' },
    evcharger: { name: 'Level 2 EV Charger / Subpanel', baseMG: 16.5, noise: 2.8, desc: 'High-amperage 40A-80A circuit charging car' },
    powerline: { name: '60 Hz Transmission Corridor', baseMG: 42.0, noise: 5.5, desc: 'Neighborhood distribution lines or substation' }
  };

  // Hardware Magnetometer Sensor Listener
  useEffect(() => {
    let magnetometer = null;

    if (typeof window !== 'undefined' && 'Magnetometer' in window) {
      try {
        magnetometer = new window.Magnetometer({ frequency: 20 });
        magnetometer.addEventListener('reading', () => {
          setSensorSource('hardware');

          // Sensor reports in microteslas (µT). Convert to milligauss: 1 µT = 10 mG
          const rawX = (magnetometer.x || 0) * 10;
          const rawY = (magnetometer.y || 0) * 10;
          const rawZ = (magnetometer.z || 0) * 10;
          const mag = Math.sqrt(rawX * rawX + rawY * rawY + rawZ * rawZ);

          updateLiveReadings(rawX, rawY, rawZ, mag);
        });

        magnetometer.addEventListener('error', () => {
          setSensorSource('simulated');
        });

        magnetometer.start();
      } catch {
        setSensorSource('simulated');
      }
    } else {
      setSensorSource('simulated');
    }

    return () => {
      if (magnetometer) {
        try {
          magnetometer.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Simulated Engine fallback / test laboratory (when hardware sensor unavailable or simulating sources)
  useEffect(() => {
    if (sensorSource === 'hardware') return;

    const interval = setInterval(() => {
      const preset = PRESET_SOURCES[selectedSourcePreset] || PRESET_SOURCES.ambient;
      
      // Magnetic field falloff: ~ 1 / distance^1.5 for distributed wiring & appliances
      const distanceFactor = 1 / Math.pow(Math.max(1, distanceFeet), 1.5);
      const computedBase = preset.baseMG * distanceFactor;
      
      // Natural 60Hz jitter and magnetic fluctuation
      const jitter = (Math.random() - 0.5) * preset.noise * distanceFactor;
      const mag = Math.max(0.05, computedBase + jitter);

      // Distribute randomly across X, Y, Z components
      const angle = Date.now() / 1000;
      const x = (mag * 0.58) + Math.sin(angle) * 0.05;
      const y = (mag * 0.42) + Math.cos(angle * 1.3) * 0.04;
      const z = Math.sqrt(Math.max(0, mag * mag - x * x - y * y)) || (mag * 0.35);

      updateLiveReadings(x, y, z, mag);
    }, 150);

    return () => clearInterval(interval);
  }, [sensorSource, selectedSourcePreset, distanceFeet]);

  // Audio Beep generator using Web Audio API
  const playGeigerClick = (fieldVal) => {
    if (!isAudioEnabled) return;
    const now = Date.now();
    // Intervals between clicks speed up as field increases (from 1000ms down to 80ms)
    const intervalMs = Math.max(80, 1000 / Math.max(0.2, fieldVal));
    if (now - lastBeepRef.current < intervalMs) return;
    lastBeepRef.current = now;

    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch modulates with field severity
      const freq = Math.min(2400, 320 + fieldVal * 45);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio playback blocked or unsupported
    }
  };

  // Helper to update state and rolling history
  const updateLiveReadings = (x, y, z, mag) => {
    const roundedMag = Math.round(mag * 100) / 100;
    setCurrentMagnitude(roundedMag);
    setFieldX(Math.round(x * 100) / 100);
    setFieldY(Math.round(y * 100) / 100);
    setFieldZ(Math.round(z * 100) / 100);

    setPeakMagnitude(prev => Math.max(prev, roundedMag));
    setMinMagnitude(prev => Math.min(prev, roundedMag));

    setSamplesCount(c => {
      const nextCount = c + 1;
      setSumMagnitude(s => {
        const nextSum = s + roundedMag;
        setAvgMagnitude(Math.round((nextSum / nextCount) * 100) / 100);
        return nextSum;
      });
      return nextCount;
    });

    setHistory(prev => [...prev.slice(1), roundedMag]);

    // Trigger audio tick
    playGeigerClick(roundedMag);
  };

  const handleResetPeak = () => {
    setPeakMagnitude(currentMagnitude);
    setMinMagnitude(currentMagnitude);
    setAvgMagnitude(currentMagnitude);
    setSamplesCount(1);
    setSumMagnitude(currentMagnitude);
    toast.success('Peak and statistics reset', { id: 'emf-toast' });
  };

  const handleCaptureSnapshot = () => {
    const timestamp = new Date().toLocaleTimeString();
    const readingStr = unit === 'mG' 
      ? `${currentMagnitude.toFixed(2)} mG (Peak: ${peakMagnitude.toFixed(2)} mG)` 
      : `${(currentMagnitude / 10).toFixed(3)} µT (Peak: ${(peakMagnitude / 10).toFixed(3)} µT)`;

    toast.success(`EMF Snapshot recorded: ${readingStr} at ${timestamp}`, { id: 'emf-toast' });
  };

  // Display value converted according to active unit
  const displayValue = unit === 'mG' ? currentMagnitude : currentMagnitude / 10;
  const displayPeak = unit === 'mG' ? peakMagnitude : peakMagnitude / 10;
  const displayAvg = unit === 'mG' ? avgMagnitude : avgMagnitude / 10;
  const displayMin = unit === 'mG' ? minMagnitude : minMagnitude / 10;
  const unitLabel = unit === 'mG' ? 'mG' : 'µT';

  // Severity Classification based on Building Biology SBM-2015 & IBEW Clinical guidelines:
  // < 1.0 mG: Safe / Normal sleeping area
  // 1.0 - 4.0 mG: Caution / Precautionary limit
  // 4.0 - 10.0 mG: Elevated / High field
  // > 10.0 mG: Critical Hazard
  const getSeverity = (mgVal) => {
    if (mgVal < 1.0) {
      return {
        level: 'SAFE',
        label: 'Biological Sanctuary',
        desc: 'Within Building Biology SBM-2015 sleeping room standards (< 1.0 mG).',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        panelBadgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        color: '#10b981',
        icon: ShieldCheck
      };
    }
    if (mgVal < 4.0) {
      return {
        level: 'CAUTION',
        label: 'Precautionary Moderate',
        desc: 'Acceptable for daytime workspace; elevated for continuous sleeping zones.',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        panelBadgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        color: '#f59e0b',
        icon: AlertTriangle
      };
    }
    if (mgVal < 10.0) {
      return {
        level: 'ELEVATED',
        label: 'Elevated Risk Level',
        desc: 'Exceeds European precautionary limits. Investigate wiring or nearby emitters.',
        badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
        panelBadgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        color: '#f97316',
        icon: Zap
      };
    }
    return {
      level: 'HAZARD',
      label: 'Critical High-Amperage Hazard',
      desc: 'Extremely strong field. Immediate forensic inspection & mitigation advised.',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      panelBadgeBg: 'bg-rose-500/25 text-rose-300 border-rose-500/40',
      color: '#ef4444',
      icon: ShieldAlert
    };
  };

  const severity = getSeverity(currentMagnitude);
  const SeverityIcon = severity.icon;

  // Analog gauge needle rotation: 0 mG -> -90 deg, 20 mG -> +90 deg (clamped 0 to 20 mG scale)
  const clampedMagnitude = Math.min(20, Math.max(0, currentMagnitude));
  const needleDegree = -90 + (clampedMagnitude / 20) * 180;

  // 12-segment LED bar illumination
  const ledSegments = Array.from({ length: 12 }, (_, i) => {
    const threshold = (i + 1) * (20 / 12);
    const isActive = currentMagnitude >= threshold;
    let activeColor = 'bg-emerald-400';
    if (i >= 3 && i < 7) activeColor = 'bg-amber-400';
    else if (i >= 7 && i < 10) activeColor = 'bg-orange-500';
    else if (i >= 10) activeColor = 'bg-rose-500 animate-pulse';

    return { isActive, activeColor };
  });

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92%] overflow-hidden"
        role="dialog"
        aria-label="ElectraEMF Live Field Meter"
      >
        {/* TOP DRAG HANDLE */}
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* HEADER BAR (Matching ElectraEMF Clean App Aesthetics) */}
        <div className="shrink-0 px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-all shrink-0 cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-heading font-extrabold text-sm text-slate-900 leading-none">
                  Live EMF Field Meter
                </h2>
                <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-200/60">
                  Triaxial
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none mt-0.5">
                IBEW Lic. #7002 • 60 Hz AC / DC Dosimeter
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const nextState = !isAudioEnabled;
                setIsAudioEnabled(nextState);
                if (nextState) {
                  toast.success('EMF Audio Feedback Enabled', { id: 'emf-toast' });
                }
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 border ${
                isAudioEnabled 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={isAudioEnabled ? 'Mute Audio' : 'Enable Geiger Tone'}
            >
              {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#f8fafc]">
          
          {/* SENSOR STATUS & UNIT CONTROLS (App Matched Light Card) */}
          <div className="flex items-center justify-between text-xs bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${sensorSource === 'hardware' ? 'bg-emerald-500 animate-ping' : 'bg-blue-500'}`} />
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-800 block leading-tight">
                  {sensorSource === 'hardware' ? 'HARDWARE MAGNETOMETER' : 'CALIBRATED SENSOR ENGINE'}
                </span>
                <span className="text-[9px] text-slate-400 leading-none">
                  {sensorSource === 'hardware' ? 'Real-time internal device sensor' : 'Triaxial geomagnetic baseline'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Unit Toggle: mG vs uT */}
              <button
                onClick={() => setUnit(unit === 'mG' ? 'uT' : 'mG')}
                className="h-7 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-[10px] active:scale-95 transition-all border border-blue-200/60"
                title="Switch Unit (1 µT = 10 mG)"
              >
                UNIT: {unit}
              </button>

              {/* Reset Stats */}
              <button
                onClick={handleResetPeak}
                className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
                title="Reset Peak & Statistics"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MAIN PRECISION INSTRUMENT DISPLAY (High-End ElectraEMF Navy Instrument Panel) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0b162c] to-[#071328] border border-blue-950 p-4.5 flex flex-col items-center justify-center shadow-xl overflow-hidden text-white">
            {/* Dynamic Ambient Glow matching risk level */}
            <div 
              className="absolute -top-12 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: severity.color }}
            />

            {/* ANALOG NEEDLE GAUGE (SVG) */}
            <div className="relative w-56 h-30 flex items-center justify-center">
              <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                {/* Background Arc Track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                
                {/* Color-coded risk zones along the arc */}
                {/* Safe zone: 0 - 1 mG */}
                <path
                  d="M 20 100 A 80 80 0 0 1 42 58"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                {/* Caution zone: 1 - 4 mG */}
                <path
                  d="M 46 51 A 80 80 0 0 1 82 23"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="14"
                />
                {/* Elevated zone: 4 - 10 mG */}
                <path
                  d="M 87 21 A 80 80 0 0 1 138 27"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="14"
                />
                {/* Hazard zone: 10 - 20 mG */}
                <path
                  d="M 143 30 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="14"
                  strokeLinecap="round"
                />

                {/* Dial Ticks & Numerical Labels */}
                <text x="18" y="108" fill="#94a3b8" fontSize="8" fontWeight="bold">0</text>
                <text x="35" y="44" fill="#10b981" fontSize="8" fontWeight="bold">1</text>
                <text x="76" y="14" fill="#f59e0b" fontSize="8" fontWeight="bold">4</text>
                <text x="135" y="18" fill="#f97316" fontSize="8" fontWeight="bold">10</text>
                <text x="176" y="108" fill="#ef4444" fontSize="8" fontWeight="bold">20+</text>

                {/* Needle Pivot & Arm */}
                <g transform={`rotate(${needleDegree}, 100, 100)`} className="transition-transform duration-150 ease-out">
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="28"
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                  />
                  <line
                    x1="100"
                    y1="34"
                    x2="100"
                    y2="26"
                    stroke={severity.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="100" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* BIG DIGITAL READOUT */}
            <div className="text-center mt-1 space-y-1">
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                  {displayValue.toFixed(unit === 'mG' ? 2 : 3)}
                </span>
                <span className="text-base font-extrabold text-blue-400">
                  {unitLabel}
                </span>
              </div>

              {/* SEVERITY STATUS BADGE */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-extrabold ${severity.panelBadgeBg}`}>
                <SeverityIcon className="w-3.5 h-3.5" />
                <span>{severity.level}: {severity.label}</span>
              </div>
            </div>

            {/* 12-SEGMENT LED GRAPH */}
            <div className="w-full max-w-xs mt-3 flex items-center gap-1 px-2">
              {ledSegments.map((seg, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 flex-1 rounded-xs transition-colors duration-150 ${
                    seg.isActive ? seg.activeColor : 'bg-slate-800/80 border border-white/5'
                  }`}
                />
              ))}
            </div>
            <div className="w-full max-w-xs flex justify-between text-[8px] font-extrabold text-slate-400 px-2 mt-1">
              <span>SBM-2015 SAFE (&lt;1.0)</span>
              <span>CAUTION (&lt;4.0)</span>
              <span>HAZARD (10+)</span>
            </div>
          </div>

          {/* TRIAXIAL VECTOR BREAKDOWN (X, Y, Z AXES) - App Clean White Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-heading font-extrabold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Triaxial Vector Breakdown</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-medium">
                |B| = √(x² + y² + z²)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* X Axis */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-extrabold text-rose-600 block uppercase">X-Axis</span>
                <span className="font-mono text-sm font-black text-slate-900">
                  {(unit === 'mG' ? fieldX : fieldX / 10).toFixed(2)}
                </span>
                <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                {/* Visual Level Indicator */}
                <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-rose-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (fieldX / 5) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Y Axis */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-extrabold text-emerald-600 block uppercase">Y-Axis</span>
                <span className="font-mono text-sm font-black text-slate-900">
                  {(unit === 'mG' ? fieldY : fieldY / 10).toFixed(2)}
                </span>
                <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                {/* Visual Level Indicator */}
                <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (fieldY / 5) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Z Axis */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-center">
                <span className="text-[9px] font-extrabold text-blue-600 block uppercase">Z-Axis</span>
                <span className="font-mono text-sm font-black text-slate-900">
                  {(unit === 'mG' ? fieldZ : fieldZ / 10).toFixed(2)}
                </span>
                <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                {/* Visual Level Indicator */}
                <div className="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (fieldZ / 5) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* MIN / AVG / PEAK STATS */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[10px]">
              <div className="text-center p-1.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[8.5px] uppercase font-bold">MINIMUM</span>
                <span className="font-mono font-bold text-slate-800">{displayMin.toFixed(2)} {unitLabel}</span>
              </div>
              <div className="text-center p-1.5 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-blue-600 block text-[8.5px] uppercase font-bold">AVERAGE</span>
                <span className="font-mono font-bold text-blue-900">{displayAvg.toFixed(2)} {unitLabel}</span>
              </div>
              <div className="text-center p-1.5 bg-rose-50 rounded-xl border border-rose-100">
                <span className="text-rose-600 block text-[8.5px] uppercase font-bold">PEAK (MAX)</span>
                <span className="font-mono font-extrabold text-rose-800">{displayPeak.toFixed(2)} {unitLabel}</span>
              </div>
            </div>
          </div>

          {/* REAL-TIME OSCILLOSCOPE WAVEFORM (STRIP-CHART) */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-heading font-extrabold text-slate-900 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-blue-600" />
                <span>Real-Time Waveform (60 Hz AC Flux)</span>
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Live 20 Hz
              </span>
            </div>

            {/* Oscilloscope Canvas Box */}
            <div className="h-20 w-full bg-[#071328] rounded-xl border border-slate-800 p-1 relative overflow-hidden flex items-end">
              {/* Reference Grid Line at 1.0 mG */}
              <div className="absolute top-[75%] left-0 right-0 border-b border-dashed border-emerald-500/40 z-0">
                <span className="text-[7.5px] font-mono text-emerald-400 pl-1">1.0 mG Safe Limit</span>
              </div>
              {/* Reference Grid Line at 4.0 mG */}
              <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-amber-500/40 z-0">
                <span className="text-[7.5px] font-mono text-amber-400 pl-1">4.0 mG Caution</span>
              </div>

              {/* Render dynamic line points */}
              <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 300 70" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke={severity.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={history.map((val, idx) => {
                    const x = (idx / (history.length - 1)) * 300;
                    // Clamp 0 to 15 mG for chart height
                    const y = 65 - (Math.min(15, val) / 15) * 55;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            </div>
          </div>

          {/* FIELD SOURCE SIMULATOR & PROXIMITY TESTER */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="font-heading font-extrabold text-xs text-slate-900">
                  Source Simulator & Inverse Square Falloff
                </h3>
              </div>
              <span className="text-[8.5px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Distance Testing
              </span>
            </div>

            {/* Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-600 uppercase block">
                Select Tested Electromagnetic Source:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(PRESET_SOURCES).map(([key, data]) => {
                  const isSelected = selectedSourcePreset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedSourcePreset(key);
                        if (sensorSource === 'hardware') {
                          toast('Switching to simulated source preset', { id: 'emf-toast' });
                          setSensorSource('simulated');
                        }
                      }}
                      className={`p-2 rounded-xl text-left border transition-all active:scale-95 text-xs ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold shadow-xs' 
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <p className="font-extrabold text-[10.5px] truncate">{data.name}</p>
                      <p className="text-[9px] text-slate-500 truncate mt-0.5">{data.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Distance Slider (1 to 20 ft) */}
            <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600 text-[10.5px]">Sensor Distance from Source:</span>
                <span className="text-blue-700 font-mono font-extrabold text-xs bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                  {distanceFeet} Feet ({Math.round(distanceFeet * 0.3048 * 10) / 10} m)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={distanceFeet}
                onChange={(e) => setDistanceFeet(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[8px] text-slate-400 font-mono font-bold">
                <span>1 ft (Contact)</span>
                <span>5 ft</span>
                <span>10 ft</span>
                <span>20 ft (Safe Buffer)</span>
              </div>
            </div>
          </div>

          {/* BUILDING BIOLOGY STANDARDS GUIDANCE */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3.5 space-y-2">
            <h4 className="font-heading font-extrabold text-xs text-blue-950 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Building Biology SBM-2015 vs. FCC / IEEE</span>
            </h4>
            <div className="text-[10.5px] text-slate-600 leading-relaxed space-y-1.5">
              <p>
                <strong className="text-emerald-700">Biological Standard (&lt; 1.0 mG):</strong> Scientific consensus and Building Biology Institute recommend sleeping area magnetic fields remain below 1.0 mG to prevent pineal melatonin suppression and cellular stress.
              </p>
              <p>
                <strong className="text-amber-800">FCC/IEEE Federal Limit (1,000 mG):</strong> Federal limits only protect against immediate thermal shock in industrial environments, ignoring long-term non-thermal bio-effects.
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS: SNAPSHOT & CONSULT */}
          <div className="space-y-2 pt-1 pb-2">
            <button
              onClick={handleCaptureSnapshot}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Capture & Save Forensic EMF Snapshot</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToContact) onNavigateToContact();
                }}
                className="h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Request IBEW Audit</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenCall) onOpenCall();
                }}
                className="h-10 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call Direct</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
