// // // import { create } from 'zustand';
// // // import { Production, ProductionFilters, mapProduction } from '@/types';
// // // import { productionApi } from '@/lib/api';

// // // interface ProductionState {
// // //   productions: Production[];
// // //   filters: ProductionFilters;
// // //   isLoading: boolean;
// // //   isInitialized: boolean;

// // //   initialize: () => Promise<void>;
// // //   addProduction: (data: {
// // //     name: string;
// // //     category: string;
// // //     images: string[];
// // //     inventory: { size: string; quantity: number }[];
// // //   }) => Promise<Production>;
// // //   updateProduction: (id: string, updates: Partial<Omit<Production, 'id' | 'createdAt'>>) => Promise<void>;
// // //   deleteProduction: (id: string) => Promise<void>;
// // //   setFilters: (filters: Partial<ProductionFilters>) => void;
// // //   clearFilters: () => void;

// // //   getFilteredProductions: () => Production[];
// // //   getProductionById: (id: string) => Production | undefined;
// // // }

// // // const defaultFilters: ProductionFilters = { search: '', category: '' };

// // // export const useProductionStore = create<ProductionState>((set, get) => ({
// // //   productions: [],
// // //   filters: defaultFilters,
// // //   isLoading: false,
// // //   isInitialized: false,

// // //   initialize: async () => {
// // //     set({ isLoading: true });
// // //     try {
// // //       const raw = await productionApi.list();
// // //       set({ productions: raw.map(mapProduction), isInitialized: true });
// // //     } catch (e) {
// // //       console.error('Failed to load production:', e);
// // //     } finally {
// // //       set({ isLoading: false });
// // //     }
// // //   },

// // //   addProduction: async (data) => {
// // //     const payload = {
// // //       name: data.name,
// // //       category: data.category,
// // //       images: data.images,
// // //       sizes: data.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
// // //     };
// // //     const raw = await productionApi.create(payload);
// // //     const prod = mapProduction(raw);
// // //     set((state) => ({ productions: [prod, ...state.productions] }));
// // //     return prod;
// // //   },

// // //   updateProduction: async (id, updates) => {
// // //     const payload: Record<string, unknown> = {};
// // //     if (updates.name !== undefined) payload.name = updates.name;
// // //     if (updates.category !== undefined) payload.category = updates.category;
// // //     if (updates.images !== undefined) payload.images = updates.images;
// // //     if (updates.inventory !== undefined) {
// // //       payload.sizes = updates.inventory.map((i) => ({ size: i.size, quantity: i.quantity }));
// // //     }
// // //     const raw = await productionApi.update(id, payload);
// // //     const updated = mapProduction(raw);
// // //     set((state) => ({
// // //       productions: state.productions.map((p) => (p.id === id ? updated : p)),
// // //     }));
// // //   },

// // //   deleteProduction: async (id) => {
// // //     await productionApi.delete(id);
// // //     set((state) => ({ productions: state.productions.filter((p) => p.id !== id) }));
// // //   },

// // //   setFilters: (f) =>
// // //     set((state) => ({ filters: { ...state.filters, ...f } })),

// // //   clearFilters: () => set({ filters: defaultFilters }),

// // //   getFilteredProductions: () => {
// // //     const { productions, filters } = get();
// // //     return productions.filter((p) => {
// // //       if (filters.search) {
// // //         const s = filters.search.toLowerCase();
// // //         if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s))
// // //           return false;
// // //       }
// // //       if (filters.category && p.category !== filters.category) return false;
// // //       return true;
// // //     });
// // //   },

// // //   getProductionById: (id) => get().productions.find((p) => p.id === id),
// // // }));


// // import { create } from 'zustand';
// // import { Production, ProductionFilters, mapProduction } from '@/types';
// // import { productionApi } from '@/lib/api';

// // interface ProductionState {
// //   productions: Production[];
// //   filters: ProductionFilters;
// //   isLoading: boolean;
// //   isInitialized: boolean;

// //   initialize: () => Promise<void>;
// //   // Only sizes/images can be updated — name/category come from product
// //   updateProductionSizes: (
// //     id: string,
// //     inventory: { size: string; quantity: number }[]
// //   ) => Promise<void>;
// //   setFilters: (filters: Partial<ProductionFilters>) => void;
// //   clearFilters: () => void;

// //   getFilteredProductions: () => Production[];
// //   getProductionById: (id: string) => Production | undefined;
// // }

// // const defaultFilters: ProductionFilters = { search: '', category: '' };

// // export const useProductionStore = create<ProductionState>((set, get) => ({
// //   productions: [],
// //   filters: defaultFilters,
// //   isLoading: false,
// //   isInitialized: false,

// //   initialize: async () => {
// //     set({ isLoading: true });
// //     try {
// //       const raw = await productionApi.list();
// //       set({ productions: raw.map(mapProduction), isInitialized: true });
// //     } catch (e) {
// //       console.error('Failed to load production:', e);
// //     } finally {
// //       set({ isLoading: false });
// //     }
// //   },

// //   updateProductionSizes: async (id, inventory) => {
// //     const raw = await productionApi.update(id, {
// //       sizes: inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
// //     });
// //     const updated = mapProduction(raw);
// //     set((state) => ({
// //       productions: state.productions.map((p) => (p.id === id ? updated : p)),
// //     }));
// //   },

// //   setFilters: (f) =>
// //     set((state) => ({ filters: { ...state.filters, ...f } })),

// //   clearFilters: () => set({ filters: defaultFilters }),

// //   getFilteredProductions: () => {
// //     const { productions, filters } = get();
// //     return productions.filter((p) => {
// //       if (filters.search) {
// //         const s = filters.search.toLowerCase();
// //         if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s))
// //           return false;
// //       }
// //       if (filters.category && p.category !== filters.category) return false;
// //       return true;
// //     });
// //   },

// //   getProductionById: (id) => get().productions.find((p) => p.id === id),
// // }));

// import { create } from 'zustand';
// import { Production, ProductionFilters, mapProduction } from '@/types';
// import { productionApi } from '@/lib/api';

// interface ProductionState {
//   productions: Production[];
//   filters: ProductionFilters;
//   isLoading: boolean;
//   isInitialized: boolean;

//   initialize: () => Promise<void>;
//   // addProduction is kept for manual "Add to Production" button in ProductDetail/Products
//   addProduction: (data: {
//     name: string;
//     category: string;
//     images: string[];
//     inventory: { size: string; quantity: number }[];
//   }) => Promise<Production>;
//   // Only sizes can be updated by user - name/category come from product
//   updateProductionSizes: (
//     id: string,
//     inventory: { size: string; quantity: number }[]
//   ) => Promise<void>;
//   setFilters: (filters: Partial<ProductionFilters>) => void;
//   clearFilters: () => void;

//   getFilteredProductions: () => Production[];
//   getProductionById: (id: string) => Production | undefined;
// }

// const defaultFilters: ProductionFilters = { search: '', category: '' };

// export const useProductionStore = create<ProductionState>((set, get) => ({
//   productions: [],
//   filters: defaultFilters,
//   isLoading: false,
//   isInitialized: false,

//   initialize: async () => {
//     set({ isLoading: true });
//     try {
//       const raw = await productionApi.list();
//       set({ productions: raw.map(mapProduction), isInitialized: true });
//     } catch (e) {
//       console.error('Failed to load production:', e);
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   addProduction: async (data) => {
//     const payload = {
//       name: data.name,
//       category: data.category,
//       images: data.images,
//       sizes: data.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
//     };
//     const raw = await productionApi.create(payload);
//     const prod = mapProduction(raw);
//     set((state) => ({ productions: [prod, ...state.productions] }));
//     return prod;
//   },

//   updateProductionSizes: async (id, inventory) => {
//     const raw = await productionApi.update(id, {
//       sizes: inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
//     });
//     const updated = mapProduction(raw);
//     set((state) => ({
//       productions: state.productions.map((p) => (p.id === id ? updated : p)),
//     }));
//   },

//   setFilters: (f) =>
//     set((state) => ({ filters: { ...state.filters, ...f } })),

//   clearFilters: () => set({ filters: defaultFilters }),

//   getFilteredProductions: () => {
//     const { productions, filters } = get();
//     return productions.filter((p) => {
//       if (filters.search) {
//         const s = filters.search.toLowerCase();
//         if (
//           !p.name.toLowerCase().includes(s) &&
//           !p.category.toLowerCase().includes(s)
//         )
//           return false;
//       }
//       if (filters.category && p.category !== filters.category) return false;
//       return true;
//     });
//   },

//   getProductionById: (id) => get().productions.find((p) => p.id === id),
// }));


import { create } from 'zustand';
import { Production, ProductionFilters, mapProduction } from '@/types';
import { productionApi } from '@/lib/api';

interface ProductionState {
  productions: Production[];
  filters: ProductionFilters;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  refresh: () => Promise<void>;
  addProduction: (data: {
    name: string;
    category: string;
    images: string[];
    inventory: { size: string; quantity: number }[];
  }) => Promise<Production>;
  updateProductionSizes: (
    id: string,
    inventory: { size: string; quantity: number }[]
  ) => Promise<void>;
  setFilters: (filters: Partial<ProductionFilters>) => void;
  clearFilters: () => void;

  getFilteredProductions: () => Production[];
  getProductionById: (id: string) => Production | undefined;
}

const defaultFilters: ProductionFilters = { search: '', category: '' };

export const useProductionStore = create<ProductionState>((set, get) => ({
  productions: [],
  filters: defaultFilters,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const raw = await productionApi.list();
      set({ productions: raw.map(mapProduction), isInitialized: true });
    } catch (e) {
      console.error('Failed to load production:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  // Lightweight refresh — no loading spinner, just silently updates list
  refresh: async () => {
    try {
      const raw = await productionApi.list();
      set({ productions: raw.map(mapProduction) });
    } catch (e) {
      console.error('Failed to refresh production:', e);
    }
  },

  addProduction: async (data) => {
    const payload = {
      name: data.name,
      category: data.category,
      images: data.images,
      sizes: data.inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
    };
    const raw = await productionApi.create(payload);
    const prod = mapProduction(raw);
    set((state) => ({ productions: [prod, ...state.productions] }));
    return prod;
  },

  updateProductionSizes: async (id, inventory) => {
    const raw = await productionApi.update(id, {
      sizes: inventory.map((i) => ({ size: i.size, quantity: i.quantity })),
    });
    const updated = mapProduction(raw);
    set((state) => ({
      productions: state.productions.map((p) => (p.id === id ? updated : p)),
    }));
  },

  setFilters: (f) =>
    set((state) => ({ filters: { ...state.filters, ...f } })),

  clearFilters: () => set({ filters: defaultFilters }),

  getFilteredProductions: () => {
    const { productions, filters } = get();
    return productions.filter((p) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(s) &&
          !p.category.toLowerCase().includes(s)
        )
          return false;
      }
      if (filters.category && p.category !== filters.category) return false;
      return true;
    });
  },

  getProductionById: (id) => get().productions.find((p) => p.id === id),
}));