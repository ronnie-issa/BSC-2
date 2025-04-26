import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
  maxQuantity?: number;
  darkMode?: boolean;
}

const QuantitySelector = ({
  quantity,
  onChange,
  maxQuantity = 20,
  darkMode = false,
}: QuantitySelectorProps) => {
  // Generate array of numbers from 1 to maxQuantity
  const quantities = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <Select
      value={quantity.toString()}
      onValueChange={(value) => onChange(parseInt(value))}
    >
      <SelectTrigger
        className={`w-24 border-omnis-gray hover:border-white transition-colors focus:ring-0 focus:ring-offset-0 ${
          darkMode ? "text-black bg-white" : ""
        }`}
      >
        <SelectValue placeholder="QTY">QTY: {quantity}</SelectValue>
      </SelectTrigger>
      <SelectContent className="animate-in fade-in-50 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
        {quantities.map((qty) => (
          <SelectItem key={qty} value={qty.toString()}>
            {qty}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuantitySelector;
