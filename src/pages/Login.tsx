import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import ChokaoSeparator from "@/components/ChokaoSeparator";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/agenda");
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      {/* Header with centered logo */}
      <div className="flex items-center justify-center gap-2 py-5">
        <ChokaoIcon size={28} />
        <span className="font-display font-bold text-[18px] text-chokao-cream tracking-tight">CHOKAO</span>
      </div>

      <div className="flex-1 px-5 pt-4 flex flex-col">
        <h2 className="font-display font-bold text-[28px] text-white leading-tight">
          Bienvenido de vuelta
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-1 mb-8">
          Ingresa tus credenciales para continuar
        </p>

        <div className="space-y-4">
          <ChokaoInput
            label="Correo electrónico"
            icon={<Mail size={20} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <ChokaoInput
              label="Contraseña"
              icon={<Lock size={20} />}
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-chokao-yellow text-[13px] font-body font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ChokaoButton fullWidth onClick={handleLogin}>
            Iniciar sesión
          </ChokaoButton>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-chokao-cream/20" />
          <span className="text-chokao-cream/30 text-[13px] font-body">o</span>
          <div className="flex-1 h-px bg-chokao-cream/20" />
        </div>

        <p className="text-center text-chokao-cream/60 text-[14px] font-body">
          ¿No tienes cuenta?{" "}
          <button onClick={() => navigate("/register")} className="text-chokao-yellow font-semibold">
            Regístrate
          </button>
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 h-[52px] rounded-2xl border border-chokao-border text-chokao-cream/70 font-body text-[15px] font-semibold hover:bg-chokao-surface transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Login;
