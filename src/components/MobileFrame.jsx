import React from 'react';

export default function MobileFrame({ children }) {
  return (
    <div className="min-h-screen bg-[#070e1c] flex items-center justify-center sm:p-4 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Mobile Device Chassis */}
      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[44px] sm:border-[8px] sm:border-[#1e293b] sm:shadow-2xl sm:shadow-blue-950/80 sm:ring-1 sm:ring-white/20 bg-[#f4f7fb] relative flex flex-col overflow-hidden">
        {/* Inner Phone Content (Header, Scrollable Main, BottomNav, and Modals) */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
}
