import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Gallery from "../../components/pages/Gallery";

type Tag = {
  name: string;
  tag_type: string;
};

type Banner = {
  id: number;
  image_url: string;
  detail_url?: string;
  company_name?: string;
  tags: Tag[];
};

interface TagPageProps {
  banners: Banner[];
  tag: string;
}

export default function TagPage({ banners, tag }: TagPageProps) {
  return (
    <>
      <h1 className="text-2xl font-bold my-6 text-center capitalize text-gray-800">
        {tag}
      </h1>
      <Gallery banners={banners} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<TagPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { tag } = context.params as { tag: string };

  if (!tag) {
    return { props: { banners: [], tag: "" } };
  }

  try {
    const encodedTag = encodeURIComponent(tag);
    const res = await fetch(
      `https://banner-gallery-backend.onrender.com/api/banners?tag=${encodedTag}`
    );
    if (!res.ok) {
      return { props: { banners: [], tag } };
    }
    const data: Banner[] = await res.json();
    return { props: { banners: data || [], tag } };
  } catch (error) {
    return { props: { banners: [], tag } };
  }
};
