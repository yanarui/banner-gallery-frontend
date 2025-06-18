import { GetServerSideProps } from "next";
import Gallery from "../../components/pages/Gallery";

type Banner = {
  id: number;
  image_url: string;
  detail_url?: string;
  company_name?: string;
  tags: any[];
};

interface HomeProps {
  banners: Banner[];
}

export default function Home({ banners }: HomeProps) {
  return <Gallery banners={banners} />;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch(
      "https://banner-gallery-backend.onrender.com/api/banners"
    );
    const data: Banner[] = await res.json();
    return { props: { banners: data || [] } };
  } catch {
    return { props: { banners: [] } };
  }
};
