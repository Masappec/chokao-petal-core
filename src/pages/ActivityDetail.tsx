import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Users, Ticket } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";
import ChokaoIcon from "@/components/ChokaoIcon";
import GuestSignupSheet from "@/components/GuestSignupSheet";
import { getActivityById, getActivityState } from "@/lib/activitiesCatalog";
import { useGuest } from "@/lib/guestContext";
import { useCheckout } from "@/lib/checkoutContext";

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();

const ActivityDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const activity = getActivityById(params.id);
  const { soldOut, lastSpots, isFree, remaining } = getActivityState(activity);
  const { isGuest } = useGuest();
  const { update } = useCheckout();
  const [guestOpen, setGuestOpen] = useState(false);

  const startCheckout = () => {
    update({
      activityId: activity.id,
      activityName: activity.title,
      category: activity.category,
      categoryColor: activity.categoryColor,
      date: activity.dateShort,
      time: activity.time,
      room: activity.room,
      pricePerTicket: activity.price,
      quantity: 1,
      spotsRemaining: remaining,
      acceptedTerms: false,
    });
  };

  const onCta = () => {
    if (isGuest) {
      setGuestOpen(true);
      return;
    }
    startCheckout();
    if (isFree) navigate(`/reservar/${activity.id}`);
    else navigate(`/comprar/${activity.id}`);
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-28" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">Detalle</h1>
      </header>

      {/* Hero */}
      <div
        className="relative mx-5 rounded-2xl overflow-hidden mt-2 h-[220px] flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a2f42 0%, #102132 100%)" }}
      >
        {/* watermark icon */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.15 }}>
          <ChokaoIcon size={140} />
        </div>
        {/* category chip */}
        <span
          className="absolute top-3 left-3 rounded-full px-3 py-[5px] text-[11px] uppercase tracking-[0.5px] font-medium border"
          style={{
            backgroundColor: `${activity.categoryColor}26`,
            borderColor: activity.categoryColor,
            color: activity.categoryColor,
          }}
        >
          {activity.category}
        </span>
        {soldOut && (
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-[5px] text-[11px] uppercase tracking-[0.5px] font-bold"
            style={{ backgroundColor: "#2a4a62", color: "rgba(240,236,217,0.7)" }}
          >
            Agotado
          </span>
        )}
      </div>

      {/* Title */}
      <div className="px-5 pt-4 pb-4">
        <h2 className="font-display font-bold text-[24px] text-white leading-tight">{activity.title}</h2>
      </div>

      {/* Metadata */}
      <div className="px-5 py-2 space-y-3">
        <div className="flex items-center gap-3 text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>
          <Clock size={18} strokeWidth={1.5} style={{ color: "rgba(251,186,48,0.7)" }} className="shrink-0" />
          <span>
            {activity.dateLong} · {activity.time} · {activity.duration}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>
          <MapPin size={18} strokeWidth={1.5} style={{ color: "rgba(251,186,48,0.7)" }} className="shrink-0" />
          <span>{activity.room}</span>
        </div>
        <div className="flex items-center gap-3 text-[14px]">
          <Users
            size={18}
            strokeWidth={1.5}
            className="shrink-0"
            style={{ color: lastSpots ? "#e73e40" : "rgba(251,186,48,0.7)" }}
          />
          <span style={{ color: lastSpots ? "#e73e40" : "rgba(240,236,217,0.8)" }}>
            {soldOut
              ? `${activity.spotsTotal} / ${activity.spotsTotal} cupos`
              : `${activity.spotsTaken} / ${activity.spotsTotal} disponibles`}
          </span>
        </div>
      </div>

      <div className="px-5">
        <div className="h-px my-4" style={{ backgroundColor: "rgba(42,74,98,0.5)" }} />
      </div>

      {/* Speaker */}
      {activity.speaker && (
        <div className="px-5 py-2">
          <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "rgba(240,236,217,0.4)" }}>
            Ponente
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold"
              style={{ backgroundColor: "#2a4a62", color: "#f0ecd9" }}
            >
              {initials(activity.speaker)}
            </div>
            <div>
              <p className="text-white font-semibold text-[15px]">{activity.speaker}</p>
              {activity.speakerRole && (
                <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>
                  {activity.speakerRole}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="px-5 py-4">
        <p className="text-[14px]" style={{ color: "rgba(240,236,217,0.7)", lineHeight: 1.6 }}>
          {activity.description}
        </p>
      </div>

      {/* Bottom bar — 4 variants */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-5 py-3 z-50"
        style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}
      >
        {activity.owned ? (
          // Variant 3 — Ya tienes entrada
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Ticket size={18} strokeWidth={1.5} style={{ color: "#aab93e" }} />
              <span className="font-semibold text-[15px]" style={{ color: "#aab93e" }}>
                Ya tienes entrada
              </span>
            </div>
            <button
              onClick={() => navigate(`/entradas/${activity.ticketId ?? "tkt-1"}`)}
              className="h-[52px] rounded-full px-6 font-semibold text-[15px] transition-all"
              style={{ border: "2px solid #aab93e", color: "#aab93e", backgroundColor: "transparent" }}
            >
              Ver mi QR
            </button>
          </div>
        ) : soldOut ? (
          // Variant 4 — Agotada
          <div className="text-center py-3 rounded-xl" style={{ backgroundColor: "#1a2f42" }}>
            <p className="text-[14px]" style={{ color: "rgba(240,236,217,0.4)" }}>
              Esta actividad no tiene cupos disponibles
            </p>
          </div>
        ) : isFree ? (
          // Variant 2 — Gratuita
          <div className="flex items-center justify-between gap-3">
            <span
              className="rounded-full px-4 py-2 font-bold text-[16px]"
              style={{
                backgroundColor: "rgba(170,185,62,0.15)",
                border: "1px solid #aab93e",
                color: "#aab93e",
              }}
            >
              Gratis
            </span>
            <button
              onClick={onCta}
              className="h-[52px] rounded-full px-6 font-semibold text-[15px] transition-all active:brightness-95"
              style={{ backgroundColor: "#aab93e", color: "#102132" }}
            >
              Reservar cupo
            </button>
          </div>
        ) : (
          // Variant 1 — Pagada
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display font-bold text-[22px]" style={{ color: "#fbba30" }}>
                ${activity.price.toFixed(0)}
              </p>
              <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
                por persona
              </p>
            </div>
            <ChokaoButton onClick={onCta}>Comprar Entrada</ChokaoButton>
          </div>
        )}
      </div>

      <GuestSignupSheet open={guestOpen} onClose={() => setGuestOpen(false)} mode={isFree ? "reserve" : "buy"} />
    </div>
  );
};

export default ActivityDetail;
