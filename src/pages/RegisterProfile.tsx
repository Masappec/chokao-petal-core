import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import { User, Phone, Globe, Building2, Camera } from "lucide-react";

const RegisterProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
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
            icon={<User size={20} />}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="relative">
            <ChokaoInput
              label="Teléfono / WhatsApp"
              icon={<Phone size={20} />}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <ChokaoInput
            label="País de origen"
            icon={<Globe size={20} />}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
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
