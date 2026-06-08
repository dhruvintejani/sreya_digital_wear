import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ImageIcon } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProductStore } from '@/store/productStore';
import { formatPrice, getStockStatus } from '@/utils/format';

interface TotalProductsModalProps {
  open: boolean;
  onClose: () => void;
}

export function TotalProductsModal({ open, onClose }: TotalProductsModalProps) {
  const [search, setSearch] = useState('');
  const { products } = useProductStore();
  const navigate = useNavigate();

  const filtered = products.filter(
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
      title={`All Products (${products.length})`}
      size="2xl"
    >
      <div className="px-6 pb-2 pt-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={15} />}
        />
      </div>

      <div className="overflow-y-auto max-h-[60vh] px-6 pb-6">
        {filtered.length === 0 ? (
          <EmptyState
            title={search ? 'No products found' : 'No products yet'}
            description={search ? `No results for "${search}"` : 'Add your first product to get started'}
          />
        ) : (
          <div className="space-y-2 mt-3">
            {filtered.map((product) => {
              const stockStatus = getStockStatus(product.inventory);
              const badgeMap = {
                'in-stock': { label: 'In Stock', variant: 'success' as const },
                'low-stock': { label: 'Low Stock', variant: 'warning' as const },
                'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
                'completely-out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
              };
              const badge = badgeMap[stockStatus];

              return (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-sage-50 transition-colors text-left border border-transparent hover:border-sage-100"
                >
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
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-sm font-semibold text-sage-700">{formatPrice(product.price)}</span>
                    <span className="text-xs text-sage-400">Stock: {product.totalInventory}</span>
                  </div>
                  <Badge variant={badge.variant}>{badge.label}</Badge>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
}
