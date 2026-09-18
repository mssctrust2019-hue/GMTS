import React, { useRef } from 'react';
import {
  Printer,
  Download,
  CheckCircle2,
  X,
  Building2,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Copy
} from 'lucide-react';
import { InvoiceRecord } from '../../types';
import { RAZORPAY_CONFIG } from '../../config/razorpay';

interface InvoiceModalProps {
  invoice: InvoiceRecord;
  onClose: () => void;
  onGoToLogin?: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose, onGoToLogin }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-pink-500/40 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100">
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Tax-Exempt Payment Receipt & Invoice</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div ref={printRef} className="p-6 sm:p-8 space-y-6 bg-slate-900 text-slate-100 print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 print:border-black/20 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-500 inline-block"></span>
                <span className="text-xl font-black tracking-wider text-white print:text-black font-serif">
                  GLOBAL MULTITALENT SHOW
                </span>
              </div>
              <p className="text-xs text-pink-400 font-semibold print:text-pink-600">
                GMTS • International Fashion & Runway Platform
              </p>
              <p className="text-[11px] text-slate-400 print:text-gray-600">
                Organized by {RAZORPAY_CONFIG.ORGANIZER}
              </p>
              <p className="text-[10px] text-slate-500 print:text-gray-500">
                Reg No: {RAZORPAY_CONFIG.TRUST_REG_NO} • Ahmedabad, Gujarat
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 print:bg-green-100 print:text-green-800 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                PAYMENT SUCCESSFUL
              </span>
              <p className="text-xs font-mono font-bold text-slate-300 print:text-gray-800">
                Invoice #: {invoice.invoice_number}
              </p>
              <p className="text-[11px] text-slate-400 print:text-gray-600">Date: {invoice.date}</p>
            </div>
          </div>

          {/* Participant & Order Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 print:bg-gray-50 print:border-gray-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-gray-500 block">
                Billed To (Contestant)
              </span>
              <p className="font-bold text-sm text-white print:text-black">{invoice.participant_name}</p>
              <p className="text-slate-300 print:text-gray-700">
                Registration No: <strong className="text-pink-400 print:text-pink-600 font-mono">{invoice.registration_number}</strong>
              </p>
              <p className="text-slate-400 print:text-gray-600">Email: {invoice.email}</p>
              <p className="text-slate-400 print:text-gray-600">Mobile: {invoice.mobile}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 print:bg-gray-50 print:border-gray-200 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-gray-500 block">
                Razorpay Transaction Details
              </span>
              <p className="text-slate-300 print:text-gray-700">
                Payment ID:{' '}
                <span className="font-mono text-emerald-400 print:text-emerald-700 font-bold break-all">
                  {invoice.payment_id}
                </span>
              </p>
              <p className="text-slate-300 print:text-gray-700">
                Order ID: <span className="font-mono text-slate-400 print:text-gray-600">{invoice.order_id}</span>
              </p>
              <p className="text-slate-300 print:text-gray-700">Gateway: Razorpay Merchant (Live 256-Bit SSL)</p>
              <p className="text-slate-300 print:text-gray-700">Method: {invoice.payment_method}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-800 print:border-gray-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 print:bg-gray-100 text-slate-400 print:text-gray-700 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Round</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-gray-200">
                <tr>
                  <td className="p-3">
                    <p className="font-bold text-white print:text-black">
                      {invoice.round_name} Registration Fee
                    </p>
                    <p className="text-[11px] text-slate-400 print:text-gray-600">
                      Participation entry, audition screening, ID generation & leaderboard placement
                    </p>
                  </td>
                  <td className="p-3 text-center font-bold text-pink-400 print:text-pink-600">
                    Round {invoice.round_number}
                  </td>
                  <td className="p-3 text-right font-black font-mono text-sm text-emerald-400 print:text-emerald-700">
                    ₹{invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-950/90 print:bg-gray-50 border-t border-slate-800 print:border-gray-300">
                <tr>
                  <td colSpan={2} className="p-3 font-bold text-right text-slate-300 print:text-gray-800">
                    Total Amount Paid:
                  </td>
                  <td className="p-3 text-right font-black font-mono text-base text-emerald-400 print:text-emerald-700">
                    ₹{invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* GST & Regulatory Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[10px] text-slate-400 print:text-gray-500 leading-relaxed">
            <p className="font-semibold text-slate-300 print:text-gray-700 mb-0.5">
              GST Exemption & Charitable Notice:
            </p>
            <p>{RAZORPAY_CONFIG.GST_NOTE}</p>
          </div>

          {/* Support & Access Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 print:border-gray-200 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-gray-500">
                Official Contact & Support
              </span>
              <p className="flex items-center gap-1.5 text-slate-300 print:text-gray-700">
                <Phone className="w-3.5 h-3.5 text-pink-400" />
                <span>{RAZORPAY_CONFIG.SUPPORT_PHONE}</span>
              </p>
              <p className="flex items-center gap-1.5 text-slate-300 print:text-gray-700">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>{RAZORPAY_CONFIG.SUPPORT_EMAIL}</span>
              </p>
            </div>

            <div className="space-y-1 text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 print:text-gray-500">
                Official Web Portal
              </span>
              <p className="text-slate-300 print:text-gray-700 break-all">
                {RAZORPAY_CONFIG.WEBSITE_URL}
              </p>
              <p className="text-[10px] text-slate-500 print:text-gray-500">
                Official Jurisdiction: Ahmedabad Courts, Gujarat
              </p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="text-xs text-slate-400">
            A confirmation receipt has also been dispatched to your email: <strong className="text-slate-200">{invoice.email}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onGoToLogin && (
              <button
                onClick={onGoToLogin}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold bg-pink-600 hover:bg-pink-500 text-white text-xs transition shadow flex items-center justify-center gap-1.5"
              >
                <span>Go to Login Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
