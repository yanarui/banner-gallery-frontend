import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DropdownMenu from "../../ui/DropdownMenu";
import Link from "next/link";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateAuth = () => {
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      setIsLoggedIn(!!token && !!storedUsername);
      setUsername(storedUsername);
    };

    updateAuth();
    router.events.on("routeChangeComplete", updateAuth);
    return () => {
      router.events.off("routeChangeComplete", updateAuth);
    };
  }, [router.events]);

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
    <header className="w-full bg-white text-gray-800">
      <div className="flex relative items-center justify-between border-b border-gray-800 px-4 py-4 sm:px-16 sm:py-8">
        <h1 className="text-2xl font-bold mx-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:transform">
          <Link href="/" scroll={false}>
            Banner Gallery
          </Link>
        </h1>
        <button
          className="fixed top-3 right-4 z-50 sm:hidden bg-gray-100 rounded-sm p-3 shadow"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="メニューを開く">
          <span
            className={`block h-1 w-7 rounded bg-gray-800 mb-1 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}></span>
          <span
            className={`block h-1 w-7 rounded bg-gray-800 mb-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}></span>
          <span
            className={`block h-1 w-7 rounded bg-gray-800 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}></span>
        </button>
        <ul className="ml-auto hidden items-center justify-between sm:flex">
          {isLoggedIn ? (
            <>
              <li className="mr-4 cursor-pointer border px-6 py-2">
                <Link href="/mybanners" scroll={false}>
                  {username}
                </Link>
              </li>
              <li
                className="cursor-pointer border px-6 py-2"
                onClick={handleLogout}>
                <p>LOGOUT</p>
              </li>
            </>
          ) : (
            <>
              <li className="mr-4 cursor-pointer border px-6 py-2">
                <Link href="/login" scroll={false}>
                  LOGIN
                </Link>
              </li>
              <li className="cursor-pointer border px-6 py-2">
                <Link href="/signup" scroll={false}>
                  SIGN UP
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="border-b border-gray-800">
        <nav className="hidden py-8 font-bold text-2xl sm:block">
          <ul className="m-0 flex list-none items-center justify-center gap-6 p-0">
            <li>
              <Link
                href="/"
                scroll={false}
                className="text-gray-800 transition-opacity duration-200 hover:text-gray-600 hover:opacity-70">
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
                    scroll={false}
                    className="text-gray-800 transition-opacity duration-200 hover:text-gray-600 hover:opacity-70">
                    POST
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mybanners"
                    scroll={false}
                    className="text-gray-800 transition-opacity duration-200 hover:text-gray-600 hover:opacity-70">
                    MY_BANNERS
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav
          className={`fixed top-0 left-0 z-10 h-full w-full bg-white transition-transform duration-300 sm:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="flex flex-col items-start gap-6 pt-24 text-lg font-bold px-6">
            <Link
              href="/"
              scroll={false}
              onClick={() => setMenuOpen(false)}
              className="mb-2">
              HOME
            </Link>
            <DropdownMenu title="CATEGORY" items={categoryItems} isMobile />
            <DropdownMenu title="TASTE" items={tasteItems} isMobile />
            <DropdownMenu title="SHAPE" items={shapeItems} isMobile />
            <DropdownMenu title="MEDIA" items={mediaItems} isMobile />
            {isLoggedIn ? (
              <>
                <Link
                  href="/post"
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="mb-2">
                  POST
                </Link>
                <Link
                  href="/mybanners"
                  scroll={false}
                  onClick={() => setMenuOpen(false)}
                  className="mb-2">
                  MY_BANNERS
                </Link>
                <div className="flex justify-center w-full mt-4 gap-2">
                  <button
                    className="mx-4 mt-4 border px-6 py-2"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}>
                    LOGOUT
                  </button>
                  <p className="mx-4 mt-4 border px-6 py-2">
                    <Link href="/mybanners" scroll={false}>
                      {username}
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="flex justify-center w-full mt-4 gap-2">
                <Link
                  href="/login"
                  scroll={false}
                  className="mx-4 mt-4 border px-6 py-2"
                  onClick={() => setMenuOpen(false)}>
                  LOGIN
                </Link>
                <Link
                  href="/signup"
                  scroll={false}
                  className="mx-4 mt-4 border px-6 py-2"
                  onClick={() => setMenuOpen(false)}>
                  SIGN UP
                </Link>
              </div>
            )}
          </div>
        </nav>

        {menuOpen && (
          <div
            className="fixed inset-0 z-0 bg-black opacity-30 sm:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
