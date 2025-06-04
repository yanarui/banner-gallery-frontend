import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

export function AspectRatioImageCard({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isLandscape, setIsLandscape] = useState<boolean | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setIsLandscape(img.width >= img.height);
    };
    img.src = src;
  }, [src]);

  if (isLandscape === null) {
    // ローディング中
    return <div style={{ width: 300, height: 300, background: "#eee" }} />;
  }

  return (
    <ImageCard
      src={src}
      alt={alt}
      width={isLandscape ? "300px" : "auto"}
      height={isLandscape ? "auto" : "300px"}
      maxWidth="300px"
      maxHeight="300px"
    />
  );
}
