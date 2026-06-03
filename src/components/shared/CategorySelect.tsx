import CreatableSelect from 'react-select/creatable';
import { useProductStore } from '@/store/productStore';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function CategorySelect({ value, onChange, error }: CategorySelectProps) {
  const { categories, addCategory } = useProductStore();

  const options = categories.map((cat) => ({
    value: cat.name,
    label: cat.name,
  }));

  const selectedOption = value
    ? { value, label: value }
    : null;

  const handleChange = (option: { value: string; label: string } | null) => {
    onChange(option?.value ?? '');
  };

  const handleCreate = async (inputValue: string) => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    await addCategory(trimmed);
    onChange(trimmed);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-sage-700 mb-1.5">
        Category
      </label>
      <CreatableSelect
        value={selectedOption}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        placeholder="Select or create category..."
        classNamePrefix="sdw-select"
        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
        isClearable
        isSearchable
        menuPosition="fixed"
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        menuPortalTarget={document.body}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
