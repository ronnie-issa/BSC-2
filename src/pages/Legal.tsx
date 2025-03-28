
import { useEffect, useRef } from 'react';
import { useGSAP } from '@/lib/gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Legal = () => {
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
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">LEGAL & POLICIES</h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Information regarding our terms of service, privacy practices, and other policies.
              We are committed to transparency and protecting your rights as our customer.
            </p>
          </header>
          
          <div className="max-w-4xl mx-auto animate-section">
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="w-full justify-center mb-12 bg-transparent border-b border-omnis-gray/20">
                <TabsTrigger 
                  value="terms"
                  className="text-sm md:text-base px-6 py-3 data-[state=active]:text-omnis-white data-[state=active]:border-b-2 data-[state=active]:border-omnis-white text-omnis-lightgray rounded-none transition-colors"
                >
                  Terms of Service
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy"
                  className="text-sm md:text-base px-6 py-3 data-[state=active]:text-omnis-white data-[state=active]:border-b-2 data-[state=active]:border-omnis-white text-omnis-lightgray rounded-none transition-colors"
                >
                  Privacy Policy
                </TabsTrigger>
                <TabsTrigger 
                  value="returns"
                  className="text-sm md:text-base px-6 py-3 data-[state=active]:text-omnis-white data-[state=active]:border-b-2 data-[state=active]:border-omnis-white text-omnis-lightgray rounded-none transition-colors"
                >
                  Return Policy
                </TabsTrigger>
                <TabsTrigger 
                  value="accessibility"
                  className="text-sm md:text-base px-6 py-3 data-[state=active]:text-omnis-white data-[state=active]:border-b-2 data-[state=active]:border-omnis-white text-omnis-lightgray rounded-none transition-colors"
                >
                  Accessibility
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="terms" className="text-omnis-lightgray space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">1. Introduction</h2>
                  <p>
                    Welcome to OMNIS. By accessing or using our website, mobile application, or any of our services, you agree to be bound by these Terms of Service. Please read these terms carefully before making a purchase or using our services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">2. Account Registration</h2>
                  <p>
                    When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">3. Purchases and Payment</h2>
                  <p>
                    All prices are listed in USD unless otherwise specified. Prices are subject to change without notice. By making a purchase, you agree to pay the specified amount in full. We accept various payment methods as indicated during checkout.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">4. Shipping and Delivery</h2>
                  <p>
                    We ship to the locations listed on our Shipping Information page. Delivery times are estimates and not guaranteed. OMNIS is not responsible for delays due to customs, weather, or other factors beyond our control.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">5. Intellectual Property</h2>
                  <p>
                    All content on our website, including text, graphics, logos, button icons, images, audio clips, digital downloads, and data compilations, is the property of OMNIS or its content suppliers and is protected by international copyright laws.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">6. Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by law, OMNIS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising out of or relating to your use of our services.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">7. Governing Law</h2>
                  <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">8. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the modified terms.
                  </p>
                </section>
                
                <p className="text-sm italic mt-8">
                  Last updated: March 28, 2025
                </p>
              </TabsContent>
              
              <TabsContent value="privacy" className="text-omnis-lightgray space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">1. Information We Collect</h2>
                  <p>
                    We collect various types of information, including personal information (such as name, email address, shipping address, and payment information) and non-personal information (such as browser type, IP address, and device information).
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">2. How We Use Your Information</h2>
                  <p>
                    We use the information we collect to process transactions, provide and improve our services, communicate with you, and comply with legal obligations. We may also use your information for marketing purposes, but you can opt out at any time.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">3. Information Sharing</h2>
                  <p>
                    We do not sell your personal information to third parties. We may share your information with service providers who assist us in operating our business, as required by law, or with your consent.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">4. Cookies and Tracking Technologies</h2>
                  <p>
                    We use cookies and similar technologies to enhance your experience on our website, analyze usage patterns, and deliver personalized content. You can control cookies through your browser settings.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">5. Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">6. Your Rights</h2>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, delete, or restrict processing of your data. To exercise these rights, please contact us using the information below.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">7. Changes to Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">8. Contact Us</h2>
                  <p>
                    If you have any questions about our Privacy Policy, please contact us at privacy@omnis.com.
                  </p>
                </section>
                
                <p className="text-sm italic mt-8">
                  Last updated: March 28, 2025
                </p>
              </TabsContent>
              
              <TabsContent value="returns" className="text-omnis-lightgray space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">1. Return Eligibility</h2>
                  <p>
                    Items must be returned within 30 days of the delivery date. All items must be unworn, unwashed, and in their original condition with all tags attached. Items marked as "Final Sale" are not eligible for return or exchange.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">2. Return Process</h2>
                  <p>
                    To initiate a return, please log into your account and follow the return instructions, or contact our customer service team. You will receive a return authorization and shipping instructions.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">3. Refunds</h2>
                  <p>
                    Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If approved, your refund will be processed to the original method of payment within 10 business days.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">4. Exchanges</h2>
                  <p>
                    We do not process direct exchanges. If you wish to exchange an item, please return it for a refund and place a new order for the desired item. This ensures that the item you want is still in stock.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">5. Return Shipping</h2>
                  <p>
                    Customers in the United States receive a free return shipping label. International customers are responsible for return shipping costs and any customs duties or taxes incurred during the return process.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">6. Damaged or Defective Items</h2>
                  <p>
                    If you receive a damaged or defective item, please contact our customer service team within 7 days of receiving your order. We will provide instructions for returning the item and will cover all shipping costs for exchanges or returns in this case.
                  </p>
                </section>
                
                <p className="text-sm italic mt-8">
                  Last updated: March 28, 2025
                </p>
              </TabsContent>
              
              <TabsContent value="accessibility" className="text-omnis-lightgray space-y-6">
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">Accessibility Statement</h2>
                  <p>
                    OMNIS is committed to making our website accessible to all users, including those with disabilities. We are continuously working to improve the accessibility of our website to ensure we provide equal access to all of our customers.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">Accessibility Standards</h2>
                  <p>
                    We strive to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines 2.1. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">Assistive Technology</h2>
                  <p>
                    Our website is designed to be compatible with the following assistive technologies:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Screen readers</li>
                    <li>Text enlargement tools</li>
                    <li>Speech recognition software</li>
                    <li>Keyboard-only navigation</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold text-omnis-white mb-4">Feedback</h2>
                  <p>
                    We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers or have suggestions for improvement, please contact us at accessibility@omnis.com. We are committed to addressing accessibility concerns promptly.
                  </p>
                </section>
                
                <p className="text-sm italic mt-8">
                  Last updated: March 28, 2025
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Legal;
