import { GetServerSideProps, GetServerSidePropsContext } from "next";
import BannerDetail from "../../components/pages/BannerDetail";

type Banner = {
  id: number;
  image_url: string;
  title: string;
  company_name: string;
  tags: {
    category?: { name: string; id: number; tag_type: string }[];
    taste?: { name: string; id: number; tag_type: string }[];
    shape?: { name: string; id: number; tag_type: string }[];
    media?: { name: string; id: number; tag_type: string }[];
  };
};

interface BannerDetailPageProps {
  banner: Banner | null;
}

export default function BannerDetailPage({ banner }: BannerDetailPageProps) {
  if (!banner) {
    return <p>Not Found</p>;
  }

  return (
    <div className="flex-grow flex items-center justify-center">
      <BannerDetail banner={banner} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  BannerDetailPageProps
> = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  if (!id) {
    return { props: { banner: null } };
  }

  try {
    const res = await fetch(
      `https://banner-gallery-backend.onrender.com/api/banners/${id}`
    );
    if (!res.ok) {
      return { props: { banner: null } };
    }
    const data = await res.json();
    return { props: { banner: data } };
  } catch {
    return { props: { banner: null } };
  }
};
