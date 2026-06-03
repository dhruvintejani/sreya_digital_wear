import CreatableSelect from 'react-select/creatable';
import { DEFAULT_SIZES } from '@/types';

interface SizeSelectProps {
  value: string[];
  onChange: (sizes: string[]) => void;
  error?: string;
}

const sizeOptions = DEFAULT_SIZES.map((s) => ({ value: s, label: s }));

const groupedSizeOptions = [
  {
    label: 'Standard Sizes',
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((s) => ({ value: s, label: s })),
  },
  {
    label: 'Numeric Sizes',
    options: ['28', '30', '32', '34', '36', '38', '40', '42', '44'].map((s) => ({ value: s, label: s })),
  },
];

export function SizeSelect({ value, onChange, error }: SizeSelectProps) {
  const selectedOptions = value.map((s) => ({ value: s, label: s }));

  const handleChange = (options: readonly { value: string; label: string }[]) => {
    onChange(options.map((o) => o.value));
  };

  const handleCreate = (inputValue: string) => {
    const trimmed = inputValue.trim().toUpperCase();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-sage-700 mb-1.5">
        Sizes
      </label>
      <CreatableSelect
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={groupedSizeOptions}
        placeholder="Select or type custom sizes..."
        classNamePrefix="sdw-select"
        formatCreateLabel={(inputValue) => `Add size "${inputValue.toUpperCase()}"`}
        isSearchable
        closeMenuOnSelect={false}
        menuPosition="fixed"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          groupHeading: (base) => ({
            ...base,
            fontSize: '11px',
            fontWeight: 600,
            color: '#8fad88',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '6px 12px 4px',
          }),
        }}
        menuPortalTarget={document.body}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Suppress unused import
void sizeOptions;
