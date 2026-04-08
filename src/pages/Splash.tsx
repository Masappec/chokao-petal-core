import { useState } from "react";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-chokao-primary flex flex-col items-center justify-center overflow-hidden max-w-[390px] mx-auto">
      {/* Decorative background petals */}
      <div className="absolute -top-20 -left-20 pointer-events-none">
        <ChokaoIcon size={360} opacity={0.05} className="rotate-[25deg]" />
      </div>
      <div className="absolute -bottom-32 -right-16 pointer-events-none">
        <ChokaoIcon size={400} opacity={0.04} className="rotate-[-15deg]" />
      </div>
      <div className="absolute top-1/3 right-[-100px] pointer-events-none">
        <ChokaoIcon size={280} opacity={0.06} className="rotate-[45deg]" />
      </div>

      {/* Language toggle */}
      <div className="absolute top-4 right-5 z-10">
        <div className="flex bg-chokao-surface rounded-full p-0.5 border border-chokao-border">
          <button
            onClick={() => setLang("ES")}
            className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
              lang === "ES" ? "bg-chokao-yellow text-chokao-primary" : "text-chokao-cream/60"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang("EN")}
            className={`text-[11px] font-medium px-3 py-1 rounded-full transition-all ${
              lang === "EN" ? "bg-chokao-yellow text-chokao-primary" : "text-chokao-cream/60"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-10">
        <ChokaoIcon size={120} />

        <h1 className="font-display font-bold text-[36px] text-foreground mt-6 tracking-tight">
          CHOKAO
        </h1>
        <p className="text-chokao-cream text-[15px] mt-1">
          Feria del Cacao & Chocolate
        </p>
        <p className="text-chokao-cream/50 text-[12px] mt-1">
          5ta Edición • Guayaquil, Ecuador
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 w-full px-10 mt-16 flex flex-col gap-3">
        <ChokaoButton fullWidth onClick={() => navigate("/agenda")}>
          Registrarse
        </ChokaoButton>
        <ChokaoButton variant="ghost" fullWidth onClick={() => navigate("/agenda")}>
          Continuar como invitado
        </ChokaoButton>
      </div>
    </div>
  );
};

export default Splash;
