import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { motion, useInView } from "@/lib/framer";

const Shipping = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto" ref={contentRef}>
          <motion.header
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              SHIPPING
            </h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Information about our shipping policies, delivery times, and
              available options.
            </p>
          </motion.header>

          <div className="max-w-3xl mx-auto space-y-12">
            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
              <div className="border-l-2 border-omnis-white pl-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Standard Shipping
                  </h3>
                  <p className="text-omnis-lightgray mb-2">
                    7-10 business days
                  </p>
                  <p className="text-omnis-lightgray">
                    Free for orders over $200, otherwise $15
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">Express Shipping</h3>
                  <p className="text-omnis-lightgray mb-2">2-3 business days</p>
                  <p className="text-omnis-lightgray">$25</p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Next Day Delivery
                  </h3>
                  <p className="text-omnis-lightgray mb-2">
                    Next business day (order before 12pm)
                  </p>
                  <p className="text-omnis-lightgray">$35</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-4">
                International Shipping
              </h2>
              <p className="text-omnis-lightgray mb-4">
                We currently ship to over 40 countries worldwide. International
                shipping times vary by destination:
              </p>
              <ul className="border-l-2 border-omnis-white pl-6 space-y-3 text-omnis-lightgray">
                <li>Europe: 10-15 business days</li>
                <li>Asia: 12-18 business days</li>
                <li>Australia: 14-20 business days</li>
                <li>Rest of World: 15-25 business days</li>
              </ul>
              <p className="mt-4 text-omnis-lightgray">
                Please note that customs duties and taxes are not included in
                the shipping cost and are the responsibility of the customer.
              </p>
            </motion.section>

            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-omnis-lightgray mb-4">
                Once your order has been shipped, you will receive a
                confirmation email with a tracking number. You can use this
                number to track your package through our shipping partner's
                website.
              </p>
              <p className="text-omnis-lightgray">
                For any questions regarding your shipment, please contact our
                customer service team at support@omnisclothing.net.
              </p>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
