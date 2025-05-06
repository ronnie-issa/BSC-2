import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  imgClassName?: string;
  wrapperClassName?: string;
  threshold?: number;
  rootMargin?: string;
  aspectRatio?: string; // Optional aspect ratio (e.g., "3/4", "1/1", "16/9")
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  placeholderSrc = "/images/placeholder.svg",
  className,
  imgClassName,
  wrapperClassName,
  threshold = 0.1,
  rootMargin = "0px",
  aspectRatio = "3/4", // Default aspect ratio for product images
  onLoad,
  onError,
  ...props
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (onError) onError();
  };

  // Calculate aspect ratio style
  const aspectRatioStyle = {
    aspectRatio,
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full", wrapperClassName)}
      style={aspectRatioStyle}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-omnis-darkgray animate-pulse flex items-center justify-center"
          style={aspectRatioStyle}
        >
          <span className="text-omnis-lightgray text-sm">OMNIS</span>
        </div>
      )}

      {/* Only load the actual image when in view */}
      {isInView && (
        <img
          ref={imgRef}
          src={src.startsWith("//") ? `https:${src}` : src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            imgClassName,
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      )}
    </div>
  );
};

export { LazyImage };
