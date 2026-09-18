import React from 'react';
import { Sparkles, Trophy, Award, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SeoBlogPage: React.FC = () => {
  const { setCurrentPage, setActiveModal } = useApp();

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

        {/* Blog Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
              Official Industry Guide
            </span>
            <span className="text-xs text-slate-400">Official Editorial Guide • 8 Min Read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif leading-tight">
            How to Win the Global Multitalent Show (GMTS): The Ultimate Guide to Auditions, Modeling Runway & Winning ₹1,00,000
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover how India’s premier talent and fashion showcase—powered by VIFTRI and PECC—empowers models, dancers, actors, and creators from ages 5 to 85 with national recognition, accredited certifications, and a groundbreaking MLM binary compensation reward engine.
          </p>
        </div>

        {/* Featured Banner Image */}
        <div className="relative rounded-3xl overflow-hidden border border-pink-500/30 aspect-[21/9] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
            alt="Fashion Runway and Talent Show Stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-white">
            <span className="font-semibold">Ahmedabad Grand Audition Runway</span>
            <span className="text-pink-300 font-mono">1 PV = ₹0.90 Reward Engine</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <h2 className="text-xl font-bold text-white font-serif">
            1. What Makes the Global Multitalent Show (GMTS) Extraordinary?
          </h2>
          <p>
            Unlike traditional closed-door talent auditions that require expensive agents and city-to-city travel, the <strong>Global Multitalent Show (GMTS)</strong> is built on complete transparency, open digital auditions, and inclusive category grouping. Whether your talent lies in high-fashion catwalk, classical Bharatanatyam, Bollywood freestyle, solo acoustic vocals, dramatic monologue acting, or stand-up comedy, GMTS offers an accredited platform evaluated under <strong>VIFTRI academic council standards</strong>.
          </p>

          <h2 className="text-xl font-bold text-white font-serif">
            2. The 5-Round Milestone Progression Path
          </h2>
          <p>
            The competition structure is methodically divided into 5 distinct milestones designed to evaluate artistic caliber, crowd appeal, and community building:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-pink-400">Round 1: Digital Auditions (₹600)</span>
              <p className="text-xs text-slate-400">
                Upload your video from any city. Target: 100 referrals + 250 verified votes. Receive official Digital ID Card and verified Certificate.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-pink-400">Round 2: State Championship (₹1,000)</span>
              <p className="text-xs text-slate-400">
                Compete against regional champions. Target: 100 referrals + 250 votes. Win regional state trophies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-pink-400">Round 3: National Arena (₹1,500)</span>
              <p className="text-xs text-slate-400">
                National audience exposure. Target: 100 referrals + 250 votes. National council recognition.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400">Round 5: Grand Final Stage (₹5,000)</span>
              <p className="text-xs text-slate-400">
                The ultimate live stage showcase in Ahmedabad. Win <strong>₹1,00,000 Cash Puraskar</strong>, Gold Crown, and national media coverage!
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white font-serif">
            3. No Time Limits — Genuine Carry Forward
          </h2>
          <p>
            A common pain point in modern reality competitions is arbitrary cut-off deadlines. GMTS introduces a revolutionary <strong>Zero Time Limit Carry-Forward Rule</strong>: your referrals, votes, and matching PV accumulate indefinitely until you cross each round milestone. You never lose your hard-earned standing!
          </p>

          <h2 className="text-xl font-bold text-white font-serif">
            4. The Power of the Binary MLM Compensation Architecture
          </h2>
          <p>
            Beyond performance recognition, GMTS integrates a high-yield MLM binary compensation plan in partnership with <strong>PECC and YashBiz</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-300">
            <li><strong>Dual-Team Placement:</strong> Choose Left or Right binary leg for every sponsored entrant.</li>
            <li><strong>1 PV = ₹0.90:</strong> Daily matching bonus paid on balanced volume directly to your wallet.</li>
            <li><strong>20-Level Generation Income:</strong> Earn 45% on Level 1 direct team performance, 6% on Levels 2–6, and 1.42% across Levels 7–20.</li>
            <li><strong>Royalty Diamond Pool:</strong> 3% of global company turnover shared with high-ranking distributors.</li>
          </ul>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-950/60 to-slate-950 border border-pink-500/40 text-center space-y-4 my-6">
            <h3 className="text-lg font-bold text-white font-serif">
              Begin Your Journey on India’s Biggest Talent Stage
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Registration for Round 1 Auditions is currently open for ages 5 to 85. Secure your official ID and start accumulating votes and binary rewards today.
            </p>
            <button
              onClick={() => setActiveModal('register')}
              className="px-6 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-xl shadow-pink-600/30 transition inline-flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Register for Round 1 (₹600 via Razorpay)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
