import css from "./ImageHolder.module.css";
import SpinnerGrow from "./SpinnerGrow";
import { useState } from "react";
import Image from "next/image";

interface ImageHolderProps {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export default function ImageHolder({
  src,
  width,
  height,
  alt,
}: ImageHolderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div
      className={css.wrapper}
      style={{ width: width + "px", height: height + "px" }}
    >
      {isLoading && <SpinnerGrow className="mx-auto self-center" />}
      <Image
        priority
        src={src}
        width={width}
        height={height}
        loading="eager"
        alt={alt || "Generated image"}
        sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
