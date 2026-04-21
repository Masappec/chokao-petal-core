import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import PasswordStrength from "@/components/PasswordStrength";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!current) e.current = "Ingresa tu contraseña actual";
    if (next.length < 8) e.next = "Mínimo 8 caracteres";
    else if (!/[A-Z]/.test(next)) e.next = "Incluye una mayúscula";
    else if (!/[0-9]/.test(next)) e.next = "Incluye un número";
    else if (next === current) e.next = "Debe ser distinta a la actual";
    if (next !== confirm) e.confirm = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Contraseña actualizada");
      navigate(-1);
    }, 700);
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto bg-chokao-primary flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5 bg-chokao-primary">
        <button onClick={() => navigate(-1)} className="text-foreground hover:text-chokao-yellow" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-foreground pr-6">
          Cambiar contraseña
        </h1>
      </header>

      <div className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="font-display font-bold text-[22px] text-white leading-tight">
          Actualiza tu contraseña
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-1 mb-5">
          Usa una contraseña segura que no hayas usado antes
        </p>

        <div className="space-y-4">
          <ChokaoInput
            label="Contraseña actual"
            icon={<Lock size={20} />}
            isPassword
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            error={errors.current}
          />
          <div>
            <ChokaoInput
              label="Nueva contraseña"
              icon={<Lock size={20} />}
              isPassword
              value={next}
              onChange={(e) => setNext(e.target.value)}
              error={errors.next}
            />
            <PasswordStrength password={next} />
          </div>
          <ChokaoInput
            label="Confirmar nueva contraseña"
            icon={<Lock size={20} />}
            isPassword
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
          />
        </div>

        <div className="mt-auto pb-8 pt-6 flex flex-col gap-3">
          <ChokaoButton fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </ChokaoButton>
          <button
            onClick={() => navigate(-1)}
            className="w-full h-[52px] rounded-2xl border border-chokao-border text-chokao-cream/70 font-body text-[15px] font-semibold hover:bg-chokao-surface transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
