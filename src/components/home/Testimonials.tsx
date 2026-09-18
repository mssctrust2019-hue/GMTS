import React from 'react';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900/60 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Voices of Success
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
            What Our Contestants & Distributors Say
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real experiences from fashion models, dancers, vocalists, and leaders who advanced through the 5 rounds and earned matching binary rewards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-slate-950 border border-slate-800 p-6 flex flex-col justify-between hover:border-pink-500/40 transition-all duration-300 shadow-xl group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-6 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-pink-500/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-pink-400 font-semibold">{t.role}</p>
                  <p className="text-[10px] text-slate-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
