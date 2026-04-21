import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User, Check } from "lucide-react";
import CheckoutHeader from "@/components/CheckoutHeader";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout } from "@/lib/checkoutContext";

const CheckoutBuyer = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();
  const [useProfile, setUseProfile] = useState(true);
  const [name, setName] = useState(data.buyerName);
  const [email, setEmail] = useState(data.buyerEmail);
  const [phone, setPhone] = useState(data.buyerPhone);

  const onContinue = () => {
    update({ buyerName: name, buyerEmail: email, buyerPhone: phone });
    navigate("/comprar/pago");
  };

  const inputBase = {
    backgroundColor: "#1a2f42",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-32" style={{ backgroundColor: "#102132" }}>
      <CheckoutHeader title="Datos del comprador" step={1} />

      <h2 className="px-5 mt-5 text-white font-semibold text-[16px]">Información personal</h2>

      <div className="px-5 mt-3 space-y-3">
        <div className="relative">
          <User size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
            style={inputBase}
          />
        </div>
        <div className="relative">
          <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
            style={inputBase}
          />
        </div>
        <div className="relative">
          <Phone size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
          <span className="absolute left-9 top-1/2 -translate-y-1/2 text-[14px]" style={{ color: "rgba(240,236,217,0.7)" }}>🇪🇨</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Teléfono / WhatsApp"
            className="w-full h-12 rounded-xl pl-16 pr-4 text-[14px]"
            style={inputBase}
          />
        </div>

        <button
          onClick={() => setUseProfile((v) => !v)}
          className="flex items-center gap-2 mt-3"
        >
          <span
            className="w-[18px] h-[18px] rounded flex items-center justify-center"
            style={{
              backgroundColor: useProfile ? "#fbba30" : "transparent",
              border: useProfile ? "1px solid #fbba30" : "1px solid #2a4a62",
            }}
          >
            {useProfile && <Check size={12} strokeWidth={3} style={{ color: "#102132" }} />}
          </span>
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            Usar mis datos de perfil guardados
          </span>
        </button>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <ChokaoButton fullWidth onClick={onContinue}>Continuar</ChokaoButton>
      </div>
    </div>
  );
};

export default CheckoutBuyer;
