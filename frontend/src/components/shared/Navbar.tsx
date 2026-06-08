// // // import { useState } from 'react';
// // // import { Link, useLocation } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { LayoutDashboard, Package, Plus, Menu, X } from 'lucide-react';
// // // import { SDWLogo } from '@/assets/logo';
// // // import { useUIStore } from '@/store/uiStore';
// // // import { useProductStore } from '@/store/productStore';
// // // import { Button } from '@/components/ui/Button';
// // // import { cn } from '@/utils/cn';

// // // const navItems = [
// // //   { href: '/', label: 'Dashboard', icon: LayoutDashboard },
// // //   { href: '/products', label: 'Products', icon: Package },
// // // ];

// // // export function Navbar() {
// // //   const location = useLocation();
// // //   const { openModal } = useUIStore();
// // //   const { products } = useProductStore();
// // //   const [mobileOpen, setMobileOpen] = useState(false);

// // //   return (
// // //     <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-beige-200 shadow-sm">
// // //       {/* Top accent stripe */}
// // //       <div className="h-0.5 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex items-center justify-between h-16">
// // //           {/* Logo */}
// // //           <Link
// // //             to="/"
// // //             className="flex-shrink-0 transition-opacity hover:opacity-85"
// // //             aria-label="SDW Home"
// // //           >
// // //             <SDWLogo />
// // //           </Link>

// // //           {/* Desktop Navigation */}
// // //           <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
// // //             {navItems.map(({ href, label, icon: Icon }) => {
// // //               const isActive =
// // //                 href === '/'
// // //                   ? location.pathname === '/'
// // //                   : location.pathname.startsWith(href);

// // //               return (
// // //                 <Link
// // //                   key={href}
// // //                   to={href}
// // //                   className={cn(
// // //                     'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
// // //                     isActive
// // //                       ? 'bg-sage-100 text-sage-700'
// // //                       : 'text-sage-500 hover:text-sage-700 hover:bg-sage-50'
// // //                   )}
// // //                   aria-current={isActive ? 'page' : undefined}
// // //                 >
// // //                   <Icon size={15} />
// // //                   {label}
// // //                   {/* Active indicator */}
// // //                   {isActive && (
// // //                     <motion.div
// // //                       layoutId="nav-active"
// // //                       className="absolute inset-0 bg-sage-100 rounded-lg -z-10"
// // //                       transition={{ type: 'spring', stiffness: 400, damping: 30 }}
// // //                     />
// // //                   )}
// // //                 </Link>
// // //               );
// // //             })}
// // //           </nav>

// // //           {/* Right side */}
// // //           <div className="flex items-center gap-3">
// // //             {/* Product count pill */}
// // //             {products.length > 0 && (
// // //               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-100 border border-beige-200">
// // //                 <Package size={12} className="text-sage-400" />
// // //                 <span className="text-xs font-medium text-sage-500">{products.length}</span>
// // //               </div>
// // //             )}

// // //             <Button
// // //               variant="primary"
// // //               size="md"
// // //               className="hidden sm:flex cursor-pointer"
// // //               onClick={() => openModal('add-product')}
// // //               aria-label="Add new product"
// // //             >
// // //               <Plus size={15} />
// // //               Add Product
// // //             </Button>

// // //             {/* Mobile add button */}
// // //             <Button
// // //               variant="primary"
// // //               size="sm"
// // //               className="sm:hidden w-9 cursor-pointer h-9 p-0 rounded-xl"
// // //               onClick={() => openModal('add-product')}
// // //               aria-label="Add product"
// // //             >
// // //               <Plus size={18} />
// // //             </Button>

// // //             {/* Mobile menu toggle */}
// // //             <button
// // //               className="md:hidden p-2 rounded-lg text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors"
// // //               onClick={() => setMobileOpen(!mobileOpen)}
// // //               aria-label="Toggle navigation menu"
// // //               aria-expanded={mobileOpen}
// // //             >
// // //               {mobileOpen ? <X size={20} /> : <Menu size={20} />}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Navigation Drawer */}
// // //       <AnimatePresence>
// // //         {mobileOpen && (
// // //           <motion.div
// // //             initial={{ opacity: 0, height: 0 }}
// // //             animate={{ opacity: 1, height: 'auto' }}
// // //             exit={{ opacity: 0, height: 0 }}
// // //             transition={{ duration: 0.2, ease: 'easeOut' }}
// // //             className="md:hidden border-t border-beige-100 bg-white/98 overflow-hidden"
// // //           >
// // //             <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
// // //               {navItems.map(({ href, label, icon: Icon }) => {
// // //                 const isActive =
// // //                   href === '/'
// // //                     ? location.pathname === '/'
// // //                     : location.pathname.startsWith(href);

// // //                 return (
// // //                   <Link
// // //                     key={href}
// // //                     to={href}
// // //                     onClick={() => setMobileOpen(false)}
// // //                     className={cn(
// // //                       'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
// // //                       isActive
// // //                         ? 'bg-sage-100 text-sage-700'
// // //                         : 'text-sage-500 hover:bg-sage-50 hover:text-sage-700'
// // //                     )}
// // //                     aria-current={isActive ? 'page' : undefined}
// // //                   >
// // //                     <Icon size={16} />
// // //                     {label}
// // //                   </Link>
// // //                 );
// // //               })}
// // //             </nav>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //     </header>
// // //   );
// // // }


// // import { useState } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { LayoutDashboard, Package, Factory, Plus, Menu, X, LogOut } from 'lucide-react';
// // import { SDWLogo } from '@/assets/logo';
// // import { useUIStore } from '@/store/uiStore';
// // import { useAuthStore } from '@/store/authstore';
// // import { useProductStore } from '@/store/productStore';
// // import { Button } from '@/components/ui/Button';
// // import { cn } from '@/utils/cn';

// // const navItems = [
// //   { href: '/', label: 'Dashboard', icon: LayoutDashboard },
// //   { href: '/products', label: 'Products', icon: Package },
// //   { href: '/production', label: 'Production', icon: Factory },
// // ];

// // export function Navbar() {
// //   const location = useLocation();
// //   const { openModal } = useUIStore();
// //   const { logout, user } = useAuthStore();
// //   const { products } = useProductStore();
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   const isProductionPage = location.pathname.startsWith('/production');

// //   const handleAdd = () => {
// //     if (isProductionPage) {
// //       openModal('add-production');
// //     } else {
// //       openModal('add-product');
// //     }
// //   };

// //   return (
// //     <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-beige-200 shadow-sm">
// //       <div className="h-0.5 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-16">
// //           {/* Logo */}
// //           <Link
// //             to="/"
// //             className="flex-shrink-0 transition-opacity hover:opacity-85"
// //             aria-label="SDW Home"
// //           >
// //             <SDWLogo />
// //           </Link>

// //           {/* Desktop Navigation */}
// //           <nav className="hidden md:flex items-center gap-1" role="navigation">
// //             {navItems.map(({ href, label, icon: Icon }) => {
// //               const isActive =
// //                 href === '/'
// //                   ? location.pathname === '/'
// //                   : location.pathname.startsWith(href);
// //               return (
// //                 <Link
// //                   key={href}
// //                   to={href}
// //                   className={cn(
// //                     'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
// //                     isActive
// //                       ? 'bg-sage-100 text-sage-700'
// //                       : 'text-sage-500 hover:text-sage-700 hover:bg-sage-50'
// //                   )}
// //                   aria-current={isActive ? 'page' : undefined}
// //                 >
// //                   <Icon size={15} />
// //                   {label}
// //                   {isActive && (
// //                     <motion.div
// //                       layoutId="nav-active"
// //                       className="absolute inset-0 bg-sage-100 rounded-lg -z-10"
// //                       transition={{ type: 'spring', stiffness: 400, damping: 30 }}
// //                     />
// //                   )}
// //                 </Link>
// //               );
// //             })}
// //           </nav>

// //           {/* Right side */}
// //           <div className="flex items-center gap-3">
// //             {products.length > 0 && (
// //               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-100 border border-beige-200">
// //                 <Package size={12} className="text-sage-400" />
// //                 <span className="text-xs font-medium text-sage-500">{products.length}</span>
// //               </div>
// //             )}

// //             <Button
// //               variant="primary"
// //               size="md"
// //               className="hidden sm:flex cursor-pointer"
// //               onClick={handleAdd}
// //             >
// //               <Plus size={15} />
// //               {isProductionPage ? 'Add Production' : 'Add Product'}
// //             </Button>

// //             <Button
// //               variant="primary"
// //               size="sm"
// //               className="sm:hidden w-9 cursor-pointer h-9 p-0 rounded-xl"
// //               onClick={handleAdd}
// //             >
// //               <Plus size={18} />
// //             </Button>

// //             {/* User + Logout */}
// //             {user && (
// //               <div className="hidden sm:flex items-center gap-2">
// //                 <span className="text-xs text-sage-400 max-w-[100px] truncate">
// //                   {user.full_name}
// //                 </span>
// //                 <button
// //                   onClick={logout}
// //                   className="p-2 rounded-lg text-sage-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
// //                   title="Sign out"
// //                 >
// //                   <LogOut size={16} />
// //                 </button>
// //               </div>
// //             )}

// //             {/* Mobile menu toggle */}
// //             <button
// //               className="md:hidden p-2 rounded-lg text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors cursor-pointer"
// //               onClick={() => setMobileOpen(!mobileOpen)}
// //               aria-label="Toggle navigation"
// //               aria-expanded={mobileOpen}
// //             >
// //               {mobileOpen ? <X size={20} /> : <Menu size={20} />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile Drawer */}
// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <motion.div
// //             initial={{ opacity: 0, height: 0 }}
// //             animate={{ opacity: 1, height: 'auto' }}
// //             exit={{ opacity: 0, height: 0 }}
// //             transition={{ duration: 0.2 }}
// //             className="md:hidden border-t border-beige-100 bg-white/98 overflow-hidden"
// //           >
// //             <nav className="px-4 py-3 space-y-1">
// //               {navItems.map(({ href, label, icon: Icon }) => {
// //                 const isActive =
// //                   href === '/'
// //                     ? location.pathname === '/'
// //                     : location.pathname.startsWith(href);
// //                 return (
// //                   <Link
// //                     key={href}
// //                     to={href}
// //                     onClick={() => setMobileOpen(false)}
// //                     className={cn(
// //                       'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
// //                       isActive
// //                         ? 'bg-sage-100 text-sage-700'
// //                         : 'text-sage-500 hover:bg-sage-50 hover:text-sage-700'
// //                     )}
// //                   >
// //                     <Icon size={16} />
// //                     {label}
// //                   </Link>
// //                 );
// //               })}
// //               {user && (
// //                 <button
// //                   onClick={() => { setMobileOpen(false); logout(); }}
// //                   className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
// //                 >
// //                   <LogOut size={16} />
// //                   Sign Out
// //                 </button>
// //               )}
// //             </nav>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </header>
// //   );
// // }

// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LayoutDashboard, Package, Factory, Scissors, Plus, Menu, X, LogOut } from 'lucide-react';
// import { SDWLogo } from '@/assets/logo';
// import { useUIStore } from '@/store/uiStore';
// import { useAuthStore } from '@/store/authstore';
// import { useProductStore } from '@/store/productStore';
// import { Button } from '@/components/ui/Button';
// import { cn } from '@/utils/cn';

// const navItems = [
//   { href: '/', label: 'Dashboard', icon: LayoutDashboard },
//   { href: '/products', label: 'Products', icon: Package },
//   { href: '/production', label: 'Production', icon: Factory },
//   { href: '/cloths', label: 'Cloths', icon: Scissors },
// ];

// export function Navbar() {
//   const location = useLocation();
//   const { openModal } = useUIStore();
//   const { logout, user } = useAuthStore();
//   const { products } = useProductStore();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const isProductionPage = location.pathname.startsWith('/production');
//   const isClothsPage = location.pathname.startsWith('/cloths');

//   // Only show Add button on products page
//   const showAddButton = !isProductionPage && !isClothsPage;

//   return (
//     <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-beige-200 shadow-sm">
//       <div className="h-0.5 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-85" aria-label="SDW Home">
//             <SDWLogo />
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center gap-1" role="navigation">
//             {navItems.map(({ href, label, icon: Icon }) => {
//               const isActive =
//                 href === '/'
//                   ? location.pathname === '/'
//                   : location.pathname.startsWith(href);
//               return (
//                 <Link
//                   key={href}
//                   to={href}
//                   className={cn(
//                     'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
//                     isActive
//                       ? 'bg-sage-100 text-sage-700'
//                       : 'text-sage-500 hover:text-sage-700 hover:bg-sage-50'
//                   )}
//                   aria-current={isActive ? 'page' : undefined}
//                 >
//                   <Icon size={15} />
//                   {label}
//                   {isActive && (
//                     <motion.div
//                       layoutId="nav-active"
//                       className="absolute inset-0 bg-sage-100 rounded-lg -z-10"
//                       transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//                     />
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Right side */}
//           <div className="flex items-center gap-3">
//             {products.length > 0 && (
//               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-100 border border-beige-200">
//                 <Package size={12} className="text-sage-400" />
//                 <span className="text-xs font-medium text-sage-500">{products.length}</span>
//               </div>
//             )}

//             {showAddButton && (
//               <>
//                 {/* <Button
//                   variant="primary"
//                   size="md"
//                   className="hidden sm:flex cursor-pointer"
//                   onClick={() => openModal('add-product')}
//                 >
//                   <Plus size={15} />
//                   Add Product
//                 </Button> */}
//                 <Button
//                   variant="primary"
//                   size="sm"
//                   className="sm:hidden w-9 cursor-pointer h-9 p-0 rounded-xl"
//                   onClick={() => openModal('add-product')}
//                 >
//                   <Plus size={18} />
//                 </Button>
//               </>
//             )}

//             {/* User + Logout */}
//             {user && (
//               <div className="hidden sm:flex items-center gap-2">
//                 <span className="text-xs text-sage-400 max-w-[100px] truncate">
//                   {user.full_name}
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="p-2 rounded-lg text-sage-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
//                   title="Sign out"
//                 >
//                   <LogOut size={16} />
//                 </button>
//               </div>
//             )}

//             {/* Mobile menu toggle */}
//             <button
//               className="md:hidden p-2 rounded-lg text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors cursor-pointer"
//               onClick={() => setMobileOpen(!mobileOpen)}
//               aria-label="Toggle navigation"
//             >
//               {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.2 }}
//             className="md:hidden border-t border-beige-100 bg-white/98 overflow-hidden"
//           >
//             <nav className="px-4 py-3 space-y-1">
//               {navItems.map(({ href, label, icon: Icon }) => {
//                 const isActive =
//                   href === '/'
//                     ? location.pathname === '/'
//                     : location.pathname.startsWith(href);
//                 return (
//                   <Link
//                     key={href}
//                     to={href}
//                     onClick={() => setMobileOpen(false)}
//                     className={cn(
//                       'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
//                       isActive
//                         ? 'bg-sage-100 text-sage-700'
//                         : 'text-sage-500 hover:bg-sage-50 hover:text-sage-700'
//                     )}
//                   >
//                     <Icon size={16} />
//                     {label}
//                   </Link>
//                 );
//               })}
//               {showAddButton && (
//                 <button
//                   onClick={() => { setMobileOpen(false); openModal('add-product'); }}
//                   className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-sage-600 text-white cursor-pointer"
//                 >
//                   <Plus size={16} />
//                   Add Product
//                 </button>
//               )}
//               {user && (
//                 <button
//                   onClick={() => { setMobileOpen(false); logout(); }}
//                   className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
//                 >
//                   <LogOut size={16} />
//                   Sign Out
//                 </button>
//               )}
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }


import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Factory, Scissors,
  Plus, Menu, X, LogOut, User, Mail, ChevronDown,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/authstore';
import { SDWLogo } from '@/assets/logo';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/production', label: 'Production', icon: Factory },
  { href: '/cloths', label: 'Cloths', icon: Scissors },
];

// User info popover — shown on hover (desktop) or tap (mobile)
function UserPopover({
  user,
  onLogoutClick,
  mobile = false,
}: {
  user: { full_name: string; email: string };
  onLogoutClick: () => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click (mobile tap-outside)
  useEffect(() => {
    if (!mobile) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobile]);

  const trigger = mobile ? (
    // Mobile: tap to toggle
    <button
      onClick={() => setOpen((p) => !p)}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors cursor-pointer w-full"
    >
      <User size={16} />
      <span className="truncate">{user.full_name}</span>
      <ChevronDown
        size={14}
        className={cn('ml-auto transition-transform', open && 'rotate-180')}
      />
    </button>
  ) : (
    // Desktop: hover
    <button
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sage-500 hover:text-sage-700 hover:bg-sage-50 transition-colors cursor-pointer text-sm font-medium max-w-[130px]"
      title={user.email}
    >
      <div className="w-7 h-7 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
        <User size={14} className="text-sage-600" />
      </div>
      <span className="truncate text-xs">{user.full_name}</span>
      <ChevronDown size={12} className="flex-shrink-0 text-sage-400" />
    </button>
  );

  return (
    <div
      ref={ref}
      className={cn('relative', !mobile && 'group')}
      onMouseEnter={!mobile ? () => setOpen(true) : undefined}
      onMouseLeave={!mobile ? () => setOpen(false) : undefined}
    >
      {trigger}

      <AnimatePresence>
        {(open || (!mobile && undefined)) && (
          /* For desktop we use CSS group-hover so it's always smooth;
             for mobile we use the open state */
          <></>
        )}
      </AnimatePresence>

      {/* Desktop: CSS-driven hover panel */}
      {!mobile && (
        <div className="absolute right-0 top-full pt-2 z-50 hidden group-hover:block">
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-56 bg-white rounded-xl shadow-lg border border-beige-200 overflow-hidden"
          >
            {/* User info */}
            <div className="px-4 py-3 bg-sage-50 border-b border-beige-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sage-200 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-sage-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-sage-800 truncate">{user.full_name}</p>
                  <p className="text-xs text-sage-400 truncate flex items-center gap-1 mt-0.5">
                    <Mail size={10} />
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
            {/* Logout */}
            <button
              onClick={onLogoutClick}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </motion.div>
        </div>
      )}

      {/* Mobile: tap-driven panel */}
      {mobile && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="mx-3 mb-1 bg-sage-50 rounded-xl border border-beige-100 overflow-hidden">
                <div className="px-3 py-2.5 border-b border-beige-100">
                  <p className="text-xs font-semibold text-sage-700 truncate">{user.full_name}</p>
                  <p className="text-xs text-sage-400 truncate flex items-center gap-1 mt-0.5">
                    <Mail size={10} />
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={() => { setOpen(false); onLogoutClick(); }}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function Navbar() {
  const location = useLocation();
  const { openModal } = useUIStore();
  const { logout, user } = useAuthStore();
  const { products } = useProductStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isProductionPage = location.pathname.startsWith('/production');
  const isClothsPage = location.pathname.startsWith('/cloths');
  const showAddButton = !isProductionPage && !isClothsPage;

  const handleLogoutClick = () => {
    setMobileOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-beige-200 shadow-sm">
        <div className="h-0.5 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 transition-opacity hover:opacity-85">
              <SDWLogo />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive =
                  href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    to={href}
                    className={cn(
                      'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-sage-100 text-sage-700'
                        : 'text-sage-500 hover:text-sage-700 hover:bg-sage-50'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={15} />
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-sage-100 rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Product count */}
              {products.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-100 border border-beige-200">
                  <Package size={12} className="text-sage-400" />
                  <span className="text-xs font-medium text-sage-500">{products.length}</span>
                </div>
              )}

              {/* Add Product button */}
              {showAddButton && (
                <>
                  {/* <Button
                    variant="primary"
                    size="md"
                    className="hidden sm:flex cursor-pointer"
                    onClick={() => openModal('add-product')}
                  >
                    <Plus size={15} />
                    Add Product
                  </Button> */}
                  <Button
                    variant="primary"
                    size="sm"
                    className="sm:hidden w-9 h-9 p-0 rounded-xl cursor-pointer"
                    onClick={() => openModal('add-product')}
                  >
                    <Plus size={18} />
                  </Button>
                </>
              )}

              {/* Desktop user popover */}
              {user && (
                <div className="hidden sm:block">
                  <UserPopover
                    user={user}
                    onLogoutClick={handleLogoutClick}
                    mobile={false}
                  />
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors cursor-pointer"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-beige-100 bg-white/98 overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                  const isActive =
                    href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      to={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-sage-100 text-sage-700'
                          : 'text-sage-500 hover:bg-sage-50 hover:text-sage-700'
                      )}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  );
                })}

                {showAddButton && (
                  <button
                    onClick={() => { setMobileOpen(false); openModal('add-product'); }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-sage-600 text-white cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                )}

                {/* Mobile user info + logout */}
                {user && (
                  <div className="pt-1 border-t border-beige-100 mt-1">
                    <UserPopover
                      user={user}
                      onLogoutClick={handleLogoutClick}
                      mobile={true}
                    />
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Logout confirmation dialog */}
      <ConfirmDialog
        open={showLogoutConfirm}
        title="Sign Out?"
        message="Are you sure you want to sign out of Sreya Digital Wear?"
        confirmLabel="Sign Out"
        cancelLabel="Stay"
        variant="warning"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </>
  );
}