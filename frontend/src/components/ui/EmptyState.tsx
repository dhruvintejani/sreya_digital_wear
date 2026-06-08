import { motion } from 'framer-motion';
import { PackageOpen, Search } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No items found',
  description = 'There are no items to display.',
  icon,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-sage-50 flex items-center justify-center mb-4 text-sage-300">
        {icon || <PackageOpen size={28} />}
      </div>
      <h3 className="text-base font-semibold text-sage-600 mb-1">{title}</h3>
      <p className="text-sm text-sage-400 max-w-xs leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      icon={<Search size={28} />}
      title="No results found"
      description={`No products match "${query}". Try a different search term.`}
    />
  );
}
