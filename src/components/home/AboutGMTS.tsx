import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  TrendingUp,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutGMTS: React.FC = () => {
  const { setActiveModal, setCurrentPage } = useApp();

  const keyPoints = [
    {
      title: 'Open for Ages 5 to 85',
      desc: 'Dedicated age group brackets: Kids (5-12), Teens (13-17), Young Adult (18-35), Adult (36-60), and Seniors (61-85) ensuring fair evaluation.'
    },
    {
      title: '200+ Talent Categories',
      desc: 'From Runway Catwalk, Haute Couture, Monologues, and Bollywood Dance to Speed Art, SFX Makeup, and Classical Vocals.'
    },
    {
      title: 'Zero Time Limit Carry-Forward',
      desc: 'Never lose your team volume or qualification points. All unmatched left and right PV carry forward indefinitely.'
    },
    {
      title: 'Dual Opportunity: Talent + Binary Income',
      desc: 'Showcase your talent on world stage while building direct referral networks with 1 PV = ₹0.90 matching bonus and 20-level generation rewards.'
    },
    {
      title: 'Official Academic & FMCG Alliance',
      desc: 'VIFTRI (Vedansh Institute of Fashion Technology) and PECC direct selling provide accredited certification, mentors, and product commissions.'
    },
    {
      title: 'Ahmedabad Gujarat Corporate Headquarters',
      desc: 'Fully registered corporate entity operating from Sharda Shopping Center, Rabari Colony, Ahmedabad with dedicated helpline.'
    }
  ];

  return (
    <section id="about-section" className="py-20 bg-slate-950 border-b border-pink-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border border-pink-500/30 p-2 bg-gradient-to-b from-pink-900/30 to-slate-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                alt="GMTS International Runway"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/90 border border-pink-500/30 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Global Multitalent Show
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                    Govt Reg. Alliance
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  Co-powered by VIFTRI Fashion Technology Institute & PECC Marketing Direct Selling.
                </p>
              </div>
            </div>

            {/* Quick Alliance Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <Building className="w-6 h-6 text-pink-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">VIFTRI Institute</div>
                  <div className="text-[10px] text-slate-400">Fashion & Research Hub</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">PECC Direct Selling</div>
                  <div className="text-[10px] text-slate-400">FMCG & Binary Engine</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                About Global Multitalent Show (GMTS)
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif leading-tight">
                Where Fashion Runway Elegance Meets Global Opportunity
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Global Multitalent Show (GMTS) is India’s first integrated fashion runway and multi-talent digital stage. Whether you are an aspiring catwalk model, Bollywood dancer, ghazal singer, or innovative textile designer, GMTS gives you a verified platform with transparent online voting, certified round-by-round advancement, and substantial financial rewards.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {keyPoints.map((pt, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">{pt.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">{pt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveModal('register')}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/30 transition"
              >
                Start Audition Round 1 (₹600)
              </button>

              <button
                onClick={() => setCurrentPage('categories')}
                className="px-5 py-3 rounded-xl font-semibold text-xs bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/30 transition"
              >
                Browse All 200+ Categories
              </button>

              <button
                onClick={() => setCurrentPage('verify')}
                className="px-5 py-3 rounded-xl font-semibold text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verify Official Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
