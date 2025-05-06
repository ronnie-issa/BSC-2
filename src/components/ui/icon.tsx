import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  icon: LucideIcon;
}

/**
 * Icon component that wraps Lucide icons with consistent styling
 *
 * This component applies a medium stroke width (1.5) to all icons by default
 * while allowing all other Lucide props to be passed through.
 *
 * @example
 * ```tsx
 * import { ShoppingBag } from 'lucide-react';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon icon={ShoppingBag} size={24} />
 * ```
 */
export const Icon = ({
  icon: LucideIcon,
  strokeWidth = 1.5, // Default to medium variant
  ...props
}: IconProps) => {
  return <LucideIcon strokeWidth={strokeWidth} {...props} />;
};
