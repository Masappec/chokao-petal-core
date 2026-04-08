import { Home, CalendarDays, Compass, User } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "agenda" | "explore" | "profile";
  onTabChange?: (tab: "home" | "agenda" | "explore" | "profile") => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: "home" as const, label: "Home", icon: Home },
    { id: "agenda" as const, label: "Agenda", icon: CalendarDays },
    { id: "explore" as const, label: "Explorar", icon: Compass },
    { id: "profile" as const, label: "Perfil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-chokao-primary border-t border-chokao-border/50 z-50">
      <div className="flex items-center justify-around h-[72px] px-2 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                isActive ? "text-chokao-yellow" : "text-chokao-cream/45"
              }`}
            >
              {tab.icon && <tab.icon size={24} strokeWidth={1.5} />}
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
