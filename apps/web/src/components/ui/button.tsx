import * as React from "react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:scale-[1.02]",
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_15px_hsl(45,67%,52%,0.35)]",
        "primary-gradient":
          "bg-gradient-to-r from-[hsl(45,67%,52%)] to-[hsl(46,76%,63%)] text-primary-foreground font-semibold hover:opacity-90 hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(45,67%,52%,0.4)] transition-all",
        "gold-outline":
          "border border-primary/40 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_hsl(45,67%,52%,0.25)]",
        destructive:
          "bg-destructive/0 border border-destructive/25 text-destructive shadow-xs hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-primary/25 transition-colors",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 border border-border hover:border-primary/15",
        text: "bg-transparent p-0 rounded-none opacity-100 hover:opacity-70 hover:text-primary transition-all",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-sm px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-7 w-7",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : "button";
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
