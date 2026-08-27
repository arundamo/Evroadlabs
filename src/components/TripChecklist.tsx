import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Gauge,
  Package,
  Layers
} from 'lucide-react';
import { ProductGuide } from '../types';

interface TripChecklistProps {
  onOpenGuideById: (guideId: string) => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  category: string;
  importance: 'Essential' | 'Recommended' | 'Pro Tip';
  desc: string;
  linkedGuideId?: string;
}

export const TripChecklist: React.FC<TripChecklistProps> = ({ onOpenGuideById }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: false,
    c3: true,
    c4: false,
    c5: false,
  });

  const checklistItems: ChecklistItem[] = [
    {
      id: 'c1',
      title: 'Dual-Voltage Portable L2 EVSE + NEMA 5-15 / 14-50 Adapters',
      category: 'Charging',
      importance: 'Essential',
      desc: 'Guarantees overnight charging at Airbnbs, RV parks, and campgrounds without searching for working fast chargers.',
      linkedGuideId: 'level-2-portable-charger-40a',
    },
    {
      id: 'c2',
      title: '500V/250kW CCS1 to NACS Supercharger Adapter',
      category: 'Charging',
      importance: 'Essential',
      desc: 'Unlocks thousands of V3/V4 Tesla Superchargers for Ford, Rivian, and GM electric vehicles.',
      linkedGuideId: 'nacs-to-ccs1-fast-charge-adapter',
    },
    {
      id: 'c3',
      title: 'Precision 150 PSI Cordless Tire Inflator & 20W Power Bank',
      category: 'Safety',
      importance: 'Essential',
      desc: 'Keep heavy EV tires at factory 42–45 PSI to avoid losing 15–20 miles of highway battery range.',
      linkedGuideId: 'smart-cordless-ev-tire-inflator',
    },
    {
      id: 'c4',
      title: 'Heavy-Duty 1680D Circular Cable Reel Bag with Carpet Grip',
      category: 'Storage',
      importance: 'Recommended',
      desc: 'Quarantine wet, muddy cables after outdoor charging sessions and eliminate frunk rattles.',
      linkedGuideId: 'ev-cable-reel-organizer-bag',
    },
    {
      id: 'c5',
      title: 'Dual-Layer Nano Ice Panoramic Glass Roof Sunshade',
      category: 'Comfort',
      importance: 'Recommended',
      desc: 'Reflects 99% infrared solar heat to reduce cabin AC battery consumption by up to 12%.',
      linkedGuideId: 'foldable-glass-roof-sunshade',
    },
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;

  return (
    <section className="bg-slate-100/70 border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Background Accent */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Interactive Road Trip Prep</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                The 2026 Zero-Anxiety EV Road Trip Checklist
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Avoid common roadside bottlenecks. Check off essential gear before embarking on cross-country or remote wilderness drives.
              </p>
            </div>

            {/* Progress Bar Badge */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-4 flex-shrink-0 shadow-sm">
              <div className="text-right">
                <div className="text-xs text-slate-500 font-medium">Readiness Score</div>
                <div className="text-xl font-extrabold text-blue-600 font-mono">
                  {Math.round((checkedCount / totalCount) * 100)}% Prepared
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-bold text-slate-900 font-mono text-sm shadow-inner">
                {checkedCount}/{totalCount}
              </div>
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="space-y-3">
            {checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-blue-50/50 border-blue-200 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div
                    onClick={() => toggleCheck(item.id)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                  >
                    <button
                      className="mt-0.5 text-blue-600 focus:outline-none flex-shrink-0"
                      aria-label={`Toggle check for ${item.title}`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-blue-100 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isChecked ? 'text-slate-900 line-through opacity-70' : 'text-slate-900'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                            item.importance === 'Essential'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {item.importance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {item.linkedGuideId && (
                    <button
                      onClick={() => onOpenGuideById(item.linkedGuideId!)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm transition-colors flex-shrink-0 self-start sm:self-center"
                    >
                      <span>Read Guide & Specs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
