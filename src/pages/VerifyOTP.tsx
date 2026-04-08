import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import ProgressIndicator from "@/components/ProgressIndicator";
import ChokaoButton from "@/components/ChokaoButton";
import ChokaoIcon from "@/components/ChokaoIcon";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || "correo@ejemplo.com";
  const isRecovery = (location.state as any)?.recovery === true;

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(45);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== "");

  const handleVerify = () => {
    if (isRecovery) {
      navigate("/reset-password", { state: { email } });
    } else {
      navigate("/register/profile", { state: { email } });
    }
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto flex flex-col">
      <AppHeader
        variant="back"
        title={isRecovery ? "Verificar código" : "Verificar correo"}
        onBack={() => navigate(-1)}
      />
      {!isRecovery && <ProgressIndicator currentStep={2} />}

      <div className="flex-1 px-5 pt-6 flex flex-col items-center">
        <ChokaoIcon size={60} className="mb-4" />

        <h2 className="font-display font-bold text-[24px] text-white text-center">
          {isRecovery ? "Ingresa el código" : "Revisa tu correo"}
        </h2>
        <p className="text-chokao-cream/60 text-[14px] font-body mt-2 text-center max-w-[280px]">
          {isRecovery
            ? "Ingresa el código para restablecer tu contraseña enviado a"
            : "Ingresa el código de 6 dígitos que enviamos a"}{" "}
          <span className="text-chokao-yellow font-medium">{email}</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex gap-[10px] mt-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                w-[52px] h-[60px] rounded-xl text-center text-white font-bold text-[24px]
                bg-chokao-surface outline-none transition-all duration-200
                ${digit ? "border-2 border-chokao-green" : "border border-chokao-border"}
                ${!digit && "focus:border-2 focus:border-chokao-yellow focus:shadow-[0_0_12px_rgba(251,186,48,0.2)]"}
              `}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="mt-6">
          {timer > 0 ? (
            <p className="text-chokao-cream/50 text-[13px] font-body">
              Reenviar código en{" "}
              <span className="font-semibold">0:{timer.toString().padStart(2, "0")}</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(45)}
              className="text-chokao-yellow text-[13px] font-body font-semibold"
            >
              Reenviar código
            </button>
          )}
        </div>

        <div className="mt-auto pb-8 pt-6 w-full">
          <ChokaoButton fullWidth onClick={handleVerify} disabled={!isComplete}>
            Verificar
          </ChokaoButton>
          <p className="text-chokao-cream/40 text-[12px] font-body mt-4 text-center">
            Si no recibes el código, revisa tu carpeta de spam
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
