import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Dark Mode Variants (Default)
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Primary: White bg, black text
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white bg-transparent text-white hover:bg-white/10", // Transparent bg with white border
        secondary: "bg-omnis-black text-omnis-white hover:bg-omnis-gray", // Secondary: Black bg, white text
        ghost: "text-white hover:bg-white/10", // No background or border, white text
        link: "text-white underline-offset-4 hover:underline p-0 h-auto", // White text with underline on hover

        // Light Mode Variants
        "primary-light": "bg-omnis-black text-omnis-white hover:bg-omnis-gray", // Primary Light: Black bg, white text
        "secondary-light":
          "bg-omnis-darkgray text-omnis-white hover:bg-omnis-gray", // Secondary Light: Dark gray bg, white text
        "outline-light":
          "border border-omnis-black bg-transparent text-omnis-black hover:bg-omnis-black/10", // Transparent bg with black border
        "ghost-light": "text-omnis-black hover:bg-omnis-black/10", // No background or border, black text
        "link-light":
          "text-omnis-black underline-offset-4 hover:underline p-0 h-auto", // Black text with underline on hover
      },
      size: {
        default: "h-10 px-4 py-2", // 40px height - Standard button
        sm: "h-8 px-3 py-1.5 text-xs", // 32px height - Small button
        md: "h-10 px-4 py-2", // 40px height - Same as default, for explicit naming
        lg: "h-12 px-6 py-3", // 48px height - Large button
        xl: "h-14 px-8 py-4", // 56px height - Extra large button
        icon: "h-10 w-10 p-2", // 40px square - Icon button
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // Add documentation for size options
  /**
   * Button size variants:
   * - sm: 32px height - Small button
   * - default/md: 40px height - Standard button
   * - lg: 48px height - Large button
   * - xl: 56px height - Extra large button
   * - icon: 40px square - Icon button
   */
  size?: "default" | "sm" | "md" | "lg" | "xl" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
