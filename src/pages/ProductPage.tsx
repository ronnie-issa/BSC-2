import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/contexts/ProductContext";
import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";
import { toast } from "@/hooks/use-toast";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuantitySelector from "@/components/ui/quantity-selector";
import RichTextRenderer from "@/components/RichTextRenderer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

const ProductPage = () => {
  const { id, slug } = useParams<{ id: string; slug?: string }>();
  const navigate = useNavigate();
  const { addToCart } = useProductContext();
  const { products, getProductById, refreshProducts } = useContentfulProducts();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showingLoader, setShowingLoader] = useState(true); // State to control loader visibility
  const [isAddingToBag, setIsAddingToBag] = useState(false); // State for Add to Bag button loading
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false); // State for WhatsApp button loading

  // Fetch product from Contentful and handle cleanup
  useEffect(() => {
    // Reset loading states when component mounts or unmounts
    setIsWhatsAppLoading(false);
    setIsAddingToBag(false);

    const getProduct = async () => {
      setLoading(true);
      setError(null);

      // Get the product ID or slug from the URL params or from sessionStorage if refreshing
      const productId = id || sessionStorage.getItem("currentProductId");
      const productSlug = slug || sessionStorage.getItem("currentProductSlug");

      if (!productId && !productSlug) {
        setError("Product not found");
        setLoading(false);
        return;
      }

      try {
        // First try to find the product in the already loaded products
        const foundProduct = products.find((p) => {
          // If we have a slug, try to match by slug first (preferred method)
          if (productSlug && p.slug === productSlug) {
            return true;
          }

          // Fall back to ID matching for backward compatibility
          if (productId) {
            // Convert both to strings for comparison
            const pId = p.id.toString();
            const searchId = productId.toString();
            const contentfulId = p.contentfulId?.toString() || "";

            // Check if they match directly or if the product has a contentfulId that matches
            return pId === searchId || contentfulId === searchId;
          }

          return false;
        });

        if (foundProduct) {
          console.log("Found product in loaded products:", foundProduct);
          setProduct(foundProduct);

          // If we have a contentfulId, store it for future refreshes
          if ((foundProduct as any).contentfulId) {
            sessionStorage.setItem(
              "contentfulProductId",
              (foundProduct as any).contentfulId
            );
          }
        } else {
          // If not found in loaded products, try to get it from Contentful
          // First check if we have a Contentful ID stored
          const contentfulId = sessionStorage.getItem("contentfulProductId");

          if (contentfulId) {
            // If we have a Contentful ID, use it directly
            console.log("Using stored Contentful ID:", contentfulId);
            const contentfulProduct = await getProductById(contentfulId);

            if (contentfulProduct) {
              setProduct(contentfulProduct);
            } else {
              setError("Product not found with stored Contentful ID");
            }
          } else {
            // If we don't have a Contentful ID, try to find the product by numeric ID
            // This will work for initial loads but not for refreshes
            console.log("Trying to find product with ID:", productId);

            // First try to load all products to ensure we have the latest data
            await refreshProducts(true);

            // Then look for the product again
            const refreshedProduct = products.find(
              (p) => p.id.toString() === productId.toString()
            );

            if (refreshedProduct) {
              console.log("Found product after refresh:", refreshedProduct);
              setProduct(refreshedProduct);

              // If we have a contentfulId, store it for future refreshes
              if ((refreshedProduct as any).contentfulId) {
                sessionStorage.setItem(
                  "contentfulProductId",
                  (refreshedProduct as any).contentfulId
                );
              }
            } else {
              setError("Product not found. Please try again later.");
            }
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Store the current product ID and slug in sessionStorage for refresh handling
    if (id || slug) {
      if (id) sessionStorage.setItem("currentProductId", id);
      if (slug) sessionStorage.setItem("currentProductSlug", slug);
      getProduct();
    } else if (
      sessionStorage.getItem("currentProductId") ||
      sessionStorage.getItem("currentProductSlug")
    ) {
      getProduct();
    }

    // Return cleanup function to reset loading states when component unmounts
    return () => {
      setIsWhatsAppLoading(false);
      setIsAddingToBag(false);
    };
  }, [id, slug, products, getProductById, refreshProducts]);

  // Set default color and size when product loads
  useEffect(() => {
    if (product) {
      if (product.colors.length > 0) {
        setSelectedColor(product.colors[0].value);
      }
      if (product.sizes.length > 0) {
        setSelectedSize(product.sizes[0].value);
      }
      // Set the default image
      setCurrentImage(product.image);
    }
    // No need to scroll to top here as ScrollToTop component handles it
  }, [product]);

  // Update the current image when the selected color changes
  useEffect(() => {
    if (product && selectedColor) {
      // First, find the color name that corresponds to the selected color value
      const selectedColorName = product.colors.find(
        (c) => c.value === selectedColor
      )?.name;

      if (selectedColorName) {
        // Then find the variation with that name
        const variation = product.variations.find(
          (v) => v.name === selectedColorName
        );

        // If the variation has an image, use it
        if (variation && variation.image) {
          console.log(
            `Found variation image for ${selectedColorName}:`,
            variation.image
          );
          setCurrentImage(variation.image);
        } else {
          // Fall back to the default product image
          console.log(
            `No variation image found for ${selectedColorName}, using default`
          );
          setCurrentImage(product.image);
        }
      } else {
        // If no color name found, use default image
        console.log(
          `No color name found for value ${selectedColor}, using default image`
        );
        setCurrentImage(product.image);
      }
    }
  }, [product, selectedColor]);

  // Effect to ensure the loading screen appears for a minimum time
  useEffect(() => {
    let loaderTimer: NodeJS.Timeout;

    if (!loading && product) {
      // When data is loaded, don't immediately hide the loader
      // Keep the loader visible for a minimum of 0.5 seconds
      loaderTimer = setTimeout(() => {
        setShowingLoader(false);
      }, 500); // 0.5 seconds minimum loading time
    } else {
      // When loading starts, show the loader
      setShowingLoader(true);
    }

    return () => {
      clearTimeout(loaderTimer);
    };
  }, [loading, product]);

  if (loading || showingLoader) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-omnis-white mb-4"></div>
          <p>Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">
            {error || "Product Not Found"}
          </h1>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
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

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
        duration: 7000, // 7 seconds
      });
      return;
    }

    // Set loading state
    setIsAddingToBag(true);

    // Simulate a slight delay for better UX (users expect some processing time)
    setTimeout(() => {
      // Add to cart - the dropdown will automatically open due to the useEffect in Navbar
      addToCart(product, quantity, selectedColor, selectedSize);

      // Reset loading state after adding to cart
      setIsAddingToBag(false);
    }, 800); // 800ms delay for the animation
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

    // Set loading state
    setIsWhatsAppLoading(true);

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
      "Variation: " +
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

    // Add a delay to show the loading animation before opening WhatsApp
    setTimeout(() => {
      // Try to open WhatsApp in a new tab
      const newWindow = window.open(whatsappUrl, "_blank");

      // Check if the window was successfully opened
      if (newWindow) {
        toast({
          title: "Opening WhatsApp",
          description: "Redirecting you to WhatsApp to complete your purchase.",
          duration: 7000, // 7 seconds
        });

        // Reset the loading state when the user returns to this page
        window.addEventListener("focus", function onFocus() {
          setIsWhatsAppLoading(false);
          window.removeEventListener("focus", onFocus);
        });

        // Safety timeout to ensure the loading state is reset after a certain period
        // even if the user doesn't return to the page
        setTimeout(() => {
          setIsWhatsAppLoading(false);
        }, 30000); // 30 seconds timeout
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

        // Reset loading state if WhatsApp didn't open
        setIsWhatsAppLoading(false);
      }
    }, 800); // 800ms delay to match other buttons
  };

  return (
    <>
      {product && (
        <SEO
          title={`${product.name} | OMNIS`}
          description={
            typeof product.description === "string"
              ? product.description.split("\n\n")[0]
              : product.description?.content?.[0]?.content?.[0]?.value ||
                `${product.name} - OMNIS`
          }
        />
      )}
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto relative">
          <Breadcrumbs
            items={[
              { label: "SHOP", path: "/shop" },
              {
                label: product.name.toUpperCase(),
                path: `/product/${product.slug}`,
              },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product image */}
            <div className="aspect-[3/4] bg-omnis-darkgray">
              <img
                src={
                  currentImage.startsWith("//")
                    ? `https:${currentImage}`
                    : currentImage
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product details */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>

              <div className="border-t border-omnis-gray pt-6 mb-6">
                <div className="text-omnis-lightgray mb-8">
                  {typeof product.description === "string" ? (
                    // Handle plain text descriptions (backward compatibility)
                    product.description
                      .split("\n\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph}
                        </p>
                      ))
                  ) : (
                    // Handle rich text descriptions
                    <RichTextRenderer content={product.description} />
                  )}
                </div>

                {/* Variation selection */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider mb-3">
                    Variation:{" "}
                    {
                      product.colors.find((c) => c.value === selectedColor)
                        ?.name
                    }
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.value}
                        className={`w-8 h-8 border-2 ${
                          selectedColor === color.value
                            ? "border-white"
                            : "border-omnis-gray hover:border-white"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color.value)}
                        aria-label={`Select ${color.name} variation`}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Size selector */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.value}
                        className={`px-4 py-2 border transition-colors ${
                          selectedSize === size.value
                            ? "bg-omnis-black text-white border-white"
                            : "border-omnis-gray hover:border-white"
                        }`}
                        onClick={() => setSelectedSize(size.value)}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider mb-3">
                    Quantity
                  </h3>
                  <QuantitySelector
                    quantity={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleAddToBag}
                  disabled={isAddingToBag}
                  className="border-omnis-white text-white hover:bg-omnis-white hover:text-omnis-black transition-all duration-300 flex items-center justify-center"
                >
                  {isAddingToBag ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="inline-block">Adding...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span className="inline-block">Add to Bag</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleBuyViaWhatsApp}
                  disabled={isAddingToBag || isWhatsAppLoading}
                  className="font-medium tracking-wide transition-all duration-300 flex items-center justify-center"
                >
                  {isWhatsAppLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span className="inline-block">Processing...</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="inline-block">Buy via WhatsApp</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
