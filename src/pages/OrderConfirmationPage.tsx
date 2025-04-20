import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Generate random order number

  // No need for manual scroll to top as ScrollToTop component handles it

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Order Confirmed
          </h1>
          <p className="text-lg text-omnis-lightgray mb-2">
            Thank you for your purchase!
          </p>
          <p className="text-omnis-lightgray mb-8">
            Your order #{orderNumber} has been confirmed and will be shipped
            soon.
          </p>

          <div className="bg-omnis-darkgray p-8 mb-8 text-left">
            <h2 className="text-xl font-medium mb-4">What's Next?</h2>
            <ul className="space-y-3 text-omnis-lightgray">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 mr-2">
                  1
                </span>
                <span>
                  You'll receive an email confirmation with your order details
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 mr-2">
                  2
                </span>
                <span>Our team will prepare your order for shipment</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 mr-2">
                  3
                </span>
                <span>Once shipped, you'll receive tracking information</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700 mr-2">
                  4
                </span>
                <span>
                  Delivery will be made within the estimated timeframe
                </span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              variant="outline"
              className="border-omnis-black text-omnis-black hover:bg-omnis-black hover:text-white"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </Button>
            <Button
              className="bg-omnis-black text-white hover:bg-omnis-gray"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
