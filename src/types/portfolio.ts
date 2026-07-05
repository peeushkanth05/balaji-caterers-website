// =============================================================================
// Portfolio Management — TypeScript Interfaces
// =============================================================================

export interface PortfolioCategoryData {
  id: string;
  categoryName: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  bannerImage?: string | null;
  displayOrder: number;
  active: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  _count?: {
    portfolios: number;
  };
}

export interface PortfolioData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  categoryId: string;
  category?: PortfolioCategoryData;
  coverImage: string;
  galleryImages: string[]; // Parsed from JSON string in API
  featuredImage?: string | null;
  altText?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  tags: string[]; // Parsed from JSON string in API
  featured: boolean;
  displayOrder: number;
  active: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface PortfolioFilterQuery {
  category?: string;
  search?: string;
  sort?: "latest" | "oldest" | "title" | "displayOrder" | "featured";
  featuredOnly?: boolean;
}
