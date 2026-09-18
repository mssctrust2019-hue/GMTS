import React from 'react';
import { Sparkles, Phone, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GMTS_COMPANY_INFO } from '../../data/mockData';

export const CallToAction: React.FC = () => {
  const { setActiveModal } = useApp();

  return (
    <section id="contact-section" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/40 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-300" />
          Round 1 Auditions Now Open • Ages 5 to 85 Welcome
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif leading-tight">
          Ready to Step Onto the World Stage & Win ₹1,00,000?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Join thousands of talented performers, fashion models, and business distributors. Get your official ID card, accredited certificate, and start earning matching bonuses today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveModal('register')}
            className="px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-2xl shadow-pink-600/40 transition transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Trophy className="w-5 h-5 text-amber-300" />
            Register for Audition Round 1 (₹600)
          </button>

          <button
            onClick={() => setActiveModal('inquiry')}
            className="px-8 py-4 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/40 transition flex items-center gap-2"
          >
            <span>Have Questions? Quick Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Secure Payment (Razorpay / UPI / GPay)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-pink-400" />
            Helpline: {GMTS_COMPANY_INFO.helpline}
          </span>
          <span>•</span>
          <span>Ahmedabad Court Legal Jurisdiction</span>
        </div>
      </div>
    </section>
  );
};
