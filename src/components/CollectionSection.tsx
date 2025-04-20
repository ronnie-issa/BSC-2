import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "@/lib/framer";
import { products } from "@/data/products";
import { LazyImage } from "@/components/ui/lazy-image";

const CollectionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState(0);

  // Use Framer Motion's useInView hook for scroll-based animations
  const isSectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const isTitleInView = useInView(titleRef, {
    once: true,
    amount: 0.5,
  });

  // Automatically rotate through products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="collection"
      className="section bg-omnis-darkgray"
      ref={sectionRef}
    >
      <div className="container mx-auto">
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isTitleInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">
            <span
              className="font-logo font-medium"
              style={{ letterSpacing: "-0.5px" }}
            >
              OMNIS
            </span>{" "}
            COLLECTION
          </h2>
          <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
          <p className="text-omnis-lightgray max-w-2xl mx-auto">
            Unveiling our Fall/Winter 2023 lineup. A meticulous blend of
            architectural silhouettes and progressive designs, crafted for those
            who demand excellence in every detail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 100, opacity: 0 }}
              animate={
                isSectionInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }
              }
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.15,
              }}
            >
              <ProductCard
                product={product}
                isActive={index === activeProduct}
                onMouseEnter={() => setActiveProduct(index)}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-block border border-omnis-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
          >
            VIEW ALL
          </Link>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  isActive: boolean;
  onMouseEnter: () => void;
}

const ProductCard = ({ product, isActive, onMouseEnter }: ProductCardProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  // Animation variants for the image hover effect
  const imageVariants = {
    hover: { scale: 1.1 },
    initial: { scale: 1 },
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group cursor-pointer"
      onMouseEnter={onMouseEnter}
    >
      <div
        ref={imageRef}
        className="relative overflow-hidden aspect-[3/4] mb-4"
      >
        <motion.div
          className="w-full h-full"
          animate={isActive ? "hover" : "initial"}
          variants={imageVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <LazyImage
            src={product.image}
            alt={product.name}
            imgClassName="w-full h-full object-cover"
            style={{ filter: "grayscale(100%)" }}
            wrapperClassName="w-full h-full"
          />
        </motion.div>
        <div className="absolute inset-0 bg-omnis-black/30 flex items-center justify-center transition-all duration-300">
          <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20 transform transition-transform duration-300 group-hover:scale-110">
            VIEW
          </span>
        </div>
      </div>
      <h3 className="text-lg font-medium mb-1">{product.name}</h3>
      <p className="text-omnis-lightgray">${product.price}</p>
    </Link>
  );
};

export default CollectionSection;
