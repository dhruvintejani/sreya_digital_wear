import { motion, AnimatePresence } from 'framer-motion';
import { SizeInventory } from '@/types';
import { cn } from '@/utils/cn';

interface InventoryInputsProps {
  sizes: string[];
  inventory: SizeInventory[];
  onChange: (inventory: SizeInventory[]) => void;
  error?: string;
}

export function InventoryInputs({ sizes, inventory, onChange, error }: InventoryInputsProps) {
  const getQuantity = (size: string): number => {
    return inventory.find((i) => i.size === size)?.quantity ?? 0;
  };

  const handleQuantityChange = (size: string, value: string) => {
    const parsed = parseInt(value, 10);
    const quantity = isNaN(parsed) || parsed < 0 ? 0 : parsed;

    const existingIndex = inventory.findIndex((i) => i.size === size);
    if (existingIndex >= 0) {
      const updated = [...inventory];
      updated[existingIndex] = { ...updated[existingIndex], quantity };
      onChange(updated);
    } else {
      onChange([...inventory, { size, quantity }]);
    }
  };

  const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);

  if (sizes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
        <p className="text-sm text-sage-400">Select sizes above to set inventory quantities</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-sage-700">
          Inventory per Size
        </label>
        <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
          Total: <span className="font-semibold text-sage-700">{totalInventory}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <AnimatePresence>
          {sizes.map((size) => {
            const qty = getQuantity(size);
            const isLow = qty > 0 && qty <= 5;
            const isOut = qty === 0;

            return (
              <motion.div
                key={size}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'relative flex items-center gap-2 rounded-xl border p-2.5 transition-all',
                  isOut
                    ? 'border-red-200 bg-red-50/50'
                    : isLow
                    ? 'border-amber-200 bg-amber-50/50'
                    : 'border-sage-100 bg-white hover:border-sage-200'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-semibold w-10 flex-shrink-0',
                    isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600'
                  )}
                >
                  {size}
                </span>
                <input
                  type="number"
                  min="0"
                  value={qty === 0 ? '' : qty}
                  placeholder="0"
                  onChange={(e) => handleQuantityChange(size, e.target.value)}
                  className={cn(
                    'w-full text-sm font-medium bg-transparent border-none outline-none text-right',
                    isOut ? 'text-red-500 placeholder:text-red-300' : 'text-sage-800 placeholder:text-sage-300'
                  )}
                />
                {isLow && !isOut && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-400 rounded-full border border-white" title="Low stock" />
                )}
                {isOut && (
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-400 rounded-full border border-white" title="Out of stock" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
