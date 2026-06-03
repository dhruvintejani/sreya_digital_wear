export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStockStatus(inventory: { quantity: number }[], threshold = 5) {
  const hasOutOfStock = inventory.some((s) => s.quantity === 0);
  const hasLowStock = inventory.some(
    (s) => s.quantity > 0 && s.quantity <= threshold
  );
  if (hasOutOfStock && inventory.every((s) => s.quantity === 0)) {
    return 'completely-out-of-stock';
  }
  if (hasOutOfStock) return 'out-of-stock';
  if (hasLowStock) return 'low-stock';
  return 'in-stock';
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
