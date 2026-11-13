import React, { useState } from 'react';
import { 
  Check, Calendar, PhoneCall, HeartPulse, 
  ChevronRight, FileText
} from 'lucide-react';

export default function NotificationsScreen({ onNavigate, onUnreadChange }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Medical Implant Safety Alert (ICD / Pacemaker)",
      desc: "High-voltage line & EV fast charger proximity guidelines updated for cardiac implant patients.",
      time: "10m ago",
      icon: HeartPulse,
      iconBg: "bg-rose-50 text-rose-500 border border-rose-100",
      actionText: "View Protocol",
      actionTarget: "services",
      unread: true
    },
    {
      id: 2,
      title: "Tri-State Field Dispatch Audit Available",
      desc: "Licensed IBEW engineering on-site exposure audits active across NY, NJ, CT, PA & DE.",
      time: "2h ago",
      icon: Calendar,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      actionText: "Schedule Audit",
      actionTarget: "profile",
      unread: true
    },
    {
      id: 3,
      title: "Chief Engineer Callback Scheduled",
      desc: "Prof. Dr. Joseph Dumanov confirmed for forensic RF spectrum & stray voltage triage.",
      time: "1d ago",
      icon: PhoneCall,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      actionText: "View Schedule",
      actionTarget: "experts",
      unread: false
    },
    {
      id: 4,
      title: "Case Study: Brick, NJ Stray Voltage Neutralized",
      desc: "Forensic differential oscilloscopy report published: 100% ground voltage neutralized.",
      time: "3d ago",
      icon: FileText,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      actionText: "Read Dossier",
      actionTarget: "reports",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, unread: false }));
    setNotifications(updated);
    if (onUnreadChange) onUnreadChange(0);
  };

  const handleCardClick = (notification) => {
    if (notification.unread) {
      const updated = notifications.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      );
      setNotifications(updated);
      const remaining = updated.filter(n => n.unread).length;
      if (onUnreadChange) onUnreadChange(remaining);
    }
    if (notification.actionTarget) {
      onNavigate(notification.actionTarget);
    }
  };

  return (
    <div className="space-y-2 pb-20 animate-in fade-in duration-150">
      {/* Top Header Section */}
      <div className="flex items-center justify-between px-0.5 pt-0.5 pb-0.5">
        <div>
          <h1 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
            Notifications
          </h1>
          <p className="text-[10px] text-slate-500 font-medium">
            {unreadCount > 0 ? `${unreadCount} unread updates and alerts` : 'All caught up'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 active:scale-95 transition-all py-0.5 px-2 rounded-md hover:bg-blue-50"
          >
            <Check className="w-3 h-3 stroke-[2.5]" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Ultra Compact Notifications Cards Listing */}
      <div className="space-y-1.5">
        {notifications.map((item) => {
          const Icon = item.icon;
          const isUnread = item.unread;

          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className={`rounded-lg py-2 px-2.5 bg-white shadow-xs transition-all cursor-pointer active:scale-[0.99] ${
                isUnread 
                  ? 'border-[1.5px] border-blue-400/90 shadow-xs bg-gradient-to-r from-blue-50/20 via-white to-white' 
                  : 'border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {/* Ultra-compact squircle icon */}
                <div className={`w-7 h-7 rounded-md ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5">
                    <h2 className="font-heading font-bold text-[11.5px] text-slate-900 leading-none truncate">
                      {item.title}
                    </h2>
                    <div className="flex items-center shrink-0 text-[9.5px] text-slate-400 font-medium">
                      <span>{item.time}</span>
                      {/* Blue unread dot indicator */}
                      {isUnread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block ml-1 shadow-xs" />
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-tight mt-1 line-clamp-1">
                    {item.desc}
                  </p>

                  {/* Micro Action Link */}
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5">
                      <span>{item.actionText}</span>
                      <ChevronRight className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

