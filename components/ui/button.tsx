import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import DraggableComponent from "./custom/draggables/factory/DraggableComponent";
import ColorPicker from "@/components/ui/ColorPicker";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
        secondary: "bg-gray-700 text-white hover:bg-gray-800",
        ghost: "hover:bg-gray-100 text-gray-700",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
  draggable?: boolean;
  originalId?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, draggable = false, ...props },
    ref
  ) => {
    const [color, setColor] = React.useState("#000000");
    const Comp = asChild ? Slot : "button";
    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ backgroundColor: color }}
        {...props}
      />
    );

    return draggable ? (
      <DraggableComponent id={props.id || "draggable-button"}>
        {buttonElement}
        <ColorPicker color={color} onChange={setColor} />
      </DraggableComponent>
    ) : (
      <>
        {buttonElement}
        <ColorPicker color={color} onChange={setColor} />
      </>
    );
  }
);
Button.displayName = "Boutons";

export { Button, buttonVariants };

