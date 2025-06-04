import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://banner-gallery-backend.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "サインアップに失敗しました");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("通信エラー");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md w-[400px]">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
            SIGN UP
          </h1>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                ユーザー名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-gray-700 text-sm mb-4">
              ・ユーザー名は半角英数字で入力してください
              <br />
              ・パスワードは6文字以上設定してください
            </p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
              SIGN UP
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
