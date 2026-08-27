import React from 'react';
import { 
  Star, 
  Clock, 
  Check, 
  ExternalLink, 
  BookOpen, 
  Truck, 
  Zap, 
  Car, 
  Package, 
  Compass, 
  Cpu, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ProductGuide } from '../types';

interface GuideCardProps {
  guide: ProductGuide;
  onOpenGuide: (guide: ProductGuide) => void;
  onAmazonClick: (guide: ProductGuide, e: React.MouseEvent) => void;
}

export const GuideCard: React.FC<GuideCardProps> = ({
  guide,
  onOpenGuide,
  onAmazonClick,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'charging': return <Zap className="w-3.5 h-3.5 text-blue-600" />;
      case 'organizer': return <Package className="w-3.5 h-3.5 text-blue-600" />;
      case 'cabin': return <Car className="w-3.5 h-3.5 text-blue-600" />;
      case 'trip-tech': return <Compass className="w-3.5 h-3.5 text-blue-600" />;
      case 'adapters': return <Cpu className="w-3.5 h-3.5 text-blue-600" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "Editor's Choice":
      case 'Top Rated':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Best Value':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Road Trip Essential':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <article
      id={`guide-card-${guide.id}`}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Card Media Header */}
        <div 
          onClick={() => onOpenGuide(guide)}
          className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
        >
          <img
            src={guide.imageUrl}
            alt={guide.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border shadow-sm backdrop-blur-sm ${getBadgeStyle(
                guide.badge
              )}`}
            >
              {guide.badge}
            </span>

            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-slate-200 px-2 py-0.5 rounded-full text-xs text-slate-700 font-medium shadow-sm">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{guide.readTime}</span>
            </div>
          </div>

          {/* Category Tag pill over image bottom */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-slate-800 shadow-sm">
            {getCategoryIcon(guide.category)}
            <span>{guide.categoryLabel}</span>
          </div>

          {/* Prime Eligibility Tag */}
          {guide.primeEligible && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-black tracking-tight shadow">
              <Truck className="w-3 h-3" />
              <span>prime</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Ratings Row */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2.5">
            <div className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{guide.testedRating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal ml-0.5">/ 5.0 Lab Score</span>
            </div>

            <div className="text-slate-500 text-[11px] flex items-center gap-1">
              <span className="font-semibold text-slate-700">{guide.amazonRating}★</span>
              <span>({guide.amazonReviewCount.toLocaleString()}+ reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h2
            onClick={() => onOpenGuide(guide)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
          >
            {guide.title}
          </h2>

          {/* Subtitle / Article Summary */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {guide.summary}
          </p>

          {/* Key Pros Preview */}
          <div className="space-y-1.5 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Tested Strengths</span>
            </div>
            {guide.pros.slice(0, 2).map((pro, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </div>
            ))}
          </div>

          {/* Vehicle Compatibility Preview Pill */}
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-2">
            <Car className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-medium">Fits:</span>
            <span className="text-slate-700 truncate font-mono">
              {guide.vehicleCompatibility[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50">
        {/* Price Row */}
        <div className="flex items-baseline justify-between mb-3.5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {guide.estimatedPrice}
            </span>
            {guide.originalPrice && (
              <span className="text-xs text-slate-400 line-through font-mono">
                {guide.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Amazon Deal
          </span>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Buyer Guide / Specs Modal Button */}
          <button
            onClick={() => onOpenGuide(guide)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 text-xs font-semibold shadow-sm transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Buyer Guide</span>
          </button>

          {/* Amazon Affiliate Buy / Check Price Button */}
          <a
            href={guide.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={(e) => onAmazonClick(guide, e)}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs shadow-sm hover:shadow transition-all group/btn"
          >
            <span>Check Price</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mini Affiliate Tagline */}
        <div className="text-center mt-2.5">
          <span className="text-[10px] text-slate-400">
            Amazon Affiliate Link • Prices may fluctuate
          </span>
        </div>
      </div>
    </article>
  );
};

