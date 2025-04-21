import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductContext } from "@/contexts/ProductContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Explicitly set scrolled to false initially to ensure transparent background on load
  const [scrolled, setScrolled] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const { cart: bag } = useProductContext();
  const prevBagCountRef = useRef(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Calculate total items in bag
  const bagItemCount = bag.reduce((total, item) => total + item.quantity, 0);

  // Animate badge when bag count changes
  useEffect(() => {
    if (bagItemCount > prevBagCountRef.current) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }
    prevBagCountRef.current = bagItemCount;
  }, [bagItemCount]);

  // Handle scroll for navbar background
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

    // Force transparent background on initial load (no initial check)
    setScrolled(false);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-omnis-black/90 backdrop-blur-sm py-3 shadow-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-logo font-medium z-50 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
          style={{ letterSpacing: "-0.5px" }}
        >
          OMNIS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          <Link to="/bag" className="relative group">
            <ShoppingBag
              size={20}
              className={`${
                bagItemCount > 0 ? "text-omnis-white" : "text-omnis-lightgray"
              } group-hover:text-omnis-white transition-colors duration-300`}
            />
            {bagItemCount > 0 && (
              <Badge
                variant="default"
                className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-medium ${
                  animateBadge ? "animate-pulse scale-125" : ""
                }`}
              >
                {bagItemCount}
              </Badge>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-omnis-white z-50"
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
      className="text-omnis-white text-sm tracking-wider font-medium hover:text-gray-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
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
      className="text-omnis-white tracking-widest font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
