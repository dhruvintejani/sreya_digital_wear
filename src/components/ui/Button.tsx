import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-sage-600 hover:bg-sage-700 text-white shadow-sm hover:shadow-md',
      secondary: 'bg-beige-100 hover:bg-beige-200 text-sage-700 border border-beige-200',
      outline: 'border border-sage-300 hover:border-sage-500 text-sage-600 hover:bg-sage-50',
      ghost: 'hover:bg-sage-50 text-sage-600',
      danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
      success: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-lg',
      md: 'px-4 py-2 text-sm font-medium rounded-lg',
      lg: 'px-6 py-3 text-base font-semibold rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center cursor-pointer justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
