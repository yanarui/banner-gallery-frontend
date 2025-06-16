import React, { useEffect, useState } from "react";
import Gallery from "../../components/pages/Gallery";

export default function Home() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch(
        "https://banner-gallery-backend.onrender.com/api/banners"
      );
      const data = await res.json();
      setBanners(data || []);
    };
    fetchBanners();
  }, []);

  return (
    <>
      <Gallery banners={banners} />
    </>
  );
}
