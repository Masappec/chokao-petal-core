import { X, Building2, Handshake, Map, Users, ScanLine, ClipboardList, MessageCircle, Star, LogOut } from "lucide-react";

interface MoreDrawerProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  {
    label: "DESCUBRIR",
    items: [
      { icon: Building2, label: "Expositores", color: "#aab93e" },
      { icon: Handshake, label: "Patrocinadores", color: "#fbba30" },
      { icon: Map, label: "Mapa del evento", color: "#f0ecd9" },
    ],
  },
  {
    label: "CONECTAR",
    items: [
      { icon: Users, label: "Networking", color: "#fbba30" },
      { icon: ScanLine, label: "Escanear contacto", color: "#aab93e", badge: "Nuevo" },
    ],
  },
  {
    label: "INFORMACIÓN",
    items: [
      { icon: ClipboardList, label: "Sobre CHOKAO", color: "#f0ecd9" },
    ],
  },
  {
    label: "SOPORTE",
    items: [
      { icon: MessageCircle, label: "Ayuda por WhatsApp", color: "#aab93e" },
      { icon: Star, label: "Calificar la app", color: "#fbba30" },
    ],
  },
];

const MoreDrawer = ({ open, onClose }: MoreDrawerProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] max-w-[390px] mx-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 h-full w-[312px] overflow-y-auto"
        style={{ backgroundColor: "#102132", borderLeft: "1px solid #1e3448" }}
      >
        {/* Header */}
        <div className="relative p-5" style={{ backgroundColor: "#1a2f42", minHeight: 120 }}>
          <button onClick={onClose} className="absolute top-5 right-5" style={{ color: "rgba(240,236,217,0.6)" }}>
            <X size={20} />
          </button>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-sm font-bold"
              style={{ border: "2px solid #fbba30", backgroundColor: "#102132", color: "#f0ecd9" }}>
              MR
            </div>
            <div>
              <p className="font-display font-semibold text-[16px] text-white">María Rodríguez</p>
              <span className="inline-block text-[11px] px-2 py-0.5 rounded-full mt-1"
                style={{ backgroundColor: "rgba(170,185,62,0.15)", border: "1px solid #aab93e", color: "#aab93e" }}>
                Chocolatera / Chef
              </span>
              <p className="text-[12px] mt-1" style={{ color: "rgba(240,236,217,0.5)" }}>maria@email.com</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="py-2">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="text-[11px] uppercase tracking-wider px-5 pt-4 pb-2"
                style={{ color: "rgba(240,236,217,0.4)" }}>
                {section.label}
              </p>
              {section.items.map((item) => (
                <button key={item.label}
                  className="w-full flex items-center h-[52px] px-5 hover:bg-white/5 transition-colors">
                  <item.icon size={22} style={{ color: item.color }} />
                  <span className="ml-3 flex-1 text-left text-[15px] text-white">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#e73e40", color: "white" }}>
                      {item.badge}
                    </span>
                  )}
                  {'rightText' in item && item.rightText ? (
                    <span className="text-[13px]" style={{ color: "rgba(240,236,217,0.5)" }}>{item.rightText}</span>
                  ) : !item.badge ? (
                    <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.3)" }}>›</span>
                  ) : null}
                </button>
              ))}
              <div className="mx-5 h-px" style={{ backgroundColor: "#1e3448" }} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 pb-8">
          <button className="flex items-center gap-2 py-5" style={{ color: "#e73e40" }}>
            <LogOut size={18} />
            <span className="text-[14px] font-medium">Cerrar sesión</span>
          </button>
          <p className="text-[11px] text-center uppercase" style={{ color: "rgba(240,236,217,0.25)" }}>
            CHOKAO v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoreDrawer;
