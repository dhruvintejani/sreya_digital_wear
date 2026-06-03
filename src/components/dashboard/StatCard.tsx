import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  onClick?: () => void;
  color?: 'green' | 'amber' | 'red' | 'blue' | 'default';
  className?: string;
}

const colorStyles = {
  green: {
    icon: 'bg-emerald-50 text-emerald-600',
    value: 'text-emerald-700',
    border: 'hover:border-emerald-200',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600',
    value: 'text-amber-700',
    border: 'hover:border-amber-200',
  },
  red: {
    icon: 'bg-red-50 text-red-500',
    value: 'text-red-600',
    border: 'hover:border-red-200',
  },
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    value: 'text-blue-700',
    border: 'hover:border-blue-200',
  },
  default: {
    icon: 'bg-sage-50 text-sage-600',
    value: 'text-sage-800',
    border: 'hover:border-sage-300',
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
  color = 'default',
  className,
}: StatCardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      whileHover={onClick ? { y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      className={cn(
        'bg-white rounded-2xl border border-beige-100 p-5 shadow-sm transition-all duration-200',
        onClick && `cursor-pointer ${styles.border} hover:shadow-md`,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={onClick ? `View ${title}` : undefined}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sage-400 uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className={cn('text-3xl font-bold', styles.value)}>
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </p>
          {subtitle && (
            <p className="text-xs text-sage-400 mt-1.5">{subtitle}</p>
          )}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', styles.icon)}>
          {icon}
        </div>
      </div>

      {onClick && (
        <div className="mt-4 pt-3 border-t border-beige-50">
          <span className="text-xs font-medium text-sage-400 hover:text-sage-600 transition-colors">
            Click to view details →
          </span>
        </div>
      )}
    </motion.div>
  );
}
