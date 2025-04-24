import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "@/lib/framer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";

const ShopPromoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Get featured products from context
  const { featuredProducts, isLoading, error, refreshProducts } =
    useContentfulProducts();

  // No need to refresh products here as it's already done in ContentfulProductsProvider

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-omnis-black overflow-hidden"
    >
      <div className="container mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">
            ELEVATE YOUR WARDROBE
          </h2>
          <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
          <p className="text-omnis-lightgray max-w-2xl mx-auto text-lg">
            Discover our curated selection of premium garments, meticulously
            crafted with attention to detail and commitment to quality.
          </p>
        </motion.div>

        {/* Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            <div className="col-span-3 text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-omnis-white"></div>
              <p className="mt-4">Loading featured products...</p>
            </div>
          ) : error ? (
            <div className="col-span-3 text-center py-20">
              <p className="text-red-500">{error}</p>
              <button
                className="mt-4 px-4 py-2 border border-omnis-white hover:bg-omnis-white hover:text-omnis-black transition-colors"
                onClick={() => refreshProducts()}
              >
                Try Again
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <p>No featured products found.</p>
            </div>
          ) : (
            featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 100, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2 + index * 0.15,
                }}
                // No mouse events needed here as they're handled in the ProductCard
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))
          )}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Link to="/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-omnis-white text-omnis-white hover:bg-omnis-white hover:text-omnis-black transition-all duration-300 px-8 py-6 text-sm font-medium tracking-widest"
            >
              EXPLORE FULL COLLECTION
              <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopPromoSection;
