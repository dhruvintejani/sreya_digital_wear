import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-sage-900/40 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-sage-100 p-6"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  variant === 'danger' ? 'bg-red-50' : 'bg-amber-50'
                }`}
              >
                {variant === 'danger' ? (
                  <Trash2 size={22} className="text-red-500" />
                ) : (
                  <AlertTriangle size={22} className="text-amber-500" />
                )}
              </div>
              <h3 className="text-base font-semibold text-sage-800 mb-2">{title}</h3>
              <p className="text-sm text-sage-500 mb-6 leading-relaxed">{message}</p>
              <div className="flex gap-3 w-full">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
                <Button
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  className="flex-1"
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
