import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Mail, Check } from "lucide-react";
import { useCheckout } from "@/lib/checkoutContext";
import { getActivityById, getActivityState } from "@/lib/activitiesCatalog";

const ReserveSummary = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const activity = getActivityById(params.id);
  const { remaining } = getActivityState(activity);
  const { data, update } = useCheckout();

  useEffect(() => {
    if (data.activityId !== activity.id) {
      update({
        activityId: activity.id,
        activityName: activity.title,
        category: activity.category,
        categoryColor: activity.categoryColor,
        date: activity.dateShort,
        time: activity.time,
        room: activity.room,
        pricePerTicket: 0,
        spotsRemaining: remaining,
        quantity: 1,
        acceptedTerms: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity.id]);

  const inputBase = {
    backgroundColor: "#102132",
    border: "1px solid #2a4a62",
    color: "#f0ecd9",
  } as React.CSSProperties;

  const onConfirm = () => {
    if (!data.acceptedTerms) return;
    const num = Math.floor(10000 + Math.random() * 90000);
    update({
      generatedTicketId: `rsv-${num}`,
      generatedTicketNumber: `RSV-2025-${num}`,
    });
    navigate("/reservar/exito");
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-32" style={{ backgroundColor: "#102132" }}>
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Reservar cupo
        </h1>
      </header>

      {/* Indicador 2 pasos verde */}
      <div className="flex items-center gap-2 px-5 py-4">
        <div className="flex-1 h-[4px] rounded-full" style={{ backgroundColor: "#aab93e" }} />
        <div className="flex-1 h-[4px] rounded-full" style={{ backgroundColor: "#2a4a62" }} />
      </div>

      <div className="px-5">
        <div className="rounded-2xl p-4" style={{ backgroundColor: "#1a2f42" }}>
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-block px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide"
              style={{
                backgroundColor: `${activity.categoryColor}26`,
                border: `1px solid ${activity.categoryColor}`,
                color: activity.categoryColor,
              }}
            >
              {activity.category}
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[12px] font-bold"
              style={{ backgroundColor: "rgba(170,185,62,0.15)", color: "#aab93e", border: "1px solid #aab93e" }}
            >
              Gratuito
            </span>
          </div>
          <h3 className="mt-2 text-white font-semibold text-[16px]">{activity.title}</h3>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <Calendar size={14} strokeWidth={1.5} /> {activity.dateLong}
            </div>
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <Clock size={14} strokeWidth={1.5} /> {activity.time} · {activity.duration}
            </div>
            <div className="flex items-center gap-2 text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
              <MapPin size={14} strokeWidth={1.5} /> {activity.room}
            </div>
          </div>
          <div className="my-3 h-px" style={{ backgroundColor: "#102132" }} />
          <div className="flex items-center gap-2 text-[13px]">
            <Users size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
            <span style={{ color: "rgba(240,236,217,0.7)" }}>
              {activity.spotsTaken} / {activity.spotsTotal} cupos disponibles
            </span>
          </div>
        </div>

        {/* Datos contacto */}
        <h2 className="mt-5 text-white font-semibold text-[16px]">¿Dónde confirmamos tu reserva?</h2>
        <div className="mt-3">
          <div className="relative">
            <Mail size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(240,236,217,0.5)" }} />
            <input
              type="email"
              value={data.buyerEmail}
              onChange={(e) => update({ buyerEmail: e.target.value })}
              placeholder="Correo electrónico"
              className="w-full h-11 rounded-lg pl-10 pr-3 text-[14px]"
              style={inputBase}
            />
          </div>
          <p className="mt-2 text-[12px]" style={{ color: "rgba(240,236,217,0.5)" }}>
            Te enviaremos la confirmación de tu reserva
          </p>
        </div>

        {/* Términos */}
        <div className="mt-5 flex items-start gap-3">
          <button
            onClick={() => update({ acceptedTerms: !data.acceptedTerms })}
            aria-pressed={data.acceptedTerms}
            className="shrink-0 flex items-center justify-center rounded transition-colors"
            style={{
              width: 18,
              height: 18,
              border: "1.5px solid #2a4a62",
              backgroundColor: data.acceptedTerms ? "rgba(170,185,62,0.15)" : "transparent",
            }}
          >
            {data.acceptedTerms && <Check size={12} strokeWidth={3} style={{ color: "#aab93e" }} />}
          </button>
          <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>
            Acepto los <span style={{ color: "#aab93e" }}>términos y condiciones</span> y la política de privacidad de CHOKAO
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5" style={{ backgroundColor: "#102132", borderTop: "1px solid #1e3448" }}>
        <button
          onClick={onConfirm}
          disabled={!data.acceptedTerms}
          className="h-[52px] w-full rounded-full font-semibold text-[15px] transition-all"
          style={{
            backgroundColor: "#aab93e",
            color: "#102132",
            opacity: data.acceptedTerms ? 1 : 0.4,
            pointerEvents: data.acceptedTerms ? "auto" : "none",
          }}
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default ReserveSummary;
