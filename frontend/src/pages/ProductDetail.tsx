// // import { useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   ArrowLeft,
// //   Edit2,
// //   Trash2,
// //   Package,
// //   Tag,
// //   Calendar,
// //   RefreshCw,
// //   ChevronLeft,
// //   ChevronRight,
// //   ZoomIn,
// //   ImageIcon,
// // } from 'lucide-react';
// // import { Button } from '@/components/ui/Button';
// // import { Badge } from '@/components/ui/Badge';
// // import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
// // import { EditProductModal } from '@/components/products/EditProductModal';
// // import { useProductStore } from '@/store/productStore';
// // import { formatPrice, formatDate, getStockStatus } from '@/utils/format';
// // import { LOW_STOCK_THRESHOLD } from '@/types';
// // import { cn } from '@/utils/cn';
// // import { toast } from 'sonner';

// // export function ProductDetail() {
// //   const { id } = useParams<{ id: string }>();
// //   const navigate = useNavigate();
// //   const { getProductById, deleteProduct } = useProductStore();
// //   const [showDelete, setShowDelete] = useState(false);
// //   const [showEdit, setShowEdit] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [zoomed, setZoomed] = useState(false);

// //   const product = id ? getProductById(id) : undefined;

// //   if (!product) {
// //     return (
// //       <div className="max-w-4xl mx-auto px-4 py-16 text-center">
// //         <div className="text-sage-300 mb-4">
// //           <Package size={48} className="mx-auto" />
// //         </div>
// //         <h2 className="text-xl font-semibold text-sage-600 mb-2">Product not found</h2>
// //         <p className="text-sage-400 mb-6">This product may have been deleted</p>
// //         <Button variant="primary" onClick={() => navigate('/products')}>
// //           Back to Products
// //         </Button>
// //       </div>
// //     );
// //   }

// //   const stockStatus = getStockStatus(product.inventory);
// //   const stockBadge = {
// //     'in-stock': { label: 'In Stock', variant: 'success' as const },
// //     'low-stock': { label: 'Low Stock', variant: 'warning' as const },
// //     'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
// //     'completely-out-of-stock': { label: 'Completely Out of Stock', variant: 'danger' as const },
// //   }[stockStatus];

// //   const handleDelete = async () => {
// //     await deleteProduct(product.id);
// //     toast.success('Product deleted');
// //     navigate('/products');
// //   };

// //   const prevImage = () => {
// //     setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
// //   };

// //   const nextImage = () => {
// //     setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //       {/* Back button */}
// //       <motion.div
// //         initial={{ opacity: 0, x: -10 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         className="mb-6"
// //       >
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="flex items-center gap-2 text-sm text-sage-500 hover:text-sage-700 transition-colors"
// //         >
// //           <ArrowLeft size={16} />
// //           Back
// //         </button>
// //       </motion.div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //         {/* Left: Images */}
// //         <motion.div
// //           initial={{ opacity: 0, x: -20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.35 }}
// //         >
// //           {/* Main Image */}
// //           <div
// //             className={cn(
// //               'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
// //               product.images.length > 0 && 'cursor-zoom-in'
// //             )}
// //             style={{ aspectRatio: '4/5' }}
// //             onClick={() => product.images.length > 0 && setZoomed(true)}
// //           >
// //             {product.images.length > 0 ? (
// //               <>
// //                 <AnimatePresence mode="wait">
// //                   <motion.img
// //                     key={selectedImage}
// //                     src={product.images[selectedImage]}
// //                     alt={product.name}
// //                     initial={{ opacity: 0 }}
// //                     animate={{ opacity: 1 }}
// //                     exit={{ opacity: 0 }}
// //                     transition={{ duration: 0.25 }}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </AnimatePresence>

// //                 {/* Navigation arrows */}
// //                 {product.images.length > 1 && (
// //                   <>
// //                     <button
// //                       onClick={(e) => { e.stopPropagation(); prevImage(); }}
// //                       className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
// //                     >
// //                       <ChevronLeft size={16} className="text-sage-600" />
// //                     </button>
// //                     <button
// //                       onClick={(e) => { e.stopPropagation(); nextImage(); }}
// //                       className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
// //                     >
// //                       <ChevronRight size={16} className="text-sage-600" />
// //                     </button>
// //                   </>
// //                 )}

// //                 {/* Zoom hint */}
// //                 <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
// //                   <ZoomIn size={12} className="text-sage-500" />
// //                   <span className="text-xs text-sage-500">Click to zoom</span>
// //                 </div>

// //                 {/* Image counter */}
// //                 {product.images.length > 1 && (
// //                   <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
// //                     {selectedImage + 1}/{product.images.length}
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="w-full h-full flex flex-col items-center justify-center text-sage-200">
// //                 <ImageIcon size={48} />
// //                 <span className="text-sm mt-2 text-sage-300">No images</span>
// //               </div>
// //             )}
// //           </div>

// //           {/* Thumbnail strip */}
// //           {product.images.length > 1 && (
// //             <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
// //               {product.images.map((img, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => setSelectedImage(idx)}
// //                   className={cn(
// //                     'w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all',
// //                     idx === selectedImage
// //                       ? 'border-sage-400 shadow-sm'
// //                       : 'border-transparent hover:border-sage-200'
// //                   )}
// //                 >
// //                   <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </motion.div>

// //         {/* Right: Product Info */}
// //         <motion.div
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ duration: 0.35, delay: 0.1 }}
// //           className="space-y-5"
// //         >
// //           {/* Header */}
// //           <div className="flex items-start justify-between gap-3">
// //             <div className="flex-1 min-w-0">
// //               <h1
// //                 className="text-2xl font-bold text-sage-800 leading-tight"
// //                 style={{ fontFamily: 'Georgia, serif' }}
// //               >
// //                 {product.name}
// //               </h1>
// //               <div className="flex items-center gap-2 mt-2">
// //                 <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
// //                   <Tag size={11} />
// //                   {product.category}
// //                 </span>
// //                 <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
// //               </div>
// //             </div>
// //             <div className="flex gap-2 flex-shrink-0">
// //               <Button
// //                 variant="outline"
// //                 size="sm"
// //                 onClick={() => setShowEdit(true)}
// //               >
// //                 <Edit2 size={14} />
// //                 Edit
// //               </Button>
// //               <Button
// //                 variant="ghost"
// //                 size="sm"
// //                 onClick={() => setShowDelete(true)}
// //                 className="hover:text-red-500 hover:bg-red-50 border border-red-100"
// //               >
// //                 <Trash2 size={14} />
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Price */}
// //           <div className="bg-sage-50 rounded-xl p-4 border border-sage-100">
// //             <p className="text-xs text-sage-400 font-medium uppercase tracking-wide mb-1">Price</p>
// //             <p className="text-3xl font-bold text-sage-700">{formatPrice(product.price)}</p>
// //           </div>

// //           {/* Inventory Summary */}
// //           <div>
// //             <div className="flex items-center justify-between mb-3">
// //               <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
// //                 <Package size={14} />
// //                 Inventory by Size
// //               </p>
// //               <span className="text-xs font-medium text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
// //                 Total: <span className="font-bold text-sage-700">{product.totalInventory}</span>
// //               </span>
// //             </div>

// //             <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
// //               {product.inventory.map((inv) => {
// //                 const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
// //                 const isOut = inv.quantity === 0;
// //                 return (
// //                   <div
// //                     key={inv.size}
// //                     className={cn(
// //                       'flex flex-col items-center py-3 rounded-xl border',
// //                       isOut
// //                         ? 'bg-red-50 border-red-100'
// //                         : isLow
// //                         ? 'bg-amber-50 border-amber-100'
// //                         : 'bg-white border-beige-100'
// //                     )}
// //                   >
// //                     <span
// //                       className={cn(
// //                         'text-xs font-semibold mb-1',
// //                         isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-500'
// //                       )}
// //                     >
// //                       {inv.size}
// //                     </span>
// //                     <span
// //                       className={cn(
// //                         'text-lg font-bold',
// //                         isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-sage-800'
// //                       )}
// //                     >
// //                       {inv.quantity}
// //                     </span>
// //                     {isLow && !isOut && (
// //                       <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>
// //                     )}
// //                     {isOut && (
// //                       <span className="text-[9px] text-red-500 font-medium mt-0.5">Out</span>
// //                     )}
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Metadata */}
// //           <div className="pt-4 border-t border-beige-100 space-y-2.5">
// //             <div className="flex items-center gap-2 text-sm text-sage-400">
// //               <Calendar size={14} className="flex-shrink-0" />
// //               <span>Added: <span className="text-sage-600 font-medium">{formatDate(product.createdAt)}</span></span>
// //             </div>
// //             <div className="flex items-center gap-2 text-sm text-sage-400">
// //               <RefreshCw size={14} className="flex-shrink-0" />
// //               <span>Updated: <span className="text-sage-600 font-medium">{formatDate(product.updatedAt)}</span></span>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Zoom Modal */}
// //       <AnimatePresence>
// //         {zoomed && product.images.length > 0 && (
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
// //             onClick={() => setZoomed(false)}
// //           >
// //             <motion.img
// //               initial={{ scale: 0.9 }}
// //               animate={{ scale: 1 }}
// //               exit={{ scale: 0.9 }}
// //               src={product.images[selectedImage]}
// //               alt={product.name}
// //               className="max-w-full max-h-full object-contain rounded-xl"
// //               onClick={(e) => e.stopPropagation()}
// //             />
// //             <button
// //               onClick={() => setZoomed(false)}
// //               className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
// //             >
// //               ✕
// //             </button>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Edit Modal */}
// //       <EditProductModal
// //         open={showEdit}
// //         productId={product.id}
// //         onClose={() => setShowEdit(false)}
// //       />

// //       {/* Delete Confirm */}
// //       <ConfirmDialog
// //         open={showDelete}
// //         title="Delete Product?"
// //         message="This action cannot be undone. The product and all its inventory data will be permanently removed."
// //         confirmLabel="Delete"
// //         cancelLabel="Cancel"
// //         variant="danger"
// //         onConfirm={handleDelete}
// //         onCancel={() => setShowDelete(false)}
// //       />
// //     </div>
// //   );
// // }


// import { useState, useRef, useEffect } from 'react';
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
//   Factory,
//   Minus,
// } from 'lucide-react';
// import { Button } from '@/components/ui/Button';
// import { Badge } from '@/components/ui/Badge';
// import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
// import { CategorySelect } from '@/components/shared/CategorySelect';
// import { SizeSelect } from '@/components/shared/SizeSelect';
// import { ImageUploader } from '@/components/shared/ImageUploader';
// import { useProductStore } from '@/store/productStore';
// import { useProductionStore } from '@/store/productionStore';
// import { formatPrice, formatDate, getStockStatus } from '@/utils/format';
// import { LOW_STOCK_THRESHOLD, SizeInventory } from '@/types';
// import { cn } from '@/utils/cn';
// import { toast } from 'sonner';

// // Inline editable text field
// function EditableText({
//   value,
//   onSave,
//   className,
//   inputClassName,
//   multiline = false,
// }: {
//   value: string;
//   onSave: (v: string) => Promise<void>;
//   className?: string;
//   inputClassName?: string;
//   multiline?: boolean;
// }) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(value);
//   const [saving, setSaving] = useState(false);
//   const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

//   useEffect(() => {
//     if (editing) inputRef.current?.focus();
//   }, [editing]);

//   const save = async () => {
//     if (draft.trim() === value) { setEditing(false); return; }
//     setSaving(true);
//     try {
//       await onSave(draft.trim());
//       setEditing(false);
//     } catch {
//       toast.error('Failed to save');
//       setDraft(value);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const cancel = () => { setDraft(value); setEditing(false); };

//   if (editing) {
//     const sharedProps = {
//       value: draft,
//       onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//         setDraft(e.target.value),
//       onKeyDown: (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter' && !multiline) save();
//         if (e.key === 'Escape') cancel();
//       },
//       className: cn(
//         'border-b-2 border-sage-400 bg-transparent focus:outline-none',
//         inputClassName
//       ),
//       disabled: saving,
//     };
//     return (
//       <span className={cn('inline-flex items-center gap-1', className)}>
//         {multiline ? (
//           <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} {...sharedProps} rows={2} />
//         ) : (
//           <input ref={inputRef as React.RefObject<HTMLInputElement>} {...sharedProps} />
//         )}
//         <button onClick={save} disabled={saving} className="text-sage-600 hover:text-sage-800 cursor-pointer p-0.5">
//           <Check size={14} />
//         </button>
//         <button onClick={cancel} className="text-sage-400 hover:text-red-500 cursor-pointer p-0.5">
//           <X size={14} />
//         </button>
//       </span>
//     );
//   }

//   return (
//     <span
//       className={cn('cursor-pointer hover:bg-sage-50 rounded px-1 -mx-1 transition-colors group', className)}
//       onClick={() => { setDraft(value); setEditing(true); }}
//       title="Click to edit"
//     >
//       {value}
//       <span className="ml-1.5 opacity-0 group-hover:opacity-40 text-sage-400 text-xs">✎</span>
//     </span>
//   );
// }

// export function ProductDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const { getProductById, updateProduct, deleteProduct } = useProductStore();
//   const { addProduction } = useProductionStore();
//   const [showDelete, setShowDelete] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [zoomed, setZoomed] = useState(false);
//   const [editingPrice, setEditingPrice] = useState(false);
//   const [priceDraft, setPriceDraft] = useState('');
//   const [editingSizes, setEditingSizes] = useState(false);
//   const [sizesDraft, setSizesDraft] = useState<string[]>([]);
//   const [inventoryDraft, setInventoryDraft] = useState<SizeInventory[]>([]);
//   const [addingToProduction, setAddingToProduction] = useState(false);

//   const product = id ? getProductById(id) : undefined;

//   if (!product) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-16 text-center">
//         <div className="text-sage-300 mb-4"><Package size={48} className="mx-auto" /></div>
//         <h2 className="text-xl font-semibold text-sage-600 mb-2">Product not found</h2>
//         <p className="text-sage-400 mb-6">This product may have been deleted</p>
//         <Button variant="primary" onClick={() => navigate('/products')}>Back to Products</Button>
//       </div>
//     );
//   }

//   const stockStatus = getStockStatus(product.inventory);
//   const stockBadge = {
//     'in-stock': { label: 'In Stock', variant: 'success' as const },
//     'low-stock': { label: 'Low Stock', variant: 'warning' as const },
//     'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
//     'completely-out-of-stock': { label: 'Completely Out of Stock', variant: 'danger' as const },
//   }[stockStatus];

//   const handleDelete = async () => {
//     await deleteProduct(product.id);
//     toast.success('Product deleted');
//     navigate('/products');
//   };

//   const handleAddToProduction = async () => {
//     setAddingToProduction(true);
//     try {
//       await addProduction({
//         name: product.name,
//         category: product.category,
//         images: product.images,
//         inventory: product.inventory.map((inv) => ({ size: inv.size, quantity: 1 })),
//       });
//       toast.success(`"${product.name}" added to Production`);
//     } catch {
//       toast.error('Failed to add to production');
//     } finally {
//       setAddingToProduction(false);
//     }
//   };

//   const saveField = async (field: string, value: unknown) => {
//     await updateProduct(product.id, { [field]: value } as Parameters<typeof updateProduct>[1]);
//     toast.success('Saved');
//   };

//   const savePrice = async () => {
//     const price = parseFloat(priceDraft.replace(/[^0-9.]/g, ''));
//     if (isNaN(price) || price < 0) { toast.error('Invalid price'); return; }
//     await updateProduct(product.id, { price });
//     setEditingPrice(false);
//     toast.success('Price updated');
//   };

//   const startEditSizes = () => {
//     setSizesDraft(product.sizes);
//     setInventoryDraft([...product.inventory]);
//     setEditingSizes(true);
//   };

//   const saveSizes = async () => {
//     // Merge new sizes with existing inventory
//     const merged: SizeInventory[] = sizesDraft.map((s) => {
//       const existing = inventoryDraft.find((i) => i.size === s);
//       return existing ?? { size: s, quantity: 0 };
//     });
//     await updateProduct(product.id, { inventory: merged, sizes: sizesDraft });
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
//     setSelectedImage((p) => (p === 0 ? product.images.length - 1 : p - 1));
//   const nextImage = () =>
//     setSelectedImage((p) => (p === product.images.length - 1 ? 0 : p + 1));

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
//         {/* Left: Images */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
//           <div
//             className={cn(
//               'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
//               product.images.length > 0 && 'cursor-zoom-in'
//             )}
//             style={{ aspectRatio: '4/5' }}
//             onClick={() => product.images.length > 0 && setZoomed(true)}
//           >
//             {product.images.length > 0 ? (
//               <>
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.25 }}
//                     className="w-full h-full object-cover"
//                   />
//                 </AnimatePresence>
//                 {product.images.length > 1 && (
//                   <>
//                     <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
//                       <ChevronLeft size={16} className="text-sage-600" />
//                     </button>
//                     <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
//                       <ChevronRight size={16} className="text-sage-600" />
//                     </button>
//                   </>
//                 )}
//                 <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
//                   <ZoomIn size={12} className="text-sage-500" />
//                   <span className="text-xs text-sage-500">Click to zoom</span>
//                 </div>
//                 {product.images.length > 1 && (
//                   <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
//                     {selectedImage + 1}/{product.images.length}
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

//           {product.images.length > 1 && (
//             <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
//               {product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setSelectedImage(idx)}
//                   className={cn(
//                     'w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
//                     idx === selectedImage ? 'border-sage-400 shadow-sm' : 'border-transparent hover:border-sage-200'
//                   )}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Image editor */}
//           <div className="mt-4">
//             <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Edit Images</p>
//             <ImageUploader
//               images={product.images}
//               onChange={(imgs) => saveField('images', imgs)}
//             />
//           </div>
//         </motion.div>

//         {/* Right: Info */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.35, delay: 0.1 }}
//           className="space-y-5"
//         >
//           {/* Header */}
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               <h1
//                 className="text-2xl font-bold text-sage-800 leading-tight"
//                 style={{ fontFamily: 'Georgia, serif' }}
//               >
//                 <EditableText
//                   value={product.name}
//                   onSave={(v) => saveField('name', v)}
//                   inputClassName="text-2xl font-bold text-sage-800 w-full"
//                 />
//               </h1>
//               <div className="flex items-center gap-2 mt-4 flex-wrap">
//                 <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
//                   <Tag size={11} />
//                   <span className="font-medium">Category:</span>
//                 </span>
//                 <div className="min-w-[160px]">
//                   <CategorySelect
//                     value={product.category}
//                     onChange={(v) => v && saveField('category', v)}
//                   />
//                 </div>
//                 <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
//               </div>
//             </div>
//             <div className="flex gap-2 flex-shrink-0 flex-col sm:flex-row">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleAddToProduction}
//                 loading={addingToProduction}
//                 className="cursor-pointer whitespace-nowrap"
//               >
//                 <Factory size={14} />
//                 Add to Production
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setShowDelete(true)}
//                 className="hover:text-red-500 hover:bg-red-50 border border-red-100 cursor-pointer"
//               >
//                 <Trash2 size={14} />
//               </Button>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="bg-sage-50 rounded-xl p-4 border border-sage-100">
//             <p className="text-xs text-sage-400 font-medium uppercase tracking-wide mb-1">Price</p>
//             {editingPrice ? (
//               <div className="flex items-center gap-2">
//                 <span className="text-sage-400 text-xl font-bold">₹</span>
//                 <input
//                   type="text"
//                   value={priceDraft}
//                   onChange={(e) => setPriceDraft(e.target.value)}
//                   onKeyDown={(e) => { if (e.key === 'Enter') savePrice(); if (e.key === 'Escape') setEditingPrice(false); }}
//                   autoFocus
//                   className="text-2xl font-bold text-sage-700 bg-transparent border-b-2 border-sage-400 focus:outline-none w-32"
//                 />
//                 <button onClick={savePrice} className="text-sage-600 hover:text-sage-800 cursor-pointer"><Check size={18} /></button>
//                 <button onClick={() => setEditingPrice(false)} className="text-sage-400 hover:text-red-500 cursor-pointer"><X size={18} /></button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => { setPriceDraft(String(product.price)); setEditingPrice(true); }}
//                 className="text-3xl font-bold text-sage-700 hover:bg-white rounded px-1 -mx-1 transition-colors cursor-pointer group"
//                 title="Click to edit price"
//               >
//                 {formatPrice(product.price)}
//                 <span className="ml-2 opacity-0 group-hover:opacity-40 text-sage-400 text-base">✎</span>
//               </button>
//             )}
//           </div>

//           {/* Inventory */}
//           <div>
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
//                 <Package size={14} /> Inventory by Size
//               </p>
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
//                   Total: <span className="font-bold text-sage-700">{product.totalInventory}</span>
//                 </span>
//                 {!editingSizes && (
//                   <button
//                     onClick={startEditSizes}
//                     className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer"
//                   >
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
//                     // Preserve existing quantities, add 0 for new
//                     setInventoryDraft(
//                       newSizes.map((s) => ({
//                         size: s,
//                         quantity: inventoryDraft.find((i) => i.size === s)?.quantity ?? 0,
//                       }))
//                     );
//                   }}
//                 />

//                 {/* Size quantity controls */}
//                 {sizesDraft.length > 0 && (
//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                     {sizesDraft.map((size) => {
//                       const qty = getInvQty(size);
//                       const isLow = qty > 0 && qty <= LOW_STOCK_THRESHOLD;
//                       const isOut = qty === 0;
//                       return (
//                         <div
//                           key={size}
//                           className={cn(
//                             'rounded-xl border p-2.5',
//                             isOut ? 'border-red-200 bg-red-50/50' : isLow ? 'border-amber-200 bg-amber-50/50' : 'border-sage-100 bg-white'
//                           )}
//                         >
//                           <span className={cn('block text-xs font-semibold mb-2', isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-600')}>
//                             {size}
//                           </span>
//                           <div className="flex items-center gap-1">
//                             <button type="button" onClick={() => setInvQty(size, qty - 1)} disabled={qty <= 0} className="w-7 h-7 flex items-center justify-center rounded-lg border border-sage-200 hover:bg-sage-100 disabled:opacity-30 cursor-pointer">
//                               <Minus size={11} />
//                             </button>
//                             <input
//                               type="number"
//                               min="0"
//                               value={qty === 0 ? '' : qty}
//                               placeholder="0"
//                               onChange={(e) => setInvQty(size, parseInt(e.target.value, 10) || 0)}
//                               className="text-center text-sm font-semibold border rounded-lg py-1 items-center w-[40px] focus:outline-none focus:ring-1 focus:ring-sage-300 border-sage-200"
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
//                 {product.inventory.map((inv) => {
//                   const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
//                   const isOut = inv.quantity === 0;

//                   // Inline quantity editing directly on the card
//                   return (
//                     <InlineInventoryCard
//                       key={inv.size}
//                       inv={inv}
//                       isLow={isLow}
//                       isOut={isOut}
//                       onSave={async (newQty) => {
//                         const newInventory = product.inventory.map((i) =>
//                           i.size === inv.size ? { ...i, quantity: newQty } : i
//                         );
//                         await updateProduct(product.id, { inventory: newInventory });
//                         toast.success('Quantity updated');
//                       }}
//                     />
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//           {/* Metadata */}
//           <div className="pt-4 border-t border-beige-100 space-y-2.5">
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <Calendar size={14} />
//               <span>Added: <span className="text-sage-600 font-medium">{formatDate(product.createdAt)}</span></span>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-sage-400">
//               <RefreshCw size={14} />
//               <span>Updated: <span className="text-sage-600 font-medium">{formatDate(product.updatedAt)}</span></span>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Zoom */}
//       <AnimatePresence>
//         {zoomed && product.images.length > 0 && (
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
//               src={product.images[selectedImage]}
//               alt={product.name}
//               className="max-w-full max-h-full object-contain rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button
//               onClick={() => setZoomed(false)}
//               className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
//             >
//               ✕
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete */}
//       <ConfirmDialog
//         open={showDelete}
//         title="Delete Product?"
//         message="This action cannot be undone. The product and all its inventory data will be permanently removed."
//         confirmLabel="Delete"
//         cancelLabel="Cancel"
//         variant="danger"
//         onConfirm={handleDelete}
//         onCancel={() => setShowDelete(false)}
//       />
//     </div>
//   );
// }

// // Small inline editable inventory card
// function InlineInventoryCard({
//   inv,
//   isLow,
//   isOut,
//   onSave,
// }: {
//   inv: SizeInventory;
//   isLow: boolean;
//   isOut: boolean;
//   onSave: (qty: number) => Promise<void>;
// }) {
//   const [editing, setEditing] = useState(false);
//   const [draft, setDraft] = useState(inv.quantity);

//   const save = async (qty: number) => {
//     const safe = Math.max(0, qty);
//     setDraft(safe);
//     await onSave(safe);
//     setEditing(false);
//   };

//   return (
//     <div
//       className={cn(
//         'flex flex-col items-center py-3 rounded-xl border transition-all',
//         isOut ? 'bg-red-50 border-red-100' : isLow ? 'bg-amber-50 border-amber-100' : 'bg-white border-beige-100'
//       )}
//     >
//       <span className={cn('text-xs font-semibold mb-1', isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-500')}>
//         {inv.size}
//       </span>

//       {editing ? (
//         <div className="flex flex-col items-center gap-1">
//           <button onClick={() => save(draft + 1)} className="w-6 h-6 flex items-center justify-center rounded border border-sage-200 hover:bg-sage-100 cursor-pointer">
//             <Plus size={10} />
//           </button>
//           <input
//             type="number"
//             min="0"
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
//           title="Click to edit quantity"
//         >
//           {inv.quantity}
//         </button>
//       )}

//       {isLow && !isOut && <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>}
//       {isOut && <span className="text-[9px] text-red-500 font-medium mt-0.5">Out</span>}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Trash2,
  Package,
  Tag,
  Calendar,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ImageIcon,
  Check,
  X,
  Plus,
  Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { CategorySelect } from '@/components/shared/CategorySelect';
import { SizeSelect } from '@/components/shared/SizeSelect';
import { InventoryInputs } from '@/components/shared/InventoryInputs';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { useProductStore } from '@/store/productStore';
// import { useProductionStore } from '@/store/productionStore';
import { formatPrice, formatDate, getStockStatus } from '@/utils/format';
import { LOW_STOCK_THRESHOLD, SizeInventory } from '@/types';
import { cn } from '@/utils/cn';
import { toast } from 'sonner';

// ── Inline editable text field ────────────────────────────────────────────────
function EditableText({
  value,
  onSave,
  className,
  inputClassName,
}: {
  value: string;
  onSave: (v: string) => Promise<void>;
  className?: string;
  inputClassName?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = async () => {
    if (draft.trim() === value) { setEditing(false); return; }
    setSaving(true);
    try {
      await onSave(draft.trim());
      setEditing(false);
    } catch {
      toast.error('Failed to save');
      setDraft(value);
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => { setDraft(value); setEditing(false); };

  if (editing) {
    return (
      <span className={cn('inline-flex items-center gap-1', className)}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel(); }}
          disabled={saving}
          className={cn('border-b-2 border-sage-400 bg-transparent focus:outline-none', inputClassName)}
        />
        <button onClick={save} disabled={saving} className="text-sage-600 hover:text-sage-800 cursor-pointer p-0.5">
          <Check size={14} />
        </button>
        <button onClick={cancel} className="text-sage-400 hover:text-red-500 cursor-pointer p-0.5">
          <X size={14} />
        </button>
      </span>
    );
  }

  return (
    <span
      className={cn('cursor-pointer hover:bg-sage-50 rounded px-1 -mx-1 transition-colors group', className)}
      onClick={() => { setDraft(value); setEditing(true); }}
      title="Click to edit"
    >
      {value}
      <span className="ml-1.5 opacity-0 group-hover:opacity-40 text-sage-400 text-xs">✎</span>
    </span>
  );
}

// ── Inline quantity card ──────────────────────────────────────────────────────
function InlineInventoryCard({
  inv,
  isLow,
  isOut,
  onSave,
}: {
  inv: SizeInventory;
  isLow: boolean;
  isOut: boolean;
  onSave: (qty: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(inv.quantity);

  useEffect(() => {
    if (!editing) setDraft(inv.quantity);
  }, [inv.quantity, editing]);

  const save = async (qty: number) => {
    const safe = Math.max(0, qty);
    setDraft(safe);
    await onSave(safe);
    setEditing(false);
  };

  return (
    <div className={cn(
      'flex flex-col items-center py-3 rounded-xl border transition-all',
      isOut ? 'bg-red-50 border-red-100' : isLow ? 'bg-amber-50 border-amber-100' : 'bg-white border-beige-100'
    )}>
      <span className={cn('text-xs font-semibold mb-1', isOut ? 'text-red-500' : isLow ? 'text-amber-600' : 'text-sage-500')}>
        {inv.size}
      </span>

      {editing ? (
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => save(draft + 1)} className="w-6 h-6 flex items-center justify-center rounded border border-sage-200 hover:bg-sage-100 cursor-pointer">
            <Plus size={10} />
          </button>
          <input
            type="number"
            min="0"
            value={draft}
            onChange={(e) => setDraft(parseInt(e.target.value, 10) || 0)}
            onKeyDown={(e) => { if (e.key === 'Enter') save(draft); if (e.key === 'Escape') setEditing(false); }}
            autoFocus
            className="w-12 text-center text-sm font-bold border border-sage-300 rounded focus:outline-none focus:ring-1 focus:ring-sage-300 py-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button onClick={() => save(Math.max(0, draft - 1))} className="w-6 h-6 flex items-center justify-center rounded border border-sage-200 hover:bg-sage-100 cursor-pointer">
            <Minus size={10} />
          </button>
          <button onClick={() => save(draft)} className="mt-1 text-sage-600 cursor-pointer">
            <Check size={12} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => { setDraft(inv.quantity); setEditing(true); }}
          className={cn('text-lg font-bold cursor-pointer hover:opacity-70 transition-opacity', isOut ? 'text-red-600' : isLow ? 'text-amber-700' : 'text-sage-800')}
          title="Click to edit quantity"
        >
          {inv.quantity}
        </button>
      )}

      {isLow && !isOut && <span className="text-[9px] text-amber-500 font-medium mt-0.5">Low</span>}
      {isOut && <span className="text-[9px] text-red-500 font-medium mt-0.5">Out</span>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct, deleteProduct } = useProductStore();
  // const { addProduction } = useProductionStore();

  const [showDelete, setShowDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceDraft, setPriceDraft] = useState('');
  const [editingSizes, setEditingSizes] = useState(false);
  const [sizesDraft, setSizesDraft] = useState<string[]>([]);
  const [inventoryDraft, setInventoryDraft] = useState<SizeInventory[]>([]);
  // const [addingToProduction, setAddingToProduction] = useState(false);

  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-sage-300 mb-4"><Package size={48} className="mx-auto" /></div>
        <h2 className="text-xl font-semibold text-sage-600 mb-2">Product not found</h2>
        <p className="text-sage-400 mb-6">This product may have been deleted</p>
        <Button variant="primary" onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.inventory);
  const stockBadge = {
    'in-stock': { label: 'In Stock', variant: 'success' as const },
    'low-stock': { label: 'Low Stock', variant: 'warning' as const },
    'out-of-stock': { label: 'Out of Stock', variant: 'danger' as const },
    'completely-out-of-stock': { label: 'Completely Out of Stock', variant: 'danger' as const },
  }[stockStatus];

  const handleDelete = async () => {
    await deleteProduct(product.id);
    toast.success('Product deleted');
    navigate('/products');
  };

  // const handleAddToProduction = async () => {
  //   setAddingToProduction(true);
  //   try {
  //     await addProduction({
  //       name: product.name,
  //       category: product.category,
  //       images: product.images,
  //       inventory: product.inventory.map((inv) => ({ size: inv.size, quantity: 1 })),
  //     });
  //     toast.success(`"${product.name}" added to Production`);
  //   } catch {
  //     toast.error('Failed to add to production');
  //   } finally {
  //     setAddingToProduction(false);
  //   }
  // };

  const saveField = async (field: string, value: unknown) => {
    await updateProduct(product.id, { [field]: value } as Parameters<typeof updateProduct>[1]);
    toast.success('Saved');
  };

  const savePrice = async () => {
    const price = parseFloat(priceDraft.replace(/[^0-9.]/g, ''));
    if (isNaN(price) || price < 0) { toast.error('Invalid price'); return; }
    await updateProduct(product.id, { price });
    setEditingPrice(false);
    toast.success('Price updated');
  };

  const startEditSizes = () => {
    setSizesDraft(product.sizes);
    setInventoryDraft([...product.inventory]);
    setEditingSizes(true);
  };

  const saveSizes = async () => {
    const merged: SizeInventory[] = sizesDraft.map((s) => {
      const existing = inventoryDraft.find((i) => i.size === s);
      return existing ?? { size: s, quantity: 0 };
    });
    await updateProduct(product.id, { inventory: merged, sizes: sizesDraft });
    setEditingSizes(false);
    toast.success('Sizes updated');
  };

  const prevImage = () => setSelectedImage((p) => (p === 0 ? product.images.length - 1 : p - 1));
  const nextImage = () => setSelectedImage((p) => (p === product.images.length - 1 ? 0 : p + 1));

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
        {/* Left: Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <div
            className={cn(
              'relative bg-beige-50 rounded-2xl overflow-hidden border border-beige-100 shadow-sm',
              product.images.length > 0 && 'cursor-zoom-in'
            )}
            style={{ aspectRatio: '4/5' }}
            onClick={() => product.images.length > 0 && setZoomed(true)}
          >
            {product.images.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                {product.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
                      <ChevronLeft size={16} className="text-sage-600" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
                      <ChevronRight size={16} className="text-sage-600" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <ZoomIn size={12} className="text-sage-500" />
                  <span className="text-xs text-sage-500">Click to zoom</span>
                </div>
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                    {selectedImage + 1}/{product.images.length}
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

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)}
                  className={cn('w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer',
                    idx === selectedImage ? 'border-sage-400 shadow-sm' : 'border-transparent hover:border-sage-200'
                  )}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Image editor */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-2">Edit Images</p>
            <ImageUploader
              images={product.images}
              onChange={(imgs) => saveField('images', imgs)}
            />
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-sage-800 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                <EditableText
                  value={product.name}
                  onSave={(v) => saveField('name', v)}
                  inputClassName="text-2xl font-bold text-sage-800 w-full"
                />
              </h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                  <Tag size={11} />
                  <span className="font-medium">Category:</span>
                </span>
                <div className="min-w-[160px]">
                  <CategorySelect
                    value={product.category}
                    onChange={(v) => v && saveField('category', v)}
                  />
                </div>
                <Badge variant={stockBadge.variant}>{stockBadge.label}</Badge>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0 flex-col sm:flex-row">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={handleAddToProduction}
                loading={addingToProduction}
                className="cursor-pointer whitespace-nowrap"
              >
                <Factory size={14} />
                Add to Production
              </Button> */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDelete(true)}
                className="hover:text-red-500 hover:bg-red-50 border border-red-100 cursor-pointer"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-sage-50 rounded-xl p-4 border border-sage-100">
            <p className="text-xs text-sage-400 font-medium uppercase tracking-wide mb-1">Price</p>
            {editingPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-sage-400 text-xl font-bold">₹</span>
                <input
                  type="text"
                  value={priceDraft}
                  onChange={(e) => setPriceDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') savePrice(); if (e.key === 'Escape') setEditingPrice(false); }}
                  autoFocus
                  className="text-2xl font-bold text-sage-700 bg-transparent border-b-2 border-sage-400 focus:outline-none w-32"
                />
                <button onClick={savePrice} className="text-sage-600 hover:text-sage-800 cursor-pointer"><Check size={18} /></button>
                <button onClick={() => setEditingPrice(false)} className="text-sage-400 hover:text-red-500 cursor-pointer"><X size={18} /></button>
              </div>
            ) : (
              <button
                onClick={() => { setPriceDraft(String(product.price)); setEditingPrice(true); }}
                className="text-3xl font-bold text-sage-700 hover:bg-white rounded px-1 -mx-1 transition-colors cursor-pointer group"
                title="Click to edit price"
              >
                {formatPrice(product.price)}
                <span className="ml-2 opacity-0 group-hover:opacity-40 text-sage-400 text-base">✎</span>
              </button>
            )}
          </div>

          {/* Inventory */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-sage-700 flex items-center gap-2">
                <Package size={14} /> Inventory by Size
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-sage-500 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-100">
                  Total: <span className="font-bold text-sage-700">{product.totalInventory}</span>
                </span>
                {!editingSizes && (
                  <button onClick={startEditSizes} className="text-xs text-sage-500 hover:text-sage-700 underline cursor-pointer">
                    Edit sizes
                  </button>
                )}
              </div>
            </div>

            {editingSizes ? (
              <div className="space-y-3">
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
                    <Check size={14} /> Save Sizes
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setEditingSizes(false)} className="cursor-pointer">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.inventory.map((inv) => {
                  const isLow = inv.quantity > 0 && inv.quantity <= LOW_STOCK_THRESHOLD;
                  const isOut = inv.quantity === 0;
                  return (
                    <InlineInventoryCard
                      key={inv.size}
                      inv={inv}
                      isLow={isLow}
                      isOut={isOut}
                      onSave={async (newQty) => {
                        const newInventory = product.inventory.map((i) =>
                          i.size === inv.size ? { ...i, quantity: newQty } : i
                        );
                        await updateProduct(product.id, { inventory: newInventory });
                        toast.success('Quantity updated');
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="pt-4 border-t border-beige-100 space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <Calendar size={14} className="flex-shrink-0" />
              <span>Added: <span className="text-sage-600 font-medium">{formatDate(product.createdAt)}</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-sage-400">
              <RefreshCw size={14} className="flex-shrink-0" />
              <span>Updated: <span className="text-sage-600 font-medium">{formatDate(product.updatedAt)}</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Zoom */}
      <AnimatePresence>
        {zoomed && product.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={product.images[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={() => setZoomed(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete */}
      <ConfirmDialog
        open={showDelete}
        title="Delete Product?"
        message="This action cannot be undone. The product and all its inventory data will be permanently removed."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  );
}