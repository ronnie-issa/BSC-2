import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
  Variants,
  UseInViewOptions
} from "framer-motion";

// Common animation variants
export const fadeIn = (
  delay: number = 0,
  duration: number = 0.8
): Variants => ({
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

export const staggerChildren = (
  staggerTime: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren
    }
  }
});

export const textReveal = (
  delay: number = 0,
  duration: number = 0.8
): Variants => ({
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      delay,
      duration,
      ease: "easeInOut"
    }
  }
});

export const imageReveal = (
  delay: number = 0,
  duration: number = 0.8
): Variants => ({
  hidden: {
    scale: 1.2,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut"
    }
  }
});

// Hook to replace useGSAPReveal
export const useRevealAnimation = (
  options?: {
    delay?: number;
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
  }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const defaults = {
    delay: 0,
    y: 50,
    x: 0,
    opacity: 0,
    duration: 0.8,
    threshold: 0.2,
    once: true,
  };

  const mergedOptions = { ...defaults, ...options };

  const inView = useInView(ref, {
    amount: mergedOptions.threshold, // Using amount instead of threshold
    once: mergedOptions.once,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration: mergedOptions.duration,
          delay: mergedOptions.delay,
          ease: "easeOut",
        },
      });
    }
  }, [controls, inView, mergedOptions]);

  return {
    ref,
    controls,
    initial: {
      y: mergedOptions.y,
      x: mergedOptions.x,
      opacity: mergedOptions.opacity,
    },
    animate: controls,
  };
};

// Hook to replace useImageReveal
export const useImageRevealAnimation = (
  options?: {
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const defaults = {
    delay: 0,
    duration: 0.8,
    threshold: 0.2,
    once: true,
  };

  const mergedOptions = { ...defaults, ...options };

  const inView = useInView(containerRef, {
    amount: mergedOptions.threshold, // Using amount instead of threshold
    once: mergedOptions.once,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return {
    containerRef,
    controls,
    variants: {
      hidden: {
        scale: 1.2,
        opacity: 0,
      },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: mergedOptions.duration,
          delay: mergedOptions.delay,
          ease: "easeOut",
        },
      },
    },
  };
};

// Hook to replace useTextMaskReveal
export const useTextMaskRevealAnimation = (
  options?: {
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const defaults = {
    delay: 0,
    duration: 1,
    threshold: 0.2,
    once: true,
  };

  const mergedOptions = { ...defaults, ...options };

  const inView = useInView(containerRef, {
    amount: mergedOptions.threshold, // Using amount instead of threshold
    once: mergedOptions.once,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return {
    containerRef,
    controls,
    variants: {
      hidden: {
        clipPath: "inset(0 100% 0 0)",
      },
      visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: {
          duration: mergedOptions.duration,
          delay: mergedOptions.delay,
          ease: "easeInOut",
        },
      },
    },
  };
};

// Hook for parallax scrolling (to replace ScrollTrigger)
export const useParallaxScroll = (
  options?: {
    yRange?: [number, number];
    xRange?: [number, number];
    opacityRange?: [number, number];
    scaleRange?: [number, number];
    initialY?: number; // Added initialY option
  }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const defaults = {
    yRange: [0, 0],
    xRange: [0, 0],
    opacityRange: [1, 1],
    scaleRange: [1, 1],
    initialY: 0, // Default initial Y value is 0
  };

  const mergedOptions = { ...defaults, ...options };

  // Create transform for y-axis
  const y = useTransform(scrollYProgress, [0, 1], mergedOptions.yRange);

  // If initialY is provided and not 0, we need to handle it separately
  // since useTransform doesn't support initial value
  const x = useTransform(scrollYProgress, [0, 1], mergedOptions.xRange);
  const opacity = useTransform(scrollYProgress, [0, 1], mergedOptions.opacityRange);
  const scale = useTransform(scrollYProgress, [0, 1], mergedOptions.scaleRange);

  // Create a style object that respects initialY if provided
  const style = {
    y,
    x,
    opacity,
    scale,
  };

  return {
    ref,
    style,
    // Expose initialY so components can use it if needed
    initialY: mergedOptions.initialY,
  };
};

// Hook for character-by-character text animation
export const useSplitTextAnimation = (
  options?: {
    delay?: number;
    stagger?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const defaults = {
    delay: 0,
    stagger: 0.02,
    duration: 0.8,
    threshold: 0.2,
    once: true,
  };

  const mergedOptions = { ...defaults, ...options };

  const inView = useInView(containerRef, {
    amount: mergedOptions.threshold, // Using amount instead of threshold
    once: mergedOptions.once,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return {
    containerRef,
    controls,
    childVariants: {
      hidden: {
        y: 100,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: mergedOptions.duration,
          ease: "easeOut",
        },
      },
    },
    containerVariants: {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: mergedOptions.stagger,
          delayChildren: mergedOptions.delay,
        },
      },
    },
  };
};

// Export motion components for easy access
export {
  motion,
  AnimatePresence,
  useInView,
  useAnimation,
  useScroll,
  useTransform
};
