// // // // import { useEffect } from 'react';
// // // // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // // // import { Toaster } from 'sonner';
// // // // import { Navbar } from '@/components/shared/Navbar';
// // // // import { AddProductModal } from '@/components/products/AddProductModal';
// // // // import { EditProductModal } from '@/components/products/EditProductModal';
// // // // import { Dashboard } from '@/pages/Dashboard';
// // // // import { Products } from '@/pages/Products';
// // // // import { ProductDetail } from '@/pages/ProductDetail';
// // // // import { useProductStore } from '@/store/productStore';
// // // // import { useUIStore } from '@/store/uiStore';

// // // // function ModalManager() {
// // // //   const { activeModal, selectedProductId, closeModal } = useUIStore();

// // // //   return (
// // // //     <>
// // // //       <AddProductModal
// // // //         open={activeModal === 'add-product'}
// // // //         onClose={closeModal}
// // // //       />
// // // //       <EditProductModal
// // // //         open={activeModal === 'edit-product'}
// // // //         productId={selectedProductId}
// // // //         onClose={closeModal}
// // // //       />
// // // //     </>
// // // //   );
// // // // }

// // // // function AppContent() {
// // // //   const { initialize } = useProductStore();

// // // //   useEffect(() => {
// // // //     initialize();
// // // //   }, [initialize]);

// // // //   return (
// // // //     <div className="min-h-screen bg-cream-100" style={{ backgroundColor: '#f8f5ef' }}>
// // // //       <Navbar />
// // // //       <main className="flex-1">
// // // //         <Routes>
// // // //           <Route path="/" element={<Dashboard />} />
// // // //           <Route path="/products" element={<Products />} />
// // // //           <Route path="/product/:id" element={<ProductDetail />} />
// // // //         </Routes>
// // // //       </main>
// // // //       <ModalManager />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function App() {
// // // //   return (
// // // //     <BrowserRouter>
// // // //       <AppContent />
// // // //       <Toaster
// // // //         position="bottom-right"
// // // //         toastOptions={{
// // // //           style: {
// // // //             background: 'white',
// // // //             border: '1px solid #e0ecdc',
// // // //             color: '#2d4228',
// // // //             borderRadius: '12px',
// // // //             fontFamily: 'inherit',
// // // //             fontSize: '14px',
// // // //           },
// // // //         }}
// // // //         richColors
// // // //       />
// // // //     </BrowserRouter>
// // // //   );
// // // // }


// // // import { useEffect } from 'react';
// // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // import { Toaster } from 'sonner';
// // // import { Navbar } from '@/components/shared/Navbar';
// // // import { AddProductModal } from '@/components/products/AddProductModal';
// // // import { Dashboard } from '@/pages/Dashboard';
// // // import { Products } from '@/pages/Products';
// // // import { ProductDetail } from '@/pages/ProductDetail';
// // // import { Production } from '@/pages/Production';
// // // import { ProductionDetail } from '@/pages/Productiondetail';
// // // import { AuthPage } from '@/pages/AuthPage';
// // // import { AddProductionModal } from '@/components/production/AddProductionModal';
// // // import { useProductStore } from '@/store/productStore';
// // // import { useProductionStore } from '@/store/productionStore';
// // // import { useUIStore } from '@/store/uiStore';
// // // import { useAuthStore } from '@/store/authstore';

// // // function ModalManager() {
// // //   const { activeModal, closeModal } = useUIStore();

// // //   return (
// // //     <>
// // //       <AddProductModal
// // //         open={activeModal === 'add-product'}
// // //         onClose={closeModal}
// // //       />
// // //       <AddProductionModal
// // //         open={activeModal === 'add-production'}
// // //         onClose={closeModal}
// // //       />
// // //     </>
// // //   );
// // // }

// // // function AppContent() {
// // //   const { initialize: initProducts } = useProductStore();
// // //   const { initialize: initProduction } = useProductionStore();

// // //   useEffect(() => {
// // //     initProducts();
// // //     initProduction();
// // //   }, [initProducts, initProduction]);

// // //   return (
// // //     <div className="min-h-screen bg-cream-100" style={{ backgroundColor: '#f8f5ef' }}>
// // //       <Navbar />
// // //       <main className="flex-1">
// // //         <Routes>
// // //           <Route path="/" element={<Dashboard />} />
// // //           <Route path="/products" element={<Products />} />
// // //           <Route path="/product/:id" element={<ProductDetail />} />
// // //           <Route path="/production" element={<Production />} />
// // //           <Route path="/production/:id" element={<ProductionDetail />} />
// // //           <Route path="*" element={<Navigate to="/" replace />} />
// // //         </Routes>
// // //       </main>
// // //       <ModalManager />
// // //     </div>
// // //   );
// // // }

// // // function ProtectedApp() {
// // //   const { isAuthenticated, initFromStorage } = useAuthStore();

// // //   useEffect(() => {
// // //     initFromStorage();
// // //   }, [initFromStorage]);

// // //   if (!isAuthenticated) {
// // //     return <AuthPage />;
// // //   }

// // //   return <AppContent />;
// // // }

// // // export default function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <ProtectedApp />
// // //       <Toaster
// // //         position="bottom-right"
// // //         toastOptions={{
// // //           style: {
// // //             background: 'white',
// // //             border: '1px solid #e0ecdc',
// // //             color: '#2d4228',
// // //             borderRadius: '12px',
// // //             fontFamily: 'inherit',
// // //             fontSize: '14px',
// // //           },
// // //         }}
// // //         richColors
// // //       />
// // //     </BrowserRouter>
// // //   );
// // // }

// // import { useEffect } from 'react';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'sonner';
// // import { Navbar } from '@/components/shared/Navbar';
// // import { AddProductModal } from '@/components/products/AddProductModal';
// // import { Dashboard } from '@/pages/Dashboard';
// // import { Products } from '@/pages/Products';
// // import { ProductDetail } from '@/pages/ProductDetail';
// // import { Production } from '@/pages/Production';
// // import { ProductionDetail } from '@/pages/Productiondetail';
// // import { Cloths } from '@/pages/Cloths';
// // import { ClothDetail } from '@/pages/ClothDetail';
// // import { AuthPage } from '@/pages/AuthPage';
// // import { useProductStore } from '@/store/productStore';
// // import { useProductionStore } from '@/store/productionStore';
// // import { useClothsStore } from '@/store/clothsStore';
// // import { useUIStore } from '@/store/uiStore';
// // import { useAuthStore } from '@/store/authstore';

// // function ModalManager() {
// //   const { activeModal, closeModal } = useUIStore();
// //   return (
// //     <AddProductModal open={activeModal === 'add-product'} onClose={closeModal} />
// //   );
// // }

// // function AppContent() {
// //   const { initialize: initProducts } = useProductStore();
// //   const { initialize: initProduction } = useProductionStore();
// //   const { initialize: initCloths } = useClothsStore();

// //   useEffect(() => {
// //     initProducts();
// //     initProduction();
// //     initCloths();
// //   }, [initProducts, initProduction, initCloths]);

// //   return (
// //     <div className="min-h-screen" style={{ backgroundColor: '#f8f5ef' }}>
// //       <Navbar />
// //       <main className="flex-1">
// //         <Routes>
// //           <Route path="/" element={<Dashboard />} />
// //           <Route path="/products" element={<Products />} />
// //           <Route path="/product/:id" element={<ProductDetail />} />
// //           <Route path="/production" element={<Production />} />
// //           <Route path="/production/:id" element={<ProductionDetail />} />
// //           <Route path="/cloths" element={<Cloths />} />
// //           <Route path="/cloths/:id" element={<ClothDetail />} />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </main>
// //       <ModalManager />
// //     </div>
// //   );
// // }

// // function ProtectedApp() {
// //   const { isAuthenticated, initFromStorage } = useAuthStore();
// //   useEffect(() => { initFromStorage(); }, [initFromStorage]);
// //   if (!isAuthenticated) return <AuthPage />;
// //   return <AppContent />;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <ProtectedApp />
// //       <Toaster
// //         position="bottom-right"
// //         toastOptions={{
// //           style: {
// //             background: 'white',
// //             border: '1px solid #e0ecdc',
// //             color: '#2d4228',
// //             borderRadius: '12px',
// //             fontFamily: 'inherit',
// //             fontSize: '14px',
// //           },
// //         }}
// //         richColors
// //       />
// //     </BrowserRouter>
// //   );
// // }


// import { useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'sonner';
// import { Navbar } from '@/components/shared/Navbar';
// import { AddProductModal } from '@/components/products/AddProductModal';
// import { Dashboard } from '@/pages/Dashboard';
// import { Products } from '@/pages/Products';
// import { ProductDetail } from '@/pages/ProductDetail';
// import { Production } from '@/pages/Production';
// import { ProductionDetail } from '@/pages/Productiondetail';
// import { Cloths } from '@/pages/Cloths';
// import { ClothDetail } from '@/pages/ClothDetail';
// import { AuthPage } from '@/pages/AuthPage';
// import { ForgotPassword } from '@/pages/ForgotPassword';
// import { useProductStore } from '@/store/productStore';
// import { useProductionStore } from '@/store/productionStore';
// import { useClothsStore } from '@/store/clothsStore';
// import { useUIStore } from '@/store/uiStore';
// import { useAuthStore } from '@/store/authstore';

// function ModalManager() {
//   const { activeModal, closeModal } = useUIStore();
//   return (
//     <AddProductModal open={activeModal === 'add-product'} onClose={closeModal} />
//   );
// }

// function AppContent() {
//   const { initialize: initProducts, registerOnProductAdded, registerOnProductDeleted } =
//     useProductStore();
//   const { initialize: initProduction, refresh: refreshProduction } = useProductionStore();
//   const { initialize: initCloths, refresh: refreshCloths } = useClothsStore();

//   useEffect(() => {
//     // Initialize all stores once
//     initProducts();
//     initProduction();
//     initCloths();

//     // Register callbacks so production + cloths refresh automatically
//     // whenever a product is added or deleted — no page refresh needed
//     registerOnProductAdded(async () => {
//       await Promise.all([refreshProduction(), refreshCloths()]);
//     });

//     registerOnProductDeleted(async () => {
//       await Promise.all([refreshProduction(), refreshCloths()]);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#f8f5ef' }}>
//       <Navbar />
//       <main className="flex-1">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/production" element={<Production />} />
//           <Route path="/production/:id" element={<ProductionDetail />} />
//           <Route path="/cloths" element={<Cloths />} />
//           <Route path="/cloths/:id" element={<ClothDetail />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>
//       <ModalManager />
//     </div>
//   );
// }

// function ProtectedApp() {
//   const { isAuthenticated, initFromStorage } = useAuthStore();

//   useEffect(() => {
//     initFromStorage();
//   }, [initFromStorage]);

//   if (!isAuthenticated) return <AuthPage />;
//   return <AppContent />;
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Forgot password is accessible without auth */}
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/*" element={<ProtectedApp />} />
//       </Routes>
//       <Toaster
//         position="bottom-right"
//         toastOptions={{
//           style: {
//             background: 'white',
//             border: '1px solid #e0ecdc',
//             color: '#2d4228',
//             borderRadius: '12px',
//             fontFamily: 'inherit',
//             fontSize: '14px',
//           },
//         }}
//         richColors
//       />
//     </BrowserRouter>
//   );
// }


import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/shared/Navbar';
import { AddProductModal } from '@/components/products/AddProductModal';
import { Dashboard } from '@/pages/Dashboard';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { Production } from '@/pages/Production';
import { ProductionDetail } from '@/pages/Productiondetail';
import { Cloths } from '@/pages/Cloths';
import { ClothDetail } from '@/pages/ClothDetail';
import { AuthPage } from '@/pages/AuthPage';
import { ForgotPassword } from '@/pages/ForgotPassword';
import { useProductStore } from '@/store/productStore';
import { useProductionStore } from '@/store/productionStore';
import { useClothsStore } from '@/store/clothsStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from './store/authstore';

function ModalManager() {
  const { activeModal, closeModal } = useUIStore();
  return (
    <AddProductModal open={activeModal === 'add-product'} onClose={closeModal} />
  );
}

function AppContent() {
  const { initialize: initProducts } = useProductStore();
  const { initialize: initProduction } = useProductionStore();
  const { initialize: initCloths } = useClothsStore();

  useEffect(() => {
    initProducts();
    initProduction();
    initCloths();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f5ef' }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/production" element={<Production />} />
          <Route path="/production/:id" element={<ProductionDetail />} />
          <Route path="/cloths" element={<Cloths />} />
          <Route path="/cloths/:id" element={<ClothDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ModalManager />
    </div>
  );
}

function ProtectedApp() {
  const { isAuthenticated, initFromStorage } = useAuthStore();

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  if (!isAuthenticated) return <AuthPage />;
  return <AppContent />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={<ProtectedApp />} />
      </Routes>
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