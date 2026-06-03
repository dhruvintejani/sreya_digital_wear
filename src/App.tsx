import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/shared/Navbar';
import { AddProductModal } from '@/components/products/AddProductModal';
import { EditProductModal } from '@/components/products/EditProductModal';
import { Dashboard } from '@/pages/Dashboard';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { useProductStore } from '@/store/productStore';
import { useUIStore } from '@/store/uiStore';

function ModalManager() {
  const { activeModal, selectedProductId, closeModal } = useUIStore();

  return (
    <>
      <AddProductModal
        open={activeModal === 'add-product'}
        onClose={closeModal}
      />
      <EditProductModal
        open={activeModal === 'edit-product'}
        productId={selectedProductId}
        onClose={closeModal}
      />
    </>
  );
}

function AppContent() {
  const { initialize } = useProductStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-cream-100" style={{ backgroundColor: '#f8f5ef' }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
      <ModalManager />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #e0ecdc',
            color: '#2d4228',
            borderRadius: '12px',
            fontFamily: 'inherit',
            fontSize: '14px',
          },
        }}
        richColors
      />
    </BrowserRouter>
  );
}
