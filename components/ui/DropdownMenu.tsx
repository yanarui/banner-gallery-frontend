import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  title: string;
  items: { label: string; link: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
  return (
    <div className="relative group">
      <span className="cursor-pointer text-gray-800 hover:text-gray-600">
        {title}
      </span>

      <ul className="absolute group-hover:block hidden bg-white border border-gray-300 rounded-md shadow-lg list-none pl-5 pr-20 py-5 mt-1 z-10">
        {items.map((item, index) => (
          <li key={index} className="mb-1 last:mb-0">
            <Link
              href={item.link}
              className="block px-1 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-600 text-base w-32 rounded">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
