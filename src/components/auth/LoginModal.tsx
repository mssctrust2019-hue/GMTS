import React, { useState, useEffect } from 'react';
import { X, LogIn, Lock, User, Sparkles, KeyRound, CheckCircle, Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    loginUser,
    setCurrentPage,
    loginNotice,
    setLoginNotice,
    prefillLoginIdentifier,
    resetPasswordViaEmail,
    resendCredentials
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [viewMode, setViewMode] = useState<'login' | 'forgot' | 'resend'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resendId, setResendId] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (prefillLoginIdentifier) {
      setIdentifier(prefillLoginIdentifier);
    }
  }, [prefillLoginIdentifier, activeModal]);

  if (activeModal !== 'login') return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);
    const ok = loginUser(identifier, password, rememberMe);
    if (ok) {
      setActiveModal(null);
      if (identifier.toLowerCase().includes('admin')) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('dashboard');
      }
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    const res = resetPasswordViaEmail(forgotEmail.trim());
    if (res.success) {
      setFeedbackMsg({
        type: 'success',
        text: res.message
      });
    } else {
      setFeedbackMsg({
        type: 'error',
        text: res.message
      });
    }
  };

  const handleResendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendId.trim()) return;
    const res = resendCredentials(resendId.trim());
    if (res.success) {
      setFeedbackMsg({
        type: 'success',
        text: res.message
      });
    } else {
      setFeedbackMsg({
        type: 'error',
        text: res.message
      });
    }
  };

  const handleDemoLogin = (type: 'member' | 'admin') => {
    if (type === 'member') {
      loginUser('GMTS260918001', 'password123', rememberMe);
      setActiveModal(null);
      setCurrentPage('dashboard');
    } else {
      loginUser('admin@gmts.com', 'admin123', rememberMe);
      setActiveModal(null);
      setCurrentPage('admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl p-6">
        <button
          onClick={() => {
            setActiveModal(null);
            setLoginNotice(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {viewMode === 'login' && 'Login to GMTS Portal'}
                {viewMode === 'forgot' && 'Reset Password Via Email'}
                {viewMode === 'resend' && 'Resend Login Credentials'}
              </h3>
              <p className="text-xs text-pink-300">Contestant Dashboard & MLM Backoffice</p>
            </div>
          </div>

          {/* Success Banner if redirected from successful payment */}
          {loginNotice && viewMode === 'login' && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-300">{loginNotice}</p>
                <p className="text-[11px] text-emerald-400/80 mt-0.5">
                  Enter your GMTS Registration Number and Password to access your contestant portal.
                </p>
              </div>
            </div>
          )}

          {feedbackMsg && (
            <div
              className={`p-3 rounded-2xl border text-xs ${
                feedbackMsg.type === 'success'
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/80 border-red-500/40 text-red-300'
              }`}
            >
              {feedbackMsg.text}
            </div>
          )}

          {viewMode === 'login' && (
            <>
              {/* 1-Click Quick Demo Login Shortcuts */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] text-slate-400 font-semibold block">Quick Demo Login:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('member')}
                    className="py-2 px-2.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-[11px] font-bold text-center transition"
                  >
                    Pooja (Member Demo)
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    className="py-2 px-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-[11px] font-bold text-center transition"
                  >
                    GMTS Director (Admin)
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-3 pt-1 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Username (Registration Number, Email, or Mobile) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. GMTS260918001 or email@domain.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-pink-500 text-xs"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Password (User-created during registration) *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-pink-500 text-xs"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-pink-600 focus:ring-0"
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('forgot');
                      setFeedbackMsg(null);
                    }}
                    className="text-pink-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white transition shadow-md shadow-pink-600/20"
                >
                  Sign In to Account
                </button>
              </form>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('resend');
                    setFeedbackMsg(null);
                  }}
                  className="text-slate-400 hover:text-pink-300 flex items-center gap-1 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Resend Credentials
                </button>
                <button
                  onClick={() => setActiveModal('register')}
                  className="text-pink-400 font-bold hover:underline"
                >
                  Register Round 1 (₹600)
                </button>
              </div>
            </>
          )}

          {viewMode === 'forgot' && (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 pt-2 text-xs">
              <p className="text-slate-300 text-xs">
                Enter your registered Email Address. We will verify your account and dispatch password reset instructions with a temporary access key.
              </p>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="e.g. pooja.varma@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-pink-500 text-xs"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('login');
                    setFeedbackMsg(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          )}

          {viewMode === 'resend' && (
            <form onSubmit={handleResendSubmit} className="space-y-3 pt-2 text-xs">
              <p className="text-slate-300 text-xs">
                Lost your Registration Number or password? Enter your registered Email or Mobile Number to resend credentials.
              </p>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Registration Number / Email / Mobile *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={resendId}
                    onChange={(e) => setResendId(e.target.value)}
                    placeholder="Enter Reg ID, Email, or 10-digit Mobile"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-pink-500 text-xs"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('login');
                    setFeedbackMsg(null);
                  }}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs"
                >
                  Resend Details
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
