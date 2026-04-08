import { ButtonHTMLAttributes, forwardRef } from "react";

type ChokaoButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ChokaoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChokaoButtonVariant;
  fullWidth?: boolean;
}

const variantStyles: Record<ChokaoButtonVariant, string> = {
  primary:
    "bg-chokao-yellow text-chokao-primary font-semibold hover:brightness-110 active:brightness-95",
  secondary:
    "border-2 border-chokao-yellow text-chokao-yellow bg-transparent hover:bg-chokao-yellow/10",
  ghost:
    "text-chokao-cream bg-transparent hover:text-foreground",
  danger:
    "bg-chokao-red text-foreground font-semibold hover:brightness-110",
};

const ChokaoButton = forwardRef<HTMLButtonElement, ChokaoButtonProps>(
  ({ variant = "primary", fullWidth = false, className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          h-[52px] rounded-full px-8 font-body text-[15px] font-semibold
          transition-all duration-200 flex items-center justify-center gap-2
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "opacity-40 pointer-events-none" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ChokaoButton.displayName = "ChokaoButton";
export default ChokaoButton;
