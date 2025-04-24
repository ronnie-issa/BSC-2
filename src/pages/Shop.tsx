import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "@/lib/framer";
import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";

const Shop = () => {
  // Refs for animations
  const shopRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(shopRef, { once: true, amount: 0.2 });

  // Get products from context
  const { products, isLoading, error, refreshProducts } =
    useContentfulProducts();

  // No need to refresh products here as it's already done in ContentfulProductsProvider

  return (
    <div
      className="relative bg-omnis-black text-omnis-white min-h-screen"
      ref={shopRef}
    >
      <SEO
        title="Shop | OMNIS"
        description="Browse our collection of premium streetwear essentials. Each piece is crafted with meticulous attention to detail, ensuring unparalleled quality and distinctive style."
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto relative">
          <motion.header
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              SHOP
            </h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Browse our collection of premium streetwear essentials. Each piece
              is crafted with meticulous attention to detail, ensuring
              unparalleled quality and distinctive style.
            </p>
          </motion.header>

          {/* Mobile filter button removed */}

          {/* Mobile filter panel removed */}

          <div className="grid grid-cols-1 gap-8">
            {/* Desktop filter sidebar removed */}

            <div className="w-full">
              {/* Product counter removed */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  <div className="col-span-3 text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-omnis-white"></div>
                    <p className="mt-4">Loading products...</p>
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
                ) : products.length === 0 ? (
                  <div className="col-span-3 text-center py-20">
                    <p>No products found.</p>
                  </div>
                ) : (
                  products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={
                        isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                      }
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.3 + index * 0.1, // Staggered animation
                      }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
