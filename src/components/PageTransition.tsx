import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition component that provides a consistent fade transition between pages
 * This component wraps the entire application content and handles the fade in/out effects
 *
 * This matches the transition effect of the "Learn More About Us" button
 * and works seamlessly with mobile menu navigation
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  // Track if we're coming from the mobile menu
  const [isFromMobileMenu, setIsFromMobileMenu] = useState(false);

  useEffect(() => {
    // Check if we're coming from the mobile menu by looking for a specific class
    // This helps us coordinate with the mobile menu transition
    const mobileMenuOpen = document.body.classList.contains("mobile-menu-open");
    setIsFromMobileMenu(mobileMenuOpen);

    // If the location changes
    if (location.pathname !== displayLocation.pathname) {
      // Start by fading out
      setTransitionStage("fadeOut");

      // After the fade out is complete, update the location and fade in
      // Use a longer duration if coming from mobile menu to prevent white flash
      const timeout = setTimeout(
        () => {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
        },
        isFromMobileMenu ? 300 : 200
      ); // Shorter duration for faster transitions

      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation, isFromMobileMenu]);

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        transitionStage === "fadeIn"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
