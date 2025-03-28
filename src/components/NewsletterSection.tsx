
import { useState } from 'react';
import { useGSAPReveal } from '@/lib/gsap';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const titleRef = useGSAPReveal({ y: 30 });
  const formRef = useGSAPReveal({ y: 30, delay: 0.2 });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real app, this would send the email to a server
    console.log('Subscribing:', email);
    
    toast({
      title: "Subscription Successful",
      description: "Thank you for subscribing to the OMNIS newsletter.",
    });
    
    setEmail('');
  };

  return (
    <section id="contact" className="section bg-omnis-black">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div ref={titleRef}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">JOIN OUR WORLD</h2>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray mb-10">
              Subscribe to our newsletter to receive exclusive updates, early access to new releases, and invitations to private events.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} ref={formRef} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-transparent border-b border-omnis-gray px-4 py-3 focus:outline-none focus:border-omnis-white transition-colors"
                required
              />
              <button
                type="submit"
                className="border border-omnis-white px-8 py-3 text-sm font-medium tracking-widest hover:bg-omnis-white hover:text-omnis-black transition-all duration-300"
              >
                SUBSCRIBE
              </button>
            </div>
          </form>
          
          <div className="mt-16 flex justify-center space-x-6">
            <SocialLink href="#" label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </SocialLink>
            <SocialLink href="#" label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </SocialLink>
            <SocialLink href="#" label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </SocialLink>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const SocialLink = ({ href, label, children }: SocialLinkProps) => (
  <a 
    href={href} 
    aria-label={label}
    className="w-10 h-10 flex items-center justify-center rounded-full border border-omnis-gray text-omnis-lightgray hover:border-omnis-white hover:text-omnis-white transition-colors duration-300"
  >
    {children}
  </a>
);

export default NewsletterSection;
