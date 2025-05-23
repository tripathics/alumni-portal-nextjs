import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  }
>(({ className, type, error, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "relative bg-transparent py-3 border-b border-input/20 outline-hidden w-full font-sans focus:border-input transition-all ease duration-100 disabled:cursor-not-allowed disabled:opacity-50 text-input focus:text-foreground hover:border-input/50",
        {
          "border-error/80": !!error,
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const InputError: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">
    <p className="text-xs mt-1 text-error absolute">{children}</p>
  </div>
);

export { Input, InputError };
