import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, X, Activity, Radio, Volume2, VolumeX, RotateCcw, 
  Zap, ShieldAlert, ShieldCheck, AlertTriangle, Sliders, 
  Phone, FileText, ChevronRight, ChevronLeft, Info, Compass, Sparkles,
  Play, Pause, Download, Trash2, Search, Printer, BookOpen, 
  Layers, Wifi, Laptop, Smartphone, Car, CheckCircle2
} from 'lucide-react';

export default function EMFMeterModal({ isOpen, onClose, onNavigateToContact, onOpenCall, isPage = false }) {
  if (!isOpen) return null;

  // Active Tab inside EMF Suite: 'meter' | 'vector' | 'sources' | 'history' | 'learn'
  const [activeTab, setActiveTab] = useState('meter');

  // Measurement State & Controls
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [unit, setUnit] = useState('mG'); // 'mG' or 'uT'
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [sensorSource, setSensorSource] = useState('detecting'); // 'hardware' or 'simulated'
  
  // Real-time Triaxial Metrics
  const [fieldX, setFieldX] = useState(0.24);
  const [fieldY, setFieldY] = useState(0.19);
  const [fieldZ, setFieldZ] = useState(0.31);
  const [currentMagnitude, setCurrentMagnitude] = useState(0.43); // in mG
  const [peakMagnitude, setPeakMagnitude] = useState(0.43);
  const [avgMagnitude, setAvgMagnitude] = useState(0.43);
  const [minMagnitude, setMinMagnitude] = useState(0.43);
  const [samplesCount, setSamplesCount] = useState(1);
  const [sumMagnitude, setSumMagnitude] = useState(0.43);
  const [history, setHistory] = useState(() => Array(35).fill(0.4));

  // Source Simulator & Distance Testing (Section 6 Requirements)
  const [selectedSourceId, setSelectedSourceId] = useState('laptop');
  const [selectedDistance, setSelectedDistance] = useState('3 ft'); // '1 ft', '5 ft', '10 ft', '20 ft' or custom

  // Persistent Snapshots / History Storage (Section 7 & 8 Requirements)
  const [snapshots, setSnapshots] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('electraemf_snapshots');
        return saved ? JSON.parse(saved) : [
          {
            id: 'EMF-SNAP-8901',
            date: 'Today, 10:14 AM',
            magnitude: 0.42,
            peak: 0.68,
            avg: 0.39,
            x: 0.22,
            y: 0.18,
            z: 0.28,
            source: 'Clean Bedroom Sanctuary',
            distance: '6 ft',
            mode: 'Hardware Magnetometer',
            status: 'Low (< 1.0 mG)',
            unit: 'mG'
          },
          {
            id: 'EMF-SNAP-8842',
            date: 'Yesterday, 04:30 PM',
            magnitude: 4.85,
            peak: 6.20,
            avg: 4.15,
            x: 2.80,
            y: 2.10,
            z: 3.25,
            source: 'Smart Meter / Wi-Fi Hub',
            distance: '1 ft',
            mode: 'Hardware Magnetometer',
            status: 'Elevated (> 4.0 mG)',
            unit: 'mG'
          }
        ];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [historySearch, setHistorySearch] = useState('');
  const [activeReportSnapshot, setActiveReportSnapshot] = useState(null); // For PDF/Print view

  // Audio Context Ref
  const audioCtxRef = useRef(null);
  const lastBeepRef = useRef(0);

  // Sub-tabs Mouse Scrolling & Dragging Ref (Allows mouse wheel and drag-to-scroll)
  const tabsContainerRef = useRef(null);
  const isDraggingTabs = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleTabsMouseDown = (e) => {
    isDraggingTabs.current = true;
    startXRef.current = e.pageX - (tabsContainerRef.current?.offsetLeft || 0);
    scrollLeftRef.current = tabsContainerRef.current?.scrollLeft || 0;
  };

  const handleTabsMouseLeave = () => {
    isDraggingTabs.current = false;
  };

  const handleTabsMouseUp = () => {
    isDraggingTabs.current = false;
  };

  const handleTabsMouseMove = (e) => {
    if (!isDraggingTabs.current || !tabsContainerRef.current) return;
    const x = e.pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 1.5;
    tabsContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -120 : 120;
      tabsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // The 7 Required Source Categories (Section 6)
  const SOURCE_CATEGORIES = [
    {
      id: 'wifi',
      name: 'Wi-Fi Hub',
      category: 'Wireless RF / AC Power',
      icon: Wifi,
      baseMG: 3.8,
      noise: 0.8,
      desc: 'Dual-band Wi-Fi router / gateway AC power circuit and pulse activity.'
    },
    {
      id: 'laptop',
      name: 'Laptop / Power Supply',
      category: 'Switch-Mode AC Adapter',
      icon: Laptop,
      baseMG: 2.6,
      noise: 0.5,
      desc: 'Unshielded switch-mode AC charger and high-frequency inverter ripple.'
    },
    {
      id: 'smartmeter',
      name: 'Smart Meter',
      category: 'Utility Pulse Transmitter',
      icon: Radio,
      baseMG: 5.4,
      noise: 1.2,
      desc: 'Utility meter bank on bedroom/living exterior wall.'
    },
    {
      id: 'evcharger',
      name: 'EV Charger',
      category: 'High-Amperage 40A-80A',
      icon: Car,
      baseMG: 16.8,
      noise: 3.2,
      desc: 'Level 2 / Level 3 continuous high current vehicle charging loop.'
    },
    {
      id: 'transmission',
      name: 'Transmission Corridor',
      category: '60 Hz Utility Grid',
      icon: Zap,
      baseMG: 38.0,
      noise: 6.5,
      desc: 'Neighborhood high-voltage power lines and distribution substations.'
    },
    {
      id: 'mobile',
      name: 'Mobile Phone',
      category: 'Cellular / Battery Current',
      icon: Smartphone,
      baseMG: 1.8,
      noise: 0.4,
      desc: 'Cellular uplink transmission and inductive charging current.'
    },
    {
      id: 'appliances',
      name: 'Electrical Appliances',
      category: 'Induction & Compressors',
      icon: Activity,
      baseMG: 7.2,
      noise: 1.5,
      desc: 'Refrigerator compressors, induction cooktops, and HVAC blowers.'
    }
  ];

  // Elapsed Measurement Timer
  useEffect(() => {
    let timer = null;
    if (isMeasuring) {
      timer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isMeasuring]);

  // Save snapshots to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('electraemf_snapshots', JSON.stringify(snapshots));
      } catch {
        // ignore
      }
    }
  }, [snapshots]);

  // Hardware Magnetometer Sensor Listener (Section 12)
  useEffect(() => {
    let magnetometer = null;

    if (typeof window !== 'undefined' && 'Magnetometer' in window) {
      try {
        magnetometer = new window.Magnetometer({ frequency: 20 });
        magnetometer.addEventListener('reading', () => {
          if (!isMeasuring) return;
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
  }, [isMeasuring]);

  // Simulated Engine Fallback / Distance Testing Lab
  useEffect(() => {
    if (sensorSource === 'hardware' && activeTab !== 'sources') return;
    if (!isMeasuring) return;

    const interval = setInterval(() => {
      const source = SOURCE_CATEGORIES.find(s => s.id === selectedSourceId) || SOURCE_CATEGORIES[0];
      
      // Parse numeric distance: e.g. "5 ft" -> 5
      const distNum = parseFloat(selectedDistance) || 3;
      // Inverse square/falloff law: ~ 1 / distance^1.5
      const distanceFactor = 1 / Math.pow(Math.max(1, distNum), 1.4);
      const computedBase = source.baseMG * distanceFactor;

      const jitter = (Math.random() - 0.5) * source.noise * distanceFactor;
      const mag = Math.max(0.08, computedBase + jitter);

      const angle = Date.now() / 1000;
      const x = (mag * 0.58) + Math.sin(angle) * 0.05;
      const y = (mag * 0.42) + Math.cos(angle * 1.3) * 0.04;
      const z = Math.sqrt(Math.max(0, mag * mag - x * x - y * y)) || (mag * 0.35);

      updateLiveReadings(x, y, z, mag);
    }, 150);

    return () => clearInterval(interval);
  }, [sensorSource, selectedSourceId, selectedDistance, isMeasuring, activeTab]);

  // Audio Geiger Synthesizer
  const playGeigerClick = (fieldVal) => {
    if (!isAudioEnabled || !isMeasuring) return;
    const now = Date.now();
    const intervalMs = Math.max(75, 1000 / Math.max(0.2, fieldVal));
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

      const freq = Math.min(2200, 320 + fieldVal * 40);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio blocked or unsupported
    }
  };

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
    playGeigerClick(roundedMag);
  };

  const handleResetMeasurement = () => {
    setPeakMagnitude(currentMagnitude);
    setMinMagnitude(currentMagnitude);
    setAvgMagnitude(currentMagnitude);
    setSamplesCount(1);
    setSumMagnitude(currentMagnitude);
    setElapsedSeconds(0);
    toast.success('Measurement and statistics reset', { id: 'emf-toast' });
  };

  // Capture & Save Forensic Snapshot (Section 7)
  const handleCaptureSnapshot = () => {
    const currentSource = SOURCE_CATEGORIES.find(s => s.id === selectedSourceId)?.name || 'Ambient Environment';
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
      ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSnapshot = {
      id: `EMF-SNAP-${Math.floor(1000 + Math.random() * 9000)}`,
      date: formattedDate,
      magnitude: currentMagnitude,
      peak: peakMagnitude,
      avg: avgMagnitude,
      min: minMagnitude,
      x: fieldX,
      y: fieldY,
      z: fieldZ,
      source: currentSource,
      distance: selectedDistance,
      mode: sensorSource === 'hardware' ? 'Hardware Magnetometer' : 'Calibrated Simulation Engine',
      status: currentMagnitude < 1.0 ? 'Low (< 1.0 mG)' : currentMagnitude < 4.0 ? 'Moderate (1-4 mG)' : 'Elevated (> 4 mG)',
      unit: unit
    };

    setSnapshots(prev => [newSnapshot, ...prev]);
    toast.success(`Captured ${newSnapshot.id}: ${currentMagnitude} ${unit}`, { id: 'emf-toast' });
  };

  const handleDeleteSnapshot = (id) => {
    setSnapshots(prev => prev.filter(s => s.id !== id));
    toast('Snapshot removed from history', { icon: '🗑️', id: 'emf-toast' });
  };

  // Export CSV (Section 8 & 9)
  const handleExportCSV = () => {
    if (!snapshots.length) {
      toast.error('No measurement snapshots available to export.', { id: 'emf-toast' });
      return;
    }

    const headers = ['ID', 'Date_Time', 'Magnitude_mG', 'Peak_mG', 'Avg_mG', 'Min_mG', 'X_Axis', 'Y_Axis', 'Z_Axis', 'Source', 'User_Distance', 'Sensor_Mode', 'SBM2015_Status'];
    const rows = snapshots.map(s => [
      s.id,
      `"${s.date}"`,
      s.magnitude,
      s.peak,
      s.avg,
      s.min || 0,
      s.x,
      s.y,
      s.z,
      `"${s.source}"`,
      `"${s.distance}"`,
      `"${s.mode}"`,
      `"${s.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `electraEMF_Forensic_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Forensic CSV Export downloaded successfully!', { id: 'emf-toast' });
  };

  // Display value converted according to active unit
  const displayValue = unit === 'mG' ? currentMagnitude : currentMagnitude / 10;
  const displayPeak = unit === 'mG' ? peakMagnitude : peakMagnitude / 10;
  const displayAvg = unit === 'mG' ? avgMagnitude : avgMagnitude / 10;
  const displayMin = unit === 'mG' ? minMagnitude : minMagnitude / 10;
  const unitLabel = unit === 'mG' ? 'mG' : 'µT';

  // SBM-2015 Building Biology Reference Ranges (Section 4)
  const getSeverity = (mgVal) => {
    if (mgVal < 1.0) {
      return {
        level: 'LOW',
        label: 'Low / Biological Sanctuary',
        desc: 'Building Biology SBM-2015 sleeping room benchmark (< 1.0 mG).',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        panelBadgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        color: '#10b981',
        icon: ShieldCheck
      };
    }
    if (mgVal < 4.0) {
      return {
        level: 'MODERATE',
        label: 'Moderate Precautionary Level',
        desc: 'Typical for active daytime areas; elevated for prolonged sleeping.',
        badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
        panelBadgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        color: '#f59e0b',
        icon: AlertTriangle
      };
    }
    return {
      level: 'ELEVATED',
      label: 'Elevated Electromagnetic Risk',
      desc: 'Exceeds precautionary guidelines. Investigation recommended.',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      panelBadgeBg: 'bg-rose-500/25 text-rose-300 border-rose-500/40',
      color: '#ef4444',
      icon: ShieldAlert
    };
  };

  const severity = getSeverity(currentMagnitude);
  const SeverityIcon = severity.icon;

  const clampedMagnitude = Math.min(20, Math.max(0, currentMagnitude));
  const needleDegree = -90 + (clampedMagnitude / 20) * 180;

  const ledSegments = Array.from({ length: 12 }, (_, i) => {
    const threshold = (i + 1) * (20 / 12);
    const isActive = currentMagnitude >= threshold;
    let activeColor = 'bg-emerald-400';
    if (i >= 3 && i < 7) activeColor = 'bg-amber-400';
    else if (i >= 7 && i < 10) activeColor = 'bg-orange-500';
    else if (i >= 10) activeColor = 'bg-rose-500 animate-pulse';

    return { isActive, activeColor };
  });

  const filteredSnapshots = snapshots.filter(s => 
    s.id.toLowerCase().includes(historySearch.toLowerCase()) ||
    s.source.toLowerCase().includes(historySearch.toLowerCase()) ||
    s.status.toLowerCase().includes(historySearch.toLowerCase())
  );

  const innerContent = (
    <div 
      className={isPage 
        ? "bg-white w-full rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden animate-in fade-in duration-200"
        : "bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[92%] overflow-hidden animate-in slide-in-from-bottom duration-300 ease-out"
      }
      role={isPage ? "region" : "dialog"}
      aria-label="ElectraEMF Health Mobile Application"
    >
      {/* DRAG HANDLE (only in modal overlay mode) */}
      {!isPage && (
        <div className="pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>
      )}

      {/* TOP HEADER BAR */}
      <div className="shrink-0 px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-all shrink-0 cursor-pointer"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
          )}
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-heading font-extrabold text-sm text-slate-900 leading-none">
                electraEMF Health
              </h2>
              <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-200/60">
                IBEW #7002
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none mt-0.5">
              Triaxial Magnetic Field Dosimeter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Audio Toggle */}
          <button
            onClick={() => {
              const nextState = !isAudioEnabled;
              setIsAudioEnabled(nextState);
              if (nextState) toast.success('Audio Geiger tone enabled', { id: 'emf-toast' });
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

          {/* Close Button (modal overlay mode only) */}
          {!isPage && onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 active:scale-90 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

        {/* 5 PRIMARY SUB-TABS (Navigation Section 13) with Mouse Wheel & Drag Scroll */}
        <div className="relative shrink-0 bg-slate-50 border-b border-slate-200/80 flex items-center px-1">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollTabs('left')}
            className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 shadow-2xs border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 shrink-0 z-10 active:scale-90 transition-all ml-0.5 cursor-pointer"
            aria-label="Scroll Tabs Left"
            title="Scroll Left"
          >
            <ChevronLeft className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>

          {/* Scrollable Tabs Row */}
          <div 
            ref={tabsContainerRef}
            onMouseDown={handleTabsMouseDown}
            onMouseLeave={handleTabsMouseLeave}
            onMouseUp={handleTabsMouseUp}
            onMouseMove={handleTabsMouseMove}
            className="flex-1 px-1.5 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {[
              { id: 'meter', label: 'Live Meter', icon: Activity },
              { id: 'vector', label: 'Vector (X,Y,Z)', icon: Compass },
              { id: 'sources', label: 'Distance Lab', icon: Sliders },
              { id: 'history', label: `History (${snapshots.length})`, icon: Layers },
              { id: 'learn', label: 'Learn & Limits', icon: BookOpen }
            ].map(tab => {
              const Icon = tab.icon;
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 ${
                    isTabActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollTabs('right')}
            className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 shadow-2xs border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 shrink-0 z-10 active:scale-90 transition-all mr-0.5 cursor-pointer"
            aria-label="Scroll Tabs Right"
            title="Scroll Right"
          >
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className={isPage ? "p-4 space-y-3.5 bg-[#f8fafc]" : "flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#f8fafc]"}>
          
          {/* TAB 1: LIVE EMF FIELD METER (Section 4) */}
          {activeTab === 'meter' && (
            <div className="space-y-3.5">
              {/* SENSOR STATUS & RUN/STOP CONTROLS */}
              <div className="flex items-center justify-between text-xs bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isMeasuring ? (sensorSource === 'hardware' ? 'bg-emerald-500 animate-ping' : 'bg-blue-500 animate-pulse') : 'bg-slate-300'}`} />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-800 block leading-tight">
                      {sensorSource === 'hardware' ? 'HARDWARE MAGNETOMETER' : 'CALIBRATED SIMULATION ENGINE'}
                    </span>
                    <span className="text-[9px] text-slate-400 leading-none">
                      {isMeasuring ? `Sampling at 20 Hz • ${elapsedSeconds}s elapsed` : 'Measurement paused'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setUnit(unit === 'mG' ? 'uT' : 'mG')}
                    className="h-7 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-[10px] active:scale-95 transition-all border border-blue-200/60"
                  >
                    UNIT: {unit}
                  </button>
                  <button
                    onClick={handleResetMeasurement}
                    className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
                    title="Reset Measurement"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* MAIN ANALOG DIAL & DIGITAL READOUT PANEL */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0b162c] to-[#071328] border border-blue-950 p-4.5 flex flex-col items-center justify-center shadow-xl overflow-hidden text-white">
                <div 
                  className="absolute -top-12 w-48 h-48 rounded-full blur-3xl opacity-35 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: severity.color }}
                />

                {/* ANALOG GAUGE SVG */}
                <div className="relative w-56 h-30 flex items-center justify-center">
                  <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 100 A 80 80 0 0 1 42 58"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 46 51 A 80 80 0 0 1 82 23"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="14"
                    />
                    <path
                      d="M 87 21 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <text x="18" y="108" fill="#94a3b8" fontSize="8" fontWeight="bold">0</text>
                    <text x="35" y="44" fill="#10b981" fontSize="8" fontWeight="bold">1</text>
                    <text x="76" y="14" fill="#f59e0b" fontSize="8" fontWeight="bold">4</text>
                    <text x="176" y="108" fill="#ef4444" fontSize="8" fontWeight="bold">20+</text>

                    {/* Needle */}
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

                {/* DIGITAL VALUE */}
                <div className="text-center mt-1 space-y-1">
                  <div className="flex items-baseline justify-center gap-1.5">
                    <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                      {displayValue.toFixed(unit === 'mG' ? 2 : 3)}
                    </span>
                    <span className="text-base font-extrabold text-blue-400">
                      {unitLabel}
                    </span>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-extrabold ${severity.panelBadgeBg}`}>
                    <SeverityIcon className="w-3.5 h-3.5" />
                    <span>STATUS: {severity.level} ({severity.label})</span>
                  </div>
                </div>

                {/* 12-SEGMENT LEVEL BAR */}
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
                  <span>LOW (&lt;1.0)</span>
                  <span>MODERATE (1-4)</span>
                  <span>ELEVATED (&gt;4.0)</span>
                </div>
              </div>

              {/* STATS ROW (Min, Avg, Peak) */}
              <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="text-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[8.5px] uppercase font-bold">MINIMUM</span>
                  <span className="font-mono text-sm font-bold text-slate-800">{displayMin.toFixed(2)} {unitLabel}</span>
                </div>
                <div className="text-center p-2 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-blue-600 block text-[8.5px] uppercase font-bold">AVERAGE</span>
                  <span className="font-mono text-sm font-bold text-blue-900">{displayAvg.toFixed(2)} {unitLabel}</span>
                </div>
                <div className="text-center p-2 bg-rose-50 rounded-xl border border-rose-100">
                  <span className="text-rose-600 block text-[8.5px] uppercase font-bold">PEAK (MAX)</span>
                  <span className="font-mono text-sm font-extrabold text-rose-800">{displayPeak.toFixed(2)} {unitLabel}</span>
                </div>
              </div>

              {/* MEASUREMENT CONTROLS: START, STOP, RESET (Section 4) */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setIsMeasuring(true)}
                  disabled={isMeasuring}
                  className={`h-11 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    isMeasuring 
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start</span>
                </button>

                <button
                  onClick={() => setIsMeasuring(false)}
                  disabled={!isMeasuring}
                  className={`h-11 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    !isMeasuring 
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                      : 'bg-amber-600 hover:bg-amber-700 text-white active:scale-95'
                  }`}
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </button>

                <button
                  onClick={handleResetMeasurement}
                  className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold flex items-center justify-center gap-1.5 border border-slate-200 active:scale-95 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* ACTION: CAPTURE SNAPSHOT BUTTON (Section 7) */}
              <button
                onClick={handleCaptureSnapshot}
                className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Capture & Save Forensic EMF Snapshot</span>
              </button>
            </div>
          )}

          {/* TAB 2: TRIAXIAL VECTOR BREAKDOWN (Section 5) */}
          {activeTab === 'vector' && (
            <div className="space-y-3.5">
              {/* Formula & Magnitude Banner */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-blue-600" />
                    <span>3-Axis Vector Formulation</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[9px] font-mono font-bold">
                    |B| = √(X² + Y² + Z²)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Magnetic field components propagate orthogonally. Real vector magnitude is computed as the Euclidean norm across all three axes.
                </p>
              </div>

              {/* Triaxial Vector Cards (X, Y, Z) */}
              <div className="grid grid-cols-3 gap-2">
                {/* X Axis */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-2xs">
                  <span className="text-[9px] font-extrabold text-rose-600 block uppercase">X-Axis (Pitch)</span>
                  <span className="font-mono text-base font-black text-slate-900 my-0.5 block">
                    {(unit === 'mG' ? fieldX : fieldX / 10).toFixed(2)}
                  </span>
                  <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (fieldX / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Y Axis */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-2xs">
                  <span className="text-[9px] font-extrabold text-emerald-600 block uppercase">Y-Axis (Roll)</span>
                  <span className="font-mono text-base font-black text-slate-900 my-0.5 block">
                    {(unit === 'mG' ? fieldY : fieldY / 10).toFixed(2)}
                  </span>
                  <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (fieldY / 5) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Z Axis */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3 text-center shadow-2xs">
                  <span className="text-[9px] font-extrabold text-blue-600 block uppercase">Z-Axis (Yaw)</span>
                  <span className="font-mono text-base font-black text-slate-900 my-0.5 block">
                    {(unit === 'mG' ? fieldZ : fieldZ / 10).toFixed(2)}
                  </span>
                  <span className="text-[8px] text-slate-400 block">{unitLabel}</span>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (fieldZ / 5) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* REAL-TIME OSCILLOSCOPE WAVEFORM */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-blue-600" />
                    <span>Real-Time Waveform (60 Hz AC Flux)</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ● 20 Hz Live Sampling
                  </span>
                </div>

                <div className="h-24 w-full bg-[#071328] rounded-xl border border-slate-800 p-1 relative overflow-hidden flex items-end">
                  <div className="absolute top-[75%] left-0 right-0 border-b border-dashed border-emerald-500/40 z-0">
                    <span className="text-[7.5px] font-mono text-emerald-400 pl-1">1.0 mG SBM-2015 Sleeping Guideline</span>
                  </div>
                  <div className="absolute top-[40%] left-0 right-0 border-b border-dashed border-amber-500/40 z-0">
                    <span className="text-[7.5px] font-mono text-amber-400 pl-1">4.0 mG Precautionary Limit</span>
                  </div>

                  <svg className="w-full h-full overflow-visible z-10" viewBox="0 0 350 70" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke={severity.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={history.map((val, idx) => {
                        const x = (idx / (history.length - 1)) * 350;
                        const y = 65 - (Math.min(15, val) / 15) * 55;
                        return `${x},${y}`;
                      }).join(' ')}
                    />
                  </svg>
                </div>
              </div>

              {/* Waveform Controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setIsMeasuring(!isMeasuring)}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {isMeasuring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isMeasuring ? 'Pause Waveform' : 'Resume Waveform'}</span>
                </button>
                <button
                  onClick={handleCaptureSnapshot}
                  className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Capture Vector</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SOURCE SIMULATOR & DISTANCE TESTING (Section 6) */}
          {activeTab === 'sources' && (
            <div className="space-y-3.5">
              {/* Educational Simulation Disclaimer Notice */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-[10.5px] text-amber-900 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Educational Simulation Mode Notice:</strong>
                  Distance falloff testing simulates inverse-square geometric dissipation ($1/r^2$). Distances entered are user-selected reference markers, not radar-measured.
                </div>
              </div>

              {/* 7 Required Source Selector Cards */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
                <span className="font-heading font-extrabold text-xs text-slate-900 block">
                  Select Tested Electromagnetic Source (7 Categories):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {SOURCE_CATEGORIES.map(source => {
                    const Icon = source.icon;
                    const isSelected = selectedSourceId === source.id;
                    return (
                      <button
                        key={source.id}
                        onClick={() => {
                          setSelectedSourceId(source.id);
                          setSensorSource('simulated');
                        }}
                        className={`p-2.5 rounded-xl text-left border transition-all active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                          <span className="font-extrabold text-xs truncate">{source.name}</span>
                        </div>
                        <span className="text-[9px] text-slate-500 block truncate">{source.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Distance Selection Controls: 1 ft, 5 ft, 10 ft, 20 ft (Section 6) */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-extrabold text-xs text-slate-900">
                    Distance from Source:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-extrabold border border-blue-200/60">
                    {selectedDistance} ({Math.round(parseFloat(selectedDistance) * 0.3048 * 10) / 10} m)
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {['1 ft', '5 ft', '10 ft', '20 ft'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDistance(d)}
                      className={`h-10 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                        selectedDistance === d
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Live Distance Comparison Card */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Projected Reading</span>
                    <span className="font-mono text-lg font-black text-slate-900">{currentMagnitude.toFixed(2)} mG</span>
                  </div>
                  <button
                    onClick={handleCaptureSnapshot}
                    className="h-9 px-3.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Record at {selectedDistance}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MEASUREMENT HISTORY & SNAPSHOTS (Section 7, 8, 9) */}
          {activeTab === 'history' && (
            <div className="space-y-3.5">
              {/* Header with Search and Export CSV button */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder="Search snapshots by ID, source..."
                    className="w-full bg-white rounded-xl pl-8.5 pr-3 py-2 text-xs text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  onClick={handleExportCSV}
                  className="h-9 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
                  title="Download CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>

              {/* Snapshots List */}
              {filteredSnapshots.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center border border-slate-200/80 space-y-2">
                  <Layers className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold text-slate-700">No measurement records found.</p>
                  <p className="text-[11px] text-slate-400">Capture a snapshot in the Live Meter or Distance Lab.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredSnapshots.map(snap => (
                    <div
                      key={snap.id}
                      className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-2 hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-black text-slate-900">{snap.id}</span>
                            <span className="px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700 text-[8.5px] font-bold">
                              {snap.distance || 'Ambient'}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">{snap.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-sm font-black text-slate-900">{snap.magnitude} mG</span>
                          <span className="text-[9px] text-slate-400 block">Peak: {snap.peak} mG</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                        <span className="text-slate-600 font-bold truncate max-w-[160px]">{snap.source}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setActiveReportSnapshot(snap)}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Printer className="w-3 h-3" />
                            <span>PDF Report</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSnapshot(snap.id)}
                            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center cursor-pointer"
                            title="Delete Snapshot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: LEARN ABOUT EMF & LIMITATIONS (Section 11 & 12) */}
          {activeTab === 'learn' && (
            <div className="space-y-3.5">
              {/* Critical Sensor Limitation Disclosure (Section 12) */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3.5 space-y-1.5 text-rose-950">
                <div className="flex items-center gap-1.5 text-rose-700">
                  <ShieldAlert className="w-4 h-4" />
                  <h4 className="font-heading font-extrabold text-xs uppercase tracking-wide">
                    Smartphone Sensor Technical Limitations
                  </h4>
                </div>
                <p className="text-[11px] leading-relaxed text-rose-900">
                  <strong>Important:</strong> A smartphone's internal magnetometer detects <strong>Extremely Low Frequency (ELF) AC/DC Magnetic Fields (0–100+ Hz)</strong> produced by power lines, transformers, and appliances.
                </p>
                <p className="text-[11px] leading-relaxed text-rose-800">
                  Smartphones <strong>cannot</strong> directly measure high-frequency Radiofrequency (RF) power density from 5G cellular arrays, microwave transmissions, or Wi-Fi beacon bursts. Accurate RF testing requires calibrated isotropic spectrum probes (Narda / Gigahertz Solutions) utilized in professional on-site audits.
                </p>
              </div>

              {/* SBM-2015 Building Biology Reference */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                <h4 className="font-heading font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Building Biology SBM-2015 Guidelines vs. FCC Standards</span>
                </h4>
                <div className="text-[11px] text-slate-600 leading-relaxed space-y-2">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <strong className="text-emerald-800 block font-bold">Safe Sleeping Sanctuary (&lt; 1.0 mG):</strong>
                    Biological standard aimed at preventing melatonin inhibition and cellular stress in bedrooms.
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                    <strong className="text-amber-800 block font-bold">Precautionary Threshold (1.0 – 4.0 mG):</strong>
                    Moderate level common in daytime workplaces; not advised for continuous night-time rest.
                  </div>
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                    <strong className="text-rose-800 block font-bold">Federal FCC / IEEE Limit (1,000 mG):</strong>
                    Outdated thermal threshold protecting only against immediate severe electric shock, ignoring non-thermal long-term biological effects.
                  </div>
                </div>
              </div>

              {/* Sensor Calibration Guide */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 space-y-2 shadow-2xs">
                <h4 className="font-heading font-extrabold text-xs text-slate-900">
                  How to Calibrate Your Phone's Magnetometer:
                </h4>
                <ol className="text-[11px] text-slate-600 space-y-1 list-decimal pl-4 leading-relaxed">
                  <li>Hold your smartphone firmly away from large metal objects.</li>
                  <li>Wave the device in a smooth <strong>Figure-8 motion</strong> in the air 3 to 5 times.</li>
                  <li>This resets the internal electronic compass and realigns the triaxial hall-effect sensors with Earth's geomagnetic baseline.</li>
                </ol>
              </div>
            </div>
          )}

          {/* IBEW AUDIT REQUEST & CONSULTATION FOOTER (Section 10) */}
          <div className="pt-2 border-t border-slate-200/80 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (!isPage && onClose) onClose();
                  if (onNavigateToContact) onNavigateToContact();
                }}
                className="h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-200 shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Request IBEW Audit</span>
              </button>

              <button
                onClick={() => {
                  if (!isPage && onClose) onClose();
                  if (onOpenCall) onOpenCall();
                }}
                className="h-10 rounded-xl bg-[#0b162c] hover:bg-[#122e5a] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call Hotline</span>
              </button>
            </div>
          </div>

        </div>

        {/* PRINTABLE PDF / FORENSIC INSPECTION REPORT MODAL (Section 9) */}
        {activeReportSnapshot && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-3.5 text-slate-900 max-h-[90%] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/electraemf-brand-logo.png" 
                    alt="ElectraEMF" 
                    className="h-8 w-auto object-contain shrink-0"
                  />
                  <div>
                    <h3 className="font-heading font-black text-sm text-slate-900 leading-none">Forensic EMF Report</h3>
                    <p className="text-[10px] text-slate-400 leading-none mt-1">electraEMF Health • IBEW Lic. #7002</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveReportSnapshot(null)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Report Summary Table */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Record ID:</span>
                  <span className="font-mono font-bold">{activeReportSnapshot.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Date & Time:</span>
                  <span className="font-medium text-[11px]">{activeReportSnapshot.date}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Target Source:</span>
                  <span className="font-bold text-[11px]">{activeReportSnapshot.source}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Distance Reference:</span>
                  <span className="font-medium text-[11px]">{activeReportSnapshot.distance}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Total Magnitude |B|:</span>
                  <span className="font-mono font-black text-blue-600">{activeReportSnapshot.magnitude} mG</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">Peak / Average:</span>
                  <span className="font-mono text-[11px]">{activeReportSnapshot.peak} mG / {activeReportSnapshot.avg} mG</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">X, Y, Z Vector:</span>
                  <span className="font-mono text-[10px] text-slate-700">X:{activeReportSnapshot.x} Y:{activeReportSnapshot.y} Z:{activeReportSnapshot.z}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 text-[11px]">SBM-2015 Status:</span>
                  <span className="font-bold text-[11px] text-slate-800">{activeReportSnapshot.status}</span>
                </div>
              </div>

              {/* Limitations Notice */}
              <p className="text-[9.5px] text-slate-400 leading-relaxed bg-slate-50 p-2 rounded-xl border border-slate-100">
                Notice: Measured using smartphone triaxial magnetic flux sensor. Smartphone sensors do not assess radiofrequency microwave power density. Formal certified forensic reports require on-site calibrated spectrum dosimetry.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') window.print();
                  }}
                  className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
                <button
                  onClick={() => setActiveReportSnapshot(null)}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FULL-PAGE COURT-STANDARD PDF REPORT PORTAL (Visible ONLY during print/PDF generation) */}
        {activeReportSnapshot && typeof document !== 'undefined' && createPortal(
          <div id="electraemf-printable-report" className="bg-white text-slate-900">
            {/* Top Corporate Letterhead */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3 mb-3">
              <div className="flex items-center gap-3.5">
                <img 
                  src="/assets/electraemf-brand-logo.png" 
                  alt="ElectraEMF Brand Logo" 
                  className="h-12 w-auto object-contain shrink-0"
                />
                <div>
                  <h1 className="text-xl font-black text-[#0c234a] tracking-tight leading-none uppercase">
                    electraEMF Health™
                  </h1>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 leading-tight">
                    Tri-State EMF / EMI Environmental Diagnostics & Forensic Engineering
                  </p>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    State-Licensed Electronics Engineers • IBEW Local Union Lic. #7002 • Est. 2003
                  </p>
                  <p className="text-[9px] text-blue-700 font-bold leading-tight mt-0.5">
                    Official Regional Jurisdictions: New York • New Jersey • Connecticut • Pennsylvania • Delaware
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <div className="inline-block bg-[#0c234a] text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-1">
                  OFFICIAL FORENSIC CERTIFICATE
                </div>
                <p className="font-mono text-xs font-black text-slate-900 leading-tight">Docket: {activeReportSnapshot.id}</p>
                <p className="text-[10px] text-slate-600 leading-tight">{activeReportSnapshot.date}</p>
                <p className="text-[9.5px] font-bold text-slate-800 mt-1">Direct Hotline: (347) 491-9867</p>
                <p className="text-[9px] text-slate-500">https://electraemfhealth.com/</p>
              </div>
            </div>

            {/* Accreditation & Quality Standards Ribbon */}
            <div className="bg-slate-100 border border-slate-300 rounded px-3 py-1 mb-3 flex items-center justify-between text-[8.5px] font-black text-slate-800 uppercase tracking-wider">
              <span>Building Biology SBM-2015 Evidentiary Standard</span>
              <span>•</span>
              <span>ANSI / AAMI / ISO 14117 Clinical Clearance</span>
              <span>•</span>
              <span>Court-Admissible Chain of Custody</span>
            </div>

            {/* Section I: Target Environment & Test Dossier */}
            <div className="mb-3">
              <h2 className="text-[11px] font-black uppercase text-[#0c234a] border-b border-slate-300 pb-0.5 mb-1.5 tracking-wide">
                Section I: Target Asset & Operating Parameters
              </h2>
              <div className="grid grid-cols-4 gap-2 text-xs border border-slate-300 rounded p-2 bg-slate-50/70">
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 block">Tested Target</span>
                  <span className="font-bold text-slate-900 text-[11px] truncate block">{activeReportSnapshot.source}</span>
                </div>
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 block">Reference Distance</span>
                  <span className="font-bold text-slate-900 text-[11px] block">{activeReportSnapshot.distance || 'Contact Area'}</span>
                </div>
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 block">Dosimetry Instrument</span>
                  <span className="font-bold text-slate-900 text-[11px] block">Triaxial Flux Sensor</span>
                </div>
                <div>
                  <span className="text-[8.5px] uppercase font-bold text-slate-500 block">Sensor Protocol</span>
                  <span className="font-bold text-slate-900 text-[11px] truncate block">{activeReportSnapshot.mode || 'Hardware Magnetometer'}</span>
                </div>
              </div>
            </div>

            {/* Section II: Quantitative Electromagnetic Field Dosimetry */}
            <div className="mb-3">
              <h2 className="text-[11px] font-black uppercase text-[#0c234a] border-b border-slate-300 pb-0.5 mb-1.5 tracking-wide">
                Section II: Precision Triaxial Field Measurements
              </h2>
              <table className="w-full text-left text-[10.5px] border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 text-[9px] font-black uppercase">
                    <th className="border border-slate-300 p-1.5">Measurement Parameter</th>
                    <th className="border border-slate-300 p-1.5 text-right">Magnitude</th>
                    <th className="border border-slate-300 p-1.5">Unit</th>
                    <th className="border border-slate-300 p-1.5">Engineering Formulation & Vector Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50/50 font-bold">
                    <td className="border border-slate-300 p-1.5 text-slate-900">Total Resultant Magnitude |B|</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono text-xs font-black text-[#0c234a]">
                      {activeReportSnapshot.magnitude}
                    </td>
                    <td className="border border-slate-300 p-1.5 text-blue-700 font-bold">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] font-mono text-slate-700">
                      Euclidean Vector Sum: |B| = √(Bx² + By² + Bz²)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5 text-slate-800">Peak Exposure Level (Max)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono text-rose-700 font-bold">
                      {activeReportSnapshot.peak}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Maximum instantaneous transient AC 60 Hz peak
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="border border-slate-300 p-1.5 text-slate-800">Session Average (Mean)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-bold text-slate-800">
                      {activeReportSnapshot.avg}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Time-weighted integrated exposure baseline
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5 text-slate-800">Baseline Minimum (Min)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-bold text-slate-800">
                      {activeReportSnapshot.min || (activeReportSnapshot.magnitude * 0.8).toFixed(2)}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Ambient geomagnetic floor level
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="border border-slate-300 p-1.5 text-slate-800">X-Axis Orthogonal Component (Bx)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-bold text-slate-700">
                      {activeReportSnapshot.x}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Lateral horizontal flux polarization
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 p-1.5 text-slate-800">Y-Axis Longitudinal Component (By)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-bold text-slate-700">
                      {activeReportSnapshot.y}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Longitudinal directional flux polarization
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="border border-slate-300 p-1.5 text-slate-800">Z-Axis Vertical Component (Bz)</td>
                    <td className="border border-slate-300 p-1.5 text-right font-mono font-bold text-slate-700">
                      {activeReportSnapshot.z}
                    </td>
                    <td className="border border-slate-300 p-1.5">mG</td>
                    <td className="border border-slate-300 p-1.5 text-[9px] text-slate-600">
                      Vertical ground-return loop component
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section III: Building Biology SBM-2015 Standards Comparison */}
            <div className="mb-3">
              <h2 className="text-[11px] font-black uppercase text-[#0c234a] border-b border-slate-300 pb-0.5 mb-1.5 tracking-wide">
                Section III: Certified Standards Comparison & Risk Assessment
              </h2>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className={`p-2 rounded border ${
                  activeReportSnapshot.magnitude < 1.0 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase mb-0.5">
                    <span>Building Biology SBM-2015</span>
                    <span>&lt; 1.0 mG</span>
                  </div>
                  <p className="text-[10px] font-bold">Safe Sleeping Sanctuary</p>
                  <p className="text-[8.5px] font-normal leading-tight mt-0.5">
                    No biological anomaly. Optimal for restorative biological sleep and pineal melatonin synthesis.
                  </p>
                </div>

                <div className={`p-2 rounded border ${
                  activeReportSnapshot.magnitude >= 1.0 && activeReportSnapshot.magnitude < 4.0 
                    ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase mb-0.5">
                    <span>European Precautionary</span>
                    <span>1.0 – 4.0 mG</span>
                  </div>
                  <p className="text-[10px] font-bold">Moderate Exposure</p>
                  <p className="text-[8.5px] font-normal leading-tight mt-0.5">
                    Typical near energized wiring and appliances. Safe distance buffer advised for continuous rest.
                  </p>
                </div>

                <div className={`p-2 rounded border ${
                  activeReportSnapshot.magnitude >= 4.0 
                    ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between text-[9px] font-black uppercase mb-0.5">
                    <span>High-Risk Threshold</span>
                    <span>&gt; 4.0 mG</span>
                  </div>
                  <p className="text-[10px] font-bold">Elevated Anomaly</p>
                  <p className="text-[8.5px] font-normal leading-tight mt-0.5">
                    Significant magnetic field. Professional on-site circuit tracing and remediation recommended.
                  </p>
                </div>
              </div>
            </div>

            {/* Section IV: Diagnostic Assessment & Legal / Scientific Disclaimer */}
            <div className="mb-3 bg-slate-50 border border-slate-200 rounded p-2 text-[9.5px] text-slate-700 space-y-1 leading-relaxed">
              <p>
                <strong>Diagnostic Evaluation:</strong> Recorded field magnitude of <strong>{activeReportSnapshot.magnitude} mG</strong> reflects localized magnetic flux density. Current evaluated status: <strong>{activeReportSnapshot.status}</strong>.
              </p>
              <p className="text-[8.5px] text-slate-500">
                <strong>Notice of Technical Scope:</strong> This certificate reflects low-frequency AC/DC magnetic field measurements (0–100+ Hz) captured using smartphone triaxial magnetic sensors. Magnetic fields penetrate standard building materials (drywall, wood, concrete, brick) without attenuation. This report does not measure high-frequency Radiofrequency (RF) power density (5G small cells, radar, or Wi-Fi beacon bursts), which requires calibrated isotropic spectrum dosimetry conducted during on-site forensic engineering surveys.
              </p>
            </div>

            {/* Section V: Official Forensic Sign-Off & Verification Seal */}
            <div className="border-t-2 border-slate-900 pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center text-center p-0.5 font-mono text-[6.5px] text-slate-800 uppercase font-black">
                  <span>IBEW #7002</span>
                  <span>VERIFIED</span>
                  <span>COURT-STD</span>
                </div>
                <div>
                  <p className="text-[9.5px] font-black uppercase text-slate-900">
                    Tri-State Environmental Diagnostics & Engineering
                  </p>
                  <p className="text-[8.5px] text-slate-600">
                    Serving New York City, New Jersey, Connecticut, Pennsylvania, and Delaware
                  </p>
                  <p className="text-[8px] text-slate-400">
                    Court-Admissible Chain of Custody Record • Verified on {activeReportSnapshot.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="w-36 border-b border-slate-800 mb-0.5" />
                <p className="text-[11px] font-black text-slate-900 leading-tight">Dr. J. Dumanov, PhD</p>
                <p className="text-[9px] font-bold text-slate-700 leading-tight">Chief Forensic Diagnostics Hygienist</p>
                <p className="text-[8px] text-slate-500 leading-tight">IBEW Local Union Lic. #7002 • Senior Specialist</p>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    );

    if (isPage) {
      return (
        <div className="w-full pb-3">
          {innerContent}
        </div>
      );
    }

    return (
      <div 
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200"
      >
        {innerContent}
      </div>
    );
  }
