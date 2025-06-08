import React from "react";
import Image from "next/image";

type ImageCardProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  maxWidth?: string;
  maxHeight?: string;
  padding?: string;
  backgroundColor?: string;
  boxShadow?: string;
};

const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt = "Gallery Image",
  width,
  height,
  maxWidth = "100%",
  maxHeight = "100%",
  padding = "0",
  backgroundColor = "#f1f3f9",
  boxShadow = "10px 16px 14px -7px rgba(0, 0, 128, 0.2)",
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        maxWidth,
        maxHeight,
        padding,
        backgroundColor,
        objectFit: "contain",
        boxShadow,
      }}
    />
  );
};

export default ImageCard;
