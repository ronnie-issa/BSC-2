import { useRef } from "react";
import { motion } from "framer-motion";
import {
  useRevealAnimation,
  useImageRevealAnimation,
  useTextMaskRevealAnimation,
} from "@/lib/framer";

const AboutSection = () => {
  const title = useRevealAnimation({ y: 50 });
  const text = useRevealAnimation({ y: 50, delay: 0.2 });
  const image = useImageRevealAnimation();
  const textMask = useTextMaskRevealAnimation();

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

            <motion.div
              ref={text.ref}
              initial={text.initial}
              animate={text.animate}
              className="space-y-6 text-omnis-lightgray"
            >
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
            </motion.div>

            <motion.div
              ref={textMask.containerRef}
              initial="hidden"
              animate={textMask.controls}
              className="mt-10"
            >
              <motion.p
                variants={textMask.variants}
                className="text-2xl font-heading font-light italic"
              >
                "Simplicity is the ultimate sophistication."
              </motion.p>
            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2"
            ref={image.containerRef}
            initial="hidden"
            animate={image.controls}
          >
            <motion.img
              variants={image.variants}
              src="https://images.unsplash.com/photo-1517502166878-35c93a0072f0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="OMNIS designer at work"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
