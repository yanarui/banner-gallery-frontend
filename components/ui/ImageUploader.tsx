import React, { useState, useEffect } from "react";
import AspectRatioImageCard from "./AspectRatioImageCard";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageMax, setImageMax] = useState(300);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onImageSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setImageMax(window.innerWidth < 640 ? 300 : 400);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="sm:pr-0 sm:pb-7 sm:pl-20">
      <div className="bg-gray-200 overflow-hidden mt-6 p-6 sm:p-10">
        <label
          htmlFor="image-upload"
          className={`flex justify-center items-center w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] ${
            isDragging ? "bg-blue-100 border-2 border-blue-500" : "bg-gray-200"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {preview ? (
            <AspectRatioImageCard
              src={preview}
              alt="アップロード画像プレビュー"
              max={imageMax}
            />
          ) : (
            <p className="text-gray-500">
              クリックまたはドラッグ＆ドロップで画像を選択
            </p>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
