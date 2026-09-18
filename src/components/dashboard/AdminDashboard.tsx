import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  Video,
  ShieldCheck,
  Award,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    videos,
    transactions,
    approveKYC,
    moderateVideo,
    approveWithdrawal,
    upgradeRound,
    addToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'users' | 'kyc' | 'videos' | 'payouts' | 'broadcast'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  // Pending queues
  const pendingKycUsers = users.filter((u) => u.kyc_status === 'pending');
  const pendingVideos = videos.filter((v) => v.status === 'pending');
  const pendingWithdrawals = transactions.filter((t) => t.type === 'withdrawal' && t.status === 'pending');

  const totalRevenue = users.reduce((acc, u) => acc + (u.registration_fee_paid || 600), 0);

  const filteredUsers = users.filter((u) =>
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.mobile_number.includes(searchTerm)
  );

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    addToast(`Global Broadcast Published: "${broadcastMessage}"`, 'success');
    setBroadcastMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Master Admin Control
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
              GMTS Global Administration Panel
            </h1>
            <p className="text-xs text-slate-400">
              Complete 100% control: Manage contestants, MLM tree, KYC verification, video moderation, and Razorpay payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[10px]">Total Contestants</span>
              <strong className="text-white font-mono">{users.length} Registered</strong>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-500 block text-[10px]">Total Revenue</span>
              <strong className="text-emerald-400 font-mono">₹{totalRevenue.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 rounded-xl transition ${
              adminTab === 'overview' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Overview & Metrics
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2 rounded-xl transition ${
              adminTab === 'users' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Participant Directory ({users.length})
          </button>
          <button
            onClick={() => setAdminTab('kyc')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              adminTab === 'kyc' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <span>KYC Verification Queue</span>
            {pendingKycUsers.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                {pendingKycUsers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setAdminTab('videos')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              adminTab === 'videos' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <span>Video Moderation</span>
            {pendingVideos.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                {pendingVideos.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setAdminTab('payouts')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              adminTab === 'payouts' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <span>Payout Approvals</span>
            {pendingWithdrawals.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-bold">
                {pendingWithdrawals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setAdminTab('broadcast')}
            className={`px-4 py-2 rounded-xl transition ${
              adminTab === 'broadcast' ? 'bg-pink-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Live Announcements
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Audition Joinings</span>
                <div className="text-2xl font-black text-pink-400 font-mono">{users.length}</div>
                <p className="text-[10px] text-emerald-400">100% Verified via Mobile</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Pending KYC Approvals</span>
                <div className="text-2xl font-black text-amber-400 font-mono">{pendingKycUsers.length}</div>
                <p className="text-[10px] text-slate-400">Requires Document Inspection</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Pending Video Auditions</span>
                <div className="text-2xl font-black text-purple-400 font-mono">{pendingVideos.length}</div>
                <p className="text-[10px] text-slate-400">YouTube Moderation</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Pending Payouts</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {pendingWithdrawals.length} Requests
                </div>
                <p className="text-[10px] text-emerald-400">Razorpay Direct Transfer</p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-pink-500/30 space-y-4">
              <h3 className="text-sm font-bold text-white font-serif">Administrative Fast Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  onClick={() => setAdminTab('kyc')}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 transition text-left"
                >
                  <span className="font-bold text-pink-400 block mb-1">Process KYC Queue</span>
                  <p className="text-slate-400 text-[11px]">Approve Aadhaar & PAN submissions for bank transfers.</p>
                </button>

                <button
                  onClick={() => setAdminTab('payouts')}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition text-left"
                >
                  <span className="font-bold text-emerald-400 block mb-1">Disburse Razorpay Payouts</span>
                  <p className="text-slate-400 text-[11px]">Authorize wallet withdrawal requests for distributors.</p>
                </button>

                <button
                  onClick={() => setAdminTab('broadcast')}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition text-left"
                >
                  <span className="font-bold text-purple-400 block mb-1">Send Broadcast Alert</span>
                  <p className="text-slate-400 text-[11px]">Publish urgent notices to all participant dashboards.</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PARTICIPANT DIRECTORY */}
        {adminTab === 'users' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl space-y-4 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white">Registered Participants ({users.length})</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, ID or mobile..."
                  className="w-64 bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">GMTS ID</th>
                    <th className="p-3">Name & Category</th>
                    <th className="p-3">Mobile & City</th>
                    <th className="p-3">Round Level</th>
                    <th className="p-3">Rank</th>
                    <th className="p-3">Referrals</th>
                    <th className="p-3">Wallet</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-mono text-pink-300 font-bold">{u.registration_number}</td>
                      <td className="p-3">
                        <span className="font-bold text-white block">{u.full_name}</span>
                        <span className="text-[10px] text-slate-400">{u.subcategory}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-slate-300 block">{u.mobile_number}</span>
                        <span className="text-[10px] text-slate-500">{u.city}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300">
                          Round {u.current_round}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-amber-400">{u.rank}</td>
                      <td className="p-3 font-mono">{u.direct_referrals_count}</td>
                      <td className="p-3 font-mono text-emerald-400 font-bold">₹{u.wallet_balance}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5">
                          {u.current_round < 5 && (
                            <button
                              onClick={() => upgradeRound(u.id, u.current_round + 1)}
                              className="px-2 py-1 rounded bg-pink-600/30 hover:bg-pink-600 text-pink-200 text-[10px] font-bold"
                            >
                              Promote +1
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: KYC APPROVAL QUEUE */}
        {adminTab === 'kyc' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Pending KYC Verification Queue</h3>
            {pendingKycUsers.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-2xl">
                ✓ No pending KYC requests. All participants are up to date!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingKycUsers.map((u) => (
                  <div
                    key={u.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <span className="font-mono text-pink-300 font-bold">{u.registration_number}</span>
                      <h4 className="text-sm font-bold text-white">{u.full_name}</h4>
                      <p className="text-slate-400 text-[11px]">{u.email} • {u.mobile_number} • {u.city}, {u.state}</p>
                      <p className="text-emerald-400 text-[10px] mt-1">Aadhaar & PAN uploaded for inspection</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveKYC(u.id, true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve KYC
                      </button>

                      <button
                        onClick={() => approveKYC(u.id, false, 'Invalid document scan')}
                        className="px-3 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-200 font-bold text-xs flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: VIDEO MODERATION */}
        {adminTab === 'videos' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Contestant Audition Videos Queue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-pink-300 text-xs">{v.registration_number}</span>
                      <h4 className="text-xs font-bold text-white">{v.video_title}</h4>
                      <p className="text-[11px] text-slate-400">{v.user_name} • {v.category}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {v.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
                    <a
                      href={v.youtube_video_link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-300"
                    >
                      Watch on YouTube ↗
                    </a>
                    {v.status !== 'approved' && (
                      <button
                        onClick={() => moderateVideo(v.id, 'approved')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                      >
                        Approve
                      </button>
                    )}
                    {v.status === 'approved' && (
                      <button
                        onClick={() => moderateVideo(v.id, 'rejected')}
                        className="px-3 py-1.5 rounded-lg bg-rose-600/30 text-rose-200"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAYOUT DISBURSEMENTS */}
        {adminTab === 'payouts' && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white">Pending Wallet Payout Requests</h3>
            {pendingWithdrawals.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-2xl">
                ✓ No pending payout requests. All disbursements cleared.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingWithdrawals.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <span className="font-mono text-slate-400 text-[10px]">{tx.reference_id} • {tx.date}</span>
                      <div className="text-lg font-black text-emerald-400 font-mono">₹{tx.amount}</div>
                      <p className="text-slate-300 text-xs">{tx.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveWithdrawal(tx.id, true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shadow"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Disburse via Razorpay
                      </button>
                      <button
                        onClick={() => approveWithdrawal(tx.id, false)}
                        className="px-3 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: GLOBAL BROADCAST */}
        {adminTab === 'broadcast' && (
          <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Send Global Broadcast Announcement</h3>
            <p className="text-xs text-slate-400">
              This message will be dispatched in real time to all participant dashboards across all 200+ talent categories.
            </p>

            <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
              <textarea
                rows={4}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="e.g. Round 2 Audition schedule announced: Live runway evaluations start this Sunday in Ahmedabad..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-pink-500"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition flex items-center gap-2 shadow"
              >
                <Send className="w-4 h-4" />
                <span>Publish Broadcast to All Dashboards</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
