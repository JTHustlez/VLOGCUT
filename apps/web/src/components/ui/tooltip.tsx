import { cva, type VariantProps } from 'class-variance-authority';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipVariants = cva(
  'z-50 overflow-visible rounded-md text-sm shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
  {
    variants: {
      variant: {
        default: 'bg-card/95 backdrop-blur-xl text-popover-foreground border border-border/50 px-3 py-1.5 shadow-primary/5',
        destructive:
          'bg-destructive/10 text-destructive dark:bg-destructive/20 border border-destructive/30 px-3 py-1.5',
        outline: 'border border-border/50 bg-card/95 backdrop-blur-xl px-3 py-1.5',
        important:
          'bg-amber-100/90 text-amber-900 dark:bg-amber-900/20 dark:text-amber-300 border border-amber-500/30 px-3 py-1.5',
        promotions:
          'bg-red-100/90 text-red-900 dark:bg-red-900/20 dark:text-red-300 border border-red-500/30 px-3 py-1.5',
        personal:
          'bg-green-100/90 text-green-900 dark:bg-green-900/20 dark:text-green-300 border border-green-500/30 px-3 py-1.5',
        updates:
          'bg-purple-100/90 text-purple-900 dark:bg-purple-900/20 dark:text-purple-300 border border-purple-500/30 px-3 py-1.5',
        forums:
          'bg-blue-100/90 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-500/30 px-3 py-1.5',
        sidebar: 'bg-card/95 backdrop-blur-xl border border-primary/20 p-2.5 flex flex-col gap-2 shadow-[0_0_15px_hsl(185,100%,50%,0.1)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipVariants> {}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, variant, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ variant }), className)}
    {...props}
  >
    {variant === 'sidebar' && (
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-[-6px] top-1/2 -translate-y-1/2"
      >
        <title>Tooltip arrow</title>
        <path d="M6 0L0 5L6 10V0Z" className="fill-card/95" />
      </svg>
    )}
    {props.children}
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
