import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Download, Info } from "lucide-react";
import { toast } from "sonner";
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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mi contacto CHOKAO",
          text: "Agrégame en CHOKAO 2025 — María Rodríguez",
        });
      } else {
        toast.success("QR copiado para compartir");
      }
    } catch {
      // user cancelled
    }
  };

  const handleDownload = () => {
    toast.success("Imagen descargada");
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-chokao-primary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5 bg-chokao-primary">
        <button onClick={() => navigate(-1)} className="text-foreground hover:text-chokao-yellow">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-foreground pr-6">Mi QR</h1>
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 pb-6">
        {/* QR Card */}
        <div className="bg-chokao-surface rounded-3xl p-7 animate-fade-in">
          {/* Brand header */}
          <div className="flex items-center justify-center gap-2 pb-4 border-b border-chokao-border">
            <ChokaoIcon size={24} />
            <span className="font-display font-bold text-[14px] text-foreground tracking-wide">CHOKAO</span>
          </div>

          {/* Avatar + identity */}
          <div className="flex flex-col items-center pt-5">
            <div className="w-14 h-14 rounded-full bg-chokao-primary border-2 border-chokao-yellow flex items-center justify-center">
              <span className="font-display font-bold text-[20px] text-chokao-yellow">M</span>
            </div>
            <h2 className="mt-3 font-display font-bold text-[18px] text-foreground">María Rodríguez</h2>
            <div className="mt-1.5 inline-flex items-center px-3 py-0.5 rounded-full bg-chokao-green/15 border border-chokao-green">
              <span className="text-[12px] text-chokao-green font-medium">Chocolatera / Chef</span>
            </div>
            <p className="mt-1.5 text-[13px] text-chokao-cream/60">Chocolates El Árbol</p>
          </div>

          {/* QR with petal corners */}
          <div className="mt-5 mx-auto relative bg-white rounded-xl p-3 w-[200px] h-[200px] flex items-center justify-center">
            <QrPlaceholder size={176} />
            {petals.map((p) => (
              <Petal key={p.pos} color={p.color} position={p.pos} />
            ))}
          </div>

          <p className="mt-4 text-center text-[12px] text-chokao-cream/50">
            Escanea para agregar mi contacto
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="h-12 rounded-full bg-chokao-yellow text-chokao-primary font-semibold text-[15px] flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <Share2 size={18} strokeWidth={2} />
            Compartir QR
          </button>
          <button
            onClick={handleDownload}
            className="h-12 rounded-full border-2 border-chokao-yellow text-chokao-yellow font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-chokao-yellow/10 transition"
          >
            <Download size={18} strokeWidth={2} />
            Descargar imagen
          </button>
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
