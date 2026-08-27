import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  BatteryCharging, 
  CheckCircle2, 
  Truck, 
  Gauge, 
  Package, 
  Car, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CategoryType } from '../types';

interface HeroProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onScrollToGuides: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeCategory,
  onSelectCategory,
  onScrollToGuides,
}) => {
  const quickFilterChips: { label: string; cat: CategoryType; icon: React.ReactNode }[] = [
    { label: 'All Tested Gear', cat: 'all', icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'Portable Level 2 Chargers', cat: 'charging', icon: <Zap className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'Cable Reels & Bags', cat: 'organizer', icon: <Package className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'All-Weather Floor Liners', cat: 'cabin', icon: <Car className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'Road Trip Tech & Pumps', cat: 'trip-tech', icon: <Gauge className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'NACS & Fast Adapters', cat: 'adapters', icon: <BatteryCharging className="w-3.5 h-3.5 text-blue-400" /> },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-8 border-b border-slate-800">
      {/* Blue Gradient Accent on Right */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-blue-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Trust Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-blue-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>2026 EV Field Tested • Independent Lab Benchmarks</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Optimized Gear for the <br className="hidden sm:inline" />
            <span className="text-blue-400">
              Modern EV Journey
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            We lab-test the latest electric vehicle peripherals to ensure your road trips are seamless, charged, and comfortable.
          </p>

          {/* Trust Guarantee Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 text-left">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Zero Fake Reviews</div>
                <div className="text-[11px] text-slate-400">Strict lab verified</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Prime 1-2 Day</div>
                <div className="text-[11px] text-slate-400">Fast delivery verified</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                <BatteryCharging className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Universal Fit</div>
                <div className="text-[11px] text-slate-400">Tesla, Rivian, Ford & all</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-start gap-2.5 shadow-sm">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 mt-0.5">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Range Maximize</div>
                <div className="text-[11px] text-slate-400">Thermal & aero tested</div>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips (Interactive) */}
          <div className="pt-2">
            <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center justify-center gap-1.5">
              <span>Quick Explore by Essential Category</span>
              <ArrowRight className="w-3 h-3 text-blue-400" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {quickFilterChips.map((chip) => {
                const isActive = activeCategory === chip.cat;
                return (
                  <button
                    key={chip.label}
                    onClick={() => {
                      onSelectCategory(chip.cat);
                      onScrollToGuides();
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {chip.icon}
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

