import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { throttle } from "@/lib/performance";

export interface Product {
  id: string | number; // Changed to accept both string and number IDs
  contentfulId?: string; // Original Contentful ID (now may be the same as id)
  slug: string; // URL-friendly version of the product name
  name: string;
  price: number;
  image: string;
  description: string | any; // Can be a string or a Contentful rich text document
  featured?: boolean;
  variations: {
    name: string;
    value: string;
    image?: string; // Optional image URL for this variation
  }[];
  colors: {
    name: string;
    value: string;
    image?: string; // Optional image URL for this color
  }[];
  sizes: {
    name: string;
    value: string;
  }[];
}

export interface BagItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedImage?: string; // Store the selected variation image URL
}

interface ProductContextType {
  cart: BagItem[];
  setCart: React.Dispatch<React.SetStateAction<BagItem[]>>; // Add setCart to allow direct cart updates
  addToCart: (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedSize: string,
    selectedImage?: string
  ) => void;
  removeFromCart: (
    productId: string | number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateCartItemQuantity: (
    productId: string | number,
    selectedColor: string,
    selectedSize: string,
    newQuantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addToCartEvent: boolean;
  resetAddToCartEvent: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper function to load cart from localStorage
const loadCartFromStorage = (): BagItem[] => {
  try {
    const savedCart = localStorage.getItem("omnisCart");
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return [];
};

// Helper function to save cart to localStorage
// Throttled to prevent excessive writes to localStorage
const saveCartToStorage = throttle((cart: BagItem[]) => {
  try {
    // Use requestIdleCallback if available, otherwise use setTimeout
    const saveToStorage = () => {
      localStorage.setItem("omnisCart", JSON.stringify(cart));
    };

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => saveToStorage());
    } else {
      setTimeout(saveToStorage, 0);
    }
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}, 300); // Throttle to once every 300ms

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<BagItem[]>(loadCartFromStorage());
  const [addToCartEvent, setAddToCartEvent] = useState(false);

  // Memoize the reset function to maintain reference stability
  const resetAddToCartEvent = useCallback(() => {
    setAddToCartEvent(false);
  }, []);

  // Helper function to find the appropriate image for a product variation
  // Extracted and memoized to improve performance
  const findVariationImage = useCallback(
    (product: Product, selectedColor: string): string => {
      // If the product doesn't have colors or variations, return the default image
      if (!product.colors?.length || !product.variations?.length) {
        return product.image;
      }

      // Find the color name that corresponds to the selected color value
      const selectedColorName = product.colors.find(
        (c) => c.value === selectedColor
      )?.name;

      if (selectedColorName) {
        // Find the variation with that name
        const variation = product.variations.find(
          (v) => v.name === selectedColorName
        );

        // If the variation has an image, use it
        if (variation && variation.image) {
          return variation.image;
        }
      }

      // Default to the product image if no variation image is found
      return product.image;
    },
    []
  );

  // Optimized addToCart function using useCallback for reference stability
  const addToCart = useCallback(
    (
      product: Product,
      quantity: number,
      selectedColor: string,
      selectedSize: string,
      selectedImage?: string
    ) => {
      // Use requestAnimationFrame to ensure UI updates happen in the next frame
      // This helps prevent jank during click handling
      requestAnimationFrame(() => {
        // Trigger the add to cart event
        setAddToCartEvent(true);

        setCart((prevCart) => {
          // Performance optimization: Create a Map for faster lookups
          // This is more efficient than using findIndex for large carts
          const cartMap = new Map<string, { item: BagItem; index: number }>();

          prevCart.forEach((item, index) => {
            const key = `${item.product.id}-${item.selectedColor}-${item.selectedSize}`;
            cartMap.set(key, { item, index });
          });

          const itemKey = `${product.id}-${selectedColor}-${selectedSize}`;
          const existingItemData = cartMap.get(itemKey);

          // Determine which image to use
          const imageToUse =
            selectedImage || findVariationImage(product, selectedColor);

          let newCart;
          if (existingItemData) {
            // Update quantity of existing item
            newCart = [...prevCart];
            newCart[existingItemData.index].quantity += quantity;
            // Update the selected image if provided
            newCart[existingItemData.index].selectedImage = imageToUse;
          } else {
            // Add new item to bag
            newCart = [
              ...prevCart,
              {
                product,
                quantity,
                selectedColor,
                selectedSize,
                selectedImage: imageToUse,
              },
            ];
          }

          // Save to localStorage (already throttled)
          saveCartToStorage(newCart);
          return newCart;
        });
      });
    },
    [findVariationImage]
  );

  // Optimized removeFromCart function using useCallback
  const removeFromCart = useCallback(
    (
      productId: string | number,
      selectedColor?: string,
      selectedSize?: string
    ) => {
      // Use requestAnimationFrame to ensure UI updates happen in the next frame
      requestAnimationFrame(() => {
        setCart((prevCart) => {
          let newCart;

          // Performance optimization: Use more efficient filtering
          if (selectedColor && selectedSize) {
            // Remove specific item with matching product ID, color and size
            newCart = prevCart.filter(
              (item) =>
                !(
                  item.product.id === productId &&
                  item.selectedColor === selectedColor &&
                  item.selectedSize === selectedSize
                )
            );
          } else if (selectedColor) {
            // Remove specific item with matching product ID and color
            newCart = prevCart.filter(
              (item) =>
                !(
                  item.product.id === productId &&
                  item.selectedColor === selectedColor
                )
            );
          } else {
            // Remove all items with matching product ID
            newCart = prevCart.filter((item) => item.product.id !== productId);
          }

          // Save to localStorage (already throttled)
          saveCartToStorage(newCart);
          return newCart;
        });
      });
    },
    []
  );

  // Optimized updateCartItemQuantity function using useCallback
  const updateCartItemQuantity = useCallback(
    (
      productId: string | number,
      selectedColor: string,
      selectedSize: string,
      newQuantity: number
    ) => {
      // Use requestAnimationFrame to ensure UI updates happen in the next frame
      requestAnimationFrame(() => {
        setCart((prevCart) => {
          // Performance optimization: Use Map for faster lookups
          const cartMap = new Map<string, { item: BagItem; index: number }>();

          prevCart.forEach((item, index) => {
            const key = `${item.product.id}-${item.selectedColor}-${item.selectedSize}`;
            cartMap.set(key, { item, index });
          });

          const itemKey = `${productId}-${selectedColor}-${selectedSize}`;
          const existingItemData = cartMap.get(itemKey);

          // If item doesn't exist, return the cart unchanged
          if (!existingItemData) {
            return prevCart;
          }

          // Create a new cart with the updated item
          const newCart = [...prevCart];
          newCart[existingItemData.index] = {
            ...newCart[existingItemData.index],
            quantity: newQuantity,
          };

          // Save to localStorage (already throttled)
          saveCartToStorage(newCart);
          return newCart;
        });
      });
    },
    []
  );

  // Optimized clearCart function using useCallback
  const clearCart = useCallback(() => {
    requestAnimationFrame(() => {
      setCart([]);
      localStorage.removeItem("omnisCart");
    });
  }, []);

  // Optimized getCartTotal function using useCallback
  // This is a potentially expensive calculation that should be memoized
  const getCartTotal = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      getCartTotal,
      addToCartEvent,
      resetAddToCartEvent,
    }),
    [
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      getCartTotal,
      addToCartEvent,
      resetAddToCartEvent,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
