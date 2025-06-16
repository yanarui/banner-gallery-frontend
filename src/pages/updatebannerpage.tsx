import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UpdateBanner from "../../components/pages/UpdateBanner";

type Banner = {
  id: number;
  image_url: string;
  title: string;
  company_name: string;
  tags: {
    category?: { name: string; id: number; tag_type: string }[];
    taste?: { name: string; id: number; tag_type: string }[];
    shape?: { name: string; id: number; tag_type: string }[];
    media?: { name: string; id: number; tag_type: string }[];
  };
};

export default function UpdateBannerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [banner, setBanner] = useState<Banner | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://banner-gallery-backend.onrender.com/api/banners/${id}`)
        .then((res) => res.json())
        .then((data) => setBanner(data))
        .catch((error) => console.error("Error fetching banner:", error));
    }
  }, [id]);

  if (!banner) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex-grow flex items-center justify-center">
      <UpdateBanner banner={banner} />
    </div>
  );
}
