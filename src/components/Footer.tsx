import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Info, 
  Mail, 
  Check, 
  ExternalLink,
  Car,
  Package,
  Compass,
  Cpu
} from 'lucide-react';
import { CategoryType } from '../types';

interface FooterProps {
  onCategorySelect: (cat: CategoryType) => void;
  onOpenDisclosure: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onCategorySelect,
  onOpenDisclosure,
  onOpenPrivacy,
}) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleScrollCategory = (cat: CategoryType) => {
    onCategorySelect(cat);
    const el = document.getElementById('buyer-guides-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 font-mono">
                EV<span className="text-blue-600">ROAD</span>LAB
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              EV Road Lab is an independent consumer testing and electric vehicle gear lab. We evaluate portable Level 2 EVSEs, 3D laser floor mats, cable reels, and road trip tech under extreme real-world road conditions.
            </p>

            <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Tested & Verified for Tesla, Rivian, Hyundai, Ford & Universal EVs</span>
            </div>
          </div>

          {/* Col 2: Quick Buyer Guides */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Buyer Guides & Gear
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleScrollCategory('charging')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Portable Level 2 EVSEs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollCategory('organizer')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600"
                >
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span>Heavy-Duty Cable Reels</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollCategory('cabin')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600"
                >
                  <Car className="w-3.5 h-3.5 text-blue-600" />
                  <span>All-Weather 3D Cabin Mats</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollCategory('trip-tech')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Smart 150 PSI Tire Inflators</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScrollCategory('adapters')}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600"
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>250kW Supercharger Adapters</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter / Deal Alerts */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              EV Deal Alerts & Lab Tests
            </h3>
            <p className="text-slate-600 text-xs">
              Get notified when top-rated Level 2 chargers and EV road trip accessories drop to historic low prices on Amazon.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1 text-emerald-600 text-[11px] font-medium">
                  <Check className="w-3 h-3" />
                  <span>Subscribed! You'll receive verified EV price drop alerts.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Amazon Mandatory Affiliate Disclosure Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Amazon Associate Disclosure Statement</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            <strong className="text-slate-800">EV Road Lab is a participant in the Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. <span className="text-slate-900 font-medium">As an Amazon Associate I earn from qualifying purchases.</span> Certain content that appears on this site comes from Amazon Services LLC. This content is provided 'as is' and is subject to change or removal at any time.
          </p>
        </div>

        {/* Bottom Legal Copyright & Links */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} EV Road Lab. All rights reserved.</span>
            <span>•</span>
            <span className="text-blue-600 font-semibold">v2.4 Production Hub</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDisclosure}
              className="hover:text-blue-600 transition-colors underline underline-offset-2 text-slate-600"
            >
              Affiliate Disclosure
            </button>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-blue-600 transition-colors underline underline-offset-2 text-slate-600"
            >
              Privacy Policy
            </button>
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 text-slate-600 transition-colors flex items-center gap-1"
            >
              <span>Amazon.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

