
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPReveal = (
  options?: {
    delay?: number;
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    scrollTrigger?: boolean;
    trigger?: string;
    start?: string;
  }
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    
    if (!element) return;

    const defaults = {
      delay: 0,
      y: 50,
      x: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: true,
      trigger: element,
      start: "top 80%",
    };

    const mergedOptions = { ...defaults, ...options };
    
    const animationProps = {
      y: 0,
      x: 0,
      opacity: 1,
      duration: mergedOptions.duration,
      delay: mergedOptions.delay,
      stagger: mergedOptions.stagger,
      ease: "power2.out",
    };

    let ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: mergedOptions.scrollTrigger ? {
          trigger: mergedOptions.trigger,
          start: mergedOptions.start,
        } : null,
      });

      timeline.from(element, {
        y: mergedOptions.y,
        x: mergedOptions.x,
        opacity: mergedOptions.opacity,
        ...animationProps
      });
    });

    return () => {
      ctx.revert();
    };
  }, [options]);

  return ref;
};

export const useSplitTextReveal = (
  selector: string,
  options?: {
    delay?: number;
    y?: number;
    stagger?: number;
    duration?: number;
    scrollTrigger?: boolean;
    start?: string;
    trigger?: string | HTMLElement;
  }
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaults = {
      delay: 0.2,
      y: 100,
      stagger: 0.05,
      duration: 1,
      scrollTrigger: true,
      start: "top 80%",
      trigger: element,
    };

    const mergedOptions = { ...defaults, ...options };
    
    const elements = element.querySelectorAll(selector);
    if (!elements.length) return;

    let ctx = gsap.context(() => {
      elements.forEach((textElement) => {
        // Split text into characters
        const characters = textElement.textContent?.split('') || [];
        textElement.textContent = '';
        
        // Create spans for each character
        characters.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          textElement.appendChild(span);
        });

        // Animate characters
        gsap.to(textElement.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          duration: mergedOptions.duration,
          stagger: mergedOptions.stagger,
          ease: "power3.out",
          delay: mergedOptions.delay,
          scrollTrigger: mergedOptions.scrollTrigger ? {
            trigger: mergedOptions.trigger,
            start: mergedOptions.start,
          } : null,
        });
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [selector, options]);

  return ref;
};

export const useParallax = (
  options?: {
    speed?: number,
    direction?: 'vertical' | 'horizontal',
    start?: string,
    end?: string,
  }
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaults = {
      speed: 0.3,
      direction: 'vertical',
      start: 'top bottom',
      end: 'bottom top',
    };

    const mergedOptions = { ...defaults, ...options } as typeof defaults;
    
    let parallaxTween: gsap.core.Tween;
    
    const ctx = gsap.context(() => {
      parallaxTween = gsap.fromTo(
        element,
        {
          y: mergedOptions.direction === 'vertical' ? -100 * mergedOptions.speed : 0,
          x: mergedOptions.direction === 'horizontal' ? -100 * mergedOptions.speed : 0,
        },
        {
          y: mergedOptions.direction === 'vertical' ? 100 * mergedOptions.speed : 0,
          x: mergedOptions.direction === 'horizontal' ? 100 * mergedOptions.speed : 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: mergedOptions.start,
            end: mergedOptions.end,
            scrub: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [options]);

  return ref;
};

export const useImageReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const image = container.querySelector('img');
    if (!image) return;
    
    let ctx = gsap.context(() => {
      // Set initial styles
      gsap.set(container, { 
        position: 'relative',
        overflow: 'hidden',
      });
      
      gsap.set(image, { 
        scale: 1.2,
        opacity: 0,
      });
      
      // Create overlay element
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = '#1A1A1A';
      overlay.style.transformOrigin = 'left';
      container.appendChild(overlay);
      
      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
        }
      });
      
      tl.to(overlay, {
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .to(image, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.3');
    });
    
    return () => {
      ctx.revert();
    };
  }, []);
  
  return containerRef;
};

export const useTextMaskReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let ctx = gsap.context(() => {
      const textElements = container.querySelectorAll('.mask-text');
      
      textElements.forEach((text) => {
        // Set initial styles
        gsap.set(text, { 
          clipPath: 'inset(0 100% 0 0)',
        });
        
        // Create animation
        gsap.to(text, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
          }
        });
      });
    });
    
    return () => {
      ctx.revert();
    };
  }, []);
  
  return containerRef;
};

export const useGSAP = () => {
  return {
    gsap,
    ScrollTrigger,
  };
};
