import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Map, Search, MapPin, ChevronRight } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MoreDrawer from "@/components/MoreDrawer";

interface Exhibitor {
  id: string;
  name: string;
  sector: string;
  description: string;
  stand: string;
  initials: string;
}

const sectors = [
  "Todos",
  "Productores de Cacao",
  "Chocolatería",
  "Exportadores",
  "Proveedores",
  "Gastronomía",
  "Tecnología Agrícola",
];

const exhibitors: Exhibitor[] = [
  { id: "hacienda-los-alamos", name: "Hacienda Los Álamos", sector: "Productores de Cacao", description: "Cacao fino de aroma, origen Manabí", stand: "Stand #3", initials: "HA" },
  { id: "chocolates-el-arbol", name: "Chocolates El Árbol", sector: "Chocolatería", description: "Tabletas artesanales bean-to-bar", stand: "Stand #7", initials: "CA" },
  { id: "cacaoexport", name: "CacaoExport S.A.", sector: "Exportadores", description: "Exportación de cacao en grano y pasta", stand: "Stand #12", initials: "CE" },
  { id: "agrotech-ecuador", name: "AgroTech Ecuador", sector: "Tecnología Agrícola", description: "Soluciones para el cultivo de cacao", stand: "Stand #18", initials: "AE" },
  { id: "sabores-pacifico", name: "Sabores del Pacífico", sector: "Gastronomía", description: "Productos gourmet derivados del cacao", stand: "Stand #21", initials: "SP" },
  { id: "ferrero-ecuador", name: "Ferrero Ecuador", sector: "Proveedores", description: "Insumos y maquinaria chocolatera", stand: "Stand #25", initials: "FE" },
];

const Exhibitors = () => {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSector, setActiveSector] = useState("Todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return exhibitors.filter((e) => {
      const matchSector = activeSector === "Todos" || e.sector === activeSector;
      const q = query.trim().toLowerCase();
      const matchQuery = !q || e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
      return matchSector && matchQuery;
    });
  }, [activeSector, query]);

  const handleTab = (tab: string) => {
    if (tab === "home") navigate("/home");
    if (tab === "agenda") navigate("/agenda");
    if (tab === "perfil") navigate("/perfil");
    if (tab === "mas") setMoreOpen(true);
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px]" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white">
          Expositores
        </h1>
        <button aria-label="Mapa" style={{ color: "#fbba30" }}>
          <Map size={22} strokeWidth={1.5} />
        </button>
      </header>

      <p className="px-5 text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>
        Feria Comercial CHOKAO 2025
      </p>

      {/* Search */}
      <div className="mx-5 mt-4 flex items-center gap-2 h-[44px] px-3 rounded-xl" style={{ backgroundColor: "#1a2f42" }}>
        <Search size={18} style={{ color: "rgba(240,236,217,0.5)" }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar expositor o producto..."
          className="flex-1 bg-transparent border-0 outline-none text-[14px] text-white placeholder:text-[rgba(240,236,217,0.4)]"
        />
      </div>

      {/* Filters */}
      <div className="mt-3 pl-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {sectors.map((s) => {
          const active = s === activeSector;
          return (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className="flex-shrink-0 h-8 px-3 rounded-full text-[12px] whitespace-nowrap transition-colors"
              style={
                active
                  ? { backgroundColor: "rgba(170,185,62,0.15)", border: "1px solid #aab93e", color: "#aab93e" }
                  : { backgroundColor: "#1a2f42", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.6)" }
              }
            >
              {s}
            </button>
          );
        })}
        <div className="w-3 flex-shrink-0" />
      </div>

      {/* Counter */}
      <p className="px-5 mt-4 text-[13px]" style={{ color: "rgba(240,236,217,0.4)" }}>
        {filtered.length} expositores
      </p>

      {/* List */}
      <div className="mx-5 mt-2 flex flex-col gap-3">
        {filtered.map((e) => (
          <button
            key={e.id}
            onClick={() => navigate(`/expositores/${e.id}`)}
            className="flex items-center text-left p-4 rounded-2xl transition-transform active:scale-[0.99]"
            style={{ backgroundColor: "#1a2f42", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            <div
              className="w-14 h-14 rounded-[10px] flex items-center justify-center flex-shrink-0 text-[14px] font-semibold"
              style={{ backgroundColor: "#102132", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.4)" }}
            >
              {e.initials}
            </div>
            <div className="flex-1 pl-[14px] min-w-0">
              <p className="text-white font-semibold text-[15px] truncate">{e.name}</p>
              <span
                className="inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide"
                style={{ backgroundColor: "rgba(170,185,62,0.15)", border: "1px solid #aab93e", color: "#aab93e" }}
              >
                {e.sector}
              </span>
              <p className="mt-1 text-[13px] truncate" style={{ color: "rgba(240,236,217,0.6)" }}>
                {e.description}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <MapPin size={12} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.4)" }} />
                <span className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>{e.stand}</span>
              </div>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.3)" }} />
          </button>
        ))}
      </div>

      <BottomNav activeTab="mas" onTabChange={handleTab} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Exhibitors;
