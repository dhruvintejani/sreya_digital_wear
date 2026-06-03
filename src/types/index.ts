export interface SizeInventory {
  size: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[]; // base64 or blob URLs
  sizes: string[];
  inventory: SizeInventory[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  isCustom: boolean;
  createdAt: string;
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductFilters {
  search: string;
  category: string;
  stockStatus: StockStatus | 'all';
  sizes: string[];
}

export interface DashboardStats {
  totalProducts: number;
  totalInventory: number;
  lowStockProducts: number;
  outOfStockProducts: number;
}

export const LOW_STOCK_THRESHOLD = 5;

export const DEFAULT_SIZES = [
  'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
  '28', '30', '32', '34', '36', '38', '40', '42', '44'
];

export const DEFAULT_CATEGORIES = [
  'Saree', 'Kurti', 'Gown', 'Lehenga', 'Dress', 'Blouse',
  'Dupatta', 'Salwar Suit', 'Co-Ord Set', 'Palazzo', 'Sharara',
  'Anarkali', 'Night Wear', 'Kids Wear'
];
