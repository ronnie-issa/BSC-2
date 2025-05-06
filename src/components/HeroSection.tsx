import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/framer";
import { useSplitTextAnimation } from "@/lib/framer";
import { Icon } from "@/components/ui/icon";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Heading animation with character staggering
  const headingAnimation = useSplitTextAnimation({
    stagger: 0.02,
    duration: 0.8,
  });

  // Removed complex subheading animation

  // Removed scroll position tracking

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

  // Removed subheading animation trigger

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center pt-52 md:pt-60"
      ref={heroRef}
    >
      {/* Background Image with Parallax */}
      {/* <motion.div
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
      /> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-omnis-black via-omnis-black/70 to-omnis-black z-10" />

      <div className="container mx-auto relative z-20 pt-10 md:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            ref={headingAnimation.containerRef}
            initial="hidden"
            animate="visible"
            variants={headingAnimation.containerVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight tracking-custom"
          >
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <motion.span
                variants={headingAnimation.childVariants}
                className="block"
              >
                TRUE
              </motion.span>
              <motion.span
                variants={headingAnimation.childVariants}
                className="block"
              >
                IN
              </motion.span>
              <motion.span
                variants={headingAnimation.childVariants}
                className="block"
              >
                FORM
              </motion.span>
            </div>
          </motion.h1>

          <p className="text-omnis-lightgray text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            A high-end clothing brand
            <br />
            Minimalist approach, focusing on clean lines, perfect fits, and
            exceptional materials.
          </p>

          <div className="mt-16 flex justify-center">
            <Link
              to="/shop"
              className="inline-block border border-omnis-white h-12 px-6 py-3 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
              aria-label="Explore our collection of premium streetwear"
            >
              EXPLORE COLLECTION
            </Link>
          </div>

          {/* Scroll Down Indicator - Shown in content flow on mobile */}
          <div className="mt-8 mb-20 flex justify-center md:hidden">
            <motion.div
              variants={arrowVariants}
              animate="animate"
              className="flex flex-col items-center relative z-30"
              role="button"
              aria-label="Scroll down to see more content"
              tabIndex={0}
              onClick={() =>
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <span className="text-xs font-light tracking-widest mb-2">
                SCROLL
              </span>
              <Icon icon={ArrowDown} size={20} className="text-omnis-white" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - Only shown at bottom on desktop */}
      <motion.div
        variants={arrowVariants}
        animate="animate"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:flex flex-col items-center -ml-7"
        role="button"
        aria-label="Scroll down to see more content"
        tabIndex={0}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }
        }}
      >
        <span className="text-xs font-light tracking-widest mb-2">SCROLL</span>
        <Icon icon={ArrowDown} size={20} className="text-omnis-white" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
