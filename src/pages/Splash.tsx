import { useState } from "react";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import { useNavigate } from "react-router-dom";
import mascotImg from "@/assets/chokao-mascot.png";

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

      {/* Mascot with wave animation */}
      <div className="relative z-10 flex flex-col items-center px-10">
        <div className="animate-mascot-entrance">
          <img
            src={mascotImg}
            alt="Mascota CHOKAO"
            width={220}
            height={280}
            className="animate-mascot-wave drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          />
        </div>

        <p className="text-chokao-cream/70 text-[14px] font-body tracking-[0.15em] uppercase mt-4">
          ¡Bienvenido a
        </p>
        <h1 className="font-display font-bold text-[44px] text-transparent bg-clip-text bg-gradient-to-r from-chokao-yellow via-chokao-cream to-chokao-yellow leading-tight tracking-tight">
          CHOKAO
        </h1>
        <p className="text-chokao-cream text-[16px] mt-1 text-center font-body font-medium leading-snug">
          El evento del mejor<br />
          <span className="text-chokao-yellow font-display font-semibold text-[18px]">cacao del mundo</span>
        </p>
        <p className="text-chokao-cream/40 text-[12px] mt-3 tracking-widest uppercase font-body">
          5ta Edición • Guayaquil, Ecuador
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 w-full px-10 mt-12 flex flex-col gap-3">
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
