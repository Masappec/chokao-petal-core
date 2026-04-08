import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import { User, Smartphone, Building2, Camera, ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "+51", flag: "🇵🇪", name: "Perú" },
  { code: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "+52", flag: "🇲🇽", name: "México" },
  { code: "+1", flag: "🇺🇸", name: "EE.UU." },
  { code: "+34", flag: "🇪🇸", name: "España" },
  { code: "+55", flag: "🇧🇷", name: "Brasil" },
  { code: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "+595", flag: "🇵🇾", name: "Paraguay" },
  { code: "+598", flag: "🇺🇾", name: "Uruguay" },
];

const RegisterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+593");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "El nombre es obligatorio";
    if (!lastName.trim()) e.lastName = "El apellido es obligatorio";
    if (phone && !/^\d{7,15}$/.test(phone)) e.phone = "Número de celular inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    navigate("/register/role", { state: { email, firstName, lastName } });
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader variant="back" title="Tu perfil" onBack={() => navigate(-1)} />
      <ProgressIndicator currentStep={3} />

      <div className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="font-display font-bold text-[24px] text-white leading-tight">
          Cuéntanos sobre ti
        </h2>

        {/* Avatar uploader */}
        <div className="flex flex-col items-center mt-5 mb-6">
          <div className="relative">
            <div className="w-[110px] h-[110px] rounded-full bg-chokao-surface border-2 border-dashed border-chokao-border flex items-center justify-center">
              <Camera size={32} className="text-chokao-yellow" />
            </div>
            <span className="absolute -top-1 -right-2 bg-chokao-surface text-chokao-cream/60 text-[10px] font-body px-2 py-0.5 rounded-full border border-chokao-border">
              Opcional
            </span>
          </div>
          <p className="text-chokao-cream/60 text-[12px] font-body mt-2">Agregar foto</p>
        </div>

        <div className="space-y-4">
          <ChokaoInput
            label="Nombre"
            icon={<User size={20} />}
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setErrors(prev => ({ ...prev, firstName: "" })); }}
            error={errors.firstName}
          />
          <ChokaoInput
            label="Apellido"
            icon={<User size={20} />}
            value={lastName}
            onChange={(e) => { setLastName(e.target.value); setErrors(prev => ({ ...prev, lastName: "" })); }}
            error={errors.lastName}
          />

          {/* Celular con código de país */}
          <div className="flex gap-2">
            <div className="relative flex items-center h-[56px] rounded-2xl px-3 bg-chokao-surface border border-chokao-border w-[100px] shrink-0">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="w-full bg-transparent text-white text-[14px] font-body outline-none appearance-none cursor-pointer"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-chokao-primary text-white">
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="text-chokao-cream/40 shrink-0 ml-1" />
            </div>
            <div className="flex-1">
              <ChokaoInput
                label="Celular"
                icon={<Smartphone size={20} />}
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <ChokaoInput
            label="Empresa / Organización (Opcional)"
            icon={<Building2 size={20} />}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="mt-auto pb-8 pt-6">
          <ChokaoButton fullWidth onClick={handleContinue}>
            Continuar
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterProfile;
