import { useState, useEffect, useRef } from "react";
import AspectRatioImageCard from "../../components/ui/AspectRatioImageCard";
import Link from "next/link";

interface Tag {
  name: string;
  tag_type: string;
}

interface Banner {
  id: number;
  image_url: string;
  detail_url?: string;
  tags: Tag[];
  company_name?: string;
}

type GalleryProps = {
  banners: Banner[];
};

export default function Gallery({ banners = [] }: GalleryProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [imageMax, setImageMax] = useState(160);
  const [boxShadow, setBoxShadow] = useState(
    "5px 8px 7px -4px rgba(0, 0, 128, 0.2)"
  );

  useEffect(() => {
    const handleResize = () => {
      setBoxShadow(
        window.innerWidth < 640
          ? "5px 8px 7px -4px rgba(0, 0, 128, 0.2)"
          : "10px 16px 14px -7px rgba(0, 0, 128, 0.2)"
      );
      setImageMax(window.innerWidth < 640 ? 160 : 300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, banners.length));
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [banners]);

  return (
    <div className="w-full sm:w-max sm:mx-auto bg-white mt-6 mr-3 px-3">
      <div className="grid grid-cols-2 gap-[10px] sm:gap-[20px] breakpoint-1190 breakpoint-1590">
        {Array.isArray(banners) &&
          banners.slice(0, visibleCount).map((banner) => (
            <div className="w-full mt-2 sm:w-95" key={banner.id}>
              <div className="bg-gray-200 overflow-hidden p-2 sm:p-10">
                <div className="flex justify-center items-center w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] mx-auto my-auto relative group rounded">
                  <Link
                    href={
                      banner.detail_url || `/bannerdetailpage?id=${banner.id}`
                    }
                    scroll={false}>
                    <AspectRatioImageCard
                      src={banner.image_url}
                      alt={banner.company_name || `Banner ${banner.id}`}
                      max={imageMax}
                      boxShadow={boxShadow}
                    />
                  </Link>
                </div>
              </div>
              <div className="mt-2 mb-10">
                {banner.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    scroll={false}
                    className="inline-block px-2 py-1 mr-2 mb-2 text-xs sm:text-base font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200">
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
}
