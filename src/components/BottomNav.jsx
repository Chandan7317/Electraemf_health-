import React from 'react';
import { Home, Compass, ShieldCheck, FileText, User } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Compass },
    { id: 'experts', label: 'Experts', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: FileText, badge: 1 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="shrink-0 z-30 px-3.5 pb-3.5 pt-1 select-none pointer-events-auto bg-gradient-to-t from-[#f4f7fb] via-[#f4f7fb]/90 to-transparent">
      {/* Stabilized fixed-height pill navigation with equal 20% slots (No layout shift) */}
      <nav 
        className="w-full h-[54px] bg-[#0b162c] border border-white/10 shadow-2xl shadow-blue-950/50 rounded-full p-1.5 flex items-center"
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
                className={`relative flex items-center justify-center rounded-full transition-colors duration-150 focus:outline-none ${
                  isActive
                    ? 'w-full h-full max-w-[68px] bg-white text-blue-600 shadow-md shadow-black/20 flex-col'
                    : 'w-full h-full text-slate-400 hover:text-white active:scale-95'
                }`}
                aria-label={tab.label}
              >
                <div className="relative flex items-center justify-center">
                  <Icon 
                    className={`w-4 h-4 ${isActive ? 'stroke-[2.5] text-blue-600' : 'stroke-[1.8]'}`} 
                  />
                  {/* Notification badge on inactive tabs */}
                  {tab.badge && !isActive && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-blue-500 text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-xs">
                      {tab.badge}
                    </span>
                  )}
                </div>

                {/* Active tab label */}
                {isActive && (
                  <span className="text-[9px] font-extrabold text-blue-600 mt-0.5 tracking-tight leading-none">
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
