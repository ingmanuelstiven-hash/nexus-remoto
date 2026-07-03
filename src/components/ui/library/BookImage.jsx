"use client";

import Image from "next/image";
import { getImageSrc } from "@/lib/getImageSrc";

function BookImage({
  src,
  alt,
  priority = false,
  size = "card", // card | detail | thumb
  className = "",
}) {
  // 🎯 tamaños centralizados
  const sizeMap = {
    card: {
      wrapper: "relative w-full aspect-[2/3]",
      sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px",
    },
    detail: {
      wrapper: "relative w-[170px] md:w-[190px] aspect-[2/3]",
      sizes: "190px",
    },
    thumb: {
      wrapper: "relative w-8 aspect-[2/3]",
      sizes: "80px",
    },
  };

  const config = sizeMap[size] || sizeMap.card;

  return (
    <div className={`${config.wrapper} overflow-hidden rounded-md ${className}`}>
      <Image
        src={getImageSrc(src)}
        alt={alt}
        fill
        sizes={config.sizes}
        priority={priority}
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}

export default BookImage;