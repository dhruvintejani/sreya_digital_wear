import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { EmptyState, SearchEmptyState } from '@/components/ui/EmptyState';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
import { useProductStore } from '@/store/productStore';
import { useUIStore } from '@/store/uiStore';
import { DEFAULT_SIZES } from '@/types';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

const stockOptions = [
  { value: 'all', label: 'All' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'low-stock', label: 'Low Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
] as const;

export function Products() {
  const { products, categories, filters, setFilters, clearFilters, getFilteredProducts, deleteProduct, isLoading } = useProductStore();
  const { openModal } = useUIStore();
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredProducts = getFilteredProducts();
  const hasActiveFilters =
    filters.search || filters.category || filters.stockStatus !== 'all' || filters.sizes.length > 0;

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteProduct(deleteId);
    toast.success('Product deleted');
    setDeleteId(null);
  };

  const toggleSizeFilter = (size: string) => {
    const current = filters.sizes;
    if (current.includes(size)) {
      setFilters({ sizes: current.filter((s) => s !== size) });
    } else {
      setFilters({ sizes: [...current, size] });
    }
  };

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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1
            className="text-2xl font-bold text-sage-800"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Products
          </h1>
          <p className="text-sm text-sage-400 mt-0.5">
            {products.length} total · {filteredProducts.length} showing
          </p>
        </div>
        <Button variant="primary" onClick={() => openModal('add-product')}>
          <Plus size={16} />
          <span className="hidden sm:inline">Add Product</span>
        </Button>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 space-y-3"
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by name or category..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              leftIcon={<Search size={15} />}
              rightIcon={
                filters.search ? (
                  <button onClick={() => setFilters({ search: '' })}>
                    <X size={14} className="hover:text-sage-600" />
                  </button>
                ) : undefined
              }
            />
          </div>
          <Button
            variant={showFilters ? 'secondary' : 'outline'}
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0"
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-sage-500 rounded-full" />
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="md" onClick={clearFilters} className="flex-shrink-0 text-sage-400">
              <X size={16} />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-xl border border-beige-100 p-4 space-y-4">
                {/* Category Filter */}
                <div>
                  <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters({ category: '' })}
                      className={cn(
                        'px-3 py-1 rounded-full text-xs cursor-pointer font-medium transition-colors border',
                        !filters.category
                          ? 'bg-sage-600 text-white border-sage-600'
                          : 'border-beige-200 text-sage-400 hover:border-sage-300'
                      )}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFilters({ category: filters.category === cat.name ? '' : cat.name })}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border',
                          filters.category === cat.name
                            ? 'bg-sage-600 text-white border-sage-600'
                            : 'border-beige-200 text-sage-400 hover:border-sage-300 hover:text-sage-600'
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div>
                  <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Stock Status</p>
                  <div className="flex flex-wrap gap-2">
                    {stockOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setFilters({ stockStatus: opt.value })}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border',
                          filters.stockStatus === opt.value
                            ? 'bg-sage-600 text-white border-sage-600'
                            : 'border-beige-200 text-sage-400 hover:border-sage-300 hover:text-sage-600'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Filter by Size</p>
                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSizeFilter(size)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border',
                          filters.sizes.includes(size)
                            ? 'bg-sage-600 text-white border-sage-600'
                            : 'border-beige-200 text-sage-400 hover:border-sage-300 hover:text-sage-600'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="outline" className="gap-1">
                Category: {filters.category}
                <button onClick={() => setFilters({ category: '' })} className="ml-1">
                  <X size={10} />
                </button>
              </Badge>
            )}
            {filters.stockStatus !== 'all' && (
              <Badge variant="outline" className="gap-1">
                {stockOptions.find((o) => o.value === filters.stockStatus)?.label}
                <button onClick={() => setFilters({ stockStatus: 'all' })} className="ml-1">
                  <X size={10} />
                </button>
              </Badge>
            )}
            {filters.sizes.map((size) => (
              <Badge key={size} variant="outline" className="gap-1">
                Size: {size}
                <button onClick={() => toggleSizeFilter(size)} className="ml-1">
                  <X size={10} />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        filters.search ? (
          <SearchEmptyState query={filters.search} />
        ) : (
          <EmptyState
            title="No products found"
            description="Try changing your filters or add a new product"
            action={
              <Button variant="primary" onClick={() => openModal('add-product')}>
                <Plus size={16} />
                Add Product
              </Button>
            }
          />
        )
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={setDeleteId}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        title="Delete Product?"
        message="This action cannot be undone. The product and all its inventory data will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
