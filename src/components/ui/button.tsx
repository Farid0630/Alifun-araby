import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-sky-500 text-white hover:bg-sky-600 shadow-md hover:shadow-lg hover:shadow-sky-500/25 active:scale-95",
        secondary:
          "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg hover:shadow-blue-500/25 active:scale-95",
        outline:
          "border-2 border-sky-500 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950 active:scale-95",
        ghost:
          "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95",
        gold:
          "bg-amber-500 text-white hover:bg-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-500/25 active:scale-95",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-md active:scale-95",
        glass:
          "glass text-white hover:bg-white/20 active:scale-95",
      },
      size: {
        sm:      "h-8 px-4 text-xs rounded-lg",
        default: "h-10 px-5 py-2",
        lg:      "h-12 px-8 text-base rounded-2xl",
        xl:      "h-14 px-10 text-base rounded-2xl",
        icon:    "h-10 w-10 rounded-xl",
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
