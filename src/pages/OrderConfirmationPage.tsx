import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "@/lib/framer";
import { useEffect, useState } from "react";
import { sendOrderConfirmationEmail } from "@/services/resend";
import { Product } from "@/contexts/ProductContext";
import { Icon } from "@/components/ui/icon";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`; // Generate random order number
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get customer information from localStorage if available
  const getCustomerInfo = () => {
    try {
      const storedInfo = localStorage.getItem("customerInfo");
      return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
      console.error("Error retrieving customer info:", error);
      return null;
    }
  };

  // Get ordered products from localStorage
  const getOrderedProducts = (): (Product & {
    selectedColor: string;
    selectedSize: string;
    quantity: number;
    selectedImage?: string;
  })[] => {
    try {
      // First try to get from the new orderedProducts key
      const storedOrderedProducts = localStorage.getItem("orderedProducts");
      if (storedOrderedProducts) {
        return JSON.parse(storedOrderedProducts);
      }

      // Fallback to the cart if orderedProducts is not available
      const storedCart = localStorage.getItem("omnisCart");
      if (storedCart) {
        const cartItems = JSON.parse(storedCart);
        // Transform cart items to the format expected by the email function
        return cartItems.map((item: any) => ({
          id: item.product.id,
          slug: item.product.slug,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          description: item.product.description,
          variations: item.product.variations,
          colors: item.product.colors,
          sizes: item.product.sizes,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          quantity: item.quantity,
          selectedImage: item.selectedImage,
        }));
      }
      return [];
    } catch (error) {
      console.error("Error retrieving ordered products:", error);
      return [];
    }
  };

  const customerInfo = getCustomerInfo();

  // Send order confirmation email when the page loads
  useEffect(() => {
    if (!emailSent) {
      const sendEmail = async () => {
        try {
          // Use customer info if available, otherwise use default values
          const email = customerInfo?.email || "customer@example.com";
          const name = customerInfo?.fullName || "Valued Customer";
          const shippingAddress = customerInfo
            ? `${customerInfo.fullName}\n${customerInfo.address}\n${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}\n${customerInfo.phone}`
            : "John Doe\n123 Fashion Street\nBeirut, Lebanon\n+961 81 386 697";

          // Get ordered products
          const products = getOrderedProducts();

          // Calculate total from actual products
          const total = products.reduce(
            (sum: number, product: Product & { quantity?: number }) =>
              sum + product.price * (product.quantity || 1),
            0
          );

          const result = await sendOrderConfirmationEmail(
            email,
            name,
            orderNumber,
            products,
            total,
            shippingAddress
          );

          setEmailSent(true);

          if (result.success) {
            console.log("Order confirmation email sent successfully");
          } else {
            console.error(
              "Failed to send order confirmation email:",
              result.error
            );
          }
        } catch (error) {
          console.error("Error sending order confirmation email:", error);
        }
      };

      sendEmail();
    }
  }, [emailSent, orderNumber]);

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
              <div className="h-16 w-16 bg-omnis-black border border-white rounded-full flex items-center justify-center">
                <Icon icon={Check} className="h-8 w-8 text-white" />
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
                  <div className="flex-shrink-0 mr-4 bg-omnis-black border border-white h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-white">01</span>
                  </div>
                  <div>
                    <p className="text-white">Email Confirmation</p>
                    <p className="text-omnis-lightgray text-sm">
                      You'll receive an email with your order details
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-omnis-black border border-white h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-white">02</span>
                  </div>
                  <div>
                    <p className="text-white">Order Processing</p>
                    <p className="text-omnis-lightgray text-sm">
                      Our team will prepare your items for shipment
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-omnis-black border border-white h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-white">03</span>
                  </div>
                  <div>
                    <p className="text-white">Shipping Confirmation</p>
                    <p className="text-omnis-lightgray text-sm">
                      You'll receive tracking information once shipped
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 bg-omnis-black border border-white h-8 w-8 flex items-center justify-center">
                    <span className="text-sm text-white">04</span>
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
                {getOrderedProducts().map((item, index) => {
                  const colorName =
                    item.colors.find((c) => c.value === item.selectedColor)
                      ?.name || "Default";
                  return (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex border-b border-white/10 pb-2"
                    >
                      <div className="w-10 h-10 bg-omnis-darkgray flex-shrink-0 mr-3">
                        {(item.selectedImage || item.image) && (
                          <img
                            src={item.selectedImage || item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="text-white">{item.name}</p>
                        <p className="text-omnis-lightgray text-xs">
                          {colorName} · Size {item.selectedSize.toUpperCase()} ·
                          Qty: {item.quantity}
                        </p>
                        <p className="text-white text-xs mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {getOrderedProducts().length === 0 && (
                  <div className="text-omnis-lightgray">
                    No items in order. This may be a test or there was an issue
                    retrieving your order.
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between pb-3 mt-2 mb-6 text-sm border-b border-white/20">
                <span className="font-bold text-white">Total</span>
                <span className="text-white font-bold">
                  $
                  {getOrderedProducts()
                    .reduce(
                      (sum: number, product: Product & { quantity?: number }) =>
                        sum + product.price * (product.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              {/* Shipping Address */}
              <h3 className="text-sm font-bold mt-4 mb-2 uppercase tracking-wider">
                Shipping Address
              </h3>
              <div className="text-omnis-lightgray text-sm">
                {customerInfo ? (
                  <>
                    <p className="text-white">{customerInfo.fullName}</p>
                    <p>{customerInfo.address}</p>
                    <p>
                      {customerInfo.city}, {customerInfo.state}{" "}
                      {customerInfo.zipCode}
                    </p>
                    <p>{customerInfo.phone}</p>
                  </>
                ) : (
                  <>
                    <p className="text-white">John Doe</p>
                    <p>123 Fashion Street</p>
                    <p>Beirut, Lebanon</p>
                    <p>+961 81 386 697</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Continue shopping button */}
          <div className="text-center mt-8">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate("/shop")}
            >
              <span className="mr-2">CONTINUE SHOPPING</span>
              <Icon icon={ArrowRight} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
