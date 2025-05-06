import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/framer";
import { LazyImage } from "@/components/ui/lazy-image";
import { Product } from "@/contexts/ProductContext";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

/**
 * ProductCard Component
 *
 * Note: The VIEW button is currently hidden. In the future, this will be
 * implemented as a quick view feature that shows product details in a modal
 * without navigating away from the current page.
 *
 * TODO: Implement quick view functionality when clicking the VIEW button.
 */

interface ProductCardProps {
  product: Product;
  index: number; // Kept for consistency with other components that might use it
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="block group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name}, $${formatPrice(product.price)}`}
          className="block"
        >
          <div className="relative overflow-hidden mb-0 sm:mb-2">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full"
            >
              <LazyImage
                src={product.image}
                alt={product.name}
                imgClassName="w-full h-full object-cover"
                wrapperClassName="w-full"
                aspectRatio="3/4" // Fixed aspect ratio for product cards
              />
            </motion.div>
            <div className="absolute inset-0 bg-omnis-black/30 transition-all duration-300">
              <VisuallyHidden>View {product.name} details</VisuallyHidden>
            </div>
          </div>
        </Link>

        {/* View button is hidden for now - will be used for quick view feature in the future */}
        {/*
        <motion.div
          className="absolute bottom-4 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={`/product/${product.slug}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-omnis-black/80 hover:bg-omnis-black border-white text-white hover:text-white tracking-widest font-bold"
            >
              VIEW
            </Button>
          </Link>
        </motion.div>
        */}
      </div>

      <Link to={`/product/${product.slug}`} className="block mt-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        {product.price && (
          <p className="text-omnis-lightgray">${formatPrice(product.price)}</p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
