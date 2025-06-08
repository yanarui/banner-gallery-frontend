import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

function AspectRatioImageCard({ src, alt }: { src: string; alt: string }) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      const max = 300;
      if (ratio >= 1) {
        // 横長
        setDimensions({ width: max, height: Math.round(max / ratio) });
      } else {
        // 縦長
        setDimensions({ width: Math.round(max * ratio), height: max });
      }
    };
    img.src = src;
  }, [src]);

  if (!dimensions) {
    return <div style={{ width: 300, height: 300, background: "#eee" }} />;
  }

  return (
    <ImageCard
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      maxWidth="300px"
      maxHeight="300px"
    />
  );
}

export default AspectRatioImageCard;
