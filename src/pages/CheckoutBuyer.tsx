import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, User, FileText, IdCard, Pencil, Check } from "lucide-react";
import CheckoutHeader from "@/components/CheckoutHeader";
import ChokaoButton from "@/components/ChokaoButton";
import { useCheckout } from "@/lib/checkoutContext";
import {
  BillingProfile,
  IdType,
  getBillingProfile,
  saveBillingProfile,
} from "@/lib/billingProfile";

const onlyDigits = (s: string) => s.replace(/\D+/g, "");
const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
const isValidId = (type: IdType, value: string) => {
  const v = onlyDigits(value);
  return type === "cedula" ? v.length === 10 : v.length === 13;
};

const CheckoutBuyer = () => {
  const navigate = useNavigate();
  const { data, update } = useCheckout();

  // Comprador
  const [name, setName] = useState(data.buyerName);
  const [email, setEmail] = useState(data.buyerEmail);
  const [phone, setPhone] = useState(data.buyerPhone);

  // Perfil guardado (uno por usuario)
  const [savedProfile, setSavedProfile] = useState<BillingProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // Facturación (form)
  const [billingSame, setBillingSame] = useState(true);
  const [billingIdType, setBillingIdType] = useState<IdType>("cedula");
  const [billingIdNumber, setBillingIdNumber] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [billingPhone, setBillingPhone] = useState("");

  // Checkboxes
  const [saveProfile, setSaveProfile] = useState(true); // estado A
  const [updateProfile, setUpdateProfile] = useState(true); // estado B (modo edición)

  // Cargar perfil al montar
  useEffect(() => {
    const p = getBillingProfile();
    setSavedProfile(p);
    if (p) {
      // estado B colapsado: precargar valores por si entra a editar
      setBillingIdType(p.idType);
      setBillingIdNumber(p.idNumber);
      setBillingName(p.name);
      setBillingEmail(p.email);
      setBillingPhone(p.phone);
      setBillingSame(false);
    } else {
      // estado A: por defecto mismos del comprador
      setBillingName(data.buyerName);
      setBillingEmail(data.buyerEmail);
      setBillingPhone(data.buyerPhone);
    }
    setProfileLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // En estado A, al togglear "Mismos del comprador" sincronizar
  useEffect(() => {
    if (!profileLoaded || savedProfile) return;
    if (billingSame) {
      setBillingName(name);
      setBillingEmail(email);
      setBillingPhone(phone);
    } else {
      setBillingName("");
      setBillingEmail("");
      setBillingPhone("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingSame]);

  const inputBase = {
    backgroundColor: "#1a2f42",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  const idMaxLen = billingIdType === "cedula" ? 10 : 13;
  const idValid = isValidId(billingIdType, billingIdNumber) || billingIdNumber.length === 0;

  const buyerValid =
    name.trim().length > 1 && isValidEmail(email) && phone.trim().length >= 7;

  const billingValid =
    isValidId(billingIdType, billingIdNumber) &&
    billingName.trim().length > 1 &&
    isValidEmail(billingEmail) &&
    billingPhone.trim().length >= 7;

  // Estado B colapsado → no requiere validar form, ya tenemos perfil válido
  const inCollapsedProfile = !!savedProfile && !editingProfile;
  const canContinue = buyerValid && (inCollapsedProfile || billingValid);

  const cancelEdit = () => {
    if (!savedProfile) return;
    setBillingIdType(savedProfile.idType);
    setBillingIdNumber(savedProfile.idNumber);
    setBillingName(savedProfile.name);
    setBillingEmail(savedProfile.email);
    setBillingPhone(savedProfile.phone);
    setUpdateProfile(true);
    setEditingProfile(false);
  };

  const onContinue = () => {
    if (!canContinue) return;

    // Datos efectivos de facturación
    const effective: BillingProfile = inCollapsedProfile
      ? (savedProfile as BillingProfile)
      : {
          idType: billingIdType,
          idNumber: onlyDigits(billingIdNumber),
          name: billingName.trim(),
          email: billingEmail.trim(),
          phone: billingPhone.trim(),
        };

    // Persistencia del perfil
    if (!savedProfile && saveProfile) {
      saveBillingProfile(effective);
    } else if (savedProfile && editingProfile && updateProfile) {
      saveBillingProfile(effective);
    }

    update({
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
      billingSameAsBuyer: !savedProfile && billingSame,
      billingIdType: effective.idType,
      billingIdNumber: effective.idNumber,
      billingName: effective.name,
      billingEmail: effective.email,
      billingPhone: effective.phone,
    });
    navigate("/comprar/pago");
  };

  const nameLabel =
    billingIdType === "ruc" ? "Razón social" : "Nombres y apellidos";

  // ============ Render ============
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

        {/* === Estado B colapsado === */}
        {inCollapsedProfile && savedProfile && (
          <div
            className="mt-4 rounded-xl p-4 flex items-start justify-between gap-3"
            style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62" }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-wide" style={{ color: "rgba(240,236,217,0.5)" }}>
                Factura para
              </p>
              <p className="mt-1 text-white text-[14px] font-medium truncate">{savedProfile.name}</p>
              <p className="text-[12px] mt-0.5" style={{ color: "rgba(240,236,217,0.7)" }}>
                {savedProfile.idType === "cedula" ? "Cédula" : "RUC"} {savedProfile.idNumber}
              </p>
              <p className="text-[12px] truncate" style={{ color: "rgba(240,236,217,0.6)" }}>
                {savedProfile.email}
              </p>
            </div>
            <button
              onClick={() => setEditingProfile(true)}
              className="flex items-center gap-1 text-[12px] font-medium shrink-0 px-3 h-9 rounded-lg"
              style={{
                color: "#fbba30",
                border: "1px solid rgba(251,186,48,0.4)",
                backgroundColor: "rgba(251,186,48,0.08)",
              }}
            >
              <Pencil size={13} strokeWidth={2} />
              Editar
            </button>
          </div>
        )}

        {/* === Formulario (Estado A o Estado B en edición) === */}
        {(!savedProfile || editingProfile) && (
          <>
            {/* Toggle mismo / otra persona — solo en estado A */}
            {!savedProfile && (
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
            )}

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
                style={{ ...inputBase, borderColor: idValid ? "#2a4a62" : "#e73e40" }}
              />
              {!idValid && (
                <p className="mt-1 text-[11px]" style={{ color: "#e73e40" }}>
                  {billingIdType === "cedula" ? "La cédula debe tener 10 dígitos" : "El RUC debe tener 13 dígitos"}
                </p>
              )}
            </div>

            {/* Nombre / Razón social */}
            <div className="mt-3 relative">
              <User size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
              <input
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder={nameLabel}
                className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
                style={inputBase}
              />
            </div>

            {/* Correo */}
            <div className="mt-3 relative">
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

            {/* Teléfono */}
            <div className="mt-3 relative">
              <Phone size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
              <input
                value={billingPhone}
                onChange={(e) => setBillingPhone(e.target.value)}
                placeholder="Teléfono"
                className="w-full h-12 rounded-xl pl-10 pr-4 text-[14px]"
                style={inputBase}
              />
            </div>

            {/* Checkbox guardar / actualizar */}
            <button
              type="button"
              onClick={() =>
                savedProfile ? setUpdateProfile((v) => !v) : setSaveProfile((v) => !v)
              }
              className="mt-4 flex items-start gap-2.5 text-left w-full"
            >
              <span
                className="mt-0.5 w-[18px] h-[18px] rounded-[5px] flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: (savedProfile ? updateProfile : saveProfile)
                    ? "#fbba30"
                    : "transparent",
                  border: (savedProfile ? updateProfile : saveProfile)
                    ? "1.5px solid #fbba30"
                    : "1.5px solid #2a4a62",
                }}
              >
                {(savedProfile ? updateProfile : saveProfile) && (
                  <Check size={12} strokeWidth={3} style={{ color: "#102132" }} />
                )}
              </span>
              <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.85)" }}>
                {savedProfile
                  ? "Actualizar mis datos guardados"
                  : "Guardar mis datos de facturación para próximas compras"}
              </span>
            </button>

            {/* Cancelar edición → solo estado B */}
            {savedProfile && editingProfile && (
              <button
                type="button"
                onClick={cancelEdit}
                className="mt-3 text-[13px] font-medium"
                style={{ color: "rgba(240,236,217,0.7)" }}
              >
                Cancelar edición
              </button>
            )}
          </>
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
