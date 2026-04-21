import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Globe, Mail, Phone, Instagram, Linkedin, Facebook } from "lucide-react";
import ChokaoButton from "@/components/ChokaoButton";

type Tier = "platinum" | "gold" | "silver";

interface Sponsor {
  id: string;
  name: string;
  tier: Tier;
  tagline: string;
  description: string;
  products: { icon: string; label: string }[];
  email: string;
  phone: string;
  website: string;
  stand?: string;
  pavilion?: string;
}

const tierConfig: Record<Tier, { label: string; color: string }> = {
  platinum: { label: "✦ PLATINUM", color: "#fbba30" },
  gold: { label: "◆ GOLD", color: "#fbba30" },
  silver: { label: "● SILVER", color: "#f0ecd9" },
};

const data: Record<string, Sponsor> = {
  "banco-pichincha": {
    id: "banco-pichincha",
    name: "Banco Pichincha",
    tier: "platinum",
    tagline: "El banco que impulsa el agro ecuatoriano",
    description:
      "Banco Pichincha es la institución financiera líder de Ecuador, con más de 100 años apoyando el desarrollo del país. Patrocinamos CHOKAO como parte de nuestro compromiso con el sector cacaotero y los emprendedores del agro.",
    products: [
      { icon: "💳", label: "Crédito agrícola" },
      { icon: "🏦", label: "Cuentas empresariales" },
      { icon: "📈", label: "Inversión productiva" },
    ],
    email: "agro@pichincha.ec",
    phone: "+593 2 299 9999",
    website: "www.pichincha.com",
    stand: "Stand #1",
    pavilion: "Pabellón Principal — Zona VIP",
  },
};

const fallback = (id: string): Sponsor => ({
  id,
  name: "Patrocinador",
  tier: "gold",
  tagline: "Comprometidos con CHOKAO",
  description: "Información del patrocinador próximamente.",
  products: [{ icon: "🍫", label: "Servicios" }],
  email: "info@chokao.ec",
  phone: "+593 99 000 0000",
  website: "www.chokao.ec",
});

const SponsorDetail = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const s = data[id] ?? fallback(id);
  const tier = tierConfig[s.tier];

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px]" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5" style={{ backgroundColor: "#102132" }}>
        <button onClick={() => navigate(-1)} className="text-white" aria-label="Atrás">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-white pr-6">
          Patrocinador
        </h1>
      </header>

      {/* Hero */}
      <div className="px-5 pt-3 pb-7 rounded-b-[24px]" style={{ backgroundColor: "#1a2f42" }}>
        <div className="flex justify-center">
          <span
            className="px-3 py-1 rounded-full text-[11px] uppercase font-bold"
            style={{ border: `1px solid ${tier.color}`, color: tier.color, letterSpacing: "1.5px" }}
          >
            {tier.label}
          </span>
        </div>
        <div
          className="mx-auto mt-4 w-[160px] h-[72px] rounded-[12px] flex items-center justify-center text-[12px]"
          style={{ backgroundColor: "#102132", border: `1px solid ${tier.color}`, color: "rgba(240,236,217,0.4)" }}
        >
          LOGO
        </div>
        <h2 className="mt-4 text-center font-display font-bold text-[20px] text-white">{s.name}</h2>
        <p className="text-center italic text-[14px]" style={{ color: "rgba(240,236,217,0.6)" }}>
          {s.tagline}
        </p>
      </div>

      {/* Actions */}
      <div className="px-5 mt-5 flex gap-3">
        <ChokaoButton fullWidth className="flex-1">
          <Globe size={18} strokeWidth={1.5} />
          Sitio web
        </ChokaoButton>
        <ChokaoButton variant="secondary" fullWidth className="flex-1">
          <Mail size={18} strokeWidth={1.5} />
          Contactar
        </ChokaoButton>
      </div>

      {/* About */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Quiénes somos</h3>
      <div className="mx-5 mt-2 p-4 rounded-2xl" style={{ backgroundColor: "#1a2f42" }}>
        <p className="text-[14px] leading-[1.6]" style={{ color: "rgba(240,236,217,0.7)" }}>
          {s.description}
        </p>
      </div>

      {/* Products */}
      <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Productos y servicios</h3>
      <div className="mt-2 pl-5 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {s.products.map((p) => (
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
        <a href={`mailto:${s.email}`} className="flex items-center gap-3 px-4 py-3.5">
          <Mail size={18} strokeWidth={1.5} style={{ color: "#fbba30" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{s.email}</span>
        </a>
        <div style={{ height: 1, backgroundColor: "#2a4a62" }} />
        <a href={`tel:${s.phone}`} className="flex items-center gap-3 px-4 py-3.5">
          <Phone size={18} strokeWidth={1.5} style={{ color: "#aab93e" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{s.phone}</span>
        </a>
        <div style={{ height: 1, backgroundColor: "#2a4a62" }} />
        <a href={`https://${s.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3.5">
          <Globe size={18} strokeWidth={1.5} style={{ color: "#f0ecd9" }} />
          <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.8)" }}>{s.website}</span>
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

      {/* Stand */}
      {s.stand && (
        <>
          <h3 className="px-5 mt-6 text-white font-semibold text-[16px]">Stand en la feria</h3>
          <div className="mx-5 mt-2 p-4 rounded-2xl" style={{ backgroundColor: "#1a2f42" }}>
            <div className="flex items-start gap-3">
              <MapPin size={20} strokeWidth={1.5} style={{ color: "#e73e40" }} />
              <div className="flex-1">
                <p className="text-white font-semibold text-[15px]">{s.stand}</p>
                <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>{s.pavilion}</p>
              </div>
            </div>
            <button className="mt-3 text-[14px] font-medium" style={{ color: "#fbba30" }}>
              Ver en mapa →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SponsorDetail;
