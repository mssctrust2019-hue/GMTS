import React from 'react';
import {
  Trophy,
  Award,
  Crown,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Gift,
  Coins
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrizesSection: React.FC = () => {
  const { setActiveModal } = useApp();

  const rounds = [
    {
      round: 'Round 1: Auditions',
      fee: '₹600 Fee',
      target: '100 Referrals + 250 Votes',
      reward: 'Official Audition Completion Certificate & Digital Verified ID Card',
      status: 'Open For All Ages (5-85)',
      badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/30'
    },
    {
      round: 'Round 2: State Level',
      fee: '₹600 Fee',
      target: '100 Referrals + 250 Votes',
      reward: 'State-Level Distinction Certificate + Commemorative Silver Trophy',
      status: 'Online Video Review',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      round: 'Round 3: National Level',
      fee: '₹600 Fee',
      target: '100 Referrals + 250 Votes',
      reward: 'National Distinction Certificate + Media Feature & Interview',
      status: 'National Showcase',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      round: 'Round 4: Semi-Finals',
      fee: '₹2,000 Fee',
      target: 'Jury Evaluation + Voting',
      reward: 'Exclusive Designer Wardrobe + Professional Ramp Coaching by VIFTRI',
      status: 'State Stage Showcase',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      round: 'Round 5: Grand Final',
      fee: '₹5,000 Fee',
      target: 'Live Grand Runway',
      reward: '₹1,00,000 Cash Puraskar + Gold Trophy + International Crown + Modeling Contracts',
      status: 'Grand Live Mega Event',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      isGrand: true
    }
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Prize & Compensation Structure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            5-Round Journey & ₹1,00,000 Cash Puraskar
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every step in GMTS rewards your performance and community support with accredited credentials, designer exposure, and binary income.
          </p>
        </div>

        {/* Grand Highlight Hero Card */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-950 to-pink-950/70 border border-amber-500/40 p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <Crown className="w-4 h-4 text-amber-400" />
                Grand Finale Mega Award
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white font-serif">
                ₹1,00,000 Cash Prize Winner Puraskar
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                The ultimate title winner in each division receives ₹1,00,000 direct bank transfer, the prestigious GMTS Gold Trophy, royal crown/sash, and guaranteed fashion magazine placement via VIFTRI & PECC alliance.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-amber-400 font-bold text-xs block">₹1,00,000</span>
                  <span className="text-[11px] text-slate-400">Direct Cash Puraskar</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-pink-400 font-bold text-xs block">Gold Trophy & Crown</span>
                  <span className="text-[11px] text-slate-400">Custom Designer Emblem</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-emerald-400 font-bold text-xs block">VIFTRI Contract</span>
                  <span className="text-[11px] text-slate-400">Fashion Brand Ambassador</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Trophy className="w-8 h-8 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white font-serif">Grand Finale Runway</span>
              <span className="text-xs text-amber-400 font-semibold">Broadcast & Celebrity Jury</span>
              <button
                onClick={() => setActiveModal('register')}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 transition shadow-md"
              >
                Register & Qualify (₹600)
              </button>
            </div>
          </div>
        </div>

        {/* 5 Rounds Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {rounds.map((r, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 flex flex-col justify-between transition hover:-translate-y-1 ${
                r.isGrand
                  ? 'bg-gradient-to-b from-amber-950/50 to-slate-900 border-2 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950 border border-slate-800 hover:border-pink-500/40'
              }`}
            >
              <div className="space-y-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                  {r.fee}
                </span>
                <h4 className="text-sm font-bold text-white font-serif">{r.round}</h4>
                <div className="text-[11px] text-pink-300 font-semibold">{r.target}</div>
                <p className="text-[11px] text-slate-400 leading-normal">{r.reward}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[10px] text-slate-400 font-medium">
                {r.status}
              </div>
            </div>
          ))}
        </div>

        {/* MLM Binary Compensation Engine Card */}
        <div className="rounded-3xl bg-slate-950 border border-pink-500/30 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-emerald-400" />
                PECC Integrated MLM Binary Compensation
              </span>
              <h3 className="text-xl font-bold text-white font-serif">
                Earn Matching & Generation Bonuses with Every Direct Referral
              </h3>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold self-start md:self-auto">
              Conversion Rate: 1 PV = ₹0.90
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-pink-400">1. Business Matching (100%)</div>
              <div className="text-xl font-bold text-white">₹0.90 / PV Match</div>
              <p className="text-[11px] text-slate-400">
                1:1 Left & Right PV matching. Unmatched PV is never flushed; it carries forward indefinitely.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-pink-400">2. Generation Bonus (20-Level)</div>
              <div className="text-xl font-bold text-white">45% Level 1</div>
              <p className="text-[11px] text-slate-400">
                L1: 45%, L2-L6: 6%, L7-L20: 1.42%. Earn deep residual commissions across 20 tiers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-pink-400">3. Royalty Pool (3%)</div>
              <div className="text-xl font-bold text-white">Diamond Rank</div>
              <p className="text-[11px] text-slate-400">
                3% of company-wide total turnover shared equally among Diamond achievers (11 teams × 11,000 PV).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-pink-400">4. Retail Profit (PECC)</div>
              <div className="text-xl font-bold text-white">10% – 20% Margin</div>
              <p className="text-[11px] text-slate-400">
                Earn retail margins and personal PV on PECC herbal, personal care, and cosmetic wellness products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
