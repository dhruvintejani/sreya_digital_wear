import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-sage-200 hover:border-sage-300 bg-white text-sage-800 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-sage-400 placeholder:text-sage-300"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-300 hover:text-sage-500 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
