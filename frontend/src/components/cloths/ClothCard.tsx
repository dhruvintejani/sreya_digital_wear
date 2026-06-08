// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronDown, Scissors, ImageIcon } from 'lucide-react';
// import { Cloth } from '@/types';
// import { cn } from '@/utils/cn';

// interface ClothCardProps {
//   cloth: Cloth;
// }

// export function ClothCard({ cloth }: ClothCardProps) {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(false);
//   const mainImage = cloth.images[0];

//   const handleCardClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest('button')) return;
//     navigate(`/cloths/${cloth.id}`);
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
//               alt={cloth.name}
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
//           <h3 className="font-semibold text-sage-800 truncate text-base">{cloth.name}</h3>
//           <div className="flex items-center justify-between pt-1">
//             <span className="text-xs text-sage-400">
//               Total:{' '}
//               <span className="font-medium text-sage-600">{cloth.totalMeters}m</span>
//             </span>
//             <span className="text-xs text-sage-400">
//               {cloth.items.length} item{cloth.items.length !== 1 ? 's' : ''}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Expand items */}
//       <div className="px-4 pb-4">
//         <button
//           type="button"
//           onClick={(e) => { e.stopPropagation(); setExpanded((p) => !p); }}
//           className="flex items-center cursor-pointer gap-1.5 text-xs text-sage-500 hover:text-sage-700 transition-colors"
//         >
//           <Scissors size={13} />
//           Fabric Items
//           <motion.span
//             animate={{ rotate: expanded ? 180 : 0 }}
//             transition={{ duration: 0.2 }}
//             className="inline-flex"
//           >
//             <ChevronDown size={13} />
//           </motion.span>
//         </button>

//         <AnimatePresence initial={false}>
//           {expanded && (
//             <motion.div
//               key={`items-${cloth.id}`}
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.22 }}
//               style={{ overflow: 'hidden' }}
//             >
//               <div className="mt-3 pt-3 border-t border-beige-100 space-y-1.5">
//                 {cloth.items.length === 0 ? (
//                   <p className="text-xs text-sage-400 italic">
//                     No items yet. Click to open and add fabric items.
//                   </p>
//                 ) : (
//                   cloth.items.map((item, idx) => (
//                     <div
//                       key={idx}
//                       className={cn(
//                         'flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs',
//                         'bg-sage-50 text-sage-600'
//                       )}
//                     >
//                       <span className="font-medium truncate">{item.item}</span>
//                       <span className="font-bold ml-2 flex-shrink-0">{item.meters}m</span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.div>
//   );
// }


import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageIcon, Scissors } from 'lucide-react';
import { Cloth } from '@/types';

interface ClothCardProps {
  cloth: Cloth;
}

export function ClothCard({ cloth }: ClothCardProps) {
  const navigate = useNavigate();
  const mainImage = cloth.images[0];
  // Get meters from single item storage
  const meters = cloth.items.length > 0 ? cloth.items[0].meters : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className="premium-card overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/cloths/${cloth.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 bg-beige-50 overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage}
            alt={cloth.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
            <ImageIcon size={36} />
            <span className="text-xs mt-2 text-sage-300">No image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sage-800 truncate text-base mb-1">{cloth.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sage-400">
            <Scissors size={13} />
            <span className="text-xs">Cloth meters</span>
          </div>
          <span className="text-xl font-bold text-sage-800">
            {meters}
            <span className="text-sm font-medium text-sage-400 ml-1">m</span>
          </span>
        </div>
        {meters === 0 && (
          <p className="text-xs text-sage-400 italic mt-1">Tap to set meters</p>
        )}
      </div>
    </motion.div>
  );
}