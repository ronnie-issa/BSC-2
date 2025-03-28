
import { useRef } from 'react';
import { useGSAPReveal, useImageReveal, useTextMaskReveal } from '@/lib/gsap';

const AboutSection = () => {
  const titleRef = useGSAPReveal({ y: 50 });
  const textRef = useGSAPReveal({ y: 50, delay: 0.2 });
  const imageRef = useImageReveal();
  const textMaskRef = useTextMaskReveal();

  return (
    <section id="about" className="section bg-omnis-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div ref={titleRef}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">THE VISION</h2>
              <div className="w-20 h-0.5 bg-omnis-white mb-8"></div>
            </div>
            
            <div ref={textRef} className="space-y-6 text-omnis-lightgray">
              <p>
                OMNIS was created with a singular vision in mind: to bridge the gap between high fashion and streetwear without compromise. 
                Our pieces are defined by their minimalist approach, focusing on clean lines, perfect fits, and exceptional materials.
              </p>
              <p>
                In a world of excess, we choose restraint. In a market of trends, we choose timelessness. 
                Each OMNIS garment is designed to be a statement piece in itself, requiring no additional embellishment.
              </p>
            </div>

            <div ref={textMaskRef} className="mt-10">
              <p className="mask-text text-2xl font-heading font-light italic">
                "Simplicity is the ultimate sophistication."
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2" ref={imageRef}>
            <img 
              src="https://images.unsplash.com/photo-1517502166878-35c93a0072f0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="OMNIS designer at work" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
