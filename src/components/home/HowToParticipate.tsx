import React from 'react';
import {
  UserPlus,
  Video,
  Trophy,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Share2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowToParticipate: React.FC = () => {
  const { setActiveModal } = useApp();

  const steps = [
    {
      stepNumber: '01',
      title: 'Online Registration & ID Card',
      fee: '₹600 Entry Fee (Round 1)',
      desc: 'Fill your full profile, select your talent category from 200+ options, and calculate your age bracket (5 to 85). Receive your official GMTS Digital ID Card and verified Registration Certificate immediately.',
      icon: UserPlus,
      highlight: 'Instant GMTS Registration ID',
      color: 'from-pink-500 to-rose-600'
    },
    {
      stepNumber: '02',
      title: 'Upload YouTube Audition & Share Links',
      fee: 'Free Submission',
      desc: 'Submit your YouTube video link demonstrating your rampwalk, dance routine, song, or monologue. Access your 3 unique sharing links (Voting, Left MLM Referral, Right MLM Referral) to gather fans.',
      icon: Video,
      highlight: 'Transparent OTP Voting System',
      color: 'from-fuchsia-500 to-purple-600'
    },
    {
      stepNumber: '03',
      title: 'Refer 100 Members + 250 Votes & Win',
      fee: 'Zero Time Limit',
      desc: 'Achieve 100 direct referrals + 250 votes in Round 1 to advance to Round 2, Round 3, Semi-Finals, and the Grand Live Runway Final to win the prestigious ₹1,00,000 cash puraskar + gold trophy!',
      icon: Trophy,
      highlight: 'Win ₹1 Lakh Cash + Crown',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <section id="how-to-participate" className="py-20 bg-slate-950 border-b border-pink-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Simple 3-Step Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            How to Participate in GMTS
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            A transparent, merit-driven path designed for talent of all ages. Compete globally from your smartphone or local studio.
          </p>
        </div>

        {/* 3 Steps Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col justify-between hover:border-pink-500/40 transition-all duration-300 group hover:-translate-y-1.5 shadow-xl"
              >
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-pink-400 group-hover:scale-110 transition" />
                      </div>
                    </div>
                    <span className="text-3xl font-black text-slate-800 group-hover:text-pink-500/20 transition font-mono">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Title & Fee Badge */}
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {step.fee}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Highlight Tag */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Track Card */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-pink-950/60 via-slate-900 to-purple-950/60 border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Zero Elimination Pressure • Carry-Forward Advantage
              </h4>
              <p className="text-xs text-slate-300">
                Your direct referrals and public votes carry over across rounds without arbitrary expiration dates.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal('register')}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/30 transition whitespace-nowrap"
          >
            Register Now for Round 1 (₹600)
          </button>
        </div>
      </div>
    </section>
  );
};
