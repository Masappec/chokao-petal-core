import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Minus, Plus, Clock3 } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout, calcTotal } from "@/lib/checkoutContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CheckoutSummarySheet = ({ open, onClose }: Props) => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();
  const [qty, setQty] = useState(data.quantity);
  const MAX = 2;

  if (!open) return null;

  const subtotal = data.pricePerTicket * qty;
  const total = subtotal + data.serviceFee;

  const onContinue = () => {
    update({ quantity: qty });
    onClose();
    navigate("/comprar/datos");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div
        className="w-full max-w-[390px] rounded-t-[24px] animate-slide-in-right"
        style={{ backgroundColor: "#1a2f42", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-3 pb-2 flex justify-center">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "#2a4a62" }} />
        </div>
        <div className="px-6 pb-6">
          <h2 className="font-display font-semibold text-[18px] text-white">Resumen de compra</h2>
          <div className="my-4 h-px" style={{ backgroundColor: "#2a4a62" }} />

          {/* Activity card */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#102132" }}>
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
            <div className="my-3 h-px" style={{ backgroundColor: "#1a2f42" }} />
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
                style={{ backgroundColor: "#102132", border: "1px solid #2a4a62", color: "#f0ecd9" }}
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
          <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: "#102132" }}>
            <div className="flex justify-between text-[14px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <span>Entrada × {qty}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>
              <span>Cargo por servicio</span>
              <span>${data.serviceFee.toFixed(2)}</span>
            </div>
            <div className="my-3 h-px" style={{ backgroundColor: "#1a2f42" }} />
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

          <div className="mt-5">
            <ChokaoButton fullWidth onClick={onContinue}>Continuar al pago</ChokaoButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummarySheet;
