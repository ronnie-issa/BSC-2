import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import PreviewToggle from "@/components/PreviewToggle";
import { ContentfulProductsProvider } from "./contexts/ContentfulProductsProvider";
import { ProductProvider } from "./contexts/ProductContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Sizing from "./pages/Sizing";
import Help from "./pages/Help";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import BagPage from "./pages/BagPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContentfulProductsProvider>
      <ProductProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <PreviewToggle />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/sizing" element={<Sizing />} />
              <Route path="/help" element={<Help />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/bag" element={<BagPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmationPage />}
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProductProvider>
    </ContentfulProductsProvider>
  </QueryClientProvider>
);

export default App;
