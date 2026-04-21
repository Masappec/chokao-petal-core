import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Minus, Plus, Clock3 } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout } from "@/lib/checkoutContext";

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();
  const [qty, setQty] = useState(data.quantity);
  const MAX = 2;

  const subtotal = data.pricePerTicket * qty;
  const total = subtotal + data.serviceFee;

  const onContinue = () => {
    update({ quantity: qty });
    navigate("/comprar/pago");
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-32" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Resumen de compra
        </h1>
      </header>

      <div className="px-5 mt-3">
        {/* Activity card */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide"
            style={{
              backgroundColor: `${data.categoryColor}26`,
              border: `1px solid ${data.categoryColor}`,
              color: data.categoryColor,
            }}
          >
            {data.category}
          </span>
          <h3 className="mt-2 text-white font-semibold text-[16px]">{data.activityName}</h3>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <Calendar size={14} strokeWidth={1.5} /> {data.date}
            </div>
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <Clock size={14} strokeWidth={1.5} /> {data.time}
            </div>
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <MapPin size={14} strokeWidth={1.5} /> {data.room}
            </div>
          </div>
          <div className="my-3 h-px" style={{ backgroundColor: "#102132" }} />
          <div className="flex items-center gap-2 text-[13px]">
            <Users size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
            <span style={{ color: "rgba(240,236,217,0.5)" }}>Cupos disponibles:</span>
            <span style={{ color: "#e73e40", fontWeight: 600 }}>2 cupos restantes</span>
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-5">
          <p className="text-white text-[14px] font-medium">Cantidad de entradas</p>
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62", color: "#f0ecd9" }}
            >
              <Minus size={16} strokeWidth={2} />
            </button>
            <span className="text-white font-bold text-[18px] w-12 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(MAX, q + 1))}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#fbba30", color: "#102132" }}
            >
              <Plus size={16} strokeWidth={2} />
            </button>
          </div>
          <p className="mt-2 text-[12px]" style={{ color: "rgba(240,236,217,0.4)" }}>
            Máximo {MAX} entradas por persona
          </p>
        </div>

        {/* Price breakdown */}
        <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: "#1a2f42" }}>
          <div className="flex justify-between text-[14px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            <span>Entrada × {qty}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="my-3 h-px" style={{ backgroundColor: "#102132" }} />
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-[16px]">Total</span>
            <span className="font-display font-bold text-[18px]" style={{ color: "#fbba30" }}>
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2">
          <Clock3 size={14} strokeWidth={1.5} style={{ color: "#fbba30", flexShrink: 0, marginTop: 2 }} />
          <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            Al continuar, se reservará tu cupo por 5 minutos mientras completas el pago
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <ChokaoButton fullWidth onClick={onContinue}>Continuar al pago</ChokaoButton>
      </div>
    </div>
  );
};

export default CheckoutSummary;
