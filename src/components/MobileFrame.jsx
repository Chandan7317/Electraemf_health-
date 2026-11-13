import React from 'react';

export default function MobileFrame({ children }) {
  return (
    <div className="w-full h-full sm:min-h-screen bg-[#f4f7fb] sm:bg-[#070e1c] sm:flex sm:items-center sm:justify-center sm:p-4 text-slate-900 selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* Mobile Device Chassis: Native 100% full viewport on real mobile devices, mockup bezel on tablet/desktop */}
      <div className="w-full h-full sm:h-[860px] sm:max-h-[94vh] sm:max-w-[420px] sm:rounded-[44px] sm:border-[8px] sm:border-[#1e293b] sm:shadow-2xl sm:shadow-blue-950/80 sm:ring-1 sm:ring-white/20 bg-[#f4f7fb] relative flex flex-col overflow-hidden">
        {/* Inner Phone Content (Header, Scrollable Main, BottomNav, and Modals) */}
        <div className="flex-1 flex flex-col overflow-hidden relative h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
