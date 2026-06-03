import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, Reorder } from 'framer-motion';
import { Upload, X, ImageIcon, GripVertical } from 'lucide-react';
import { imageToBase64 } from '@/utils/format';
import { cn } from '@/utils/cn';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const remaining = maxImages - images.length;
      const filesToProcess = acceptedFiles.slice(0, remaining);
      
      const base64Images = await Promise.all(
        filesToProcess.map((file) => imageToBase64(file))
      );
      
      onChange([...images, ...base64Images]);
    },
    [images, onChange, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'] },
    maxFiles: maxImages,
    disabled: images.length >= maxImages,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200',
            isDragActive || isDragging
              ? 'border-sage-400 bg-sage-50 scale-[1.01]'
              : 'border-sage-200 hover:border-sage-300 hover:bg-sage-50/50'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
              isDragActive ? 'bg-sage-100 text-sage-600' : 'bg-beige-100 text-sage-400'
            )}>
              <Upload size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-sage-600">
                {isDragActive ? 'Drop images here' : 'Drag & drop images'}
              </p>
              <p className="text-xs text-sage-400 mt-0.5">
                or <span className="text-sage-500 underline cursor-pointer">browse files</span>
                {' · '}JPG, PNG, WebP
              </p>
            </div>
            {images.length > 0 && (
              <p className="text-xs text-sage-400">
                {images.length}/{maxImages} images
              </p>
            )}
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={onChange}
          className="flex flex-wrap gap-3"
        >
          <AnimatePresence>
            {images.map((image, index) => (
              <Reorder.Item
                key={image}
                value={image}
                className="relative group cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-sage-300 transition-all">
                  {image ? (
                    <img
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-beige-100 flex items-center justify-center">
                      <ImageIcon size={20} className="text-sage-300" />
                    </div>
                  )}
                </div>

                {/* Drag handle */}
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 bg-white/90 rounded-md flex items-center justify-center shadow-sm">
                    <GripVertical size={12} className="text-sage-400" />
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                  aria-label="Remove image"
                >
                  <X size={10} />
                </button>

                {/* Primary badge */}
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-sage-600/90 text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md">
                    Main
                  </div>
                )}
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </div>
  );
}
