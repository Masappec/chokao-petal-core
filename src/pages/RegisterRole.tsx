import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoButton from "@/components/ChokaoButton";
import ChokaoIcon from "@/components/ChokaoIcon";
import { TreePalm, Handshake, ChefHat, UserRound, Store } from "lucide-react";

const roles = [
  { id: "productor", label: "Productor", desc: "Cultivo y producción de cacao", icon: TreePalm },
  { id: "comprador", label: "Comprador / Exportador", desc: "Comercialización nacional e internacional", icon: Handshake },
  { id: "chocolatero", label: "Chocolatero / Chef", desc: "Elaboración de chocolate y gastronomía", icon: ChefHat },
  { id: "visitante", label: "Visitante", desc: "Asistente general al evento", icon: UserRound },
  { id: "expositor", label: "Expositor", desc: "Empresa o marca participante en la feria", icon: Store },
];

const RegisterRole = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFinish = () => {
    if (!selected) return;
    setShowSuccess(true);
    setTimeout(() => navigate("/dashboard"), 2500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col items-center justify-center px-5">
        <div className="flex flex-col items-center animate-mascot-entrance">
          {/* Petals appearing one by one */}
          <div className="relative w-[120px] h-[120px]">
            <div className="absolute inset-0 animate-[fadeIn_0.4s_ease-out_0.1s_both]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path d="M48 48C48 48 48 8 24 2C0 -4 -4 20 2 36C8 48 48 48 48 48Z" fill="#fbba30" transform="translate(2, 2)" />
              </svg>
            </div>
            <div className="absolute inset-0 animate-[fadeIn_0.4s_ease-out_0.3s_both]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path d="M52 48C52 48 52 8 76 2C100 -4 104 20 98 36C92 48 52 48 52 48Z" fill="#aab93e" transform="translate(-2, 2)" />
              </svg>
            </div>
            <div className="absolute inset-0 animate-[fadeIn_0.4s_ease-out_0.5s_both]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path d="M48 52C48 52 48 92 24 98C0 104 -4 80 2 64C8 52 48 52 48 52Z" fill="#f0ecd9" transform="translate(2, -2)" />
              </svg>
            </div>
            <div className="absolute inset-0 animate-[fadeIn_0.4s_ease-out_0.7s_both]">
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                <path d="M52 52C52 52 52 92 76 98C100 104 104 80 98 64C92 52 52 52 52 52Z" fill="#e73e40" transform="translate(-2, -2)" />
              </svg>
            </div>
          </div>
          <h2 className="font-display font-bold text-[28px] text-white mt-6 text-center animate-[fadeIn_0.5s_ease-out_1s_both]">
            ¡Bienvenido a CHOKAO!
          </h2>
          <p className="text-chokao-cream/60 text-[14px] font-body mt-2 animate-[fadeIn_0.5s_ease-out_1.2s_both]">
            Todo listo para la experiencia
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader variant="back" title="Tu rol en CHOKAO" onBack={() => navigate(-1)} />
      <ProgressIndicator currentStep={4} />

      <div className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="font-display font-bold text-[24px] text-white leading-tight">
          ¿Cómo participas en el evento?
        </h2>
        <div className="mb-5" />

        <div className="space-y-3">
          {roles.map((role) => {
            const isSelected = selected === role.id;
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role.id)}
                className={`
                  w-full flex items-center gap-4 p-[18px] rounded-2xl transition-all duration-200 text-left
                  ${isSelected
                    ? "bg-chokao-yellow/8 border-[1.5px] border-chokao-yellow"
                    : "bg-chokao-surface border border-chokao-border"
                  }
                `}
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className={`shrink-0 transition-colors ${isSelected ? "text-chokao-yellow" : "text-chokao-cream/60"}`}
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-body font-bold text-[16px] ${isSelected ? "text-chokao-yellow" : "text-white"}`}>
                    {role.label}
                  </p>
                  <p className="text-chokao-cream/60 text-[13px] font-body">{role.desc}</p>
                </div>
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                    ${isSelected ? "border-chokao-yellow bg-chokao-yellow" : "border-chokao-border"}
                  `}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-chokao-primary" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pb-8 pt-6">
          <ChokaoButton fullWidth onClick={handleFinish} disabled={!selected}>
            Finalizar registro
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterRole;
