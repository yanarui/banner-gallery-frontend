import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gallery from "../../../components/pages/Gallery";

type Tag = {
  name: string;
  tag_type: string;
};

type Banner = {
  id: number;
  image_url: string;
  detail_url?: string;
  company_name?: string;
  tags: Tag[];
};

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    if (!tag) return;
    const fetchBanners = async () => {
      try {
        const encodedTag = encodeURIComponent(tag as string);
        const res = await fetch(
          `https://banner-gallery-backend.onrender.com/api/banners?tag=${encodedTag}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBanners(data || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setBanners([]);
      }
    };
    fetchBanners();
  }, [tag]);

  return (
    <>
      <h1 className="text-2xl font-bold my-6 text-center capitalize text-gray-800">
        {tag}
      </h1>
      <Gallery banners={banners} />
    </>
  );
}
