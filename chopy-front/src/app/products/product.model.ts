export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface ProductsPage {
  items: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilter {
  q?: string;
  category?: string;
}

export interface ShowcaseData {
  products: ProductsPage;
  categories: string[];
}
