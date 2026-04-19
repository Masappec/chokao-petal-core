import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode, Search, MessageCircle } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";

type ProfileType = "Productor" | "Comprador" | "Chocolatero" | "Expositor" | "Visitante";

interface Contact {
  id: string;
  name: string;
  type: ProfileType;
  typeLabel: string;
  company: string;
  country: string;
  flag: string;
  phone: string;
  color: string;
}

const allContacts: Contact[] = [
  {
    id: "carlos-vera",
    name: "Carlos Vera",
    type: "Productor",
    typeLabel: "Productor",
    company: "Hacienda Los Álamos",
    country: "Ecuador",
    flag: "🇪🇨",
    phone: "593999111222",
    color: "#aab93e",
  },
  {
    id: "ana-salgado",
    name: "Ana Salgado",
    type: "Comprador",
    typeLabel: "Compradora / Exportadora",
    company: "Cacao Export S.A.",
    country: "Colombia",
    flag: "🇨🇴",
    phone: "573001234567",
    color: "#fbba30",
  },
  {
    id: "pierre-dubois",
    name: "Pierre Dubois",
    type: "Chocolatero",
    typeLabel: "Chocolatero / Chef",
    company: "École du Chocolat",
    country: "Francia",
    flag: "🇫🇷",
    phone: "33612345678",
    color: "#e73e40",
  },
];

const filters: { id: "Todos" | ProfileType; label: string }[] = [
  { id: "Todos", label: "Todos" },
  { id: "Productor", label: "Productores" },
  { id: "Comprador", label: "Compradores" },
  { id: "Chocolatero", label: "Chocolateros" },
  { id: "Expositor", label: "Expositores" },
  { id: "Visitante", label: "Visitantes" },
];

const Networking = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("Todos");
  const [query, setQuery] = useState("");
  const [contacts] = useState<Contact[]>(allContacts);

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchesFilter = filter === "Todos" || c.type === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [contacts, filter, query]);

  const isEmpty = contacts.length === 0;

  return (
    <div className="min-h-screen max-w-[390px] mx-auto flex flex-col" style={{ backgroundColor: "#102132" }}>
      {/* Header */}
      <header
        className="h-14 flex items-center px-5 sticky top-0 z-30"
        style={{ backgroundColor: "#102132" }}
      >
        <button onClick={() => navigate(-1)} className="text-white mr-3">
          <ArrowLeft size={24} strokeWidth={1.5} />
        </button>
        <h1 className="font-display font-semibold text-[18px] text-white flex-1 text-center pr-6">
          Networking
        </h1>
        <button
          onClick={() => navigate("/escanear")}
          className="absolute right-5"
          style={{ color: "#fbba30" }}
          aria-label="Escanear contacto"
        >
          <QrCode size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Search */}
      <div className="px-5 pt-2">
        <div
          className="flex items-center gap-2 h-11 rounded-xl px-4"
          style={{ backgroundColor: "#1a2f42" }}
        >
          <Search size={18} style={{ color: "rgba(240,236,217,0.5)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar contacto..."
            className="flex-1 bg-transparent text-white text-[14px] outline-none placeholder:text-[rgba(240,236,217,0.4)]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-5 pb-1 w-max">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className="rounded-full px-[14px] py-[6px] text-[12px] uppercase tracking-[0.5px] font-medium border whitespace-nowrap transition-all"
                style={
                  active
                    ? {
                        backgroundColor: "rgba(251,186,48,0.15)",
                        borderColor: "#fbba30",
                        color: "#fbba30",
                      }
                    : {
                        backgroundColor: "#1a2f42",
                        borderColor: "#2a4a62",
                        color: "rgba(240,236,217,0.6)",
                      }
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div style={{ opacity: 0.2 }}>
            <ChokaoIcon size={64} />
          </div>
          <p className="mt-5 font-display font-semibold text-[18px] text-white text-center">
            Aún no tienes contactos
          </p>
          <p
            className="mt-2 text-[14px] text-center max-w-[260px]"
            style={{ color: "rgba(240,236,217,0.5)" }}
          >
            Escanea el QR de otros asistentes para comenzar a conectar
          </p>
          <button
            onClick={() => navigate("/escanear")}
            className="mt-6 h-[52px] rounded-full px-7 font-semibold text-[15px] flex items-center gap-2"
            style={{ backgroundColor: "#fbba30", color: "#102132" }}
          >
            <QrCode size={18} />
            Escanear mi primer contacto
          </button>
        </div>
      ) : (
        <div className="flex-1 pb-28">
          <p
            className="text-[13px] px-5 mt-3 mb-2"
            style={{ color: "rgba(240,236,217,0.5)" }}
          >
            {filtered.length} {filtered.length === 1 ? "contacto" : "contactos"}
          </p>
          <div className="px-5 flex flex-col gap-2.5">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/networking/${c.id}`)}
                className="flex items-center gap-3 rounded-2xl p-4 text-left transition-colors hover:brightness-110"
                style={{ backgroundColor: "#1a2f42" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-[16px] shrink-0"
                  style={{
                    backgroundColor: "#102132",
                    border: `2px solid ${c.color}`,
                    color: c.color,
                  }}
                >
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-[15px] truncate">{c.name}</p>
                  <span
                    className="inline-block mt-0.5 text-[10px] uppercase tracking-[0.4px] px-2 py-[2px] rounded-full border"
                    style={{
                      backgroundColor: `${c.color}26`,
                      borderColor: `${c.color}66`,
                      color: c.color,
                    }}
                  >
                    {c.typeLabel}
                  </span>
                  <p
                    className="text-[13px] mt-1 truncate"
                    style={{ color: "rgba(240,236,217,0.5)" }}
                  >
                    {c.company}
                  </p>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "rgba(240,236,217,0.4)" }}
                  >
                    {c.flag} {c.country}
                  </p>
                </div>
                <a
                  href={`https://wa.me/${c.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="shrink-0 p-2"
                  style={{ color: "#aab93e" }}
                  aria-label={`WhatsApp ${c.name}`}
                >
                  <MessageCircle size={22} strokeWidth={1.5} />
                </a>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Networking;

export { allContacts };
export type { Contact };
