import React, { useEffect, useState } from "react";
import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";
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
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <Gallery banners={banners} />
      <Footer />
    </div>
  );
}
