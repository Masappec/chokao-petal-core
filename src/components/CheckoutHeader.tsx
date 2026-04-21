import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCheckout, calcTotal } from "@/lib/checkoutContext";

interface Props {
  title: string;
  step: 1 | 2 | 3;
}

const CheckoutHeader = ({ title, step }: Props) => {
  const navigate = useNavigate();
  const { data } = useCheckout();
  const total = calcTotal(data);

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          {title}
        </h1>
      </header>

      {/* Progress bar */}
      <div className="mx-5 mt-2 flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: n <= step ? "#fbba30" : "#2a4a62" }}
          />
        ))}
      </div>

      {/* Compact summary */}
      <div className="mx-5 mt-4 rounded-xl px-4 py-3 flex items-center justify-between" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex-1 min-w-0 pr-3">
          <p className="text-[13px] truncate" style={{ color: "rgba(240,236,217,0.7)" }}>
            {data.activityName} × {data.quantity}
          </p>
        </div>
        <span className="font-bold text-[14px]" style={{ color: "#fbba30" }}>
          ${total.toFixed(2)}
        </span>
      </div>
    </>
  );
};

export default CheckoutHeader;
