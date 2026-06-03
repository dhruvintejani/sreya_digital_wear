import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, ImageIcon } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProductStore } from '@/store/productStore';
import { formatPrice } from '@/utils/format';
import { LOW_STOCK_THRESHOLD } from '@/types';

interface LowStockModalProps {
  open: boolean;
  onClose: () => void;
}

export function LowStockModal({ open, onClose }: LowStockModalProps) {
  const [search, setSearch] = useState('');
  const { getLowStockProducts } = useProductStore();
  const navigate = useNavigate();

  const lowStockProducts = getLowStockProducts();
  const filtered = lowStockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductClick = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Low Stock Products (${lowStockProducts.length})`}
      description={`Products with any size having ≤${LOW_STOCK_THRESHOLD} units`}
      size="2xl"
    >
      <div className="px-6 pb-2 pt-4">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={15} />}
        />
      </div>

      <div className="overflow-y-auto max-h-[60vh] px-6 pb-6 mt-3">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<AlertTriangle size={24} />}
            title={search ? 'No results' : 'No low stock products'}
            description={search ? `No results for "${search}"` : 'All sizes have sufficient inventory'}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => {
              const lowSizes = product.inventory.filter(
                (inv) => inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD
              );

              return (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full text-left rounded-xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50/60 hover:border-amber-200 transition-all overflow-hidden"
                >
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-beige-100 overflow-hidden flex-shrink-0">
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={16} className="text-sage-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-sage-800 truncate">{product.name}</p>
                      <p className="text-xs text-sage-400">{product.category}</p>
                      <p className="text-xs text-sage-500 font-medium mt-0.5">{formatPrice(product.price)}</p>
                    </div>
                    <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
                  </div>

                  {/* Low stock sizes */}
                  <div className="px-3 pb-3">
                    <p className="text-xs text-amber-600 font-medium mb-1.5">Low Stock Sizes:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {lowSizes.map((inv) => (
                        <span
                          key={inv.size}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200"
                        >
                          {inv.size} → <span className="text-amber-700">{inv.quantity}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
