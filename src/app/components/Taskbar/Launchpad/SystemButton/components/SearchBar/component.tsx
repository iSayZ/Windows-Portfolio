import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="flex items-center gap-2 p-2 mb-4 bg-white/90 rounded-md">
    <Search size={20} className="text-gray-500" />
    <input
      type="text"
      placeholder="Type here to search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent w-full outline-none text-sm text-black"
    />
  </div>
);
