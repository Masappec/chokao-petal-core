import { useNavigate } from "react-router-dom";
import { Check, Mail, Bell, Ticket } from "lucide-react";
import TicketCard from "@/components/TicketCard";
import { useCheckout } from "@/lib/checkoutContext";

const ReserveSuccess = () => {
  const navigate = useNavigate();
  const { data } = useCheckout();
  const ticketId = data.generatedTicketId ?? "rsv-00001";
  const ticketNumber = data.generatedTicketNumber ?? "RSV-2025-00001";

  const ticket = {
    id: ticketId,
    ticketNumber,
    activityName: data.activityName,
    category: data.category,
    categoryColor: data.categoryColor,
    date: data.date,
    time: data.time,
    room: data.room,
    status: "valid" as const,
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-10" style={{ backgroundColor: "#102132" }}>
      <div className="pt-16 px-6 flex flex-col items-center">
        <div
          className="rounded-full flex items-center justify-center animate-scale-in"
          style={{ width: 88, height: 88, backgroundColor: "rgba(170,185,62,0.15)", border: "2px solid #aab93e" }}
        >
          <Check size={40} strokeWidth={2} style={{ color: "#aab93e" }} />
        </div>
        <h1 className="mt-5 font-display font-bold text-[24px] text-white text-center">¡Reserva confirmada!</h1>
        <p className="mt-2 text-[15px] text-center" style={{ color: "rgba(240,236,217,0.6)" }}>
          Tu cupo está asegurado
        </p>
      </div>

      <div className="mx-6 mt-7">
        <TicketCard ticket={ticket} compact />
        <div className="mt-2 flex justify-end">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ backgroundColor: "rgba(170,185,62,0.15)", color: "#aab93e", border: "1px solid #aab93e" }}
          >
            Gratuito
          </span>
        </div>
      </div>

      <div className="mx-6 mt-4 rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex items-center gap-3">
          <Mail size={16} strokeWidth={1.5} style={{ color: "#aab93e" }} />
          <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            Confirmación enviada a {data.buyerEmail}
          </span>
        </div>
        <div className="my-3 h-px" style={{ backgroundColor: "#2a4a62" }} />
        <div className="flex items-center gap-3">
          <Bell size={16} strokeWidth={1.5} style={{ color: "#aab93e" }} />
          <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            Recibirás un recordatorio 1 hora antes
          </span>
        </div>
        <div className="my-3 h-px" style={{ backgroundColor: "#2a4a62" }} />
        <div className="flex items-center gap-3">
          <Ticket size={16} strokeWidth={1.5} style={{ color: "#f0ecd9" }} />
          <span className="font-mono text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
            Número de reserva: {ticketNumber}
          </span>
        </div>
      </div>

      <div className="mx-6 mt-7">
        <button
          onClick={() => navigate(`/entradas/${ticketId}`)}
          className="h-[52px] w-full rounded-full font-semibold text-[15px] transition-all active:brightness-95"
          style={{ backgroundColor: "#aab93e", color: "#102132" }}
        >
          Ver mi entrada
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <button onClick={() => navigate("/home")} className="text-[14px] font-medium" style={{ color: "rgba(240,236,217,0.7)" }}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ReserveSuccess;
