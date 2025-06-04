import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropdownMenu from "../../ui/DropdownMenu";
import Link from "next/link";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    router.push("/");
  };

  const categoryItems = [
    { label: "ファッション", link: "/category/ファッション" },
    { label: "テクノロジー", link: "/category/テクノロジー" },
    { label: "スポーツ", link: "/category/スポーツ" },
    { label: "飲食・グルメ", link: "/category/飲食・グルメ" },
    { label: "美容・コスメ", link: "/category/美容・コスメ" },
    { label: "旅行・観光", link: "/category/旅行・観光" },
    { label: "教育・学習", link: "/category/教育・学習" },
    { label: "エンタメ", link: "/category/エンタメ" },
    { label: "ライフスタイル", link: "/category/ライフスタイル" },
    { label: "金融・保険", link: "/category/金融・保険" },
  ];
  const tasteItems = [
    { label: "かわいい", link: "/taste/かわいい" },
    { label: "かっこいい", link: "/taste/かっこいい" },
    { label: "高級感", link: "/taste/高級感" },
    { label: "ポップ", link: "/taste/ポップ" },
    { label: "ミニマル", link: "/taste/ミニマル" },
    { label: "レトロ", link: "/taste/レトロ" },
    { label: "ナチュラル", link: "/taste/ナチュラル" },
    { label: "エレガント", link: "/taste/エレガント" },
    { label: "シンプル", link: "/taste/シンプル" },
    { label: "シズル感", link: "/taste/シズル感" },
  ];
  const shapeItems = [
    { label: "正方形", link: "/shape/正方形" },
    { label: "縦長", link: "/shape/縦長" },
    { label: "横長", link: "/shape/横長" },
  ];
  const mediaItems = [
    { label: "Instagram", link: "/media/Instagram" },
    { label: "X", link: "/media/X" },
    { label: "LINE", link: "/media/LINE" },
  ];

  return (
    <header className="bg-white text-gray-800">
      <div className="relative flex items-center justify-between px-16 py-8 border-b border-gray-800">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          <Link href="/">Banner Gallery</Link>
        </h1>
        {isLoggedIn ? (
          <ul className="flex items-center justify-between ml-auto">
            <li className="cursor-pointer border px-10 py-3 mr-10">
              <p>{username}</p>
            </li>
            <li
              className="cursor-pointer border px-10 py-3"
              onClick={handleLogout}>
              <p>LOGOUT</p>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-between ml-auto">
            <li className="cursor-pointer border px-10 py-3 mr-10">
              <Link href="/login">LOGIN</Link>
            </li>
            <li className="cursor-pointer border px-10 py-3">
              <Link href="/signup">SIGN UP</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="py-12 text-2xl font-bold border-b border-gray-800">
        <nav>
          <ul className="flex justify-center items-center gap-6 list-none m-0 p-0">
            <li>
              <Link href="/" className="text-gray-800 hover:text-gray-600">
                HOME
              </Link>
            </li>
            <DropdownMenu title="CATEGORY" items={categoryItems} />
            <DropdownMenu title="TASTE" items={tasteItems} />
            <DropdownMenu title="SHAPE" items={shapeItems} />
            <DropdownMenu title="MEDIA" items={mediaItems} />
            {isLoggedIn && (
              <>
                <li>
                  <Link
                    href="/post"
                    className="text-gray-800 hover:text-gray-600">
                    POST
                  </Link>
                </li>
                <li>
                  <a
                    href="/mybanners"
                    className="text-gray-800 hover:text-gray-600">
                    MY_BANNERS
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
