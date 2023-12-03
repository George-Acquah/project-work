import * as React from "react";
import clsx from "clsx";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";

    const buttonClasses = clsx(
      "inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'",
      {
        "shadow-md  bg-blue-500 hover:bg-blue-400 transition duration-20":
          variant === "default",
        "bg-btn-destructive text-destructive-foreground hover:bg-destructive/90":
          variant === "destructive",
        "bg-btn-outline border border-input hover:bg-accent hover:text-accent-foreground":
          variant === "outline",
        "bg-secondary text-secondary-foreground hover:bg-secondary/80":
          variant === "secondary",
        "shadow-none hover:bg-accent hover:text-accent-foreground":
          variant === "ghost",
        "text-primary underline-offset-4 shadow-none hover:underline":
          variant === "link",
        "h-8 px-4 py-2": size === "default",
        "h-8 rounded-md px-3": size === "sm",
        "h-11 rounded-md px-8": size === "lg",
        "h-8 w-8 p-0": size === "icon",
      },
      className
    );

    return <Comp className={buttonClasses} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;
