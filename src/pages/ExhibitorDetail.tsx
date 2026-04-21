import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Globe, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";

interface Exhibitor {
  id: string;
  name: string;
  sector: string;
  country: string;
  stand: string;
  pavilion: string;
  description: string;
  products: { icon: string; label: string }[];
  email: string;
  phone: string;
  website: string;
}

const data: Record<string, Exhibitor> = {
  "hacienda-los-alamos": {
    id: "hacienda-los-alamos",
    name: "Hacienda Los Álamos",
    sector: "Productores de Cacao",
    country: "Ecuador",
    stand: "Stand #3",
    pavilion: "Pabellón Principal — Zona A",
    description:
      "Hacienda Los Álamos es una finca cacaotera familiar ubicada en Portoviejo, Manabí, con más de 30 años cultivando cacao fino de aroma variedad Nacional. Participamos en CHOKAO para conectar con compradores internacionales y chocolateros artesanales.",
    products: [
      { icon: "🍫", label: "Cacao en grano" },
      { icon: "🌿", label: "Pasta de cacao" },
      { icon: "🧴", label: "Manteca de cacao" },
      { icon: "📦", label: "Cacao fermentado" },
    ],
    email: "ventas@losalamos.ec",
    phone: "+593 99 123 4567",
    website: "www.haciendalosalamos.ec",
  },
};

const fallback = (id: string): Exhibitor => ({
  id,
  name: "Expositor",
  sector: "Productores de Cacao",
  country: "Ecuador",
  stand: "Stand #—",
  pavilion: "Pabellón Principal",
  description: "Información del expositor próximamente.",
  products: [{ icon: "🍫", label: "Cacao en grano" }],
  email: "info@chokao.ec",
  phone: "+593 99 000 0000",
  website: "www.chokao.ec",
});

const ExhibitorDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const e = data[id] ?? fallback(id);

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px]" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Expositor
        </h1>
      </header>

      {/* Hero */}
      <div className="px-5 pt-2 pb-6 rounded-b-[24px]" style={{ backgroundColor: "#1a2f42" }}>
        <div
          className="mx-auto w-[120px] h-[60px] rounded-[10px] flex items-center justify-center text-[12px]"
          style={{ backgroundColor: "#102132", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.4)" }}
        >
          LOGO
        </div>
        <h2 className="mt-4 text-center font-display font-bold text-[20px] text-white">{e.name}</h2>
        <div className="mt-2 flex justify-center">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] uppercase tracking-wide"
            style={{ backgroundColor: "rgba(170,185,62,0.15)", border: "1px solid #aab93e", color: "#aab93e" }}
          >
            {e.sector}
          </span>
        </div>
        <div className="mt-4 flex justify-center gap-5">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
            <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>{e.stand}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={14} strokeWidth={1.5} style={{ color: "rgba(240,236,217,0.5)" }} />
            <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.7)" }}>{e.country}</span>
          </div>
        </div>
      </div>

      {/* About */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Sobre la empresa</h3>
      <div className="mx-5 mt-2 p-4 rounded-2xl" style={{ backgroundColor: "#1a2f42" }}>
        <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(240,236,217,0.7)" }}>
          {e.description}
        </p>
      </div>

      {/* Products */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Productos y servicios</h3>
      <div className="mt-2 pl-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {e.products.map((p) => (
          <span
            key={p.label}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px]"
            style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.7)" }}
          >
            <span>{p.icon}</span>
            {p.label}
          </span>
        ))}
        <div className="w-3 flex-shrink-0" />
      </div>

      {/* Contact */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Contacto</h3>
      <div className="mx-5 mt-2 rounded-2xl overflow-hidden" style={{ backgroundColor: "#1a2f42" }}>
        <a href={`mailto:${e.email}`} className="flex items-center gap-3 px-4 py-3.5">
          <Mail size={18} strokeWidth={1.5} style={{ color: "#fbba30" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{e.email}</span>
        </a>
        <div style={{ height: 1, backgroundColor: "#2a4a62" }} />
        <a href={`tel:${e.phone}`} className="flex items-center gap-3 px-4 py-3.5">
          <Phone size={18} strokeWidth={1.5} style={{ color: "#aab93e" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{e.phone}</span>
        </a>
        <div style={{ height: 1, backgroundColor: "#2a4a62" }} />
        <a href={`https://${e.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3.5">
          <Globe size={18} strokeWidth={1.5} style={{ color: "#f0ecd9" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{e.website}</span>
        </a>
      </div>

      {/* Social */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Redes sociales</h3>
      <div className="mt-2 pl-5 flex gap-3">
        {[Instagram, Linkedin, Facebook].map((Icon, i) => (
          <button
            key={i}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1a2f42", border: "1px solid #2a4a62", color: "rgba(240,236,217,0.6)" }}
          >
            <Icon size={18} strokeWidth={1.5} />
          </button>
        ))}
      </div>

      {/* Location */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Ubicación</h3>
      <div className="mx-5 mt-2 p-4 rounded-2xl" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex items-start gap-3">
          <MapPin size={20} strokeWidth={1.5} style={{ color: "#e73e40" }} />
          <div className="flex-1">
            <p className="text-white font-semibold text-[15px]">{e.stand}</p>
            <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>{e.pavilion}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <ChokaoButton>
            <MapPin size={18} strokeWidth={1.5} />
            Ver en mapa del evento
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

export default ExhibitorDetail;
