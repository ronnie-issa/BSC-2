import React, { createContext, useContext, useState, ReactNode } from "react";

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
}

interface ProductContextType {
  cart: BagItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedSize: string
  ) => void;
  removeFromCart: (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateCartItemQuantity: (
    productId: number,
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
const saveCartToStorage = (cart: BagItem[]) => {
  try {
    localStorage.setItem("omnisCart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<BagItem[]>(loadCartFromStorage());
  const [addToCartEvent, setAddToCartEvent] = useState(false);

  const resetAddToCartEvent = () => {
    setAddToCartEvent(false);
  };

  const addToCart = (
    product: Product,
    quantity: number,
    selectedColor: string,
    selectedSize: string
  ) => {
    // Trigger the add to cart event
    setAddToCartEvent(true);

    setCart((prevCart) => {
      // Check if item already exists in bag
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      let newCart;
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to bag
        newCart = [
          ...prevCart,
          { product, quantity, selectedColor, selectedSize },
        ];
      }

      // Save to localStorage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prevCart) => {
      let newCart;

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

      // Save to localStorage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const updateCartItemQuantity = (
    productId: number,
    selectedColor: string,
    selectedSize: string,
    newQuantity: number
  ) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Save to localStorage
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("omnisCart");
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <ProductContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotal,
        addToCartEvent,
        resetAddToCartEvent,
      }}
    >
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
