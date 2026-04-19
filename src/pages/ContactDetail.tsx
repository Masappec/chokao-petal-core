import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, MoreVertical, Calendar, MessageCircle, Mail, Phone, Globe2, Clock, Trash2, X,
} from "lucide-react";
import { allContacts } from "./Networking";
import MeetingRequestSheet from "@/components/MeetingRequestSheet";
import { toast } from "sonner";

const ContactDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const contact = allContacts.find((c) => c.id === id) ?? allContacts[0];

  const [menuOpen, setMenuOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-10" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header
        className="h-14 flex items-center px-5 sticky top-0 z-30"
        style={{ backgroundColor: "#102132" }}
      >
        <button onClick={() => navigate(-1)} className="text-white mr-3">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-display font-semibold text-[18px] text-white flex-1 text-center pr-6">
          Contacto
        </h1>
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute right-5 text-white"
          aria-label="Opciones"
        >
          <MoreVertical size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Hero */}
      <section
        className="px-5 pt-4 pb-7"
        style={{
          backgroundColor: "#1a2f42",
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-display font-bold text-[28px]"
            style={{
              backgroundColor: "#102132",
              border: `3px solid ${contact.color}`,
              color: contact.color,
            }}
          >
            {contact.name.charAt(0)}
          </div>
          <p className="mt-3 font-display font-bold text-[20px] text-white">{contact.name}</p>
          <span
            className="mt-2 text-[12px] uppercase tracking-[0.5px] px-3 py-[3px] rounded-full border"
            style={{
              backgroundColor: `${contact.color}26`,
              borderColor: `${contact.color}66`,
              color: contact.color,
            }}
          >
            {contact.typeLabel}
          </span>
          <p className="mt-2 text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            🏢 {contact.company}
          </p>
          <p className="mt-1 text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>
            {contact.flag} {contact.country}
          </p>
          <p
            className="mt-3 text-[12px] flex items-center gap-1.5"
            style={{ color: "rgba(240,236,217,0.4)" }}
          >
            <Clock size={12} strokeWidth={1.5} />
            Conectaste el 14 Jun 2025
          </p>
        </div>
      </section>

      {/* Action buttons */}
      <div className="px-5 mt-5 flex gap-3">
        <button
          onClick={() => setMeetingOpen(true)}
          className="flex-1 h-[52px] rounded-full font-semibold text-[14px] flex items-center justify-center gap-2"
          style={{ backgroundColor: "#fbba30", color: "#102132" }}
        >
          <Calendar size={18} />
          Pedir reunión
        </button>
        <a
          href={`https://wa.me/${contact.phone}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 h-[52px] rounded-full font-semibold text-[14px] flex items-center justify-center gap-2 border-2"
          style={{ borderColor: "#aab93e", color: "#aab93e" }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      {/* Info card */}
      <div
        className="mx-5 mt-5 rounded-2xl p-4"
        style={{ backgroundColor: "#1a2f42" }}
      >
        {[
          { icon: Mail, value: `${contact.id}@example.com` },
          { icon: Phone, value: `+${contact.phone}` },
          { icon: Globe2, value: `${contact.flag} ${contact.country}` },
        ].map((row, i, arr) => (
          <div key={i}>
            <div className="flex items-center gap-3 py-3">
              <row.icon size={18} style={{ color: "rgba(240,236,217,0.6)" }} />
              <span className="text-white text-[14px]">{row.value}</span>
            </div>
            {i < arr.length - 1 && (
              <div style={{ height: 1, backgroundColor: "#2a4a62" }} />
            )}
          </div>
        ))}
      </div>

      {/* Options bottom sheet */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] max-w-[390px] mx-auto">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl p-5"
            style={{ backgroundColor: "#1a2f42" }}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-4"
              style={{ backgroundColor: "rgba(240,236,217,0.3)" }}
            />
            <button
              onClick={() => {
                setMenuOpen(false);
                toast.success("Contacto eliminado");
                navigate(-1);
              }}
              className="w-full flex items-center gap-3 h-12"
              style={{ color: "#e73e40" }}
            >
              <Trash2 size={20} />
              <span className="text-[15px] font-medium">Eliminar contacto</span>
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 h-12 mt-2"
              style={{ color: "rgba(240,236,217,0.7)" }}
            >
              <X size={18} />
              <span className="text-[14px]">Cancelar</span>
            </button>
          </div>
        </div>
      )}

      {meetingOpen && (
        <MeetingRequestSheet
          contact={contact}
          onClose={() => setMeetingOpen(false)}
        />
      )}
    </div>
  );
};

export default ContactDetail;
