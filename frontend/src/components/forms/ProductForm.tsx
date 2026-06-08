// import { useEffect, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast } from 'sonner';

// import { Input } from '@/components/ui/Input';
// import { Button } from '@/components/ui/Button';
// import { CategorySelect } from '@/components/shared/CategorySelect';
// import { SizeSelect } from '@/components/shared/SizeSelect';
// import { InventoryInputs } from '@/components/shared/InventoryInputs';
// import { ImageUploader } from '@/components/shared/ImageUploader';
// import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
// import { useProductStore } from '@/store/productStore';
// import { Product, SizeInventory } from '@/types';

// const productSchema = z.object({
//   name: z.string().min(1, 'Product name is required').max(100, 'Name too long'),
//   category: z.string().min(1, 'Category is required'),
//   price: z.string().min(1, 'Price is required'),
//   images: z.array(z.string()),
//   sizes: z.array(z.string()).min(1, 'Select at least one size'),
//   inventory: z.array(z.object({ size: z.string(), quantity: z.number().min(0) })),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// interface ProductFormProps {
//   product?: Product;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// export function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
//   const { addProduct, updateProduct } = useProductStore();
//   const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
//   const isEditing = !!product;

//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting, isDirty },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: product?.name ?? '',
//       category: product?.category ?? '',
//       price: product?.price ? String(product.price) : '',
//       images: product?.images ?? [],
//       sizes: product?.sizes ?? [],
//       inventory: product?.inventory ?? [],
//     },
//   });

//   const watchedSizes = watch('sizes');
//   const watchedInventory = watch('inventory');

//   // Sync inventory when sizes change
//   useEffect(() => {
//     const currentInventory = watchedInventory || [];
//     const newInventory: SizeInventory[] = watchedSizes.map((size) => {
//       const existing = currentInventory.find((i) => i.size === size);
//       return existing ?? { size, quantity: 0 };
//     });
//     setValue('inventory', newInventory, { shouldDirty: false });
//   }, [watchedSizes]); // eslint-disable-line react-hooks/exhaustive-deps

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       // Parse price strictly - preserve exact value
//       const priceStr = data.price.toString().replace(/[^0-9.]/g, '');
//       const price = parseFloat(priceStr);
//       if (isNaN(price)) {
//         toast.error('Invalid price value');
//         return;
//       }

//       const productData = {
//         name: data.name.trim(),
//         category: data.category,
//         price,
//         images: data.images,
//         sizes: data.sizes,
//         inventory: data.inventory,
//         totalInventory: data.inventory.reduce((sum, i) => sum + i.quantity, 0),
//       };

//       if (isEditing) {
//         await updateProduct(product.id, productData);
//         toast.success('Product updated successfully');
//       } else {
//         await addProduct(productData);
//         toast.success('Product added successfully');
//       }

//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.');
//     }
//   };

//   const handleCancel = () => {
//     if (isDirty) {
//       setShowUnsavedDialog(true);
//     } else {
//       onClose();
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto max-h-[75vh]">
//         <div className="px-6 py-4 space-y-5">
//           {/* Product Name */}
//           <Input
//             label="Product Name"
//             placeholder="e.g., Kanjivaram Silk Saree"
//             error={errors.name?.message}
//             {...register('name')}
//           />

//           {/* Category */}
//           <Controller
//             name="category"
//             control={control}
//             render={({ field }) => (
//               <CategorySelect
//                 value={field.value}
//                 onChange={field.onChange}
//                 error={errors.category?.message}
//               />
//             )}
//           />

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-medium text-sage-700 mb-1.5">
//               Price (₹)
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400 text-sm font-medium">₹</span>
//               <input
//                 {...register('price')}
//                 type="text"
//                 inputMode="decimal"
//                 placeholder="0"
//                 className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-sage-200 hover:border-sage-300 bg-white text-sage-800 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300"
//               />
//             </div>
//             {errors.price && (
//               <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>
//             )}
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-sm font-medium text-sage-700 mb-1.5">
//               Product Images
//             </label>
//             <Controller
//               name="images"
//               control={control}
//               render={({ field }) => (
//                 <ImageUploader
//                   images={field.value}
//                   onChange={field.onChange}
//                 />
//               )}
//             />
//           </div>

//           {/* Sizes */}
//           <Controller
//             name="sizes"
//             control={control}
//             render={({ field }) => (
//               <SizeSelect
//                 value={field.value}
//                 onChange={field.onChange}
//                 error={errors.sizes?.message}
//               />
//             )}
//           />

//           {/* Inventory */}
//           <Controller
//             name="inventory"
//             control={control}
//             render={({ field }) => (
//               <InventoryInputs
//                 sizes={watchedSizes}
//                 inventory={field.value}
//                 onChange={field.onChange}
//               />
//             )}
//           />
//         </div>

//         {/* Footer */}
//         <div className="sticky bottom-0 bg-white border-t border-beige-100 px-6 py-4 flex gap-3">
//           <Button
//             type="button"
//             variant="secondary"
//             className="flex-1 cursor-pointer"
//             onClick={handleCancel}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             className="flex-1 cursor-pointer"
//             loading={isSubmitting}
//           >
//             {isEditing ? 'Update Product' : 'Add Product'}
//           </Button>
//         </div>
//       </form>

//       {/* Unsaved Changes Dialog */}
//       <ConfirmDialog
//         open={showUnsavedDialog}
//         title="Unsaved Changes"
//         message="You have unsaved changes. Are you sure you want to discard them?"
//         confirmLabel="Discard Changes"
//         cancelLabel="Continue Editing"
//         variant="warning"
//         onConfirm={() => {
//           setShowUnsavedDialog(false);
//           onClose();
//         }}
//         onCancel={() => setShowUnsavedDialog(false)}
//       />
//     </>
//   );
// }


import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CategorySelect } from '@/components/shared/CategorySelect';
import { SizeSelect } from '@/components/shared/SizeSelect';
import { InventoryInputs } from '@/components/shared/InventoryInputs';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { useProductStore } from '@/store/productStore';
import { SizeInventory } from '@/types';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name too long'),
  category: z.string().min(1, 'Category is required'),
  price: z.string().min(1, 'Price is required'),
  images: z.array(z.string()),
  sizes: z.array(z.string()).min(1, 'Select at least one size'),
  inventory: z.array(z.object({ size: z.string(), quantity: z.number().min(0) })),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function ProductForm({ onClose, onSuccess }: ProductFormProps) {
  const { addProduct } = useProductStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      price: '',
      images: [],
      sizes: [],
      inventory: [],
    },
  });

  const watchedSizes = watch('sizes');
  const watchedInventory = watch('inventory');

  // Sync inventory when sizes change
  useEffect(() => {
    const currentInventory = watchedInventory || [];
    const newInventory: SizeInventory[] = watchedSizes.map((size) => {
      const existing = currentInventory.find((i) => i.size === size);
      return existing ?? { size, quantity: 0 };
    });
    setValue('inventory', newInventory, { shouldDirty: false });
  }, [watchedSizes]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: ProductFormData) => {
    try {
      const priceStr = data.price.toString().replace(/[^0-9.]/g, '');
      const price = parseFloat(priceStr);
      if (isNaN(price)) {
        toast.error('Invalid price value');
        return;
      }

      await addProduct({
        name: data.name.trim(),
        category: data.category,
        price,
        images: data.images,
        sizes: data.sizes,
        inventory: data.inventory,
        totalInventory: data.inventory.reduce((sum, i) => sum + i.quantity, 0),
      });

      toast.success('Product added successfully');
      reset();
      onSuccess?.();
      onClose();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto max-h-[75vh]">
      <div className="px-6 py-4 space-y-5">
        <Input
          label="Product Name"
          placeholder="e.g., Kanjivaram Silk Saree"
          error={errors.name?.message}
          {...register('name')}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <CategorySelect
              value={field.value}
              onChange={field.onChange}
              error={errors.category?.message}
            />
          )}
        />

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-sage-700 mb-1.5">Price (₹)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400 text-sm font-medium">₹</span>
            <input
              {...register('price')}
              type="text"
              inputMode="decimal"
              placeholder="0"
              className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-sage-200 hover:border-sage-300 bg-white text-sage-800 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300"
            />
          </div>
          {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-sage-700 mb-1.5">Product Images</label>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <ImageUploader images={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <SizeSelect
              value={field.value}
              onChange={field.onChange}
              error={errors.sizes?.message}
            />
          )}
        />

        <Controller
          name="inventory"
          control={control}
          render={({ field }) => (
            <InventoryInputs
              sizes={watchedSizes}
              inventory={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="sticky bottom-0 bg-white border-t border-beige-100 px-6 py-4 flex gap-3">
        <Button type="button" variant="secondary" className="flex-1 cursor-pointer" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="flex-1 cursor-pointer" loading={isSubmitting}>
          Add Product
        </Button>
      </div>
    </form>
  );
}