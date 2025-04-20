import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "@/lib/framer";
import { Button } from "@/components/ui/button";
import { LazyImage } from "@/components/ui/lazy-image";
import { products } from "@/data/products";

const Shop = () => {
  // Refs for animations
  const shopRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(shopRef, { once: true, amount: 0.2 });

  return (
    <div
      className="relative bg-omnis-black text-omnis-white min-h-screen"
      ref={shopRef}
    >
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 relative">
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
                {products.map((product, index) => (
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
                    <Link
                      to={`/product/${product.id}`}
                      className="group cursor-pointer block"
                    >
                      <div className="relative overflow-hidden aspect-[3/4] mb-4">
                        <LazyImage
                          src={product.image}
                          alt={`${product.name}`}
                          imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          wrapperClassName="w-full h-full"
                          style={{ filter: "grayscale(100%)" }}
                        />
                        <div className="absolute inset-0 bg-omnis-black/30 flex items-center justify-center transition-all duration-300">
                          <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20 transform transition-transform duration-300 group-hover:scale-110">
                            VIEW
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-1">
                        {product.name}
                      </h3>
                      <p className="text-omnis-lightgray">${product.price}</p>
                    </Link>
                  </motion.div>
                ))}
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
