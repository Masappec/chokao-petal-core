import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User, Check, FileText, IdCard } from "lucide-react";
import CheckoutHeader from "@/components/CheckoutHeader";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout } from "@/lib/checkoutContext";

type IdType = "cedula" | "ruc";

const onlyDigits = (s: string) => s.replace(/\D+/g, "");

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const isValidId = (type: IdType, value: string) => {
  const v = onlyDigits(value);
  if (type === "cedula") return v.length === 10;
  return v.length === 13;
};

const CheckoutBuyer = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();

  // Comprador
  
  const [name, setName] = useState(data.buyerName);
  const [email, setEmail] = useState(data.buyerEmail);
  const [phone, setPhone] = useState(data.buyerPhone);

  // Facturación
  const [billingSame, setBillingSame] = useState(data.billingSameAsBuyer);
  const [billingIdType, setBillingIdType] = useState<IdType>(data.billingIdType);
  const [billingIdNumber, setBillingIdNumber] = useState(data.billingIdNumber);
  const [billingName, setBillingName] = useState(data.billingName);
  const [billingEmail, setBillingEmail] = useState(data.billingEmail);
  const [billingPhone, setBillingPhone] = useState(data.billingPhone);

  const inputBase = {
    backgroundColor: "#1a2f42",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  const effectiveBilling = useMemo(() => {
    if (billingSame) {
      return {
        idType: billingIdType,
        idNumber: billingIdNumber, // ID siempre requerido aún si datos = comprador
        name,
        email,
        phone,
      };
    }
    return {
      idType: billingIdType,
      idNumber: billingIdNumber,
      name: billingName,
      email: billingEmail,
      phone: billingPhone,
    };
  }, [billingSame, billingIdType, billingIdNumber, billingName, billingEmail, billingPhone, name, email, phone]);

  const buyerValid = name.trim().length > 1 && isValidEmail(email) && phone.trim().length >= 7;
  const billingValid =
    isValidId(effectiveBilling.idType, effectiveBilling.idNumber) &&
    effectiveBilling.name.trim().length > 1 &&
    isValidEmail(effectiveBilling.email) &&
    effectiveBilling.phone.trim().length >= 7;

  const canContinue = buyerValid && billingValid;

  const onContinue = () => {
    if (!canContinue) return;
    update({
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
      billingSameAsBuyer: billingSame,
      billingIdType: effectiveBilling.idType,
      billingIdNumber: onlyDigits(effectiveBilling.idNumber),
      billingName: effectiveBilling.name,
      billingEmail: effectiveBilling.email,
      billingPhone: effectiveBilling.phone,
    });
    navigate("/comprar/pago");
  };

  const idMaxLen = billingIdType === "cedula" ? 10 : 13;
  const idValid = isValidId(billingIdType, effectiveBilling.idNumber) || effectiveBilling.idNumber.length === 0;

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-32" style={{ backgroundColor: "#102132" }}>
      <CheckoutHeader title="Datos del comprador" step={1} />

      {/* === Información personal === */}
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

      </div>

      {/* === Datos de facturación === */}
      <div className="px-5 mt-7">
        <div className="flex items-center gap-2">
          <FileText size={16} strokeWidth={1.5} style={{ color: "#fbba30" }} />
          <h2 className="text-white font-semibold text-[16px]">Datos de facturación</h2>
        </div>
        <p className="mt-1 text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
          Estos datos aparecerán en tu factura electrónica.
        </p>

        {/* Toggle mismo / otra persona */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { v: true, label: "Mismos del comprador" },
            { v: false, label: "Otra persona" },
          ].map((opt) => {
            const active = billingSame === opt.v;
            return (
              <button
                key={String(opt.v)}
                onClick={() => setBillingSame(opt.v)}
                className="h-11 rounded-lg text-[13px] font-medium transition-colors"
                style={{
                  backgroundColor: active ? "rgba(251,186,48,0.12)" : "#1a2f42",
                  border: active ? "1.5px solid #fbba30" : "1px solid #2a4a62",
                  color: active ? "#fbba30" : "rgba(240,236,217,0.7)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Tipo de documento */}
        <div className="mt-4">
          <p className="text-[12px] mb-2" style={{ color: "rgba(240,236,217,0.6)" }}>Tipo de documento</p>
          <div className="grid grid-cols-2 gap-2">
            {(["cedula", "ruc"] as IdType[]).map((t) => {
              const active = billingIdType === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setBillingIdType(t);
                    setBillingIdNumber("");
                  }}
                  className="h-11 rounded-lg text-[13px] font-medium transition-colors"
                  style={{
                    backgroundColor: active ? "rgba(251,186,48,0.12)" : "#1a2f42",
                    border: active ? "1.5px solid #fbba30" : "1px solid #2a4a62",
                    color: active ? "#fbba30" : "rgba(240,236,217,0.7)",
                  }}
                >
                  {t === "cedula" ? "Cédula" : "RUC"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Número documento */}
        <div className="mt-3 relative">
          <IdCard size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
          <input
            inputMode="numeric"
            value={billingIdNumber}
            maxLength={idMaxLen}
            onChange={(e) => setBillingIdNumber(onlyDigits(e.target.value).slice(0, idMaxLen))}
            placeholder={billingIdType === "cedula" ? "Cédula" : "RUC"}
            className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
            style={{
              ...inputBase,
              borderColor: idValid ? "#2a4a62" : "#e73e40",
            }}
          />
          {!idValid && (
            <p className="mt-1 text-[11px]" style={{ color: "#e73e40" }}>
              {billingIdType === "cedula" ? "La cédula debe tener 10 dígitos" : "El RUC debe tener 13 dígitos"}
            </p>
          )}
        </div>

        {/* Si es otra persona pedir nombres / email / teléfono */}
        {!billingSame && (
          <div className="mt-3 space-y-3">
            <div className="relative">
              <User size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
              <input
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder={billingIdType === "ruc" ? "Razón social / Nombres" : "Nombres y apellidos"}
                className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
                style={inputBase}
              />
            </div>
            <div className="relative">
              <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
              <input
                type="email"
                value={billingEmail}
                onChange={(e) => setBillingEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
                style={inputBase}
              />
            </div>
            <div className="relative">
              <Phone size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
              <input
                value={billingPhone}
                onChange={(e) => setBillingPhone(e.target.value)}
                placeholder="Teléfono"
                className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
                style={inputBase}
              />
            </div>
          </div>
        )}

        {/* Preview compacto */}
        {billingValid && (
          <div className="mt-4 rounded-xl p-3" style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62" }}>
            <p className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(240,236,217,0.5)" }}>
              Factura para
            </p>
            <p className="mt-1 text-white text-[14px] font-medium">{effectiveBilling.name}</p>
            <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              {billingIdType === "cedula" ? "C.I." : "RUC"} {onlyDigits(effectiveBilling.idNumber)} · {effectiveBilling.email}
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <ChokaoButton fullWidth onClick={onContinue} disabled={!canContinue}>
          Continuar
        </ChokaoButton>
      </div>
    </div>
  );
};

export default CheckoutBuyer;
