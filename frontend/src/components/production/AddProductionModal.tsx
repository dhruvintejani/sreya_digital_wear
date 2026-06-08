import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CategorySelect } from '@/components/shared/CategorySelect';
import { SizeSelect } from '@/components/shared/SizeSelect';
import { InventoryInputs } from '@/components/shared/InventoryInputs';
import { ImageUploader } from '@/components/shared/ImageUploader';
import { useProductionStore } from '@/store/productionStore';
import { SizeInventory } from '@/types';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string()),
  sizes: z.array(z.string()).min(1, 'Select at least one size'),
  inventory: z.array(z.object({ size: z.string(), quantity: z.number().min(0) })),
});

type FormData = z.infer<typeof schema>;

interface AddProductionModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddProductionModal({ open, onClose }: AddProductionModalProps) {
  const { addProduction } = useProductionStore();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      category: '',
      images: [],
      sizes: [],
      inventory: [],
    },
  });

  const watchedSizes = watch('sizes');
  const watchedInventory = watch('inventory');

  // Sync inventory when sizes change
  useEffect(() => {
    const current = watchedInventory || [];
    const newInventory: SizeInventory[] = watchedSizes.map((size) => {
      const existing = current.find((i) => i.size === size);
      return existing ?? { size, quantity: 0 };
    });
    setValue('inventory', newInventory, { shouldDirty: false });
  }, [watchedSizes]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data: FormData) => {
    try {
      await addProduction({
        name: data.name.trim(),
        category: data.category,
        images: data.images,
        inventory: data.inventory,
      });
      toast.success('Production entry added');
      reset();
      onClose();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Production Entry"
      description="Fill in the details for this production run"
      size="xl"
      preventCloseOnOutside
    >
      <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto max-h-[75vh]">
        <div className="px-6 py-4 space-y-5">
          <Input
            label="Production Name"
            placeholder="e.g., Kanjivaram Silk Saree - Batch 1"
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

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1.5">Images</label>
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
          <Button type="button" variant="secondary" className="flex-1 cursor-pointer" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="flex-1 cursor-pointer" loading={isSubmitting}>
            Add Production
          </Button>
        </div>
      </form>
    </Modal>
  );
}