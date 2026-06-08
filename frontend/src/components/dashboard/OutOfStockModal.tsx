import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, XCircle, AlertOctagon, ImageIcon } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { useProductStore } from '@/store/productStore';
import { formatPrice } from '@/utils/format';

interface OutOfStockModalProps {
  open: boolean;
  onClose: () => void;
}

export function OutOfStockModal({ open, onClose }: OutOfStockModalProps) {
  const [search, setSearch] = useState('');
  const { getOutOfStockProducts } = useProductStore();
  const navigate = useNavigate();

  const outOfStockProducts = getOutOfStockProducts();
  const filtered = outOfStockProducts.filter(
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
      title={`Out of Stock (${outOfStockProducts.length})`}
      description="Products with one or more sizes at zero inventory"
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
            icon={<XCircle size={24} />}
            title={search ? 'No results' : 'No out of stock products'}
            description={search ? `No results for "${search}"` : 'All products have stock in every size'}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => {
              const outSizes = product.inventory.filter((inv) => inv.quantity === 0);
              const isCompletelyOut = product.inventory.every((inv) => inv.quantity === 0);

              return (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full text-left rounded-xl border border-red-100 bg-red-50/30 hover:bg-red-50/60 hover:border-red-200 transition-all overflow-hidden"
                >
                  <div className="p-3 flex items-center gap-3 cursor-pointer">
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-sage-800 truncate">{product.name}</p>
                        {isCompletelyOut && (
                          <Badge variant="danger">Completely Out</Badge>
                        )}
                      </div>
                      <p className="text-xs text-sage-400">{product.category}</p>
                      <p className="text-xs text-sage-500 font-medium mt-0.5">{formatPrice(product.price)}</p>
                    </div>
                    {isCompletelyOut ? (
                      <AlertOctagon size={16} className="text-red-500 flex-shrink-0" />
                    ) : (
                      <XCircle size={16} className="text-red-400 flex-shrink-0" />
                    )}
                  </div>

                  {/* Out of stock sizes */}
                  <div className="px-3 pb-3 cursor-pointer">
                    <p className="text-xs text-red-600 font-medium mb-1.5">Out of Stock Sizes:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {outSizes.map((inv) => (
                        <span
                          key={inv.size}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-100 text-red-700 text-xs font-semibold border border-red-200"
                        >
                          {inv.size} → <span>0</span>
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
