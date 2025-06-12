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
            <td className="align-top py-5 pr-5 pl-6 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              COMPANY
            </td>
            <td className="sm:py-3 text-gray-800">{banner.company_name}</td>
          </tr>
          <tr>
            <td className="align-top py-5 pr-5 pl-6 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              CATEGORY
            </td>
            <td className="sm:py-3 text-gray-800">
              <div className="flex flex-wrap items-start">
                {banner.tags.category?.map(
                  (tag: { name: string; id: number; tag_type: string }) => (
                    <Link
                      href={`/${encodeURIComponent(
                        tag.tag_type
                      )}/${encodeURIComponent(tag.name)}`}
                      key={tag.id}
                      className="whitespace-nowrap pt-2 pb-2 px-2 mr-2 text-xs sm:py-2 sm:px-4 sm:mt-0.5 sm:mb-1 sm:text-sm border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900">
                      {tag.name}
                    </Link>
                  )
                )}
              </div>
            </td>
          </tr>
          <tr className="mb-5">
            <td className="align-top py-5 pr-5 pl-6 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              TASTE
            </td>
            <td className="sm:py-3 text-gray-800">
              <div className="flex flex-wrap items-start">
                {banner.tags.taste?.map(
                  (tag: { name: string; id: number; tag_type: string }) => (
                    <Link
                      href={`/${encodeURIComponent(
                        tag.tag_type
                      )}/${encodeURIComponent(tag.name)}`}
                      key={tag.id}
                      className="whitespace-nowrap pt-2 pb-2 px-2 my-1 mr-2 text-xs sm:py-2 sm:px-4 sm:mt-0.5 sm:mb-1 sm:text-sm border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900">
                      {tag.name}
                    </Link>
                  )
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td className="align-top py-5 pr-5 pl-6 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              SHAPE
            </td>
            <td className="sm:py-3 text-gray-800">
              <div className="flex flex-wrap items-start">
                {banner.tags.shape?.map(
                  (tag: { name: string; id: number; tag_type: string }) => (
                    <Link
                      href={`/${encodeURIComponent(
                        tag.tag_type
                      )}/${encodeURIComponent(tag.name)}`}
                      key={tag.id}
                      className="whitespace-nowrap pt-2 pb-2 px-2 mr-2 text-xs sm:py-2 sm:px-4 sm:mt-0.5 sm:mb-1 sm:text-sm border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900">
                      {tag.name}
                    </Link>
                  )
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td className="align-top py-5 pl-6 sm:pr-7 sm:pl-3 sm:text-lg text-gray-800 font-bold text-left">
              MEDIA
            </td>
            <td className="sm:py-3 text-gray-800">
              <div className="flex flex-wrap items-start">
                {banner.tags.media?.map(
                  (tag: { name: string; id: number; tag_type: string }) => (
                    <Link
                      href={`/${encodeURIComponent(
                        tag.tag_type
                      )}/${encodeURIComponent(tag.name)}`}
                      key={tag.id}
                      className="whitespace-nowrap pt-2 pb-2 px-2 mr-2 text-xs sm:py-2 sm:px-4 sm:mt-0.5 sm:mb-1 sm:text-sm border-1 border-gray-800 rounded transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900">
                      {tag.name}
                    </Link>
                  )
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BannerInfo;
