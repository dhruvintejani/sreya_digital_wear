// // export interface SizeInventory {
// //   size: string;
// //   quantity: number;
// // }

// // export interface Product {
// //   id: string;
// //   name: string;
// //   category: string;
// //   price: number;
// //   images: string[]; // base64 or blob URLs
// //   sizes: string[];
// //   inventory: SizeInventory[];
// //   totalInventory: number;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // export interface Category {
// //   id: string;
// //   name: string;
// //   isCustom: boolean;
// //   createdAt: string;
// // }

// // export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

// // export interface ProductFilters {
// //   search: string;
// //   category: string;
// //   stockStatus: StockStatus | 'all';
// //   sizes: string[];
// // }

// // export interface DashboardStats {
// //   totalProducts: number;
// //   totalInventory: number;
// //   lowStockProducts: number;
// //   outOfStockProducts: number;
// // }

// // export const LOW_STOCK_THRESHOLD = 5;

// // export const DEFAULT_SIZES = [
// //   'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
// //   '28', '30', '32', '34', '36', '38', '40', '42', '44'
// // ];

// // export const DEFAULT_CATEGORIES = [
// //   'Saree', 'Kurti', 'Gown', 'Lehenga', 'Dress', 'Blouse',
// //   'Dupatta', 'Salwar Suit', 'Co-Ord Set', 'Palazzo', 'Sharara',
// //   'Anarkali', 'Night Wear', 'Kids Wear'
// // ];


// export interface SizeInventory {
//   size: string;
//   quantity: number;
// }

// export interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   images: string[];
//   sizes: string[];
//   inventory: SizeInventory[];
//   totalInventory: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Production {
//   id: string;
//   name: string;
//   category: string;
//   images: string[];
//   sizes: string[];
//   inventory: SizeInventory[];
//   totalInventory: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   isCustom?: boolean;
//   createdAt: string;
// }

// export interface SizeOption {
//   id: string;
//   name: string;
//   createdAt: string;
// }

// export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

// export interface ProductFilters {
//   search: string;
//   category: string;
//   stockStatus: StockStatus | 'all';
//   sizes: string[];
// }

// export interface ProductionFilters {
//   search: string;
//   category: string;
// }

// export interface DashboardStats {
//   totalProducts: number;
//   totalInventory: number;
//   lowStockProducts: number;
//   outOfStockProducts: number;
// }

// export const LOW_STOCK_THRESHOLD = 5;

// export const DEFAULT_SIZES = [
//   'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL',
//   '28', '30', '32', '34', '36', '38', '40', '42', '44',
// ];

// export const DEFAULT_CATEGORIES = [
//   'Saree', 'Kurti', 'Gown', 'Tunic', 'Lehenga', 'Dress', 'Blouse',
//   'Dupatta', 'Salwar Suit', 'Co-Ord Set', 'Palazzo', 'Sharara',
//   'Anarkali', 'Night Wear', 'Kids Wear',
// ];

// // Helper: convert backend product shape → frontend Product
// export function mapProduct(p: Record<string, unknown>): Product {
//   const sizes = (p.sizes as SizeInventory[] | undefined) ?? [];
//   return {
//     id: p.id as string,
//     name: p.name as string,
//     category: p.category as string,
//     price: p.price as number,
//     images: (p.images as string[]) ?? [],
//     sizes: sizes.map((s) => s.size),
//     inventory: sizes,
//     totalInventory: (p.total_inventory as number) ?? 0,
//     createdAt: (p.created_at as string) ?? new Date().toISOString(),
//     updatedAt: (p.updated_at as string) ?? new Date().toISOString(),
//   };
// }

// // Helper: convert backend production shape → frontend Production
// export function mapProduction(p: Record<string, unknown>): Production {
//   const sizes = (p.sizes as SizeInventory[] | undefined) ?? [];
//   return {
//     id: p.id as string,
//     name: p.name as string,
//     category: p.category as string,
//     images: (p.images as string[]) ?? [],
//     sizes: sizes.map((s) => s.size),
//     inventory: sizes,
//     totalInventory: (p.total_inventory as number) ?? 0,
//     createdAt: (p.created_at as string) ?? new Date().toISOString(),
//     updatedAt: (p.updated_at as string) ?? new Date().toISOString(),
//   };
// }

export interface SizeInventory {
  size: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  sizes: string[];
  inventory: SizeInventory[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export interface Production {
  id: string;
  productId?: string;
  name: string;
  category: string;
  images: string[];
  sizes: string[];
  inventory: SizeInventory[];
  totalInventory: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClothItem {
  item: string;   // label e.g. "Main Fabric"
  meters: number;
}

export interface Cloth {
  id: string;
  productId: string;
  name: string;
  images: string[];
  items: ClothItem[];
  totalMeters: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  isCustom?: boolean;
  createdAt: string;
}

export interface SizeOption {
  id: string;
  name: string;
  createdAt: string;
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductFilters {
  search: string;
  category: string;
  stockStatus: StockStatus | 'all';
  sizes: string[];
}

export interface ProductionFilters {
  search: string;
  category: string;
}

export interface ClothFilters {
  search: string;
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
  '28', '30', '32', '34', '36', '38', '40', '42', '44',
];

export const DEFAULT_CATEGORIES = [
  'Saree', 'Kurti', 'Gown', 'Lehenga', 'Dress', 'Blouse',
  'Dupatta', 'Salwar Suit', 'Co-Ord Set', 'Palazzo', 'Sharara',
  'Anarkali', 'Night Wear', 'Kids Wear',
];

export function mapProduct(p: Record<string, unknown>): Product {
  const sizes = (p.sizes as SizeInventory[] | undefined) ?? [];
  return {
    id: p.id as string,
    name: p.name as string,
    category: p.category as string,
    price: p.price as number,
    images: (p.images as string[]) ?? [],
    sizes: sizes.map((s) => s.size),
    inventory: sizes,
    totalInventory: (p.total_inventory as number) ?? 0,
    createdAt: (p.created_at as string) ?? new Date().toISOString(),
    updatedAt: (p.updated_at as string) ?? new Date().toISOString(),
  };
}

export function mapProduction(p: Record<string, unknown>): Production {
  const sizes = (p.sizes as SizeInventory[] | undefined) ?? [];
  return {
    id: p.id as string,
    productId: p.product_id as string | undefined,
    name: p.name as string,
    category: p.category as string,
    images: (p.images as string[]) ?? [],
    sizes: sizes.map((s) => s.size),
    inventory: sizes,
    totalInventory: (p.total_inventory as number) ?? 0,
    createdAt: (p.created_at as string) ?? new Date().toISOString(),
    updatedAt: (p.updated_at as string) ?? new Date().toISOString(),
  };
}

export function mapCloth(c: Record<string, unknown>): Cloth {
  return {
    id: c.id as string,
    productId: c.product_id as string,
    name: c.name as string,
    images: (c.images as string[]) ?? [],
    items: (c.items as ClothItem[]) ?? [],
    totalMeters: (c.total_meters as number) ?? 0,
    createdAt: (c.created_at as string) ?? new Date().toISOString(),
    updatedAt: (c.updated_at as string) ?? new Date().toISOString(),
  };
}