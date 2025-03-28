
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-omnis-black/95 backdrop-blur-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-heading font-black tracking-widest z-50">
          OMNIS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#about">ABOUT</NavLink>
          <NavLink href="#collection">COLLECTION</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-omnis-white z-50"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
            <MobileNavLink href="#about" onClick={toggleMenu}>ABOUT</MobileNavLink>
            <MobileNavLink href="#collection" onClick={toggleMenu}>COLLECTION</MobileNavLink>
            <MobileNavLink to="/shop" onClick={toggleMenu}>SHOP</MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>CONTACT</MobileNavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, to, children }: { href?: string; to?: string; children: React.ReactNode }) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="text-omnis-white text-sm tracking-wider font-medium hover:text-gray-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className="text-omnis-white text-sm tracking-wider font-medium hover:text-gray-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, to, onClick, children }: { href?: string; to?: string; onClick: () => void; children: React.ReactNode }) => {
  if (to) {
    return (
      <Link 
        to={to} 
        className="text-omnis-white tracking-widest font-medium"
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <a 
      href={href} 
      className="text-omnis-white tracking-widest font-medium"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
