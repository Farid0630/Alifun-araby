import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
        secondary: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        gold: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
        rose: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
        slate: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
        outline: "border border-sky-500 text-sky-600 dark:text-sky-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
