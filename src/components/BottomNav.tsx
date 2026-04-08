import { Home, CalendarDays, Ticket, User, GripHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

type TabId = "home" | "agenda" | "entradas" | "perfil" | "mas";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange?: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as const, label: "Home", icon: Home },
  { id: "agenda" as const, label: "Agenda", icon: CalendarDays },
  { id: "entradas" as const, label: "Entradas", icon: Ticket },
  { id: "perfil" as const, label: "Perfil", icon: User },
  { id: "mas" as const, label: "Más", icon: GripHorizontal },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const [animatingTab, setAnimatingTab] = useState<string | null>(null);

  const handleTab = (id: TabId) => {
    setAnimatingTab(id);
    onTabChange?.(id);
  };

  useEffect(() => {
    if (animatingTab) {
      const t = setTimeout(() => setAnimatingTab(null), 200);
      return () => clearTimeout(t);
    }
  }, [animatingTab]);

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50"
      style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
      <div className="flex items-center justify-around h-[64px] px-2" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isAnimating = animatingTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 transition-all duration-200"
              style={{
                color: isActive ? "#fbba30" : "rgba(240, 236, 217, 0.45)",
                transform: isAnimating ? "scale(0.95)" : "scale(1)",
              }}
            >
              <tab.icon size={24} strokeWidth={1.5} fill={isActive ? "currentColor" : "none"} />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
