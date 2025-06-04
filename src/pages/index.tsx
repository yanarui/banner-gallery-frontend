import Header from "../../components/base/Header/Header";
import Footer from "../../components/base/Footer/Footer";
import Gallery from "../../components/pages/Gallery";

export default function Home() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />
      <Gallery />
      <Footer />
    </div>
  );
}
