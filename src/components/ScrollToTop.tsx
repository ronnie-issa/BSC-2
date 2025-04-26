import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that scrolls the window to the top on route change
 * This component doesn't render anything, it just uses the useLocation hook
 * to detect route changes and scrolls to the top when they occur
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // For iOS devices, we need a more robust approach
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // First immediate scroll
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use 'instant' for immediate scrolling without animation
    });

    // For iOS, add a delayed scroll to ensure it takes effect after any browser-specific behaviors
    if (isIOS) {
      // First timeout at 50ms
      const timer1 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      // Second timeout at 150ms to be extra sure
      const timer2 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 150);

      // Final timeout after content should be loaded
      const timer3 = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
