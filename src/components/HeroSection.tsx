
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useGSAP } from '@/lib/gsap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { gsap } = useGSAP();
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text animation for heading
      if (headingRef.current) {
        const spans = headingRef.current.querySelectorAll('.animate-heading');
        gsap.from(spans, {
          y: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Fade in subheading
      if (subHeadingRef.current) {
        gsap.from(subHeadingRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
        });
      }

      // Parallax effect for background
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          y: 100,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.1,
          }
        });
      }

      // Arrow bounce animation
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
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
            <Link 
              to="/collections" 
              className="inline-block border border-omnis-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
            >
              EXPLORE COLLECTION
            </Link>
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

export default HeroSection;
