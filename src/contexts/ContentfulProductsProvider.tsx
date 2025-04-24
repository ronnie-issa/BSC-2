import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  fetchAllProducts,
  fetchFeaturedProducts,
  fetchProductById,
} from "../services/contentful";
import type { Product } from "./ProductContext";

// Define the context type
interface ContentfulProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
  refreshProducts: (skipDebounce?: boolean) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
}

// Create the context with default values
const ContentfulProductsContext = createContext<ContentfulProductsContextType>({
  products: [],
  featuredProducts: [],
  isLoading: true,
  error: null,
  previewMode: false,
  setPreviewMode: () => {},
  refreshProducts: async () => {},
  getProductById: async () => null,
});

// Custom hook to use the context
export const useContentfulProducts = () =>
  useContext(ContentfulProductsContext);

// Provider component
export const ContentfulProductsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refs for debouncing
  const lastRefreshRef = useRef<number>(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Minimum time between refreshes (in milliseconds)
  const MIN_REFRESH_INTERVAL = 2000;

  // Function to fetch a single product by ID
  const getProductById = useCallback(
    async (id: string): Promise<Product | null> => {
      try {
        return await fetchProductById(id, previewMode);
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
      }
    },
    [previewMode]
  );

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

      // Update the last refresh time
      lastRefreshRef.current = now;

      // Set loading state
      setIsRefreshing(true);
      setError(null);

      try {
        console.log("Starting to refresh products, preview mode:", previewMode);

        // Fetch all products
        console.log("Calling fetchAllProducts...");
        const allProducts = await fetchAllProducts(previewMode);
        console.log("All products fetched:", allProducts.length);
        setProducts(allProducts);

        // Fetch featured products
        console.log("Calling fetchFeaturedProducts...");
        const featured = await fetchFeaturedProducts(previewMode);
        console.log("Featured products fetched:", featured.length);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error refreshing products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsRefreshing(false);
        setIsLoading(false);
        console.log("Finished refreshing products, loading state set to false");
      }
      // We're using isRefreshing inside the function but not including it in the deps array
      // to prevent the function from being recreated when isRefreshing changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [previewMode]
  );

  // Clean up debounce timer on unmount and handle initial fetch
  useEffect(() => {
    // Initial fetch on mount - using a small timeout to ensure it only happens once
    const initialFetchTimer = setTimeout(() => {
      console.log("Performing initial fetch...");
      // Retry logic for initial fetch to handle potential network issues
      const attemptFetch = async (retries = 3) => {
        try {
          await refreshProducts(true); // Skip debounce for initial fetch
        } catch (err) {
          console.error("Error during initial fetch:", err);
          if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            setTimeout(() => attemptFetch(retries - 1), 1000);
          } else {
            setError("Failed to load products. Please refresh the page.");
            setIsLoading(false);
          }
        }
      };

      attemptFetch();
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

  // Provide the context value
  const contextValue = {
    products,
    featuredProducts,
    isLoading,
    error,
    previewMode,
    setPreviewMode,
    refreshProducts,
    getProductById,
  };

  return (
    <ContentfulProductsContext.Provider value={contextValue}>
      {children}
    </ContentfulProductsContext.Provider>
  );
};
