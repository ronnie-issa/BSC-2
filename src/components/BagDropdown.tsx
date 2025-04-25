import { X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductContext } from "@/contexts/ProductContext";
import QuantitySelector from "@/components/ui/quantity-selector";
import { Separator } from "@/components/ui/separator";

interface BagDropdownProps {
  onClose: () => void;
}

const BagDropdown = ({ onClose }: BagDropdownProps) => {
  const {
    cart: bag,
    removeFromCart: removeFromBag,
    updateCartItemQuantity: updateBagItemQuantity,
    getCartTotal: getBagTotal,
  } = useProductContext();

  const handleRemoveItem = (
    productId: number,
    selectedColor: string,
    selectedSize: string
  ) => {
    removeFromBag(productId, selectedColor, selectedSize);
  };

  const handleQuantityChange = (
    productId: number,
    selectedColor: string,
    selectedSize: string,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      removeFromBag(productId, selectedColor, selectedSize);
    } else {
      updateBagItemQuantity(
        productId,
        selectedColor,
        selectedSize,
        newQuantity
      );
    }
  };

  return (
    <div className="bg-white text-black w-full max-w-md max-h-[80vh] overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="font-bold text-base sm:text-lg uppercase">
          Added to Shopping Bag
        </h2>
        <button
          onClick={onClose}
          className="text-black hover:text-gray-600 p-1"
        >
          <X size={20} />
        </button>
      </div>

      {/* Bag Items */}
      <div className="p-4 max-h-[50vh] overflow-y-auto">
        {bag.length === 0 ? (
          <p className="text-center py-6 text-gray-500">Your bag is empty</p>
        ) : (
          <div className="space-y-6">
            {bag.map((item, index) => {
              const colorName =
                item.product.colors.find((c) => c.value === item.selectedColor)
                  ?.name || "Default";

              return (
                <div
                  key={`${item.product.id}-${index}`}
                  className="flex gap-3 sm:gap-4"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(80%)" }}
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium uppercase text-xs sm:text-sm truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-base sm:text-lg font-bold mt-1">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="text-xs text-gray-600 mt-1">
                      <p>Variation: {colorName}</p>
                      <p>Size: {item.selectedSize.toUpperCase()}</p>
                    </div>
                    <div className="mt-2">
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(newQuantity) =>
                          handleQuantityChange(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            newQuantity
                          )
                        }
                        darkMode={true}
                      />
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() =>
                      handleRemoveItem(
                        item.product.id,
                        item.selectedColor,
                        item.selectedSize
                      )
                    }
                    className="text-gray-500 hover:text-black self-start p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {bag.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="primary-light"
              className="w-full text-xs sm:text-sm"
            >
              <Link to="/checkout">CHECKOUT</Link>
            </Button>
            <Button
              asChild
              variant="outline-light"
              className="w-full text-xs sm:text-sm"
            >
              <Link to="/bag" onClick={onClose}>
                VIEW BAG
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagDropdown;
