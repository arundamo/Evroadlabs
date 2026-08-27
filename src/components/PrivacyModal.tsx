import React, { useEffect } from 'react';
import { X, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
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
        id="privacy-policy-modal"
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Privacy Policy</h2>
              <p className="text-xs text-slate-500">Last updated: August 2026</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            At EV Road Lab, we take reader privacy seriously. This Privacy Policy document outlines the types of personal information that is received and collected by EV Road Lab and how it is used.
          </p>

          <h3 className="font-bold text-slate-900 text-sm">1. Cookies and Web Beacons</h3>
          <p className="text-slate-600">
            When you click on third-party links including Amazon Affiliate links, Amazon may use cookies and web beacons to track qualifying referrals. These cookies allow Amazon to verify that a purchase originated from our site in accordance with the Amazon Associates Program Operating Agreement.
          </p>

          <h3 className="font-bold text-slate-900 text-sm">2. Personal Data Collection</h3>
          <p className="text-slate-600">
            We do not sell, trade, or rent personal identification info to third parties. If you sign up for EV Deal Alerts, your email address is used solely to deliver relevant product testing updates and deal notifications. You may unsubscribe at any time.
          </p>

          <h3 className="font-bold text-slate-900 text-sm">3. Security</h3>
          <p className="text-slate-600">
            We implement industry-standard SSL encryption and modern web best practices to protect your browsing experience.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};

