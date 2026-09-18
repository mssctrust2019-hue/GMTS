import React, { useState } from 'react';
import { Search, Sparkles, Trophy, ArrowRight, Check } from 'lucide-react';
import { CATEGORY_GROUPS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

export const CategoriesPage: React.FC = () => {
  const { setActiveModal, setSelectedCategory, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState<string>('All');

  const totalSubcats = CATEGORY_GROUPS.reduce((acc, g) => acc + g.subcategories.length, 0);

  const filteredGroups = CATEGORY_GROUPS.map((group) => {
    const matchingSubs = group.subcategories.filter((sub) =>
      sub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
      ...group,
      subcategories: matchingSubs
    };
  }).filter((group) => {
    if (activeGroup !== 'All' && group.group_name !== activeGroup) return false;
    return group.subcategories.length > 0;
  });

  const handleSelectAndRegister = (groupName: string, sub: string) => {
    setSelectedCategory(groupName);
    setActiveModal('register');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            200+ Performance & Creative Categories
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Official Talent & Skill Categories Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Open to all individuals aged 5 to 85. Showcase your talent across 10 grand categories. Every category qualifies for the ₹1,00,000 Grand Final cash puraskar and accredited certification!
          </p>
        </div>

        {/* Filter Bar */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search across all 200+ categories..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveGroup('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeGroup === 'All' ? 'bg-pink-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              All ({totalSubcats})
            </button>
            {CATEGORY_GROUPS.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.group_name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  activeGroup === g.group_name
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {g.group_name}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Render */}
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4 hover:border-pink-500/30 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 font-bold">
                    {group.id}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                      {group.group_name}
                    </h2>
                    <p className="text-xs text-slate-400">Open to all age brackets (5–85) • Verified Auditions</p>
                  </div>
                </div>

                <span className="text-xs text-pink-400 font-mono self-start sm:self-auto">
                  {group.subcategories.length} Specialized Sub-Categories
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {group.subcategories.map((sub, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectAndRegister(group.group_name, sub)}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-pink-500/50 hover:bg-pink-950/20 transition cursor-pointer flex flex-col justify-between group text-xs"
                  >
                    <span className="text-slate-300 font-medium group-hover:text-white transition">
                      {sub}
                    </span>
                    <span className="text-[10px] text-pink-400 font-bold mt-2 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      Enter Round 1 →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
