import { useNavigate } from "react-router-dom";
import {
  Settings, Camera, Building2, QrCode, ChevronRight, Pencil, Lock, Globe,
  Ticket, Users, Bell, MessageCircle, Star, FileText, LogOut,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Switch } from "@/components/ui/switch";

const user = {
  name: "María Rodríguez",
  email: "maria.rodriguez@chocolatesarbol.com",
  type: "Chocolatera / Chef",
  country: "Ecuador",
  flag: "🇪🇨",
  company: "Chocolates El Árbol",
  contacts: 12,
  tickets: 3,
};

const groups = [
  {
    label: "Mi información",
    items: [
      { icon: Pencil, label: "Editar perfil", color: "#fbba30", to: "/perfil/editar" },
      { icon: Lock, label: "Cambiar contraseña", color: "#f0ecd9" },
      { icon: Globe, label: "Idioma", color: "#f0ecd9", value: "ES" },
    ],
  },
  {
    label: "Evento",
    items: [
      { icon: Ticket, label: "Mis entradas", color: "#aab93e" },
      { icon: Users, label: "Mis contactos", color: "#aab93e", to: "/networking" },
      { icon: Bell, label: "Notificaciones", color: "#fbba30", toggle: true },
    ],
  },
  {
    label: "Soporte",
    items: [
      { icon: MessageCircle, label: "Ayuda por WhatsApp", color: "#aab93e" },
      { icon: Star, label: "Calificar la app", color: "#fbba30" },
      { icon: FileText, label: "Términos y privacidad", color: "#f0ecd9" },
    ],
  },
];

const Profile = () => {
  const navigate = useNavigate();

  const handleTab = (tab: string) => {
    if (tab === "home") navigate("/home");
    if (tab === "agenda") navigate("/agenda");
    if (tab === "perfil") return;
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px] bg-chokao-primary">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[56px] px-5 bg-chokao-primary">
        <div className="w-6" />
        <h1 className="flex-1 text-center font-display font-semibold text-[18px] text-foreground">Mi Perfil</h1>
        <button className="text-chokao-cream/70 hover:text-chokao-yellow transition-colors">
          <Settings size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* Hero */}
      <section className="bg-chokao-surface px-5 pt-6 pb-6 rounded-b-[24px]">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-chokao-primary border-[3px] border-chokao-yellow flex items-center justify-center">
              <span className="font-display font-bold text-[28px] text-chokao-yellow">M</span>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-chokao-yellow flex items-center justify-center shadow-lg"
              aria-label="Cambiar foto"
            >
              <Camera size={14} strokeWidth={2} className="text-chokao-primary" />
            </button>
          </div>

          <h2 className="mt-4 font-display font-bold text-[20px] text-foreground">{user.name}</h2>

          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-chokao-green/15 border border-chokao-green">
            <span className="text-[13px] text-chokao-green font-medium">{user.type}</span>
          </div>

          <p className="mt-3 text-[13px] text-chokao-cream/50">{user.email}</p>

          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-chokao-cream/60">
            <span>{user.flag}</span>
            <span>{user.country}</span>
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-chokao-cream/60">
            <Building2 size={14} strokeWidth={1.5} />
            <span>{user.company}</span>
          </div>

          {/* Stats */}
          <div className="mt-5 flex items-center gap-6">
            <button
              onClick={() => navigate("/networking")}
              className="flex flex-col items-center px-4"
            >
              <span className="font-display font-bold text-[20px] text-foreground">{user.contacts}</span>
              <span className="text-[12px] text-chokao-cream/50 mt-0.5">Contactos</span>
            </button>
            <div className="w-px h-10 bg-chokao-border" />
            <div className="flex flex-col items-center px-4">
              <span className="font-display font-bold text-[20px] text-foreground">{user.tickets}</span>
              <span className="text-[12px] text-chokao-cream/50 mt-0.5">Entradas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mi QR card */}
      <button
        onClick={() => navigate("/perfil/qr")}
        className="mt-5 mx-5 w-[calc(100%-40px)] flex items-center gap-3 p-4 rounded-2xl bg-chokao-surface border border-chokao-yellow/30 hover:border-chokao-yellow/60 transition-colors"
      >
        <div className="w-11 h-11 rounded-xl bg-chokao-yellow/10 flex items-center justify-center flex-shrink-0">
          <QrCode size={24} strokeWidth={1.5} className="text-chokao-yellow" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-display font-semibold text-[15px] text-foreground">Mi código QR</p>
          <p className="text-[13px] text-chokao-cream/50 mt-0.5">Comparte tu perfil con otros asistentes</p>
        </div>
        <ChevronRight size={18} className="text-chokao-cream/30" />
      </button>

      {/* Groups */}
      <div className="mt-6">
        {groups.map((g) => (
          <div key={g.label} className="mb-5">
            <p className="px-5 mb-2 text-[11px] uppercase tracking-wider font-semibold text-chokao-cream/40">
              {g.label}
            </p>
            <div className="bg-chokao-surface/40">
              {g.items.map((it, idx) => {
                const Icon = it.icon;
                const Comp: any = it.to ? "button" : "button";
                return (
                  <Comp
                    key={it.label}
                    onClick={() => it.to && navigate(it.to)}
                    className={`w-full flex items-center gap-3 px-5 h-[52px] hover:bg-white/5 transition-colors ${
                      idx !== g.items.length - 1 ? "border-b border-chokao-border/30" : ""
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: it.color }} />
                    <span className="flex-1 text-left text-[14px] text-foreground">{it.label}</span>
                    {"value" in it && it.value && (
                      <span className="text-[13px] text-chokao-cream/60 mr-1">{it.value}</span>
                    )}
                    {"toggle" in it && it.toggle ? (
                      <Switch defaultChecked />
                    ) : (
                      <ChevronRight size={16} className="text-chokao-cream/30" />
                    )}
                  </Comp>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 mt-2">
        <button className="w-full flex items-center justify-center gap-2 py-4 text-chokao-red">
          <LogOut size={18} strokeWidth={1.5} />
          <span className="text-[14px] font-medium">Cerrar sesión</span>
        </button>
        <p className="text-center text-[11px] text-chokao-cream/25 mt-2">CHOKAO v1.0.0</p>
      </div>

      <BottomNav activeTab="perfil" onTabChange={handleTab} />
    </div>
  );
};

export default Profile;
