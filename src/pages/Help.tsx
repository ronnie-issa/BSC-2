
import { useEffect, useRef } from 'react';
import { useGSAP } from '@/lib/gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "How do I find my size?",
    answer: "Our sizing follows standard international measurements. Please refer to the size guide on each product page for specific measurements. If you're between sizes, we generally recommend sizing up for a more relaxed fit."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are securely processed and encrypted."
  },
  {
    question: "How long will shipping take?",
    answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on location and customs processing. Express shipping options are available at checkout for expedited delivery."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for customers in the United States. International returns are accepted but shipping costs are not refundable."
  },
  {
    question: "How do I care for my OMNIS garments?",
    answer: "Each item comes with specific care instructions on the label. Generally, we recommend gentle washing in cold water and hanging to dry to preserve the quality and fit of your garments. Avoid using bleach or harsh detergents."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location. Please note that international orders may be subject to import duties and taxes, which are the responsibility of the customer."
  },
  {
    question: "When will my order ship?",
    answer: "Orders are typically processed within 1-2 business days. Once shipped, you will receive a confirmation email with tracking information so you can monitor your delivery."
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "We aim to process orders quickly, so there is a limited window for modifications. Please contact customer service immediately if you need to change or cancel your order. Once an order has shipped, it cannot be canceled."
  }
];

const Help = () => {
  const { gsap } = useGSAP();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      
      // Content animation
      gsap.from('.animate-section', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
        }
      });
    });
    
    return () => ctx.revert();
  }, [gsap]);

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20" ref={contentRef}>
        <div className="container mx-auto px-6">
          <header ref={headerRef} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">HELP CENTER</h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Find answers to common questions about orders, shipping, returns, and product care. 
              If you need additional assistance, our customer service team is here to help.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2 animate-section">
              <h2 className="text-2xl font-bold mb-8 uppercase tracking-tight">FREQUENTLY ASKED QUESTIONS</h2>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-omnis-gray/20 pb-4">
                    <AccordionTrigger className="text-lg font-medium hover:text-omnis-lightgray transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-omnis-lightgray">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="animate-section">
              <div className="bg-omnis-darkgray p-8 border border-omnis-gray/20">
                <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">CONTACT US</h2>
                <p className="text-omnis-lightgray mb-6">
                  Can't find what you're looking for? Send us a message and our customer service team will get back to you within 24 hours.
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" className="bg-omnis-black border-omnis-gray focus:border-omnis-white" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" type="email" className="bg-omnis-black border-omnis-gray focus:border-omnis-white" />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <Input id="subject" className="bg-omnis-black border-omnis-gray focus:border-omnis-white" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="w-full bg-omnis-black border border-omnis-gray rounded-md p-3 focus:outline-none focus:border-omnis-white"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-omnis-white text-omnis-black hover:bg-omnis-lightgray">
                    SEND MESSAGE
                  </Button>
                </form>
              </div>
              
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Service Hours</h3>
                  <p className="text-omnis-lightgray">Monday - Friday: 9am - 6pm EST</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-omnis-lightgray">support@omnis.com</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Phone</h3>
                  <p className="text-omnis-lightgray">+1 (800) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-section text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">SHIPPING & DELIVERY</h2>
            <div className="text-omnis-lightgray space-y-4">
              <p>
                All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day.
              </p>
              <p>
                Domestic shipping options include Standard (3-5 business days) and Express (1-2 business days). 
                International shipping typically takes 7-14 business days, depending on the destination and customs processing.
              </p>
              <p>
                Free shipping is available for domestic orders over $150 and international orders over $300.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
