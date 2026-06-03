import { create } from 'zustand';
import { Product, Category, ProductFilters, DEFAULT_CATEGORIES, LOW_STOCK_THRESHOLD } from '@/types';
import { db, seedCategories } from '@/lib/db';

interface ProductState {
  products: Product[];
  categories: Category[];
  filters: ProductFilters;
  isLoading: boolean;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<Category>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;

  // Computed (derived)
  getFilteredProducts: () => Product[];
  getLowStockProducts: () => Product[];
  getOutOfStockProducts: () => Product[];
  getDashboardStats: () => {
    totalProducts: number;
    totalInventory: number;
    lowStockProducts: number;
    outOfStockProducts: number;
  };
  getProductById: (id: string) => Product | undefined;
}

const defaultFilters: ProductFilters = {
  search: '',
  category: '',
  stockStatus: 'all',
  sizes: [],
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  filters: defaultFilters,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      await seedCategories(DEFAULT_CATEGORIES);
      const [products, categories] = await Promise.all([
        db.products.orderBy('createdAt').reverse().toArray(),
        db.categories.orderBy('name').toArray(),
      ]);
      set({ products, categories, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize database:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addProduct: async (productData) => {
    const now = new Date().toISOString();
    const totalInventory = productData.inventory.reduce((sum, s) => sum + s.quantity, 0);
    const product: Product = {
      ...productData,
      id: crypto.randomUUID(),
      totalInventory,
      createdAt: now,
      updatedAt: now,
    };
    await db.products.add(product);
    set((state) => ({ products: [product, ...state.products] }));
    return product;
  },

  updateProduct: async (id, updates) => {
    const now = new Date().toISOString();
    const updatedInventory = updates.inventory;
    const totalInventory = updatedInventory
      ? updatedInventory.reduce((sum, s) => sum + s.quantity, 0)
      : undefined;

    const finalUpdates = {
      ...updates,
      ...(totalInventory !== undefined ? { totalInventory } : {}),
      updatedAt: now,
    };

    await db.products.update(id, finalUpdates);
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...finalUpdates } : p
      ),
    }));
  },

  deleteProduct: async (id) => {
    await db.products.delete(id);
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  addCategory: async (name) => {
    const existing = get().categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) return existing;

    const category: Category = {
      id: crypto.randomUUID(),
      name,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };
    await db.categories.add(category);
    set((state) => ({
      categories: [...state.categories, category].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
    return category;
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  clearFilters: () => {
    set({ filters: defaultFilters });
  },

  getFilteredProducts: () => {
    const { products, filters } = get();
    return products.filter((product) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesCategory = product.category.toLowerCase().includes(search);
        if (!matchesName && !matchesCategory) return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Stock status filter
      if (filters.stockStatus !== 'all') {
        const hasOutOfStock = product.inventory.some((s) => s.quantity === 0);
        const hasLowStock = product.inventory.some(
          (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
        );
        if (filters.stockStatus === 'out-of-stock' && !hasOutOfStock) return false;
        if (filters.stockStatus === 'low-stock' && !hasLowStock) return false;
        if (filters.stockStatus === 'in-stock' && (hasOutOfStock || hasLowStock)) return false;
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((size) =>
          product.inventory.some((s) => s.size === size)
        );
        if (!hasSize) return false;
      }

      return true;
    });
  },

  getLowStockProducts: () => {
    const { products } = get();
    return products.filter((product) =>
      product.inventory.some(
        (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
      )
    );
  },

  getOutOfStockProducts: () => {
    const { products } = get();
    return products.filter((product) =>
      product.inventory.some((s) => s.quantity === 0)
    );
  },

  getDashboardStats: () => {
    const { products } = get();
    const totalInventory = products.reduce((sum, p) => sum + p.totalInventory, 0);
    const lowStockProducts = products.filter((p) =>
      p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
    ).length;
    const outOfStockProducts = products.filter((p) =>
      p.inventory.some((s) => s.quantity === 0)
    ).length;

    return {
      totalProducts: products.length,
      totalInventory,
      lowStockProducts,
      outOfStockProducts,
    };
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },
}));
