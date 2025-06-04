import React from "react";

interface BannerCardProps {
  banner: {
    id: number;
    image_url: string;
    company_name: string;
    tags: { name: string }[];
  };
}

const BannerCard = ({ banner }: { banner: any }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={banner.image_url}
        alt={banner.company_name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{banner.company_name}</h2>
        <div className="flex flex-wrap gap-2">
          {banner.tags.map((tag: any, index: number) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
