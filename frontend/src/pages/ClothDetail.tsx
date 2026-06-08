// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowLeft,
//   Scissors,
//   Calendar,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   ZoomIn,
//   ImageIcon,
//   Plus,
//   Minus,
//   Trash2,
//   Check,
//   X,
// } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { useClothsStore } from '@/store/clothsStore';
// import { formatDate } from '@/utils/format';
// import { ClothItem } from '@/types';
// import { cn } from '@/utils/cn';
// import { toast } from 'sonner';

// export function ClothDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { getClothById, updateClothItems } = useClothsStore();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [zoomed, setZoomed] = useState(false);

//   // Item editing state
//   const [items, setItems] = useState<ClothItem[]>([]);
//   const [editing, setEditing] = useState(false);
//   const [inputValue, setInputValue] = useState('');
//   const [newItemLabel, setNewItemLabel] = useState('');
//   const [saving, setSaving] = useState(false);

//   const cloth = id ? getClothById(id) : undefined;

//   if (!cloth) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-16 text-center">
//         <Scissors size={48} className="mx-auto text-sage-300 mb-4" />
//         <h2 className="text-xl font-semibold text-sage-600 mb-2">Cloth entry not found</h2>
//         <Button variant="primary" onClick={() => navigate('/cloths')}>
//           Back to Cloths
//         </Button>
//       </div>
//     );
//   }

//   const startEditing = () => {
//     setItems([...cloth.items]);
//     setEditing(true);
//   };

//   const cancelEditing = () => {
//     setEditing(false);
//     setInputValue('');
//     setNewItemLabel('');
//   };

//   const applyToAll = (delta: number) => {
//     const val = parseFloat(inputValue);
//     if (isNaN(val) || val <= 0) {
//       toast.error('Enter a valid number first');
//       return;
//     }
//     setItems((prev) =>
//       prev.map((item) => ({
//         ...item,
//         meters: Math.max(0, Math.round((item.meters + delta * val) * 100) / 100),
//       }))
//     );
//     setInputValue('');
//   };

//   const addNewItem = () => {
//     const label = newItemLabel.trim();
//     if (!label) {
//       toast.error('Enter a fabric item name');
//       return;
//     }
//     if (items.some((i) => i.item.toLowerCase() === label.toLowerCase())) {
//       toast.error('Item already exists');
//       return;
//     }
//     setItems((prev) => [...prev, { item: label, meters: 0 }]);
//     setNewItemLabel('');
//   };

//   const removeItem = (index: number) => {
//     setItems((prev) => prev.filter((_, i) => i !== index));
//   };

//   const saveItems = async () => {
//     setSaving(true);
//     try {
//       await updateClothItems(cloth.id, items);
//       setEditing(false);
//       setInputValue('');
//       setNewItemLabel('');
//       toast.success('Cloth items updated');
//     } catch {
//       toast.error('Failed to save');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const prevImage = () =>
//     setSelectedImage((p) => (p === 0 ? cloth.images.length - 1 : p - 1));
//   const nextImage = () =>
//     setSelectedImage((p) => (p === cloth.images.length - 1 ? 0 : p + 1));

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
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.35 }}
//         >
//           <div
//             className={cn(
//               'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
//               cloth.images.length > 0 && 'cursor-zoom-in'
//             )}
//             style={{ aspectRatio: '4/5' }}
//             onClick={() => cloth.images.length > 0 && setZoomed(true)}
//           >
//             {cloth.images.length > 0 ? (
//               <>
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     src={cloth.images[selectedImage]}
//                     alt={cloth.name}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="w-full h-full object-cover"
//                   />
//                 </AnimatePresence>
//                 {cloth.images.length > 1 && (
//                   <>
//                     <button
//                       onClick={(e) => { e.stopPropagation(); prevImage(); }}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
//                     >
//                       <ChevronLeft size={16} className="text-sage-600" />
//                     </button>
//                     <button
//                       onClick={(e) => { e.stopPropagation(); nextImage(); }}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
//                     >
//                       <ChevronRight size={16} className="text-sage-600" />
//                     </button>
//                   </>
//                 )}
//                 <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
//                   <ZoomIn size={12} className="text-sage-500" />
//                   <span className="text-xs text-sage-500">Click to zoom</span>
//                 </div>
//                 {cloth.images.length > 1 && (
//                   <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
//                     {selectedImage + 1}/{cloth.images.length}
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

//           {cloth.images.length > 1 && (
//             <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
//               {cloth.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(idx)}
//                   className={cn(
//                     'w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
//                     idx === selectedImage
//                       ? 'border-sage-400'
//                       : 'border-transparent hover:border-sage-200'
//                   )}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Info */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.35, delay: 0.1 }}
//           className="space-y-5"
//         >
//           {/* Name (read-only) */}
//           <div>
//             <h1
//               className="text-2xl font-bold text-sage-800 leading-tight"
//               style={{ fontFamily: 'Georgia, serif' }}
//             >
//               {cloth.name}
//             </h1>
//             <span className="text-xs text-sage-400 italic mt-1 block">
//               Synced from Products
//             </span>
//           </div>

//           {/* Fabric items */}
//           <div className="bg-white rounded-2xl border border-beige-100 p-4 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
//                 <Scissors size={14} /> Fabric Items
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
//                   Total:{' '}
//                   <span className="font-bold text-sage-700">{cloth.totalMeters}m</span>
//                 </span>
//                 {!editing && (
//                   <button
//                     onClick={startEditing}
//                     className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer"
//                   >
//                     Edit
//                   </button>
//                 )}
//               </div>
//             </div>

//             {editing ? (
//               <div className="space-y-4">
//                 {/* Add new fabric item */}
//                 <div className="space-y-2">
//                   <label className="text-xs font-semibold text-sage-500 uppercase tracking-wide">
//                     Add Fabric Item
//                   </label>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={newItemLabel}
//                       onChange={(e) => setNewItemLabel(e.target.value)}
//                       onKeyDown={(e) => e.key === 'Enter' && addNewItem()}
//                       placeholder="e.g. Main Fabric, Lining..."
//                       className="flex-1 h-9 px-3 text-sm border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-300 bg-white placeholder:text-sage-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={addNewItem}
//                       className="h-9 px-3 bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors flex items-center gap-1"
//                     >
//                       <Plus size={12} /> Add
//                     </button>
//                   </div>
//                 </div>

//                 {/* Shared meter input + Apply buttons */}
//                 {items.length > 0 && (
//                   <div className="bg-sage-50/60 border border-sage-100 rounded-xl p-3 space-y-2">
//                     <p className="text-xs text-sage-500 font-medium">
//                       Type meters then click{' '}
//                       <span className="text-sage-700 font-semibold">Add</span> or{' '}
//                       <span className="text-sage-700 font-semibold">Minus</span> to apply to all items
//                     </p>
//                     <div
//                       style={{
//                         display: 'grid',
//                         gridTemplateColumns: '1fr 88px 88px',
//                         gap: '8px',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <input
//                         type="number"
//                         min="0"
//                         step="0.1"
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && applyToAll(1)}
//                         placeholder="e.g. 2.5"
//                         className={cn(
//                           'h-9 w-full text-center text-sm font-semibold rounded-lg border',
//                           'focus:outline-none focus:ring-2 focus:ring-sage-300',
//                           'border-sage-200 bg-white placeholder:text-sage-300',
//                           '[appearance:textfield]',
//                           '[&::-webkit-outer-spin-button]:appearance-none',
//                           '[&::-webkit-inner-spin-button]:appearance-none'
//                         )}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => applyToAll(1)}
//                         className="h-9 flex items-center justify-center gap-1.5 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold cursor-pointer transition-colors"
//                       >
//                         <Plus size={12} strokeWidth={2.5} /> Add
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => applyToAll(-1)}
//                         className="h-9 flex items-center justify-center gap-1.5 rounded-lg border border-sage-300 hover:bg-sage-100 text-sage-600 text-xs font-semibold cursor-pointer transition-colors"
//                       >
//                         <Minus size={12} strokeWidth={2.5} /> Minus
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Item list */}
//                 {items.length === 0 ? (
//                   <p className="text-sm text-sage-400 text-center py-4 italic">
//                     Add a fabric item above to get started
//                   </p>
//                 ) : (
//                   <div className="space-y-2">
//                     {items.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-sage-100 bg-white"
//                       >
//                         <span className="text-sm font-medium text-sage-700 truncate flex-1">
//                           {item.item}
//                         </span>
//                         <span className="text-sm font-bold text-sage-800 mx-3">
//                           {item.meters}m
//                         </span>
//                         <button
//                           type="button"
//                           onClick={() => removeItem(idx)}
//                           className="text-sage-300 hover:text-red-500 transition-colors cursor-pointer"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Save / Cancel */}
//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={saveItems}
//                     loading={saving}
//                     className="cursor-pointer"
//                   >
//                     <Check size={14} /> Save
//                   </Button>
//                   <Button
//                     variant="secondary"
//                     size="sm"
//                     onClick={cancelEditing}
//                     className="cursor-pointer"
//                   >
//                     <X size={14} /> Cancel
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               /* Read mode */
//               <div>
//                 {cloth.items.length === 0 ? (
//                   <p className="text-sm text-sage-400 text-center py-6 italic">
//                     No fabric items yet. Click Edit to add items with meter quantities.
//                   </p>
//                 ) : (
//                   <div className="space-y-2">
//                     {cloth.items.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-sage-100 bg-sage-50/50"
//                       >
//                         <span className="text-sm font-medium text-sage-700">{item.item}</span>
//                         <span className="text-sm font-bold text-sage-800">{item.meters}m</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Metadata */}
//           <div className="pt-4 border-t border-beige-100 space-y-2.5">
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <Calendar size={14} />
//               <span>
//                 Added:{' '}
//                 <span className="text-sage-600 font-medium">{formatDate(cloth.createdAt)}</span>
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <RefreshCw size={14} />
//               <span>
//                 Updated:{' '}
//                 <span className="text-sage-600 font-medium">{formatDate(cloth.updatedAt)}</span>
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Zoom */}
//       <AnimatePresence>
//         {zoomed && cloth.images.length > 0 && (
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
//               src={cloth.images[selectedImage]}
//               alt={cloth.name}
//               className="max-w-full max-h-full object-contain rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button
//               onClick={() => setZoomed(false)}
//               className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer"
//             >
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Scissors,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ImageIcon,
  Plus,
  Minus,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useClothsStore } from '@/store/clothsStore';
import { formatDate } from '@/utils/format';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

export function ClothDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getClothById, updateClothItems } = useClothsStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [draftMeters, setDraftMeters] = useState(0);
  const [saving, setSaving] = useState(false);

  const cloth = id ? getClothById(id) : undefined;

  if (!cloth) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Scissors size={48} className="mx-auto text-sage-300 mb-4" />
        <h2 className="text-xl font-semibold text-sage-600 mb-2">Cloth entry not found</h2>
        <Button variant="primary" onClick={() => navigate('/cloths')}>Back to Cloths</Button>
      </div>
    );
  }

  // Current total meters stored as single item with item="meters"
  const currentMeters = cloth.items.length > 0 ? cloth.items[0].meters : 0;

  const startEditing = () => {
    setDraftMeters(currentMeters);
    setInputValue('');
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setInputValue('');
  };

  const applyDelta = (delta: number) => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      toast.error('Enter a valid number first');
      return;
    }
    const newVal = Math.max(0, Math.round((draftMeters + delta * val) * 100) / 100);
    setDraftMeters(newVal);
    setInputValue('');
  };

  const saveMeters = async () => {
    setSaving(true);
    try {
      // Store as single item with key "meters"
      await updateClothItems(cloth.id, [{ item: 'meters', meters: draftMeters }]);
      setEditing(false);
      toast.success('Meters updated');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const prevImage = () =>
    setSelectedImage((p) => (p === 0 ? cloth.images.length - 1 : p - 1));
  const nextImage = () =>
    setSelectedImage((p) => (p === cloth.images.length - 1 ? 0 : p + 1));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
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
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className={cn(
              'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
              cloth.images.length > 0 && 'cursor-zoom-in'
            )}
            style={{ aspectRatio: '4/5' }}
            onClick={() => cloth.images.length > 0 && setZoomed(true)}
          >
            {cloth.images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={cloth.images[selectedImage]}
                    alt={cloth.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {cloth.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
                    >
                      <ChevronLeft size={16} className="text-sage-600" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white cursor-pointer"
                    >
                      <ChevronRight size={16} className="text-sage-600" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <ZoomIn size={12} className="text-sage-500" />
                  <span className="text-xs text-sage-500">Click to zoom</span>
                </div>
                {cloth.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                    {selectedImage + 1}/{cloth.images.length}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
                <ImageIcon size={48} />
                <span className="text-sm mt-2 text-sage-300">No images</span>
              </div>
            )}
          </div>

          {cloth.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {cloth.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    'w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
                    idx === selectedImage ? 'border-sage-400' : 'border-transparent hover:border-sage-200'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
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
              {cloth.name}
            </h1>
            <span className="text-xs text-sage-400 italic mt-1 block">Synced from Products</span>
          </div>

          {/* Meters card */}
          <div className="bg-white rounded-2xl border border-beige-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Scissors size={14} /> Cloth Meters
              </p>
              {!editing && (
                <button
                  onClick={startEditing}
                  className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                {/* Current value display */}
                <div className="text-center py-3 bg-sage-50 rounded-xl border border-sage-100">
                  <p className="text-xs text-sage-400 mb-1">Current value</p>
                  <p className="text-4xl font-bold text-sage-800">
                    {draftMeters}<span className="text-2xl text-sage-500 ml-1">m</span>
                  </p>
                </div>

                {/* Input + Add/Minus */}
                <div className="bg-sage-50/60 border border-sage-100 rounded-xl p-3 space-y-2">
                  <p className="text-xs text-sage-500 font-medium">
                    Type meters then click <span className="text-sage-700 font-semibold">Add</span> or <span className="text-sage-700 font-semibold">Minus</span>
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 80px',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') applyDelta(1); }}
                      placeholder="e.g. 2.5"
                      className={cn(
                        'h-9 w-full text-center text-sm font-semibold rounded-lg border',
                        'focus:outline-none focus:ring-2 focus:ring-sage-300',
                        'border-sage-200 bg-white placeholder:text-sage-300',
                        '[appearance:textfield]',
                        '[&::-webkit-outer-spin-button]:appearance-none',
                        '[&::-webkit-inner-spin-button]:appearance-none'
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => applyDelta(1)}
                      className="h-9 flex items-center justify-center gap-1 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Plus size={11} strokeWidth={2.5} /> Add
                    </button>
                    <button
                      type="button"
                      onClick={() => applyDelta(-1)}
                      className="h-9 flex items-center justify-center gap-1 rounded-lg border border-sage-300 hover:bg-sage-100 text-sage-600 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      <Minus size={11} strokeWidth={2.5} /> Minus
                    </button>
                  </div>
                </div>

                {/* Save / Cancel */}
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={saveMeters}
                    loading={saving}
                    className="cursor-pointer"
                  >
                    <Check size={14} /> Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={cancelEditing}
                    className="cursor-pointer"
                  >
                    <X size={14} /> Cancel
                  </Button>
                </div>
              </div>
            ) : (
              /* Read mode */
              <div className="text-center py-4">
                <p className="text-5xl font-bold text-sage-800">
                  {currentMeters}
                  <span className="text-3xl text-sage-400 ml-2">m</span>
                </p>
                <p className="text-xs text-sage-400 mt-2">
                  {currentMeters === 0 ? 'Click Edit to set meters' : 'total cloth meters'}
                </p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-beige-100 space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <Calendar size={14} />
              <span>
                Added:{' '}
                <span className="text-sage-600 font-medium">{formatDate(cloth.createdAt)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <RefreshCw size={14} />
              <span>
                Updated:{' '}
                <span className="text-sage-600 font-medium">{formatDate(cloth.updatedAt)}</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zoom */}
      <AnimatePresence>
        {zoomed && cloth.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={cloth.images[selectedImage]}
              alt={cloth.name}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}