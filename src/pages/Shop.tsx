import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "@/lib/framer";
import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

const Shop = () => {
  // Separate ref for product grid animations
  const productsGridRef = useRef<HTMLDivElement>(null);
  const isProductsGridInView = useInView(productsGridRef, {
    once: true,
    amount: 0.1,
  });

  // Get products from context
  const { products, isLoading, error, refreshProducts } =
    useContentfulProducts();

  // Force refresh products when the shop page loads
  useEffect(() => {
    // This ensures products are loaded when the shop page is refreshed
    refreshProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <SEO
        title="Shop | OMNIS"
        description="Browse our collection of premium streetwear essentials. Each piece is crafted with meticulous attention to detail, ensuring unparalleled quality and distinctive style."
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto relative">
          <Breadcrumbs items={[{ label: "SHOP", path: "/shop" }]} />

          <div className="grid grid-cols-1 gap-8">
            <div className="w-full">
              {/* Loading spinner that's always visible when loading */}
              {isLoading && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-omnis-black bg-opacity-80 p-8 rounded text-center">
                  <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-omnis-white mb-4"></div>
                  <p className="text-xl">Loading products...</p>
                </div>
              )}

              {/* Error message */}
              {!isLoading && error && (
                <div className="col-span-3 text-center py-20">
                  <p className="text-red-500">{error}</p>
                  <button
                    className="mt-4 px-4 py-2 border border-omnis-white hover:bg-omnis-white hover:text-omnis-black transition-colors"
                    onClick={() => refreshProducts()}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* No products message */}
              {!isLoading && !error && products.length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <p>No products found.</p>
                </div>
              )}

              {/* Products grid - only rendered when not loading and we have products */}
              {!isLoading && !error && products.length > 0 && (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  ref={productsGridRef}
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={`product-${product.id}-${index}`}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.1, // Staggered animation
                      }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
