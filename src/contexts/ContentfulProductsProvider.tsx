import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  // Default to false to avoid excessive API calls
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  // Track if a refresh is in progress to prevent duplicate calls
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Debounce timer reference
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Last refresh timestamp to prevent too frequent refreshes
  const lastRefreshRef = useRef<number>(0);

  // Minimum time between refreshes (2 seconds)
  const MIN_REFRESH_INTERVAL = 2000;

  // Function to fetch products from Contentful (wrapped in useCallback to maintain reference stability)
  const refreshProducts = useCallback(
    async (skipDebounce = false) => {
      // Prevent multiple simultaneous refreshes
      if (isRefreshing) {
        console.log("Refresh already in progress, skipping...");
        return;
      }

      // Check if we've refreshed recently (unless skipDebounce is true)
      const now = Date.now();
      if (
        !skipDebounce &&
        now - lastRefreshRef.current < MIN_REFRESH_INTERVAL
      ) {
        console.log("Refresh called too frequently, debouncing...");

        // Clear any existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
          console.log("Executing debounced refresh...");
          refreshProducts(true); // Skip debounce on the retry
        }, MIN_REFRESH_INTERVAL);

        return;
      }

      // Update last refresh timestamp
      lastRefreshRef.current = now;

      console.log("Starting to refresh products, preview mode:", previewMode);
      setLoading(true);
      setError(null);
      setIsRefreshing(true);

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
        setIsRefreshing(false);
        console.log("Finished refreshing products, loading state set to false");
      }
      // We're using isRefreshing inside the function but not including it in the deps array
      // to prevent the function from being recreated when isRefreshing changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [previewMode]
  );

  // We don't need a separate effect for previewMode changes because
  // refreshProducts already depends on previewMode and will be called
  // when previewMode changes

  // Clean up debounce timer on unmount and handle initial fetch
  useEffect(() => {
    // Initial fetch on mount - using a small timeout to ensure it only happens once
    const initialFetchTimer = setTimeout(() => {
      console.log("Performing initial fetch...");
      refreshProducts(true); // Skip debounce for initial fetch
    }, 100);

    return () => {
      // Clean up all timers on unmount
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      clearTimeout(initialFetchTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally not including refreshProducts in deps to avoid infinite loop

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
