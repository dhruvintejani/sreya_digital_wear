import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/forms/ProductForm';
import { useProductStore } from '@/store/productStore';

interface EditProductModalProps {
  open: boolean;
  productId: string | null;
  onClose: () => void;
}

export function EditProductModal({ open, productId, onClose }: EditProductModalProps) {
  const { getProductById } = useProductStore();
  const product = productId ? getProductById(productId) : undefined;

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Product"
      description={`Editing ${product.name}`}
      size="xl"
      preventCloseOnOutside
    >
      <ProductForm product={product} onClose={onClose} />
    </Modal>
  );
}
