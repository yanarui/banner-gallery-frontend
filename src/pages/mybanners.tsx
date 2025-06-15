import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";
import AspectRatioImageCard from "../../components/ui/AspectRatioImageCard";
import Link from "next/link";

interface Banner {
  id: number;
  image_url: string;
  detail_url?: string;
  company_name?: string;
}

export default function MyBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [imageMax, setImageMax] = useState(160);
  const [boxShadow, setBoxShadow] = useState(
    "5px 8px 7px -4px rgba(0, 0, 128, 0.2)"
  );
  const router = useRouter();

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
    const fetchMyBanners = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        alert("ログインしてください");
        return;
      }
      setToken(storedToken);

      try {
        const res = await fetch(
          "https://banner-gallery-backend.onrender.com/api/banners/my_banners",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBanners(data || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBanners();
  }, []);

  const handleUpdate = (id: string) => {
    router.push(`/updatebannerpage?id=${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("ログインしてください。");
      return;
    }

    if (!confirm("本当に削除しますか？")) return;

    try {
      console.log("banner.id", id);
      const res = await fetch(
        `https://banner-gallery-backend.onrender.com/api/banners/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          `HTTP error! status: ${res.status}, message: ${errorData.error}`
        );
      }
      alert("バナーを削除しました");
      setBanners(banners.filter((banner) => banner.id !== Number(id)));
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("バナーの削除に失敗しました");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <h1 className="text-2xl font-bold my-6 text-center capitalize text-gray-800">
          My Banners
        </h1>
        {loading ? (
          <p className="text-center text-gray-800">読み込み中...</p>
        ) : banners.length > 0 ? (
          <div className="w-full sm:w-max sm:mx-auto bg-white my-6 mr-3 px-3">
            <div className="grid grid-cols-2 gap-[10px] sm:gap-[20px] breakpoint-1190 breakpoint-1590">
              {banners.map((banner) => (
                <div className="w-full mt-2 sm:w-95" key={banner.id}>
                  <div className="bg-gray-200 overflow-hidden p-3 sm:p-10">
                    <div className="flex justify-center items-center w-[160px] h-[160px] sm:w-[300px] sm:h-[300px] mx-auto my-auto relative group rounded">
                      <Link
                        href={
                          banner.detail_url ||
                          `/bannerdetailpage?id=${banner.id}`
                        }>
                        <AspectRatioImageCard
                          src={banner.image_url}
                          alt={banner.company_name || `Banner ${banner.id}`}
                          max={imageMax}
                          boxShadow={boxShadow}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleUpdate(String(banner.id))}
                      className="px-2 py-1 mt-2 sm:px-4 sm:py-2 sm:mt-2 sm:mr-2 text-xs  bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      更新
                    </button>
                    <button
                      onClick={() => handleDelete(String(banner.id))}
                      className="px-2 py-1 mt-2 sm:px-4 sm:py-2 sm:mt-2 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition">
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-800">投稿がありません。</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
