import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Header from "../../../components/base/Header/Header";
import Footer from "../../../components/base/Footer/Footer";
import ImageCard from "../../../components/ui/ImageCard";

type Tag = {
  name: string;
  tag_type: string;
};

type Banner = {
  id: number;
  image_url: string;
  detail_url?: string;
  tags: Tag[];
};

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const [banners, setBanners] = useState<Banner[]>([]);
  const [visibleCount] = useState<number>(10);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tag) return;

    const fetchBanners = async () => {
      try {
        console.log("Fetching banners for tag:", tag);
        const encodedTag = encodeURIComponent(tag as string);
        const res = await fetch(
          `https://banner-gallery-backend.onrender.com/api/banners?tag=${encodedTag}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBanners(data || []);
        console.log("Fetched banners:", data);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([]);
      }
    };

    fetchBanners();
  }, [tag]);

  function translateTagName(name: string): string {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <h1 className="text-2xl font-bold my-6 text-center capitalize text-gray-800">
        {tag}
      </h1>
      <div className="w-max mx-auto bg-white">
        <div className="grid grid-cols-2 gap-[20px] breakpoint-1190 breakpoint-1590">
          {banners.slice(0, visibleCount).map((banner, i) => (
            <div className="mt-2 w-95" key={i}>
              <div className="bg-gray-200 overflow-hidden p-10">
                <div className="flex justify-center items-center w-[300px] h-[300px] mx-auto my-auto">
                  <a
                    href={
                      banner.detail_url || `/BannerDetailPage?id=${banner.id}`
                    }>
                    <ImageCard
                      src={banner.image_url}
                      alt={`Banner ${i + 1}`}
                      maxWidth="300px"
                      maxHeight="300px"
                    />
                  </a>
                </div>
              </div>
              <div className="mt-2 mb-10">
                {banner.tags.map((tag: Tag, i: number) => (
                  <a
                    key={i}
                    href={`${tag.tag_type}/${translateTagName(tag.name)}`}
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
      <Footer />
    </div>
  );
}
