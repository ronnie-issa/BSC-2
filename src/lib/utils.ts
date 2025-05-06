import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as a price with commas and no decimal places
 * @param price The price to format
 * @param decimals Number of decimal places (default: 0)
 * @returns Formatted price string with commas (e.g. 1,000)
 */
export function formatPrice(price: number, decimals: number = 0): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
