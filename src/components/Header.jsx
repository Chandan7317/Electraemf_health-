import React, { useRef, useEffect } from 'react';
import { Search, Bell, ArrowLeft, X, User } from 'lucide-react';

export default function Header({ 
  activeTab = 'home',
  onOpenNotifications, 
  onOpenProfile, 
  onOpenSearch,
  isSearchOpen = false,
  searchQuery = '',
  setSearchQuery,
  onCloseSearch,
  unreadCount = 2,
  onNavigate,
  onBack,
  currentUser = null,
  userPhoto = null
}) {
  const isNotificationsActive = activeTab === 'notifications';
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // If search is active: Render the full expanded native mobile search header
  if (isSearchOpen) {
    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 py-2 text-slate-900 transition-all shadow-xs animate-in fade-in duration-150">
        <div className="flex items-center gap-2.5">
          {/* Back button to close search */}
          <button 
            onClick={onCloseSearch}
            className="w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all focus:outline-none shrink-0 cursor-pointer shadow-2xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
          </button>

          {/* Search Input Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search EMF services, 5G, pacemakers, reports..."
              className="w-full h-10 bg-slate-100/90 rounded-full pl-9 pr-9 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-400 transition-all font-medium placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center text-xs font-bold active:scale-90 transition-all cursor-pointer"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Normal header matching reference screenshot
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100/90 px-4 py-2.5 sm:px-4.5 sm:py-3 text-slate-900 transition-all shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between">
        {/* Brand Logo: Squircle EMF Wave Icon + Bold ElectraEMF typography (Matches Screenshot) */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 text-left group focus:outline-none transition-transform active:scale-[0.98] cursor-pointer"
          aria-label="ElectraEMF Home"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0b162c] border border-blue-900/40 flex items-center justify-center shadow-xs overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
            <svg 
              className="w-4.5 h-4.5 text-blue-400" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
              <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
              <path d="M12 12v6" />
              <path d="m12 6-3 6h6l-3-6Z" />
              <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </div>
          <div className="flex items-center font-heading font-extrabold text-[17px] tracking-tight leading-none">
            <span className="text-[#0b162c]">Electra</span>
            <span className="text-[#1d61f2]">EMF</span>
          </div>
        </button>

        {/* Action Icons: Notification Bell & Profile Avatar (Matches Screenshot) */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button 
            onClick={onOpenNotifications}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all focus:outline-none shadow-xs border cursor-pointer ${
              isNotificationsActive 
                ? 'bg-blue-50 text-blue-600 border-blue-200 ring-2 ring-blue-500/15' 
                : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border-slate-200/80'
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[2.2]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-[#f43f5e] text-[10px] font-black text-white flex items-center justify-center shadow-xs ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar / Profile Icon */}
          <button 
            onClick={onOpenProfile}
            className={`relative w-9 h-9 rounded-full overflow-hidden active:scale-95 transition-all focus:outline-none shadow-xs border cursor-pointer ${
              activeTab === 'profile' 
                ? 'ring-2 ring-blue-600 ring-offset-1 border-blue-600' 
                : 'border-slate-200/80 hover:border-blue-400 bg-white'
            }`}
            aria-label="User Profile"
          >
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              {userPhoto ? (
                <img 
                  src={userPhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-50/70 hover:bg-blue-100/70 text-blue-600 flex items-center justify-center transition-colors">
                  <User className="w-4 h-4 stroke-[2.2]" />
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
