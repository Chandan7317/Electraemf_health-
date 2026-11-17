import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  ShieldCheck, Phone, Mail, User, Building, MapPin,
  ChevronRight, FileText, Bookmark,
  Bell, Scale, Lock, Share2, AlertCircle, CheckCircle2,
  Send, Sparkles, Camera, Trash2, Edit3, LogOut, Check, X, ArrowLeft
} from 'lucide-react';

export default function ProfileScreen({
  onOpenCall,
  onNavigate,
  currentUser,
  onLogout,
  userPhoto = null,
  onUpdatePhoto,
  onUpdateUser
}) {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const ticketNum = '62034-EMF';

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    if (currentUser) {
      setEditForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        company: currentUser.company || ''
      });
    }
  }, [currentUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Please select an image smaller than 5MB.', { id: 'photo-toast' });
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

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone.trim(),
        company: editForm.company.trim()
      });
    }
    setSaveSuccess(true);
    toast.success('Profile changes saved successfully!', { id: 'profile-toast' });
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* 0. AUTHENTICATION & PROFILE MANAGEMENT CARDS */}
      {currentUser ? (
        <>
          {/* LOGGED IN: VERIFIED CLIENT ACCOUNT CARD */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 text-white rounded-3xl p-4.5 border border-blue-900/50 shadow-md space-y-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Circular Avatar with Camera Indicator */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/50 bg-white/10 flex items-center justify-center shadow-sm">
                    {userPhoto ? (
                      <img
                        src={userPhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-cyan-300 stroke-[2]" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="absolute -bottom-0.5 -right-0.5 w-5.5 h-5.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md border border-slate-900 active:scale-90 transition-all cursor-pointer"
                    title="Edit profile & photo"
                    aria-label="Edit profile & photo"
                  >
                    <Camera className="w-2.5 h-2.5" />
                  </button>
                </div>

                <div className="min-w-0">
                  <span className="text-[9px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-300 inline" />
                    CLIENT ACCOUNT VERIFIED
                  </span>
                  <h2 className="text-sm font-extrabold text-white truncate mt-0.5">
                    {currentUser.name || 'Verified Client'}
                  </h2>
                  <p className="text-[11px] text-blue-200 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={onLogout}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/15 transition-all active:scale-95 flex items-center gap-1 shrink-0"
              >
                <LogOut className="w-3 h-3" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Quick Action to Open Edit Profile */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex-1 h-9 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer border border-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-300" />
                <span>{isEditing ? 'Close Profile Editor' : 'Edit Profile & Photo'}</span>
              </button>
            </div>
          </div>

          {/* EDIT PROFILE DRAWER / CARD (Visible when Edit Profile is clicked) */}
          {isEditing && (
            <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center active:scale-90 transition-all shrink-0 cursor-pointer"
                    aria-label="Back"
                    title="Back"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.4]" />
                  </button>
                  <div>
                    <span className="text-[9.5px] font-black uppercase text-blue-600 tracking-wider block">
                      ACCOUNT SETTINGS
                    </span>
                    <h3 className="font-heading font-extrabold text-sm text-slate-900">
                      Edit Profile & Photo
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 1. Profile Photo Upload Section */}
              <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 block">
                  Profile Photo
                </span>

                <div className="flex items-center gap-4">
                  {/* Photo Preview with Camera Overlay */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30 bg-white flex items-center justify-center shadow-xs">
                      {userPhoto ? (
                        <img
                          src={userPhoto}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-blue-600 stroke-[2]" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md active:scale-90 transition-all border-2 border-white cursor-pointer"
                      title="Upload photo"
                    >
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Photo Buttons */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="h-9 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{userPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                      </button>

                      {userPhoto && (
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="h-9 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 active:scale-98 transition-all cursor-pointer border border-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      JPG, PNG or WEBP up to 5MB. Photo updates across headers and reports.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Profile Info Form */}
              <form onSubmit={handleProfileSave} className="space-y-3">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-slate-50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full bg-slate-50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="w-full bg-slate-50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Company / Role */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Company / Organization</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={editForm.company}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      placeholder="e.g. Realty, School District, HOA"
                      className="w-full bg-slate-50 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                {saveSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Profile updated successfully!</span>
                  </div>
                )}

                {/* Save and Cancel buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center active:scale-98 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      ) : (
        /* NOT LOGGED IN: SECURE CLIENT AUTHENTICATION / ACCESS PORTAL */
        <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-white rounded-3xl p-5 border border-blue-200/80 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9.5px] font-black uppercase text-blue-600 tracking-wider block">
                  ELECTRAEMF CLIENT PORTAL
                </span>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Sign In / Create Account
                </h2>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-700 text-[10px] font-extrabold border border-blue-200/60">
              Encrypted
            </span>
          </div>

          <p className="text-[11.5px] text-slate-600 leading-relaxed">
            Access certified lab reports, manage your client profile, and view your assigned IBEW engineering triage.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('login')}
              className="h-10.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center shadow-sm shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('signup')}
              className="h-10.5 rounded-xl bg-white hover:bg-blue-50 border border-blue-300 text-blue-700 font-extrabold text-xs flex items-center justify-center shadow-2xs active:scale-98 transition-all cursor-pointer"
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

      {/* 2. DIRECT CLINICAL CHANNELS (Single Unified Card) */}
      <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3.5">
        <div className="border-b border-slate-100 pb-2.5">
          <h3 className="font-heading font-extrabold text-xs text-slate-900 uppercase tracking-wide">
            Direct Clinical Channels
          </h3>
        </div>

        {/* Channel 1: Direct Phone Line */}
        <a
          href="tel:3474919867"
          className="p-3 rounded-2xl bg-blue-50/50 hover:bg-blue-50/90 border border-blue-100/80 flex items-center justify-between gap-3 transition-all active:scale-[0.99] group cursor-pointer"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">
                Direct Line
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[10px] font-bold text-slate-500 truncate">
                Dr. J. Dumanov
              </span>
            </div>
            <p className="text-sm font-black text-slate-900 leading-tight mt-0.5">
              (347) 491-9867
            </p>
            <span className="text-[10px] text-slate-400 block leading-tight mt-0.5 truncate">
              Chief Scientist & Electronics Engineer
            </span>
          </div>
          <span className="w-8 h-8 rounded-full bg-[#1d61f2] text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors shrink-0">
            <Phone className="w-3.5 h-3.5 fill-current" />
          </span>
        </a>

        {/* Channel 2: Medical Mailbox */}
        <a
          href="mailto:EMFmedicalExpert@gmail.com"
          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/70 flex items-center justify-between gap-3 transition-all active:scale-[0.99] group cursor-pointer"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                Medical Mailbox
              </span>
            </div>
            <p className="text-xs font-black text-slate-900 leading-tight mt-0.5 select-all">
              EMFmedicalExpert@gmail.com
            </p>
            <span className="text-[10px] text-slate-400 block leading-tight mt-0.5 truncate">
              Attach photos, survey records & medical documentation
            </span>
          </div>
          <span className="w-8 h-8 rounded-full bg-[#0b162c] text-white flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Confidential footer note */}
        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Strictly confidential under evidentiary doctor-client non-disclosure.</span>
        </p>
      </div>

      {/* 4. SITE AUDIT DISPATCH CTA (Opens dedicated Consultation Page) */}
      <div className="p-4.5 rounded-3xl bg-gradient-to-br from-[#0c1f3d] via-[#102447] to-[#15305b] text-white flex items-center justify-between shadow-sm border border-blue-900/40">
        <div className="space-y-1 pr-3">
          <span className="text-[9px] font-extrabold uppercase tracking-wide text-blue-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            SITE AUDIT DISPATCH
          </span>
          <h2 className="font-heading font-extrabold text-sm text-white leading-tight">
            Request Free Expert Consultation
          </h2>
          <p className="text-[11px] text-slate-300 leading-snug">
            Book certified IBEW electronics engineers & clinical hygienists under evidentiary non-disclosure.
          </p>
        </div>
        <button
          onClick={() => onNavigate('consultation')}
          className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shrink-0 flex items-center gap-1.5 active:scale-95 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
        >
          <span>Book</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
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

