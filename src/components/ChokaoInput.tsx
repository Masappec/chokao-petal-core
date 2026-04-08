import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ChokaoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

const ChokaoInput = forwardRef<HTMLInputElement, ChokaoInputProps>(
  ({ label, icon, error, isPassword, className = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full">
        <div
          className={`
            relative flex items-center gap-3 h-[56px] rounded-2xl px-4
            bg-chokao-surface border transition-colors duration-200
            ${error ? "border-chokao-red" : "border-chokao-border focus-within:border-chokao-cream/30"}
          `}
        >
          {icon && (
            <span className="text-chokao-cream/40 shrink-0">{icon}</span>
          )}
          <div className="flex-1 relative">
            <input
              ref={ref}
              type={inputType}
              placeholder=" "
              className={`
                peer w-full bg-transparent text-white text-[15px] font-body
                outline-none pt-3 placeholder-transparent
                ${className}
              `}
              {...props}
            />
            <label
              className="
                absolute left-0 top-1/2 -translate-y-1/2 text-chokao-cream/50 text-[14px]
                font-body pointer-events-none transition-all duration-200
                peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-chokao-cream/60
                peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]
              "
            >
              {label}
            </label>
          </div>
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-chokao-cream/40 hover:text-chokao-cream/70 transition-colors shrink-0"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-chokao-red text-[12px] mt-1.5 ml-1 font-body">{error}</p>
        )}
      </div>
    );
  }
);

ChokaoInput.displayName = "ChokaoInput";
export default ChokaoInput;
