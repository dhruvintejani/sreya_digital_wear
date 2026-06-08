// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowLeft,
//   Trash2,
//   Package,
//   Tag,
//   Calendar,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   ZoomIn,
//   ImageIcon,
//   Check,
//   X,
//   Plus,
//   Minus,
// } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
// import { CategorySelect } from '@/components/shared/CategorySelect';
// import { SizeSelect } from '@/components/shared/SizeSelect';
// import { ImageUploader } from '@/components/shared/ImageUploader';
// import { useProductionStore } from '@/store/productionStore';
// import { formatDate } from '@/utils/format';
// import { LOW_STOCK_THRESHOLD, SizeInventory } from '@/types';
// import { cn } from '@/utils/cn';
// import { toast } from 'sonner';

// export function ProductionDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { getProductionById, updateProduction, deleteProduction } = useProductionStore();

//   const [showDelete, setShowDelete] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [zoomed, setZoomed] = useState(false);
//   const [editingName, setEditingName] = useState(false);
//   const [nameDraft, setNameDraft] = useState('');
//   const [editingSizes, setEditingSizes] = useState(false);
//   const [sizesDraft, setSizesDraft] = useState<string[]>([]);
//   const [inventoryDraft, setInventoryDraft] = useState<SizeInventory[]>([]);

//   const production = id ? getProductionById(id) : undefined;

//   if (!production) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-16 text-center">
//         <div className="text-sage-300 mb-4"><Package size={48} className="mx-auto" /></div>
//         <h2 className="text-xl font-semibold text-sage-600 mb-2">Production entry not found</h2>
//         <p className="text-sage-400 mb-6">This entry may have been deleted</p>
//         <Button variant="primary" onClick={() => navigate('/production')}>Back to Production</Button>
//       </div>
//     );
//   }

//   const saveField = async (field: string, value: unknown) => {
//     await updateProduction(production.id, { [field]: value } as Parameters<typeof updateProduction>[1]);
//     toast.success('Saved');
//   };

//   const saveName = async () => {
//     if (!nameDraft.trim()) return;
//     await saveField('name', nameDraft.trim());
//     setEditingName(false);
//   };

//   const handleDelete = async () => {
//     await deleteProduction(production.id);
//     toast.success('Production entry deleted');
//     navigate('/production');
//   };

//   const startEditSizes = () => {
//     setSizesDraft(production.sizes);
//     setInventoryDraft([...production.inventory]);
//     setEditingSizes(true);
//   };

//   const saveSizes = async () => {
//     const merged: SizeInventory[] = sizesDraft.map((s) => {
//       const existing = inventoryDraft.find((i) => i.size === s);
//       return existing ?? { size: s, quantity: 0 };
//     });
//     await updateProduction(production.id, { inventory: merged, sizes: sizesDraft });
//     setEditingSizes(false);
//     toast.success('Sizes updated');
//   };

//   const setInvQty = (size: string, qty: number) => {
//     const safe = Math.max(0, qty);
//     setInventoryDraft((prev) => {
//       const idx = prev.findIndex((i) => i.size === size);
//       if (idx >= 0) {
//         const u = [...prev];
//         u[idx] = { ...u[idx], quantity: safe };
//         return u;
//       }
//       return [...prev, { size, quantity: safe }];
//     });
//   };

//   const getInvQty = (size: string) =>
//     inventoryDraft.find((i) => i.size === size)?.quantity ?? 0;

//   const prevImage = () =>
//     setSelectedImage((p) => (p === 0 ? production.images.length - 1 : p - 1));
//   const nextImage = () =>
//     setSelectedImage((p) => (p === production.images.length - 1 ? 0 : p + 1));

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Back */}
//       <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm text-sage-500 hover:text-sage-700 transition-colors cursor-pointer"
//         >
//           <ArrowLeft size={16} /> Back
//         </button>
//       </motion.div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Images */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
//           <div
//             className={cn(
//               'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
//               production.images.length > 0 && 'cursor-zoom-in'
//             )}
//             style={{ aspectRatio: '4/5' }}
//             onClick={() => production.images.length > 0 && setZoomed(true)}
//           >
//             {production.images.length > 0 ? (
//               <>
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     src={production.images[selectedImage]}
//                     alt={production.name}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="w-full h-full object-cover"
//                   />
//                 </AnimatePresence>
//                 {production.images.length > 1 && (
//                   <>
//                     <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
//                       <ChevronLeft size={16} className="text-sage-600" />
//                     </button>
//                     <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
//                       <ChevronRight size={16} className="text-sage-600" />
//                     </button>
//                   </>
//                 )}
//                 <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
//                   <ZoomIn size={12} className="text-sage-500" />
//                   <span className="text-xs text-sage-500">Click to zoom</span>
//                 </div>
//                 {production.images.length > 1 && (
//                   <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
//                     {selectedImage + 1}/{production.images.length}
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
//                 <ImageIcon size={48} />
//                 <span className="text-sm mt-2 text-sage-300">No images</span>
//               </div>
//             )}
//           </div>

//           {production.images.length > 1 && (
//             <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
//               {production.images.map((img, idx) => (
//                 <button key={idx} onClick={() => setSelectedImage(idx)}
//                   className={cn('w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
//                     idx === selectedImage ? 'border-sage-400 shadow-sm' : 'border-transparent hover:border-sage-200'
//                   )}>
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}

//           <div className="mt-4">
//             <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Edit Images</p>
//             <ImageUploader
//               images={production.images}
//               onChange={(imgs) => saveField('images', imgs)}
//             />
//           </div>
//         </motion.div>

//         {/* Info */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.35, delay: 0.1 }}
//           className="space-y-5"
//         >
//           {/* Header */}
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               {/* Editable Name */}
//               {editingName ? (
//                 <div className="flex items-center gap-2">
//                   <input
//                     value={nameDraft}
//                     onChange={(e) => setNameDraft(e.target.value)}
//                     onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false); }}
//                     autoFocus
//                     className="text-2xl font-bold text-sage-800 border-b-2 border-sage-400 bg-transparent focus:outline-none flex-1"
//                     style={{ fontFamily: 'Georgia, serif' }}
//                   />
//                   <button onClick={saveName} className="text-sage-600 cursor-pointer"><Check size={18} /></button>
//                   <button onClick={() => setEditingName(false)} className="text-sage-400 cursor-pointer"><X size={18} /></button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => { setNameDraft(production.name); setEditingName(true); }}
//                   className="text-2xl font-bold text-sage-800 leading-tight hover:bg-sage-50 rounded px-1 -mx-1 transition-colors cursor-pointer group text-left"
//                   style={{ fontFamily: 'Georgia, serif' }}
//                 >
//                   {production.name}
//                   <span className="ml-2 opacity-0 group-hover:opacity-40 text-sage-400 text-base">✎</span>
//                 </button>
//               )}

//               <div className="flex items-center gap-2 mt-2 flex-wrap">
//                 <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
//                   <Tag size={11} />
//                   <span className="font-medium">Category:</span>
//                 </span>
//                 <div className="min-w-[160px]">
//                   <CategorySelect
//                     value={production.category}
//                     onChange={(v) => v && saveField('category', v)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setShowDelete(true)}
//               className="hover:text-red-500 hover:bg-red-50 border border-red-100 cursor-pointer flex-shrink-0"
//             >
//               <Trash2 size={14} />
//             </Button>
//           </div>

//           {/* Inventory */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
//                 <Package size={14} /> Production Quantities
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
//                   Total: <span className="font-bold text-sage-700">{production.totalInventory}</span>
//                 </span>
//                 {!editingSizes && (
//                   <button onClick={startEditSizes} className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer">
//                     Edit sizes
//                   </button>
//                 )}
//               </div>
//             </div>

//             {editingSizes ? (
//               <div className="space-y-3">
//                 <SizeSelect
//                   value={sizesDraft}
//                   onChange={(newSizes) => {
//                     setSizesDraft(newSizes);
//                     setInventoryDraft(
//                       newSizes.map((s) => ({
//                         size: s,
//                         quantity: inventoryDraft.find((i) => i.size === s)?.quantity ?? 0,
//                       }))
//                     );
//                   }}
//                 />

//                 {sizesDraft.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                     {sizesDraft.map((size) => {
//                       const qty = getInvQty(size);
//                       return (
//                         <div key={size} className="rounded-xl border border-sage-100 bg-white p-2.5">
//                           <span className="block text-xs font-semibold mb-2 text-sage-600">{size}</span>
//                           <div className="flex items-center gap-1">
//                             <button type="button" onClick={() => setInvQty(size, qty - 1)} disabled={qty <= 0} className="w-7 h-7 flex items-center justify-center rounded-lg border border-sage-200 hover:bg-sage-100 disabled:opacity-30 cursor-pointer">
//                               <Minus size={11} />
//                             </button>
//                             <input
//                               type="number" min="0"
//                               value={qty === 0 ? '' : qty}
//                               placeholder="0"
//                               onChange={(e) => setInvQty(size, parseInt(e.target.value, 10) || 0)}
//                               className="flex-1 text-center text-sm font-semibold border rounded-lg py-1 px-1 focus:outline-none focus:ring-1 focus:ring-sage-300 border-sage-200"
//                             />
//                             <button type="button" onClick={() => setInvQty(size, qty + 1)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-sage-200 hover:bg-sage-100 cursor-pointer">
//                               <Plus size={11} />
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}

//                 <div className="flex gap-2 pt-2">
//                   <Button variant="primary" size="sm" onClick={saveSizes} className="cursor-pointer">
//                     <Check size={14} /> Save Sizes
//                   </Button>
//                   <Button variant="secondary" size="sm" onClick={() => setEditingSizes(false)} className="cursor-pointer">
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
//                 {production.inventory.map((inv) => (
//                   <InlineQtyCard
//                     key={inv.size}
//                     inv={inv}
//                     onSave={async (newQty) => {
//                       const newInventory = production.inventory.map((i) =>
//                         i.size === inv.size ? { ...i, quantity: newQty } : i
//                       );
//                       await updateProduction(production.id, { inventory: newInventory });
//                       toast.success('Quantity updated');
//                     }}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Metadata */}
//           <div className="pt-4 border-t border-beige-100 space-y-2.5">
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <Calendar size={14} />
//               <span>Added: <span className="text-sage-600 font-medium">{formatDate(production.createdAt)}</span></span>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <RefreshCw size={14} />
//               <span>Updated: <span className="text-sage-600 font-medium">{formatDate(production.updatedAt)}</span></span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Zoom */}
//       <AnimatePresence>
//         {zoomed && production.images.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
//             onClick={() => setZoomed(false)}
//           >
//             <motion.img
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               src={production.images[selectedImage]}
//               alt={production.name}
//               className="max-w-full max-h-full object-contain rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button
//               onClick={() => setZoomed(false)}
//               className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
//             >
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <ConfirmDialog
//         open={showDelete}
//         title="Delete Production Entry?"
//         message="This action cannot be undone."
//         confirmLabel="Delete"
//         cancelLabel="Cancel"
//         variant="danger"
//         onConfirm={handleDelete}
//         onCancel={() => setShowDelete(false)}
//       />
//     </div>
//   );
// }

// function InlineQtyCard({
//   inv,
//   onSave,
// }: {
//   inv: SizeInventory;
//   onSave: (qty: number) => Promise<void>;
// }) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(inv.quantity);
//   const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
//   const isOut = inv.quantity === 0;

//   const save = async (qty: number) => {
//     const safe = Math.max(0, qty);
//     setDraft(safe);
//     await onSave(safe);
//     setEditing(false);
//   };

//   return (
//     <div className={cn(
//       'flex flex-col items-center py-3 rounded-xl border transition-all',
//       isOut ? 'bg-red-50 border-red-100' : isLow ? 'bg-amber-50 border-amber-100' : 'bg-white border-beige-100'
//     )}>
//       <span className={cn('text-xs font-semibold mb-1', isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-500')}>
//         {inv.size}
//       </span>
//       {editing ? (
//         <div className="flex flex-col items-center gap-1">
//           <button onClick={() => save(draft + 1)} className="w-6 h-6 flex items-center justify-center rounded border border-sage-200 hover:bg-sage-100 cursor-pointer">
//             <Plus size={10} />
//           </button>
//           <input
//             type="number" min="0"
//             value={draft}
//             onChange={(e) => setDraft(parseInt(e.target.value, 10) || 0)}
//             onKeyDown={(e) => { if (e.key === 'Enter') save(draft); if (e.key === 'Escape') setEditing(false); }}
//             autoFocus
//             className="w-12 text-center text-sm font-bold border border-sage-300 rounded focus:outline-none focus:ring-1 focus:ring-sage-300 py-0.5"
//           />
//           <button onClick={() => save(Math.max(0, draft - 1))} className="w-6 h-6 flex items-center justify-center rounded border border-sage-200 hover:bg-sage-100 cursor-pointer">
//             <Minus size={10} />
//           </button>
//           <button onClick={() => save(draft)} className="mt-1 text-sage-600 cursor-pointer">
//             <Check size={12} />
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => { setDraft(inv.quantity); setEditing(true); }}
//           className={cn('text-lg font-bold cursor-pointer hover:opacity-70 transition-opacity', isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-sage-800')}
//           title="Click to edit"
//         >
//           {inv.quantity}
//         </button>
//       )}
//       {isLow && !isOut && <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>}
//       {isOut && <span className="text-[9px] text-red-500 font-medium mt-0.5">Out</span>}
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Package, Tag, Calendar, RefreshCw,
  ChevronLeft, ChevronRight, ZoomIn, ImageIcon, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SizeSelect } from '@/components/shared/SizeSelect';
import { InventoryInputs } from '@/components/shared/InventoryInputs';
import { useProductionStore } from '@/store/productionStore';
import { formatDate } from '@/utils/format';
import { SizeInventory } from '@/types';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

export function ProductionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductionById, updateProductionSizes } = useProductionStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [editingSizes, setEditingSizes] = useState(false);
  const [sizesDraft, setSizesDraft] = useState<string[]>([]);
  const [inventoryDraft, setInventoryDraft] = useState<SizeInventory[]>([]);

  const production = id ? getProductionById(id) : undefined;

  if (!production) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Package size={48} className="mx-auto text-sage-300 mb-4" />
        <h2 className="text-xl font-semibold text-sage-600 mb-2">Production entry not found</h2>
        <Button variant="primary" onClick={() => navigate('/production')}>Back to Production</Button>
      </div>
    );
  }

  const startEditSizes = () => {
    setSizesDraft(production.sizes);
    setInventoryDraft([...production.inventory]);
    setEditingSizes(true);
  };

  const saveSizes = async () => {
    const merged: SizeInventory[] = sizesDraft.map((s) => {
      const existing = inventoryDraft.find((i) => i.size === s);
      return existing ?? { size: s, quantity: 0 };
    });
    try {
      await updateProductionSizes(production.id, merged);
      setEditingSizes(false);
      toast.success('Quantities updated');
    } catch {
      toast.error('Failed to save');
    }
  };

  const prevImage = () =>
    setSelectedImage((p) => (p === 0 ? production.images.length - 1 : p - 1));
  const nextImage = () =>
    setSelectedImage((p) => (p === production.images.length - 1 ? 0 : p + 1));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-sage-500 hover:text-sage-700 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <div
            className={cn(
              'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
              production.images.length > 0 && 'cursor-zoom-in'
            )}
            style={{ aspectRatio: '4/5' }}
            onClick={() => production.images.length > 0 && setZoomed(true)}
          >
            {production.images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={production.images[selectedImage]}
                    alt={production.name}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {production.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer">
                      <ChevronLeft size={16} className="text-sage-600" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer">
                      <ChevronRight size={16} className="text-sage-600" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <ZoomIn size={12} className="text-sage-500" />
                  <span className="text-xs text-sage-500">Click to zoom</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
                <ImageIcon size={48} />
                <span className="text-sm mt-2 text-sage-300">No images</span>
              </div>
            )}
          </div>

          {production.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {production.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)}
                  className={cn('w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
                    idx === selectedImage ? 'border-sage-400' : 'border-transparent hover:border-sage-200'
                  )}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info — read-only name/category, editable sizes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Name (read-only) */}
          <div>
            <h1
              className="text-2xl font-bold text-sage-800 leading-tight"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {production.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                <Tag size={11} />
                {production.category}
              </span>
              <span className="text-xs text-sage-400 italic">Synced from Products</span>
            </div>
          </div>

          {/* Sizes + Inventory — only editable section */}
          <div className="bg-white rounded-2xl border border-beige-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Package size={14} /> Production Quantities
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                  Total: <span className="font-bold text-sage-700">{production.totalInventory}</span>
                </span>
                {!editingSizes && (
                  <button
                    onClick={startEditSizes}
                    className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {editingSizes ? (
              <div className="space-y-4">
                <SizeSelect
                  value={sizesDraft}
                  onChange={(newSizes) => {
                    setSizesDraft(newSizes);
                    setInventoryDraft(
                      newSizes.map((s) => ({
                        size: s,
                        quantity: inventoryDraft.find((i) => i.size === s)?.quantity ?? 0,
                      }))
                    );
                  }}
                />
                <InventoryInputs
                  sizes={sizesDraft}
                  inventory={inventoryDraft}
                  onChange={setInventoryDraft}
                />
                <div className="flex gap-2 pt-2">
                  <Button variant="primary" size="sm" onClick={saveSizes} className="cursor-pointer">
                    <Check size={14} /> Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setEditingSizes(false)} className="cursor-pointer">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {production.inventory.length === 0 ? (
                  <div className="col-span-4 text-center py-4 text-sm text-sage-400">
                    No quantities set yet. Click Edit to add.
                  </div>
                ) : (
                  production.inventory.map((inv) => (
                    <div
                      key={inv.size}
                      className="flex flex-col items-center py-3 rounded-xl border bg-white border-beige-100"
                    >
                      <span className="text-xs font-semibold text-sage-500 mb-1">{inv.size}</span>
                      <span className="text-lg font-bold text-sage-800">{inv.quantity}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-beige-100 space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <Calendar size={14} />
              <span>Added: <span className="text-sage-600 font-medium">{formatDate(production.createdAt)}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <RefreshCw size={14} />
              <span>Updated: <span className="text-sage-600 font-medium">{formatDate(production.updatedAt)}</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zoom */}
      <AnimatePresence>
        {zoomed && production.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={production.images[selectedImage]}
              alt={production.name}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={() => setZoomed(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}