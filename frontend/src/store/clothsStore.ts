// import { create } from 'zustand';
// import { Cloth, ClothFilters, ClothItem, mapCloth } from '@/types';
// import { clothsApi } from '@/lib/api';

// interface ClothsState {
//   cloths: Cloth[];
//   filters: ClothFilters;
//   isLoading: boolean;
//   isInitialized: boolean;

//   initialize: () => Promise<void>;
//   updateClothItems: (id: string, items: ClothItem[]) => Promise<void>;
//   setFilters: (filters: Partial<ClothFilters>) => void;
//   clearFilters: () => void;

//   getFilteredCloths: () => Cloth[];
//   getClothById: (id: string) => Cloth | undefined;
// }

// const defaultFilters: ClothFilters = { search: '' };

// export const useClothsStore = create<ClothsState>((set, get) => ({
//   cloths: [],
//   filters: defaultFilters,
//   isLoading: false,
//   isInitialized: false,

//   initialize: async () => {
//     set({ isLoading: true });
//     try {
//       const raw = await clothsApi.list();
//       set({ cloths: raw.map(mapCloth), isInitialized: true });
//     } catch (e) {
//       console.error('Failed to load cloths:', e);
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   updateClothItems: async (id, items) => {
//     const raw = await clothsApi.update(id, { items });
//     const updated = mapCloth(raw);
//     set((state) => ({
//       cloths: state.cloths.map((c) => (c.id === id ? updated : c)),
//     }));
//   },

//   setFilters: (f) =>
//     set((state) => ({ filters: { ...state.filters, ...f } })),

//   clearFilters: () => set({ filters: defaultFilters }),

//   getFilteredCloths: () => {
//     const { cloths, filters } = get();
//     return cloths.filter((c) => {
//       if (filters.search) {
//         const s = filters.search.toLowerCase();
//         if (!c.name.toLowerCase().includes(s)) return false;
//       }
//       return true;
//     });
//   },

//   getClothById: (id) => get().cloths.find((c) => c.id === id),
// }));


import { create } from 'zustand';
import { Cloth, ClothFilters, ClothItem, mapCloth } from '@/types';
import { clothsApi } from '@/lib/api';

interface ClothsState {
  cloths: Cloth[];
  filters: ClothFilters;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  refresh: () => Promise<void>;
  updateClothItems: (id: string, items: ClothItem[]) => Promise<void>;
  setFilters: (filters: Partial<ClothFilters>) => void;
  clearFilters: () => void;

  getFilteredCloths: () => Cloth[];
  getClothById: (id: string) => Cloth | undefined;
}

const defaultFilters: ClothFilters = { search: '' };

export const useClothsStore = create<ClothsState>((set, get) => ({
  cloths: [],
  filters: defaultFilters,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    set({ isLoading: true });
    try {
      const raw = await clothsApi.list();
      set({ cloths: raw.map(mapCloth), isInitialized: true });
    } catch (e) {
      console.error('Failed to load cloths:', e);
    } finally {
      set({ isLoading: false });
    }
  },

  // Lightweight refresh — silently updates list without spinner
  refresh: async () => {
    try {
      const raw = await clothsApi.list();
      set({ cloths: raw.map(mapCloth) });
    } catch (e) {
      console.error('Failed to refresh cloths:', e);
    }
  },

  updateClothItems: async (id, items) => {
    const raw = await clothsApi.update(id, { items });
    const updated = mapCloth(raw);
    set((state) => ({
      cloths: state.cloths.map((c) => (c.id === id ? updated : c)),
    }));
  },

  setFilters: (f) =>
    set((state) => ({ filters: { ...state.filters, ...f } })),

  clearFilters: () => set({ filters: defaultFilters }),

  getFilteredCloths: () => {
    const { cloths, filters } = get();
    return cloths.filter((c) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (!c.name.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  },

  getClothById: (id) => get().cloths.find((c) => c.id === id),
}));