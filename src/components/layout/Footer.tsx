import React from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldAlert,
  Youtube,
  Facebook,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GMTS_COMPANY_INFO } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { setCurrentPage, setActiveModal } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-pink-500/20 text-slate-400 text-xs">
      {/* Top Advisory Banner */}
      <div className="bg-gradient-to-r from-pink-950/70 via-slate-900 to-pink-950/70 py-4 px-4 border-b border-pink-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2 text-pink-300">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-semibold text-xs text-slate-200">
              Official Legal Jurisdiction: All competition entry fees across all rounds are strictly non-refundable. Legal disputes subject exclusively to Ahmedabad Court, Gujarat.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setCurrentPage('terms')}
              className="text-pink-400 hover:text-pink-300 underline font-medium"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setCurrentPage('privacy')}
              className="text-pink-400 hover:text-pink-300 underline font-medium"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Col 1: GMTS & Partners */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-0.5 shadow-md shadow-pink-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div>
              <span className="text-white font-extrabold text-lg font-serif tracking-tight">GMTS</span>
              <p className="text-[10px] text-pink-400 uppercase font-semibold">Global Multitalent Show</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            World-class international fashion runway and multi-talent platform empowering performers from ages 5 to 85 across 200+ talent categories with transparent online voting, binary compensation, and official certification.
          </p>
          <div className="pt-2 border-t border-slate-800 space-y-1">
            <p className="text-[11px] text-slate-300 font-semibold">Joint Academic & FMCG Alliance:</p>
            <p className="text-[11px] text-pink-300">VIFTRI (Fashion Tech & Research Institute)</p>
            <p className="text-[11px] text-emerald-400">PECC (Marketing & Direct Selling)</p>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider text-pink-400">Navigation</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentPage('home')} className="hover:text-pink-300 transition">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('gallery')} className="hover:text-pink-300 transition">
                Video Gallery & Public Voting
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('categories')} className="hover:text-pink-300 transition">
                200+ Talent Categories
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('verify')} className="hover:text-pink-300 transition">
                Certificate Verification (QR Portal)
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('blog')} className="hover:text-pink-300 transition">
                GMTS Fashion Show Blog
              </button>
            </li>
            <li>
              <button onClick={() => setActiveModal('inquiry')} className="hover:text-pink-300 transition">
                Franchise & Partner Inquiries
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Compensation & Rules */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider text-pink-400">5-Round System</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-pink-300 font-semibold block">Round 1–3 Auditions</span>
              <span className="text-slate-400 text-[11px]">₹600 entry • 100 referrals + 250 votes to qualify</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-amber-300 font-semibold block">Semi-Final & Grand Final</span>
              <span className="text-slate-400 text-[11px]">Grand Runway showcase • ₹1,00,000 Cash Prize Puraskar</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-emerald-300 font-semibold block">Binary MLM System</span>
              <span className="text-slate-400 text-[11px]">1 PV = ₹0.90 • 20-level generation • 3% Royalty</span>
            </div>
          </div>
        </div>

        {/* Col 4: Corporate Headquarters */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider text-pink-400">Ahmedabad HQ</h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <span>{GMTS_COMPANY_INFO.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href="tel:+919157697394" className="hover:text-emerald-300 font-semibold">
                +91 9157697394
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-pink-400 shrink-0" />
              <span>{GMTS_COMPANY_INFO.email}</span>
            </li>
          </ul>

          <div className="pt-2">
            <p className="text-[11px] text-slate-400 mb-2 font-medium">Verified External Channels:</p>
            <div className="flex items-center gap-3">
              <a
                href={GMTS_COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-rose-400 hover:bg-slate-800 hover:text-rose-300 transition"
                title="GMTS YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={GMTS_COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-blue-400 hover:bg-slate-800 hover:text-blue-300 transition"
                title="VIFTRI Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={GMTS_COMPANY_INFO.socialLinks.justdial}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-amber-300 transition flex items-center gap-1 text-[11px]"
                title="JustDial Verified"
              >
                <Award className="w-4 h-4" />
                <span>JustDial</span>
              </a>
              <a
                href={GMTS_COMPANY_INFO.socialLinks.pecc}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 transition flex items-center gap-1 text-[11px]"
                title="PECC Direct Selling"
              >
                <ExternalLink className="w-4 h-4" />
                <span>PECC</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-900 py-4 px-4 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© Global Multitalent Show (GMTS) • Perpetual Lifetime & Annual Edition. All Rights Reserved. Reg. No. {GMTS_COMPANY_INFO.registrationNo}.</p>
          <p className="text-slate-400">Crafted with precision for International Fashion & Multi-Talent Performers.</p>
        </div>
      </div>
    </footer>
  );
};
