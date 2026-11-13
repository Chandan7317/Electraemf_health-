import React from 'react';
import { Bell, X, Check, Zap, AlertTriangle, FileText, ArrowRight } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: "Active Field Advisory: mmWave 5G Deployments",
      desc: "New urban small cell antenna arrays identified in NYC & Jersey City residential zones. Terrace and window attenuation testing recommended.",
      time: "2 hours ago",
      type: "advisory",
      unread: true,
      actionTab: "services"
    },
    {
      id: 2,
      title: "Case Study Published: NJ Stray Voltage in Pool",
      desc: "Read the forensic report on how electraEMF uncovered hazardous ground current keeping an NJ family off their lawn and out of their swimming pool.",
      time: "Yesterday",
      type: "report",
      unread: true,
      actionTab: "resources"
    },
    {
      id: 3,
      title: "Tri-State Licensed Engineering Schedule",
      desc: "Emergency pre-closing real estate EMF inspections currently available within 24-48 hours across NY, NJ, PA & CT.",
      time: "2 days ago",
      type: "info",
      unread: false,
      actionTab: "contact"
    }
  ];

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-[85%] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-slate-900">Notifications</h3>
              <p className="text-[10px] text-slate-400">EMF Updates & Advisories</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2.5">
          {notifications.map((n) => (
            <div 
              key={n.id}
              onClick={() => {
                onClose();
                onNavigate(n.actionTab);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                n.unread 
                  ? 'bg-blue-50/50 border-blue-200/80 shadow-xs' 
                  : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-white text-blue-700 border border-slate-200">
                  {n.type}
                </span>
                <span className="text-[10px] text-slate-400">{n.time}</span>
              </div>
              <h4 className="font-heading font-bold text-xs text-slate-900">
                {n.title}
              </h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                {n.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button 
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all text-center"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
}

