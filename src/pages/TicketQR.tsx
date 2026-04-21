import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Wallet, Share2, Info } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import { getTicketById } from "@/lib/ticketsMock";

const PETAL_COLORS = ["#fbba30", "#aab93e", "#e73e40", "#f0ecd9"];

const TicketQR = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const t = getTicketById(id);

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-10" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Mi entrada
        </h1>
      </header>

      <div className="mx-5 mt-3 rounded-[24px] overflow-hidden" style={{ backgroundColor: "#1a2f42" }}>
        <div className="h-1.5" style={{ backgroundColor: t.categoryColor }} />
        <div className="p-7">
          <div className="flex items-center justify-center gap-2">
            <ChokaoIcon size={20} />
            <span className="text-white font-display font-semibold text-[14px] tracking-widest">CHOKAO</span>
          </div>
          <div className="my-4 h-px" style={{ backgroundColor: "#2a4a62" }} />

          <h2 className="text-center font-display font-bold text-[18px] text-white">
            {t.activityName}
          </h2>
          <div className="mt-2 flex justify-center">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide"
              style={{
                backgroundColor: `${t.categoryColor}26`,
                border: `1px solid ${t.categoryColor}`,
                color: t.categoryColor,
              }}
            >
              {t.category}
            </span>
          </div>
          <div className="mt-3 flex justify-center gap-4 text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            <span>{t.date}</span>
            <span>·</span>
            <span>{t.time}</span>
            <span>·</span>
            <span>{t.room}</span>
          </div>

          {/* QR */}
          <div className="mt-6 mx-auto relative" style={{ width: 200, height: 200 }}>
            <div
              className="rounded-[14px] flex items-center justify-center"
              style={{ width: 200, height: 200, backgroundColor: "#ffffff", padding: 12 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(#102132 32%, transparent 34%), radial-gradient(#102132 32%, transparent 34%)",
                  backgroundSize: "12px 12px",
                  backgroundPosition: "0 0, 6px 6px",
                }}
              />
            </div>
            {/* Decorative petals at corners */}
            {[
              { top: -6, left: -6 },
              { top: -6, right: -6 },
              { bottom: -6, left: -6 },
              { bottom: -6, right: -6 },
            ].map((pos, i) => (
              <div key={i} className="absolute" style={pos as React.CSSProperties}>
                <div className="rounded-full" style={{ width: 10, height: 10, backgroundColor: PETAL_COLORS[i] }} />
              </div>
            ))}
          </div>

          <p
            className="text-center mt-4 font-mono text-[12px]"
            style={{ color: "rgba(240,236,217,0.4)" }}
          >
            {t.ticketNumber}
          </p>

        </div>
      </div>

      <div className="mx-5 mt-5 flex items-start gap-2">
        <Info size={16} strokeWidth={1.5} style={{ color: "#fbba30", flexShrink: 0, marginTop: 2 }} />
        <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.6)" }}>
          Presenta este QR al personal del evento para acceder a la actividad. Válido para un solo uso.
        </p>
      </div>

      <div className="mx-5 mt-5">
        <ChokaoButton variant="secondary" fullWidth>
          <Wallet size={18} strokeWidth={1.5} />
          Agregar a Apple Wallet / Google Pay
        </ChokaoButton>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="flex items-center gap-2 text-[14px] font-medium" style={{ color: "rgba(240,236,217,0.7)" }}>
          <Share2 size={16} strokeWidth={1.5} />
          Compartir entrada
        </button>
      </div>
    </div>
  );
};

export default TicketQR;
