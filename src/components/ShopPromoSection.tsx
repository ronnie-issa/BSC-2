import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "@/lib/framer";
import { ArrowRight } from "lucide-react";
import { LazyImage } from "@/components/ui/lazy-image";
import { Button } from "@/components/ui/button";

const ShopPromoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Featured products to showcase
  const featuredProducts = [
    {
      id: 1,
      name: "ZENITH JACKET",
      image: "/images/products/zenith-jacket-black.jpg",
    },
    {
      id: 3,
      name: "ECLIPSE PANTS",
      image: "/images/products/eclipse-pants-navy.jpg",
    },
    {
      id: 4,
      name: "SHADOW TEE",
      image: "/images/products/ether-tee-white.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-omnis-black overflow-hidden"
    >
      <div className="container mx-auto px-6 relative">
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
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2 + index * 0.15,
              }}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Link to={`/product/${product.id}`} className="block group">
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <motion.div
                    animate={{
                      scale: hoveredImage === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      imgClassName="w-full h-full object-cover"
                      wrapperClassName="w-full h-full"
                      style={{ filter: "grayscale(100%)" }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-omnis-black/30 flex items-center justify-center transition-all duration-300">
                    <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20 transform transition-transform duration-300 group-hover:scale-110">
                      VIEW
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-1">{product.name}</h3>
              </Link>
            </motion.div>
          ))}
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
