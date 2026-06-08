// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Plus, X, Factory } from 'lucide-react';
// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { EmptyState, SearchEmptyState } from '@/components/ui/EmptyState';
// import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
// import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
// import { ProductionCard } from '@/components/production/ProductionCard';
// import { useProductionStore } from '@/store/productionStore';
// import { useUIStore } from '@/store/uiStore';
// import { toast } from 'sonner';

// export function Production() {
//   const {
//     productions,
//     filters,
//     setFilters,
//     clearFilters,
//     getFilteredProductions,
//     deleteProduction,
//     isLoading,
//   } = useProductionStore();
//   const { openModal } = useUIStore();
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const filtered = getFilteredProductions();
//   const hasActiveFilters = filters.search || filters.category;

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     await deleteProduction(deleteId);
//     toast.success('Production entry deleted');
//     setDeleteId(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between mb-6"
//       >
//         <div>
//           <div className="flex items-center gap-2 mb-1">
//             <Factory size={18} className="text-sage-400" />
//             <span className="text-xs font-medium text-sage-400 uppercase tracking-widest">Manufacturing</span>
//           </div>
//           <h1 className="text-2xl font-bold text-sage-800" style={{ fontFamily: 'Georgia, serif' }}>
//             Production
//           </h1>
//           <p className="text-sm text-sage-400 mt-0.5">
//             {productions.length} total · {filtered.length} showing
//           </p>
//         </div>
//         <Button variant="primary" className="cursor-pointer" onClick={() => openModal('add-production')}>
//           <Plus size={16} />
//           <span className="hidden sm:inline">Add Production</span>
//         </Button>
//       </motion.div>

//       {/* Search */}
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="mb-5 space-y-3"
//       >
//         <div className="flex gap-3">
//           <div className="flex-1">
//             <Input
//               placeholder="Search by name or category..."
//               value={filters.search}
//               onChange={(e) => setFilters({ search: e.target.value })}
//               leftIcon={<Search size={15} />}
//               rightIcon={
//                 filters.search ? (
//                   <button onClick={() => setFilters({ search: '' })} className="cursor-pointer">
//                     <X size={14} className="hover:text-sage-600" />
//                   </button>
//                 ) : undefined
//               }
//             />
//           </div>
//           {hasActiveFilters && (
//             <Button variant="ghost" size="md" onClick={clearFilters} className="flex-shrink-0 text-sage-400 cursor-pointer">
//               <X size={16} />
//               <span className="hidden sm:inline">Clear</span>
//             </Button>
//           )}
//         </div>
//       </motion.div>

//       {/* Grid */}
//       {filtered.length === 0 ? (
//         filters.search ? (
//           <SearchEmptyState query={filters.search} />
//         ) : (
//           <EmptyState
//             icon={<Factory size={28} />}
//             title="No production entries"
//             description="Add production entries manually or use 'Add to Production' from a product"
//             action={
//               <Button variant="primary" className="cursor-pointer" onClick={() => openModal('add-production')}>
//                 <Plus size={16} />
//                 Add Production
//               </Button>
//             }
//           />
//         )
//       ) : (
//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           <AnimatePresence>
//             {filtered.map((prod) => (
//               <ProductionCard key={prod.id} production={prod} onDelete={setDeleteId} />
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       )}

//       <ConfirmDialog
//         open={!!deleteId}
//         title="Delete Production Entry?"
//         message="This action cannot be undone."
//         confirmLabel="Delete"
//         cancelLabel="Cancel"
//         variant="danger"
//         onConfirm={handleDelete}
//         onCancel={() => setDeleteId(null)}
//       />
//     </div>
//   );
// }

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Factory } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { EmptyState, SearchEmptyState } from '@/components/ui/EmptyState';
import { ProductCardSkeleton } from '@/components/ui/SkeletonCard';
import { ProductionCard } from '@/components/production/ProductionCard';
import { useProductionStore } from '@/store/productionStore';

export function Production() {
  const { filters, setFilters, clearFilters, getFilteredProductions, isLoading, productions } =
    useProductionStore();

  const filtered = getFilteredProductions();
  const hasActiveFilters = filters.search || filters.category;

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
          <Factory size={18} className="text-sage-400" />
          <span className="text-xs font-medium text-sage-400 uppercase tracking-widest">
            Manufacturing
          </span>
        </div>
        <h1 className="text-2xl font-bold text-sage-800" style={{ fontFamily: 'Georgia, serif' }}>
          Production
        </h1>
        <p className="text-sm text-sage-400 mt-0.5">
          {productions.length} total · {filtered.length} showing · Auto-synced from Products
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
              placeholder="Search by name or category..."
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
          {hasActiveFilters && (
            <Button variant="ghost" size="md" onClick={clearFilters} className="cursor-pointer text-sage-400">
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
            icon={<Factory size={28} />}
            title="No production entries yet"
            description="Production entries are created automatically when you add a product"
          />
        )
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((prod) => (
              <ProductionCard key={prod.id} production={prod} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}