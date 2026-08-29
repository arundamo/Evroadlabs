import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';

const WinterChargersGuide = lazy(() => import('./pages/WinterChargersGuide'));
import { 
  Navbar 
} from './components/Navbar';
import { 
  Hero 
} from './components/Hero';
import { 
  FilterBar 
} from './components/FilterBar';
import { 
  GuideCard 
} from './components/GuideCard';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  AffiliateDisclosureModal 
} from './components/AffiliateDisclosureModal';
import { 
  PrivacyModal 
} from './components/PrivacyModal';
import { 
  TripChecklist 
} from './components/TripChecklist';
import { 
  AmazonClickToast 
} from './components/AmazonClickToast';
import { 
  Footer 
} from './components/Footer';
import { 
  PRODUCT_GUIDES 
} from './data/products';
import { 
  CategoryType, 
  FilterState, 
  ProductGuide 
} from './types';
import { 
  Search, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Simple path-based routing — pathname is stable for a full page load; the
  // useState initializer captures it once so the check is not repeated on every
  // render and avoids reading window globals in the render body.
  const [pathname] = useState(() => window.location.pathname);

  if (pathname === '/guides/portable-level-2-chargers-winter') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-sm">Loading guide…</div>}>
        <WinterChargersGuide />
      </Suspense>
    );
  }

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'all',
    sortBy: 'featured',
    vehicleFilter: 'All Vehicles / Universal',
    priceFilter: 'all',
  });

  const [selectedGuide, setSelectedGuide] = useState<ProductGuide | null>(null);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [recentAmazonClick, setRecentAmazonClick] = useState<ProductGuide | null>(null);

  // Check URL query parameters for direct guide linking e.g. ?guide=level-2-portable-charger-40a
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guideId = params.get('guide');
    if (guideId) {
      const match = PRODUCT_GUIDES.find((g) => g.id === guideId);
      if (match) {
        setSelectedGuide(match);
      }
    }
  }, []);

  const handleFilterChange = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      sortBy: 'featured',
      vehicleFilter: 'All Vehicles / Universal',
      priceFilter: 'all',
    });
  };

  const handleCategorySelect = (category: CategoryType) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleAmazonClick = (guide: ProductGuide, _e: React.MouseEvent) => {
    setRecentAmazonClick(guide);
    setTimeout(() => {
      setRecentAmazonClick(null);
    }, 4500);
  };

  const handleOpenGuideById = (guideId: string) => {
    const found = PRODUCT_GUIDES.find((g) => g.id === guideId);
    if (found) {
      setSelectedGuide(found);
    }
  };

  const scrollToGuides = () => {
    const el = document.getElementById('buyer-guides-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and Sort calculation
  const filteredGuides = useMemo(() => {
    return PRODUCT_GUIDES.filter((guide) => {
      // 1. Search filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = guide.title.toLowerCase().includes(query);
        const matchesSubtitle = guide.subtitle.toLowerCase().includes(query);
        const matchesSummary = guide.summary.toLowerCase().includes(query);
        const matchesCategory = guide.categoryLabel.toLowerCase().includes(query);
        const matchesVehicles = guide.vehicleCompatibility.some((v) => v.toLowerCase().includes(query));
        const matchesPros = guide.pros.some((p) => p.toLowerCase().includes(query));
        const matchesSpecs = guide.specs.some(
          (s) => s.label.toLowerCase().includes(query) || s.value.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesSubtitle && !matchesSummary && !matchesCategory && !matchesVehicles && !matchesPros && !matchesSpecs) {
          return false;
        }
      }

      // 2. Category filter
      if (filters.category !== 'all' && guide.category !== filters.category) {
        return false;
      }

      // 3. Vehicle compatibility filter
      if (filters.vehicleFilter !== 'All Vehicles / Universal') {
        const target = filters.vehicleFilter.toLowerCase();
        const isUniversal = guide.vehicleCompatibility.some((v) => v.toLowerCase().includes('universal'));
        const matchesSpecific = guide.vehicleCompatibility.some((v) => {
          if (target.includes('tesla') && v.toLowerCase().includes('tesla')) return true;
          if (target.includes('rivian') && v.toLowerCase().includes('rivian')) return true;
          if (target.includes('hyundai') && (v.toLowerCase().includes('hyundai') || v.toLowerCase().includes('kia') || v.toLowerCase().includes('ioniq') || v.toLowerCase().includes('ev6'))) return true;
          if (target.includes('ford') && (v.toLowerCase().includes('ford') || v.toLowerCase().includes('mach-e') || v.toLowerCase().includes('lightning'))) return true;
          if (target.includes('chevy') && (v.toLowerCase().includes('chevy') || v.toLowerCase().includes('chevrolet') || v.toLowerCase().includes('gm') || v.toLowerCase().includes('bolt') || v.toLowerCase().includes('blazer'))) return true;
          if (target.includes('bmw') && (v.toLowerCase().includes('bmw') || v.toLowerCase().includes('mercedes') || v.toLowerCase().includes('volkswagen') || v.toLowerCase().includes('audi'))) return true;
          return v.toLowerCase().includes(target);
        });

        if (!isUniversal && !matchesSpecific) {
          return false;
        }
      }

      // 4. Price filter
      const priceNum = parseFloat(guide.estimatedPrice.replace(/[^0-9.]/g, ''));
      if (filters.priceFilter === 'under-50' && priceNum >= 50) return false;
      if (filters.priceFilter === '50-150' && (priceNum < 50 || priceNum > 150)) return false;
      if (filters.priceFilter === '150-plus' && priceNum < 150) return false;

      return true;
    }).sort((a, b) => {
      const priceA = parseFloat(a.estimatedPrice.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(b.estimatedPrice.replace(/[^0-9.]/g, ''));

      switch (filters.sortBy) {
        case 'rating':
          return b.testedRating - a.testedRating;
        case 'reviews':
          return b.amazonReviewCount - a.amazonReviewCount;
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'featured':
        default:
          return 0; // maintain curated lab order
      }
    });
  }, [filters]);

  // Category counts for quick badges
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      all: PRODUCT_GUIDES.length,
      charging: 0,
      organizer: 0,
      cabin: 0,
      'trip-tech': 0,
      adapters: 0,
    };

    PRODUCT_GUIDES.forEach((guide) => {
      counts[guide.category]++;
    });

    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      {/* 1. Header / Navigation */}
      <Navbar
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange('searchQuery', q)}
        activeCategory={filters.category}
        onCategorySelect={handleCategorySelect}
        onOpenDisclosure={() => setDisclosureOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        activeCategory={filters.category}
        onSelectCategory={handleCategorySelect}
        onScrollToGuides={scrollToGuides}
      />

      {/* 3. Sticky Filter & Search Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredGuides.length}
        categoryCounts={categoryCounts}
      />

      {/* 4. Main Buyer Guides Grid Section */}
      <main id="buyer-guides-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab-Tested EV Buyer Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {filters.category === 'all'
                ? 'Featured Gear & Field Guides'
                : `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Buyer Guides`}
            </h2>
          </div>

          <div className="text-xs text-slate-500">
            Real hardware testing • Updated for August 2026
          </div>
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 my-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Matching EV Gear Found</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              We couldn't find any guides matching "{filters.searchQuery}" under the selected filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredGuides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onOpenGuide={setSelectedGuide}
                onAmazonClick={handleAmazonClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* 5. Interactive EV Road Trip Packing Checklist */}
      <TripChecklist onOpenGuideById={handleOpenGuideById} />

      {/* 6. Amazon Compliance Footer */}
      <Footer
        onCategorySelect={handleCategorySelect}
        onOpenDisclosure={() => setDisclosureOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* 7. Product Details Breakdown Modal */}
      <ProductDetailModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
        onAmazonClick={handleAmazonClick}
      />

      {/* 8. Full Affiliate & FTC Compliance Modal */}
      <AffiliateDisclosureModal
        isOpen={disclosureOpen}
        onClose={() => setDisclosureOpen(false)}
      />

      {/* 9. Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      {/* 10. Amazon Redirection Feedback Toast */}
      <AmazonClickToast
        guide={recentAmazonClick}
        onClose={() => setRecentAmazonClick(null)}
      />
    </div>
  );
}
