import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "@/components/ScrollToTop";
import PreviewToggle from "@/components/PreviewToggle";
import { ContentfulProductsProvider } from "./contexts/ContentfulProductsProvider";
import { ProductProvider } from "./contexts/ProductContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Legal from "./pages/Legal";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import BagPage from "./pages/BagPage";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Sizing from "./pages/Sizing";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentfulProductsProvider>
        <ProductProvider>
          <TooltipProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/legal/:page" element={<Legal />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/order-confirmation"
                  element={<OrderConfirmationPage />}
                />
                <Route path="/bag" element={<BagPage />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/sizing" element={<Sizing />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <PreviewToggle />
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </ProductProvider>
      </ContentfulProductsProvider>
    </QueryClientProvider>
  );
}

export default App;
