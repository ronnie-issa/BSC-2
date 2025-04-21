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
}

export interface BagItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface ProductContextType {
  cart: BagItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedColor: string
  ) => void;
  removeFromCart: (productId: number, selectedColor?: string) => void;
  updateCartItemQuantity: (
    productId: number,
    selectedColor: string,
    newQuantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<BagItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number,
    selectedColor: string
  ) => {
    setCart((prevCart) => {
      // Check if item already exists in bag
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Add new item to bag
        return [...prevCart, { product, quantity, selectedColor }];
      }
    });
  };

  const removeFromCart = (productId: number, selectedColor?: string) => {
    if (selectedColor) {
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
    newQuantity: number
  ) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor
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
