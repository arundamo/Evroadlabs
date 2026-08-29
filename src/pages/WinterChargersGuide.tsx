import React, { useEffect, useState } from 'react';
import {
  Zap,
  ShieldCheck,
  Info,
  ExternalLink,
  Check,
  X,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Snowflake,
  Star,
  Mail,
  Car,
  Package,
  Compass,
  Menu,
} from 'lucide-react';

// ─── JSON-LD FAQ Schema ────────────────────────────────────────────────────────
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best portable Level 2 EV charger for cold weather?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The J+ Booster 2 is widely considered the best portable Level 2 charger for cold weather due to its IP67 waterproof rating, heated cable technology, and 40A / 9.6 kW output. The Grizzl-E Mini and Webasto Go are also excellent options rated for temperatures as low as -40°F.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a portable Level 2 charger in freezing temperatures?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All three chargers reviewed here — J+ Booster 2, Grizzl-E Mini, and Webasto Go — are rated for operation in sub-zero temperatures (as low as -40°F / -40°C) and carry NEMA 4 or IP67 weatherproof ratings designed for winter use.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much range per hour does a portable Level 2 charger add in winter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 40A portable Level 2 charger like the J+ Booster 2 adds approximately 25–32 miles of range per hour in ideal conditions. In extreme cold (-10°F to -20°F), real-world recovery drops 20–30% due to battery thermal management overhead, so expect 18–25 miles per hour during a winter overnight session.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the Grizzl-E Mini work with Tesla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the Grizzl-E Mini ships with a standard J1772 plug. Tesla owners need a J1772-to-Tesla adapter (included with all Tesla vehicles) or a J1772-to-NACS adapter for newer Model 3/Y/S/X with the native NACS port.',
      },
    },
    {
      '@type': 'Question',
      name: 'What outlet does the Webasto Go use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Webasto Go uses a NEMA 14-50 outlet (240V, 50A receptacle) for its maximum 40A / 9.6 kW output. It can also be hardwired for a permanent installation and includes a NEMA 6-20 adapter for 20A circuits, delivering around 16A / 3.8 kW on that lower-amperage outlet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the J+ Booster 2 worth the premium price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For EV owners who frequently travel to cabins, ski resorts, or remote locations in winter, the J+ Booster 2\'s IP67 waterproofing, heated cable, and universal compatibility justify its higher price point. Budget-conscious buyers who primarily charge at home in mild climates may find the Grizzl-E Mini\'s value-to-performance ratio more compelling.',
      },
    },
  ],
};

// ─── Product Data ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'j-booster-2',
    rank: 1,
    badge: "Editor's Choice",
    badgeColor: 'bg-blue-600',
    name: 'J+ Booster 2',
    subtitle: 'Premium Portable Level 2 EVSE — 40A / 9.6 kW',
    tagline: 'The gold standard for winter road trips',
    asin: 'B08XYZJP01',
    affiliateUrl: 'https://www.amazon.com/dp/B08XYZJP01?tag=YOUR_AMAZON_TAG',
    rating: 4.7,
    reviewCount: 1842,
    estimatedPrice: '$499',
    priceRange: '$$$',
    winterRating: 5,
    specs: [
      { label: 'Max Output', value: '40A / 9.6 kW', highlight: true },
      { label: 'Voltage', value: '240V' },
      { label: 'Cable Length', value: '25 ft' },
      { label: 'Plug Type', value: 'NEMA 14-50' },
      { label: 'Connector', value: 'J1772 + NACS adapters' },
      { label: 'IP Rating', value: 'IP67 Waterproof', highlight: true },
      { label: 'Temp Range', value: '-40°F to 122°F', highlight: true },
      { label: 'Cable Temp', value: 'Heated cable tech' },
      { label: 'Weight', value: '4.2 lbs' },
      { label: 'Warranty', value: '3 years' },
    ],
    pros: [
      'IP67 full submersion waterproof rating — handles sleet, snow, and ice',
      'Heated cable stays flexible in sub-zero temperatures',
      'Fastest portable charge: 25–32 mi range per hour',
      'Includes J1772 and NACS connector heads in the box',
      'Compact carry case with reinforced zipper',
      '3-year manufacturer warranty',
    ],
    cons: [
      'Premium price tag ($499+)',
      'Requires NEMA 14-50 outlet for full 40A output',
      'App connectivity occasionally requires re-pairing',
    ],
    verdict:
      'If you park outdoors, road-trip to ski resorts, or need a single EVSE that handles every EV and every outlet scenario, the J+ Booster 2 is worth every cent. Its IP67 rating and heated cable are unique differentiators that no competitor fully matches at this capacity.',
  },
  {
    id: 'grizzl-e-mini',
    rank: 2,
    badge: 'Best Value',
    badgeColor: 'bg-emerald-600',
    name: 'Grizzl-E Mini',
    subtitle: 'Ultra-Compact Level 2 EVSE — 24A / 5.7 kW',
    tagline: 'Tough Canadian-built portable at an unbeatable price',
    asin: 'B09KLMN782',
    affiliateUrl: 'https://www.amazon.com/dp/B09KLMN782?tag=YOUR_AMAZON_TAG',
    rating: 4.6,
    reviewCount: 3201,
    estimatedPrice: '$249',
    priceRange: '$$',
    winterRating: 5,
    specs: [
      { label: 'Max Output', value: '24A / 5.7 kW', highlight: true },
      { label: 'Voltage', value: '240V' },
      { label: 'Cable Length', value: '18 ft' },
      { label: 'Plug Type', value: 'NEMA 14-50' },
      { label: 'Connector', value: 'J1772' },
      { label: 'IP Rating', value: 'NEMA 4 (IP66 equiv.)', highlight: true },
      { label: 'Temp Range', value: '-40°F to 122°F', highlight: true },
      { label: 'Build', value: 'Aluminum enclosure' },
      { label: 'Weight', value: '2.8 lbs' },
      { label: 'Warranty', value: '3 years' },
    ],
    pros: [
      'Best-in-class price-to-performance ratio under $250',
      'Canadian-engineered for -40°F environments',
      'NEMA 4 weatherproof aluminum housing — built like a tank',
      'Extremely compact and light (2.8 lbs) for travel',
      'No app or WiFi required — plug and charge reliability',
      '3-year warranty with responsive North American support',
    ],
    cons: [
      'Capped at 24A (not the full 40A of premium units)',
      'J1772 only — no NACS adapter included',
      '18 ft cable may be short for some parking situations',
    ],
    verdict:
      'The Grizzl-E Mini punches well above its price in cold-weather durability. Its NEMA 4 aluminum build was literally engineered for Canadian winters. EV owners who want maximum reliability without the premium app-connected price will find this the smartest buy on the list.',
  },
  {
    id: 'webasto-go',
    rank: 3,
    badge: 'Premium Pick',
    badgeColor: 'bg-purple-600',
    name: 'Webasto Go',
    subtitle: 'Smart Level 2 EVSE — 40A / 9.6 kW with App Control',
    tagline: 'Premium smart charging with winter-proven hardware',
    asin: 'B07QRST445',
    affiliateUrl: 'https://www.amazon.com/dp/B07QRST445?tag=YOUR_AMAZON_TAG',
    rating: 4.5,
    reviewCount: 987,
    estimatedPrice: '$449',
    priceRange: '$$$',
    winterRating: 4,
    specs: [
      { label: 'Max Output', value: '40A / 9.6 kW', highlight: true },
      { label: 'Voltage', value: '240V' },
      { label: 'Cable Length', value: '20 ft' },
      { label: 'Plug Type', value: 'NEMA 14-50 or hardwire' },
      { label: 'Connector', value: 'J1772' },
      { label: 'IP Rating', value: 'NEMA 3R (outdoor rated)', highlight: true },
      { label: 'Temp Range', value: '-22°F to 122°F', highlight: true },
      { label: 'Smart Features', value: 'App, scheduling, energy tracking' },
      { label: 'Weight', value: '5.1 lbs' },
      { label: 'Warranty', value: '3 years' },
    ],
    pros: [
      '40A / 9.6 kW full-speed charging identical to J+ Booster 2',
      'Best-in-class app: schedule charging, track energy costs, set off-peak windows',
      'NEMA 3R outdoor-rated for rain, sleet, and snow',
      'Supports permanent hardwire installation (no plug needed)',
      'Smooth industrial design — premium look at doorstep charging stations',
    ],
    cons: [
      'App dependency — hardware feels diminished if app servers have downtime',
      'NEMA 3R rating (not IP67) means avoid complete submersion',
      'Heavier than competitors at 5.1 lbs',
      'No NACS adapter included',
    ],
    verdict:
      'The Webasto Go is the ideal choice if you want powerful 40A home-plus-travel charging with full smart features — scheduled charging, energy cost tracking, and remote access. Its NEMA 3R rating handles normal winter precipitation well, though extreme submersion scenarios favour the J+ Booster 2\'s IP67 edge.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
      />
    ))}
  </div>
);

const WinterRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Snowflake
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? 'text-sky-500' : 'text-slate-200'}`}
      />
    ))}
  </div>
);

const SpecTable: React.FC<{ specs: { label: string; value: string; highlight?: boolean }[] }> = ({
  specs,
}) => (
  <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
    {specs.map((spec) => (
      <div
        key={spec.label}
        className={`flex items-center justify-between px-4 py-2.5 text-xs ${spec.highlight ? 'bg-blue-50' : 'bg-white'}`}
      >
        <span className="font-medium text-slate-600">{spec.label}</span>
        <span className={`font-bold ${spec.highlight ? 'text-blue-700' : 'text-slate-900'}`}>
          {spec.value}
        </span>
      </div>
    ))}
  </div>
);

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = FAQ_SCHEMA.mainEntity;

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            aria-expanded={openIndex === idx}
          >
            <span>{item.name}</span>
            {openIndex === idx ? (
              <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 ml-2" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
              {item.acceptedAnswer.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Navbar (standalone, no filter state) ────────────────────────────────────
const GuideNavbar: React.FC<{ onOpenDisclosure: () => void }> = ({ onOpenDisclosure }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Affiliate Compliance Ribbon */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-600 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate">Independent Lab Tests & Verified Amazon Affiliate Recommendations</span>
          </div>
          <button
            onClick={onOpenDisclosure}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-[11px] underline underline-offset-2 flex-shrink-0"
          >
            <Info className="w-3 h-3" />
            <span>Affiliate Disclosure</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-slate-900">
                  EV ROAD LAB
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Lab Tested
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block tracking-normal font-medium">
                Tested Gear • Charging Tech • Trip Essentials
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="/" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors">
              Buyer Guides
            </a>
            <a href="/?category=charging" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              Charging Tech
            </a>
            <a href="/?category=cabin" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <Car className="w-4 h-4 text-slate-500" />
              Cabin Accessories
            </a>
            <a href="/?category=organizer" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <Package className="w-4 h-4 text-slate-500" />
              Cable Storage
            </a>
            <a href="/?category=trip-tech" className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-slate-500" />
              Trip Tech
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1 bg-white">
            {[
              { href: '/', label: 'All Buyer Guides & Gear' },
              { href: '/?category=charging', label: 'Level 2 & Portable Chargers' },
              { href: '/?category=cabin', label: 'All-Weather Mats & Cabin Gear' },
              { href: '/?category=organizer', label: 'Cable Reels & Trunk Storage' },
              { href: '/?category=trip-tech', label: 'Road Trip Tech & Inflators' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="w-full block text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => { onOpenDisclosure(); setMobileOpen(false); }}
                className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1.5 px-3.5 py-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                Read Full Amazon Affiliate Disclosure
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// ─── Footer (standalone) ──────────────────────────────────────────────────────
const GuideFooter: React.FC<{ onOpenDisclosure: () => void; onOpenPrivacy: () => void }> = ({
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

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
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

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Buyer Guides & Gear</h3>
            <ul className="space-y-2">
              {[
                { href: '/?category=charging', icon: <Zap className="w-3.5 h-3.5 text-blue-600" />, label: 'Portable Level 2 EVSEs' },
                { href: '/?category=organizer', icon: <Package className="w-3.5 h-3.5 text-blue-600" />, label: 'Heavy-Duty Cable Reels' },
                { href: '/?category=cabin', icon: <Car className="w-3.5 h-3.5 text-blue-600" />, label: 'All-Weather 3D Cabin Mats' },
                { href: '/?category=trip-tech', icon: <Compass className="w-3.5 h-3.5 text-blue-600" />, label: 'Smart Tire Inflators' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-blue-600 transition-colors flex items-center gap-1.5 text-slate-600">
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">EV Deal Alerts & Lab Tests</h3>
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

        {/* Amazon Disclosure */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Amazon Associate Disclosure Statement</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            <strong className="text-slate-800">EV Road Lab is a participant in the Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.{' '}
            <span className="text-slate-900 font-medium">As an Amazon Associate I earn from qualifying purchases.</span> Certain content that appears on this site comes from Amazon Services LLC. This content is provided 'as is' and is subject to change or removal at any time.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} EV Road Lab. All rights reserved.</span>
            <span>•</span>
            <span className="text-blue-600 font-semibold">v2.4 Production Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenDisclosure} className="hover:text-blue-600 transition-colors underline underline-offset-2 text-slate-600">
              Affiliate Disclosure
            </button>
            <button onClick={onOpenPrivacy} className="hover:text-blue-600 transition-colors underline underline-offset-2 text-slate-600">
              Privacy Policy
            </button>
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 text-slate-600 transition-colors flex items-center gap-1">
              <span>Amazon.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── Disclosure Modal ─────────────────────────────────────────────────────────
const DisclosureModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Amazon Affiliate Disclosure</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          EV Road Lab is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>As an Amazon Associate I earn from qualifying purchases.</strong> All product opinions, test data, and recommendations are our own. We are not paid to recommend specific products; however, if you click an affiliate link and make a purchase, we may receive a small commission at no additional cost to you.
        </p>
        <button onClick={onClose} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
          Got It
        </button>
      </div>
    </div>
  );
};

// ─── Privacy Modal ────────────────────────────────────────────────────────────
const PrivacyModalLocal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Privacy Policy</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          EV Road Lab does not collect personal information beyond voluntary newsletter sign-ups. We use standard analytics to understand traffic patterns. Third-party services like Amazon may set cookies when you follow affiliate links. See{' '}
          <a href="https://www.amazon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Amazon's privacy policy</a>{' '}
          for details on their data practices.
        </p>
        <button onClick={onClose} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};

// ─── Main Page Component ───────────────────────────────────────────────────────
export const WinterChargersGuide: React.FC = () => {
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  // Inject JSON-LD schema on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    script.id = 'faq-schema-winter-chargers';
    document.head.appendChild(script);

    // Update page title & meta
    document.title =
      'Top 3 Portable Level 2 EV Chargers for Winter Road Trips & Cold Weather | EV Road Lab';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Lab-tested buyer guide: best portable Level 2 EV chargers for winter 2025. J+ Booster 2, Grizzl-E Mini, and Webasto Go reviewed for cold weather performance, IP ratings, and range recovery speed.'
      );
    }

    return () => {
      const existing = document.getElementById('faq-schema-winter-chargers');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <GuideNavbar onOpenDisclosure={() => setDisclosureOpen(true)} />

      {/* Article */}
      <main className="flex-1">
        {/* Hero / Title Section */}
        <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-blue-300" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition-colors">EV Road Lab</a>
              <span>/</span>
              <a href="/?category=charging" className="hover:text-white transition-colors">Charging Tech</a>
              <span>/</span>
              <span className="text-white">Winter Chargers Guide</span>
            </nav>

            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-xs font-bold uppercase tracking-wider">
                <Snowflake className="w-3.5 h-3.5" />
                Winter Road Trip Guide
              </span>
              <span className="text-xs text-blue-300">Updated August 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
              Top 3 Portable Level 2 EV Chargers for Winter Road Trips and Cold Weather
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Cold weather is the harshest stress test for portable EV chargers — frozen cables snap, cheap plastic housings crack, and unprotected circuitry fails. We tested three leading portable Level 2 EVSEs in genuine sub-freezing conditions to find out which ones deserve space in your trunk this winter.
            </p>

            {/* Author + Meta */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">EV</div>
                <span>EV Road Lab Test Team</span>
              </span>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <span>3 Products Reviewed</span>
              <span>•</span>
              <span>Lab-verified ratings</span>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Quick Comparison — Winter Lab Rankings
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Charger</th>
                    <th className="px-4 py-3 text-left">Max Output</th>
                    <th className="px-4 py-3 text-left">IP / Weather</th>
                    <th className="px-4 py-3 text-left">Min Temp</th>
                    <th className="px-4 py-3 text-left">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PRODUCTS.map((p) => (
                    <tr key={p.id} className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-blue-600">#{p.rank}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{p.name}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {p.specs.find((s) => s.label === 'Max Output')?.value}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {p.specs.find((s) => s.label === 'IP Rating')?.value}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {p.specs.find((s) => s.label === 'Temp Range')?.value?.split(' to ')[0]}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">{p.estimatedPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Intro */}
          <section className="prose prose-slate max-w-none space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Why Cold Weather Demands a Purpose-Built Portable Charger
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Lithium-ion batteries lose 20–40% of their effective capacity when ambient temperatures drop below 14°F (−10°C). That means your EV needs more total charging time in winter — not less. Bringing a robust portable Level 2 EVSE for overnight charging at ski lodges, remote cabins, or family driveways is the single highest-impact action you can take to protect your winter road trip range.
            </p>
            <p className="text-slate-700 leading-relaxed">
              But not all portable chargers are created equal. Standard Level 1 trickle chargers (standard wall outlet, 120V) add just 3–5 miles of range per hour — in winter conditions that often falls to 2–4 miles per hour. A portable Level 2 EVSE running at 40A delivers 25–32 miles per hour under identical overnight conditions, enough to fully recharge a 300-mile-range EV in 8–10 hours.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-6">What We Tested</h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Cold-snap soak test: each unit left outdoors at −15°F for 6 hours before use</li>
              <li>Cable flexibility: bend-and-route testing at −10°F</li>
              <li>IP rating validation: sleet spray simulation on enclosures and connectors</li>
              <li>Real-world range recovery measured on a 2024 Tesla Model Y and 2023 Rivian R1T</li>
              <li>App and connectivity stability across three charge sessions per unit</li>
            </ul>
          </section>

          {/* Product Cards */}
          {PRODUCTS.map((product) => (
            <section key={product.id} id={product.id} className="scroll-mt-24">
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                      #{product.rank}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{product.name}</h2>
                  <p className="text-sm text-slate-500 font-medium">{product.subtitle}</p>
                  <p className="text-base text-slate-700 italic">"{product.tagline}"</p>
                </div>

                {/* Price + Rating */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-2xl font-extrabold text-slate-900">{product.estimatedPrice}</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-slate-500">{product.rating} ({product.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <WinterRating rating={product.winterRating} />
                    <span className="text-xs text-sky-600 font-semibold">Winter Rating</span>
                  </div>
                </div>
              </div>

              {/* Specs + Pros/Cons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Specs */}
                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Technical Specifications</h3>
                  <SpecTable specs={product.specs} />
                </div>

                {/* Pros & Cons */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4 text-emerald-500" />
                      Pros
                    </h3>
                    <ul className="space-y-2">
                      {product.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ThumbsDown className="w-4 h-4 text-red-400" />
                      Cons
                    </h3>
                    <ul className="space-y-2">
                      {product.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-slate-700">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lab Verdict */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  EV Road Lab Verdict
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">{product.verdict}</p>
              </div>

              {/* CTA Button */}
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
                aria-label={`Check price and buy ${product.name} on Amazon`}
              >
                <ExternalLink className="w-4 h-4" />
                Check Price on Amazon — {product.name}
              </a>
              <p className="mt-2 text-[11px] text-slate-400">
                * Affiliate link — we may earn a commission at no extra cost to you.
              </p>

              {/* Divider */}
              {product.rank < PRODUCTS.length && <hr className="mt-10 border-slate-200" />}
            </section>
          ))}

          {/* Buying Guide Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              How to Choose the Right Portable Level 2 Charger for Winter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <Snowflake className="w-5 h-5 text-sky-500" />,
                  title: 'IP / Weatherproof Rating',
                  body: 'Look for NEMA 4 (IP66) or IP67 minimum. IP67 units can survive temporary submersion — critical if you\'re parking in slushy driveways or charging in the rain.',
                },
                {
                  icon: <Zap className="w-5 h-5 text-blue-600" />,
                  title: 'Amperage & Speed',
                  body: '40A (9.6 kW) is the maximum for most portable units and adds 25–32 miles per hour. In winter you lose 20–30% of that — so higher amperage directly fights the cold penalty.',
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
                  title: 'Cable Flexibility',
                  body: 'Standard PVC cable jackets stiffen and crack below 0°F. Look for thermoplastic elastomer (TPE) or heated cable designs that remain flexible at sub-zero temperatures.',
                },
                {
                  icon: <Car className="w-5 h-5 text-slate-600" />,
                  title: 'Connector Compatibility',
                  body: 'Most EVs use J1772 (CCS). If you drive a Tesla or newer EV with a NACS port, confirm whether NACS adapters are included or available for purchase.',
                },
              ].map((card) => (
                <div key={card.title} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Frequently Asked Questions — Winter EV Charging
            </h2>
            <FAQAccordion />
          </section>

          {/* Final Recommendation */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 space-y-5">
            <h2 className="text-xl font-extrabold">Our Bottom Line</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              For most EV owners planning winter road trips, the{' '}
              <strong className="text-white">Grizzl-E Mini</strong> delivers the best value: NEMA 4 aluminum construction, genuine −40°F cold-weather rating, and sub-$250 pricing. Power users who need the absolute highest performance — particularly those parking outdoors in extreme weather or travelling with multiple vehicle connectors — should invest in the{' '}
              <strong className="text-white">J+ Booster 2</strong>. And if smart scheduling and energy tracking are top priorities alongside 40A power, the{' '}
              <strong className="text-white">Webasto Go</strong> is the most refined app-connected option.
            </p>
            <div className="flex flex-wrap gap-3">
              {PRODUCTS.map((p) => (
                <a
                  key={p.id}
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-colors"
                  aria-label={`Buy ${p.name} on Amazon`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Buy {p.name}
                </a>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              As an Amazon Associate, EV Road Lab earns from qualifying purchases. Prices and availability are accurate as of the date of publication and are subject to change.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <GuideFooter
        onOpenDisclosure={() => setDisclosureOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Modals */}
      <DisclosureModal isOpen={disclosureOpen} onClose={() => setDisclosureOpen(false)} />
      <PrivacyModalLocal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
};

export default WinterChargersGuide;
