import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronUp, ChevronDown, ImageIcon } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProductStore } from '@/store/productStore';
import { formatPrice } from '@/utils/format';
import { LOW_STOCK_THRESHOLD } from '@/types';
import { cn } from '@/utils/cn';

interface TotalInventoryModalProps {
  open: boolean;
  onClose: () => void;
}

type SortField = 'name' | 'category' | 'total';
type SortDir = 'asc' | 'desc';

export function TotalInventoryModal({ open, onClose }: TotalInventoryModalProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const { products } = useProductStore();
  const navigate = useNavigate();

  const filtered = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'category') cmp = a.category.localeCompare(b.category);
      else if (sortField === 'total') cmp = a.totalInventory - b.totalInventory;
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const totalAll = products.reduce((s, p) => s + p.totalInventory, 0);

  const handleProductClick = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Inventory Breakdown`}
      description={`Total stock: ${totalAll.toLocaleString('en-IN')} units across ${products.length} products`}
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

      {/* Sort controls */}
      <div className="px-6 pt-3">
        <div className="flex gap-2 text-xs">
          {([['name', 'Name'], ['category', 'Category'], ['total', 'Total Stock']] as [SortField, string][]).map(([field, label]) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer',
                sortField === field
                  ? 'bg-sage-100 border-sage-200 text-sage-700 font-medium'
                  : 'border-beige-200 text-sage-400 hover:border-sage-200 hover:text-sage-600'
              )}
            >
              {label}
              <SortIcon field={field} />
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-y-auto max-h-[60vh] px-6 pb-6 mt-3">
        {filtered.length === 0 ? (
          <EmptyState title="No products found" />
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full text-left rounded-xl border border-beige-100 hover:border-sage-200 hover:bg-sage-50/30 transition-all overflow-hidden"
              >
                <div className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-beige-100 overflow-hidden flex-shrink-0">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={14} className="text-sage-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-sage-800 truncate">{product.name}</p>
                    <p className="text-xs text-sage-400">{product.category} · {formatPrice(product.price)}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-bold text-sage-700">{product.totalInventory}</p>
                    <p className="text-xs text-sage-400">units</p>
                  </div>
                </div>

                {/* Size breakdown */}
                <div className="px-3 pb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {product.inventory.map((inv) => {
                      const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
                      const isOut = inv.quantity === 0;
                      return (
                        <span
                          key={inv.size}
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
                            isOut
                              ? 'bg-red-50 text-red-600 border border-red-100'
                              : isLow
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-sage-50 text-sage-600 border border-sage-100'
                          )}
                        >
                          <span>{inv.size}</span>
                          <span className="font-bold">→ {inv.quantity}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
