import { useNavigate } from "react-router-dom";
import { Check, Mail, Bell, Ticket } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import TicketCard from "@/components/TicketCard";
import { useCheckout } from "@/lib/checkoutContext";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { data } = useCheckout();
  const ticketId = data.generatedTicketId ?? "tkt-1";
  const ticketNumber = data.generatedTicketNumber ?? "#TKT-2025-00850";

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
        <h1 className="mt-5 font-display font-bold text-[24px] text-white text-center">¡Pago exitoso!</h1>
        <p className="mt-2 text-[15px] text-center" style={{ color: "rgba(240,236,217,0.6)" }}>
          Tu entrada ha sido confirmada
        </p>
      </div>

      <div className="mx-6 mt-7">
        <TicketCard ticket={ticket} compact />
      </div>

      <div className="mx-6 mt-4 rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex items-center gap-3">
          <Mail size={16} strokeWidth={1.5} style={{ color: "#fbba30" }} />
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
            Número de orden: {ticketNumber}
          </span>
        </div>
      </div>

      <div className="mx-6 mt-7">
        <ChokaoButton fullWidth onClick={() => navigate(`/entradas/${ticketId}`)}>Ver mi entrada</ChokaoButton>
      </div>
      <div className="mt-3 flex justify-center">
        <button onClick={() => navigate("/home")} className="text-[14px] font-medium" style={{ color: "rgba(240,236,217,0.7)" }}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
