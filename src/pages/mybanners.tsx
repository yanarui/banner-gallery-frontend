import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";
import AspectRatioImageCard from "../../components/ui/AspectRatioImageCard";

type Banner = {
  id: string;
  image_url: string;
  company_name: string;
};

export default function MyBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

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
    router.push(`/updatebanner?id=${id}`);
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
      setBanners(banners.filter((banner) => banner.id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("バナーの削除に失敗しました");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold my-6 text-center capitalize text-gray-800">
          My Banners
        </h1>
        {loading ? (
          <p className="text-center text-gray-800">読み込み中...</p>
        ) : banners.length > 0 ? (
          <div className="w-max mx-auto bg-white mt-6">
            <div className="grid grid-cols-2 gap-[20px] breakpoint-1190 breakpoint-1590">
              {banners.map((banner) => (
                <div className="mt-2 w-95" key={banner.id}>
                  <div className="bg-gray-200 overflow-hidden p-10">
                    <div className="flex justify-center items-center w-[300px] h-[300px] mx-auto my-auto">
                      <AspectRatioImageCard
                        src={banner.image_url}
                        alt={banner.company_name}
                      />
                      <div className="mt-2 mb-10"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleUpdate(banner.id)}
                      className="px-4 py-2 mt-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      更新
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
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
