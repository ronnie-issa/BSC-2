import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductContext } from "@/contexts/ProductContext";
import { Badge } from "@/components/ui/badge";
import { motion } from "@/lib/framer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BagDropdown from "./BagDropdown";

interface NavbarProps {
  scrollY?: number;
  showLogoEffect?: boolean;
}

const Navbar = ({ scrollY = 0, showLogoEffect = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Explicitly set scrolled to false initially to ensure transparent background on load
  const [scrolled, setScrolled] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const [bagDropdownOpen, setBagDropdownOpen] = useState(false);
  // Track if the dropdown should be opened by an add-to-bag action
  const [shouldOpenFromAddToBag, setShouldOpenFromAddToBag] = useState(false);
  const {
    cart: bag,
    addToCartEvent,
    resetAddToCartEvent,
  } = useProductContext();
  const prevBagCountRef = useRef(0);
  const location = useLocation();

  // Calculate total items in bag
  const bagItemCount = bag.reduce((total, item) => total + item.quantity, 0);

  // Close dropdown when location changes
  useEffect(() => {
    // Always close the dropdown when changing pages
    setBagDropdownOpen(false);
    // Reset the add-to-bag flag when changing pages
    setShouldOpenFromAddToBag(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Listen for the addToCart event
  useEffect(() => {
    if (addToCartEvent) {
      // When an item is added to the cart, set the flag to open the dropdown
      setShouldOpenFromAddToBag(true);
      // Reset the event in the context
      resetAddToCartEvent();
    }
  }, [addToCartEvent, resetAddToCartEvent]);

  // Animate badge when bag count changes and conditionally open dropdown
  useEffect(() => {
    // Store the current value for comparison
    const prevCount = prevBagCountRef.current;

    // Check if items were actually added (not on page navigation/remount)
    if (bagItemCount > prevCount) {
      // Animate the badge
      setAnimateBadge(true);

      // Only open the dropdown if the add-to-bag action triggered it
      if (shouldOpenFromAddToBag) {
        setBagDropdownOpen(true);
        // Reset the flag after opening
        setShouldOpenFromAddToBag(false);
      }

      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }

    // Always update the ref to the current count after the check
    prevBagCountRef.current = bagItemCount;
  }, [bagItemCount, shouldOpenFromAddToBag]);

  // Track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Handle scroll for navbar background and update window width
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        // Increased threshold from 10px to 50px
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Force transparent background on initial load (no initial check)
    setScrolled(false);

    // Initial window width
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track if we're fully scrolled for logo height calculations
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  // Calculate responsive maxScroll value based on screen size
  const maxScroll = windowWidth < 768 ? 200 : 300; // Shorter scroll distance on mobile

  // Update isFullyScrolled state when scroll position changes
  // If logo effect is disabled, always consider it fully scrolled
  useEffect(() => {
    setIsFullyScrolled(showLogoEffect ? scrollY >= maxScroll : true);
  }, [scrollY, maxScroll, showLogoEffect]);

  // Calculate logo transform values based on scroll position
  const progress = Math.min(1, scrollY / maxScroll);

  // Only calculate transition values if the logo effect is enabled
  // Otherwise, use fixed values for the navbar logo

  // Calculate responsive scale based on screen width
  // On mobile, use a smaller initial scale (4x instead of 8x)
  const initialScale = windowWidth < 768 ? 4 : 8;
  const finalScale = 1;

  // Calculate scale - from initialScale (large) to finalScale (navbar size)
  // If logo effect is disabled, always use the final scale
  const logoScale = showLogoEffect
    ? initialScale - progress * (initialScale - finalScale)
    : finalScale;

  // Calculate Y position - responsive based on screen width
  // Use a smaller initial Y offset on mobile, add 50px to push the big logo down
  const initialY = windowWidth < 768 ? 48 : 164;

  // When fully scrolled (progress = 1), we want the logo to be vertically centered
  // If logo effect is disabled, always use 0 for Y position
  const logoY = showLogoEffect ? initialY * (1 - progress) : 0;

  // We don't need logoX anymore as we're using CSS centering
  // const logoX = 0;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        !showLogoEffect || scrolled
          ? "bg-omnis-black/90 backdrop-blur-sm py-5 shadow-md"
          : "bg-transparent pt-2 pb-6"
      )}
    >
      <div className="container mx-auto relative">
        {/* Absolute positioned logo in the center - only shown when effect is enabled */}
        {showLogoEffect && (
          <div className="absolute left-0 right-0 flex justify-center z-50 w-full pointer-events-none">
            <div
              className={
                isFullyScrolled ? "pointer-events-auto" : "pointer-events-none"
              }
            >
              <motion.div
                style={{
                  transform: `translateY(${logoY}px) scale(${logoScale})`,
                  transformOrigin: "center center",
                  transition: "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                className="relative"
              >
                <Link
                  to="/"
                  className={`text-xl sm:text-3xl md:text-5xl font-logo font-medium ${
                    isFullyScrolled
                      ? "hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] cursor-pointer"
                      : "cursor-default"
                  }`}
                  style={{
                    letterSpacing: "-0.5px",
                    whiteSpace: "nowrap",
                    maxHeight: isFullyScrolled ? "60px" : "none",
                    display: "block",
                    lineHeight: isFullyScrolled ? "60px" : "normal",
                    pointerEvents: isFullyScrolled ? "auto" : "none", // Only clickable when small
                  }}
                >
                  OMNIS
                </Link>
              </motion.div>
            </div>
          </div>
        )}

        {/* Regular centered navbar logo - only shown when effect is disabled */}
        {!showLogoEffect && (
          <div className="absolute left-0 right-0 flex justify-center z-50 w-full pointer-events-none">
            <div className="pointer-events-auto">
              <Link
                to="/"
                className="text-xl sm:text-3xl md:text-5xl font-logo font-medium hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                style={{
                  letterSpacing: "-0.5px",
                  whiteSpace: "nowrap",
                  maxHeight: "60px",
                  display: "block",
                  lineHeight: "60px",
                }}
              >
                OMNIS
              </Link>
            </div>
          </div>
        )}

        {/* Flex container for navigation items */}
        <div className="flex justify-between items-center py-6">
          {/* Left side navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink to="/about">ABOUT</NavLink>
          </nav>

          {/* Right side navigation */}
          <nav className="hidden md:flex items-center space-x-10 ml-auto">
            <NavLink to="/shop">SHOP</NavLink>
            <Popover open={bagDropdownOpen} onOpenChange={setBagDropdownOpen}>
              <PopoverTrigger asChild>
                <button
                  className="relative group p-3"
                  aria-label={`Shopping bag with ${bagItemCount} items`}
                >
                  <ShoppingBag
                    size={24}
                    className={`${
                      bagItemCount > 0
                        ? "text-omnis-white"
                        : "text-omnis-lightgray"
                    } group-hover:text-omnis-white transition-colors duration-300`}
                  />
                  {bagItemCount > 0 && (
                    <Badge
                      variant="default"
                      className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-medium ${
                        animateBadge ? "animate-pulse scale-125" : ""
                      }`}
                    >
                      {bagItemCount}
                    </Badge>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[350px] md:w-[450px] border-0 shadow-xl"
                align="end"
                sideOffset={16}
              >
                <BagDropdown onClose={() => setBagDropdownOpen(false)} />
              </PopoverContent>
            </Popover>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-omnis-white z-50 ml-auto"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation Overlay */}
          <div
            className={cn(
              "fixed inset-0 bg-omnis-black flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            )}
          >
            <nav className="flex flex-col items-center space-y-8 text-2xl">
              <MobileNavLink to="/about" onClick={toggleMenu}>
                ABOUT
              </MobileNavLink>
              <MobileNavLink to="/shop" onClick={toggleMenu}>
                SHOP
              </MobileNavLink>
              <MobileNavLink to="/bag" onClick={toggleMenu}>
                BAG{" "}
                {bagItemCount > 0 && (
                  <span className="inline-flex items-center justify-center ml-2 bg-red-600 text-white rounded-full h-5 w-5 text-xs">
                    {bagItemCount}
                  </span>
                )}
              </MobileNavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="text-omnis-white text-sm tracking-wider font-medium hover:text-gray-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left p-3"
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="text-omnis-white tracking-widest font-medium p-4"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
