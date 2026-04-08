import { ArrowLeft, Bell } from "lucide-react";
import ChokaoIcon from "./ChokaoIcon";

interface AppHeaderProps {
  variant?: "brand" | "back";
  title?: string;
  onBack?: () => void;
  showNotification?: boolean;
}

const AppHeader = ({ variant = "brand", title, onBack, showNotification = false }: AppHeaderProps) => {
  return (
    <header className="h-14 bg-chokao-primary flex items-center px-5 sticky top-0 z-40">
      {variant === "brand" ? (
        <>
          <div className="flex items-center gap-2">
            <ChokaoIcon size={28} />
            <span className="font-display font-bold text-[20px] text-foreground tracking-tight">
              CHOKAO
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {showNotification && (
              <button className="text-chokao-cream/70 hover:text-foreground transition-colors relative">
                <Bell size={22} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-chokao-red rounded-full" />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <button onClick={onBack} className="text-foreground mr-3 hover:text-chokao-yellow transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <span className="font-display font-semibold text-[18px] text-foreground flex-1 text-center pr-6">
            {title}
          </span>
        </>
      )}
    </header>
  );
};

export default AppHeader;
