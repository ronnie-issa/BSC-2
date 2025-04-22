import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "@/lib/framer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ShopPromoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  // No need for hoveredImage state anymore as it's handled in the ProductCard component

  // Featured products to showcase
  const featuredProducts = [
    {
      id: 1,
      name: "ZENITH JACKET",
      price: 450,
      image: "/images/products/zenith-jacket-black.jpg",
      description:
        "The Zenith Jacket embodies the essence of modern minimalism. Crafted from premium technical fabric with a water-resistant finish.",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    {
      id: 2,
      name: "ECLIPSE PANTS",
      price: 320,
      image: "/images/products/eclipse-pants-navy.jpg",
      description:
        "Eclipse Pants blend formal sensibilities with modern construction. Featuring a relaxed fit with tapered legs.",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
    {
      id: 3,
      name: "SHADOW TEE",
      price: 180,
      image: "/images/products/ether-tee-white.jpg",
      description:
        "The Shadow Tee exemplifies our commitment to quality basics. Cut from heavyweight cotton jersey with a boxy silhouette.",
      colors: [
        { name: "Black", value: "#000000" },
        { name: "White", value: "#FFFFFF" },
      ],
    },
  ];

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
              // No mouse events needed here as they're handled in the ProductCard
            >
              <ProductCard product={product} index={index} />
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
