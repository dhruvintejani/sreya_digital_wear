// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { SizeInventory } from '@/types';
// // // // import { cn } from '@/utils/cn';

// // // // interface InventoryInputsProps {
// // // //   sizes: string[];
// // // //   inventory: SizeInventory[];
// // // //   onChange: (inventory: SizeInventory[]) => void;
// // // //   error?: string;
// // // // }

// // // // export function InventoryInputs({ sizes, inventory, onChange, error }: InventoryInputsProps) {
// // // //   const getQuantity = (size: string): number => {
// // // //     return inventory.find((i) => i.size === size)?.quantity ?? 0;
// // // //   };

// // // //   const handleQuantityChange = (size: string, value: string) => {
// // // //     const parsed = parseInt(value, 10);
// // // //     const quantity = isNaN(parsed) || parsed < 0 ? 0 : parsed;

// // // //     const existingIndex = inventory.findIndex((i) => i.size === size);
// // // //     if (existingIndex >= 0) {
// // // //       const updated = [...inventory];
// // // //       updated[existingIndex] = { ...updated[existingIndex], quantity };
// // // //       onChange(updated);
// // // //     } else {
// // // //       onChange([...inventory, { size, quantity }]);
// // // //     }
// // // //   };

// // // //   const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);

// // // //   if (sizes.length === 0) {
// // // //     return (
// // // //       <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
// // // //         <p className="text-sm text-sage-400">Select sizes above to set inventory quantities</p>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="space-y-3">
// // // //       <div className="flex items-center justify-between">
// // // //         <label className="text-sm font-medium text-sage-700">
// // // //           Inventory per Size
// // // //         </label>
// // // //         <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
// // // //           Total: <span className="font-semibold text-sage-700">{totalInventory}</span>
// // // //         </div>
// // // //       </div>

// // // //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
// // // //         <AnimatePresence>
// // // //           {sizes.map((size) => {
// // // //             const qty = getQuantity(size);
// // // //             const isLow = qty > 0 && qty <= 5;
// // // //             const isOut = qty === 0;

// // // //             return (
// // // //               <motion.div
// // // //                 key={size}
// // // //                 initial={{ opacity: 0, scale: 0.9 }}
// // // //                 animate={{ opacity: 1, scale: 1 }}
// // // //                 exit={{ opacity: 0, scale: 0.9 }}
// // // //                 transition={{ duration: 0.15 }}
// // // //                 className={cn(
// // // //                   'relative flex items-center gap-2 rounded-xl border p-2.5 transition-all',
// // // //                   isOut
// // // //                     ? 'border-red-200 bg-red-50/50'
// // // //                     : isLow
// // // //                     ? 'border-amber-200 bg-amber-50/50'
// // // //                     : 'border-sage-100 bg-white hover:border-sage-200'
// // // //                 )}
// // // //               >
// // // //                 <span
// // // //                   className={cn(
// // // //                     'text-xs font-semibold w-10 flex-shrink-0',
// // // //                     isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600'
// // // //                   )}
// // // //                 >
// // // //                   {size}
// // // //                 </span>
// // // //                 <input
// // // //                   type="number"
// // // //                   min="0"
// // // //                   value={qty === 0 ? '' : qty}
// // // //                   placeholder="0"
// // // //                   onChange={(e) => handleQuantityChange(size, e.target.value)}
// // // //                   className={cn(
// // // //                     'w-full text-sm font-medium bg-transparent border-none outline-none text-right',
// // // //                     isOut ? 'text-red-500 placeholder:text-red-300' : 'text-sage-800 placeholder:text-sage-300'
// // // //                   )}
// // // //                 />
// // // //                 {isLow && !isOut && (
// // // //                   <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-400 rounded-full border border-white" title="Low stock" />
// // // //                 )}
// // // //                 {isOut && (
// // // //                   <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-400 rounded-full border border-white" title="Out of stock" />
// // // //                 )}
// // // //               </motion.div>
// // // //             );
// // // //           })}
// // // //         </AnimatePresence>
// // // //       </div>

// // // //       {error && <p className="text-xs text-red-500">{error}</p>}
// // // //     </div>
// // // //   );
// // // // }


// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Minus, Plus } from 'lucide-react';
// // // import { SizeInventory } from '@/types';
// // // import { cn } from '@/utils/cn';

// // // interface InventoryInputsProps {
// // //   sizes: string[];
// // //   inventory: SizeInventory[];
// // //   onChange: (inventory: SizeInventory[]) => void;
// // //   error?: string;
// // // }

// // // export function InventoryInputs({ sizes, inventory, onChange, error }: InventoryInputsProps) {
// // //   const getQuantity = (size: string): number =>
// // //     inventory.find((i) => i.size === size)?.quantity ?? 0;

// // //   const setQuantity = (size: string, quantity: number) => {
// // //     const safe = Math.max(0, quantity);
// // //     const idx = inventory.findIndex((i) => i.size === size);
// // //     if (idx >= 0) {
// // //       const updated = [...inventory];
// // //       updated[idx] = { ...updated[idx], quantity: safe };
// // //       onChange(updated);
// // //     } else {
// // //       onChange([...inventory, { size, quantity: safe }]);
// // //     }
// // //   };

// // //   const handleInput = (size: string, value: string) => {
// // //     const parsed = parseInt(value, 10);
// // //     setQuantity(size, isNaN(parsed) ? 0 : parsed);
// // //   };

// // //   const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);

// // //   if (sizes.length === 0) {
// // //     return (
// // //       <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
// // //         <p className="text-sm text-sage-400">Select sizes above to set inventory quantities</p>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="space-y-3">
// // //       <div className="flex items-center justify-between">
// // //         <label className="text-sm font-medium text-sage-700">Inventory per Size</label>
// // //         <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
// // //           Total: <span className="font-semibold text-sage-700">{totalInventory}</span>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
// // //         <AnimatePresence>
// // //           {sizes.map((size) => {
// // //             const qty = getQuantity(size);
// // //             const isLow = qty > 0 && qty <= 5;
// // //             const isOut = qty === 0;

// // //             return (
// // //               <motion.div
// // //                 key={size}
// // //                 initial={{ opacity: 0, scale: 0.9 }}
// // //                 animate={{ opacity: 1, scale: 1 }}
// // //                 exit={{ opacity: 0, scale: 0.9 }}
// // //                 transition={{ duration: 0.15 }}
// // //                 className={cn(
// // //                   'rounded-xl border p-2.5 transition-all',
// // //                   isOut
// // //                     ? 'border-red-200 bg-red-50/50'
// // //                     : isLow
// // //                     ? 'border-amber-200 bg-amber-50/50'
// // //                     : 'border-sage-100 bg-white hover:border-sage-200'
// // //                 )}
// // //               >
// // //                 {/* Size label */}
// // //                 <span
// // //                   className={cn(
// // //                     'block text-xs font-semibold mb-2',
// // //                     isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600'
// // //                   )}
// // //                 >
// // //                   {size}
// // //                 </span>

// // //                 {/* Controls row: minus | input | plus */}
// // //                 <div className="flex items-center gap-1">
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setQuantity(size, qty - 1)}
// // //                     disabled={qty <= 0}
// // //                     className={cn(
// // //                       'w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg border transition-all cursor-pointer',
// // //                       'hover:bg-sage-100 hover:border-sage-300 disabled:opacity-30 disabled:cursor-not-allowed',
// // //                       isOut ? 'border-red-200 text-red-400' : 'border-sage-200 text-sage-500'
// // //                     )}
// // //                   >
// // //                     <Minus size={11} />
// // //                   </button>

// // //                   <input
// // //                     type="number"
// // //                     min="0"
// // //                     value={qty === 0 ? '' : qty}
// // //                     placeholder="0"
// // //                     onChange={(e) => handleInput(size, e.target.value)}
// // //                     className={cn(
// // //                       'flex-1 min-w-0 w-full text-center text-sm font-semibold bg-transparent border rounded-lg py-1 px-1',
// // //                       'focus:outline-none focus:ring-1 focus:ring-sage-300',
// // //                       'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
// // //                       isOut
// // //                         ? 'text-red-500 border-red-200 placeholder:text-red-300'
// // //                         : 'text-sage-800 border-sage-200 placeholder:text-sage-300'
// // //                     )}
// // //                   />

// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setQuantity(size, qty + 1)}
// // //                     className={cn(
// // //                       'w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg border transition-all cursor-pointer',
// // //                       'hover:bg-sage-100 hover:border-sage-300',
// // //                       isOut ? 'border-red-200 text-red-400' : 'border-sage-200 text-sage-500'
// // //                     )}
// // //                   >
// // //                     <Plus size={11} />
// // //                   </button>
// // //                 </div>

// // //                 {/* Stock badges */}
// // //                 <div className="mt-1.5 h-3">
// // //                   {isLow && !isOut && (
// // //                     <span className="text-[9px] text-amber-500 font-medium">Low stock</span>
// // //                   )}
// // //                   {isOut && (
// // //                     <span className="text-[9px] text-red-500 font-medium">Out of stock</span>
// // //                   )}
// // //                 </div>
// // //               </motion.div>
// // //             );
// // //           })}
// // //         </AnimatePresence>
// // //       </div>

// // //       {error && <p className="text-xs text-red-500">{error}</p>}
// // //     </div>
// // //   );
// // // }


// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Minus, Plus } from 'lucide-react';
// // import { SizeInventory } from '@/types';
// // import { cn } from '@/utils/cn';

// // interface InventoryInputsProps {
// //   sizes: string[];
// //   inventory: SizeInventory[];
// //   onChange: (inventory: SizeInventory[]) => void;
// //   error?: string;
// // }

// // export function InventoryInputs({ sizes, inventory, onChange, error }: InventoryInputsProps) {
// //   const getQuantity = (size: string): number =>
// //     inventory.find((i) => i.size === size)?.quantity ?? 0;

// //   const setQuantity = (size: string, quantity: number) => {
// //     const safe = Math.max(0, quantity);
// //     const idx = inventory.findIndex((i) => i.size === size);
// //     if (idx >= 0) {
// //       const updated = [...inventory];
// //       updated[idx] = { ...updated[idx], quantity: safe };
// //       onChange(updated);
// //     } else {
// //       onChange([...inventory, { size, quantity: safe }]);
// //     }
// //   };

// //   const handleInput = (size: string, value: string) => {
// //     const parsed = parseInt(value, 10);
// //     setQuantity(size, isNaN(parsed) ? 0 : parsed);
// //   };

// //   const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);

// //   if (sizes.length === 0) {
// //     return (
// //       <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
// //         <p className="text-sm text-sage-400">Select sizes above to set inventory quantities</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-3">
// //       <div className="flex items-center justify-between">
// //         <label className="text-sm font-medium text-sage-700">Inventory per Size</label>
// //         <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
// //           Total: <span className="font-semibold text-sage-700">{totalInventory}</span>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
// //         <AnimatePresence>
// //           {sizes.map((size) => {
// //             const qty = getQuantity(size);
// //             const isLow = qty > 0 && qty <= 5;
// //             const isOut = qty === 0;

// //             return (
// //               <motion.div
// //                 key={size}
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 exit={{ opacity: 0, scale: 0.9 }}
// //                 transition={{ duration: 0.15 }}
// //                 className={cn(
// //                   'rounded-xl border p-3 transition-all',
// //                   isOut
// //                     ? 'border-red-200 bg-red-50/50'
// //                     : isLow
// //                     ? 'border-amber-200 bg-amber-50/50'
// //                     : 'border-sage-100 bg-white hover:border-sage-200'
// //                 )}
// //               >
// //                 {/* Size label */}
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span
// //                     className={cn(
// //                       'text-xs font-semibold',
// //                       isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600'
// //                     )}
// //                   >
// //                     {size}
// //                   </span>
// //                   {isLow && !isOut && (
// //                     <span className="text-[9px] text-amber-500 font-medium">Low</span>
// //                   )}
// //                   {isOut && (
// //                     <span className="text-[9px] text-red-500 font-medium">Out</span>
// //                   )}
// //                 </div>

// //                 {/* Controls: minus | input | plus — each fixed width, no overflow */}
// //                 <div className="flex items-center gap-1.5">
// //                   {/* Minus button */}
// //                   <button
// //                     type="button"
// //                     onClick={() => setQuantity(size, qty - 1)}
// //                     disabled={qty <= 0}
// //                     className={cn(
// //                       'flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border',
// //                       'transition-all cursor-pointer select-none',
// //                       'hover:bg-sage-100 hover:border-sage-300',
// //                       'disabled:opacity-30 disabled:cursor-not-allowed',
// //                       isOut ? 'border-red-200 text-red-400' : 'border-sage-200 text-sage-500'
// //                     )}
// //                   >
// //                     <Minus size={10} strokeWidth={2.5} />
// //                   </button>

// //                   {/* Number input — takes remaining space */}
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     value={qty === 0 ? '' : qty}
// //                     placeholder="0"
// //                     onChange={(e) => handleInput(size, e.target.value)}
// //                     className={cn(
// //                       'w-0 flex-1 text-center text-sm font-semibold rounded-lg border py-1',
// //                       'focus:outline-none focus:ring-1 focus:ring-sage-300',
// //                       // Hide browser number spinners
// //                       '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
// //                       isOut
// //                         ? 'text-red-500 border-red-200 bg-red-50/30 placeholder:text-red-300'
// //                         : 'text-sage-800 border-sage-200 bg-transparent placeholder:text-sage-300'
// //                     )}
// //                   />

// //                   {/* Plus button */}
// //                   <button
// //                     type="button"
// //                     onClick={() => setQuantity(size, qty + 1)}
// //                     className={cn(
// //                       'flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border',
// //                       'transition-all cursor-pointer select-none',
// //                       'hover:bg-sage-100 hover:border-sage-300',
// //                       isOut ? 'border-red-200 text-red-400' : 'border-sage-200 text-sage-500'
// //                     )}
// //                   >
// //                     <Plus size={10} strokeWidth={2.5} />
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             );
// //           })}
// //         </AnimatePresence>
// //       </div>

// //       {error && <p className="text-xs text-red-500">{error}</p>}
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';
// import { SizeInventory } from '@/types';
// import { cn } from '@/utils/cn';

// interface InventoryInputsProps {
//   sizes: string[];
//   inventory: SizeInventory[];
//   onChange: (inventory: SizeInventory[]) => void;
//   error?: string;
//   /** If true sizes are shown with 'm' suffix (Cloths page) */
//   isMeter?: boolean;
// }

// export function InventoryInputs({
//   sizes,
//   inventory,
//   onChange,
//   error,
//   isMeter = false,
// }: InventoryInputsProps) {
//   const [inputValue, setInputValue] = useState('');

//   const getQuantity = (size: string): number =>
//     inventory.find((i) => i.size === size)?.quantity ?? 0;

//   const applyToAll = (delta: number) => {
//     const val = parseFloat(inputValue);
//     if (isNaN(val) || val <= 0) return;

//     const updated = sizes.map((size) => {
//       const current = getQuantity(size);
//       const newQty = Math.max(0, current + delta * val);
//       return { size, quantity: isMeter ? Math.round(newQty * 100) / 100 : Math.round(newQty) };
//     });

//     // Preserve any sizes in inventory that are not in current sizes selection
//     const otherSizes = inventory.filter((i) => !sizes.includes(i.size));
//     onChange([...otherSizes, ...updated]);
//     setInputValue('');
//   };

//   const totalInventory = inventory
//     .filter((i) => sizes.includes(i.size))
//     .reduce((sum, i) => sum + i.quantity, 0);

//   if (sizes.length === 0) {
//     return (
//       <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
//         <p className="text-sm text-sage-400">
//           {isMeter
//             ? 'Select cloth items above to set meter quantities'
//             : 'Select sizes above to set inventory quantities'}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <label className="text-sm font-medium text-sage-700">
//           {isMeter ? 'Meters per Item' : 'Inventory per Size'}
//         </label>
//         <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
//           Total:{' '}
//           <span className="font-semibold text-sage-700">
//             {isMeter ? `${totalInventory}m` : totalInventory}
//           </span>
//         </div>
//       </div>

//       {/* Shared input + Add/Minus */}
//       <div className="bg-sage-50/60 border border-sage-100 rounded-xl p-3 space-y-2">
//         <p className="text-xs text-sage-500 font-medium">
//           Type a value then click Add or Minus to apply to{' '}
//           <span className="text-sage-700 font-semibold">all selected sizes</span>
//         </p>
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 88px 88px',
//             gap: '8px',
//             alignItems: 'center',
//           }}
//         >
//           <input
//             type="number"
//             min="0"
//             step={isMeter ? '0.1' : '1'}
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') applyToAll(1);
//             }}
//             placeholder={isMeter ? 'e.g. 2.5' : 'e.g. 10'}
//             className={cn(
//               'h-9 w-full text-center text-sm font-semibold rounded-lg border',
//               'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400',
//               'border-sage-200 bg-white text-sage-800 placeholder:text-sage-300',
//               '[appearance:textfield]',
//               '[&::-webkit-outer-spin-button]:appearance-none',
//               '[&::-webkit-inner-spin-button]:appearance-none'
//             )}
//           />
//           <button
//             type="button"
//             onClick={() => applyToAll(1)}
//             className="h-9 flex items-center justify-center gap-1.5 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold cursor-pointer transition-colors active:scale-95"
//           >
//             <Plus size={12} strokeWidth={2.5} />
//             Add
//           </button>
//           <button
//             type="button"
//             onClick={() => applyToAll(-1)}
//             className="h-9 flex items-center justify-center gap-1.5 rounded-lg border border-sage-300 hover:bg-sage-100 text-sage-600 text-xs font-semibold cursor-pointer transition-colors active:scale-95"
//           >
//             <Minus size={12} strokeWidth={2.5} />
//             Minus
//           </button>
//         </div>
//       </div>

//       {/* Size chips showing current values */}
//       <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//         {sizes.map((size) => {
//           const qty = getQuantity(size);
//           const isLow = !isMeter && qty > 0 && qty <= 5;
//           const isOut = qty === 0;

//           return (
//             <div
//               key={size}
//               className={cn(
//                 'flex flex-col items-center py-2.5 px-2 rounded-xl border text-center transition-all',
//                 isOut
//                   ? 'bg-red-50 border-red-100'
//                   : isLow
//                   ? 'bg-amber-50 border-amber-100'
//                   : 'bg-white border-sage-100'
//               )}
//             >
//               <span
//                 className={cn(
//                   'text-xs font-semibold mb-0.5',
//                   isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600'
//                 )}
//               >
//                 {size}
//               </span>
//               <span
//                 className={cn(
//                   'text-base font-bold',
//                   isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-sage-800'
//                 )}
//               >
//                 {isMeter ? `${qty}m` : qty}
//               </span>
//               {!isMeter && isLow && !isOut && (
//                 <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>
//               )}
//               {isOut && (
//                 <span className="text-[9px] text-red-500 font-medium mt-0.5">
//                   {isMeter ? 'None' : 'Out'}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// }


import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SizeInventory } from '@/types';
import { cn } from '@/utils/cn';

interface InventoryInputsProps {
  sizes: string[];
  inventory: SizeInventory[];
  onChange: (inventory: SizeInventory[]) => void;
  error?: string;
}

export function InventoryInputs({
  sizes,
  inventory,
  onChange,
  error,
}: InventoryInputsProps) {
  const [inputValue, setInputValue] = useState('');
  // Which sizes are currently selected for bulk apply
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const getQuantity = (size: string): number =>
    inventory.find((i) => i.size === size)?.quantity ?? 0;

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const applyToSelected = (delta: number) => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) return;

    const targets = selectedSizes.length > 0 ? selectedSizes : sizes;

    const updated = inventory.map((inv) => {
      if (targets.includes(inv.size)) {
        return { ...inv, quantity: Math.max(0, Math.round(inv.quantity + delta * val)) };
      }
      return inv;
    });

    // Handle sizes in `targets` not yet in inventory
    const existingSizes = inventory.map((i) => i.size);
    const newEntries: SizeInventory[] = targets
      .filter((s) => !existingSizes.includes(s))
      .map((s) => ({ size: s, quantity: Math.max(0, Math.round(delta * val)) }));

    onChange([...updated, ...newEntries]);
    setInputValue('');
  };

  const totalInventory = inventory
    .filter((i) => sizes.includes(i.size))
    .reduce((sum, i) => sum + i.quantity, 0);

  const allSelected = sizes.length > 0 && selectedSizes.length === sizes.length;
  const noneSelected = selectedSizes.length === 0;

  if (sizes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-sage-200 p-4 text-center">
        <p className="text-sm text-sage-400">
          Select sizes above to set inventory quantities
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-sage-700">Inventory per Size</label>
        <div className="text-xs text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
          Total: <span className="font-semibold text-sage-700">{totalInventory}</span>
        </div>
      </div>

      {/* Selectable size chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-sage-500">
            {noneSelected
              ? 'Click sizes to select them, then apply a value'
              : `${selectedSizes.length} size${selectedSizes.length > 1 ? 's' : ''} selected`}
          </p>
          <button
            type="button"
            onClick={() =>
              setSelectedSizes(allSelected ? [] : [...sizes])
            }
            className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer"
          >
            {allSelected ? 'Deselect all' : 'Select all'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const qty = getQuantity(size);
            const isSelected = selectedSizes.includes(size);
            const isLow = qty > 0 && qty <= 5;
            const isOut = qty === 0;

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all cursor-pointer select-none',
                  isSelected
                    ? 'border-sage-500 bg-sage-100 shadow-sm scale-[1.03]'
                    : isOut
                    ? 'border-red-200 bg-red-50/50 hover:border-red-300'
                    : isLow
                    ? 'border-amber-200 bg-amber-50/50 hover:border-amber-300'
                    : 'border-sage-100 bg-white hover:border-sage-300'
                )}
              >
                <span
                  className={cn(
                    'text-xs font-bold',
                    isSelected
                      ? 'text-sage-700'
                      : isOut
                      ? 'text-red-500'
                      : isLow
                      ? 'text-amber-600'
                      : 'text-sage-600'
                  )}
                >
                  {size}
                </span>
                <span
                  className={cn(
                    'text-sm font-bold',
                    isSelected
                      ? 'text-sage-800'
                      : isOut
                      ? 'text-red-600'
                      : isLow
                      ? 'text-amber-700'
                      : 'text-sage-800'
                  )}
                >
                  {qty}
                </span>
                {isSelected && (
                  <span className="w-3 h-3 rounded-full bg-sage-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input + Add / Minus */}
      <div className="bg-sage-50/60 border border-sage-100 rounded-xl p-3 space-y-2">
        <p className="text-xs text-sage-500 font-medium">
          {noneSelected ? (
            <>Type a value · <span className="text-sage-700 font-semibold">Add</span> or <span className="text-sage-700 font-semibold">Minus</span> applies to <span className="text-sage-700 font-semibold">all sizes</span></>
          ) : (
            <>Type a value · applies to <span className="text-sage-700 font-semibold">{selectedSizes.join(', ')}</span></>
          )}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 88px 88px',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <input
            type="number"
            min="0"
            step="1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') applyToSelected(1); }}
            placeholder="e.g. 10"
            className={cn(
              'h-9 w-full text-center text-sm font-semibold rounded-lg border',
              'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400',
              'border-sage-200 bg-white text-sage-800 placeholder:text-sage-300',
              '[appearance:textfield]',
              '[&::-webkit-outer-spin-button]:appearance-none',
              '[&::-webkit-inner-spin-button]:appearance-none'
            )}
          />
          <button
            type="button"
            onClick={() => applyToSelected(1)}
            className="h-9 flex items-center justify-center gap-1.5 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold cursor-pointer transition-colors active:scale-95"
          >
            <Plus size={12} strokeWidth={2.5} />
            Add
          </button>
          <button
            type="button"
            onClick={() => applyToSelected(-1)}
            className="h-9 flex items-center justify-center gap-1.5 rounded-lg border border-sage-300 hover:bg-sage-100 text-sage-600 text-xs font-semibold cursor-pointer transition-colors active:scale-95"
          >
            <Minus size={12} strokeWidth={2.5} />
            Minus
          </button>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}