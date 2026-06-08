// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Trash2, ChevronDown, Package, ImageIcon } from 'lucide-react';
// // import { Button } from '@/components/ui/Button';
// // import { Production } from '@/types';
// // // import { cn } from '@/utils/cn';

// // interface ProductionCardProps {
// //   production: Production;
// //   onDelete?: (id: string) => void;
// // }

// // export function ProductionCard({ production, onDelete }: ProductionCardProps) {
// //   const navigate = useNavigate();
// //   const [expanded, setExpanded] = useState(false);

// //   const mainImage = production.images[0];

// //   const handleCardClick = (e: React.MouseEvent) => {
// //     if ((e.target as HTMLElement).closest('button')) return;
// //     navigate(`/production/${production.id}`);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       exit={{ opacity: 0, scale: 0.95 }}
// //       layout
// //       className="premium-card overflow-hidden group"
// //     >
// //       <div className="cursor-pointer" onClick={handleCardClick}>
// //         {/* Image */}
// //         <div className="relative h-48 bg-beige-50 overflow-hidden">
// //           {mainImage ? (
// //             <img
// //               src={mainImage}
// //               alt={production.name}
// //               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //             />
// //           ) : (
// //             <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
// //               <ImageIcon size={36} />
// //               <span className="text-xs mt-2 text-sage-300">No image</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Info */}
// //         <div className="p-4 space-y-1">
// //           <div className="flex items-start justify-between gap-2">
// //             <div className="min-w-0">
// //               <h3 className="font-semibold text-sage-800 truncate text-base">{production.name}</h3>
// //               <p className="text-xs text-sage-400 mt-0.5">{production.category}</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center justify-between pt-1">
// //             <span className="text-xs text-sage-400">
// //               Total: <span className="font-medium text-sage-600">{production.totalInventory}</span> units
// //             </span>
// //             <span className="text-xs text-sage-400">
// //               {production.inventory.length} size{production.inventory.length !== 1 ? 's' : ''}
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Actions */}
// //       <div className="px-4 pb-4">
// //         <div className="flex items-center justify-between">
// //           <button
// //             onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
// //             className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
// //           >
// //             <Package size={13} />
// //             Quantities
// //             <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
// //               <ChevronDown size={13} />
// //             </motion.span>
// //           </button>
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={(e) => { e.stopPropagation(); onDelete?.(production.id); }}
// //             className="h-7 w-7 p-0 hover:text-red-500 hover:bg-red-50 cursor-pointer"
// //             aria-label="Delete"
// //           >
// //             <Trash2 size={13} />
// //           </Button>
// //         </div>

// //         <AnimatePresence>
// //           {expanded && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.25 }}
// //               className="overflow-hidden"
// //             >
// //               <div className="mt-3 pt-3 border-t border-beige-100">
// //                 <div className="grid grid-cols-3 gap-1.5">
// //                   {production.inventory.map((inv) => (
// //                     <div
// //                       key={inv.size}
// //                       className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-sage-50 text-sage-600"
// //                     >
// //                       <span className="font-medium">{inv.size}</span>
// //                       <span className="font-bold">{inv.quantity}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Trash2, ChevronDown, Package, ImageIcon } from 'lucide-react';
// // import { Button } from '@/components/ui/Button';
// // import { Production } from '@/types';
// // // import { cn } from '@/utils/cn';

// // interface ProductionCardProps {
// //   production: Production;
// //   onDelete?: (id: string) => void;
// // }

// // export function ProductionCard({ production, onDelete }: ProductionCardProps) {
// //   const navigate = useNavigate();
// //   const [expanded, setExpanded] = useState(false);

// //   const mainImage = production.images[0];

// //   const handleCardClick = (e: React.MouseEvent) => {
// //     if ((e.target as HTMLElement).closest('button')) return;
// //     navigate(`/production/${production.id}`);
// //   };

// //   const handleToggleExpand = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setExpanded((prev) => !prev);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       exit={{ opacity: 0, scale: 0.95 }}
// //       layout
// //       className="premium-card overflow-hidden group"
// //     >
// //       <div className="cursor-pointer" onClick={handleCardClick}>
// //         {/* Image */}
// //         <div className="relative h-48 bg-beige-50 overflow-hidden">
// //           {mainImage ? (
// //             <img
// //               src={mainImage}
// //               alt={production.name}
// //               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //             />
// //           ) : (
// //             <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
// //               <ImageIcon size={36} />
// //               <span className="text-xs mt-2 text-sage-300">No image</span>
// //             </div>
// //           )}
// //         </div>

// //         {/* Info */}
// //         <div className="p-4 space-y-1">
// //           <h3 className="font-semibold text-sage-800 truncate text-base">{production.name}</h3>
// //           <p className="text-xs text-sage-400">{production.category}</p>
// //           <div className="flex items-center justify-between pt-1">
// //             <span className="text-xs text-sage-400">
// //               Total:{' '}
// //               <span className="font-medium text-sage-600">{production.totalInventory}</span> units
// //             </span>
// //             <span className="text-xs text-sage-400">
// //               {production.inventory.length} size
// //               {production.inventory.length !== 1 ? 's' : ''}
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Actions */}
// //       <div className="px-4 pb-4">
// //         <div className="flex items-center justify-between">
// //           <button
// //             onClick={handleToggleExpand}
// //             className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
// //           >
// //             <Package size={13} />
// //             Quantities
// //             <motion.span
// //               animate={{ rotate: expanded ? 180 : 0 }}
// //               transition={{ duration: 0.2 }}
// //               className="inline-flex"
// //             >
// //               <ChevronDown size={13} />
// //             </motion.span>
// //           </button>

// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               onDelete?.(production.id);
// //             }}
// //             className="h-7 w-7 p-0 hover:text-red-500 hover:bg-red-50 cursor-pointer"
// //             aria-label="Delete"
// //           >
// //             <Trash2 size={13} />
// //           </Button>
// //         </div>

// //         <AnimatePresence initial={false}>
// //           {expanded && (
// //             <motion.div
// //               key={`quantities-${production.id}`}
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               transition={{ duration: 0.25 }}
// //               className="overflow-hidden"
// //             >
// //               <div className="mt-3 pt-3 border-t border-beige-100">
// //                 <div className="grid grid-cols-3 gap-1.5">
// //                   {production.inventory.map((inv) => (
// //                     <div
// //                       key={`${production.id}-${inv.size}`}
// //                       className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-sage-50 text-sage-600"
// //                     >
// //                       <span className="font-medium">{inv.size}</span>
// //                       <span className="font-bold">{inv.quantity}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </motion.div>
// //   );
// // }


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Trash2, ChevronDown, Package, ImageIcon } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { Production } from '@/types';
// import { cn } from '@/utils/cn';

// interface ProductionCardProps {
//   production: Production;
//   onDelete?: (id: string) => void;
// }

// export function ProductionCard({ production, onDelete }: ProductionCardProps) {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(false);

//   const mainImage = production.images[0];

//   const handleCardClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest('button')) return;
//     navigate(`/production/${production.id}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       layout
//       className="premium-card overflow-hidden group"
//     >
//       <div className="cursor-pointer" onClick={handleCardClick}>
//         {/* Image */}
//         <div className="relative h-48 bg-beige-50 overflow-hidden">
//           {mainImage ? (
//             <img
//               src={mainImage}
//               alt={production.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
//               <ImageIcon size={36} />
//               <span className="text-xs mt-2 text-sage-300">No image</span>
//             </div>
//           )}
//         </div>

//         {/* Info */}
//         <div className="p-4 space-y-1">
//           <h3 className="font-semibold text-sage-800 truncate text-base">
//             {production.name}
//           </h3>
//           <p className="text-xs text-sage-400">{production.category}</p>
//           <div className="flex items-center justify-between pt-1">
//             <span className="text-xs text-sage-400">
//               Total:{' '}
//               <span className="font-medium text-sage-600">
//                 {production.totalInventory}
//               </span>{' '}
//               units
//             </span>
//             <span className="text-xs text-sage-400">
//               {production.inventory.length} size
//               {production.inventory.length !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="px-4 pb-4">
//         <div className="flex items-center justify-between mb-2">
//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               setExpanded((prev) => !prev);
//             }}
//             className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
//           >
//             <Package size={13} />
//             Quantities
//             <motion.span
//               animate={{ rotate: expanded ? 180 : 0 }}
//               transition={{ duration: 0.2 }}
//               className="inline-flex"
//             >
//               <ChevronDown size={13} />
//             </motion.span>
//           </button>

//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete?.(production.id);
//             }}
//             className="h-7 w-7 p-0 hover:text-red-500 hover:bg-red-50 cursor-pointer"
//             aria-label="Delete"
//           >
//             <Trash2 size={13} />
//           </Button>
//         </div>

//         {/* Expandable quantities
//             Key includes production.id so framer-motion never
//             confuses animation state between different cards */}
//         <AnimatePresence initial={false}>
//           {expanded && (
//             <motion.div
//               key={`qty-${production.id}`}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.22, ease: 'easeInOut' }}
//               style={{ overflow: 'hidden' }}
//             >
//               <div className="pt-3 border-t border-beige-100">
//                 <div className="grid grid-cols-3 gap-1.5">
//                   {production.inventory.map((inv) => (
//                     <div
//                       key={inv.size}
//                       className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-sage-50 text-sage-600"
//                     >
//                       <span className="font-medium">{inv.size}</span>
//                       <span className="font-bold">{inv.quantity}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, ImageIcon } from 'lucide-react';
import { Production } from '@/types';
// import { cn } from '@/utils/cn';

interface ProductionCardProps {
  production: Production;
}

export function ProductionCard({ production }: ProductionCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const mainImage = production.images[0];

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/production/${production.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="premium-card overflow-hidden group"
    >
      <div className="cursor-pointer" onClick={handleCardClick}>
        <div className="relative h-48 bg-beige-50 overflow-hidden">
          {mainImage ? (
            <img
              src={mainImage}
              alt={production.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
              <ImageIcon size={36} />
              <span className="text-xs mt-2 text-sage-300">No image</span>
            </div>
          )}
        </div>

        <div className="p-4 space-y-1">
          <h3 className="font-semibold text-sage-800 truncate text-base">{production.name}</h3>
          <p className="text-xs text-sage-400">{production.category}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-sage-400">
              Total: <span className="font-medium text-sage-600">{production.totalInventory}</span> units
            </span>
            <span className="text-xs text-sage-400">
              {production.inventory.length} size{production.inventory.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Expand quantities */}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}
          className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
        >
          <Package size={13} />
          Quantities
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
            <ChevronDown size={13} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key={`qty-${production.id}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="mt-3 pt-3 border-t border-beige-100">
                <div className="grid grid-cols-3 gap-1.5">
                  {production.inventory.map((inv) => (
                    <div
                      key={inv.size}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs bg-sage-50 text-sage-600"
                    >
                      <span className="font-medium">{inv.size}</span>
                      <span className="font-bold">{inv.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}