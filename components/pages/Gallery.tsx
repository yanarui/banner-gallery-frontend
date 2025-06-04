import { useState, useEffect, useRef } from "react";
import { AspectRatioImageCard } from "../../components/ui/AspectRatioImageCard";

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

export default function Gallery() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://banner-gallery-backend.onrender.com/api/banners"
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setBanners(data);
        } else {
          console.error("Invalid data format:", data);
          setBanners([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setBanners([]);
      }
    };

    fetchImages();
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
    <div className="w-max mx-auto bg-white mt-6">
      <div className="grid grid-cols-2 gap-[20px] breakpoint-1190 breakpoint-1590">
        {Array.isArray(banners) &&
          banners.slice(0, visibleCount).map((banner, i) => (
            <div className="mt-2 w-95" key={i}>
              <div className="bg-gray-200 overflow-hidden p-10">
                <div className="flex justify-center items-center w-[300px] h-[300px] mx-auto my-auto">
                  <a
                    href={
                      banner.detail_url || `/bannerdetailpage?id=${banner.id}`
                    }>
                    <AspectRatioImageCard
                      src={banner.image_url}
                      alt={banner.company_name}
                    />
                  </a>
                </div>
              </div>
              <div className="mt-2 mb-10">
                {banner.tags.map((tag, i) => (
                  <a
                    key={i}
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded hover:bg-gray-300 hover:text-gray-900 transition-colors duration-200">
                    {tag.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
      </div>
      {visibleCount < banners.length && (
        <div ref={loaderRef} className="h-10"></div>
      )}
    </div>
  );
}
