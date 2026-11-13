import React, { useState } from 'react';
import { 
  ArrowLeft, Eye, EyeOff, CheckCircle2, AlertCircle 
} from 'lucide-react';

export default function AuthScreen({ initialMode = 'login', onNavigate, onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginForm.email || !loginForm.password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setSuccessMsg('Authentication successful! Loading your certified client reports...');
    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({ 
          email: loginForm.email,
          name: loginForm.email.split('@')[0]
        });
      }
      if (onNavigate) onNavigate('profile');
    }, 1000);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signupForm.firstName || !signupForm.email || !signupForm.password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setSuccessMsg('Account created successfully! Welcome to electraEMF.');
    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({ 
          name: `${signupForm.firstName} ${signupForm.lastName}`.trim(),
          email: signupForm.email
        });
      }
      if (onNavigate) onNavigate('profile');
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setSuccessMsg('Google Single Sign-On authenticated.');
    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({ 
          email: 'client@gmail.com', 
          name: 'Verified Client' 
        });
      }
      if (onNavigate) onNavigate('profile');
    }, 900);
  };

  return (
    <div className="min-h-full bg-white pb-16 animate-in fade-in duration-200">
      {/* 1. TOP CURVED DUAL-WAVE HEADER (Exact Match to Reference Screenshot) */}
      <div className="relative w-full overflow-hidden select-none bg-white">
        <svg 
          viewBox="0 0 375 110" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-28 sm:h-32 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wavePrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="waveSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Under-layer organic wave */}
          <path 
            d="M0,0 L375,0 L375,80 C300,115 220,65 140,95 C75,120 20,85 0,92 Z" 
            fill="url(#waveSecondary)" 
          />

          {/* Top foreground curved wave */}
          <path 
            d="M0,0 L375,0 L375,60 C290,95 210,50 130,78 C70,98 20,68 0,72 Z" 
            fill="url(#wavePrimary)" 
          />
        </svg>

        {/* Back Arrow Button (in top-left curve, exactly like screenshot) */}
        <button
          type="button"
          onClick={() => {
            if (onNavigate) onNavigate('home');
          }}
          className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white flex items-center justify-center transition-all active:scale-90"
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.8]" />
        </button>
      </div>

      {/* 2. BODY CONTAINER */}
      <div className="px-5 pt-1 space-y-4">
        {/* Status Messages */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ========================================================
            LOGIN MODE (Right side of provided screenshot)
           ======================================================== */}
        {mode === 'login' ? (
          <div className="space-y-4">
            {/* Title Section */}
            <div className="text-center space-y-0.5 pt-0">
              <h1 className="font-heading font-extrabold text-2xl text-blue-600 tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Login
              </p>
            </div>

            {/* Illustration Graphic (Matching reference screenshot illustration) */}
            <div className="flex justify-center py-1">
              <svg 
                viewBox="0 0 240 120" 
                className="w-48 h-26 mx-auto select-none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Floor shadow */}
                <ellipse cx="120" cy="114" rx="75" ry="5" fill="#f1f5f9" />
                
                {/* Decorative leaves behind */}
                <path d="M50 105 C46 88 40 80 32 78 C39 85 43 93 48 105" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 105 C52 85 60 76 68 74 C60 80 54 92 52 105" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
                
                {/* Central Smartphone / Portal Screen */}
                <rect x="88" y="14" width="64" height="96" rx="8" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.8" />
                {/* Notch */}
                <circle cx="120" cy="20" r="1.5" fill="#cbd5e1" />
                {/* User Avatar Circle */}
                <circle cx="120" cy="34" r="8" fill="#dbeafe" />
                <circle cx="120" cy="32" r="3.5" fill="#2563eb" />
                <path d="M114 40 C114 37 117 35 120 35 C123 35 126 37 126 40 Z" fill="#2563eb" />
                {/* Password dots / line */}
                <rect x="98" y="47" width="44" height="5" rx="2.5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                <circle cx="106" cy="49.5" r="1.2" fill="#64748b" />
                <circle cx="112" cy="49.5" r="1.2" fill="#64748b" />
                <circle cx="118" cy="49.5" r="1.2" fill="#64748b" />
                <circle cx="124" cy="49.5" r="1.2" fill="#64748b" />
                {/* Field 2 */}
                <rect x="98" y="56" width="44" height="5" rx="2.5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
                {/* Login button inside illustration */}
                <rect x="98" y="67" width="44" height="9" rx="2.5" fill="#2563eb" />
                <rect x="108" y="70.5" width="24" height="2" rx="1" fill="#ffffff" />
                {/* Safe badge */}
                <rect x="104" y="82" width="32" height="3.5" rx="1.5" fill="#e0f2fe" />

                {/* Left Figure (sitting woman) */}
                <circle cx="70" cy="48" r="5.5" fill="#1e293b" />
                <path d="M64 56 C64 53 76 53 76 56 L77 74 L63 74 Z" fill="#0284c7" />
                <path d="M73 59 L87 62" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M64 74 L64 98 L69 98 L71 78 L73 98 L78 98 L76 74 Z" fill="#0f172a" />
                <line x1="60" y1="80" x2="80" y2="80" stroke="#cbd5e1" strokeWidth="2.5" />
                <line x1="63" y1="80" x2="60" y2="108" stroke="#cbd5e1" strokeWidth="1.8" />
                <line x1="77" y1="80" x2="80" y2="108" stroke="#cbd5e1" strokeWidth="1.8" />

                {/* Right Figure (licensed engineer standing) */}
                <circle cx="170" cy="42" r="5.5" fill="#334155" />
                <path d="M163 50 C163 47 177 47 177 50 L179 78 L161 78 Z" fill="#2563eb" />
                <path d="M165 54 L149 51" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M176 54 L183 63 L178 66" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M162 78 L164 105 L169 105 L170 82 L172 105 L177 105 L178 78 Z" fill="#1d4ed8" />
                <ellipse cx="166" cy="106" rx="3.5" ry="1.5" fill="#0f172a" />
                <ellipse cx="175" cy="106" rx="3.5" ry="1.5" fill="#0f172a" />
              </svg>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="Email"
                  className="w-full h-11 bg-white rounded-xl px-3.5 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Password"
                  className="w-full h-11 bg-white rounded-xl pl-3.5 pr-10 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end pr-1">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 active:scale-98 transition-all flex items-center justify-center cursor-pointer"
              >
                Login
              </button>
            </form>

            {/* Terms and Privacy Disclaimer */}
            <p className="text-[10px] text-center text-slate-400 leading-snug px-3 pt-1">
              By continuing you are agreeing our{' '}
              <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and our{' '}
              <span className="text-blue-600 underline cursor-pointer">privacy policies</span>.
            </p>

            {/* Bottom Switch to Signup */}
            <div className="text-center pt-4 pb-2">
              <span className="text-xs text-slate-500 font-medium">
                Don't have an Account?{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setMode('signup');
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
              CREATE ACCOUNT / SIGNUP MODE (Left side of screenshot)
             ======================================================== */
          <div className="space-y-4">
            {/* Title Section */}
            <div className="text-center space-y-0.5 pt-0">
              <h1 className="font-heading font-extrabold text-2xl text-blue-600 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Enter your Personal Data
              </p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignupSubmit} className="space-y-2.5">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  required
                  value={signupForm.firstName}
                  onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                  placeholder="First Name"
                  className="w-full h-10.5 bg-white rounded-xl px-3.5 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  value={signupForm.lastName}
                  onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="w-full h-10.5 bg-white rounded-xl px-3.5 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  placeholder="Email"
                  className="w-full h-10.5 bg-white rounded-xl px-3.5 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
              </div>

              {/* Create Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  placeholder="Create Password"
                  className="w-full h-10.5 bg-white rounded-xl pl-3.5 pr-10 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                  placeholder="Confirm Password"
                  className="w-full h-10.5 bg-white rounded-xl pl-3.5 pr-10 text-xs text-slate-800 border border-blue-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium placeholder:text-slate-400 shadow-2xs transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 active:scale-98 transition-all flex items-center justify-center mt-2 cursor-pointer"
              >
                Signup
              </button>
            </form>

            {/* Terms and Privacy Disclaimer */}
            <p className="text-[10px] text-center text-slate-400 leading-snug px-3 pt-1">
              By continuing you are agreeing our{' '}
              <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and our{' '}
              <span className="text-blue-600 underline cursor-pointer">privacy policies</span>.
            </p>

            {/* Bottom Switch to Login */}
            <div className="text-center pt-3 pb-2">
              <span className="text-xs text-slate-500 font-medium">
                Already have an Account?{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setErrorMsg('');
                  setMode('login');
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl">
            <h3 className="font-heading font-extrabold text-sm text-slate-900">
              Reset Password
            </h3>
            <p className="text-xs text-slate-500">
              Enter your registered email address to receive password reset instructions.
            </p>
            {forgotSent ? (
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold text-center">
                Password reset link sent to your email!
              </div>
            ) : (
              <input
                type="email"
                placeholder="client@domain.com"
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500"
              />
            )}
            <div className="flex gap-2 pt-1">
              {!forgotSent ? (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="flex-1 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Send Reset Link
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotSent(false);
                }}
                className="flex-1 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
