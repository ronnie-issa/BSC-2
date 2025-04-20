
/**
 * GSAP to Framer Motion Migration
 *
 * This file is a compatibility layer that redirects all GSAP hooks to their Framer Motion equivalents.
 * It allows for a gradual migration without breaking existing code.
 */

import {
  useRevealAnimation,
  useImageRevealAnimation,
  useTextMaskRevealAnimation,
  useParallaxScroll,
  useSplitTextAnimation,
  motion
} from './framer';

// Redirect GSAP hooks to Framer Motion equivalents
export const useGSAPReveal = useRevealAnimation;
export const useImageReveal = useImageRevealAnimation;
export const useTextMaskReveal = useTextMaskRevealAnimation;
export const useParallax = useParallaxScroll;
export const useSplitTextReveal = useSplitTextAnimation;

// Mock GSAP API for compatibility
export const useGSAP = () => {
  console.warn('GSAP has been replaced with Framer Motion. Please update your code to use the new API.');

  return {
    gsap: {
      from: () => ({}),
      to: () => ({}),
      set: () => ({}),
      timeline: () => ({
        from: () => ({}),
        to: () => ({})
      }),
      context: (fn: Function) => {
        fn();
        return { revert: () => ({}) };
      },
      fromTo: () => ({})
    },
    ScrollTrigger: {}
  };
};
