import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "@/lib/framer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LazyImage } from "@/components/ui/lazy-image";
import { products as productData } from "@/data/products";

// Define collection types
type Collection = {
  id: string;
  name: string;
  year: string;
  season: string;
  description: string;
  coverImage: string;
  products: number[];
};

// Sample collections data
const collections: Collection[] = [
  {
    id: "fw23",
    name: "OMNIS COLLECTION",
    year: "2023",
    season: "Fall/Winter",
    description:
      "Unveiling our Fall/Winter 2023 lineup. A meticulous blend of architectural silhouettes and progressive designs, crafted for those who demand excellence in every detail.",
    coverImage: "/images/hero/main-hero-bg.jpg",
    products: [1, 2, 3, 4],
  },
  {
    id: "ss23",
    name: "SS23 COLLECTION",
    year: "2023",
    season: "Spring/Summer",
    description:
      "Our Spring/Summer 2023 collection explores the interplay between light and shadow. Ethereal yet substantive, these pieces form a versatile foundation for the modern wardrobe.",
    coverImage: "/images/backgrounds/collection-spring-bg.jpg",
    products: [1, 2, 3, 4],
  },
  {
    id: "fw22",
    name: "FW22 COLLECTION",
    year: "2022",
    season: "Fall/Winter",
    description:
      "The Fall/Winter 2022 collection draws inspiration from brutalist architecture, translating rigid structures into fluid forms. A study in contrasts, defined by stark minimalism.",
    coverImage: "/images/backgrounds/collection-winter-bg.jpg",
    products: [1, 2, 3, 4],
  },
];

const Collections = () => {
  const [activeCollection, setActiveCollection] = useState<string>("fw23");
  const [activeProduct, setActiveProduct] = useState(0);
  const collectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });
  const isCollectionInView = useInView(collectionRef, {
    once: true,
    amount: 0.2,
  });

  // We'll use Framer Motion's built-in animation capabilities instead of these effects

  // Automatically rotate through products
  useEffect(() => {
    const currentCollection = collections.find(
      (c) => c.id === activeCollection
    );
    if (!currentCollection) return;

    // Get the actual products that exist in the data
    const availableProducts = currentCollection.products.filter((id) =>
      productData.some((p) => p.id === id)
    );

    if (availableProducts.length === 0) return;

    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % availableProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeCollection]);

  // Find the current collection
  const currentCollection =
    collections.find((c) => c.id === activeCollection) || collections[0];

  // Log the current collection for debugging
  useEffect(() => {
    console.log("Current collection:", currentCollection.name);
  }, [currentCollection]);

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 relative">
          <motion.header
            ref={headerRef}
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={
              isHeaderInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
            }
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              COLLECTIONS
            </h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Explore our archive of meticulously crafted collections. Each
              season tells a unique story through form, texture, and silhouette.
            </p>
          </motion.header>

          <Tabs
            value={activeCollection}
            onValueChange={setActiveCollection}
            className="w-full"
          >
            <TabsList className="w-full justify-center mb-12 bg-transparent border-b border-omnis-gray/20">
              {collections.map((collection) => (
                <TabsTrigger
                  key={collection.id}
                  value={collection.id}
                  className="text-sm md:text-base px-6 py-3 data-[state=active]:text-omnis-white data-[state=active]:border-b-2 data-[state=active]:border-omnis-white text-omnis-lightgray rounded-none transition-colors"
                >
                  {collection.season} {collection.year}
                </TabsTrigger>
              ))}
            </TabsList>

            {collections.map((collection) => (
              <TabsContent
                key={collection.id}
                value={collection.id}
                ref={collectionRef}
              >
                <div className="mb-16">
                  <div className="relative h-[50vh] overflow-hidden mb-8">
                    <LazyImage
                      src={collection.coverImage}
                      alt={`${collection.name} - ${collection.season} ${collection.year} Collection`}
                      imgClassName="w-full h-full object-cover object-center"
                      wrapperClassName="w-full h-full"
                      style={{ filter: "grayscale(100%)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-omnis-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                      <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                        {collection.name}
                      </h2>
                      <p className="text-omnis-lightgray max-w-2xl text-lg">
                        {collection.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collection.products.map((productId, index) => {
                      const product = productData.find(
                        (p) => p.id === productId
                      );
                      if (!product) return null;

                      return (
                        <motion.div
                          key={product.id}
                          initial={{ y: 50, opacity: 0 }}
                          animate={
                            isCollectionInView
                              ? { y: 0, opacity: 1 }
                              : { y: 50, opacity: 0 }
                          }
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.1 * index, // Staggered animation
                          }}
                        >
                          <Link
                            to={`/product/${product.id}`}
                            className="group cursor-pointer block"
                            onMouseEnter={() => setActiveProduct(index)}
                          >
                            <div className="relative overflow-hidden aspect-[3/4] mb-4">
                              <LazyImage
                                src={product.image}
                                alt={`${product.name} from ${collection.season} ${collection.year} Collection`}
                                imgClassName="w-full h-full object-cover transition-transform duration-700"
                                wrapperClassName="w-full h-full"
                                style={{
                                  filter: "grayscale(100%)",
                                  transform:
                                    index === activeProduct
                                      ? "scale(1.1)"
                                      : "scale(1)",
                                }}
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
                            <p className="text-omnis-lightgray">
                              ${product.price}
                            </p>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    variant="outline"
                    className="border-omnis-white px-8 py-6 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
                  >
                    DOWNLOAD LOOKBOOK
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
