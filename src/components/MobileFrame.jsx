import React, { useState } from 'react';
import { Smartphone, Maximize2 } from 'lucide-react';

export default function MobileFrame({ children }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`w-full h-full min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white overflow-hidden transition-colors ${
      isFullscreen 
        ? 'bg-[#f4f7fb] flex justify-center' 
        : 'bg-[#f4f7fb] sm:bg-[#070e1c] sm:flex sm:items-center sm:justify-center sm:p-4'
    }`}>
      {/* Desktop Mode Switcher (visible on desktop only) */}
      <div className="hidden sm:flex fixed top-4 right-4 z-50 items-center gap-1.5 bg-[#0b162c]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-xl text-white text-xs">
        <span className="text-[11px] text-slate-400 font-medium">View:</span>
        <button
          onClick={() => setIsFullscreen(false)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            !isFullscreen ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
          title="Phone Bezel Mockup"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone Frame</span>
        </button>
        <button
          onClick={() => setIsFullscreen(true)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
            isFullscreen ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
          }`}
          title="Full Viewport Mobile"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Full Screen</span>
        </button>
      </div>

      {/* Mobile Device Chassis */}
      <div className={`w-full h-full relative flex flex-col overflow-hidden transition-all ${
        isFullscreen
          ? 'max-w-[430px] h-screen shadow-2xl bg-[#f4f7fb]'
          : 'sm:h-[860px] sm:max-h-[94vh] sm:max-w-[420px] sm:rounded-[44px] sm:border-[8px] sm:border-[#1e293b] sm:shadow-2xl sm:shadow-blue-950/80 sm:ring-1 sm:ring-white/20 bg-[#f4f7fb]'
      }`}>
        {/* Inner Phone Content (Header, Scrollable Main, BottomNav, and Modals) */}
        <div className="flex-1 flex flex-col overflow-hidden relative h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
