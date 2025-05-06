import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  fetchAllProducts,
  fetchFeaturedProducts,
  fetchProductById,
  clearContentfulCache,
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
  clearCache: () => void;
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
  clearCache: () => {},
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

  // Function to clear the Contentful cache and refresh products
  const clearCache = useCallback(() => {
    clearContentfulCache();
    refreshProducts(true);
  }, []); // We'll add refreshProducts to the deps array after defining it

  // Function to fetch products from Contentful (wrapped in useCallback to maintain reference stability)
  const refreshProducts = useCallback(
    async (skipDebounce = false) => {
      // Always set loading state to true immediately
      setIsLoading(true);

      // Prevent multiple simultaneous refreshes
      if (isRefreshing) {
        return;
      }

      // Check if we've refreshed recently (unless skipDebounce is true)
      const now = Date.now();
      if (
        !skipDebounce &&
        now - lastRefreshRef.current < MIN_REFRESH_INTERVAL
      ) {
        // Clear any existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set a new timer
        debounceTimerRef.current = setTimeout(() => {
          refreshProducts(true); // Skip debounce on the retry
        }, MIN_REFRESH_INTERVAL);

        return;
      }

      // Update the last refresh time
      lastRefreshRef.current = now;

      // Set loading states
      setIsRefreshing(true);
      setError(null);

      try {
        // Use Promise.all to fetch both in parallel for better performance
        const [allProducts, featured] = await Promise.all([
          fetchAllProducts(previewMode),
          fetchFeaturedProducts(previewMode),
        ]);

        // Update state with the fetched data
        setProducts(allProducts);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error refreshing products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setIsRefreshing(false);
        setIsLoading(false);
      }
      // We're using isRefreshing inside the function but not including it in the deps array
      // to prevent the function from being recreated when isRefreshing changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [previewMode]
  );

  // Update clearCache to include refreshProducts in its dependency array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedClearCache = useCallback(clearCache, [refreshProducts]);

  // Clean up debounce timer on unmount and handle initial fetch
  useEffect(() => {
    // Initial fetch on mount - using a small timeout to ensure it only happens once
    const initialFetchTimer = setTimeout(() => {
      // Retry logic for initial fetch to handle potential network issues
      const attemptFetch = async (retries = 3) => {
        try {
          await refreshProducts(true); // Skip debounce for initial fetch
        } catch (err) {
          if (retries > 0) {
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

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      products,
      featuredProducts,
      isLoading,
      error,
      previewMode,
      setPreviewMode,
      refreshProducts,
      getProductById,
      clearCache: memoizedClearCache,
    }),
    [
      products,
      featuredProducts,
      isLoading,
      error,
      previewMode,
      setPreviewMode,
      refreshProducts,
      getProductById,
      memoizedClearCache,
    ]
  );

  return (
    <ContentfulProductsContext.Provider value={contextValue}>
      {children}
    </ContentfulProductsContext.Provider>
  );
};
