import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";
import Post from "../../components/pages/Post";

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Post />
      </div>
      <Footer />
    </div>
  );
}
