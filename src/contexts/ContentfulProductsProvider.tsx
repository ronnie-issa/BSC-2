import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "./ProductContext";
import {
  fetchAllProducts,
  fetchFeaturedProducts,
} from "../services/contentful";

interface ProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  previewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ContentfulProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  // Function to fetch products from Contentful
  const refreshProducts = async () => {
    console.log("Starting to refresh products, preview mode:", previewMode);
    setLoading(true);
    setError(null);

    try {
      // Fetch all products using the current preview mode setting
      console.log("Calling fetchAllProducts...");
      const allProducts = await fetchAllProducts(previewMode);
      console.log("All products fetched:", allProducts.length);
      setProducts(allProducts);

      // Fetch featured products using the current preview mode setting
      console.log("Calling fetchFeaturedProducts...");
      const featured = await fetchFeaturedProducts(previewMode);
      console.log("Featured products fetched:", featured.length);
      setFeaturedProducts(featured);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
      console.log("Finished refreshing products, loading state set to false");
    }
  };

  // Refresh products when preview mode changes
  useEffect(() => {
    refreshProducts();
  }, [previewMode]);

  // Fetch products on component mount
  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        featuredProducts,
        loading,
        error,
        previewMode,
        setPreviewMode,
        refreshProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useContentfulProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useContentfulProducts must be used within a ContentfulProductsProvider"
    );
  }
  return context;
};
