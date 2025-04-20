import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/contexts/ProductContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, getCartTotal } = useProductContext();
  
  const handleQuantityChange = (productId: number, selectedColor: string, amount: number) => {
    const item = cart.find(
      item => item.product.id === productId && item.selectedColor === selectedColor
    );
    
    if (!item) return;
    
    const newQuantity = item.quantity + amount;
    
    if (newQuantity <= 0) {
      // Remove item if quantity becomes 0
      removeFromCart(productId);
      toast({
        title: "Item removed",
        description: `${item.product.name} has been removed from your cart`,
      });
    } else {
      // Update quantity
      // Since we don't have a direct updateQuantity method, we'll remove and re-add
      removeFromCart(productId);
      addToCart(item.product, newQuantity, selectedColor);
    }
  };
  
  const handleRemoveItem = (productId: number) => {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;
    
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${item.product.name} has been removed from your cart`,
    });
  };
  
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-8 text-center max-w-md">Add some items to your cart before proceeding to checkout.</p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-12 md:py-20">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-8 group"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>

        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item, index) => {
                const colorName = item.product.colors.find(
                  c => c.value === item.selectedColor
                )?.name || 'Default';
                
                return (
                  <div 
                    key={`${item.product.id}-${index}`} 
                    className="flex flex-col sm:flex-row gap-6 p-6 border border-omnis-gray/30"
                  >
                    {/* Product image */}
                    <div className="w-full sm:w-32 h-32 bg-omnis-darkgray flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                        style={{ filter: "grayscale(80%)" }}
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">{item.product.name}</h3>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <p className="text-sm text-omnis-lightgray mb-4">
                        Color: {colorName}
                      </p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        {/* Quantity controls */}
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none border-omnis-gray/30"
                            onClick={() => handleQuantityChange(item.product.id, item.selectedColor, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-none border-omnis-gray/30"
                            onClick={() => handleQuantityChange(item.product.id, item.selectedColor, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Remove button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-omnis-lightgray hover:text-omnis-white"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-omnis-darkgray p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <div className="border-t border-omnis-gray/30 pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-omnis-white text-omnis-black hover:bg-omnis-lightgray"
                size="lg"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline"
                className="w-full mt-4 border-omnis-white text-omnis-white hover:bg-transparent"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
