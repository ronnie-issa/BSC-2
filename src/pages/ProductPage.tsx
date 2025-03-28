
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useProductContext } from "@/contexts/ProductContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useProductContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  
  const product = products.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0].value);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate("/shop")}>Return to Shop</Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedColor);
    
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedColor);
    navigate("/checkout");
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product image */}
          <div className="aspect-[3/4] bg-omnis-darkgray">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(80%)' }}
            />
          </div>
          
          {/* Product details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-2xl mt-2 mb-6">${product.price.toFixed(2)}</p>
            
            <div className="border-t border-omnis-gray pt-6 mb-6">
              <p className="text-omnis-lightgray mb-8">{product.description}</p>
              
              {/* Color selection */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Color: {product.colors.find(c => c.value === selectedColor)?.name}</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded-full border ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-omnis-black' : 'border-omnis-gray'}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.value)}
                      aria-label={`Select ${color.name} color`}
                    ></button>
                  ))}
                </div>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-wider mb-3">Quantity</h3>
                <div className="flex border border-omnis-gray w-fit">
                  <button 
                    className="px-3 py-2"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex items-center justify-center px-6 py-2 border-x border-omnis-gray min-w-[3rem]">
                    {quantity}
                  </div>
                  <button 
                    className="px-3 py-2"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToCart}
                className="border-omnis-black text-omnis-black hover:bg-omnis-black hover:text-white"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button 
                size="lg"
                onClick={handleBuyNow}
                className="bg-omnis-black text-white hover:bg-omnis-gray"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
