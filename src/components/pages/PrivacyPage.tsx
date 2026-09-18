import React from 'react';
import { ShieldCheck, Lock, EyeOff, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GMTS_COMPANY_INFO } from '../../data/mockData';

export const PrivacyPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>

        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs text-slate-400">
            Compliant with Indian Information Technology Act 2000 and SPDI Rules 2011.
          </p>
        </div>

        <div className="space-y-6 text-xs text-slate-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              1. Information We Collect
            </h2>
            <p>
              When you register for GMTS or cast an audition vote, we collect personal identity attributes including your legal name, email address, mobile number, date of birth (for age-group categorization: Kids 5-12, Teens 13-17, Young Adult 18-35, Adult 36-60, Senior 61-85), postal address, Aadhaar/PAN details for KYC validation, and bank account information for distributor payout disbursements.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              2. How We Use and Protect Your Data
            </h2>
            <p>
              Your data is utilized strictly for participant administration, binary genealogy tree calculations, certificate generation, vote validation against automated bot activity, and statutory tax reporting. All sensitive financial records are encrypted using 256-bit SSL protocols.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              3. No Sale of Personal Information
            </h2>
            <p>
              GMTS, VIFTRI, and PECC do not sell, rent, lease, or monetize contestant contact details to third-party telemarketers. Information is shared only with certified payment gateway processors (Razorpay) and government tax authorities as required by Indian law.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            <p>Data Protection Officer: VIFTRI Academic Council, Ahmedabad</p>
            <p>Direct Inquiries: privacy@gmts.com • Helpline: {GMTS_COMPANY_INFO.helpline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
