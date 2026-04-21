import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MoreDrawer from "@/components/MoreDrawer";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";

const goldSponsors = [
  { id: "nestle", name: "Nestlé Ecuador", sector: "Chocolatería Industrial" },
  { id: "agrocalidad", name: "Agrocalidad", sector: "Certificación y Calidad" },
  { id: "pronaca", name: "Pronaca", sector: "Agroindustria" },
  { id: "supermaxi", name: "Supermaxi", sector: "Retail" },
];

const silverSponsors = [
  { id: "procacao", name: "ProCacao", sector: "Asociación" },
  { id: "iniap", name: "INIAP", sector: "Investigación" },
  { id: "flor-de-mayo", name: "Flor de Mayo", sector: "Exportación" },
  { id: "fedexpor", name: "Fedexpor", sector: "Gremio" },
  { id: "anecacao", name: "Anecacao", sector: "Asociación" },
  { id: "mag", name: "MAG", sector: "Gobierno" },
];

const Sponsors = () => {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

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
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Patrocinadores
        </h1>
      </header>

      <p className="px-5 text-center text-[13px] mt-1" style={{ color: "rgba(240,236,217,0.5)" }}>
        Marcas que hacen posible CHOKAO 2025
      </p>

      {/* PLATINUM */}
      <div className="px-5 mt-6">
        <p
          className="text-[12px] font-bold uppercase mb-3"
          style={{ color: "#fbba30", letterSpacing: "2px" }}
        >
          ✦ PLATINUM
        </p>
        <button
          onClick={() => navigate("/patrocinadores/banco-pichincha")}
          className="w-full text-left relative p-6 rounded-[20px] overflow-hidden transition-transform active:scale-[0.99]"
          style={{
            backgroundColor: "#1a2f42",
            border: "1px solid rgba(251,186,48,0.35)",
            boxShadow: "0 8px 32px rgba(251,186,48,0.12)",
          }}
        >
          <div className="absolute top-3 right-3" style={{ opacity: 0.15 }}>
            <ChokaoIcon size={20} />
          </div>
          <div
            className="mx-auto w-[160px] h-[70px] rounded-[10px] flex items-center justify-center text-[12px]"
            style={{ backgroundColor: "#102132", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.4)" }}
          >
            LOGO
          </div>
          <h3 className="mt-4 text-center font-display font-bold text-[18px] text-white">
            Banco Pichincha
          </h3>
          <p className="text-center italic text-[14px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            El banco que impulsa el agro ecuatoriano
          </p>
          <div className="my-4" style={{ height: 1, backgroundColor: "#2a4a62" }} />
          <p className="text-center text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            Apoyamos a productores y emprendedores del sector cacaotero con financiamiento y servicios especializados.
          </p>
        </button>
      </div>

      {/* GOLD */}
      <div className="mt-7">
        <p
          className="px-5 text-[12px] font-bold uppercase mb-3"
          style={{ color: "#fbba30", letterSpacing: "2px" }}
        >
          ◆ GOLD
        </p>
        <div className="pl-5 flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {goldSponsors.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(`/patrocinadores/${s.id}`)}
              className="relative p-[18px] rounded-2xl text-center flex-shrink-0 w-[160px]"
              style={{ backgroundColor: "#1a2f42", border: "1px solid rgba(251,186,48,0.2)" }}
            >
              <span
                className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] uppercase"
                style={{ backgroundColor: "rgba(251,186,48,0.12)", border: "1px solid #fbba30", color: "#fbba30" }}
              >
                Gold
              </span>
              <div
                className="mx-auto w-[90px] h-[40px] rounded-lg flex items-center justify-center text-[10px]"
                style={{ backgroundColor: "#102132", color: "rgba(240,236,217,0.4)" }}
              >
                LOGO
              </div>
              <p className="mt-3 text-white font-semibold text-[14px]">{s.name}</p>
              <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>{s.sector}</p>
              <Globe size={18} strokeWidth={1.5} className="mx-auto mt-2" style={{ color: "rgba(240,236,217,0.4)" }} />
            </button>
          ))}
          <div className="w-3 flex-shrink-0" />
        </div>
      </div>

      {/* SILVER */}
      <div className="mt-7">
        <p
          className="px-5 text-[12px] font-bold uppercase mb-3"
          style={{ color: "#f0ecd9", letterSpacing: "2px" }}
        >
          ● SILVER
        </p>
        <div className="pl-5 flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {silverSponsors.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(`/patrocinadores/${s.id}`)}
              className="relative p-[14px] rounded-[14px] text-center flex-shrink-0 w-[110px]"
              style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62" }}
            >
              <span
                className="absolute top-1.5 right-1.5 px-1 py-0.5 rounded-full text-[9px] uppercase"
                style={{ backgroundColor: "rgba(240,236,217,0.1)", border: "1px solid #f0ecd9", color: "#f0ecd9" }}
              >
                Silver
              </span>
              <div
                className="mx-auto w-[60px] h-[28px] rounded-md flex items-center justify-center text-[9px]"
                style={{ backgroundColor: "#102132", color: "rgba(240,236,217,0.4)" }}
              >
                LOGO
              </div>
              <p className="mt-2.5 text-white font-medium text-[12px] leading-tight">{s.name}</p>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(240,236,217,0.5)" }}>{s.sector}</p>
            </button>
          ))}
          <div className="w-3 flex-shrink-0" />
        </div>
      </div>

      {/* Footer */}
      <div
        className="mx-5 mt-8 p-5 rounded-2xl text-center"
        style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62" }}
      >
        <div className="flex justify-center">
          <ChokaoIcon size={32} />
        </div>
        <p className="mt-3 italic text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>
          Gracias a nuestros patrocinadores por hacer posible CHOKAO
        </p>
      </div>

      <BottomNav activeTab="mas" onTabChange={handleTab} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Sponsors;
