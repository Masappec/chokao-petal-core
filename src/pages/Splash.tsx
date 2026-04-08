import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import { useNavigate } from "react-router-dom";
import mascotImg from "@/assets/chokao-mascot.png";

const Splash = () => {
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

      {/* Mascot with wave animation */}
      <div className="relative z-10 flex flex-col items-center px-10">
        <div className="animate-mascot-entrance">
          <img
            src={mascotImg}
            alt="Mascota CHOKAO"
            width={280}
            height={340}
            className="animate-mascot-wave drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          />
        </div>

        <p className="text-chokao-cream/70 text-[14px] font-body tracking-[0.15em] uppercase mt-4">
          Bienvenido a
        </p>
        <div className="flex items-center gap-2 mt-1">
          <ChokaoIcon size={40} opacity={0.8} />
          <h1 className="font-display font-extrabold text-[48px] text-chokao-cream leading-none tracking-[-0.02em]" style={{ fontStretch: 'condensed' }}>
            CHOKAO
          </h1>
        </div>
        <p className="text-chokao-cream text-[16px] mt-2 text-center font-body font-medium leading-snug">
          El evento del mejor<br />cacao del mundo
        </p>
      </div>

      {/* Buttons */}
      <div className="relative z-10 w-full px-10 mt-12 flex flex-col gap-3">
        <ChokaoButton fullWidth onClick={() => navigate("/register")}>
          Registrarse
        </ChokaoButton>
        <ChokaoButton variant="ghost" fullWidth onClick={() => navigate("/login")}>
          Iniciar sesión
        </ChokaoButton>
        <ChokaoButton variant="ghost" fullWidth onClick={() => navigate("/agenda")}>
          Continuar como invitado
        </ChokaoButton>
      </div>
    </div>
  );
};

export default Splash;
