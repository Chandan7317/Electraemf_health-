import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, Phone, Mail, User, Building, MapPin, 
  CheckSquare, Square, ChevronRight, FileText, Bookmark, 
  Bell, Scale, Lock, Share2, AlertCircle, CheckCircle2,
  Send, Sparkles, Camera, Trash2
} from 'lucide-react';
import { ShadcnSelect } from './ui/Select';

export default function ProfileScreen({ 
  onOpenCall, 
  onNavigate, 
  currentUser, 
  onLogout,
  userPhoto = null,
  onUpdatePhoto
}) {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (onUpdatePhoto && typeof reader.result === 'string') {
        onUpdatePhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (onUpdatePhoto) {
      onUpdatePhoto(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const [selectedState, setSelectedState] = useState('NY');
  const [concerns, setConcerns] = useState({
    powerLines: true,
    fiveG: false,
    implant: false,
    strayVoltage: false,
    realEstate: false,
    symptoms: false
  });

  const propertyOptions = [
    { value: "Single Family Home", label: "Single Family Home" },
    { value: "Apartment / Penthouse", label: "Apartment / Penthouse" },
    { value: "School / Childcare Center", label: "School / Childcare Center" },
    { value: "Commercial / Corporate Facility", label: "Commercial / Corporate Facility" },
    { value: "Hospital / Clinical Facility", label: "Hospital / Clinical Facility" },
    { value: "Pending Real Estate Purchase / Escrow", label: "Pending Real Estate Purchase / Escrow" }
  ];

  const serviceOptions = [
    { value: "Residential EMF & Stray Voltage Testing", label: "Residential EMF & Stray Voltage Testing" },
    { value: "Commercial & Industrial 60Hz Power Utility", label: "Commercial & Industrial 60Hz Power Utility" },
    { value: "Medical Implant Interference (ICD/Pacemaker)", label: "Medical Implant Interference (ICD/Pacemaker)" },
    { value: "4G, 5G & 6G Telecom Subsystem Analysis", label: "4G, 5G & 6G Telecom Subsystem Analysis" },
    { value: "Educational Districts & School Safety Audits", label: "Educational Districts & School Safety Audits" },
    { value: "Real Estate Due Diligence & Court Expert Witness", label: "Real Estate Due Diligence & Court Expert Witness" }
  ];

  const [form, setForm] = useState({
    company: '',
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'Residential EMF & Stray Voltage Testing',
    propertyType: 'Single Family Home',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('62034-EMF');

  const toggleConcern = (key) => {
    setConcerns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email) {
      alert('Please fill out your Name, Phone Number, and Email.');
      return;
    }
    const newTicket = Math.floor(10000 + Math.random() * 90000) + '-EMF';
    setTicketNum(newTicket);
    setSubmitted(true);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* 0. PROFILE PHOTO MANAGEMENT CARD */}
      <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-3.5">
          {/* Circular Avatar with Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-blue-500/30 bg-blue-50 flex items-center justify-center shadow-xs">
              {userPhoto ? (
                <img 
                  src={userPhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-7 h-7 text-blue-600 stroke-[2]" />
              )}
            </div>

            {/* Quick Camera Edit Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md active:scale-90 transition-all border-2 border-white cursor-pointer"
              title="Upload photo"
              aria-label="Upload photo"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>

          {/* Name & Details */}
          <div className="flex-1 min-w-0">
            <span className="text-[9.5px] font-black uppercase text-blue-600 tracking-wider block">
              {currentUser ? 'CLIENT ACCOUNT ACTIVE' : 'PROFILE PHOTO & IDENTITY'}
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate mt-0.5">
              {currentUser?.name || 'Property Owner / Client'}
            </h2>
            <p className="text-[11px] text-slate-500 truncate">
              {currentUser?.email || (userPhoto ? 'Custom profile photo active' : 'Tap camera icon to set photo')}
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 h-9 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>{userPhoto ? 'Change Photo' : 'Upload Profile Picture'}</span>
          </button>

          {userPhoto && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="h-9 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 active:scale-98 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
      </div>

      {/* 0. SECURE CLIENT AUTHENTICATION / ACCESS CARD */}
      {currentUser ? (
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 text-white rounded-3xl p-4.5 border border-blue-900/50 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 backdrop-blur-md flex items-center justify-center text-white border border-blue-400/30">
                <User className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 block">
                  CLIENT ACCOUNT VERIFIED
                </span>
                <h2 className="text-sm font-extrabold text-white">
                  {currentUser.name || currentUser.email}
                </h2>
                <span className="text-[11px] text-blue-200">
                  {currentUser.email}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/20 transition-all active:scale-95"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-white rounded-3xl p-4.5 border border-blue-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-blue-600 tracking-wider block">
                  ELECTRAEMF CLIENT PORTAL
                </span>
                <h2 className="text-xs font-extrabold text-slate-900">
                  Sign In / Create Account
                </h2>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[10px] font-extrabold">
              Encrypted
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Access certified lab reports, download court-admissible audit certificates, and view your assigned IBEW engineer triage.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('login')}
              className="h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center shadow-sm shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('signup')}
              className="h-10 rounded-xl bg-white hover:bg-blue-50 border border-blue-300 text-blue-700 font-extrabold text-xs flex items-center justify-center shadow-2xs active:scale-98 transition-all cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* 1. CLIENT INTAKE PORTAL CARD (Exact Image 4) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase text-slate-400 block leading-tight">
                CLIENT INTAKE PORTAL
              </span>
              <span className="text-xs font-bold text-blue-700 leading-tight">
                IBEW Lic. #7002
              </span>
            </div>
          </div>
          <button className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500">
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <h1 className="font-heading font-extrabold text-base text-slate-900 leading-snug">
            Welcome, Property Owner
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tri-State EMF/EMI Environmental Diagnostics
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-blue-600" />
            Serving NY, NJ, CT, PA, DE
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
            Ticket #{ticketNum}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Priority Triage Active
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <strong className="text-slate-900 block font-bold">Evidentiary Court-Standard Reports</strong>
              <span className="text-slate-500">IBEW Engineers & Certified Industrial Hygienists</span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-extrabold text-[9px]">
            Est. 2003
          </span>
        </div>
      </div>

      {/* 2. DIRECT CLINICAL CHANNELS (Exact Image 4) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-extrabold text-slate-800 flex items-center gap-1">
            <span>⚡ Direct Clinical Channels</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Mon-Sun 8am-5pm EST</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card Left: Dark Navy */}
          <a
            href="tel:3474919867"
            className="rounded-3xl p-3.5 bg-[#0c1f3d] text-white shadow-sm flex flex-col justify-between active:scale-98 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[9px] font-black uppercase text-cyan-300">
                Direct Line
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[10px] text-slate-300 block leading-tight">Dr. J. Dumanov Direct</span>
              <p className="text-sm font-black text-white leading-tight mt-0.5">347-491-9867</p>
              <span className="text-[9px] text-blue-300 block leading-tight mt-0.5">Chief Scientist & Engineer</span>
            </div>
          </a>

          {/* Card Right: Light Blue */}
          <a
            href="mailto:EMFmedicalExpert@gmail.com"
            className="rounded-3xl p-3.5 bg-blue-50/70 border border-blue-100 text-slate-900 shadow-sm flex flex-col justify-between active:scale-98 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-black uppercase text-blue-600">
                Tri-State
              </span>
            </div>
            <div className="mt-3">
              <span className="text-[10px] text-slate-500 block leading-tight">EMF Medical Mailbox</span>
              <p className="text-xs font-black text-slate-900 leading-tight mt-0.5 truncate">EMFmedical...</p>
              <span className="text-[9px] text-blue-600 font-bold block leading-tight mt-0.5">Attach Photos/Records</span>
            </div>
          </a>
        </div>
      </div>

      {/* 3. EMERGENCY ENVIRONMENTAL TRIAGE CALLOUT (Exact Image 4) */}
      <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="font-extrabold text-blue-900">Emergency Environmental Triage:</strong> Same-day dispatch available for acute pacemaker interference, substation proximity, and acute high-voltage line concerns.
        </p>
      </div>

      {/* 4. SITE AUDIT DISPATCH / REQUEST FREE EXPERT CONSULTATION (Exact Image 4) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div>
          <span className="text-[9px] font-extrabold uppercase tracking-wide text-blue-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            SITE AUDIT DISPATCH
          </span>
          <h2 className="font-heading font-extrabold text-base text-slate-900 mt-0.5">
            Request Free Expert Consultation
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            No obligation. All reports authored by certified IBEW electronics engineers and clinical hygienists under evidentiary non-disclosure.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Company Name */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Company / Institution Name</label>
                <span className="text-slate-400 text-[10px]">Optional</span>
              </div>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="e.g. School District, Law Firm, HOA, Realty"
                  className="w-full bg-slate-50 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <span className="text-rose-500 text-[10px]">Required</span>
              </div>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Full legal or property owner name"
                  className="w-full bg-slate-50 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Phone Number *</label>
                <span className="text-rose-500 text-[10px]">Required</span>
              </div>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="w-full bg-slate-50 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Email Address *</label>
                <span className="text-rose-500 text-[10px]">Required</span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full bg-slate-50 rounded-2xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Service Protocol Requested (shadcn/ui Select) */}
            <div>
              <label className="font-bold text-slate-700 text-xs mb-1.5 block">Service Protocol Requested *</label>
              <ShadcnSelect
                value={form.serviceType}
                onValueChange={(val) => setForm({ ...form, serviceType: val })}
                options={serviceOptions}
                placeholder="Select service protocol"
              />
            </div>

            {/* Property Classification (shadcn/ui Select) */}
            <div>
              <label className="font-bold text-slate-700 text-xs mb-1.5 block">Property Classification *</label>
              <ShadcnSelect
                value={form.propertyType}
                onValueChange={(val) => setForm({ ...form, propertyType: val })}
                options={propertyOptions}
                placeholder="Select property classification"
              />
            </div>

            {/* Target State / Territory */}
            <div>
              <label className="font-bold text-slate-700 text-xs mb-1.5 block">Target State / Territory *</label>
              <div className="grid grid-cols-5 gap-1.5">
                {['NY', 'NJ', 'CT', 'PA', 'DE'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedState(st)}
                    className={`h-10 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center justify-center ${
                      selectedState === st
                        ? 'bg-[#0c1f3d] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Environmental Concerns */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label className="font-bold text-slate-700">Primary Environmental Concerns</label>
                <span className="text-[10px] text-slate-400">Select all that apply</span>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'powerLines', label: 'High-Voltage Power Lines / Transformers', sub: 'Low Frequency 60Hz Magnetic Fields' },
                  { key: 'fiveG', label: '5G / Cellular Arrays & Small Cells', sub: 'High-Frequency RFR up to 60GHz' },
                  { key: 'implant', label: 'Medical Implant / Pacemaker EMI', sub: 'Electromagnetic Interference Safety' },
                  { key: 'strayVoltage', label: 'Stray Underground Ground Voltage', sub: 'Pools, plumbing, floor static surges' },
                  { key: 'realEstate', label: 'Real Estate Pre-Purchase Due Diligence', sub: 'Buyer/seller price protection studies' },
                  { key: 'symptoms', label: 'Neurological & Sensitivity Symptoms', sub: 'Sleep issues, ear ringing, tingling' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleConcern(item.key)}
                    className={`w-full p-2.5 rounded-2xl text-left text-xs flex items-start gap-2.5 border transition-all ${
                      concerns[item.key]
                        ? 'bg-blue-50/70 border-blue-400 text-blue-900 font-bold'
                        : 'bg-slate-50/50 border-slate-100 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {concerns[item.key] ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="block leading-tight">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal block mt-0.5">{item.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Message */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <label className="font-bold text-slate-700">Detailed Message & Symptom Description *</label>
                <span className="text-slate-400 text-[10px]">Confidential</span>
              </div>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe proximate antennas, high-voltage lines, electrical panels, smart meters, or physiological symptoms (e.g., sleep disruption, headaches, ear sensations)..."
                className="w-full bg-slate-50 rounded-2xl p-3 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-blue-600/20"
            >
              <span>Submit Consultation Request</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
              <span>ⓘ</span>
              <span>Our licensed engineering and clinical team typically responds within 2-4 hours.</span>
            </p>
          </form>
        ) : (
          <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              Inquiry Dispatched Successfully
            </h3>
            <p className="text-xs text-slate-600">
              Ticket #{ticketNum} generated for {form.fullName}. Our clinical team will reach you at {form.phone}.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all inline-flex items-center justify-center"
            >
              Submit Another Inquiry
            </button>
          </div>
        )}
      </div>

      {/* 5. FIELD-PROVEN STANDARDS (Exact Image 4) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 uppercase tracking-wide px-1">
          <span>FIELD-PROVEN STANDARDS</span>
        </div>

        <div className="flex items-center justify-between px-1">
          <h3 className="font-heading font-bold text-sm text-slate-900">
            Clinical & Substation Diagnostics
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="relative h-28 rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
            <img 
              src="/assets/power_substation.jpg" 
              alt="Substation EMF" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[9px] font-extrabold text-white leading-tight">
              Substation EMF 60Hz to 60GHz Telemetry
            </span>
          </div>

          <div className="relative h-28 rounded-2xl overflow-hidden bg-slate-900 shadow-xs">
            <img 
              src="/assets/NYC-Office-EMF-testing-for-helath-and-safety-2023.jpg" 
              alt="Residential sC-Ve" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-[9px] font-extrabold text-white leading-tight">
              Residential sC-Ve Neuro-Pathology Prevention
            </span>
          </div>
        </div>

        {/* Accreditation & Admissibility */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-slate-400">
              Accreditation & Admissibility
            </span>
            <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
              100% ADMISSIBLE
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            electraEMF reports are legal evidentiary instruments accepted in Supreme and Administrative Courts across NY, NJ, PA, CT, and DE. Free from unsubstantiated filter sales and sham meter scams.
          </p>
        </div>
      </div>

      {/* 6. ACCOUNT & CASE MANAGEMENT (Exact Image 4) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              Account & Case Management
            </h3>
          </div>
          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-50 text-blue-700 uppercase">
            Secure Vault
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {[
            { title: "My Consultation Requests & Reports", sub: "2 verified historical field audit PDFs" },
            { title: "Saved Services & Protocol Bookmarks", sub: "Substation safety & 5G baseline standards" },
            { title: "Notification & Alert Preferences", sub: "SMS dispatch alerts and PDF report delivery" },
            { title: "Court Expert Witness Retainer Info", sub: "Deposition, trial testimony & 28-page CV" },
            { title: "Privacy Policy & Evidentiary Non-Disclosure", sub: "HIPAA-compliant and attorney-client privileged" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="py-3 flex items-center justify-between gap-2 hover:bg-slate-50 px-1 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="min-w-0">
                <span className="font-bold text-slate-800 block truncate group-hover:text-blue-600 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                  {item.sub}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* 7. FOOTER (Exact Image 4) */}
      <div className="text-center text-[10px] text-slate-400 space-y-0.5 pt-1">
        <p>electraEMF Health & Safety © 2003 – 2024</p>
        <p>Licensed Technical, Medical & Legal Experts • NYC Metro, NJ, CT, PA, DE</p>
      </div>
    </div>
  );
}

