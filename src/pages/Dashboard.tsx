import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  Layers,
  AlertTriangle,
  XCircle,
  Clock,
  Plus,
  ImageIcon,
  TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { TotalProductsModal } from '@/components/dashboard/TotalProductsModal';
import { TotalInventoryModal } from '@/components/dashboard/TotalInventoryModal';
import { LowStockModal } from '@/components/dashboard/LowStockModal';
import { OutOfStockModal } from '@/components/dashboard/OutOfStockModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { DashboardStatSkeleton } from '@/components/ui/SkeletonCard';
import { useProductStore } from '@/store/productStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice, getStockStatus } from '@/utils/format';
import { LOW_STOCK_THRESHOLD } from '@/types';

type ActiveModal = 'total-products' | 'total-inventory' | 'low-stock' | 'out-of-stock' | null;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function Dashboard() {
  const { getDashboardStats, products, isLoading } = useProductStore();
  const { openModal } = useUIStore();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const stats = getDashboardStats();
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <DashboardStatSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-8"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag size={18} className="text-sage-400" />
            <span className="text-xs font-medium text-sage-400 uppercase tracking-widest">Inventory</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-sage-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-sage-400 mt-1">
            Manage your saree and ethnic wear inventory
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => openModal('add-product')}
          className="hidden sm:flex cursor-pointer"
        >
          <Plus size={16} />
          Add Product
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Package size={20} />}
            color="default"
            subtitle="All catalogued items"
            onClick={() => setActiveModal('total-products')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Inventory"
            value={stats.totalInventory}
            icon={<Layers size={20} />}
            color="green"
            subtitle="Combined units"
            onClick={() => setActiveModal('total-inventory')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Low Stock"
            value={stats.lowStockProducts}
            icon={<AlertTriangle size={20} />}
            color="amber"
            subtitle={`≤${LOW_STOCK_THRESHOLD} units per size`}
            onClick={() => setActiveModal('low-stock')}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatCard
            title="Out of Stock"
            value={stats.outOfStockProducts}
            icon={<XCircle size={20} />}
            color="red"
            subtitle="Needs restocking"
            onClick={() => setActiveModal('out-of-stock')}
          />
        </motion.div>
      </motion.div>

      {/* Quick alerts */}
      {(stats.lowStockProducts > 0 || stats.outOfStockProducts > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl border border-beige-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-sage-500" />
              <h2 className="text-sm font-semibold text-sage-700">Attention Required</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.outOfStockProducts > 0 && (
                <button
                  onClick={() => setActiveModal('out-of-stock')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                >
                  <XCircle size={15} className="text-red-500" />
                  <span className="text-sm font-medium text-red-700">
                    {stats.outOfStockProducts} product{stats.outOfStockProducts > 1 ? 's' : ''} out of stock
                  </span>
                </button>
              )}
              {stats.lowStockProducts > 0 && (
                <button
                  onClick={() => setActiveModal('low-stock')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors"
                >
                  <AlertTriangle size={15} className="text-amber-500" />
                  <span className="text-sm font-medium text-amber-700">
                    {stats.lowStockProducts} product{stats.lowStockProducts > 1 ? 's' : ''} running low
                  </span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Products */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-sage-400" />
            <h2 className="text-base font-semibold text-sage-700">Recently Added</h2>
            {recentProducts.length > 0 && (
              <span className="text-xs text-sage-400 bg-sage-50 px-2 py-0.5 rounded-full border border-sage-100">
                {recentProducts.length}
              </span>
            )}
          </div>
          {products.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => navigate('/products')}>
              View All
            </Button>
          )}
        </div>

        {recentProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-beige-100 shadow-sm">
            <EmptyState
              icon={<Package size={28} />}
              title="No products yet"
              description="Add your first product to start tracking inventory"
              action={
                <Button variant="primary" className='cursor-pointer' onClick={() => openModal('add-product')}>
                  <Plus size={16} />
                  Add First Product
                </Button>
              }
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProducts.map((product, index) => {
              const stockStatus = getStockStatus(product.inventory);
              const badgeMap = {
                'in-stock': { label: 'In Stock', variant: 'success' as const },
                'low-stock': { label: 'Low Stock', variant: 'warning' as const },
                'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
                'completely-out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
              };
              const badge = badgeMap[stockStatus];

              return (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="text-left bg-white rounded-2xl border border-beige-100 hover:border-sage-200 hover:shadow-md transition-all duration-200 overflow-hidden shadow-sm group"
                >
                  {/* Image */}
                  <div className="h-40 bg-beige-50 overflow-hidden relative">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
                        <ImageIcon size={28} />
                        <span className="text-xs mt-1 text-sage-300">No image</span>
                      </div>
                    )}
                    {/* Stock badge overlay */}
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                    {/* Image count */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-black/25 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md">
                        {product.images.length} photos
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-sm font-semibold text-sage-800 truncate mb-0.5">{product.name}</p>
                    <p className="text-xs text-sage-400 mb-3">{product.category}</p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-bold text-sage-700">{formatPrice(product.price)}</span>
                      <span className="text-xs text-sage-400">
                        <span className="font-semibold text-sage-600">{product.totalInventory}</span> units
                      </span>
                    </div>

                    {/* Size inventory chips */}
                    <div className="flex flex-wrap gap-1">
                      {product.inventory.slice(0, 6).map((inv) => {
                        const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
                        const isOut = inv.quantity === 0;
                        return (
                          <span
                            key={inv.size}
                            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                              isOut
                                ? 'bg-red-50 text-red-500 border border-red-100'
                                : isLow
                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                : 'bg-sage-50 text-sage-500 border border-sage-100'
                            }`}
                          >
                            {inv.size}: {inv.quantity}
                          </span>
                        );
                      })}
                      {product.inventory.length > 6 && (
                        <span className="text-[10px] text-sage-400 px-1.5 py-0.5 border border-beige-200 rounded-md bg-beige-50">
                          +{product.inventory.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <TotalProductsModal
        open={activeModal === 'total-products'}
        onClose={() => setActiveModal(null)}
      />
      <TotalInventoryModal
        open={activeModal === 'total-inventory'}
        onClose={() => setActiveModal(null)}
      />
      <LowStockModal
        open={activeModal === 'low-stock'}
        onClose={() => setActiveModal(null)}
      />
      <OutOfStockModal
        open={activeModal === 'out-of-stock'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
