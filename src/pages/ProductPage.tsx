import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  MessageSquare,
  ShoppingBag,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useProductContext } from "@/contexts/ProductContext";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useProductContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].value);
    }
    // No need to scroll to top here as ScrollToTop component handles it
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToBag = () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
        duration: 7000, // 7 seconds
      });
      return;
    }

    addToCart(product, quantity, selectedColor);

    // Show success toast without redirecting
    toast({
      title: "Added to bag",
      description: `${quantity} x ${product.name} has been added to your bag`,
      action: (
        <ToastAction altText="View Bag" onClick={() => navigate("/bag")}>
          View Bag
        </ToastAction>
      ),
      duration: 7000, // Show toast for 7 seconds
      variant: "success",
      icon: <Check className="h-4 w-4 text-green-600" />,
    });

    // Don't navigate away from the product page
  };

  const handleBuyViaWhatsApp = () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
        duration: 7000, // 7 seconds
      });
      return;
    }

    // Get the color name from the selected color value
    const colorName =
      product.colors.find((c) => c.value === selectedColor)?.name || "Default";

    // Create the WhatsApp message with product details
    // Using standard line breaks instead of escaped \n for better compatibility
    const message =
      "Hello, I'm interested in purchasing:\n\n" +
      "Product: " +
      product.name +
      "\n" +
      "Quantity: " +
      quantity +
      "\n" +
      "Color: " +
      colorName +
      "\n" +
      "Price: $" +
      product.price.toFixed(2) +
      "\n\n" +
      "Total: $" +
      (product.price * quantity).toFixed(2) +
      "\n\n" +
      "Please let me know how to proceed with my order.";

    // Create the WhatsApp URL with the encoded message
    // Using the provided business WhatsApp number with country code
    // For WhatsApp API: Remove any leading zeros and include country code without the '+' sign
    const phoneNumber = "96181386697"; // Lebanon WhatsApp business number (961 is country code)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Try to open WhatsApp in a new tab
    const newWindow = window.open(whatsappUrl, "_blank");

    // Check if the window was successfully opened
    if (newWindow) {
      toast({
        title: "Opening WhatsApp",
        description: "Redirecting you to WhatsApp to complete your purchase.",
        duration: 7000, // 7 seconds
      });
    } else {
      // If the window didn't open (possibly blocked or URL issues), provide alternative
      toast({
        title: "WhatsApp Link Issue",
        description: `Please contact us directly on WhatsApp at +961 81 386 697 and mention ${product.name}.`,
        variant: "destructive",
        duration: 7000, // 7 seconds
      });

      // Copy product details to clipboard as a fallback
      navigator.clipboard
        .writeText(message)
        .then(() => {
          toast({
            title: "Product details copied",
            description:
              "Product details copied to clipboard for easy sharing.",
            duration: 7000, // 7 seconds
          });
        })
        .catch(() => {
          // If clipboard copy fails, do nothing
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12 md:py-20 mb-4">
        {/* Back button */}
        <Button
          variant="ghost"
          className="my-8 group"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product image */}
          <div className="aspect-[3/4] bg-omnis-darkgray">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(80%)" }}
            />
          </div>

          {/* Product details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl mt-2 mb-6">${product.price.toFixed(2)}</p>

            <div className="border-t border-omnis-gray pt-6 mb-6">
              <p className="text-omnis-lightgray mb-8">{product.description}</p>

              {/* Color selection */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">
                  Color:{" "}
                  {product.colors.find((c) => c.value === selectedColor)?.name}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color.value
                          ? "ring-2 ring-offset-2 ring-omnis-black"
                          : "border-omnis-gray"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      aria-label={`Select ${color.name} color`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">
                  Quantity
                </h3>
                <div className="flex border border-omnis-gray w-fit">
                  <button
                    className="px-3 py-2"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex items-center justify-center px-6 py-2 border-x border-omnis-gray min-w-[3rem]">
                    {quantity}
                  </div>
                  <button
                    className="px-3 py-2"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToBag}
                className="border-omnis-black text-white hover:bg-omnis-black hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span className="inline-block">Add to Bag</span>
              </Button>
              <Button
                size="lg"
                onClick={handleBuyViaWhatsApp}
                className="bg-omnis-black text-white hover:bg-omnis-gray transition-all duration-300 font-medium tracking-wide shadow-lg transform hover:scale-105 flex items-center justify-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <span className="inline-block">Buy via WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
