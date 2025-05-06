import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  useRevealAnimation,
  useImageRevealAnimation,
  useTextMaskRevealAnimation,
} from "@/lib/framer";
import { LazyImage } from "@/components/ui/lazy-image";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const title = useRevealAnimation({ y: 50 });
  const image = useImageRevealAnimation();
  const textMask = useTextMaskRevealAnimation({ duration: 0.8 });

  return (
    <section id="about" className="section bg-omnis-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <motion.div
              ref={title.ref}
              initial={title.initial}
              animate={title.animate}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">
                THE VISION
              </h2>
              <div className="w-20 h-0.5 bg-omnis-white mb-8"></div>
            </motion.div>

            <div className="space-y-6 text-omnis-lightgray">
              <p>
                OMNIS was created with a singular vision in mind: to bridge the
                gap between high fashion and streetwear without compromise. Our
                pieces are defined by their minimalist approach, focusing on
                clean lines, perfect fits, and exceptional materials.
              </p>
              <p>
                In a world of excess, we choose restraint. In a market of
                trends, we choose timelessness. Each OMNIS garment is designed
                to be a statement piece in itself, requiring no additional
                embellishment.
              </p>
            </div>

            <motion.div
              ref={textMask.containerRef}
              initial="hidden"
              animate={textMask.controls}
              className="mt-10"
            >
              <motion.p
                variants={textMask.variants}
                className="text-2xl font-heading font-light italic mb-10"
              >
                "Simplicity is the ultimate sophistication."
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                to="/about"
                aria-label="Learn more about OMNIS brand philosophy and vision"
              >
                <Button
                  variant="outline"
                  className="mt-4 border-omnis-white text-omnis-white hover:bg-omnis-white hover:text-omnis-black transition-all duration-200 group h-12 px-6 py-3"
                >
                  LEARN MORE ABOUT US
                  <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2"
            ref={image.containerRef}
            initial="hidden"
            animate={image.controls}
          >
            <motion.div variants={image.variants} className="w-full">
              <LazyImage
                src="/images/about/designer-at-work.jpg"
                alt="OMNIS designer at work"
                imgClassName="w-full h-full object-cover"
                wrapperClassName="w-full"
                aspectRatio="4/3" // Appropriate aspect ratio for this image
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
