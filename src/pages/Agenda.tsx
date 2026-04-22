import { useMemo, useState } from "react";
import { Bell, MapPin, Clock, Ticket } from "lucide-react";
import MoreDrawer from "@/components/MoreDrawer";
import BottomNav from "@/components/BottomNav";
import ChokaoIcon from "@/components/ChokaoIcon";
import { useNavigate } from "react-router-dom";

type CategoryKey =
  | "Congreso"
  | "Talleres"
  | "Seminarios"
  | "Rueda de Negocios"
  | "Encuentros"
  | "Premiaciones"
  | "Eventos Especiales";

type ChipKey = "Todos" | CategoryKey;

type Slot = "morning" | "afternoon" | "evening";

interface Activity {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  slot: Slot;
  category: CategoryKey;
  title: string;
  room: string;
  duration: string;
  speaker?: string;
  price?: string;
  spots?: { taken: number; total: number };
  owned?: boolean;
}

// Color de marca por categoría (HEX exacto del brief)
const categoryColor: Record<CategoryKey, string> = {
  Congreso: "#aab93e",
  Talleres: "#aab93e",
  Seminarios: "#fbba30",
  "Rueda de Negocios": "#f0ecd9",
  Encuentros: "#aab93e",
  Premiaciones: "#fbba30",
  "Eventos Especiales": "#fbba30",
};

const days = [
  { label: "Día 1 · 14 Jun", id: 1 as const },
  { label: "Día 2 · 15 Jun", id: 2 as const },
  { label: "Día 3 · 16 Jun", id: 3 as const },
];

const chipCategories: ChipKey[] = [
  "Todos",
  "Congreso",
  "Talleres",
  "Seminarios",
  "Rueda de Negocios",
  "Encuentros",
  "Premiaciones",
];

const slotMeta: Record<Slot, { label: string; emoji: string }> = {
  morning: { label: "MAÑANA · 8:00 – 12:00", emoji: "☀" },
  afternoon: { label: "TARDE · 12:00 – 18:00", emoji: "🌤" },
  evening: { label: "NOCHE · 18:00 – 21:00", emoji: "🌙" },
};

const activities: Activity[] = [
  // ===== DÍA 1 =====
  { id: "d1-1", day: 1, time: "8:30 AM", slot: "morning", category: "Premiaciones", title: "Apertura Oficial CHOKAO 2025", room: "Escenario Principal", duration: "60 min", speaker: "Autoridades ANECACAO" },
  { id: "d1-2", day: 1, time: "9:30 AM", slot: "morning", category: "Congreso", title: "El Cacao Fino de Aroma: Identidad y Diferenciación", room: "Sala Cacao", duration: "90 min", speaker: "Chef María Andrade" },
  { id: "d1-3", day: 1, time: "11:00 AM", slot: "morning", category: "Talleres", title: "Taller: Temperado de Chocolate Artesanal", room: "Sala Taller A", duration: "90 min", speaker: "Maestro Carlos Vera", price: "$25", spots: { taken: 18, total: 20 } },
  { id: "d1-4", day: 1, time: "2:00 PM", slot: "afternoon", category: "Rueda de Negocios", title: "Rueda de Negocios Internacional", room: "Sala Negocios", duration: "120 min", speaker: "ANECACAO" },
  { id: "d1-5", day: 1, time: "3:30 PM", slot: "afternoon", category: "Encuentros", title: "Encuentro de Productores Costa y Sierra", room: "Patio Central", duration: "90 min" },
  { id: "d1-6", day: 1, time: "5:00 PM", slot: "afternoon", category: "Seminarios", title: "Seminario: Certificaciones de Calidad para Exportación", room: "Sala B", duration: "60 min", speaker: "Ing. Roberto Palma" },
  { id: "d1-7", day: 1, time: "7:00 PM", slot: "evening", category: "Eventos Especiales", title: "Coctel de Bienvenida CHOKAO", room: "Terraza Principal", duration: "120 min" },

  // ===== DÍA 2 =====
  { id: "d2-1", day: 2, time: "9:00 AM", slot: "morning", category: "Congreso", title: "Maridaje de Chocolate y Café de Especialidad", room: "Sala Cacao", duration: "90 min", speaker: "Chef Pierre Dubois" },
  { id: "d2-2", day: 2, time: "9:00 AM", slot: "morning", category: "Talleres", title: "Taller: Bombonería y Rellenos Artesanales", room: "Sala Taller A", duration: "90 min", speaker: "Chef Ana Salgado", price: "$30", spots: { taken: 12, total: 15 } },
  { id: "d2-3", day: 2, time: "11:00 AM", slot: "morning", category: "Seminarios", title: "Masterclass: Fermentación y Secado del Cacao", room: "Sala B", duration: "90 min", speaker: "Dr. Luis Moreno", price: "$20", owned: true },
  { id: "d2-4", day: 2, time: "1:00 PM", slot: "afternoon", category: "Congreso", title: "Foro: Sostenibilidad en la Cadena de Valor del Cacao", room: "Sala Cacao", duration: "90 min", speaker: "Panel de expertos" },
  { id: "d2-5", day: 2, time: "3:00 PM", slot: "afternoon", category: "Talleres", title: "Taller: Cata Profesional de Chocolate", room: "Sala Taller B", duration: "60 min", speaker: "Valeria Cruz", price: "$35", spots: { taken: 8, total: 10 } },
  { id: "d2-6", day: 2, time: "4:30 PM", slot: "afternoon", category: "Encuentros", title: "Encuentro: Mujeres Cacaoteras del Ecuador", room: "Sala C", duration: "90 min" },
  { id: "d2-7", day: 2, time: "6:00 PM", slot: "evening", category: "Rueda de Negocios", title: "Rueda de Negocios: Compradores Internacionales", room: "Sala Negocios", duration: "120 min", speaker: "ANECACAO" },

  // ===== DÍA 3 =====
  { id: "d3-1", day: 3, time: "9:00 AM", slot: "morning", category: "Premiaciones", title: "Competencia Internacional de Chocolatería", room: "Escenario Principal", duration: "180 min", speaker: "Jurado Internacional" },
  { id: "d3-2", day: 3, time: "9:00 AM", slot: "morning", category: "Talleres", title: "Taller: Chocolate con Ingredientes Amazónicos", room: "Sala Taller A", duration: "90 min", speaker: "Chef Rodrigo Arias", price: "$25", spots: { taken: 20, total: 20 } },
  { id: "d3-3", day: 3, time: "11:30 AM", slot: "morning", category: "Seminarios", title: "Seminario: Tendencias del Mercado Mundial del Cacao 2025", room: "Sala B", duration: "60 min", speaker: "Carla Vega" },
  { id: "d3-4", day: 3, time: "2:00 PM", slot: "afternoon", category: "Congreso", title: "Foro de Cierre: El Futuro del Cacao Ecuatoriano", room: "Sala Cacao", duration: "90 min", speaker: "Panel ANECACAO" },
  { id: "d3-5", day: 3, time: "3:30 PM", slot: "afternoon", category: "Encuentros", title: "Encuentro Final de Productores y Exportadores", room: "Patio Central", duration: "60 min" },
  { id: "d3-6", day: 3, time: "5:00 PM", slot: "afternoon", category: "Premiaciones", title: "Ceremonia de Premiación al Mejor Cacao de Ecuador", room: "Escenario Principal", duration: "90 min", speaker: "Autoridades ANECACAO" },
  { id: "d3-7", day: 3, time: "7:30 PM", slot: "evening", category: "Eventos Especiales", title: "Clausura y Brindis CHOKAO 2025", room: "Terraza Principal", duration: "120 min" },
];

// Mapea chip → categorías incluidas
const chipMatches = (chip: ChipKey, cat: CategoryKey): boolean => {
  if (chip === "Todos") return true;
  if (chip === "Premiaciones") return cat === "Premiaciones" || cat === "Eventos Especiales";
  return chip === cat;
};

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();

interface CardProps {
  a: Activity;
  onClick: () => void;
}

const ActivityRow = ({ a, onClick }: CardProps) => {
  const color = categoryColor[a.category];
  const soldOut = a.spots && a.spots.taken >= a.spots.total;
  const lastSpots = !!a.spots && !soldOut && a.spots.total - a.spots.taken < 3;

  return (
    <button
      onClick={onClick}
      className="w-full text-left relative rounded-2xl overflow-hidden transition-all active:scale-[0.98]"
      style={{
        backgroundColor: "#1a2f42",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        opacity: soldOut ? 0.55 : 1,
      }}
    >
      {/* Franja lateral por categoría */}
      <span
        aria-hidden
        className="absolute left-2 top-3 bottom-3 w-[3px] rounded-[3px]"
        style={{ backgroundColor: color }}
      />

      {/* Badge AGOTADO esquina superior derecha */}
      {soldOut && (
        <span
          className="absolute top-0 right-0 px-2.5 py-1 font-bold uppercase tracking-wider text-[11px]"
          style={{
            backgroundColor: "#2a4a62",
            color: "rgba(240,236,217,0.4)",
            borderRadius: "0 16px 0 8px",
          }}
        >
          Agotado
        </span>
      )}

      <div className="pl-5 pr-4 py-4">
        {/* Fila superior: chip categoría + hora */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="rounded-full px-3 py-[5px] text-[11px] uppercase tracking-[0.5px] font-medium border whitespace-nowrap"
            style={{
              backgroundColor: `${color}26`,
              borderColor: `${color}66`,
              color: color,
            }}
          >
            {a.category}
          </span>
          <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>
            {a.time}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-display font-semibold text-[15px] text-white leading-snug mt-2 line-clamp-2">
          {a.title}
        </h3>

        {/* Speaker */}
        {a.speaker && (
          <div className="flex items-center gap-2 mt-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: "#2a4a62",
                border: `1px solid ${color}`,
                color: "#f0ecd9",
              }}
            >
              {initials(a.speaker)}
            </div>
            <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              {a.speaker}
            </span>
          </div>
        )}

        {/* Fila inferior: sala/duración + estado */}
        <div className="flex items-center justify-between mt-3 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin size={12} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.4)" }} />
            <span className="text-[12px] truncate" style={{ color: "rgba(240,236,217,0.6)" }}>
              {a.room}
            </span>
            <span style={{ color: "rgba(240,236,217,0.3)" }}>·</span>
            <Clock size={12} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.4)" }} />
            <span className="text-[12px]" style={{ color: "rgba(240,236,217,0.6)" }}>
              {a.duration}
            </span>
          </div>

          <div className="shrink-0">
            {soldOut ? null : a.owned ? (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold"
                style={{ backgroundColor: "rgba(170,185,62,0.18)", color: "#aab93e", border: "1px solid rgba(170,185,62,0.5)" }}
              >
                <Ticket size={12} strokeWidth={2} />
                Ya tienes entrada
              </span>
            ) : lastSpots ? (
              <span
                className="rounded-full px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wide"
                style={{ backgroundColor: "rgba(231,62,64,0.18)", color: "#e73e40", border: "1px solid rgba(231,62,64,0.5)" }}
              >
                Últimos cupos
              </span>
            ) : a.price ? (
              <span
                className="rounded-full px-3 py-1 text-[13px] font-bold"
                style={{ backgroundColor: "#fbba30", color: "#102132" }}
              >
                {a.price}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
};

const Agenda = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeChip, setActiveChip] = useState<ChipKey>("Todos");
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const filtered = useMemo(
    () => activities.filter((a) => a.day === activeDay && chipMatches(activeChip, a.category)),
    [activeDay, activeChip]
  );

  const grouped = useMemo(() => {
    const groups: Record<Slot, Activity[]> = { morning: [], afternoon: [], evening: [] };
    filtered.forEach((a) => groups[a.slot].push(a));
    return groups;
  }, [filtered]);

  const handleDayChange = (id: 1 | 2 | 3) => {
    setActiveDay(id);
    setActiveChip("Todos");
  };

  const isEmpty = filtered.length === 0;

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto pb-24">
      <AppHeader variant="brand" title="Agenda" showNotification />

      {/* Day selector */}
      <div className="flex border-b border-chokao-border/30 px-5 mt-2 gap-1">
        {days.map((day) => {
          const isActive = activeDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => handleDayChange(day.id)}
              className="flex-1 py-3 text-center text-[13px] transition-all relative rounded-t-lg"
              style={{
                color: isActive ? "#ffffff" : "rgba(240,236,217,0.5)",
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? "rgba(251,186,48,0.08)" : "transparent",
              }}
            >
              {day.label}
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full" style={{ backgroundColor: "#fbba30" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Category chips */}
      <div className="flex gap-2 pl-5 pr-3 py-3 mt-1 overflow-x-auto no-scrollbar">
        {chipCategories.map((chip) => {
          const isActive = activeChip === chip;
          const color = chip === "Todos" ? "#fbba30" : categoryColor[chip as CategoryKey];
          return (
            <button
              key={chip}
              onClick={() => setActiveChip(chip)}
              className="rounded-full px-[14px] py-[6px] text-[12px] uppercase tracking-[0.5px] font-medium border transition-all whitespace-nowrap"
              style={
                isActive
                  ? { backgroundColor: `${color}26`, borderColor: color, color }
                  : { backgroundColor: "#1a2f42", borderColor: "#2a4a62", color: "rgba(240,236,217,0.6)" }
              }
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Lista o estado vacío */}
      {isEmpty ? (
        <div className="flex flex-col items-center text-center px-8 mt-12">
          <div style={{ opacity: 0.2 }}>
            <ChokaoIcon size={48} />
          </div>
          <h3 className="font-display font-semibold text-white text-[16px] mt-4">Sin actividades</h3>
          <p className="text-[14px] mt-1" style={{ color: "rgba(240,236,217,0.5)" }}>
            No hay {activeChip.toLowerCase()} programados para el Día {activeDay}
          </p>
          <button
            onClick={() => setActiveChip("Todos")}
            className="mt-5 text-[13px] font-semibold px-4 py-2 rounded-full transition-colors"
            style={{ color: "#fbba30" }}
          >
            Ver todas las actividades
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-5">
          {(["morning", "afternoon", "evening"] as Slot[]).map((slot) => {
            const items = grouped[slot];
            if (items.length === 0) return null;
            return (
              <div key={slot}>
                {/* Separador de franja */}
                <div className="flex items-center gap-2 px-5 py-2">
                  <div style={{ opacity: 0.4 }}>
                    <ChokaoIcon size={12} />
                  </div>
                  <span
                    className="text-[12px] uppercase font-medium"
                    style={{ color: "rgba(240,236,217,0.4)", letterSpacing: "1px" }}
                  >
                    {slotMeta[slot].emoji} {slotMeta[slot].label}
                  </span>
                </div>

                <div className="space-y-3 px-5">
                  {items.map((a) => (
                    <ActivityRow key={a.id} a={a} onClick={() => navigate("/activity")} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BottomNav
        activeTab="agenda"
        onTabChange={(tab) => {
          if (tab === "home") navigate("/home");
          if (tab === "entradas") navigate("/entradas");
          if (tab === "mas") setMoreOpen(true);
        }}
      />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Agenda;
