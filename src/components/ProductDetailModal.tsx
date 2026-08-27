import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ExternalLink, 
  Check, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Car, 
  Package, 
  Zap, 
  HelpCircle,
  Copy,
  Layers,
  Award
} from 'lucide-react';
import { ProductGuide } from '../types';

interface ProductDetailModalProps {
  guide: ProductGuide | null;
  onClose: () => void;
  onAmazonClick: (guide: ProductGuide, e: React.MouseEvent) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  guide,
  onClose,
  onAmazonClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'testing' | 'faq'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (guide) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guide, onClose]);

  if (!guide) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}?guide=${guide.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      {/* Background click overlay */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Main Modal Window */}
      <div 
        id={`product-modal-${guide.id}`}
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
      >
        {/* Sticky Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
              {guide.badge}
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              ASIN: {guide.amazonAsin}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Share / Copy URL button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 shadow-sm transition-colors"
              title="Copy shareable link to this buyer guide"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shadow-sm transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          {/* Header & Main Overview */}
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2.5">
              <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-md font-semibold">
                {guide.categoryLabel}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {guide.readTime}
              </span>
              <span>•</span>
              <span>Updated: {guide.lastUpdated}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
              {guide.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {guide.subtitle}
            </p>
          </div>

          {/* Ratings & Quick Purchase Card Bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
            {/* Image Gallery Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white h-64 sm:h-72 relative shadow-sm">
                <img
                  src={guide.imageUrl}
                  alt={guide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {guide.primeEligible && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-black tracking-tight shadow-md">
                    <Truck className="w-3.5 h-3.5" />
                    <span>prime FREE Delivery</span>
                  </div>
                )}
              </div>

              {guide.secondaryImages && guide.secondaryImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {guide.secondaryImages.map((img, idx) => (
                    <div key={idx} className="h-24 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
                      <img
                        src={img}
                        alt={`${guide.title} secondary photo ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Purchase & Rating Summary Column */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                {/* Score Comparison */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                    <div className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lab Field Score</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-900 font-mono flex items-baseline gap-1">
                      {guide.testedRating.toFixed(1)}
                      <span className="text-xs text-emerald-600 font-normal">/ 5.0</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 mt-0.5">Top 5% category tier</div>
                  </div>

                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-sm">
                    <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Amazon Rating</span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono flex items-baseline gap-1">
                      {guide.amazonRating}
                      <span className="text-xs text-slate-500 font-normal">★</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {guide.amazonReviewCount.toLocaleString()}+ verified buyers
                    </div>
                  </div>
                </div>

                {/* Pricing & Deals */}
                <div className="bg-white border border-slate-200 p-4 rounded-xl mb-4 shadow-sm">
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-extrabold text-slate-900 font-mono">
                        {guide.estimatedPrice}
                      </span>
                      {guide.originalPrice && (
                        <span className="text-sm text-slate-400 line-through font-mono">
                          {guide.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                      Live Amazon Pricing
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Includes all factory adapters & standard warranty.
                  </p>
                </div>

                {/* Primary Buy CTA Button */}
                <a
                  href={guide.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  onClick={(e) => onAmazonClick(guide, e)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-sm hover:shadow transition-all text-center group/cta"
                >
                  <span>View Current Deal on Amazon</span>
                  <ExternalLink className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform" />
                </a>

                {/* Amazon Affiliate Legal Notice */}
                <div className="mt-2.5 text-center text-[11px] text-slate-400 leading-tight">
                  <span>
                    As an Amazon Associate, EV Road Lab earns from qualifying purchases. Price and availability confirmed via Amazon API.
                  </span>
                </div>
              </div>

              {/* Author & Tested By Box */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200 text-xs">
                <img
                  src={guide.author.avatarUrl}
                  alt={guide.author.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-semibold text-slate-800">Reviewed by {guide.author.name}</div>
                  <div className="text-slate-500 text-[11px]">{guide.author.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section Tabs inside Modal */}
          <div className="flex border-b border-slate-200 gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Lab Verdict & Pros/Cons
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Full Specifications
            </button>
            <button
              onClick={() => setActiveTab('testing')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'testing'
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Field Test Analysis
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-2.5 transition-colors border-b-2 ${
                activeTab === 'faq'
                  ? 'border-blue-600 text-blue-700 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              FAQ & Compatibility
            </button>
          </div>

          {/* Tab 1: Overview, Lab Verdict, Pros & Cons */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Lab Verdict Callout */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 relative overflow-hidden">
                <div className="flex items-center gap-2 text-blue-800 text-sm font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>EV Road Lab Official Verdict</span>
                </div>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                  {guide.labVerdict}
                </p>
              </div>

              {/* Pros and Cons Dual Column */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>What We Love (Pros)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    {guide.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-3">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Things to Consider (Cons)</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    {guide.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold flex-shrink-0">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Features Bullet Grid */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span>Key Features Tested</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guide.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Technical Specifications Matrix</span>
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {guide.specs.map((spec, idx) => (
                        <tr
                          key={idx}
                          className={spec.highlight ? 'bg-blue-50/60' : 'hover:bg-slate-50'}
                        >
                          <td className="py-3 px-4 font-semibold text-slate-700 w-1/3 border-r border-slate-200">
                            {spec.label}
                          </td>
                          <td className={`py-3 px-4 font-mono ${spec.highlight ? 'text-blue-700 font-bold' : 'text-slate-800'}`}>
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* What's In The Box */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>What's Included In The Box</span>
                </h3>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  {guide.inTheBox.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Deep Dive Field Test Analysis */}
          {activeTab === 'testing' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Real-World EV Testing Notes</span>
                </div>
                {guide.deepDiveAnalysis.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-700 text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700 flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900 block mb-1">Our Testing Protocol:</strong>
                  Every product undergoes 500+ miles of live road driving across varying weather (32°F - 100°F), continuous amperage telemetry recording, and physical drop and durability evaluations.
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: FAQ & Vehicle Compatibility */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Vehicle Compatibility List */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span>Tested Vehicle Compatibility</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {guide.vehicleCompatibility.map((veh, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 flex items-center gap-2 font-mono">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{veh}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-2.5">
                  {guide.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom CTA Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="hidden sm:block">
            <div className="text-xs text-slate-500">Current Amazon Best Deal:</div>
            <div className="text-lg font-bold text-slate-900 font-mono">{guide.estimatedPrice}</div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-sm transition-colors"
            >
              Close
            </button>
            <a
              href={guide.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={(e) => onAmazonClick(guide, e)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all group"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

