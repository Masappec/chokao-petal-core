import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Eye, Lock, Mail, Check } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout, calcTotal } from "@/lib/checkoutContext";
import { toast } from "@/hooks/use-toast";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();
  const total = calcTotal(data);

  const [seconds, setSeconds] = useState(5 * 60); // 5 min reserva

  useEffect(() => {
    const i = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(i);
          toast({ title: "Reserva expirada", description: "Tu cupo fue liberado. Inténtalo de nuevo." });
          navigate(`/activity/${data.activityId}`);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const onPay = () => {
    if (!data.acceptedTerms) return;
    update({ paymentMethod: "payphone" });
    navigate("/comprar/procesando");
  };

  const inputBase = {
    backgroundColor: "#102132",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-40" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Datos y pago
        </h1>
      </header>

      {/* Resumen compacto */}
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

      {/* Datos de contacto */}
      <h2 className="px-5 mt-5 text-white font-semibold text-[16px]">¿Dónde enviamos tu entrada?</h2>
      <div className="px-5 mt-3">
        <div className="relative">
          <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
          <input
            type="email"
            value={data.buyerEmail}
            onChange={(e) => update({ buyerEmail: e.target.value })}
            placeholder="Correo electrónico"
            className="w-full h-11 rounded-lg pl-10 pr-3 text-[14px]"
            style={inputBase}
          />
        </div>
        <div className="mt-2 flex items-start gap-2">
          <Mail size={12} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)", marginTop: 3, flexShrink: 0 }} />
          <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
            Te enviaremos la confirmación y tu entrada a este correo
          </p>
        </div>
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

      {/* Términos */}
      <div className="mx-5 mt-4 flex items-start gap-3">
        <button
          onClick={() => update({ acceptedTerms: !data.acceptedTerms })}
          aria-pressed={data.acceptedTerms}
          className="shrink-0 flex items-center justify-center rounded transition-colors"
          style={{
            width: 18,
            height: 18,
            border: "1.5px solid #2a4a62",
            backgroundColor: data.acceptedTerms ? "rgba(251,186,48,0.15)" : "transparent",
          }}
        >
          {data.acceptedTerms && <Check size={12} strokeWidth={3} style={{ color: "#fbba30" }} />}
        </button>
        <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
          Acepto los{" "}
          <span style={{ color: "#fbba30" }}>términos y condiciones</span> y la política de privacidad de CHOKAO
        </p>
      </div>

      {/* Bottom sticky */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <ChokaoButton fullWidth onClick={onPay} disabled={!data.acceptedTerms}>
          <Lock size={16} strokeWidth={2} />
          Pagar ${total.toFixed(2)}
        </ChokaoButton>
        <p className="mt-2 text-center text-[12px]" style={{ color: "rgba(240,236,217,0.4)" }}>
          Cupo reservado · expira en {mm}:{ss}
        </p>
      </div>
    </div>
  );
};

export default CheckoutPayment;
