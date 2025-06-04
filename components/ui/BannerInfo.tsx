import React from "react";

type Banner = {
  company_name: string;
  tags: {
    category?: { name: string; id: number; tag_type: string }[];
    taste?: { name: string; id: number; tag_type: string }[];
    shape?: { name: string; id: number; tag_type: string }[];
    media?: { name: string; id: number; tag_type: string }[];
  };
  image_url: string;
  title: string;
};

const BannerInfo = ({ banner }: { banner: Banner }) => {
  const tagTranslations: { [key: string]: string } = {
    ファッション: "fashion",
    テクノロジー: "technology",
    スポーツ: "sports",
    "飲食・グルメ": "food",
    "美容・コスメ": "beauty",
    "旅行・観光": "travel",
    "教育・学習": "education",
    エンタメ: "entertainment",
    ライフスタイル: "lifestyle",
    "金融・保険": "finance",
    かわいい: "cute",
    かっこいい: "cool",
    高級感: "luxurious",
    ポップ: "pop",
    ミニマル: "minimal",
    レトロ: "retro",
    ナチュラル: "natural",
    エレガント: "elegant",
    シンプル: "simple",
    シズル感: "sizzle",
    正方形: "square",
    縦長: "vertical",
    横長: "landscape",
    Instagram: "instagram",
    X: "x",
    LINE: "line",
  };

  const translateTagName = (name: string): string => {
    return tagTranslations[name] || name;
  };

  return (
    <div className="pr-15 pb-7 border-r-1 border-gray-800">
      <table>
        <tbody>
          <tr>
            <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
              COMPANY
            </td>
            <td className="py-3 text-gray-800">{banner.company_name}</td>
          </tr>
          <tr>
            <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
              CATEGORY
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.category?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <a
                    href={`${tag.tag_type}/${translateTagName(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </a>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
              TASTE
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.taste?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <a
                    href={`${tag.tag_type}/${translateTagName(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </a>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
              SHAPE
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.shape?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <a
                    href={`${tag.tag_type}/${translateTagName(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </a>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="py-5 pr-7 pl-3 text-lg text-gray-800 font-bold text-left">
              MEDIA
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.media?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <a
                    href={`${tag.tag_type}/${translateTagName(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </a>
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BannerInfo;
