
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@/lib/gsap';
import { products } from '@/data/products';

const CollectionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();
  const [activeProduct, setActiveProduct] = useState(0);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const section = sectionRef.current;
    const cards = section.querySelectorAll('.product-card');
    
    let ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      });
      
      // Create a timeline for each card with scroll trigger
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [gsap]);

  // Automatically rotate through products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct(prev => (prev + 1) % products.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="collection" className="section bg-omnis-darkgray" ref={sectionRef}>
      <div className="container mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">OMNIS COLLECTION</h2>
          <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
          <p className="text-omnis-lightgray max-w-2xl mx-auto">
            Unveiling our Fall/Winter 2023 lineup. A meticulous blend of architectural silhouettes and progressive designs,
            crafted for those who demand excellence in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isActive={index === activeProduct}
              onMouseEnter={() => setActiveProduct(index)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            to="/collections" 
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
  const { gsap } = useGSAP();

  useEffect(() => {
    if (!imageRef.current) return;
    
    const image = imageRef.current.querySelector('img');
    if (!image) return;
    
    gsap.to(image, {
      scale: isActive ? 1.1 : 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isActive, gsap]);

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
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ filter: 'grayscale(100%)' }}
        />
        <div className="absolute inset-0 bg-omnis-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20">
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
