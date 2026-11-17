import React from 'react';
import { Home, Compass, ShieldCheck, FileText, Activity } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Compass },
    { id: 'experts', label: 'Experts', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: FileText, badge: 1 },
    { id: 'meter', label: 'EMF Meter', icon: Activity },
  ];

  return (
    <div 
      className="shrink-0 z-30 px-3 pt-1 select-none pointer-events-auto bg-gradient-to-t from-[#f4f7fb] via-[#f4f7fb]/95 to-transparent"
      style={{ paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom, 0.65rem))' }}
    >
      {/* Floating Dark Navy Pill Bar matching reference screenshot */}
      <nav 
        className="w-full h-[58px] bg-[#0b162c] border border-white/10 shadow-2xl shadow-blue-950/60 rounded-full p-1.5 flex items-center justify-around"
        role="navigation"
        aria-label="Bottom Navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <div
              key={tab.id}
              className="flex-1 h-full flex items-center justify-center px-0.5"
            >
              <button
                onClick={() => onTabChange(tab.id)}
                className={`relative flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'w-full h-full max-w-[74px] bg-white text-[#1d61f2] shadow-md shadow-black/25 flex-col py-0.5'
                    : 'w-full h-full text-slate-300 hover:text-white active:scale-95'
                }`}
                aria-label={tab.label}
              >
                <div className="relative flex items-center justify-center">
                  <Icon 
                    className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.5] text-[#1d61f2]' : 'stroke-[1.9]'}`} 
                  />
                  {/* Notification badge on inactive tabs (Matches Screenshot on Reports tab) */}
                  {tab.badge && !isActive && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#1d61f2] text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-xs ring-1 ring-[#0b162c]">
                      {tab.badge}
                    </span>
                  )}
                </div>

                {/* Active tab label */}
                {isActive && (
                  <span className="text-[9.5px] font-extrabold text-[#1d61f2] mt-0.5 tracking-tight leading-none">
                    {tab.label}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
