import React from 'react';
import { 
  RotateCcw, 
  Car, 
  SlidersHorizontal,
  Zap,
  Package,
  Compass,
  Cpu,
  Sparkles
} from 'lucide-react';
import { CategoryType, FilterState } from '../types';
import { CATEGORIES, VEHICLE_OPTIONS } from '../data/products';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onResetFilters: () => void;
  totalResults: number;
  categoryCounts: Record<CategoryType, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  categoryCounts,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'charging': return <Zap className="w-3.5 h-3.5" />;
      case 'organizer': return <Package className="w-3.5 h-3.5" />;
      case 'cabin': return <Car className="w-3.5 h-3.5" />;
      case 'trip-tech': return <Compass className="w-3.5 h-3.5" />;
      case 'adapters': return <Cpu className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const isFiltered = filters.searchQuery !== '' || 
                     filters.category !== 'all' || 
                     filters.vehicleFilter !== 'All Vehicles / Universal' ||
                     filters.priceFilter !== 'all' ||
                     filters.sortBy !== 'featured';

  return (
    <div id="buyer-guides-section" className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-30 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Category Horizontal Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden md:inline shrink-0">
            Filters:
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.id;
            const count = categoryCounts[cat.id as CategoryType] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange('category', cat.id as CategoryType)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-blue-200/70 text-blue-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls Row */}
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Vehicle Compatibility Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700">
              <Car className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span className="text-slate-500 hidden sm:inline">Fitment:</span>
              <select
                aria-label="Filter by Vehicle Compatibility"
                value={filters.vehicleFilter}
                onChange={(e) => onFilterChange('vehicleFilter', e.target.value)}
                className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer pr-1"
              >
                {VEHICLE_OPTIONS.map((v) => (
                  <option key={v} value={v} className="bg-white text-slate-800">
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Tier Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700">
              <span className="text-slate-500">Budget:</span>
              <select
                aria-label="Filter by Price Budget"
                value={filters.priceFilter}
                onChange={(e) => onFilterChange('priceFilter', e.target.value as FilterState['priceFilter'])}
                className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="all" className="bg-white text-slate-800">All Budgets</option>
                <option value="under-50" className="bg-white text-slate-800">Under $50 (Budget Pick)</option>
                <option value="50-150" className="bg-white text-slate-800">$50 - $150 (Mid Tier)</option>
                <option value="150-plus" className="bg-white text-slate-800">$150+ (Pro Tech)</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">Sort:</span>
              <select
                aria-label="Sort products by"
                value={filters.sortBy}
                onChange={(e) => onFilterChange('sortBy', e.target.value as FilterState['sortBy'])}
                className="bg-transparent text-xs text-slate-800 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-white text-slate-800">Editor's Lab Choice</option>
                <option value="rating" className="bg-white text-slate-800">Highest Tested Rating</option>
                <option value="reviews" className="bg-white text-slate-800">Most Amazon Reviews</option>
                <option value="price-low" className="bg-white text-slate-800">Price: Low to High</option>
                <option value="price-high" className="bg-white text-slate-800">Price: High to Low</option>
              </select>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors font-medium"
                title="Reset all search and filters"
              >
                <RotateCcw className="w-3 h-3 text-blue-600" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-slate-500 text-xs flex items-center gap-1.5">
            <span>Showing</span>
            <strong className="text-blue-600 font-mono font-bold">{totalResults}</strong>
            <span>verified buyer {totalResults === 1 ? 'guide' : 'guides'}</span>
            {filters.searchQuery && (
              <span className="text-slate-400 truncate max-w-[120px]">
                for "{filters.searchQuery}"
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

