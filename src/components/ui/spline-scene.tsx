import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import Spline from "@splinetool/react-spline";

// Add global CSS to hide Spline watermark and fix touch events
const globalStyles = `
  .spline-watermark,
  [class*="watermark"],
  [class*="Watermark"],
  [data-spline-watermark="true"],
  canvas + div {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    height: 0 !important;
    position: absolute !important;
    z-index: -9999 !important;
  }

  /* Fix for touch events */
  .spline-container canvas {
    touch-action: none !important;
  }

  /* Optimize performance on mobile */
  @media (max-width: 768px) {
    .spline-container canvas {
      image-rendering: optimizeSpeed;
    }
  }
`;

// Add the style to the document head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);

  // Fix for preventDefault on passive event listeners
  const originalPreventDefault = Event.prototype.preventDefault;
  Event.prototype.preventDefault = function () {
    if (this.cancelable) {
      originalPreventDefault.call(this);
    }
  };
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  fallbackClassName?: string;
  fallbackContent?: React.ReactNode;
  onLoad?: (spline: any) => void;
  hideWatermark?: boolean;
  enableGlobalMouseTracking?: boolean;
  artistName?: string;
  renderOnDemand?: boolean; // Whether to render only when in viewport (better performance)
}

/**
 * SplineScene component for rendering 3D Spline scenes
 *
 * This component wraps the Spline component from @splinetool/react-spline
 * and adds loading state handling, fallback content, and performance optimizations.
 *
 * @example
 * ```tsx
 * <SplineScene
 *   scene="https://prod.spline.design/8cxRUUqj9ogXW9gc/scene.splinecode"
 *   className="w-full h-[500px]"
 *   fallbackContent={<div>Loading 3D scene...</div>}
 *   renderOnDemand={true} // Only render when in viewport for better performance
 * />
 * ```
 *
 * @property {string} scene - URL to the Spline scene
 * @property {string} [className] - Additional CSS classes for the container
 * @property {string} [fallbackClassName] - Additional CSS classes for the fallback content
 * @property {React.ReactNode} [fallbackContent] - Content to show while loading
 * @property {Function} [onLoad] - Callback when Spline scene is loaded
 * @property {boolean} [hideWatermark=true] - Whether to hide the Spline watermark
 * @property {boolean} [enableGlobalMouseTracking=false] - Whether to enable mouse tracking for 3D effects
 * @property {string} [artistName] - Name of the 3D artist to credit
 * @property {boolean} [renderOnDemand=false] - Whether to only render when in viewport (better performance)
 */
export const SplineScene = ({
  scene,
  className = "",
  fallbackClassName = "",
  fallbackContent = (
    <div className="flex items-center justify-center h-full">
      Loading 3D scene...
    </div>
  ),
  onLoad,
  hideWatermark = true,
  enableGlobalMouseTracking = false,
  artistName,
  renderOnDemand = false, // Default to always rendering for backward compatibility
}: SplineSceneProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInViewport, setIsInViewport] = useState(!renderOnDemand); // If renderOnDemand is false, consider it in viewport by default
  const containerRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  // Check if the component is in viewport for on-demand rendering
  const checkInViewport = useCallback(() => {
    if (!renderOnDemand || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    setIsInViewport(isVisible);
  }, [renderOnDemand]);

  // Set up intersection observer for on-demand rendering
  useEffect(() => {
    if (!renderOnDemand) return;

    checkInViewport();

    // Set up intersection observer for more efficient viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also listen for scroll and resize events as a fallback
    window.addEventListener("scroll", checkInViewport);
    window.addEventListener("resize", checkInViewport);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      window.removeEventListener("scroll", checkInViewport);
      window.removeEventListener("resize", checkInViewport);
    };
  }, [renderOnDemand, checkInViewport]);

  const handleLoad = (spline: any) => {
    setIsLoading(false);
    splineRef.current = spline;

    // Fix for touchend error - add passive touch event listeners to the canvas
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector("canvas");
      if (canvas) {
        // Make sure touch events are handled properly
        canvas.style.touchAction = "none";

        // Add passive event listeners for touch events
        const noop = () => {};
        canvas.addEventListener("touchend", noop, { passive: true });
        canvas.addEventListener("touchmove", noop, { passive: true });
        canvas.addEventListener("touchstart", noop, { passive: true });
      }
    }

    // Hide watermark if requested
    if (hideWatermark) {
      // Approach 1: Direct style manipulation
      const watermarkElement = document.querySelector(".spline-watermark");
      if (watermarkElement) {
        (watermarkElement as HTMLElement).style.display = "none";
        (watermarkElement as HTMLElement).style.visibility = "hidden";
        (watermarkElement as HTMLElement).style.opacity = "0";
      }

      // Approach 2: Remove watermark elements from DOM
      setTimeout(() => {
        // Look for watermark after a short delay
        const watermarks = document.querySelectorAll(
          '.spline-watermark, [class*="watermark"], [class*="Watermark"], canvas + div'
        );
        watermarks.forEach((el) => {
          if (
            el.textContent?.includes("Spline") ||
            el.innerHTML?.includes("Spline")
          ) {
            el.remove();
          }
        });
      }, 500);
    }

    if (onLoad) {
      onLoad(spline);
    }
  };

  // Handle global mouse tracking
  useEffect(() => {
    if (
      !enableGlobalMouseTracking ||
      !containerRef.current ||
      !splineRef.current
    )
      return;

    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse when the container is in viewport
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport && splineRef.current) {
        try {
          // Direct manipulation of the 3D scene
          if (splineRef.current.setCamera) {
            // Calculate normalized mouse position (-1 to 1)
            const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

            // Apply subtle rotation based on mouse position
            const camera = splineRef.current.getCamera();
            if (camera) {
              // Rotate the camera or object based on mouse position
              // These values can be adjusted for more/less sensitivity
              const rotationX = normalizedY * 0.1;
              const rotationY = normalizedX * 0.1;

              // Try to find the main object or scene
              try {
                // First try to get the main scene object
                const mainObject =
                  splineRef.current.findObjectByName("Scene") ||
                  splineRef.current.findObjectByName("Main") ||
                  splineRef.current.findObjectByName("Model");

                if (mainObject && mainObject.rotation) {
                  // Apply more pronounced rotation for better effect
                  mainObject.rotation.x = rotationX * 0.5;
                  mainObject.rotation.y = rotationY * 0.5;
                } else {
                  // If no main object found, try to rotate all objects
                  const objects = splineRef.current.findAllByType("Object3D");
                  if (objects && objects.length > 0) {
                    objects.forEach((obj: any) => {
                      if (obj && obj.rotation) {
                        obj.rotation.x = rotationX * 0.3;
                        obj.rotation.y = rotationY * 0.3;
                      }
                    });
                  }
                }
              } catch (err) {
                console.error("Error rotating objects:", err);
              }
            }
          }
        } catch (error) {
          console.error("Error manipulating Spline scene:", error);
        }
      }
    };

    // Add global mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enableGlobalMouseTracking, isLoading]);

  // Create a custom wrapper with CSS to hide watermark
  const WatermarkHider = () => {
    return (
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-omnis-black"></div>
      </div>
    );
  };

  return (
    <div className="relative">
      <div ref={containerRef} className={`relative min-h-[480px] ${className}`}>
        {isLoading && (
          <div
            className={`absolute inset-0 bg-omnis-black ${fallbackClassName}`}
          >
            {fallbackContent}
          </div>
        )}
        <Suspense fallback={null}>
          {/* Only render Spline when in viewport if renderOnDemand is true */}
          {isInViewport && (
            <div className="spline-container relative w-full h-full min-h-[480px]">
              <Spline
                scene={scene}
                onLoad={handleLoad}
                style={{ minHeight: "480px" }}
              />
              <WatermarkHider />
            </div>
          )}
          {/* Show placeholder when not in viewport and renderOnDemand is true */}
          {!isInViewport && renderOnDemand && (
            <div className="spline-container relative w-full h-full min-h-[480px] bg-omnis-black flex items-center justify-center">
              <div className="text-omnis-lightgray/70">
                3D content will load when scrolled into view
              </div>
            </div>
          )}
        </Suspense>
      </div>
      {artistName && (
        <div className="mt-2 text-xs text-omnis-lightgray/70 text-left italic">
          3D Model created by {artistName}
        </div>
      )}
    </div>
  );
};

export default SplineScene;
