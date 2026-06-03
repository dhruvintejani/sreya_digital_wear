import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, ChevronDown, Package, ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Product, LOW_STOCK_THRESHOLD } from '@/types';
import { formatPrice, getStockStatus } from '@/utils/format';
import { cn } from '@/utils/cn';
import { useUIStore } from '@/store/uiStore';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  compact?: boolean;
}

export function ProductCard({ product, onDelete, compact = false }: ProductCardProps) {
  const navigate = useNavigate();
  const { openModal } = useUIStore();
  const [expanded, setExpanded] = useState(false);

  const stockStatus = getStockStatus(product.inventory);
  const mainImage = product.images[0];

  const stockBadge = {
    'in-stock': { label: 'In Stock', variant: 'success' as const },
    'low-stock': { label: 'Low Stock', variant: 'warning' as const },
    'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
    'completely-out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
  }[stockStatus];

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking action buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={cn(
        'premium-card overflow-hidden group',
        compact ? 'p-3' : ''
      )}
    >
      <div
        className="cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Image */}
        {!compact && (
          <div className="relative h-48 bg-beige-50 overflow-hidden">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
                <ImageIcon size={36} />
                <span className="text-xs mt-2 text-sage-300">No image</span>
              </div>
            )}
            {/* Stock overlay badge */}
            <div className="absolute top-2 right-2">
              <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
            </div>
          </div>
        )}

        {/* Info */}
        <div className={cn('p-4', compact && 'flex items-center gap-3 p-3')}>
          {compact && mainImage && (
            <img
              src={mainImage}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          {compact && !mainImage && (
            <div className="w-12 h-12 rounded-lg bg-beige-100 flex items-center justify-center flex-shrink-0">
              <ImageIcon size={18} className="text-sage-300" />
            </div>
          )}

          <div className={cn('flex-1 min-w-0', compact ? '' : 'space-y-1')}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className={cn(
                  'font-semibold text-sage-800 truncate',
                  compact ? 'text-sm' : 'text-base'
                )}>
                  {product.name}
                </h3>
                <p className="text-xs text-sage-400 mt-0.5">{product.category}</p>
              </div>
              {compact && (
                <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
              )}
            </div>

            {!compact && (
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-semibold text-sage-700">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-sage-400">
                  Total: <span className="font-medium text-sage-600">{product.totalInventory}</span>
                </span>
              </div>
            )}

            {compact && (
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-semibold text-sage-700">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-sage-400">
                  Stock: <span className="font-medium text-sage-600">{product.totalInventory}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory expand / actions */}
      {!compact && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
            >
              <Package size={13} />
              Inventory
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={13} />
              </motion.span>
            </button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); openModal('edit-product', product.id); }}
                className="h-7 w-7 p-0"
                aria-label="Edit product"
              >
                <Edit2 size={13} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onDelete?.(product.id); }}
                className="h-7 w-7 p-0 hover:text-red-500 hover:bg-red-50"
                aria-label="Delete product"
              >
                <Trash2 size={13} />
              </Button>
            </div>
          </div>

          {/* Expandable inventory */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-beige-100">
                  <div className="grid grid-cols-3 gap-1.5">
                    {product.inventory.map((inv) => {
                      const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
                      const isOut = inv.quantity === 0;
                      return (
                        <div
                          key={inv.size}
                          className={cn(
                            'flex items-center justify-between px-2 py-1.5 rounded-lg text-xs',
                            isOut
                              ? 'bg-red-50 text-red-600'
                              : isLow
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-sage-50 text-sage-600'
                          )}
                        >
                          <span className="font-medium">{inv.size}</span>
                          <span className="font-bold">{inv.quantity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
