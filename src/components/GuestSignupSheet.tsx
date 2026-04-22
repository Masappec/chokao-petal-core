import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChokaoIcon from "./ChokaoIcon";
import ChokaoButton from "./ChokaoButton";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "buy" | "reserve";
}

const GuestSignupSheet = ({ open, onClose, mode }: Props) => {
  const navigate = useNavigate();
  if (!open) return null;

  const action = mode === "buy" ? "comprar entradas" : "reservar cupos";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div
        className="relative w-full max-w-[390px] animate-slide-in-bottom"
        style={{ backgroundColor: "#1a2f42", borderRadius: "24px 24px 0 0", padding: 28 }}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4"
          style={{ color: "rgba(240,236,217,0.6)" }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="mx-auto mb-5 rounded-full" style={{ width: 40, height: 4, backgroundColor: "#2a4a62" }} />
        <div className="flex flex-col items-center text-center">
          <ChokaoIcon size={48} />
          <h2 className="mt-4 font-display font-bold text-[20px] text-white">
            Crea tu cuenta para continuar
          </h2>
          <p className="mt-2 text-[14px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            Necesitas una cuenta para {action} en CHOKAO
          </p>

          <div className="w-full mt-6 space-y-3">
            <ChokaoButton fullWidth onClick={() => navigate("/register")}>
              Crear cuenta
            </ChokaoButton>
            <button
              onClick={() => navigate("/login")}
              className="w-full text-center text-[14px] font-medium py-2"
              style={{ color: "#f0ecd9" }}
            >
              Ya tengo cuenta · Iniciar sesión
            </button>
          </div>

          <p className="mt-5 text-[12px]" style={{ color: "rgba(240,236,217,0.4)" }}>
            Puedes seguir explorando el evento sin cuenta
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestSignupSheet;
