import React from "react";
import Link from "next/link";

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
  return (
    <div className="pr-6 sm:pr-15 sm:pb-7 sm:border-r-1 sm:border-gray-800">
      <table>
        <tbody>
          <tr>
            <td className="pt-5 sm:pb-5 pr-5 sm:pr-7 pl-6 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              COMPANY
            </td>
            <td className="pt-5 sm:py-3 text-gray-800">
              {banner.company_name}
            </td>
          </tr>
          <tr>
            <td className="pt-5 sm:pb-5 pr-5 sm:pr-7 pl-6 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              CATEGORY
            </td>
            <td className="pt-5 sm:py-3 text-gray-800">
              {banner.tags.category?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <Link
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-2 pb-2 my-1 mr-2 text-sm sm:text-lg sm:pt-2 sm:px-4 sm:pb-1 sm:my-1 sm:mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </Link>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="pt-5 sm:pb-5 pr-5 sm:pr-7 pl-6 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              TASTE
            </td>
            <td className="pt-10 py-3 text-gray-800">
              {banner.tags.taste?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <Link
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-2 pb-2 m mr-2 text-sm sm:text-lg sm:pt-2 sm:px-4 sm:pb-1 sm:my-1 sm:mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </Link>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="sm:py-5 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-center sm:text-left">
              SHAPE
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.shape?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <Link
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </Link>
                )
              )}
            </td>
          </tr>
          <tr>
            <td className="sm:py-5 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-center sm:text-left">
              MEDIA
            </td>
            <td className="py-3 text-gray-800">
              {banner.tags.media?.map(
                (tag: { name: string; id: number; tag_type: string }) => (
                  <Link
                    href={`/${encodeURIComponent(
                      tag.tag_type
                    )}/${encodeURIComponent(tag.name)}`}
                    key={tag.id}
                    className={`pt-2 px-4 pb-1 my-1 mr-2 border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900`}>
                    {tag.name}
                  </Link>
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
