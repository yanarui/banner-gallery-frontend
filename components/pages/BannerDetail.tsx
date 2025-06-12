import { useState, useEffect } from "react";
import AspectRatioImageCard from "../ui/AspectRatioImageCard";
import BannerInfo from "../ui/BannerInfo";

type Tag = { name: string; id: number; tag_type: string };
type Banner = {
  image_url: string;
  title: string;
  company_name: string;
  tags: {
    category?: Tag[];
    taste?: Tag[];
    shape?: Tag[];
    media?: Tag[];
  };
};

export default function BannerDetail({ banner }: { banner: Banner }) {
  const [imageMax, setImageMax] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      setImageMax(window.innerWidth < 640 ? 300 : 400);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center">
      <div className="w-full flex justify-center sm:order-2">
        <div className="sm:pr-0 sm:pb-7 sm:pl-20">
          <div className="bg-gray-200 overflow-hidden mt-6 p-6 sm:p-10">
            <div className="flex justify-center items-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <AspectRatioImageCard
                src={banner.image_url}
                alt={banner.title}
                max={imageMax}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center sm:block">
        <BannerInfo banner={banner} />
      </div>
    </div>
  );
}
