import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "@/lib/framer";
import { useSplitTextAnimation } from "@/lib/framer";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Heading animation with character staggering
  const headingAnimation = useSplitTextAnimation({
    stagger: 0.02,
    duration: 0.8,
  });

  // Subheading animation
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const subHeadingInView = useInView(subHeadingRef, { once: true });
  const subHeadingControls = useAnimation();

  // Simple state for scroll position
  const [scrollY, setScrollY] = useState(0);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Arrow animation
  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Trigger subheading animation when in view
  if (subHeadingInView) {
    subHeadingControls.start({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut",
      },
    });
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center pt-48"
      ref={heroRef}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        style={{
          transform: `translateY(${Math.min(scrollY * 0.2, 100)}px)`, // Simple parallax with max 100px
          backgroundImage: 'url("/images/hero/main-hero-bg.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(120%)",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-omnis-black via-omnis-black/70 to-omnis-black z-10" />

      <div className="container mx-auto px-6 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            ref={headingAnimation.containerRef}
            initial="hidden"
            animate="visible"
            variants={headingAnimation.containerVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter"
          >
            <motion.span
              variants={headingAnimation.childVariants}
              className="block"
            >
              TRUE IN FORM
            </motion.span>
          </motion.h1>

          <motion.p
            ref={subHeadingRef}
            initial={{ y: 20, opacity: 0 }}
            animate={subHeadingControls}
            className="text-omnis-lightgray text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
          >
            A high-end streetwear collection that blends minimalist design with
            uncompromising quality. For those who set their own standards.
          </motion.p>

          <div className="mt-16 flex justify-center">
            <Link
              to="/shop"
              className="inline-block border border-omnis-white px-8 py-4 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        variants={arrowVariants}
        animate="animate"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs font-light tracking-widest mb-2">SCROLL</span>
        <ArrowDown size={20} className="text-omnis-white" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
