import { useState } from "react";
import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  title: string;
  items: { label: string; link: string }[];
  isMobile?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  items,
  isMobile = false,
}) => {
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          className="w-full flex items-center text-left py-2 pr-4 font-bold"
          onClick={() => setOpen((prev) => !prev)}>
          <span>{title}</span>
          <span
            className={`ml-2 transition-transform duration-200 ${
              open ? "rotate-90" : "rotate-0"
            }`}>
            <svg
              className="w-4 h-4 inline-block"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
        {open && (
          <ul className="pl-6">
            {items.map((item) => (
              <li key={item.link} className="py-1">
                <Link href={item.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="relative group">
      <span className="cursor-pointer text-gray-800 hover:text-gray-600 transition-opacity duration-200 hover:opacity-70 flex items-center">
        {title}
      </span>
      <ul className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 bg-white border border-gray-300 rounded-md shadow-lg list-none pl-5 pr-20 py-5 mt-1 z-10">
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
