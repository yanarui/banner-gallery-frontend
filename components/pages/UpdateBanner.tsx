import React, { useState } from "react";
import BannerInfoForm from "../ui/BannerInfoForm";
import { AspectRatioImageCard } from "../ui/AspectRatioImageCard";

type FormDataType = {
  company_name: string;
  category?: string;
  taste?: string;
  shape?: string;
  media?: string;
};

type Tag = { name: string; id: number; tag_type: string };

type Banner = {
  id: number;
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

export default function UpdateBanner({ banner }: { banner: Banner }) {
  const handleFormSubmit = async (data: FormDataType) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログインしてください");
      return;
    }

    const formData = new FormData();
    formData.append("company_name", data.company_name);

    const tags: { name: string; tag_type: string }[] = [];
    if (data.category) {
      tags.push({ name: data.category, tag_type: "category" });
    }
    if (data.taste) {
      data.taste.split(",").forEach((tag: string) => {
        tags.push({ name: tag, tag_type: "taste" });
      });
    }
    if (data.shape) {
      tags.push({ name: data.shape, tag_type: "shape" });
    } else {
      tags.push({ name: "正方形", tag_type: "shape" });
    }
    if (data.media) {
      tags.push({ name: data.media, tag_type: "media" });
    } else {
      tags.push({ name: "Instagram", tag_type: "media" });
    }

    formData.append("tags", JSON.stringify(tags));

    try {
      const res = await fetch(
        `https://banner-gallery-backend.onrender.com/api/banners/${banner.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.status === 404) {
        alert("指定したバナーが存在しません（404）");
        const text = await res.text();
        console.error(text);
        return;
      }

      if (res.ok) {
        const responseData = await res.json();
        alert(`更新成功！`);
        window.location.href = responseData.detail_url;
      } else {
        const contentType = res.headers.get("content-type");
        let errorData;
        if (contentType && contentType.includes("application/json")) {
          errorData = await res.json();
          alert(
            `更新に失敗しました: ${
              errorData.error || JSON.stringify(errorData)
            }`
          );
        } else {
          const text = await res.text();
          alert("サーバーから予期しないレスポンスが返されました");
          console.error(text);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <BannerInfoForm
        onSubmit={handleFormSubmit}
        initialValues={{
          company_name: banner.company_name,
          category: banner.tags.category?.[0]?.name ?? "",
          taste: banner.tags.taste?.map((t) => t.name).join(",") ?? "",
          shape: banner.tags.shape?.[0]?.name ?? "",
          media: banner.tags.media?.[0]?.name ?? "",
        }}
      />
      <div className="pr-0 pb-7 pl-20">
        <div className="bg-gray-200 overflow-hidden p-10 mt-20 mb-20">
          <div className="flex justify-center items-center mx-auto my-auto">
            <AspectRatioImageCard
              src={banner.image_url}
              alt={banner.company_name || `Banner ${banner.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
