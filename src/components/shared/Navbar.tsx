import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Plus, Menu, X } from 'lucide-react';
import { SDWLogo } from '@/assets/logo';
import { useUIStore } from '@/store/uiStore';
import { useProductStore } from '@/store/productStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
];

export function Navbar() {
  const location = useLocation();
  const { openModal } = useUIStore();
  const { products } = useProductStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-beige-200 shadow-sm">
      {/* Top accent stripe */}
      <div className="h-0.5 bg-gradient-to-r from-sage-300 via-sage-500 to-sage-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 transition-opacity hover:opacity-85"
            aria-label="SDW Home"
          >
            <SDWLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
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
                  {/* Active indicator */}
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
          <div className="flex items-center gap-3">
            {/* Product count pill */}
            {products.length > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-beige-100 border border-beige-200">
                <Package size={12} className="text-sage-400" />
                <span className="text-xs font-medium text-sage-500">{products.length}</span>
              </div>
            )}

            <Button
              variant="primary"
              size="md"
              className="hidden sm:flex cursor-pointer"
              onClick={() => openModal('add-product')}
              aria-label="Add new product"
            >
              <Plus size={15} />
              Add Product
            </Button>

            {/* Mobile add button */}
            <Button
              variant="primary"
              size="sm"
              className="sm:hidden w-9 cursor-pointer h-9 p-0 rounded-xl"
              onClick={() => openModal('add-product')}
              aria-label="Add product"
            >
              <Plus size={18} />
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-sage-500 hover:bg-sage-50 hover:text-sage-700 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-t border-beige-100 bg-white/98 overflow-hidden"
          >
            <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
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
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
