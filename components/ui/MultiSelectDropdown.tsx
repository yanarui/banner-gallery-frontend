import React from "react";

interface MultiSelectDropdownProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    if (!selectedValues.includes(selectedOption)) {
      onChange([...selectedValues, selectedOption]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((item) => item !== value));
  };

  return (
    <tr className="border-b-1 border-gray-800">

      <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
        {label}
      </td>
      <td className="py-3 text-gray-800 w-80">
        <div className="border px-2 py-2 rounded w-full bg-gray-50">
          <select
            onChange={handleSelect}
            className="px-2 py-1 w-full focus:outline-none"
            value="">
            <option value="" disabled>
              選択してください
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {selectedValues.length > 0 &&
              selectedValues.map((value) => (
                <div
                  key={value}
                  className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                  <span>{value}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(value)}
                    className="ml-2 text-gray-800 hover:text-gray-500">
                    &times;
                  </button>
                </div>
              ))}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MultiSelectDropdown;
