import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: {
    name: string;
    value: string;
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

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<BagItem[]>([]);
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

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item to bag
        return [
          ...prevCart,
          { product, quantity, selectedColor, selectedSize },
        ];
      }
    });
  };

  const removeFromCart = (
    productId: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (selectedColor && selectedSize) {
      // Remove specific item with matching product ID, color and size
      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
            )
        )
      );
    } else if (selectedColor) {
      // Remove specific item with matching product ID and color
      setCart((prevCart) =>
        prevCart.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.selectedColor === selectedColor
            )
        )
      );
    } else {
      // Remove all items with matching product ID
      setCart((prevCart) =>
        prevCart.filter((item) => item.product.id !== productId)
      );
    }
  };

  const updateCartItemQuantity = (
    productId: number,
    selectedColor: string,
    selectedSize: string,
    newQuantity: number
  ) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
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
