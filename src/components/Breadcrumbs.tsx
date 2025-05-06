import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";

interface BreadcrumbsProps {
  items?: {
    label: string;
    path: string;
  }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();

  // If no items are provided, generate them from the current path
  const breadcrumbItems =
    items || generateBreadcrumbsFromPath(location.pathname);

  return (
    <nav
      className="flex items-center text-sm text-omnis-lightgray my-8"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            to="/"
            className="hover:text-omnis-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
          >
            HOME
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            <Icon icon={ChevronRight} className="mx-2 h-4 w-4" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-omnis-white font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-omnis-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-omnis-white after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Helper function to generate breadcrumbs from the current path
const generateBreadcrumbsFromPath = (pathname: string) => {
  const paths = pathname.split("/").filter(Boolean);

  return paths.map((path, index) => {
    // Create the path for this breadcrumb
    const url = `/${paths.slice(0, index + 1).join("/")}`;

    // Format the label (capitalize, replace hyphens with spaces)
    let label = path.replace(/-/g, " ").toUpperCase();

    // Special case for product pages (where the last segment is an ID)
    if (path.match(/^\d+$/) && paths[index - 1] === "product") {
      label = "PRODUCT";
    }

    return {
      label,
      path: url,
    };
  });
};

export default Breadcrumbs;
