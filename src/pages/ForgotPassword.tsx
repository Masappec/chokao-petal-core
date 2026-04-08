import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoInput from "@/components/ChokaoInput";
import ChokaoButton from "@/components/ChokaoButton";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (email.trim()) {
      navigate("/register/verify", { state: { email, recovery: true } });
    }
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader variant="back" title="Recuperar contraseña" onBack={() => navigate(-1)} />

      <div className="flex-1 px-5 pt-8 flex flex-col items-center">
        <ChokaoIcon size={60} className="mb-5" />

        <h2 className="font-display font-bold text-[24px] text-white text-center">
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-2 text-center max-w-[280px] mb-8">
          Ingresa tu correo y te enviaremos un código para restablecerla
        </p>

        <div className="w-full">
          <ChokaoInput
            label="Correo electrónico"
            icon={<Mail size={20} />}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mt-auto pb-8 pt-6 w-full">
          <ChokaoButton fullWidth onClick={handleSend}>
            Enviar código
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
