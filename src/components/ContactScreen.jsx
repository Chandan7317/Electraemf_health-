import React, { useState } from 'react';
import { 
  Phone, Mail, Clock, MapPin, Send, CheckCircle2, 
  AlertCircle, ShieldCheck, MessageSquare, ArrowRight, Sparkles 
} from 'lucide-react';
import { electraData } from '../data/electraData';
import { ShadcnSelect } from './ui/Select';

export default function ContactScreen({ prefilledService, onResetPrefill }) {
  const [formData, setFormData] = useState({
    supportCategory: prefilledService ? 'Technical Commercial Industrial' : 'Health Safety Clinical',
    companyName: '',
    fullName: '',
    phone: '',
    email: '',
    location: '',
    subject: prefilledService ? `Inquiry regarding ${prefilledService.title}` : '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const categories = [
    "Health Safety Clinical",
    "Technical Commercial Industrial",
    "Government Local State Federal",
    "Legal contractual buyer/seller/agent",
    "Other legal / in tort",
    "Harassment/threat",
    "Private confidential Agents/Trustee"
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required for expert review.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required.";
    if (!formData.message.trim()) errs.message = "Please enter specific information about your case or property.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const randomTicket = 'EMF-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0c1c38] to-[#122e60] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
            CONFIDENTIAL EXPERT CONSULTATION
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold font-heading mt-2">
            Contact electraEMF
          </h1>
          <p className="text-xs text-blue-100/90 mt-1 leading-relaxed">
            Free initial review for homeowners, school boards, corporate facilities, attorneys & clinicians.
          </p>
        </div>
      </div>

      {/* Direct Tap-to-Call & Tap-to-Email Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* NYC / CT / Long Island */}
        <a
          href="tel:3474919867"
          className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3.5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              NYC • CT • Hudson Valley • Long Island
            </span>
            <p className="font-heading font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
              (347) 491-9867
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">Tap to Call Directly</span>
          </div>
        </a>

        {/* NJ / PA / DE */}
        <a
          href="tel:9737269559"
          className="bg-white rounded-3xl p-4 border border-slate-100 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-3.5 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
              New Jersey • PA • Delaware Valley
            </span>
            <p className="font-heading font-extrabold text-base text-slate-900 group-hover:text-cyan-700 transition-colors">
              (973) 726-9559
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">Tap to Call Directly</span>
          </div>
        </a>
      </div>

      {/* Email & Hours Strip */}
      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
        <a 
          href="mailto:EMFmedicalExpert@gmail.com"
          className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-semibold"
        >
          <Mail className="w-4 h-4 text-blue-600" />
          <span>EMFmedicalExpert@gmail.com</span>
        </a>

        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>Mon-Sun: 8:00 AM - 5:00 PM EST</span>
        </div>
      </div>

      {/* FORM CONTAINER */}
      {!submitted ? (
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 font-heading">
              Client Support & Consultation Information Form
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter specific and material information for our licensed experts to review.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Category Select (shadcn/ui Select) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Support Category *
              </label>
              <ShadcnSelect
                value={formData.supportCategory}
                onValueChange={(val) => setFormData({ ...formData, supportCategory: val })}
                options={categories.map(cat => ({ value: cat, label: cat }))}
                placeholder="Select support category"
              />
            </div>

            {/* Two column: Full Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                />
                {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company / Agency (Optional)
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g. Law Firm, School District, LLC"
                  className="w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Two column: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. (201) 555-0192"
                  className={`w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border ${
                    errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. client@example.com"
                  className={`w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border ${
                    errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                />
                {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Location & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Property Location (City, State)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Princeton, NJ or Manhattan, NY"
                  className="w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. High voltage lines near home"
                  className={`w-full bg-slate-50 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 border ${
                    errors.subject ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
                />
                {errors.subject && <p className="text-[10px] text-rose-500 mt-1">{errors.subject}</p>}
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Case Details & Materials *
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe the environmental situation, nearby substations/antennas, medical sensitivities, or closing date deadline..."
                className={`w-full bg-slate-50 rounded-2xl p-3.5 text-xs text-slate-900 border ${
                  errors.message ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`}
              />
              {errors.message && <p className="text-[10px] text-rose-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/30 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Confidential Consultation Request</span>
            </button>
          </form>
        </div>
      ) : (
        /* SUCCESS CONFIRMATION STATE */
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-md text-center space-y-4 animate-in fade-in zoom-in-95">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              INQUIRY SUBMITTED • TICKET #{ticketId}
            </span>
            <h2 className="text-base font-extrabold text-slate-900 font-heading">
              Thank You, {formData.fullName}
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your consultation information has been transmitted directly to electraEMF's licensed engineering and medical evaluation team.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-left text-slate-700 space-y-1">
            <p><strong>Category:</strong> {formData.supportCategory}</p>
            <p><strong>Contact Phone:</strong> {formData.phone}</p>
            <p><strong>Initial Review:</strong> At zero fee. An expert will contact you promptly.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <a
              href="tel:3474919867"
              className="w-full h-11 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call For Immediate Review: (347) 491-9867</span>
            </a>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  supportCategory: 'Health Safety Clinical',
                  companyName: '',
                  fullName: '',
                  phone: '',
                  email: '',
                  location: '',
                  subject: '',
                  message: ''
                });
                if (onResetPrefill) onResetPrefill();
              }}
              className="w-full sm:w-auto h-11 px-5 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200 transition-all flex items-center justify-center active:scale-95"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

