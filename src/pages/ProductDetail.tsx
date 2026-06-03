import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Package,
  Tag,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EditProductModal } from '@/components/products/EditProductModal';
import { useProductStore } from '@/store/productStore';
import { formatPrice, formatDate, getStockStatus } from '@/utils/format';
import { LOW_STOCK_THRESHOLD } from '@/types';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProductStore();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-sage-300 mb-4">
          <Package size={48} className="mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-sage-600 mb-2">Product not found</h2>
        <p className="text-sage-400 mb-6">This product may have been deleted</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.inventory);
  const stockBadge = {
    'in-stock': { label: 'In Stock', variant: 'success' as const },
    'low-stock': { label: 'Low Stock', variant: 'warning' as const },
    'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
    'completely-out-of-stock': { label: 'Completely Out of Stock', variant: 'danger' as const },
  }[stockStatus];

  const handleDelete = async () => {
    await deleteProduct(product.id);
    toast.success('Product deleted');
    navigate('/products');
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-sage-500 hover:text-sage-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Main Image */}
          <div
            className={cn(
              'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
              product.images.length > 0 && 'cursor-zoom-in'
            )}
            style={{ aspectRatio: '4/5' }}
            onClick={() => product.images.length > 0 && setZoomed(true)}
          >
            {product.images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={16} className="text-sage-600" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                    >
                      <ChevronRight size={16} className="text-sage-600" />
                    </button>
                  </>
                )}

                {/* Zoom hint */}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <ZoomIn size={12} className="text-sage-500" />
                  <span className="text-xs text-sage-500">Click to zoom</span>
                </div>

                {/* Image counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                    {selectedImage + 1}/{product.images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
                <ImageIcon size={48} />
                <span className="text-sm mt-2 text-sage-300">No images</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    'w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all',
                    idx === selectedImage
                      ? 'border-sage-400 shadow-sm'
                      : 'border-transparent hover:border-sage-200'
                  )}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1
                className="text-2xl font-bold text-sage-800 leading-tight"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                  <Tag size={11} />
                  {product.category}
                </span>
                <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEdit(true)}
              >
                <Edit2 size={14} />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDelete(true)}
                className="hover:text-red-500 hover:bg-red-50 border border-red-100"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-sage-50 rounded-xl p-4 border border-sage-100">
            <p className="text-xs text-sage-400 font-medium uppercase tracking-wide mb-1">Price</p>
            <p className="text-3xl font-bold text-sage-700">{formatPrice(product.price)}</p>
          </div>

          {/* Inventory Summary */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Package size={14} />
                Inventory by Size
              </p>
              <span className="text-xs font-medium text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                Total: <span className="font-bold text-sage-700">{product.totalInventory}</span>
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {product.inventory.map((inv) => {
                const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
                const isOut = inv.quantity === 0;
                return (
                  <div
                    key={inv.size}
                    className={cn(
                      'flex flex-col items-center py-3 rounded-xl border',
                      isOut
                        ? 'bg-red-50 border-red-100'
                        : isLow
                        ? 'bg-amber-50 border-amber-100'
                        : 'bg-white border-beige-100'
                    )}
                  >
                    <span
                      className={cn(
                        'text-xs font-semibold mb-1',
                        isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-500'
                      )}
                    >
                      {inv.size}
                    </span>
                    <span
                      className={cn(
                        'text-lg font-bold',
                        isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-sage-800'
                      )}
                    >
                      {inv.quantity}
                    </span>
                    {isLow && !isOut && (
                      <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>
                    )}
                    {isOut && (
                      <span className="text-[9px] text-red-500 font-medium mt-0.5">Out</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-beige-100 space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <Calendar size={14} className="flex-shrink-0" />
              <span>Added: <span className="text-sage-600 font-medium">{formatDate(product.createdAt)}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <RefreshCw size={14} className="flex-shrink-0" />
              <span>Updated: <span className="text-sage-600 font-medium">{formatDate(product.updatedAt)}</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && product.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <EditProductModal
        open={showEdit}
        productId={product.id}
        onClose={() => setShowEdit(false)}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={showDelete}
        title="Delete Product?"
        message="This action cannot be undone. The product and all its inventory data will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}
