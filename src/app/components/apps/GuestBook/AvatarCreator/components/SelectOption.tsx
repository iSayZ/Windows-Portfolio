import React from 'react';
import type { SelectOptionProps } from '../types';

export const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-foreground capitalize">
      {label.replace(/([A-Z])/g, ' $1').trim()}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 rounded bg-secondary-bg text-foreground border border-foreground hover:border-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          className="bg-secondary-bg capitalize"
        >
          {option.replace(/([A-Z])/g, ' $1').trim()}
        </option>
      ))}
    </select>
  </div>
);