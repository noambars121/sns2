import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  priority?: boolean;
}

export function Image({
  src = "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2070",
  alt = "Image",
  priority = false,
  className,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-900",
          className,
        )}
        {...props}
      >
        <span className="text-sm text-gray-400">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "transition-opacity duration-300",
        !loaded && !priority && "opacity-0",
        loaded && "opacity-100",
        className,
      )}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
