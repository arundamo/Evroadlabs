import React from 'react';
import { Truck, ShieldCheck, X } from 'lucide-react';
import { ProductGuide } from '../types';

interface AmazonClickToastProps {
  guide: ProductGuide | null;
  onClose: () => void;
}

export const AmazonClickToast: React.FC<AmazonClickToastProps> = ({ guide, onClose }) => {
  if (!guide) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-white border border-blue-200 rounded-2xl shadow-xl p-4 animate-in slide-in-from-bottom-5 duration-300 text-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Opening Amazon Verified Deal</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2 text-slate-700">
        Redirecting to <strong className="text-slate-900">{guide.title}</strong> on Amazon.com.
      </div>

      <div className="mt-2.5 flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-700 font-bold">
          <Truck className="w-3.5 h-3.5 text-amber-600" />
          <span>Prime Eligible</span>
        </div>
        <div className="text-slate-500 font-mono">ASIN: {guide.amazonAsin}</div>
      </div>

      <div className="mt-2 text-[10px] text-slate-500 text-center">
        As an Amazon Associate I earn from qualifying purchases.
      </div>
    </div>
  );
};

