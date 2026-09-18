import React, { useState, useEffect } from 'react';
import { Users, Trophy, Award, Building2, Heart, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveCounters: React.FC = () => {
  const { users, videos } = useApp();

  const [totalJoinings, setTotalJoinings] = useState(14820 + users.length);
  const [totalVotes, setTotalVotes] = useState(148250 + videos.reduce((acc, v) => acc + v.votes_count, 0));
  const [liveActive, setLiveActive] = useState(1420);

  // Micro periodic tick to simulate live active traffic
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActive((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      if (Math.random() > 0.7) {
        setTotalVotes((prev) => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      id: 'joinings',
      label: 'Total Joinings',
      subtext: 'Global Participants',
      value: totalJoinings.toLocaleString(),
      icon: Users,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/20'
    },
    {
      id: 'winners',
      label: '₹1,00,000 Winners',
      subtext: 'Cash Puraskar Achievers',
      value: '48',
      icon: Trophy,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20'
    },
    {
      id: 'royalty',
      label: 'Royalty Achievers',
      subtext: '3% Turnover Pool Share',
      value: '12',
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20'
    },
    {
      id: 'franchise',
      label: 'Franchise Network',
      subtext: 'City Hubs & Centers',
      value: '36',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      id: 'votes',
      label: 'Total Votes Cast',
      subtext: 'Verified OTP Votes',
      value: totalVotes.toLocaleString(),
      icon: Heart,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20'
    },
    {
      id: 'active',
      label: 'Active Live Users',
      subtext: 'Browsing & Voting Now',
      value: liveActive.toLocaleString(),
      icon: Activity,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    }
  ];

  return (
    <section className="bg-slate-900/90 border-b border-pink-500/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`p-4 rounded-2xl ${stat.bg} border ${stat.border} transition transform hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-xl sm:text-2xl font-black ${stat.color} font-mono tracking-tight`}>
                    {stat.value}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    {stat.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
