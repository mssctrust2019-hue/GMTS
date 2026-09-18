import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Activity,
  Mic,
  Film,
  Scissors,
  Heart,
  Palette,
  Gift,
  Music,
  Smile
} from 'lucide-react';
import { CATEGORY_GROUPS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const CategoriesShowcase: React.FC = () => {
  const { setSelectedCategory, setCurrentPage, setActiveModal } = useApp();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return Sparkles;
      case 'Activity':
        return Activity;
      case 'Mic':
        return Mic;
      case 'Film':
        return Film;
      case 'Scissors':
        return Scissors;
      case 'Heart':
        return Heart;
      case 'Palette':
        return Palette;
      case 'Gift':
        return Gift;
      case 'Music':
        return Music;
      case 'Smile':
      default:
        return Smile;
    }
  };

  const currentGroup = CATEGORY_GROUPS[activeGroupIndex];

  return (
    <section className="py-20 bg-slate-900/60 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              200+ Talent Divisions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight">
              Explore Our Diverse Talent Categories
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              From elite fashion runway catwalks and classical dance to contemporary vocal stylings and digital art — find your stage in the Global Multitalent Show.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('categories')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 transition flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All 200+ Subcategories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {CATEGORY_GROUPS.map((cg, idx) => {
            const Icon = getIcon(cg.icon_name);
            const isSelected = idx === activeGroupIndex;
            return (
              <button
                key={cg.id}
                onClick={() => setActiveGroupIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/25 scale-105'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cg.group_name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cg.subcategories.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Group Details Card */}
        <div className="rounded-3xl bg-slate-950 border border-pink-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-1">
                Selected Category Track
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                {currentGroup.group_name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory(currentGroup.group_name);
                  setCurrentPage('gallery');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/30 transition"
              >
                Watch Audition Videos
              </button>

              <button
                onClick={() => setActiveModal('register')}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/25 hover:from-pink-500 hover:to-rose-500 transition"
              >
                Enter This Track (₹600)
              </button>
            </div>
          </div>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentGroup.subcategories.map((sub, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-pink-500/40 transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-pink-500/10 text-pink-400 text-xs font-bold flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-600 group-hover:text-white transition">
                    {index + 1}
                  </span>
                  <span className="text-xs font-medium text-slate-200 group-hover:text-pink-300 transition">
                    {sub}
                  </span>
                </div>

                <button
                  onClick={() => setActiveModal('register')}
                  className="text-[11px] text-pink-400/80 hover:text-pink-300 font-semibold opacity-0 group-hover:opacity-100 transition"
                >
                  Join →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
