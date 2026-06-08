import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Scissors } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EmptyState, SearchEmptyState } from '@/components/ui/EmptyState';
import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
import { ClothCard } from '@/components/cloths/ClothCard';
import { useClothsStore } from '@/store/clothsStore';

export function Cloths() {
  const { filters, setFilters, clearFilters, getFilteredCloths, isLoading, cloths } =
    useClothsStore();

  const filtered = getFilteredCloths();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Scissors size={18} className="text-sage-400" />
          <span className="text-xs font-medium text-sage-400 uppercase tracking-widest">
            Fabric & Materials
          </span>
        </div>
        <h1
          className="text-2xl font-bold text-sage-800"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Cloths
        </h1>
        <p className="text-sm text-sage-400 mt-0.5">
          {cloths.length} total · {filtered.length} showing · Auto-synced from Products
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by product name..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              leftIcon={<Search size={15} />}
              rightIcon={
                filters.search ? (
                  <button onClick={() => setFilters({ search: '' })} className="cursor-pointer">
                    <X size={14} />
                  </button>
                ) : undefined
              }
            />
          </div>
          {filters.search && (
            <Button
              variant="ghost"
              size="md"
              onClick={clearFilters}
              className="cursor-pointer text-sage-400"
            >
              <X size={16} /> Clear
            </Button>
          )}
        </div>
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        filters.search ? (
          <SearchEmptyState query={filters.search} />
        ) : (
          <EmptyState
            icon={<Scissors size={28} />}
            title="No cloth entries yet"
            description="Cloth entries are created automatically when you add a product"
          />
        )
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filtered.map((cloth) => (
              <ClothCard key={cloth.id} cloth={cloth} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}