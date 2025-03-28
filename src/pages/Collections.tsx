
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAP } from '@/lib/gsap';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define collection types
type Collection = {
  id: string;
  name: string;
  year: string;
  season: string; 
  description: string;
  coverImage: string;
  products: Product[];
};

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

// Sample collections data
const collections: Collection[] = [
  {
    id: "fw23",
    name: "FW23 COLLECTION",
    year: "2023",
    season: "Fall/Winter",
    description: "Unveiling our Fall/Winter 2023 lineup. A meticulous blend of architectural silhouettes and progressive designs, crafted for those who demand excellence in every detail.",
    coverImage: "https://images.unsplash.com/photo-1611316185995-9624c94487d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    products: [
      {
        id: 1,
        name: "ZENITH JACKET",
        price: "$450",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 2,
        name: "VOID HOODIE",
        price: "$280",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "ECLIPSE PANTS",
        price: "$320",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 4,
        name: "SHADOW TEE",
        price: "$180",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 5,
        name: "MONOLITH SWEATER",
        price: "$320",
        image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 6,
        name: "ORIGIN TOTE",
        price: "$160",
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
      }
    ]
  },
  {
    id: "ss23",
    name: "SS23 COLLECTION",
    year: "2023",
    season: "Spring/Summer",
    description: "Our Spring/Summer 2023 collection explores the interplay between light and shadow. Ethereal yet substantive, these pieces form a versatile foundation for the modern wardrobe.",
    coverImage: "https://images.unsplash.com/photo-1583846783214-7229a48b1899?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3",
    products: [
      {
        id: 7,
        name: "GHOST JACKET",
        price: "$380",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 8,
        name: "ETHER TEE",
        price: "$140",
        image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 9,
        name: "DRIFT SHORTS",
        price: "$180",
        image: "https://images.unsplash.com/photo-1585236149516-cde8a89e6cfd?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 10,
        name: "PRISM CAP",
        price: "$90",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      }
    ]
  },
  {
    id: "fw22",
    name: "FW22 COLLECTION",
    year: "2022",
    season: "Fall/Winter",
    description: "The Fall/Winter 2022 collection draws inspiration from brutalist architecture, translating rigid structures into fluid forms. A study in contrasts, defined by stark minimalism.",
    coverImage: "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3",
    products: [
      {
        id: 11,
        name: "APEX PARKA",
        price: "$580",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 12,
        name: "CORE SWEATER",
        price: "$240",
        image: "https://images.unsplash.com/photo-1516720262849-0d1c546341dd?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      },
      {
        id: 13,
        name: "STATIC PANTS",
        price: "$290",
        image: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
      }
    ]
  }
];

const Collections = () => {
  const [activeCollection, setActiveCollection] = useState<string>("fw23");
  const [activeProduct, setActiveProduct] = useState(0);
  const collectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();
  
  useEffect(() => {
    if (!headerRef.current) return;
    
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
    
    return () => ctx.revert();
  }, [gsap]);
  
  useEffect(() => {
    if (!collectionRef.current) return;
    
    const ctx = gsap.context(() => {
      // Products animation
      gsap.fromTo(
        '.product-item',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }, collectionRef);
    
    return () => ctx.revert();
  }, [activeCollection, gsap]);
  
  // Automatically rotate through products
  useEffect(() => {
    const currentCollection = collections.find(c => c.id === activeCollection);
    if (!currentCollection) return;
    
    const interval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % currentCollection.products.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeCollection]);
  
  const currentCollection = collections.find(c => c.id === activeCollection) || collections[0];
  
  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <header ref={headerRef} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">COLLECTIONS</h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Explore our archive of meticulously crafted collections. Each season tells a unique story through form, texture, and silhouette.
            </p>
          </header>
          
          <Tabs value={activeCollection} onValueChange={setActiveCollection} className="w-full">
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
              <TabsContent key={collection.id} value={collection.id} ref={collectionRef}>
                <div className="mb-16">
                  <div className="relative h-[50vh] overflow-hidden mb-8">
                    <img 
                      src={collection.coverImage} 
                      alt={collection.name} 
                      className="w-full h-full object-cover object-center"
                      style={{ filter: 'grayscale(100%)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-omnis-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                      <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">{collection.name}</h2>
                      <p className="text-omnis-lightgray max-w-2xl text-lg">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {collection.products.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="product-item group cursor-pointer"
                        onMouseEnter={() => setActiveProduct(index)}
                      >
                        <div className="relative overflow-hidden aspect-[3/4] mb-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700"
                            style={{ 
                              filter: 'grayscale(100%)',
                              transform: index === activeProduct ? 'scale(1.1)' : 'scale(1)'
                            }}
                          />
                          <div className="absolute inset-0 bg-omnis-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20">
                              VIEW
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                        <p className="text-omnis-lightgray">{product.price}</p>
                      </div>
                    ))}
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
