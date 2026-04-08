import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import { User, UserCheck, Smartphone, Globe, Building2, Camera, ChevronDown } from "lucide-react";

const COUNTRIES = [
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+51", name: "Perú", flag: "🇵🇪" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+52", name: "México", flag: "🇲🇽" },
  { code: "+1", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "+34", name: "España", flag: "🇪🇸" },
  { code: "+55", name: "Brasil", flag: "🇧🇷" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
];

const RegisterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("+593");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim()) return;
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
            <div className="w-[88px] h-[88px] rounded-full bg-chokao-surface border-2 border-dashed border-chokao-border flex items-center justify-center">
              <Camera size={28} className="text-chokao-yellow" />
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
            onChange={(e) => setFirstName(e.target.value)}
          />
          <ChokaoInput
            label="Apellido"
            icon={<UserCheck size={20} />}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {/* País select */}
          <div className="relative flex items-center gap-3 h-[56px] rounded-2xl px-4 bg-chokao-surface border border-chokao-border transition-colors duration-200 focus-within:border-chokao-cream/30">
            <Globe size={20} className="text-chokao-cream/40 shrink-0" />
            <div className="flex-1 relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="peer w-full bg-transparent text-white text-[15px] font-body outline-none pt-3 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden></option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name} className="bg-chokao-primary text-white">
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <label className="absolute left-0 top-1/2 -translate-y-1/2 text-chokao-cream/50 text-[14px] font-body pointer-events-none transition-all duration-200 peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-chokao-cream/60 peer-[:not([value=''])]:top-2 peer-[:not([value=''])]:text-[11px]"
                style={country ? { top: '8px', fontSize: '11px' } : {}}
              >
                País de origen
              </label>
            </div>
            <ChevronDown size={16} className="text-chokao-cream/40 shrink-0" />
          </div>

          {/* Celular con código de país */}
          <div className="flex gap-2">
            <div className="relative flex items-center h-[56px] rounded-2xl px-3 bg-chokao-surface border border-chokao-border w-[100px] shrink-0">
              <select
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                className="w-full bg-transparent text-white text-[14px] font-body outline-none appearance-none cursor-pointer"
              >
                {COUNTRIES.map((c) => (
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
