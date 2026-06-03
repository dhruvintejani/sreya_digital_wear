import { create } from 'zustand';

type ModalType = 
  | 'add-product' 
  | 'edit-product' 
  | 'delete-product' 
  | 'total-products' 
  | 'total-inventory' 
  | 'low-stock' 
  | 'out-of-stock'
  | null;

interface UIState {
  activeModal: ModalType;
  selectedProductId: string | null;
  sidebarOpen: boolean;

  openModal: (modal: ModalType, productId?: string) => void;
  closeModal: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeModal: null,
  selectedProductId: null,
  sidebarOpen: false,

  openModal: (modal, productId) => {
    set({ activeModal: modal, selectedProductId: productId ?? null });
  },

  closeModal: () => {
    set({ activeModal: null, selectedProductId: null });
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },
}));
