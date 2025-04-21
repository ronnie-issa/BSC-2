import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductContext } from "@/contexts/ProductContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);
  const { cart } = useProductContext();
  const prevCartCountRef = useRef(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Animate badge when cart count changes
  useEffect(() => {
    if (cartItemCount > prevCartCountRef.current) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 300);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItemCount;
  }, [cartItemCount]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-omnis-black/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-logo font-medium z-50"
          style={{ letterSpacing: "-0.5px" }}
        >
          OMNIS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          <Link to="/cart" className="relative group">
            <ShoppingBag
              size={20}
              className={`${
                cartItemCount > 0 ? "text-omnis-white" : "text-omnis-lightgray"
              } group-hover:text-omnis-white transition-colors duration-300`}
            />
            {cartItemCount > 0 && (
              <Badge
                variant="default"
                className={`absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-medium transform transition-transform duration-300 group-hover:scale-110 ${
                  animateBadge ? "animate-pulse scale-125" : ""
                }`}
              >
                {cartItemCount}
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
            <MobileNavLink to="/cart" onClick={toggleMenu}>
              CART{" "}
              {cartItemCount > 0 && (
                <span className="inline-flex items-center justify-center ml-2 bg-red-600 text-white rounded-full h-5 w-5 text-xs">
                  {cartItemCount}
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
