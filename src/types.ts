export type CategoryType = 'all' | 'charging' | 'organizer' | 'cabin' | 'trip-tech' | 'adapters';

export type BadgeType = "Editor's Choice" | "Best Value" | "Top Rated" | "Premium Pick" | "Road Trip Essential";

export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface SpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductGuide {
  id: string;
  title: string;
  subtitle: string;
  category: 'charging' | 'organizer' | 'cabin' | 'trip-tech' | 'adapters';
  categoryLabel: string;
  badge: BadgeType;
  readTime: string;
  testedRating: number;
  amazonRating: number;
  amazonReviewCount: number;
  estimatedPrice: string;
  originalPrice?: string;
  priceTier: '$' | '$$' | '$$$';
  primeEligible: boolean;
  amazonAsin: string;
  affiliateUrl: string;
  imageUrl: string;
  secondaryImages?: string[];
  summary: string;
  labVerdict: string;
  pros: string[];
  cons: string[];
  specs: SpecItem[];
  keyFeatures: string[];
  vehicleCompatibility: string[];
  inTheBox: string[];
  faqs: FAQItem[];
  lastUpdated: string;
  author: Author;
  deepDiveAnalysis: string[];
}

export interface FilterState {
  searchQuery: string;
  category: CategoryType;
  sortBy: 'featured' | 'rating' | 'price-low' | 'price-high' | 'reviews';
  vehicleFilter: string;
  priceFilter: 'all' | 'under-50' | '50-150' | '150-plus';
}
