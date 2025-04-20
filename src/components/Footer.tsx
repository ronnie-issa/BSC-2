import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-omnis-black py-12 border-t border-omnis-gray/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-logo font-medium mb-6"
              style={{ letterSpacing: "-0.5px" }}
            >
              OMNIS
            </h3>
            <p className="text-omnis-lightgray text-sm leading-relaxed">
              Redefining the boundaries between high fashion and streetwear
              since 2020.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Help
            </h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li>
                <Link
                  to="/shipping"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/sizing"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Sizing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li>
                <Link
                  to="/legal"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/legal"
                  className="text-sm hover:text-omnis-white transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-omnis-gray/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-omnis-lightgray text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()}{" "}
            <span
              className="font-logo font-medium"
              style={{ letterSpacing: "-0.5px" }}
            >
              OMNIS
            </span>
            . All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-omnis-lightgray hover:text-omnis-white transition-colors group"
          >
            <span className="text-xs uppercase tracking-wider">
              Back to top
            </span>
            <ArrowUp
              size={16}
              className="transition-transform group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
