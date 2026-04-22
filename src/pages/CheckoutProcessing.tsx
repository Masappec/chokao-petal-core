import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChokaoIcon from "@/components/ChokaoIcon";
import { useCheckout } from "@/lib/checkoutContext";

const CheckoutProcessing = () => {
  const navigate = useNavigate();
  const { update } = useCheckout();
  const [seconds, setSeconds] = useState(272);

  useEffect(() => {
    const t = setTimeout(() => {
      // 80% éxito, 20% error
      if (Math.random() < 0.8) {
        const num = Math.floor(10000 + Math.random() * 90000);
        update({
          generatedTicketId: `tkt-${num}`,
          generatedTicketNumber: `#TKT-2025-${num}`,
        });
        navigate("/comprar/exito");
      } else {
        navigate("/comprar/error");
      }
    }, 2800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    const i = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(i);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen max-w-[390px] mx-auto flex flex-col items-center justify-between py-20 px-8" style={{ backgroundColor: "#102132" }}>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="animate-spin-slow">
          <ChokaoIcon size={72} />
        </div>
        <p className="mt-6 text-white font-semibold text-[16px]">Procesando tu pago...</p>
        <p className="mt-2 text-[14px]" style={{ color: "rgba(240,236,217,0.5)" }}>
          No cierres la aplicación
        </p>

        <div className="mt-6 w-48 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2f42" }}>
          <div className="h-full rounded-full animate-progress-indeterminate" style={{ backgroundColor: "#fbba30", width: "40%" }} />
        </div>
      </div>

      <div className="text-center">
        <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.4)" }}>Cupo reservado por</p>
        <p className="font-mono font-bold text-[20px] mt-1" style={{ color: "#fbba30" }}>
          {mm}:{ss}
        </p>
      </div>
    </div>
  );
};

export default CheckoutProcessing;
