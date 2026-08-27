import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  X, 
  Menu, 
  ShieldCheck, 
  Info,
  Car,
  Package,
  Compass
} from 'lucide-react';
import { CategoryType } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: CategoryType;
  onCategorySelect: (category: CategoryType) => void;
  onOpenDisclosure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  onOpenDisclosure,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleNavClick = (cat: CategoryType) => {
    onCategorySelect(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('buyer-guides-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Affiliate Compliance Ribbon */}
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('all')} 
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            id="brand-logo"
          >
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
          </div>

          {/* Search Bar - Center Desktop */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-blue-500' : ''} rounded-full`}>
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search gear, chargers, floor mats, adapters..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100 border-none rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('all')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              Buyer Guides
            </button>
            <button
              onClick={() => handleNavClick('charging')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === 'charging'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-blue-600" />
              Charging Tech
            </button>
            <button
              onClick={() => handleNavClick('cabin')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === 'cabin'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Car className="w-4 h-4 text-slate-500" />
              Cabin Accessories
            </button>
            <button
              onClick={() => handleNavClick('organizer')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === 'organizer'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4 text-slate-500" />
              Cable Storage
            </button>
            <button
              onClick={() => handleNavClick('trip-tech')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeCategory === 'trip-tech'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-slate-500" />
              Trip Tech
            </button>
          </nav>

          {/* Mobile Search & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search EV chargers, mats, cables..."
              className="w-full pl-9 pr-8 py-2 bg-slate-100 border-none rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1 bg-white">
            <button
              onClick={() => handleNavClick('all')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeCategory === 'all' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Buyer Guides & Gear
            </button>
            <button
              onClick={() => handleNavClick('charging')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeCategory === 'charging' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-blue-600" />
              Level 2 & Portable Chargers
            </button>
            <button
              onClick={() => handleNavClick('cabin')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeCategory === 'cabin' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Car className="w-4 h-4 text-slate-500" />
              All-Weather Mats & Cabin Gear
            </button>
            <button
              onClick={() => handleNavClick('organizer')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeCategory === 'organizer' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4 text-slate-500" />
              Cable Reels & Trunk Storage
            </button>
            <button
              onClick={() => handleNavClick('trip-tech')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeCategory === 'trip-tech' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-slate-500" />
              Road Trip Tech & Inflators
            </button>
            <button
              onClick={() => handleNavClick('adapters')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeCategory === 'adapters' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              NACS & Supercharger Adapters
            </button>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => {
                  onOpenDisclosure();
                  setMobileMenuOpen(false);
                }}
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

