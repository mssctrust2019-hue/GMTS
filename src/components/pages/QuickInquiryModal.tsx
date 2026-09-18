import React, { useState } from 'react';
import { X, Send, Phone, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GMTS_COMPANY_INFO } from '../../data/mockData';

export const QuickInquiryModal: React.FC = () => {
  const { activeModal, setActiveModal, addToast } = useApp();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Audition Details');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (activeModal !== 'inquiry') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addToast('Your inquiry has been logged! Support team will reach out shortly.', 'success');
  };

  const handleClose = () => {
    setActiveModal(null);
    setIsSent(false);
    setName('');
    setMobile('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-white">Inquiry Received!</h3>
            <p className="text-xs text-slate-300">
              Our contestant counselor will call you at <strong className="text-pink-300">{mobile}</strong> within 2 hours.
            </p>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              Urgent query? Call Direct Helpline: <strong className="text-white">{GMTS_COMPANY_INFO.helpline}</strong>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl font-bold bg-pink-600 text-white text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Contestant Quick Inquiry</h3>
                <p className="text-xs text-pink-300">Auditions, MLM Binary Plan & Rules</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Inquiry Topic</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Audition Details">Audition Round 1 to 5 Details</option>
                  <option value="MLM Binary Plan">MLM Binary Compensation Plan & PV</option>
                  <option value="Voting Process">Voting & OTP System Questions</option>
                  <option value="Corporate / Sponsorship">Sponsorship & Brand Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Message or Questions</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our team help you?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
