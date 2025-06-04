import React, { useState } from "react";
import ImageCard from "./ImageCard";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  return (
    <div className="pr-0 pb-7 pl-20">
      <label
        htmlFor="image-upload"
        className={`mb-4 w-[600px] h-[600px] p-10 flex items-center justify-center cursor-pointer ${
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
          <ImageCard
            src={preview}
            alt="Preview Image"
            width="600px"
            height="600px"
          />
        ) : (
          <p className="text-gray-500">
            クリックまたはドラッグ＆ドロップで画像を選択
          </p>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
