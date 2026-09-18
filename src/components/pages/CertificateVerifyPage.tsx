import React, { useState } from 'react';
import { Search, Award, CheckCircle2, ShieldCheck, QrCode, FileText, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CertificateVerifyPage: React.FC = () => {
  const { certificates, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('GMTS-CERT-REG-001');
  const [verifiedResult, setVerifiedResult] = useState<any | null>(certificates[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    const found = certificates.find(
      (c) =>
        c.unique_certificate_number.toUpperCase().includes(query) ||
        c.participant_name.toUpperCase().includes(query)
    );

    setHasSearched(true);
    setVerifiedResult(found || null);

    if (found) {
      addToast('Certificate verified authentic!', 'success');
    } else {
      addToast('No certificate record found with the specified identifier.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official VIFTRI & GMTS Academic Repository
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
            Online Certificate Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Verify the authenticity of digital certificates issued by Global Multitalent Show and VIFTRI. Enter the certificate number or participant name.
          </p>
        </div>

        {/* Search Box */}
        <div className="rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. GMTS-CERT-REG-001 or Pooja Varma"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white uppercase focus:outline-none focus:border-pink-500 font-mono"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs transition shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Authenticity</span>
            </button>
          </form>
        </div>

        {/* Verification Certificate View */}
        {hasSearched && verifiedResult && (
          <div className="rounded-3xl bg-white text-slate-900 p-8 shadow-2xl border-4 border-amber-500 space-y-6">
            <div className="border-4 border-double border-amber-600/70 p-8 rounded-2xl bg-gradient-to-b from-amber-50/60 via-white to-amber-50/60 text-center space-y-5">
              <div className="flex items-center justify-between border-b-2 border-amber-400 pb-3">
                <div className="text-left">
                  <span className="font-serif font-black text-2xl text-rose-900">GMTS</span>
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">
                    Global Multitalent Show
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    100% Verified Authentic
                  </span>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">
                    {verifiedResult.unique_certificate_number}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                  Certificate of Achievement & Accreditation
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {verifiedResult.certificate_type}
                </h2>
              </div>

              <p className="text-xs text-slate-600 italic">This is certified to</p>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-rose-900 tracking-wide underline decoration-amber-400">
                {verifiedResult.participant_name}
              </h3>

              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                For exemplary artistic demonstration in the category of <strong>{verifiedResult.category}</strong>. The participant has satisfied all academic standards and is eligible for progression in the national audition sequence.
              </p>

              <div className="pt-6 mt-4 border-t border-amber-300 flex items-center justify-between text-xs text-slate-700">
                <div className="text-left">
                  <span className="block font-bold text-slate-900">{verifiedResult.issue_date}</span>
                  <span className="text-[10px] text-slate-500">Date of Concurrence</span>
                </div>
                <div className="text-center">
                  <QrCode className="w-10 h-10 text-slate-800 mx-auto" />
                  <span className="text-[9px] text-slate-500">Verified by VIFTRI QR Protocol</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-slate-900">{verifiedResult.signatory}</span>
                  <span className="text-[10px] text-slate-500">Director, VIFTRI & GMTS</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white text-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Print / Save PDF Certificate
              </button>
            </div>
          </div>
        )}

        {hasSearched && !verifiedResult && (
          <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-2">
            <h4 className="text-sm font-bold text-white">No Certificate Found</h4>
            <p className="text-xs text-slate-400">
              The identifier you searched does not match our verified registry. Try searching with <strong className="text-pink-400">GMTS-CERT-REG-001</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
