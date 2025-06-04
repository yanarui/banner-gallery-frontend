import ImageCard from "../ui/ImageCard";
import BannerInfo from "../ui/BannerInfo";

type Tag = { name: string; id: number; tag_type: string };
type Banner = {
  image_url: string;
  title: string;
  company_name: string;
  tags: {
    category?: Tag[];
    taste?: Tag[];
    shape?: Tag[];
    media?: Tag[];
  };
};

export default function BannerDetail({ banner }: { banner: Banner }) {
  return (
    <div className="flex justify-center items-center mt-6">
      <BannerInfo banner={banner} />
      <div className="pr-0 pb-7 pl-20">
        <div className="bg-gray-200 overflow-hidden p-10 mt-20 mb-20">
          <div className="flex justify-center items-center mx-auto my-auto">
            <ImageCard
              src={banner.image_url}
              alt={banner.title}
              width="400px"
              height="auto"
              maxWidth="600px"
              maxHeight="600px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
