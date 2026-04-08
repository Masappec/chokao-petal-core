import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import CategoryChip from "@/components/CategoryChip";
import ChokaoButton from "@/components/ChokaoButton";
import ChokaoSeparator from "@/components/ChokaoSeparator";
import { Clock, MapPin, Users } from "lucide-react";
import tallerImg from "@/assets/taller-temperado.png";
import talleresLogo from "@/assets/talleres-logo.png";

const ActivityDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto pb-28">
      <AppHeader variant="back" title="" onBack={() => navigate(-1)} />

      {/* Category logo */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#f0ecd9" }}>
          <img src={talleresLogo} alt="Talleres Especializados" className="w-[72px] h-auto" />
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full h-[200px] overflow-hidden mx-5 rounded-2xl mt-2" style={{ width: "calc(100% - 40px)" }}>
        <img src={tallerImg} alt="Taller de Temperado de Chocolate" className="w-full h-full object-cover" />
      </div>

      {/* Title area */}
      <div className="px-5 pt-4 pb-4">
        <h1 className="font-display font-bold text-[24px] text-foreground leading-tight">
          Taller: Temperado de Chocolate Artesanal
        </h1>
      </div>

      {/* Metadata */}
      <div className="px-5 py-5 space-y-3">
        <div className="flex items-center gap-3 text-chokao-cream/80 text-[14px]">
          <Clock size={18} strokeWidth={1.5} className="text-chokao-yellow/70 shrink-0" />
          <span>Sábado 15 Jun · 11:00 AM · 90 min</span>
        </div>
        <div className="flex items-center gap-3 text-chokao-cream/80 text-[14px]">
          <MapPin size={18} strokeWidth={1.5} className="text-chokao-yellow/70 shrink-0" />
          <span>Sala Cacao — Planta Baja</span>
        </div>
        <div className="flex items-center gap-3 text-chokao-cream/80 text-[14px]">
          <Users size={18} strokeWidth={1.5} className="text-chokao-yellow/70 shrink-0" />
          <span>18 / 20 cupos</span>
        </div>
      </div>

      <div className="px-5">
        <div className="h-px bg-chokao-border/30 my-1" />
      </div>

      {/* Speaker */}
      <div className="px-5 py-4">
        <p className="text-chokao-cream/40 text-[11px] uppercase tracking-widest font-medium mb-3">
          Ponente
        </p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-chokao-border flex items-center justify-center text-[16px] font-bold text-chokao-cream">
            MA
          </div>
          <div>
            <p className="text-foreground font-semibold text-[15px]">Chef María Andrade</p>
            <p className="text-chokao-cream/50 text-[13px]">Chocolatera · Quito, Ecuador</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-5 py-2">
        <p className="text-chokao-cream/70 text-[15px] leading-relaxed">
          Aprende las técnicas fundamentales del temperado de chocolate, desde la
          selección del grano hasta el brillo perfecto. Este taller práctico te
          guiará paso a paso en el proceso artesanal utilizado por los mejores
          chocolateros del Ecuador.
        </p>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-chokao-primary border-t border-chokao-border/40 px-5 py-3 flex items-center justify-between z-50">
        <div>
          <p className="text-chokao-cream/50 text-[11px] uppercase tracking-wide">Precio</p>
          <p className="text-chokao-yellow font-display font-bold text-[22px]">$25.00</p>
        </div>
        <ChokaoButton>Comprar Entrada</ChokaoButton>
      </div>
    </div>
  );
};

export default ActivityDetail;
