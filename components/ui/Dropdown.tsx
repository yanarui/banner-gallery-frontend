import React from "react";

interface DropdownProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { label: string; value: string }[];
  multiple?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  multiple = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    onChange(selectedOptions);
  };

  return (
    <tr className="border-b-1 border-gray-800">
      <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
        {label}
      </td>
      <td className="py-3 text-gray-800">
        <div className="border px-2 py-2 rounded w-full bg-gray-50">
          <select
            value={value}
            onChange={handleChange}
            multiple={multiple}
            className="px-2 py-1 rounded w-full h-auto">
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </td>
    </tr>
  );
};

export default Dropdown;
