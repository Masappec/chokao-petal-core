import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import CategoryChip from "@/components/CategoryChip";
import ActivityCard from "@/components/ActivityCard";
import ChokaoSeparator from "@/components/ChokaoSeparator";
import { useNavigate } from "react-router-dom";

const days = [
  { label: "Día 1 · 14 Jun", id: 1 },
  { label: "Día 2 · 15 Jun", id: 2 },
  { label: "Día 3 · 16 Jun", id: 3 },
];

const categories = [
  { label: "Todos" },
  { label: "Congreso" },
  { label: "Talleres" },
  { label: "Seminarios" },
  { label: "Rueda de Negocios" },
  { label: "Premiaciones" },
];

const Agenda = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto pb-24">
      <AppHeader variant="brand" title="Agenda" showNotification />

      {/* Day selector */}
      <div className="flex border-b border-chokao-border/30">
        {days.map((day) => (
          <button
            key={day.id}
            onClick={() => setActiveDay(day.id)}
            className={`flex-1 py-3 text-center text-[13px] font-medium transition-all relative ${
              activeDay === day.id ? "text-foreground" : "text-chokao-cream/50"
            }`}
          >
            {day.label}
            {activeDay === day.id && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-chokao-yellow rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <CategoryChip
            key={cat.label}
            label={cat.label}
            color="green"
            active={activeCategory === cat.label}
            onClick={() => setActiveCategory(cat.label)}
          />
        ))}
      </div>

      {/* Activities */}
      <div className="px-5 space-y-3">
        <ActivityCard
          title="Maridaje de Chocolate y Café de Especialidad"
          time="9:00 AM"
          category="Congreso"
          categoryColor="green"
          speaker="Chef María Andrade"
          onClick={() => navigate("/activity")}
        />

        <ActivityCard
          title="Taller: Temperado de Chocolate Artesanal"
          time="11:00 AM"
          category="Taller"
          categoryColor="green"
          speaker="Chef María Andrade"
          price="$25"
          spots={{ taken: 18, total: 20 }}
          onClick={() => navigate("/activity")}
        />

        <ActivityCard
          title="Rueda de Negocios Internacional"
          time="2:00 PM"
          category="Negocios"
          categoryColor="green"
          urgent
          onClick={() => navigate("/activity")}
        />

        <ActivityCard
          title="Ceremonia de Premiación al Mejor Cacao"
          time="5:00 PM"
          category="Premiación"
          categoryColor="green"
          onClick={() => navigate("/activity")}
        />
      </div>

      <BottomNav activeTab="agenda" onTabChange={(tab) => {
        if (tab === "home") navigate("/home");
        if (tab === "mas") setMoreOpen(true);
      }} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Agenda;
