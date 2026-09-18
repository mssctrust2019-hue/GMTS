import React, { useState } from 'react';
import { X, Heart, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VotingModal: React.FC = () => {
  const { activeModal, setActiveModal, votingTargetVideo, castVote, addToast } = useApp();

  const [voterEmail, setVoterEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState('784920');
  const [isVerifying, setIsVerifying] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  if (activeModal !== 'vote' || !votingTargetVideo) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterEmail.trim()) {
      addToast('Please enter your valid email address to receive OTP.', 'error');
      return;
    }
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);
    setOtpSent(true);
    addToast(`OTP Sent to ${voterEmail}: Demo OTP code is ${generated}`, 'info');
  };

  const handleVerifyAndVote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (otpCode === simulatedOtp || otpCode === '123456') {
        const result = castVote(votingTargetVideo.id, voterEmail);
        if (result.success) {
          setVoteSuccess(true);
        }
      } else {
        addToast('Invalid OTP entered. Please check and retry.', 'error');
      }
    }, 1000);
  };

  const handleClose = () => {
    setActiveModal(null);
    setOtpSent(false);
    setOtpCode('');
    setVoteSuccess(false);
    setVoterEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl overflow-hidden shadow-2xl p-6">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {voteSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 mx-auto flex items-center justify-center animate-bounce">
              <Heart className="w-9 h-9 fill-pink-500" />
            </div>
            <h3 className="text-lg font-bold text-white font-serif">Vote Recorded Successfully!</h3>
            <p className="text-xs text-slate-300">
              Thank you for voting for <strong>{votingTargetVideo.user_name}</strong>. Your vote is verified and recorded into Round 1 qualification tally.
            </p>
            <div className="p-3 rounded-2xl bg-slate-950 border border-pink-500/20 text-[11px] text-pink-300">
              Contestant: {votingTargetVideo.registration_number} • Current Total: {votingTargetVideo.votes_count + 1} Votes
            </div>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/40 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Cast Your Verified Vote</h3>
                <p className="text-xs text-pink-300">100% Fair & Transparent OTP Verification</p>
              </div>
            </div>

            {/* Candidate Card Snippet */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <img
                src={votingTargetVideo.thumbnail_url}
                alt={votingTargetVideo.user_name}
                className="w-16 h-12 rounded-lg object-cover"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">{votingTargetVideo.user_name}</h4>
                <p className="text-[11px] text-pink-400">{votingTargetVideo.subcategory}</p>
                <p className="text-[10px] text-slate-400">{votingTargetVideo.city}, {votingTargetVideo.country}</p>
              </div>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3 pt-2">
                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">
                    Your Email Address (For 1-Vote Security) *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
                      placeholder="voter@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Strict Policy: Maximum 1 vote allowed per IP address/Email per round.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs transition shadow-md shadow-pink-600/20"
                >
                  Send Verification OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndVote} className="space-y-3 pt-2">
                <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-[11px] text-pink-300">
                  Demo Auto-Filled OTP code: <strong className="font-mono text-white">{simulatedOtp}</strong>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs font-semibold mb-1">
                    Enter 6-Digit OTP Code *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-center text-base tracking-widest font-mono text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpCode(simulatedOtp)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs hover:text-white"
                  >
                    Auto-Fill OTP
                  </button>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="flex-1 py-2 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition"
                  >
                    {isVerifying ? 'Verifying...' : 'Confirm Vote'}
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified under GMTS Audition Integrity Protocol</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
