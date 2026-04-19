import { useMemo, useState } from "react";
import { Info, MapPin, MessageCircle, Clock } from "lucide-react";
import type { Contact } from "@/pages/Networking";

interface Props {
  contact: Contact;
  onClose: () => void;
}

const days = [
  { id: "2025-06-14", label: "Jue 14 Jun" },
  { id: "2025-06-15", label: "Vie 15 Jun" },
  { id: "2025-06-16", label: "Sáb 16 Jun" },
];

const hours = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

const MAX_MSG = 200;

const MeetingRequestSheet = ({ contact, onClose }: Props) => {
  const [day, setDay] = useState(days[1].id);
  const [hour, setHour] = useState(hours[1]);
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");

  const dayLabel = useMemo(() => days.find((d) => d.id === day)?.label ?? "", [day]);

  const handleSend = () => {
    const text =
      `Hola ${contact.name.split(" ")[0]}, soy María Rodríguez (Chocolatera/Chef) de CHOKAO 2025. ` +
      `Me gustaría reunirme contigo el ${dayLabel} a las ${hour}` +
      `${place ? ` en ${place}` : ""}.` +
      `${message ? ` ${message}` : ""}` +
      ` ¡Espero tu confirmación!`;
    const url = `https://wa.me/${contact.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] max-w-[390px] mx-auto">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
        style={{ backgroundColor: "#1a2f42" }}
      >
        <div
          className="w-10 h-1 rounded-full mx-auto mb-4"
          style={{ backgroundColor: "rgba(240,236,217,0.3)" }}
        />

        {/* Header */}
        <h2 className="font-display font-semibold text-[18px] text-white">
          Solicitar reunión
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            Con {contact.name} ·
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.4px] px-2 py-[2px] rounded-full border"
            style={{
              backgroundColor: `${contact.color}26`,
              borderColor: `${contact.color}66`,
              color: contact.color,
            }}
          >
            {contact.typeLabel}
          </span>
        </div>

        {/* Day chips */}
        <p className="text-[12px] uppercase tracking-[0.5px] mt-5 mb-2"
           style={{ color: "rgba(240,236,217,0.4)" }}>
          Día
        </p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {days.map((d) => {
            const active = day === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDay(d.id)}
                className="rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.5px] font-medium border whitespace-nowrap"
                style={
                  active
                    ? { backgroundColor: "rgba(251,186,48,0.15)", borderColor: "#fbba30", color: "#fbba30" }
                    : { backgroundColor: "#102132", borderColor: "#2a4a62", color: "rgba(240,236,217,0.6)" }
                }
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Hour */}
        <p className="text-[12px] uppercase tracking-[0.5px] mt-4 mb-2"
           style={{ color: "rgba(240,236,217,0.4)" }}>
          Hora
        </p>
        <div className="relative">
          <Clock
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(240,236,217,0.5)" }}
          />
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full h-12 rounded-xl pl-9 pr-3 text-white text-[14px] outline-none appearance-none"
            style={{ backgroundColor: "#102132", border: "1px solid #2a4a62" }}
          >
            {hours.map((h) => (
              <option key={h} value={h} style={{ backgroundColor: "#102132" }}>{h}</option>
            ))}
          </select>
        </div>

        {/* Place */}
        <p className="text-[12px] uppercase tracking-[0.5px] mt-4 mb-2"
           style={{ color: "rgba(240,236,217,0.4)" }}>
          Lugar
        </p>
        <div className="relative">
          <MapPin
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "rgba(240,236,217,0.5)" }}
          />
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Ej: Stand 14, Sala Cacao..."
            className="w-full h-12 rounded-xl pl-9 pr-3 text-white text-[14px] outline-none placeholder:text-[rgba(240,236,217,0.4)]"
            style={{ backgroundColor: "#102132", border: "1px solid #2a4a62" }}
          />
        </div>

        {/* Message */}
        <p className="text-[12px] uppercase tracking-[0.5px] mt-4 mb-2"
           style={{ color: "rgba(240,236,217,0.4)" }}>
          Mensaje (opcional)
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MSG))}
          rows={4}
          placeholder="Escribe un mensaje para tu contacto..."
          className="w-full rounded-xl p-3 text-white text-[14px] outline-none resize-none placeholder:text-[rgba(240,236,217,0.4)]"
          style={{ backgroundColor: "#102132", border: "1px solid #2a4a62" }}
        />
        <p className="text-right text-[11px] mt-1" style={{ color: "rgba(240,236,217,0.4)" }}>
          {message.length}/{MAX_MSG}
        </p>

        {/* Info */}
        <div className="flex items-start gap-2 mt-3">
          <Info size={14} style={{ color: "#fbba30" }} className="mt-0.5 shrink-0" />
          <p className="text-[12px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            La solicitud se enviará a {contact.name.split(" ")[0]} vía WhatsApp.
            Él podrá aceptar o proponer otro horario.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleSend}
          className="w-full mt-5 h-[52px] rounded-full font-semibold text-[15px] flex items-center justify-center gap-2"
          style={{ backgroundColor: "#fbba30", color: "#102132" }}
        >
          <MessageCircle size={18} />
          Enviar solicitud por WhatsApp
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 h-12 text-[14px]"
          style={{ color: "rgba(240,236,217,0.7)" }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default MeetingRequestSheet;
