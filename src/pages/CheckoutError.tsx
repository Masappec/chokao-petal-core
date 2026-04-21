import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";

const CheckoutError = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-10" style={{ backgroundColor: "#102132" }}>
      <div className="pt-16 px-6 flex flex-col items-center">
        <div
          className="rounded-full flex items-center justify-center animate-shake"
          style={{ width: 88, height: 88, backgroundColor: "rgba(231,62,64,0.15)", border: "2px solid #e73e40" }}
        >
          <X size={40} strokeWidth={2} style={{ color: "#e73e40" }} />
        </div>
        <h1 className="mt-5 font-display font-bold text-[22px] text-white text-center">
          No pudimos procesar tu pago
        </h1>
        <p className="mt-2 text-[14px] text-center" style={{ color: "rgba(240,236,217,0.6)" }}>
          Tu cupo fue liberado. Puedes intentarlo nuevamente.
        </p>
      </div>

      <div className="mx-6 mt-7 rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
        <p className="text-[14px]" style={{ color: "rgba(240,236,217,0.7)" }}>
          Tarjeta rechazada por el banco emisor
        </p>
      </div>

      <div className="mx-6 mt-7">
        <ChokaoButton fullWidth onClick={() => navigate("/comprar/pago")}>Intentar de nuevo</ChokaoButton>
      </div>
      <div className="mt-3 flex justify-center">
        <button onClick={() => navigate("/home")} className="text-[14px] font-medium" style={{ color: "rgba(240,236,217,0.7)" }}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CheckoutError;
