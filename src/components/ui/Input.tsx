import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-sage-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-lg border bg-white text-sage-800 text-sm transition-all duration-150 placeholder:text-sage-300',
              'focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400',
              error
                ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                : 'border-sage-200 hover:border-sage-300',
              leftIcon ? 'pl-9' : 'pl-3',
              rightIcon ? 'pr-9' : 'pr-3',
              'py-2.5',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1 text-xs text-sage-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
