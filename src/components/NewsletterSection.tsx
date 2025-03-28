import { useRef } from 'react';
import { useGSAP } from '@/lib/gsap';
import { useToast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const { gsap } = useGSAP();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, [gsap]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const email = new FormData(form).get('email') as string;
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: `You've been added to our newsletter with ${email}`,
      });
      
      // Reset form
      form.reset();
    }, 1000);
  };
  
  return (
    <section className="py-20 md:py-32 bg-omnis-black" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center" data-gsap="newsletter">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">JOIN THE MOVEMENT</h2>
          <p className="text-omnis-lightgray mb-10 md:text-lg">
            Subscribe to our newsletter for exclusive early access to new releases, 
            behind-the-scenes content, and special offers.
          </p>
          
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input 
              type="email" 
              name="email"
              placeholder="Your email address" 
              required
              className="flex-grow px-4 py-3 bg-transparent border border-omnis-gray/30 focus:border-omnis-white focus:outline-none transition-colors text-omnis-white"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-omnis-white text-omnis-black font-medium hover:bg-omnis-lightgray transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
          
          <p className="mt-4 text-xs text-omnis-lightgray/70">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
