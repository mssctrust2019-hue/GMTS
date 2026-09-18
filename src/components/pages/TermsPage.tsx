import React from 'react';
import { ShieldCheck, Scale, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GMTS_COMPANY_INFO } from '../../data/mockData';

export const TermsPage: React.FC = () => {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Legal & Regulatory Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Terms & Conditions & Official Rules
          </h1>
          <p className="text-xs text-slate-400">
            Official Perpetual Regulatory Edition • Global Multitalent Show (GMTS) & VIFTRI
          </p>
        </div>

        <div className="space-y-6 text-xs text-slate-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Clause 1: Legal Jurisdiction */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              1. Ahmedabad Court Legal Jurisdiction
            </h2>
            <p>
              The Global Multitalent Show ("GMTS"), operated by VIFTRI and PECC, is registered and headquartered in Ahmedabad, Gujarat, India. Any dispute, claim, litigation, arbitration, or controversy arising out of or relating to participant registrations, audition rounds, voting integrity, digital certificates, rewards, and the MLM binary compensation plan shall be subject to the exclusive jurisdiction of the competent courts in <strong>Ahmedabad, Gujarat, India</strong> alone.
            </p>
          </div>

          {/* Clause 2: Non-Refundable Policy */}
          <div className="space-y-2 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              2. Strict Non-Refundable Fee Policy
            </h2>
            <p>
              All registration and audition progression fees paid to GMTS—including but not limited to Round 1 Audition (₹600), Round 2 (₹1,000), Round 3 (₹1,500), Semi-Finals (₹2,000), and Grand Final (₹5,000)—are strictly non-refundable under all circumstances, whether personal, technical, medical, disqualification, or voluntary withdrawal. By completing payment via Razorpay, UPI, or card, the contestant unequivocally waives any chargeback or refund claim.
            </p>
          </div>

          {/* Clause 3: 5-Round Qualification Rules */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              3. Round Advancement Criteria
            </h2>
            <p>
              Qualification from Round 1 through to the Grand Final mandates satisfying both of the following threshold standards per round:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li><strong>100 Verified Referrals</strong> placed in the participant’s MLM dual-binary organization.</li>
              <li><strong>250 Verified Votes</strong> authenticated via the 1-vote-per-24h OTP system.</li>
              <li><strong>Zero Time Limit:</strong> Referrals and votes carry forward indefinitely until the target is accomplished without expiration.</li>
            </ul>
          </div>

          {/* Clause 4: MLM Binary Compensation Plan */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              4. MLM Binary Compensation & PV Calculation
            </h2>
            <p>
              The business compensation structure calculates matching incentives at the fixed rate of <strong>1 Point Value (PV) = ₹0.90</strong> on balanced 1:1 binary volume. Carry-forward volume does not flush as long as distributor activity is maintained. Generation bonus spans 20 levels (Level 1 at 45%, Levels 2–6 at 6%, Levels 7–20 at 1.42%). Royalty Diamond Pool allocates 3% of company turnover among eligible leaders with 11 qualified teams.
            </p>
          </div>

          {/* Clause 5: Grand Final Award */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-pink-400">
              5. Grand Final Puraskar & Awards
            </h2>
            <p>
              The ₹1,00,000 Cash Puraskar, National Trophy, and Gold Crown are conferred at the Grand Final stage following final jury evaluation and verified vote counts. Cash prizes are disbursed via direct bank transfer subject to applicable statutory tax deduction (TDS) under Indian Income Tax regulations.
            </p>
          </div>

          {/* Clause 6: Contact for Legal Notices */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            <p>Corporate Office: {GMTS_COMPANY_INFO.address}</p>
            <p>Email for Legal Notices: {GMTS_COMPANY_INFO.email} • Helpline: {GMTS_COMPANY_INFO.helpline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
