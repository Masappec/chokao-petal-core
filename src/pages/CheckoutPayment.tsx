import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Eye, Lock } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout, calcTotal } from "@/lib/checkoutContext";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();
  const total = calcTotal(data);

  const onPay = () => {
    update({ paymentMethod: "payphone" });
    navigate("/comprar/procesando");
  };

  const inputBase = {
    backgroundColor: "#102132",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-32" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Método de pago
        </h1>
      </header>

      {/* Compact summary */}
      <div className="mx-5 mt-4 rounded-xl px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-[13px] truncate" style={{ color: "rgba(240,236,217,0.7)" }}>
            {data.activityName} × {data.quantity}
          </p>
        </div>
        <span className="font-bold text-[14px]" style={{ color: "#fbba30" }}>
          ${total.toFixed(2)}
        </span>
      </div>

      <h2 className="px-5 mt-5 text-white font-semibold text-[16px]">Método de pago</h2>

      <div className="px-5 mt-3">
        <div
          className="w-full flex items-center gap-3 rounded-2xl p-4"
          style={{
            backgroundColor: "rgba(251,186,48,0.06)",
            border: "1.5px solid #fbba30",
          }}
        >
          <div className="rounded-md flex items-center justify-center" style={{ width: 48, height: 32, backgroundColor: "#102132" }}>
            <span className="text-[10px] font-bold" style={{ color: "rgba(240,236,217,0.6)" }}>PAY</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-[15px]">Payphone</p>
            <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
              Tarjeta de crédito/débito · Transferencia
            </p>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-4 rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
        <p className="text-white font-medium text-[14px] mb-3">Datos de la tarjeta</p>
        <div className="space-y-3">
          <div className="relative">
            <CreditCard size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
            <input
              placeholder="•••• •••• •••• ••••"
              className="w-full h-11 rounded-lg pl-10 pr-3 text-[14px]"
              style={inputBase}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="MM/AA" className="h-11 rounded-lg px-3 text-[14px]" style={inputBase} />
            <div className="relative">
              <input placeholder="CVV" className="w-full h-11 rounded-lg px-3 pr-9 text-[14px]" style={inputBase} />
              <Eye size={16} strokeWidth={1.5} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
            </div>
          </div>
          <input placeholder="Nombre en la tarjeta" className="w-full h-11 rounded-lg px-3 text-[14px]" style={inputBase} />
        </div>
        <div className="mt-3 flex justify-end gap-2 text-[10px] font-bold" style={{ color: "rgba(240,236,217,0.3)" }}>
          <span>VISA</span><span>MC</span><span>AMEX</span>
        </div>
      </div>

      <div className="mx-5 mt-4 flex items-start gap-2">
        <Lock size={14} strokeWidth={1.5} style={{ color: "#aab93e", flexShrink: 0, marginTop: 2 }} />
        <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
          Tu pago es procesado de forma segura. CHOKAO no almacena datos de tu tarjeta.
        </p>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <ChokaoButton fullWidth onClick={onPay}>
          <Lock size={16} strokeWidth={2} />
          Pagar ${total.toFixed(2)}
        </ChokaoButton>
      </div>
    </div>
  );
};

export default CheckoutPayment;
