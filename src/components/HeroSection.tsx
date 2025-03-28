
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useGSAP, useSplitTextReveal, useParallax } from '@/lib/gsap';

const HeroSection = () => {
  const { gsap } = useGSAP();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useSplitTextReveal('.animate-heading', { y: 100, stagger: 0.02 });
  const subHeadingRef = useGSAPReveal({ y: 20, delay: 0.5 });
  const bgImageRef = useParallax({ speed: 0.1 });
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;

    gsap.to(arrowRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, [gsap]);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center" ref={heroRef}>
      {/* Background Image with Parallax */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1611316185995-9624c94487d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) contrast(120%)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-omnis-black via-omnis-black/70 to-omnis-black z-10" />
      
      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter"
          >
            <span className="animate-heading block">REDEFINE</span>
            <span className="animate-heading block">YOUR LIMITS</span>
          </h1>
          
          <p 
            ref={subHeadingRef} 
            className="text-omnis-lightgray text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            A high-end streetwear collection that blends minimalist design with uncompromising quality. For those who set their own standards.
          </p>
          
          <div className="mt-16 flex justify-center">
            <a 
              href="#collection" 
              className="inline-block border border-omnis-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div 
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs font-light tracking-widest mb-2">SCROLL</span>
        <ArrowDown size={20} className="text-omnis-white animate-bounce" />
      </div>
    </section>
  );
};

const useGSAPReveal = (
  options?: {
    delay?: number;
    y?: number;
    opacity?: number;
    duration?: number;
  }
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;

    const defaults = {
      delay: 0,
      y: 50,
      opacity: 0,
      duration: 0.8,
    };

    const mergedOptions = { ...defaults, ...options };
    
    const { gsap } = useGSAP();
    
    gsap.fromTo(
      element,
      {
        y: mergedOptions.y,
        opacity: mergedOptions.opacity,
      },
      {
        y: 0,
        opacity: 1,
        duration: mergedOptions.duration,
        delay: mergedOptions.delay,
        ease: "power2.out",
      }
    );
  }, [options]);

  return ref;
};

export default HeroSection;
