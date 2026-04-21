import { X, Store, Star, Map, Users, ScanLine, ClipboardList, MessageCircle, FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MoreDrawerProps {
  open: boolean;
  onClose: () => void;
}

const items = [
  { icon: Store, label: "Expositores", color: "#aab93e" },
  { icon: Star, label: "Patrocinadores", color: "#fbba30" },
  { icon: Map, label: "Mapa del evento", color: "#f0ecd9" },
  { icon: Users, label: "Networking", color: "#fbba30", to: "/networking" },
  { icon: ScanLine, label: "Escanear contacto", color: "#aab93e", badge: "Nuevo", to: "/escanear" },
  { icon: ClipboardList, label: "Sobre CHOKAO", color: "#f0ecd9" },
  { icon: MessageCircle, label: "Ayuda por WhatsApp", color: "#aab93e" },
  { icon: Star, label: "Calificar la app", color: "#fbba30" },
  { icon: FileText, label: "Términos y privacidad", color: "#f0ecd9" },
];

const MoreDrawer = ({ open, onClose }: MoreDrawerProps) => {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] max-w-[390px] mx-auto">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="absolute right-0 top-0 h-full w-[280px] flex flex-col overflow-y-auto"
        style={{ backgroundColor: "#102132", borderLeft: "1px solid #1e3448" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[64px] flex-shrink-0"
          style={{ borderBottom: "1px solid #1e3448" }}>
          <p className="font-display font-semibold text-[16px] text-white">María Rodríguez</p>
          <button onClick={onClose} style={{ color: "rgba(240,236,217,0.6)" }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 py-3">
          {items.map((item) => (
            <button key={item.label}
              onClick={() => {
                if ((item as any).to) { onClose(); navigate((item as any).to); }
              }}
              className="w-full flex items-center h-[48px] px-5 hover:bg-white/5 transition-colors">
              <item.icon size={20} style={{ color: item.color }} />
              <span className="ml-3 flex-1 text-left text-[14px] text-white">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#e73e40", color: "white" }}>
                  {item.badge}
                </span>
              )}
              {!item.badge && (
                <span className="text-[14px]" style={{ color: "rgba(240,236,217,0.3)" }}>›</span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 pb-8 flex-shrink-0" style={{ borderTop: "1px solid #1e3448" }}>
          <button className="flex items-center gap-2 py-4" style={{ color: "#e73e40" }}>
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
