import * as React from "react";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ScrollableTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsList> {
  children: React.ReactNode;
  ariaLabel?: string;
}

/**
 * ScrollableTabsList component that makes tabs horizontally scrollable on mobile
 * with proper accessibility support
 */
const ScrollableTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  ScrollableTabsListProps
>(({ className, children, ariaLabel = "Navigation tabs", ...props }, ref) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Only handle left/right arrow keys
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();

      const scrollAmount = 150; // Adjust scroll amount as needed
      const direction = e.key === "ArrowLeft" ? -1 : 1;

      container.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth",
      });
    }
  };

  // Mouse/touch event handlers for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current || e.touches.length !== 1) return;

    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (
      !isDragging.current ||
      !scrollContainerRef.current ||
      e.touches.length !== 1
    )
      return;

    // Prevent default to avoid page scrolling while swiping tabs
    e.preventDefault();

    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Add and remove event listeners
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleMouseUpEvent = () => {
      isDragging.current = false;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUpEvent);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleMouseUpEvent);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUpEvent);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUpEvent);
      scrollContainer?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="relative overflow-hidden w-full"
      role="region"
      aria-label={ariaLabel}
    >
      {/* Scroll indicators - optional visual cue that content is scrollable */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-omnis-black to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-omnis-black to-transparent z-10 pointer-events-none md:hidden" />

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide pb-3 -mb-3 scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", // For better iOS scrolling
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="tablist"
      >
        <TabsList
          ref={ref}
          className={cn(
            // If grid is specified in className, preserve it but add min-width
            // Otherwise use flex layout
            className?.includes("grid")
              ? `${className} min-w-full`
              : "w-max min-w-full flex-nowrap"
          )}
          {...props}
        >
          {children}
        </TabsList>
      </div>
    </div>
  );
});

ScrollableTabsList.displayName = "ScrollableTabsList";

// Export the components
export { Tabs, TabsContent, TabsTrigger, ScrollableTabsList };
