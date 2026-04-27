import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.5)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-[0_8px_24px_-8px_hsl(var(--destructive)/0.5)]",
        outline: "border border-border bg-transparent hover:bg-accent/10 hover:text-foreground hover:border-brand-pink/40",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-[0_8px_24px_-8px_hsl(var(--secondary)/0.5)]",
        ghost: "hover:bg-accent/10 hover:text-foreground rounded-xl hover:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline rounded-none hover:translate-y-0",
        // Brand variants
        hero: "bg-gradient-brand bg-[length:200%_200%] text-white shadow-glow-pink hover:shadow-elevated hover:bg-[position:100%_50%] font-bold",
        warm: "bg-gradient-warm text-white shadow-glow-orange hover:shadow-elevated font-bold",
        glass: "glass text-foreground hover:bg-white/10 hover:border-brand-pink/30",
        cart: "bg-gradient-brand bg-[length:200%_200%] text-white hover:bg-[position:100%_50%] hover:shadow-glow-pink font-semibold",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
