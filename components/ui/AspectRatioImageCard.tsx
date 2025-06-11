import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

type AspectRatioImageCardProps = {
  src: string;
  alt: string;
  max?: number;
  boxShadow?: string;
};

function AspectRatioImageCard({
  src,
  alt,
  max = 300,
  boxShadow,
}: AspectRatioImageCardProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      if (ratio >= 1) {
        setDimensions({ width: max, height: Math.round(max / ratio) });
      } else {
        setDimensions({ width: Math.round(max * ratio), height: max });
      }
    };
    img.src = src;
  }, [src, max]);

  if (!dimensions) {
    return <div style={{ width: max, height: max, background: "#eee" }} />;
  }

  return (
    <ImageCard
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      maxWidth={`${max}px`}
      maxHeight={`${max}px`}
      boxShadow={boxShadow}
    />
  );
}

export default AspectRatioImageCard;
