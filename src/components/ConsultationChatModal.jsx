import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import { electraData } from '../data/electraData';

export default function ConsultationChatModal({ isOpen, onClose, onOpenCall, onNavigateToContact }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am electraEMF's automated consultation assistant. Our licensed IBEW electronics engineers and medical scientists have conducted over 1,000 exposure studies since 2003. How can we help you today with your property or health questions?"
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const quickQuestions = [
    "Are high-voltage power lines near my home safe?",
    "Why shouldn't I rely on a Trifield meter?",
    "Are EV chargers safe for pacemakers / ICDs?",
    "Do you do pre-purchase home inspections?"
  ];

  const handleSend = (textToSend) => {
    const userText = textToSend || input;
    if (!userText.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: userText }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');

    // Generate intelligent response based on electraEMF content
    setTimeout(() => {
      let reply = "";
      const lower = userText.toLowerCase();

      if (lower.includes('power line') || lower.includes('substation') || lower.includes('voltage') || lower.includes('magnetic')) {
        reply = "High-voltage transmission lines and neighborhood substations emit 60 Hz magnetic fields that penetrate standard drywall, brick, and glass without attenuation. We measure spatial field falloff contours throughout your property. Our biological guideline recommends maintaining less than 1.0 mG in sleeping areas, whereas outdated FCC/IEEE thermal limits only trigger at 1,000+ mG. We can conduct a full on-site contour study.";
      } else if (lower.includes('meter') || lower.includes('trifield')) {
        reply = "Consumer hobbyist meters like the Trifield are not laboratory calibrated and lack frequency response linearity. They integrate total energy across wide spectrum bands, frequently confusing harmless electrostatic charges with true electromagnetic radiation. Many clients panic unnecessarily over faulty meter readings until our state-licensed engineer performs precision spectrum analysis.";
      } else if (lower.includes('pacemaker') || lower.includes('icd') || lower.includes('implant') || lower.includes('ev charger')) {
        reply = "Medical implants like Implantable Cardioverter Defibrillators (ICD) and pacemakers are susceptible to Electromagnetic Interference (EMI) from high-amperage Level 2/3 EV chargers, induction cooktops, and commercial motors. We provide formal clinical clearance and workplace safety zoning aligned with ANSI/AAMI/ISO 14117 and your electrophysiologist.";
      } else if (lower.includes('5g') || lower.includes('cell tower') || lower.includes('antenna') || lower.includes('wireless')) {
        reply = "5G utilizes both sub-6 GHz and millimeter-wave beamforming frequencies. Rooftop arrays and street-level small cells can project high power densities directly into apartment windows and balconies. We test actual peak pulse power density using calibrated isotropic antennas and can specify certified RF architectural window films.";
      } else if (lower.includes('closing') || lower.includes('buy') || lower.includes('house') || lower.includes('inspect') || lower.includes('real estate')) {
        reply = "We offer rapid-turnaround pre-closing inspections for home buyers, sellers, brokers, and real estate attorneys across NY, NJ, PA, CT & DE. We check nearby utility infrastructure, internal net-current wiring violations, and provide a legally certified clearance report acceptable to lenders.";
      } else {
        reply = "Thank you for describing your situation. Because every electromagnetic environment has unique wiring, distance, and geological ground current factors, we recommend a direct zero-fee telephone consultation with our licensed engineer.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center p-0 animate-in fade-in duration-200">
      <div className="bg-white w-full rounded-t-3xl shadow-2xl border border-slate-100 flex flex-col h-[85%] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-[#0c1c38] to-[#122e60] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/50 p-0.5 border border-white/20 overflow-hidden">
                <img 
                  src="/assets/IBEW-Engineer-for-EMF-Testing-in-NYC.jpg" 
                  alt="Dr. J. Dumanov" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0c1c38] rounded-full" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xs sm:text-sm">Licensed Expert Consultation</h3>
              <p className="text-[10px] text-cyan-300">State & Industry Licensed IBEW Engineering</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3 bg-slate-50">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 rounded-tl-xs shadow-xs border border-slate-100'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggested Queries */}
        <div className="p-2 border-t border-slate-100 bg-white overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[10px]">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="h-7.5 px-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap font-semibold active:scale-95 transition-all flex items-center justify-center shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type your question..."
            className="flex-1 h-10 bg-slate-50 rounded-xl px-3.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            onClick={() => handleSend()}
            className="h-10 w-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-md shadow-blue-600/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Live Call / Inquiry Banner */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-[11px] px-4">
          <span className="text-slate-600 font-medium">Prefer speaking directly?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenCall();
              }}
              className="font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Tap to Call</span>
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="font-bold text-blue-600 hover:underline"
            >
              Submit Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

