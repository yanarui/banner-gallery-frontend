import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <tr className="border-b-1 border-gray-800">
      <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
        {label}
      </td>
      <td className="py-3 text-gray-800">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border px-4 py-3 rounded"
          placeholder={placeholder}
        />
      </td>
    </tr>
  );
};

export default TextInput;
