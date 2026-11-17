import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft, ShieldCheck, Phone, Mail, User, Building,
  CheckSquare, Square, ChevronRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { ShadcnSelect } from './ui/Select';

export default function ConsultationScreen({
  onBack,
  onNavigate,
  onOpenCall,
  currentUser
}) {
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
    company: currentUser?.company || '',
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    serviceType: 'Residential EMF & Stray Voltage Testing',
    propertyType: 'Single Family Home',
    message: ''
  });

  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        fullName: prev.fullName || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
        company: prev.company || currentUser.company || ''
      }));
    }
  }, [currentUser]);

  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('62034-EMF');

  const toggleConcern = (key) => {
    setConcerns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email) {
      toast.error('Please fill out your Name, Phone Number, and Email.', { id: 'inquiry-toast' });
      return;
    }
    const newTicket = Math.floor(10000 + Math.random() * 90000) + '-EMF';
    setTicketNum(newTicket);
    setSubmitted(true);
    toast.success(`Inquiry dispatched! Ticket #${newTicket} generated.`, { id: 'inquiry-toast' });
  };

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-200">
      {/* Top Header Navigation Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-all cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
        </button>
        <div className="text-center">
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 block">
            SITE AUDIT DISPATCH
          </span>
          <h1 className="font-heading font-extrabold text-sm text-slate-900 leading-tight">
            Expert Consultation
          </h1>
        </div>
        <div className="w-8" /> {/* Balance spacer */}
      </div>

      {/* Emergency Environmental Triage Banner */}
      <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="font-extrabold text-blue-900">Emergency Environmental Triage:</strong> Same-day dispatch available for acute pacemaker EMI, substation proximity, and stray voltage.
        </p>
      </div>

      {/* MAIN CONSULTATION REQUEST CARD */}
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

            {/* Service Protocol Requested */}
            <div>
              <label className="font-bold text-slate-700 text-xs mb-1.5 block">Service Protocol Requested *</label>
              <ShadcnSelect
                value={form.serviceType}
                onValueChange={(val) => setForm({ ...form, serviceType: val })}
                options={serviceOptions}
                placeholder="Select service protocol"
              />
            </div>

            {/* Property Classification */}
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
                    className={`h-10 rounded-xl text-xs font-black transition-all active:scale-95 flex items-center justify-center cursor-pointer ${selectedState === st
                      ? 'bg-[#0b162c] text-white shadow-xs'
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
                    className={`w-full p-2.5 rounded-2xl text-left text-xs flex items-start gap-2.5 border transition-all cursor-pointer ${concerns[item.key]
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
              className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
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
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        )}
      </div>

      {/* Direct Clinical Channels (Single Unified Card) */}
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

      {/* Field-Proven Standards & Accreditation */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase text-slate-400">
            Accreditation & Admissibility
          </span>
          <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            100% ADMISSIBLE
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          electraEMF reports are legal evidentiary instruments accepted in Supreme and Administrative Courts across NY, NJ, PA, CT, and DE. Authored under strict IBEW engineering guidelines.
        </p>
      </div>
    </div>
  );
}
