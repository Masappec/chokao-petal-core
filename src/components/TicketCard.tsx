import { Calendar, Clock, MapPin, Check } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import type { TicketData } from "@/lib/ticketsMock";

interface TicketCardProps {
  ticket: TicketData;
  onClick?: () => void;
  compact?: boolean;
}

const TicketCard = ({ ticket, onClick, compact = false }: TicketCardProps) => {
  const isUsed = ticket.status === "used";
  const isExpired = ticket.status === "expired";
  const stripColor = isUsed || isExpired ? "#2a4a62" : ticket.categoryColor;

  const badgeStyle = isUsed
    ? { bg: "#2a4a62", border: "#2a4a62", text: "rgba(240,236,217,0.4)", label: "Usado" }
    : isExpired
    ? { bg: "rgba(231,62,64,0.15)", border: "#e73e40", text: "#e73e40", label: "Expirado" }
    : { bg: "rgba(170,185,62,0.15)", border: "#aab93e", text: "#aab93e", label: "Válido" };

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[20px] overflow-hidden relative block transition-transform active:scale-[0.99]"
      style={{
        backgroundColor: "#1a2f42",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        opacity: isUsed ? 0.6 : 1,
      }}
    >
      {/* Top color strip */}
      <div className="h-1 w-full" style={{ backgroundColor: stripColor }} />

      <div className="flex relative">
        {/* Left block */}
        <div className="flex-1 p-5 pr-3">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide"
            style={{
              backgroundColor: `${ticket.categoryColor}26`,
              border: `1px solid ${ticket.categoryColor}`,
              color: ticket.categoryColor,
            }}
          >
            {ticket.category}
          </span>

          <h3 className="mt-2 font-display font-semibold text-white text-[16px] leading-tight line-clamp-2">
            {ticket.activityName}
          </h3>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
              <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>{ticket.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
              <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>{ticket.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
              <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>{ticket.room}</span>
            </div>
          </div>

        </div>

        {/* Dotted divider with notches */}
        <div className="relative flex items-center justify-center" style={{ width: 1 }}>
          <div
            className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: 1,
              backgroundImage: "linear-gradient(to bottom, #2a4a62 50%, transparent 50%)",
              backgroundSize: "1px 6px",
              backgroundRepeat: "repeat-y",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style={{ backgroundColor: "#1a2f42", padding: 2 }}>
            <ChokaoIcon size={16} className="opacity-60" />
          </div>
          <div
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 20, height: 20, backgroundColor: "#102132" }}
          />
          <div
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full"
            style={{ width: 20, height: 20, backgroundColor: "#102132" }}
          />
        </div>

        {/* Right block - QR */}
        <div className="w-[100px] p-4 flex flex-col items-center justify-center">
          <div
            className="relative rounded-lg flex items-center justify-center"
            style={{ width: 72, height: 72, backgroundColor: "#ffffff" }}
          >
            {/* Fake QR pattern */}
            <div
              className="w-[60px] h-[60px]"
              style={{
                backgroundImage:
                  "radial-gradient(#102132 30%, transparent 32%), radial-gradient(#102132 30%, transparent 32%)",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 4px 4px",
              }}
            />
            {isUsed && (
              <div className="absolute inset-0 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(42,74,98,0.7)" }}>
                <Check size={28} strokeWidth={2} style={{ color: "#f0ecd9" }} />
              </div>
            )}
          </div>
          {!compact && (
            <span className="mt-2 text-[10px]" style={{ color: "rgba(240,236,217,0.5)" }}>
              Mostrar QR
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default TicketCard;
