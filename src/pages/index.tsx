import Gallery from "../../components/pages/Gallery";

interface HomeProps {
  banners: any[];
}

export default function Home({ banners }: HomeProps) {
  return <Gallery banners={banners} />;
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://banner-gallery-backend.onrender.com/api/banners"
  );
  const data = await res.json();
  return {
    props: {
      banners: data || [],
    },
  };
}
