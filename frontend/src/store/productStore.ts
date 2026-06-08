// // // // import { create } from 'zustand';
// // // // import { Product, Category, ProductFilters, DEFAULT_CATEGORIES, LOW_STOCK_THRESHOLD } from '@/types';
// // // // import { db, seedCategories } from '@/lib/db';

// // // // interface ProductState {
// // // //   products: Product[];
// // // //   categories: Category[];
// // // //   filters: ProductFilters;
// // // //   isLoading: boolean;
// // // //   isInitialized: boolean;

// // // //   // Actions
// // // //   initialize: () => Promise<void>;
// // // //   addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Product>;
// // // //   updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
// // // //   deleteProduct: (id: string) => Promise<void>;
// // // //   addCategory: (name: string) => Promise<Category>;
// // // //   setFilters: (filters: Partial<ProductFilters>) => void;
// // // //   clearFilters: () => void;

// // // //   // Computed (derived)
// // // //   getFilteredProducts: () => Product[];
// // // //   getLowStockProducts: () => Product[];
// // // //   getOutOfStockProducts: () => Product[];
// // // //   getDashboardStats: () => {
// // // //     totalProducts: number;
// // // //     totalInventory: number;
// // // //     lowStockProducts: number;
// // // //     outOfStockProducts: number;
// // // //   };
// // // //   getProductById: (id: string) => Product | undefined;
// // // // }

// // // // const defaultFilters: ProductFilters = {
// // // //   search: '',
// // // //   category: '',
// // // //   stockStatus: 'all',
// // // //   sizes: [],
// // // // };

// // // // export const useProductStore = create<ProductState>((set, get) => ({
// // // //   products: [],
// // // //   categories: [],
// // // //   filters: defaultFilters,
// // // //   isLoading: false,
// // // //   isInitialized: false,

// // // //   initialize: async () => {
// // // //     set({ isLoading: true });
// // // //     try {
// // // //       await seedCategories(DEFAULT_CATEGORIES);
// // // //       const [products, categories] = await Promise.all([
// // // //         db.products.orderBy('createdAt').reverse().toArray(),
// // // //         db.categories.orderBy('name').toArray(),
// // // //       ]);
// // // //       set({ products, categories, isInitialized: true });
// // // //     } catch (error) {
// // // //       console.error('Failed to initialize database:', error);
// // // //     } finally {
// // // //       set({ isLoading: false });
// // // //     }
// // // //   },

// // // //   addProduct: async (productData) => {
// // // //     const now = new Date().toISOString();
// // // //     const totalInventory = productData.inventory.reduce((sum, s) => sum + s.quantity, 0);
// // // //     const product: Product = {
// // // //       ...productData,
// // // //       id: crypto.randomUUID(),
// // // //       totalInventory,
// // // //       createdAt: now,
// // // //       updatedAt: now,
// // // //     };
// // // //     await db.products.add(product);
// // // //     set((state) => ({ products: [product, ...state.products] }));
// // // //     return product;
// // // //   },

// // // //   updateProduct: async (id, updates) => {
// // // //     const now = new Date().toISOString();
// // // //     const updatedInventory = updates.inventory;
// // // //     const totalInventory = updatedInventory
// // // //       ? updatedInventory.reduce((sum, s) => sum + s.quantity, 0)
// // // //       : undefined;

// // // //     const finalUpdates = {
// // // //       ...updates,
// // // //       ...(totalInventory !== undefined ? { totalInventory } : {}),
// // // //       updatedAt: now,
// // // //     };

// // // //     await db.products.update(id, finalUpdates);
// // // //     set((state) => ({
// // // //       products: state.products.map((p) =>
// // // //         p.id === id ? { ...p, ...finalUpdates } : p
// // // //       ),
// // // //     }));
// // // //   },

// // // //   deleteProduct: async (id) => {
// // // //     await db.products.delete(id);
// // // //     set((state) => ({
// // // //       products: state.products.filter((p) => p.id !== id),
// // // //     }));
// // // //   },

// // // //   addCategory: async (name) => {
// // // //     const existing = get().categories.find(
// // // //       (c) => c.name.toLowerCase() === name.toLowerCase()
// // // //     );
// // // //     if (existing) return existing;

// // // //     const category: Category = {
// // // //       id: crypto.randomUUID(),
// // // //       name,
// // // //       isCustom: true,
// // // //       createdAt: new Date().toISOString(),
// // // //     };
// // // //     await db.categories.add(category);
// // // //     set((state) => ({
// // // //       categories: [...state.categories, category].sort((a, b) =>
// // // //         a.name.localeCompare(b.name)
// // // //       ),
// // // //     }));
// // // //     return category;
// // // //   },

// // // //   setFilters: (newFilters) => {
// // // //     set((state) => ({
// // // //       filters: { ...state.filters, ...newFilters },
// // // //     }));
// // // //   },

// // // //   clearFilters: () => {
// // // //     set({ filters: defaultFilters });
// // // //   },

// // // //   getFilteredProducts: () => {
// // // //     const { products, filters } = get();
// // // //     return products.filter((product) => {
// // // //       // Search filter
// // // //       if (filters.search) {
// // // //         const search = filters.search.toLowerCase();
// // // //         const matchesName = product.name.toLowerCase().includes(search);
// // // //         const matchesCategory = product.category.toLowerCase().includes(search);
// // // //         if (!matchesName && !matchesCategory) return false;
// // // //       }

// // // //       // Category filter
// // // //       if (filters.category && product.category !== filters.category) {
// // // //         return false;
// // // //       }

// // // //       // Stock status filter
// // // //       if (filters.stockStatus !== 'all') {
// // // //         const hasOutOfStock = product.inventory.some((s) => s.quantity === 0);
// // // //         const hasLowStock = product.inventory.some(
// // // //           (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
// // // //         );
// // // //         if (filters.stockStatus === 'out-of-stock' && !hasOutOfStock) return false;
// // // //         if (filters.stockStatus === 'low-stock' && !hasLowStock) return false;
// // // //         if (filters.stockStatus === 'in-stock' && (hasOutOfStock || hasLowStock)) return false;
// // // //       }

// // // //       // Size filter
// // // //       if (filters.sizes.length > 0) {
// // // //         const hasSize = filters.sizes.some((size) =>
// // // //           product.inventory.some((s) => s.size === size)
// // // //         );
// // // //         if (!hasSize) return false;
// // // //       }

// // // //       return true;
// // // //     });
// // // //   },

// // // //   getLowStockProducts: () => {
// // // //     const { products } = get();
// // // //     return products.filter((product) =>
// // // //       product.inventory.some(
// // // //         (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
// // // //       )
// // // //     );
// // // //   },

// // // //   getOutOfStockProducts: () => {
// // // //     const { products } = get();
// // // //     return products.filter((product) =>
// // // //       product.inventory.some((s) => s.quantity === 0)
// // // //     );
// // // //   },

// // // //   getDashboardStats: () => {
// // // //     const { products } = get();
// // // //     const totalInventory = products.reduce((sum, p) => sum + p.totalInventory, 0);
// // // //     const lowStockProducts = products.filter((p) =>
// // // //       p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
// // // //     ).length;
// // // //     const outOfStockProducts = products.filter((p) =>
// // // //       p.inventory.some((s) => s.quantity === 0)
// // // //     ).length;

// // // //     return {
// // // //       totalProducts: products.length,
// // // //       totalInventory,
// // // //       lowStockProducts,
// // // //       outOfStockProducts,
// // // //     };
// // // //   },

// // // //   getProductById: (id) => {
// // // //     return get().products.find((p) => p.id === id);
// // // //   },
// // // // }));


// // // import { create } from 'zustand';
// // // import { Product, Category, SizeOption, ProductFilters, LOW_STOCK_THRESHOLD, mapProduct } from '@/types';
// // // import { productsApi, categoriesApi } from '@/lib/api';

// // // interface ProductState {
// // //   products: Product[];
// // //   categories: Category[];
// // //   sizes: SizeOption[];
// // //   filters: ProductFilters;
// // //   isLoading: boolean;
// // //   isInitialized: boolean;

// // //   // Actions
// // //   initialize: () => Promise<void>;
// // //   addProduct: (product: {
// // //     name: string;
// // //     category: string;
// // //     price: number;
// // //     images: string[];
// // //     sizes: string[];
// // //     inventory: { size: string; quantity: number }[];
// // //     totalInventory: number;
// // //   }) => Promise<Product>;
// // //   updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
// // //   deleteProduct: (id: string) => Promise<void>;
// // //   addCategory: (name: string) => Promise<Category>;
// // //   addSize: (name: string) => Promise<SizeOption>;
// // //   setFilters: (filters: Partial<ProductFilters>) => void;
// // //   clearFilters: () => void;
// // //   refreshProducts: () => Promise<void>;

// // //   // Computed
// // //   getFilteredProducts: () => Product[];
// // //   getLowStockProducts: () => Product[];
// // //   getOutOfStockProducts: () => Product[];
// // //   getDashboardStats: () => {
// // //     totalProducts: number;
// // //     totalInventory: number;
// // //     lowStockProducts: number;
// // //     outOfStockProducts: number;
// // //   };
// // //   getProductById: (id: string) => Product | undefined;
// // // }

// // // const defaultFilters: ProductFilters = {
// // //   search: '',
// // //   category: '',
// // //   stockStatus: 'all',
// // //   sizes: [],
// // // };

// // // export const useProductStore = create<ProductState>((set, get) => ({
// // //   products: [],
// // //   categories: [],
// // //   sizes: [],
// // //   filters: defaultFilters,
// // //   isLoading: false,
// // //   isInitialized: false,

// // //   initialize: async () => {
// // //     set({ isLoading: true });
// // //     try {
// // //       const [rawProducts, categories, sizes] = await Promise.all([
// // //         productsApi.list(),
// // //         categoriesApi.list(),
// // //         categoriesApi.listSizes(),
// // //       ]);
// // //       const products = rawProducts.map(mapProduct);
// // //       set({ products, categories, sizes, isInitialized: true });
// // //     } catch (error) {
// // //       console.error('Failed to initialize:', error);
// // //     } finally {
// // //       set({ isLoading: false });
// // //     }
// // //   },

// // //   refreshProducts: async () => {
// // //     const rawProducts = await productsApi.list();
// // //     set({ products: rawProducts.map(mapProduct) });
// // //   },

// // //   addProduct: async (productData) => {
// // //     const payload = {
// // //       name: productData.name,
// // //       category: productData.category,
// // //       price: productData.price,
// // //       images: productData.images,
// // //       sizes: productData.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
// // //     };
// // //     const raw = await productsApi.create(payload);
// // //     const product = mapProduct(raw);
// // //     set((state) => ({ products: [product, ...state.products] }));
// // //     return product;
// // //   },

// // //   updateProduct: async (id, updates) => {
// // //     const payload: Record<string, unknown> = {};
// // //     if (updates.name !== undefined) payload.name = updates.name;
// // //     if (updates.category !== undefined) payload.category = updates.category;
// // //     if (updates.price !== undefined) payload.price = updates.price;
// // //     if (updates.images !== undefined) payload.images = updates.images;
// // //     if (updates.inventory !== undefined) {
// // //       payload.sizes = updates.inventory.map((i) => ({ size: i.size, quantity: i.quantity }));
// // //     }
// // //     const raw = await productsApi.update(id, payload);
// // //     const updated = mapProduct(raw);
// // //     set((state) => ({
// // //       products: state.products.map((p) => (p.id === id ? updated : p)),
// // //     }));
// // //   },

// // //   deleteProduct: async (id) => {
// // //     await productsApi.delete(id);
// // //     set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
// // //   },

// // //   addCategory: async (name) => {
// // //     const existing = get().categories.find(
// // //       (c) => c.name.toLowerCase() === name.toLowerCase()
// // //     );
// // //     if (existing) return existing;
// // //     const cat = await categoriesApi.create(name);
// // //     const newCat: Category = {
// // //       id: cat.id,
// // //       name: cat.name,
// // //       isCustom: true,
// // //       createdAt: cat.created_at,
// // //     };
// // //     set((state) => ({
// // //       categories: [...state.categories, newCat].sort((a, b) =>
// // //         a.name.localeCompare(b.name)
// // //       ),
// // //     }));
// // //     return newCat;
// // //   },

// // //   addSize: async (name) => {
// // //     const existing = get().sizes.find(
// // //       (s) => s.name.toLowerCase() === name.toLowerCase()
// // //     );
// // //     if (existing) return existing;
// // //     const raw = await categoriesApi.createSize(name);
// // //     const newSize: SizeOption = {
// // //       id: raw.id,
// // //       name: raw.name,
// // //       createdAt: raw.created_at,
// // //     };
// // //     set((state) => ({ sizes: [...state.sizes, newSize] }));
// // //     return newSize;
// // //   },

// // //   setFilters: (newFilters) => {
// // //     set((state) => ({ filters: { ...state.filters, ...newFilters } }));
// // //   },

// // //   clearFilters: () => {
// // //     set({ filters: defaultFilters });
// // //   },

// // //   getFilteredProducts: () => {
// // //     const { products, filters } = get();
// // //     return products.filter((product) => {
// // //       if (filters.search) {
// // //         const s = filters.search.toLowerCase();
// // //         if (
// // //           !product.name.toLowerCase().includes(s) &&
// // //           !product.category.toLowerCase().includes(s)
// // //         )
// // //           return false;
// // //       }
// // //       if (filters.category && product.category !== filters.category) return false;
// // //       if (filters.stockStatus !== 'all') {
// // //         const hasOut = product.inventory.some((s) => s.quantity === 0);
// // //         const hasLow = product.inventory.some(
// // //           (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
// // //         );
// // //         if (filters.stockStatus === 'out-of-stock' && !hasOut) return false;
// // //         if (filters.stockStatus === 'low-stock' && !hasLow) return false;
// // //         if (filters.stockStatus === 'in-stock' && (hasOut || hasLow)) return false;
// // //       }
// // //       if (filters.sizes.length > 0) {
// // //         const hasSize = filters.sizes.some((size) =>
// // //           product.inventory.some((s) => s.size === size)
// // //         );
// // //         if (!hasSize) return false;
// // //       }
// // //       return true;
// // //     });
// // //   },

// // //   getLowStockProducts: () =>
// // //     get().products.filter((p) =>
// // //       p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
// // //     ),

// // //   getOutOfStockProducts: () =>
// // //     get().products.filter((p) => p.inventory.some((s) => s.quantity === 0)),

// // //   getDashboardStats: () => {
// // //     const { products } = get();
// // //     return {
// // //       totalProducts: products.length,
// // //       totalInventory: products.reduce((sum, p) => sum + p.totalInventory, 0),
// // //       lowStockProducts: products.filter((p) =>
// // //         p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
// // //       ).length,
// // //       outOfStockProducts: products.filter((p) =>
// // //         p.inventory.some((s) => s.quantity === 0)
// // //       ).length,
// // //     };
// // //   },

// // //   getProductById: (id) => get().products.find((p) => p.id === id),
// // // }));

// // import { create } from 'zustand';
// // import { Product, Category, SizeOption, ProductFilters, LOW_STOCK_THRESHOLD, mapProduct } from '@/types';
// // import { productsApi, categoriesApi } from '@/lib/api';

// // interface ProductState {
// //   products: Product[];
// //   categories: Category[];
// //   sizes: SizeOption[];
// //   filters: ProductFilters;
// //   isLoading: boolean;
// //   isInitialized: boolean;

// //   // Callbacks registered by other stores so they can refresh after product changes
// //   _onProductAdded: (() => Promise<void>)[];
// //   _onProductDeleted: (() => Promise<void>)[];
// //   registerOnProductAdded: (cb: () => Promise<void>) => void;
// //   registerOnProductDeleted: (cb: () => Promise<void>) => void;

// //   initialize: () => Promise<void>;
// //   addProduct: (product: {
// //     name: string;
// //     category: string;
// //     price: number;
// //     images: string[];
// //     sizes: string[];
// //     inventory: { size: string; quantity: number }[];
// //     totalInventory: number;
// //   }) => Promise<Product>;
// //   updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
// //   deleteProduct: (id: string) => Promise<void>;
// //   addCategory: (name: string) => Promise<Category>;
// //   addSize: (name: string) => Promise<SizeOption>;
// //   setFilters: (filters: Partial<ProductFilters>) => void;
// //   clearFilters: () => void;
// //   refreshProducts: () => Promise<void>;

// //   getFilteredProducts: () => Product[];
// //   getLowStockProducts: () => Product[];
// //   getOutOfStockProducts: () => Product[];
// //   getDashboardStats: () => {
// //     totalProducts: number;
// //     totalInventory: number;
// //     lowStockProducts: number;
// //     outOfStockProducts: number;
// //   };
// //   getProductById: (id: string) => Product | undefined;
// // }

// // const defaultFilters: ProductFilters = {
// //   search: '',
// //   category: '',
// //   stockStatus: 'all',
// //   sizes: [],
// // };

// // export const useProductStore = create<ProductState>((set, get) => ({
// //   products: [],
// //   categories: [],
// //   sizes: [],
// //   filters: defaultFilters,
// //   isLoading: false,
// //   isInitialized: false,
// //   _onProductAdded: [],
// //   _onProductDeleted: [],

// //   registerOnProductAdded: (cb) => {
// //     set((state) => ({ _onProductAdded: [...state._onProductAdded, cb] }));
// //   },

// //   registerOnProductDeleted: (cb) => {
// //     set((state) => ({ _onProductDeleted: [...state._onProductDeleted, cb] }));
// //   },

// //   initialize: async () => {
// //     set({ isLoading: true });
// //     try {
// //       const [rawProducts, categories, sizes] = await Promise.all([
// //         productsApi.list(),
// //         categoriesApi.list(),
// //         categoriesApi.listSizes(),
// //       ]);
// //       const products = rawProducts.map(mapProduct);
// //       set({ products, categories, sizes, isInitialized: true });
// //     } catch (error) {
// //       console.error('Failed to initialize:', error);
// //     } finally {
// //       set({ isLoading: false });
// //     }
// //   },

// //   refreshProducts: async () => {
// //     const rawProducts = await productsApi.list();
// //     set({ products: rawProducts.map(mapProduct) });
// //   },

// //   addProduct: async (productData) => {
// //     const payload = {
// //       name: productData.name,
// //       category: productData.category,
// //       price: productData.price,
// //       images: productData.images,
// //       sizes: productData.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
// //     };
// //     const raw = await productsApi.create(payload);
// //     const product = mapProduct(raw);
// //     set((state) => ({ products: [product, ...state.products] }));

// //     // Notify production and cloths stores to refresh so new entries appear immediately
// //     const callbacks = get()._onProductAdded;
// //     await Promise.all(callbacks.map((cb) => cb().catch(console.error)));

// //     return product;
// //   },

// //   updateProduct: async (id, updates) => {
// //     const payload: Record<string, unknown> = {};
// //     if (updates.name !== undefined) payload.name = updates.name;
// //     if (updates.category !== undefined) payload.category = updates.category;
// //     if (updates.price !== undefined) payload.price = updates.price;
// //     if (updates.images !== undefined) payload.images = updates.images;
// //     if (updates.inventory !== undefined) {
// //       payload.sizes = updates.inventory.map((i) => ({ size: i.size, quantity: i.quantity }));
// //     }
// //     const raw = await productsApi.update(id, payload);
// //     const updated = mapProduct(raw);
// //     set((state) => ({
// //       products: state.products.map((p) => (p.id === id ? updated : p)),
// //     }));
// //   },

// //   deleteProduct: async (id) => {
// //     await productsApi.delete(id);
// //     set((state) => ({ products: state.products.filter((p) => p.id !== id) }));

// //     // Notify production and cloths stores to refresh after deletion
// //     const callbacks = get()._onProductDeleted;
// //     await Promise.all(callbacks.map((cb) => cb().catch(console.error)));
// //   },

// //   addCategory: async (name) => {
// //     const existing = get().categories.find(
// //       (c) => c.name.toLowerCase() === name.toLowerCase()
// //     );
// //     if (existing) return existing;
// //     const cat = await categoriesApi.create(name);
// //     const newCat: Category = {
// //       id: cat.id,
// //       name: cat.name,
// //       isCustom: true,
// //       createdAt: cat.created_at,
// //     };
// //     set((state) => ({
// //       categories: [...state.categories, newCat].sort((a, b) =>
// //         a.name.localeCompare(b.name)
// //       ),
// //     }));
// //     return newCat;
// //   },

// //   addSize: async (name) => {
// //     const existing = get().sizes.find(
// //       (s) => s.name.toLowerCase() === name.toLowerCase()
// //     );
// //     if (existing) return existing;
// //     const raw = await categoriesApi.createSize(name);
// //     const newSize: SizeOption = {
// //       id: raw.id,
// //       name: raw.name,
// //       createdAt: raw.created_at,
// //     };
// //     set((state) => ({ sizes: [...state.sizes, newSize] }));
// //     return newSize;
// //   },

// //   setFilters: (newFilters) => {
// //     set((state) => ({ filters: { ...state.filters, ...newFilters } }));
// //   },

// //   clearFilters: () => {
// //     set({ filters: defaultFilters });
// //   },

// //   getFilteredProducts: () => {
// //     const { products, filters } = get();
// //     return products.filter((product) => {
// //       if (filters.search) {
// //         const s = filters.search.toLowerCase();
// //         if (
// //           !product.name.toLowerCase().includes(s) &&
// //           !product.category.toLowerCase().includes(s)
// //         )
// //           return false;
// //       }
// //       if (filters.category && product.category !== filters.category) return false;
// //       if (filters.stockStatus !== 'all') {
// //         const hasOut = product.inventory.some((s) => s.quantity === 0);
// //         const hasLow = product.inventory.some(
// //           (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
// //         );
// //         if (filters.stockStatus === 'out-of-stock' && !hasOut) return false;
// //         if (filters.stockStatus === 'low-stock' && !hasLow) return false;
// //         if (filters.stockStatus === 'in-stock' && (hasOut || hasLow)) return false;
// //       }
// //       if (filters.sizes.length > 0) {
// //         const hasSize = filters.sizes.some((size) =>
// //           product.inventory.some((s) => s.size === size)
// //         );
// //         if (!hasSize) return false;
// //       }
// //       return true;
// //     });
// //   },

// //   getLowStockProducts: () =>
// //     get().products.filter((p) =>
// //       p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
// //     ),

// //   getOutOfStockProducts: () =>
// //     get().products.filter((p) => p.inventory.some((s) => s.quantity === 0)),

// //   getDashboardStats: () => {
// //     const { products } = get();
// //     return {
// //       totalProducts: products.length,
// //       totalInventory: products.reduce((sum, p) => sum + p.totalInventory, 0),
// //       lowStockProducts: products.filter((p) =>
// //         p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
// //       ).length,
// //       outOfStockProducts: products.filter((p) =>
// //         p.inventory.some((s) => s.quantity === 0)
// //       ).length,
// //     };
// //   },

// //   getProductById: (id) => get().products.find((p) => p.id === id),
// // }));

// import { create } from 'zustand';
// import { Product, Category, SizeOption, ProductFilters, LOW_STOCK_THRESHOLD, mapProduct } from '@/types';
// import { productsApi, categoriesApi } from '@/lib/api';

// interface ProductState {
//   products: Product[];
//   categories: Category[];
//   sizes: SizeOption[];
//   filters: ProductFilters;
//   isLoading: boolean;
//   isInitialized: boolean;

//   // Callbacks registered by other stores
//   _onProductAdded: (() => Promise<void>)[];
//   _onProductDeleted: (() => Promise<void>)[];
//   _onProductUpdated: (() => Promise<void>)[];
//   registerOnProductAdded: (cb: () => Promise<void>) => void;
//   registerOnProductDeleted: (cb: () => Promise<void>) => void;
//   registerOnProductUpdated: (cb: () => Promise<void>) => void;

//   initialize: () => Promise<void>;
//   addProduct: (product: {
//     name: string;
//     category: string;
//     price: number;
//     images: string[];
//     sizes: string[];
//     inventory: { size: string; quantity: number }[];
//     totalInventory: number;
//   }) => Promise<Product>;
//   updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
//   deleteProduct: (id: string) => Promise<void>;
//   addCategory: (name: string) => Promise<Category>;
//   addSize: (name: string) => Promise<SizeOption>;
//   setFilters: (filters: Partial<ProductFilters>) => void;
//   clearFilters: () => void;
//   refreshProducts: () => Promise<void>;

//   getFilteredProducts: () => Product[];
//   getLowStockProducts: () => Product[];
//   getOutOfStockProducts: () => Product[];
//   getDashboardStats: () => {
//     totalProducts: number;
//     totalInventory: number;
//     lowStockProducts: number;
//     outOfStockProducts: number;
//   };
//   getProductById: (id: string) => Product | undefined;
// }

// const defaultFilters: ProductFilters = {
//   search: '',
//   category: '',
//   stockStatus: 'all',
//   sizes: [],
// };

// export const useProductStore = create<ProductState>((set, get) => ({
//   products: [],
//   categories: [],
//   sizes: [],
//   filters: defaultFilters,
//   isLoading: false,
//   isInitialized: false,
//   _onProductAdded: [],
//   _onProductDeleted: [],
//   _onProductUpdated: [],

//   registerOnProductAdded: (cb) =>
//     set((state) => ({ _onProductAdded: [...state._onProductAdded, cb] })),

//   registerOnProductDeleted: (cb) =>
//     set((state) => ({ _onProductDeleted: [...state._onProductDeleted, cb] })),

//   registerOnProductUpdated: (cb) =>
//     set((state) => ({ _onProductUpdated: [...state._onProductUpdated, cb] })),

//   initialize: async () => {
//     set({ isLoading: true });
//     try {
//       const [rawProducts, categories, sizes] = await Promise.all([
//         productsApi.list(),
//         categoriesApi.list(),
//         categoriesApi.listSizes(),
//       ]);
//       set({ products: rawProducts.map(mapProduct), categories, sizes, isInitialized: true });
//     } catch (error) {
//       console.error('Failed to initialize:', error);
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   refreshProducts: async () => {
//     const rawProducts = await productsApi.list();
//     set({ products: rawProducts.map(mapProduct) });
//   },

//   addProduct: async (productData) => {
//     const payload = {
//       name: productData.name,
//       category: productData.category,
//       price: productData.price,
//       images: productData.images,
//       sizes: productData.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
//     };
//     const raw = await productsApi.create(payload);
//     const product = mapProduct(raw);
//     set((state) => ({ products: [product, ...state.products] }));

//     // Notify production + cloths to refresh (new entries auto-created by backend)
//     const callbacks = get()._onProductAdded;
//     await Promise.all(callbacks.map((cb) => cb().catch(console.error)));

//     return product;
//   },

//   updateProduct: async (id, updates) => {
//     const payload: Record<string, unknown> = {};
//     if (updates.name !== undefined) payload.name = updates.name;
//     if (updates.category !== undefined) payload.category = updates.category;
//     if (updates.price !== undefined) payload.price = updates.price;
//     if (updates.images !== undefined) payload.images = updates.images;
//     if (updates.inventory !== undefined) {
//       payload.sizes = updates.inventory.map((i) => ({ size: i.size, quantity: i.quantity }));
//     }

//     const raw = await productsApi.update(id, payload);
//     const updated = mapProduct(raw);
//     set((state) => ({
//       products: state.products.map((p) => (p.id === id ? updated : p)),
//     }));

//     // If name or images changed, production + cloths also updated on backend.
//     // Refresh frontend stores so the change appears immediately without page reload.
//     const nameOrImagesChanged =
//       updates.name !== undefined || updates.images !== undefined;

//     if (nameOrImagesChanged) {
//       const callbacks = get()._onProductUpdated;
//       await Promise.all(callbacks.map((cb) => cb().catch(console.error)));
//     }
//   },

//   deleteProduct: async (id) => {
//     await productsApi.delete(id);
//     set((state) => ({ products: state.products.filter((p) => p.id !== id) }));

//     // Refresh production + cloths (entries auto-deleted by backend)
//     const callbacks = get()._onProductDeleted;
//     await Promise.all(callbacks.map((cb) => cb().catch(console.error)));
//   },

//   addCategory: async (name) => {
//     const existing = get().categories.find(
//       (c) => c.name.toLowerCase() === name.toLowerCase()
//     );
//     if (existing) return existing;
//     const cat = await categoriesApi.create(name);
//     const newCat: Category = {
//       id: cat.id,
//       name: cat.name,
//       isCustom: true,
//       createdAt: cat.created_at,
//     };
//     set((state) => ({
//       categories: [...state.categories, newCat].sort((a, b) =>
//         a.name.localeCompare(b.name)
//       ),
//     }));
//     return newCat;
//   },

//   addSize: async (name) => {
//     const existing = get().sizes.find(
//       (s) => s.name.toLowerCase() === name.toLowerCase()
//     );
//     if (existing) return existing;
//     const raw = await categoriesApi.createSize(name);
//     const newSize: SizeOption = {
//       id: raw.id,
//       name: raw.name,
//       createdAt: raw.created_at,
//     };
//     set((state) => ({ sizes: [...state.sizes, newSize] }));
//     return newSize;
//   },

//   setFilters: (newFilters) =>
//     set((state) => ({ filters: { ...state.filters, ...newFilters } })),

//   clearFilters: () => set({ filters: defaultFilters }),

//   getFilteredProducts: () => {
//     const { products, filters } = get();
//     return products.filter((product) => {
//       if (filters.search) {
//         const s = filters.search.toLowerCase();
//         if (
//           !product.name.toLowerCase().includes(s) &&
//           !product.category.toLowerCase().includes(s)
//         )
//           return false;
//       }
//       if (filters.category && product.category !== filters.category) return false;
//       if (filters.stockStatus !== 'all') {
//         const hasOut = product.inventory.some((s) => s.quantity === 0);
//         const hasLow = product.inventory.some(
//           (s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD
//         );
//         if (filters.stockStatus === 'out-of-stock' && !hasOut) return false;
//         if (filters.stockStatus === 'low-stock' && !hasLow) return false;
//         if (filters.stockStatus === 'in-stock' && (hasOut || hasLow)) return false;
//       }
//       if (filters.sizes.length > 0) {
//         const hasSize = filters.sizes.some((size) =>
//           product.inventory.some((s) => s.size === size)
//         );
//         if (!hasSize) return false;
//       }
//       return true;
//     });
//   },

//   getLowStockProducts: () =>
//     get().products.filter((p) =>
//       p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
//     ),

//   getOutOfStockProducts: () =>
//     get().products.filter((p) => p.inventory.some((s) => s.quantity === 0)),

//   getDashboardStats: () => {
//     const { products } = get();
//     return {
//       totalProducts: products.length,
//       totalInventory: products.reduce((sum, p) => sum + p.totalInventory, 0),
//       lowStockProducts: products.filter((p) =>
//         p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
//       ).length,
//       outOfStockProducts: products.filter((p) =>
//         p.inventory.some((s) => s.quantity === 0)
//       ).length,
//     };
//   },

//   getProductById: (id) => get().products.find((p) => p.id === id),
// }));


import { create } from 'zustand';
import { Product, Category, SizeOption, ProductFilters, LOW_STOCK_THRESHOLD, mapProduct } from '@/types';
import { productsApi, categoriesApi } from '@/lib/api';

// Direct imports — no callback registration needed, no duplication risk
import { useProductionStore } from './productionStore';
import { useClothsStore } from './clothsStore';

interface ProductState {
  products: Product[];
  categories: Category[];
  sizes: SizeOption[];
  filters: ProductFilters;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  addProduct: (product: {
    name: string;
    category: string;
    price: number;
    images: string[];
    sizes: string[];
    inventory: { size: string; quantity: number }[];
    totalInventory: number;
  }) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (name: string) => Promise<Category>;
  addSize: (name: string) => Promise<SizeOption>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  refreshProducts: () => Promise<void>;

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
  sizes: [],
  filters: defaultFilters,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    if (get().isInitialized) return;
    set({ isLoading: true });
    try {
      const [rawProducts, categories, sizes] = await Promise.all([
        productsApi.list(),
        categoriesApi.list(),
        categoriesApi.listSizes(),
      ]);
      set({ products: rawProducts.map(mapProduct), categories, sizes, isInitialized: true });
    } catch (error) {
      console.error('Failed to initialize:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshProducts: async () => {
    const rawProducts = await productsApi.list();
    set({ products: rawProducts.map(mapProduct) });
  },

  addProduct: async (productData) => {
    const payload = {
      name: productData.name,
      category: productData.category,
      price: productData.price,
      images: productData.images,
      sizes: productData.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
    };
    const raw = await productsApi.create(payload);
    const product = mapProduct(raw);
    set((state) => ({ products: [product, ...state.products] }));

    // Backend auto-creates production + cloth entries on product creation.
    // Refresh both stores immediately so they appear without page reload.
    await Promise.all([
      useProductionStore.getState().refresh(),
      useClothsStore.getState().refresh(),
    ]);

    return product;
  },

  updateProduct: async (id, updates) => {
    const payload: Record<string, unknown> = {};
    if (updates.name !== undefined) payload.name = updates.name;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.price !== undefined) payload.price = updates.price;
    if (updates.images !== undefined) payload.images = updates.images;
    if (updates.inventory !== undefined) {
      payload.sizes = updates.inventory.map((i) => ({ size: i.size, quantity: i.quantity }));
    }

    const raw = await productsApi.update(id, payload);
    const updated = mapProduct(raw);

    set((state) => ({
      products: state.products.map((p) => (p.id === id ? updated : p)),
    }));

    // Name or images changed: backend already synced to production + cloths.
    // Now sync the frontend stores too so changes appear without page refresh.
    const nameOrImagesChanged =
      updates.name !== undefined || updates.images !== undefined;

    if (nameOrImagesChanged) {
      await Promise.all([
        useProductionStore.getState().refresh(),
        useClothsStore.getState().refresh(),
      ]);
    }
  },

  deleteProduct: async (id) => {
    await productsApi.delete(id);
    set((state) => ({ products: state.products.filter((p) => p.id !== id) }));

    await Promise.all([
      useProductionStore.getState().refresh(),
      useClothsStore.getState().refresh(),
    ]);
  },

  addCategory: async (name) => {
    const existing = get().categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) return existing;
    const cat = await categoriesApi.create(name);
    const newCat: Category = { id: cat.id, name: cat.name, isCustom: true, createdAt: cat.created_at };
    set((state) => ({
      categories: [...state.categories, newCat].sort((a, b) => a.name.localeCompare(b.name)),
    }));
    return newCat;
  },

  addSize: async (name) => {
    const existing = get().sizes.find((s) => s.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing;
    const raw = await categoriesApi.createSize(name);
    const newSize: SizeOption = { id: raw.id, name: raw.name, createdAt: raw.created_at };
    set((state) => ({ sizes: [...state.sizes, newSize] }));
    return newSize;
  },

  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),

  clearFilters: () => set({ filters: defaultFilters }),

  getFilteredProducts: () => {
    const { products, filters } = get();
    return products.filter((product) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(s) && !product.category.toLowerCase().includes(s))
          return false;
      }
      if (filters.category && product.category !== filters.category) return false;
      if (filters.stockStatus !== 'all') {
        const hasOut = product.inventory.some((s) => s.quantity === 0);
        const hasLow = product.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD);
        if (filters.stockStatus === 'out-of-stock' && !hasOut) return false;
        if (filters.stockStatus === 'low-stock' && !hasLow) return false;
        if (filters.stockStatus === 'in-stock' && (hasOut || hasLow)) return false;
      }
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((size) => product.inventory.some((s) => s.size === size));
        if (!hasSize) return false;
      }
      return true;
    });
  },

  getLowStockProducts: () =>
    get().products.filter((p) =>
      p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
    ),

  getOutOfStockProducts: () =>
    get().products.filter((p) => p.inventory.some((s) => s.quantity === 0)),

  getDashboardStats: () => {
    const { products } = get();
    return {
      totalProducts: products.length,
      totalInventory: products.reduce((sum, p) => sum + p.totalInventory, 0),
      lowStockProducts: products.filter((p) =>
        p.inventory.some((s) => s.quantity > 0 && s.quantity <= LOW_STOCK_THRESHOLD)
      ).length,
      outOfStockProducts: products.filter((p) =>
        p.inventory.some((s) => s.quantity === 0)
      ).length,
    };
  },

  getProductById: (id) => get().products.find((p) => p.id === id),
}));