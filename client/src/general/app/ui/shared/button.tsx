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
  size?: "default" | "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";

    const buttonClasses = clsx(
      "inline-flex items-center justify-center rounded font-normal outline-none transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow dark:shadow-two dark:hover:shadow-none border text-base disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
      {
        "text-gray-100 dark:text-gray-200 border-green-500 dark:border-green-700 bg-primary-btn hover:bg-button-hover hover:border-green-600":
          variant === "default",
        "bg-red-500/80 text-gray-200 border-red-700 hover:bg-red-500/50 hover:border-red-600":
          variant === "destructive",
        "bg-neutral-500/50 text-black hover:text-white dark:text-gray-200 border-none hover:bg-neutral-500/80 ":
          variant === "outline",
        "bg-secondary text-black hover:text-white hover:bg-secondary/80":
          variant === "secondary",
        "shadow-none hover:bg-accent hover:text-accent-foreground":
          variant === "ghost",
        "text-primary underline-offset-4 shadow-none hover:underline":
          variant === "link",
        "h-8 px-4 py-2": size === "default",
        "h-9 rounded px-3": size === "sm",
        "h-10 rounded-md px-6": size === "md",
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
