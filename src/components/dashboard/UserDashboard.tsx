import React, { useState } from 'react';
import {
  User,
  Copy,
  Share2,
  Trophy,
  Award,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  FileText,
  CreditCard,
  QrCode,
  Users,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_BINARY_TREE, GMTS_COMPANY_INFO } from '../../data/mockData';
import { BinaryTreeNode } from '../../types';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    setCurrentPage,
    addToast,
    transactions,
    certificates,
    requestWithdrawal,
    submitKYC
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'tree' | 'wallet' | 'certificates' | 'kyc'>('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('500');
  const [withdrawMethod, setWithdrawMethod] = useState('upi');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('pooja@okaxis');

  // KYC modal
  const [showKycModal, setShowKycModal] = useState(false);
  const [aadharNo, setAadharNo] = useState('4582 9104 2289');
  const [panNo, setPanNo] = useState('ABCDP1234F');

  // Selected Certificate for modal view
  const [viewingCertificate, setViewingCertificate] = useState<any | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">Please log in to view your dashboard</h2>
        <button
          onClick={() => setCurrentPage('home')}
          className="px-6 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard!`, 'success');
  };

  const shareOnWhatsApp = (url: string, title: string) => {
    const text = encodeURIComponent(`${title}: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt < 100) {
      addToast('Minimum withdrawal amount is ₹100.', 'error');
      return;
    }
    const success = requestWithdrawal(amt, withdrawMethod.toUpperCase(), {
      account: withdrawMethod === 'bank' ? accountNumber : undefined,
      ifsc: withdrawMethod === 'bank' ? ifscCode : undefined,
      upi: withdrawMethod === 'upi' ? upiId : undefined
    });
    if (success) {
      setShowWithdrawModal(false);
    }
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKYC({ aadhar_number: aadharNo, pan_number: panNo });
    setShowKycModal(false);
  };

  // 3 Unique links (Official GMTS Domain)
  const officialDomain = 'https://globalmultitalentshowgmts.viftri.com';
  const votingLink = `${officialDomain}/vote/${currentUser.registration_number}`;
  const leftLink = `${officialDomain}/join/${currentUser.registration_number}/L`;
  const rightLink = `${officialDomain}/join/${currentUser.registration_number}/R`;

  // Filter user transactions
  const userTransactions = transactions.filter((t) => t.user_id === currentUser.id);
  const userCerts = certificates.filter((c) => c.user_id === currentUser.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 1. Header Identity Profile Card (YashBiz / PECC Style) */}
        <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* User Profile Avatar & Bio */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={currentUser.profile_image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser.full_name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-500 shadow-md shadow-pink-500/25"
                />
                <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950 shadow">
                  {currentUser.rank}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    {currentUser.full_name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Round {currentUser.current_round} Competitor
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span>ID: <strong className="text-pink-400 font-mono">{currentUser.registration_number}</strong></span>
                  <span>•</span>
                  <span>Joined: <strong className="text-slate-300">{currentUser.join_date}</strong></span>
                  <span>•</span>
                  <span>Mobile: <strong className="text-slate-300">{currentUser.mobile_number}</strong></span>
                  <span>•</span>
                  <span>Purchase Code: <strong className="text-emerald-400 font-mono">{currentUser.purchase_code}</strong></span>
                </div>

                <p className="text-[11px] text-pink-200/80">
                  Track: {currentUser.category} &rsaquo; {currentUser.subcategory} ({currentUser.age_group})
                </p>
              </div>
            </div>

            {/* Wallet & Quick Action */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">Available Balance</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{currentUser.wallet_balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Withdraw Funds
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/30 transition"
                >
                  My ID & Certs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Three Unique Links Bar (Voting, Left MLM, Right MLM) */}
        <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-pink-400" />
              Your 3 Official Sharing Links
            </h3>
            <span className="text-[10px] text-slate-400">Share on WhatsApp, Instagram & Facebook</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Link 1: Voting Link */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-pink-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-400 text-[11px] uppercase">
                  1. Public Voting Link
                </span>
                <span className="text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded">
                  {currentUser.votes_count} Votes
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Share with family & fans to receive verified OTP votes.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={votingLink}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                />
                <button
                  onClick={() => copyToClipboard(votingLink, 'Voting Link')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-400 shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => shareOnWhatsApp(votingLink, `Vote for ${currentUser.full_name} in Global Multitalent Show!`)}
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                  title="WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Link 2: Left Referral Link */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 text-[11px] uppercase">
                  2. Left Team MLM Joining Link
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                  Left Leg
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Direct joins placed automatically in your Left binary tree.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={leftLink}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                />
                <button
                  onClick={() => copyToClipboard(leftLink, 'Left MLM Link')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => shareOnWhatsApp(leftLink, `Join my Left Team on Global Multitalent Show & earn binary rewards!`)}
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                  title="WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Link 3: Right Referral Link */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-400 text-[11px] uppercase">
                  3. Right Team MLM Joining Link
                </span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
                  Right Leg
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Direct joins placed automatically in your Right binary tree.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={rightLink}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono truncate"
                />
                <button
                  onClick={() => copyToClipboard(rightLink, 'Right MLM Link')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-400 shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => shareOnWhatsApp(rightLink, `Join my Right Team on Global Multitalent Show & earn binary rewards!`)}
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0"
                  title="WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs within Dashboard */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'overview'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Overview & 5-Round Progress
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'tree'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Binary Genealogy Tree
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'wallet'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Wallet & Transactions ({userTransactions.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'certificates'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Official Certificates & ID ({userCerts.length})
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'kyc'
                ? 'bg-pink-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            KYC & Bank Verification
          </button>
        </div>

        {/* TAB CONTENT 1: OVERVIEW & 5-ROUND PROGRESS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key MLM Status Cards (YashBiz Layout) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Card 1: Own Reference Count */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Own References</span>
                <div className="text-2xl font-black text-pink-400 font-mono">
                  {currentUser.direct_referrals_count}
                </div>
                <p className="text-[10px] text-emerald-400">Round 1 Target Cleared (100+)</p>
              </div>

              {/* Card 2: Unit Status */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Unit Status</span>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {currentUser.rank}
                </div>
                <p className="text-[10px] text-slate-400">Daily Cap: 5,000 PV</p>
              </div>

              {/* Card 3: Left Team & Left PV */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-blue-500/20 space-y-1">
                <span className="text-[10px] text-blue-400 uppercase font-semibold">Left Team PV</span>
                <div className="text-2xl font-black text-blue-400 font-mono">
                  {currentUser.left_pv} PV
                </div>
                <p className="text-[10px] text-slate-400">Carry Forward: {currentUser.carry_left_pv} PV</p>
              </div>

              {/* Card 4: Right Team & Right PV */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/20 space-y-1">
                <span className="text-[10px] text-purple-400 uppercase font-semibold">Right Team PV</span>
                <div className="text-2xl font-black text-purple-400 font-mono">
                  {currentUser.right_pv} PV
                </div>
                <p className="text-[10px] text-slate-400">Carry Forward: {currentUser.carry_right_pv} PV</p>
              </div>

              {/* Card 5: Total Bonus */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Total Bonus</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{currentUser.total_earned.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400">1 PV = ₹0.90 Matching</p>
              </div>
            </div>

            {/* 5-Round Progress Tracker Card */}
            <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    5-Round Audition & Grand Final Journey
                  </h3>
                  <p className="text-xs text-slate-400">
                    Requirement: 100 Referrals + 250 Votes per round. Zero time limit carry-forward.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 self-start sm:self-auto">
                  Active Status: Qualified for Round 2
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
                {/* Round 1 */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-400">Round 1: Auditions</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Referrals:</span>
                      <span className="text-emerald-300 font-bold">148 / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Votes:</span>
                      <span className="text-emerald-300 font-bold">420 / 250</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">
                    ✓ COMPLETED & CERTIFIED
                  </div>
                </div>

                {/* Round 2 */}
                <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-pink-300">Round 2: State</span>
                    <span className="text-[9px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded font-bold">
                      IN PROGRESS
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Referrals:</span>
                      <span className="text-white font-bold">48 / 100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Votes:</span>
                      <span className="text-white font-bold">170 / 250</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mt-1">
                    <div className="bg-pink-500 h-full w-2/3" />
                  </div>
                  <div className="text-[10px] text-pink-300 font-semibold">Reward: State Trophy</div>
                </div>

                {/* Round 3 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">Round 3: National</span>
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <p>Target: 100 refs + 250 votes</p>
                    <p>Reward: National Certificate</p>
                  </div>
                  <div className="text-[10px] text-slate-500">Locked</div>
                </div>

                {/* Round 4 */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">Semi-Finals</span>
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <p>Stage Runway Showcase</p>
                    <p>Jury Evaluation</p>
                  </div>
                  <div className="text-[10px] text-slate-500">Fee: ₹2,000</div>
                </div>

                {/* Round 5 */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-400">Grand Final</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <span className="text-white font-bold block">₹1,00,000 Cash Puraskar</span>
                    <span className="text-[10px] text-amber-300 block">Gold Trophy & Crown</span>
                  </div>
                  <div className="text-[10px] text-amber-400 font-semibold">Ultimate Stage</div>
                </div>
              </div>
            </div>

            {/* Income Engine Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matching Incentive Engine */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Business Matching Incentive (BMI)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Left Total PV:</span>
                    <span className="text-white font-bold">{currentUser.left_pv} PV</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Right Total PV:</span>
                    <span className="text-white font-bold">{currentUser.right_pv} PV</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Matched Volume:</span>
                    <span className="text-emerald-400 font-bold">2,100 PV Matched (1:1)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Formula Rate:</span>
                    <span className="text-white font-bold">1 PV = ₹0.90</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Carry Forward to Left:</span>
                    <span className="text-amber-400 font-bold">750 PV (No Flush)</span>
                  </div>
                </div>
              </div>

              {/* 20-Level Generation Incentive */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-400" />
                  20-Level Generation Incentive
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Level 1 (Direct Team):</span>
                    <span className="text-pink-400 font-bold">45% of matching commission</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Levels 2 to 6:</span>
                    <span className="text-white font-bold">6% per active generation</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-slate-400">Levels 7 to 20:</span>
                    <span className="text-white font-bold">1.42% residual pool</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Royalty Diamond Pool (3%):</span>
                    <span className="text-amber-400 font-bold">3 of 11 Teams Activated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: BINARY GENEALOGY TREE */}
        {activeTab === 'tree' && (
          <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  Interactive Binary MLM Tree Visualizer
                </h3>
                <p className="text-xs text-slate-400">
                  Dual-team genealogy showing Left and Right placements, matched PV, and member ranks.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-blue-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Left: {DEMO_BINARY_TREE.left_count} Members ({DEMO_BINARY_TREE.left_pv} PV)
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  Right: {DEMO_BINARY_TREE.right_count} Members ({DEMO_BINARY_TREE.right_pv} PV)
                </span>
              </div>
            </div>

            {/* Visual Binary Tree Render */}
            <div className="overflow-x-auto py-6">
              <div className="min-w-[700px] flex flex-col items-center space-y-8">
                {/* Level 0: Root Node */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-900/60 to-purple-900/60 border-2 border-pink-500 text-center shadow-lg shadow-pink-500/20 w-64">
                  <span className="text-[10px] font-bold text-amber-300 uppercase block">{DEMO_BINARY_TREE.rank} Distributor</span>
                  <h4 className="text-sm font-bold text-white">{DEMO_BINARY_TREE.name}</h4>
                  <span className="text-xs text-pink-300 font-mono block">{DEMO_BINARY_TREE.registration_number}</span>
                  <div className="mt-2 pt-2 border-t border-pink-500/30 flex justify-between text-[11px] text-slate-200">
                    <span>L: {DEMO_BINARY_TREE.left_pv} PV</span>
                    <span>R: {DEMO_BINARY_TREE.right_pv} PV</span>
                  </div>
                </div>

                {/* Level 1: 2 Nodes */}
                <div className="w-full grid grid-cols-2 gap-8 relative">
                  {/* Left Child 1 */}
                  {DEMO_BINARY_TREE.left_child && (
                    <div className="flex flex-col items-center">
                      <div className="p-3.5 rounded-2xl bg-slate-950 border-2 border-blue-500 text-center shadow-md w-60">
                        <span className="text-[9px] font-bold text-blue-400 uppercase block">LEFT LEG • {DEMO_BINARY_TREE.left_child.rank}</span>
                        <h5 className="text-xs font-bold text-white">{DEMO_BINARY_TREE.left_child.name}</h5>
                        <span className="text-[11px] text-slate-400 font-mono block">{DEMO_BINARY_TREE.left_child.registration_number}</span>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-300">
                          <span>L: {DEMO_BINARY_TREE.left_child.left_pv} PV</span>
                          <span>R: {DEMO_BINARY_TREE.left_child.right_pv} PV</span>
                        </div>
                      </div>

                      {/* Level 2 Sub-children Left */}
                      <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                        {DEMO_BINARY_TREE.left_child.left_child && (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-[10px]">
                            <span className="text-blue-300 font-bold block">{DEMO_BINARY_TREE.left_child.left_child.name}</span>
                            <span className="text-slate-400 font-mono">{DEMO_BINARY_TREE.left_child.left_child.registration_number}</span>
                            <span className="text-emerald-400 block mt-1">{DEMO_BINARY_TREE.left_child.left_child.left_pv + DEMO_BINARY_TREE.left_child.left_child.right_pv} PV</span>
                          </div>
                        )}
                        {DEMO_BINARY_TREE.left_child.right_child && (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-[10px]">
                            <span className="text-blue-300 font-bold block">{DEMO_BINARY_TREE.left_child.right_child.name}</span>
                            <span className="text-slate-400 font-mono">{DEMO_BINARY_TREE.left_child.right_child.registration_number}</span>
                            <span className="text-emerald-400 block mt-1">{DEMO_BINARY_TREE.left_child.right_child.left_pv + DEMO_BINARY_TREE.left_child.right_child.right_pv} PV</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Right Child 1 */}
                  {DEMO_BINARY_TREE.right_child && (
                    <div className="flex flex-col items-center">
                      <div className="p-3.5 rounded-2xl bg-slate-950 border-2 border-purple-500 text-center shadow-md w-60">
                        <span className="text-[9px] font-bold text-purple-400 uppercase block">RIGHT LEG • {DEMO_BINARY_TREE.right_child.rank}</span>
                        <h5 className="text-xs font-bold text-white">{DEMO_BINARY_TREE.right_child.name}</h5>
                        <span className="text-[11px] text-slate-400 font-mono block">{DEMO_BINARY_TREE.right_child.registration_number}</span>
                        <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-300">
                          <span>L: {DEMO_BINARY_TREE.right_child.left_pv} PV</span>
                          <span>R: {DEMO_BINARY_TREE.right_child.right_pv} PV</span>
                        </div>
                      </div>

                      {/* Level 2 Sub-children Right */}
                      <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                        {DEMO_BINARY_TREE.right_child.left_child && (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-[10px]">
                            <span className="text-purple-300 font-bold block">{DEMO_BINARY_TREE.right_child.left_child.name}</span>
                            <span className="text-slate-400 font-mono">{DEMO_BINARY_TREE.right_child.left_child.registration_number}</span>
                            <span className="text-emerald-400 block mt-1">{DEMO_BINARY_TREE.right_child.left_child.left_pv + DEMO_BINARY_TREE.right_child.left_child.right_pv} PV</span>
                          </div>
                        )}
                        {DEMO_BINARY_TREE.right_child.right_child && (
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-[10px]">
                            <span className="text-purple-300 font-bold block">{DEMO_BINARY_TREE.right_child.right_child.name}</span>
                            <span className="text-slate-400 font-mono">{DEMO_BINARY_TREE.right_child.right_child.registration_number}</span>
                            <span className="text-emerald-400 block mt-1">{DEMO_BINARY_TREE.right_child.right_child.left_pv + DEMO_BINARY_TREE.right_child.right_child.right_pv} PV</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: WALLET & TRANSACTIONS */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Current Wallet Balance</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  ₹{currentUser.wallet_balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-500">Available for instant withdrawal</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-semibold">Lifetime Total Earnings</span>
                <div className="text-2xl font-black text-white font-mono">
                  ₹{currentUser.total_earned.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-emerald-400">Matching + Generation + Retail</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Payout Method</span>
                  <span className="text-sm font-bold text-white">Razorpay Bank / UPI</span>
                  <span className="text-[10px] text-slate-500 block">Min withdrawal: ₹100</span>
                </div>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                >
                  Request Payout
                </button>
              </div>
            </div>

            {/* Transactions Ledger Table */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Earning & Payout Ledger History</h4>
                <span className="text-xs text-slate-400">{userTransactions.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Type</th>
                      <th className="p-3.5">Description</th>
                      <th className="p-3.5">PV Volume</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {userTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-800/50 transition">
                        <td className="p-3.5 font-mono text-slate-400">{tx.date}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 uppercase">
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate">{tx.description}</td>
                        <td className="p-3.5 font-mono text-pink-300">{tx.pv ? `${tx.pv} PV` : '—'}</td>
                        <td className="p-3.5 font-mono font-bold text-emerald-400">
                          {tx.type === 'withdrawal' ? '-' : '+'}₹{tx.amount.toFixed(2)}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              tx.status === 'completed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : tx.status === 'pending'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: CERTIFICATES & ID CARDS */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Digital Verified ID Card */}
              <div className="rounded-3xl bg-gradient-to-br from-pink-950/80 via-slate-900 to-purple-950/80 border-2 border-pink-500/40 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-pink-500/30 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-white font-serif">GMTS OFFICIAL ID</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/30 text-pink-300 font-bold">
                      VERIFIED
                    </span>
                  </div>
                  <span className="text-xs font-mono text-pink-400">{currentUser.registration_number}</span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={currentUser.profile_image}
                    alt={currentUser.full_name}
                    className="w-20 h-24 rounded-xl object-cover border border-pink-500/50 shrink-0"
                  />
                  <div className="space-y-1 text-xs">
                    <h4 className="text-base font-bold text-white">{currentUser.full_name}</h4>
                    <p className="text-pink-300 font-semibold">{currentUser.subcategory}</p>
                    <p className="text-slate-400 text-[11px]">{currentUser.age_group} • {currentUser.city}, {currentUser.state}</p>
                    <p className="text-[10px] text-emerald-400 font-mono">Issued by: VIFTRI Academic Council</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Verification QR Token</span>
                    <span className="font-mono text-pink-300">VERIFY_{currentUser.registration_number}</span>
                  </div>
                  <QrCode className="w-8 h-8 text-white" />
                </div>

                <button
                  onClick={() => addToast('Digital ID Card downloaded (PDF representation).', 'success')}
                  className="w-full py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Official Digital ID Card
                </button>
              </div>

              {/* Certificates List */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Accredited Milestone Certificates ({userCerts.length})
                </h3>

                {userCerts.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/40 transition flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-pink-400 font-mono font-semibold">{c.unique_certificate_number}</span>
                      <h4 className="text-xs font-bold text-white">{c.certificate_type}</h4>
                      <p className="text-[11px] text-slate-400">Awarded on {c.issue_date} • Signed by Director VIFTRI</p>
                    </div>

                    <button
                      onClick={() => setViewingCertificate(c)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-pink-300 border border-pink-500/30 whitespace-nowrap transition"
                    >
                      View & Print
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 5: KYC & BANK VERIFICATION */}
        {activeTab === 'kyc' && (
          <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white font-serif">
                  KYC & Bank Verification Status
                </h3>
                <p className="text-xs text-slate-400">
                  Government compliant identification for direct Razorpay bank payouts.
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  currentUser.kyc_status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : currentUser.kyc_status === 'pending'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                KYC Status: {currentUser.kyc_status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 block text-[10px]">Aadhaar Identification</span>
                <span className="text-white font-bold block">{aadharNo}</span>
                <span className="text-emerald-400 text-[10px]">✓ Front & Back Verified</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 block text-[10px]">PAN Card Status</span>
                <span className="text-white font-bold block">{panNo}</span>
                <span className="text-emerald-400 text-[10px]">✓ {currentUser.pancard_status}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 block text-[10px]">Bank / Cheque Status</span>
                <span className="text-white font-bold block">{currentUser.cheque_status}</span>
                <span className="text-emerald-400 text-[10px]">✓ IFSC & Branch Approved</span>
              </div>
            </div>

            <button
              onClick={() => setShowKycModal(true)}
              className="px-5 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition"
            >
              Update Documents / Re-Submit
            </button>
          </div>
        )}
      </div>

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-white">Request Payout Withdrawal</h3>
            <p className="text-xs text-slate-400">Available Balance: ₹{currentUser.wallet_balance}</p>

            <form onSubmit={handleWithdrawSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Amount to Withdraw (Min ₹100) *</label>
                <input
                  type="number"
                  min={100}
                  max={currentUser.wallet_balance}
                  required
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Payout Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('upi')}
                    className={`py-2 rounded-xl border text-center font-bold ${
                      withdrawMethod === 'upi' ? 'bg-pink-600/30 border-pink-500 text-pink-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    UPI ID
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawMethod('bank')}
                    className={`py-2 rounded-xl border text-center font-bold ${
                      withdrawMethod === 'bank' ? 'bg-pink-600/30 border-pink-500 text-pink-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Bank Transfer
                  </button>
                </div>
              </div>

              {withdrawMethod === 'upi' ? (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">UPI ID (GPay / PhonePe) *</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="username@okaxis"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Bank Account Number *</label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account number"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">IFSC Code *</label>
                    <input
                      type="text"
                      required
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      placeholder="SBIN0001234"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase"
                    />
                  </div>
                </div>
              )}

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                Processed through Razorpay automated disbursement. Approved requests credited within 2–4 business hours.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KYC UPDATE MODAL */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <button onClick={() => setShowKycModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              ✕
            </button>
            <h3 className="text-base font-bold text-white">Update KYC Documents</h3>
            <form onSubmit={handleKycSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">12-Digit Aadhaar Number *</label>
                <input
                  type="text"
                  required
                  value={aadharNo}
                  onChange={(e) => setAadharNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">10-Digit PAN Number *</label>
                <input
                  type="text"
                  required
                  value={panNo}
                  onChange={(e) => setPanNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white transition"
              >
                Submit Documents for Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE FULL VIEW MODAL */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-500/80 space-y-6">
            <button
              onClick={() => setViewingCertificate(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-700 hover:bg-slate-200"
            >
              ✕
            </button>

            {/* Official Certificate Visual Layout */}
            <div className="border-4 border-double border-amber-600/60 p-8 rounded-2xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 text-center space-y-4">
              <div className="flex items-center justify-between border-b-2 border-amber-400 pb-2">
                <div className="text-left">
                  <span className="font-serif font-black text-xl text-rose-900 tracking-tight">GMTS</span>
                  <p className="text-[10px] text-slate-600 uppercase font-bold">Global Multitalent Show</p>
                </div>
                <div className="text-right text-[10px] font-mono text-slate-600">
                  Cert No: {viewingCertificate.unique_certificate_number}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  Official Award of Recognition
                </span>
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                  {viewingCertificate.certificate_type}
                </h2>
              </div>

              <p className="text-xs text-slate-600 italic">This is proudly presented to</p>
              <h3 className="text-3xl font-serif font-bold text-rose-900 tracking-wide underline decoration-amber-400">
                {viewingCertificate.participant_name}
              </h3>

              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                For outstanding demonstration of talent in <strong>{viewingCertificate.category}</strong> during the International Audition Phase under accredited academic guidelines.
              </p>

              <div className="pt-6 mt-4 border-t border-amber-300 flex items-center justify-between text-xs text-slate-700">
                <div className="text-left">
                  <span className="block font-bold text-slate-900">{viewingCertificate.issue_date}</span>
                  <span className="text-[10px] text-slate-500">Date of Concurrence</span>
                </div>
                <div className="text-center">
                  <QrCode className="w-10 h-10 text-slate-800 mx-auto" />
                  <span className="text-[9px] text-slate-500">Scan to Verify Authenticity</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-900">{viewingCertificate.signatory}</span>
                  <span className="text-[10px] text-slate-500">Director, VIFTRI & GMTS</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
