import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import PasswordStrength from "@/components/PasswordStrength";
import { Mail, Lock } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = "Correo inválido";
    if (password.length < 8) e.password = "Mínimo 8 caracteres";
    else if (!/[A-Z]/.test(password)) e.password = "Incluye una mayúscula";
    else if (!/[0-9]/.test(password)) e.password = "Incluye un número";
    if (password !== confirmPassword) e.confirm = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigate("/register/verify", { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader variant="back" title="Crear cuenta" onBack={() => navigate("/")} />
      <ProgressIndicator currentStep={1} />

      <div className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="font-display font-bold text-[24px] text-white leading-tight">
          ¿Cuál es tu correo?
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-1 mb-4">
          Te enviaremos un código de verificación
        </p>

        <div className="flex items-start gap-2 bg-chokao-surface/60 rounded-xl px-3.5 py-2.5 mb-5 border border-chokao-border/50">
          <Lock size={14} className="text-chokao-cream/40 mt-0.5 shrink-0" />
          <p className="text-chokao-cream/50 text-[12px] font-body leading-relaxed">
            La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número
          </p>
        </div>

        <div className="space-y-4">
          <ChokaoInput
            label="Correo electrónico"
            icon={<Mail size={20} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <div>
            <ChokaoInput
              label="Contraseña"
              icon={<Lock size={20} />}
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <PasswordStrength password={password} />
          </div>
          <ChokaoInput
            label="Confirmar contraseña"
            icon={<Lock size={20} />}
            isPassword
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirm}
          />
        </div>

        <div className="mt-auto pb-8 pt-6">
          <ChokaoButton fullWidth onClick={handleContinue}>
            Continuar
          </ChokaoButton>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-3 h-[52px] rounded-2xl border border-chokao-border text-chokao-cream/70 font-body text-[15px] font-semibold hover:bg-chokao-surface transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
