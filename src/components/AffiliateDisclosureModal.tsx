import React, { useEffect } from 'react';
import { X, ShieldCheck, Info, DollarSign, Award } from 'lucide-react';

interface AffiliateDisclosureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AffiliateDisclosureModal: React.FC<AffiliateDisclosureModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div 
        id="affiliate-disclosure-modal"
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Amazon Affiliate & FTC Disclosure
              </h2>
              <p className="text-xs text-slate-500">Editorial Independence & Transparency Promise</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core Amazon Mandated Statement */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-sm leading-relaxed font-semibold">
          "As an Amazon Associate I earn from qualifying purchases."
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <span>How We Fund Our EV Testing Lab</span>
            </h3>
            <p className="text-slate-600">
              EV Road Lab participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click our affiliate links and make a purchase, we may receive a small commission from Amazon at <strong className="text-slate-900">zero additional cost to you</strong>.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>100% Unbiased Testing Standards</span>
            </h3>
            <p className="text-slate-600">
              We never accept paid positive reviews or manufacturer bribes. If a product fails during high-amperage heat testing or freezes stiff in cold chambers, we state it plainly. All ratings and lab scores are determined exclusively by our road test engineering team.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Pricing & Availability Disclaimer</span>
            </h3>
            <p className="text-slate-600">
              Product prices, Prime discounts, and inventory availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon.com at the time of purchase will apply to the purchase of this product.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};

