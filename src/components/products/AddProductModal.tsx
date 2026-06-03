import { Modal } from '@/components/ui/Modal';
import { ProductForm } from '@/components/forms/ProductForm';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Product"
      description="Fill in the details to add a new product to your inventory"
      size="xl"
      preventCloseOnOutside
    >
      <ProductForm onClose={onClose} />
    </Modal>
  );
}
