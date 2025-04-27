import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "@/lib/framer";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Generate random order number
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <motion.div
        className="container mx-auto px-6 py-16 md:py-32 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Top section with order confirmation */}
          <div className="border-b border-white/10 pb-12 mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="h-16 w-16 bg-white border border-omnis-black flex items-center justify-center">
                <Check className="h-8 w-8 text-omnis-black" strokeWidth={1.5} />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                ORDER CONFIRMED
              </h1>
              <div className="w-16 h-px bg-white mx-auto mb-6"></div>
              <p className="text-lg text-omnis-lightgray mb-2">
                Thank you for your purchase
              </p>
              <p className="text-omnis-lightgray mb-4">
                Your order has been confirmed and will be shipped soon
              </p>
            </div>
          </div>

          {/* Order details section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-xl font-bold mb-6 uppercase tracking-wider">
                What's Next
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-white border border-omnis-black h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-omnis-black">01</span>
                  </div>
                  <div>
                    <p className="text-white">Email Confirmation</p>
                    <p className="text-omnis-lightgray text-sm">
                      You'll receive an email with your order details
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-white border border-omnis-black h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-omnis-black">02</span>
                  </div>
                  <div>
                    <p className="text-white">Order Processing</p>
                    <p className="text-omnis-lightgray text-sm">
                      Our team will prepare your items for shipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-white border border-omnis-black h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-omnis-black">03</span>
                  </div>
                  <div>
                    <p className="text-white">Shipping Confirmation</p>
                    <p className="text-omnis-lightgray text-sm">
                      You'll receive tracking information once shipped
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-white border border-omnis-black h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-omnis-black">04</span>
                  </div>
                  <div>
                    <p className="text-white">Delivery</p>
                    <p className="text-omnis-lightgray text-sm">
                      Estimated delivery: 2-4 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">
                Order Details
              </h2>
              <div className="space-y-2 text-omnis-lightgray text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Order Number</span>
                  <span className="text-white">{orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Date</span>
                  <span className="text-white">{orderDate}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Payment Method</span>
                  <span className="text-white">Cash on Delivery</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span>Shipping Method</span>
                  <span className="text-white">Premium Express</span>
                </div>
              </div>

              {/* Purchased Items */}
              <h3 className="text-sm font-bold mt-6 mb-2 uppercase tracking-wider">
                Items Purchased
              </h3>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex border-b border-white/10 pb-2">
                  <div className="w-10 h-10 bg-omnis-darkgray flex-shrink-0 mr-3">
                    {/* Product image would go here */}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white">OMNIS X T-Shirt</p>
                    <p className="text-omnis-lightgray text-xs">
                      Black · Size M · Qty: 1
                    </p>
                    <p className="text-white text-xs mt-1">$120.00</p>
                  </div>
                </div>

                <div className="flex border-b border-white/10 pb-2">
                  <div className="w-10 h-10 bg-omnis-darkgray flex-shrink-0 mr-3">
                    {/* Product image would go here */}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white">OMNIS Hoodie</p>
                    <p className="text-omnis-lightgray text-xs">
                      White · Size L · Qty: 1
                    </p>
                    <p className="text-white text-xs mt-1">$120.00</p>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between pb-3 mt-2 mb-6 text-sm border-b border-white/20">
                <span className="font-bold text-white">Total</span>
                <span className="text-white font-bold">$240.00</span>
              </div>

              {/* Shipping Address */}
              <h3 className="text-sm font-bold mt-4 mb-2 uppercase tracking-wider">
                Shipping Address
              </h3>
              <div className="text-omnis-lightgray text-sm">
                <p className="text-white">John Doe</p>
                <p>123 Fashion Street</p>
                <p>Beirut, Lebanon</p>
                <p>+961 81 386 697</p>
              </div>
            </div>
          </div>

          {/* Continue shopping button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-omnis-black text-omnis-black hover:bg-omnis-black hover:text-white transition-all duration-300"
              onClick={() => navigate("/shop")}
            >
              <span className="mr-2">CONTINUE SHOPPING</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
