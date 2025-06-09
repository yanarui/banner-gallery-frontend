import React, { useState } from "react";
import BannerInfoForm from "../ui/BannerInfoForm";
import ImageUploader from "../ui/ImageUploader";

type FormDataType = {
  company_name: string;
  category?: string;
  taste?: string;
  shape?: string;
  media?: string;
};

export default function Post() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  const handleFormSubmit = async (data: FormDataType) => {
    if (!image) {
      alert("画像をアップロードしてください");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログインしてください");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("company_name", data.company_name);

    const tags: { name: string; tag_type: string }[] = [];

    if (data.category) {
      tags.push({ name: data.category, tag_type: "category" });
    } else {
      tags.push({ name: "ファッション", tag_type: "category" });
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
        "https://banner-gallery-backend.onrender.com/api/banners",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        alert(`アップロード成功！`);
        window.location.href = responseData.detail_url;
      } else {
        const errorData = await res.json();
        alert(`アップロードに失敗しました: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center">
      <BannerInfoForm
        onSubmit={handleFormSubmit}
        initialValues={{
          company_name: "",
          category: "",
          taste: "",
          shape: "",
          media: "",
        }}
      />
      <ImageUploader onImageSelect={handleImageSelect} />
    </div>
  );
}
