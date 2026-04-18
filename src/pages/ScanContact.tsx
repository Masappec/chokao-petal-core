import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { toast } from "sonner";

type ScanState = "scanning" | "valid" | "invalid";

const petalColors = ["#fbba30", "#aab93e", "#f0ecd9", "#e73e40"];

const ScanContact = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ScanState>("scanning");

  const detectedContact = {
    initial: "C",
    name: "Carlos Vera",
    type: "Productor",
    company: "Hacienda Los Álamos",
    country: "🇪🇨 Ecuador",
  };

  const borderColor =
    state === "valid" ? "#aab93e" : state === "invalid" ? "#e73e40" : "#fbba30";

  const handleAdd = () => {
    toast.success("Contacto agregado");
    navigate("/networking");
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-black relative overflow-hidden">
      {/* Simulated camera background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, #1a1a1a 0%, #000 70%), repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 8px)",
        }}
      />

      {/* Header overlay */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center h-[56px] px-5 bg-black/40 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="text-white">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[16px] text-white pr-6">
          Escanear contacto
        </h1>
      </header>

      {/* Viewfinder */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pb-40">
        <div
          className="relative w-[260px] h-[260px] rounded-3xl overflow-hidden transition-colors"
          style={{ border: `2px solid ${borderColor}` }}
        >
          {/* Petals in corners */}
          <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: petalColors[0] }} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: petalColors[1] }} />
          <span className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: petalColors[2] }} />
          <span className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: petalColors[3] }} />

          {/* Scanning line */}
          {state === "scanning" && (
            <div
              className="absolute left-0 right-0 h-[2px]"
              style={{
                backgroundColor: "#fbba30",
                opacity: 0.6,
                boxShadow: "0 0 12px #fbba30",
                animation: "scanline 2s ease-in-out infinite",
              }}
            />
          )}

          {/* Valid overlay */}
          {state === "valid" && (
            <div className="absolute inset-0 flex items-center justify-center bg-chokao-green/20 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-chokao-green flex items-center justify-center animate-scale-in">
                <Check size={32} strokeWidth={3} className="text-chokao-primary" />
              </div>
            </div>
          )}

          {/* Invalid overlay */}
          {state === "invalid" && (
            <div className="absolute inset-0 flex items-center justify-center bg-chokao-red/20 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-chokao-red flex items-center justify-center animate-scale-in">
                <X size={32} strokeWidth={3} className="text-white" />
              </div>
            </div>
          )}
        </div>

        <p className="mt-5 text-white text-[14px] font-medium">Apunta al QR del asistente</p>
        <p className="mt-1 text-chokao-cream/50 text-[12px]">El contacto se agregará automáticamente</p>

        {/* Demo controls — to simulate states */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setState("scanning")}
            className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-[11px]"
          >
            Demo: escaneando
          </button>
          <button
            onClick={() => setState("valid")}
            className="px-3 py-1.5 rounded-full bg-chokao-green/20 text-chokao-green text-[11px] border border-chokao-green/40"
          >
            Demo: válido
          </button>
          <button
            onClick={() => {
              setState("invalid");
              toast.error("QR no reconocido. Solo se pueden escanear perfiles de CHOKAO");
            }}
            className="px-3 py-1.5 rounded-full bg-chokao-red/20 text-chokao-red text-[11px] border border-chokao-red/40"
          >
            Demo: inválido
          </button>
        </div>

        <button className="mt-6 text-chokao-cream/70 text-[13px] underline-offset-4 hover:text-chokao-yellow">
          Ingresar código manualmente
        </button>
      </div>

      {/* Bottom sheet — valid */}
      {state === "valid" && (
        <div className="absolute left-0 right-0 bottom-0 z-40 bg-chokao-surface rounded-t-3xl p-6 animate-fade-in">
          <div className="mx-auto w-12 h-1 rounded-full bg-chokao-cream/20 mb-5" />
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-chokao-primary border-2 border-chokao-green flex items-center justify-center">
              <span className="font-display font-bold text-[18px] text-chokao-green">{detectedContact.initial}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-[16px] text-foreground">{detectedContact.name}</h3>
              <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full bg-chokao-green/15 border border-chokao-green">
                <span className="text-[11px] text-chokao-green font-medium">{detectedContact.type}</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-chokao-cream/60">{detectedContact.company}</p>
          <p className="text-[13px] text-chokao-cream/60">{detectedContact.country}</p>

          <button
            onClick={handleAdd}
            className="mt-5 w-full h-12 rounded-full bg-chokao-yellow text-chokao-primary font-semibold text-[15px] hover:brightness-110 transition"
          >
            Agregar contacto
          </button>
          <button
            onClick={() => setState("scanning")}
            className="mt-2 w-full h-12 rounded-full text-chokao-cream/70 font-medium text-[14px] hover:text-foreground"
          >
            Cancelar
          </button>
        </div>
      )}

      <style>{`
        @keyframes scanline {
          0% { top: 0; }
          50% { top: calc(100% - 2px); }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};

export default ScanContact;
