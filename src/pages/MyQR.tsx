import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import QrPlaceholder from "@/components/QrPlaceholder";

const petals = [
  { color: "#fbba30", pos: "top-left" },
  { color: "#aab93e", pos: "top-right" },
  { color: "#f0ecd9", pos: "bottom-left" },
  { color: "#e73e40", pos: "bottom-right" },
];

const Petal = ({ color, position }: { color: string; position: string }) => {
  const base = "absolute w-2 h-2 rounded-full";
  const map: Record<string, string> = {
    "top-left": "top-1.5 left-1.5",
    "top-right": "top-1.5 right-1.5",
    "bottom-left": "bottom-1.5 left-1.5",
    "bottom-right": "bottom-1.5 right-1.5",
  };
  return <span className={`${base} ${map[position]}`} style={{ backgroundColor: color }} />;
};

const MyQR = () => {
  const navigate = useNavigate();



  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-chokao-primary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5 bg-chokao-primary">
        <button onClick={() => navigate(-1)} className="text-foreground hover:text-chokao-yellow">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-foreground pr-6">Mi QR</h1>
      </header>

      <div className="flex-1 flex flex-col px-6 pt-2 pb-6">
        {/* QR Card */}
        <div className="bg-chokao-surface rounded-3xl p-7 animate-fade-in border border-chokao-yellow/30 shadow-[0_8px_32px_-8px_rgba(251,186,48,0.25)]">
          {/* Brand header */}
          <div className="flex items-center justify-center gap-2 pb-4 border-b border-chokao-yellow/30">
            <ChokaoIcon size={24} />
            <span className="font-display font-bold text-[14px] text-chokao-yellow tracking-wide">CHOKAO</span>
          </div>

          {/* Avatar + identity */}
          <div className="flex flex-col items-center pt-5">
            <div className="w-14 h-14 rounded-full bg-chokao-primary border-2 border-chokao-yellow flex items-center justify-center">
              <span className="font-display font-bold text-[20px] text-chokao-yellow">M</span>
            </div>
            <h2 className="mt-3 font-display font-bold text-[18px] text-foreground">María Rodríguez</h2>
            <div className="mt-1.5 inline-flex items-center px-3 py-0.5 rounded-full bg-chokao-yellow/15 border border-chokao-yellow">
              <span className="text-[12px] text-chokao-yellow font-medium">Chocolatera / Chef</span>
            </div>
            <p className="mt-1.5 text-[13px] text-chokao-cream/60">Chocolates El Árbol</p>
          </div>

          {/* QR with yellow frame + petal corners */}
          <div className="mt-5 mx-auto p-1.5 rounded-2xl bg-gradient-to-br from-chokao-yellow to-chokao-yellow/60 w-fit">
            <div className="relative bg-white rounded-xl p-3 w-[200px] h-[200px] flex items-center justify-center">
              <QrPlaceholder size={176} />
              {petals.map((p) => (
                <Petal key={p.pos} color={p.color} position={p.pos} />
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-[12px] text-chokao-yellow/80">
            Escanea para agregar mi contacto
          </p>
        </div>



        {/* Info note */}
        <div className="mt-5 flex items-start gap-2 p-3 rounded-xl bg-chokao-yellow/10 border border-chokao-yellow/30">
          <Info size={16} className="text-chokao-yellow flex-shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[12px] text-chokao-cream/80 leading-relaxed">
            Tu QR es único e intransferible. Al escanearlo, el otro asistente agregará tu contacto automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyQR;
