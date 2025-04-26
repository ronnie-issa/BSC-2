import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/framer";
import { LazyImage } from "@/components/ui/lazy-image";
import { Product } from "@/contexts/ProductContext";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface ProductCardProps {
  product: Product;
  index: number; // Kept for consistency with other components that might use it
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View ${product.name}, $${product.price}`}
    >
      <div className="relative overflow-hidden mb-0 sm:mb-2">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            imgClassName="w-full h-full object-cover"
            wrapperClassName="w-full h-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-omnis-black/30 transition-all duration-300">
          <VisuallyHidden>View {product.name} details</VisuallyHidden>
        </div>
      </div>
      <h3 className="text-lg font-medium">{product.name}</h3>
      {product.price && (
        <p className="text-omnis-lightgray">${product.price}</p>
      )}
    </Link>
  );
};

export default ProductCard;
