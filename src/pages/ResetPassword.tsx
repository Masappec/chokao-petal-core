import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import PasswordStrength from "@/components/PasswordStrength";
import { Lock } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    if (password.length < 8) { setError("Mínimo 8 caracteres"); return; }
    if (password !== confirm) { setError("Las contraseñas no coinciden"); return; }
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader variant="back" title="Nueva contraseña" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-8 flex flex-col">
        <h2 className="font-display font-bold text-[24px] text-white leading-tight">
          Crea tu nueva contraseña
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-1 mb-6">
          Ingresa y confirma tu nueva contraseña
        </p>

        <div className="space-y-4">
          <div>
            <ChokaoInput
              label="Nueva contraseña"
              icon={<Lock size={20} />}
              isPassword
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
            <PasswordStrength password={password} />
          </div>
          <ChokaoInput
            label="Confirmar contraseña"
            icon={<Lock size={20} />}
            isPassword
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setError(""); }}
            error={error}
          />
        </div>

        <p className="text-chokao-cream/50 text-[12px] font-body mt-3">
          Mínimo 8 caracteres, una mayúscula y un número
        </p>

        <div className="mt-auto pb-8 pt-6">
          <ChokaoButton fullWidth onClick={handleReset}>
            Restablecer contraseña
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
