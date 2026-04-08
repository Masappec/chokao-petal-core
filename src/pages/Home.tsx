import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Store, Star, Map, MessageCircle, Users, LogIn, UserPlus } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import BottomNav from "@/components/BottomNav";
import MoreDrawer from "@/components/MoreDrawer";
import NewsFeed from "@/components/NewsFeed";

const Home = () => {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isLoggedIn] = useState(false);

  useEffect(() => {
    const target = new Date("2026-06-14T00:00:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const quickAccess = [
    { icon: Store, label: "Expositores", sub: "Feria comercial", color: "#aab93e" },
    { icon: Star, label: "Patrocinadores", sub: "Marcas del evento", color: "#fbba30" },
    { icon: Map, label: "Mapa", sub: "Plano del evento", color: "#f0ecd9" },
    { icon: MessageCircle, label: "Soporte", sub: "Ayuda rápida", color: "#aab93e" },
    { icon: Users, label: "Networking", sub: "Conectar", color: "#fbba30" },
  ];

  const pad = (n: number) => String(n).padStart(2, "0");

  const handleTab = (tab: string) => {
    if (tab === "agenda") navigate("/agenda");
    if (tab === "mas") setMoreOpen(true);
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto pb-[100px] overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center h-[64px] px-5" style={{ backgroundColor: "#102132" }}>
        <ChokaoIcon size={28} />
        <span className="ml-2 font-display font-bold text-[18px] text-white tracking-tight">CHOKAO</span>
        <div className="ml-auto flex items-center gap-3">
          {isLoggedIn && (
            <>
              <button className="relative" style={{ color: "rgba(240,236,217,0.7)" }}>
                <Bell size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: "#e73e40" }}>3</span>
              </button>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
                style={{ border: "2px solid #fbba30", backgroundColor: "#1a2f42", color: "#f0ecd9" }}>
                MR
              </div>
            </>
          )}
        </div>
      </header>

      {/* Greeting / Auth */}
      {isLoggedIn ? (
        <div className="px-5 pt-6 pb-2">
          <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>Bienvenido de vuelta</p>
          <h1 className="font-display font-bold text-[24px] text-white mt-1">Hola, María 👋</h1>
        </div>
      ) : (
        <div className="px-5 pt-6 pb-2">
          <h1 className="font-display font-bold text-[22px] text-white">Bienvenido a CHOKAO</h1>
          <p className="text-[13px] mt-1 mb-5" style={{ color: "rgba(240,236,217,0.6)" }}>
            Inicia sesión o crea tu cuenta para acceder a todo el evento
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 h-[40px] rounded-lg text-[13px] font-medium transition-transform active:scale-[0.97]"
              style={{ color: "rgba(240,236,217,0.7)" }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex-1 h-[40px] rounded-lg text-[13px] font-semibold transition-transform active:scale-[0.97]"
              style={{ backgroundColor: "#fbba30", color: "#102132" }}
            >
              Crear cuenta
            </button>
          </div>
            </button>
          </div>
        </div>
      )}

      {/* Countdown Banner */}
      <div className="mx-5 mt-4 rounded-[20px] overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a2f42, #102132)" }}>
        <div className="relative p-5">
          <p className="text-[11px] uppercase text-center mb-3" style={{ color: "rgba(240,236,217,0.5)" }}>
            El evento comienza en
          </p>
          <div className="flex items-center justify-center gap-2">
            {[
              { val: countdown.days, label: "días" },
              { val: countdown.hours, label: "horas" },
              { val: countdown.mins, label: "min" },
              { val: countdown.secs, label: "seg" },
            ].map((b, i) => (
              <div key={b.label} className="flex items-center gap-2">
                <div className="text-center">
                  <span className="font-display font-bold text-[22px]" style={{ color: "#fbba30" }}>{pad(b.val)}</span>
                  <p className="text-[10px] uppercase" style={{ color: "rgba(240,236,217,0.5)" }}>{b.label}</p>
                </div>
                {i < 3 && <span className="font-bold text-[18px] -mt-4" style={{ color: "#fbba30" }}>:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="px-5 mt-7">
        <h2 className="font-semibold text-[18px] text-white mb-4">Explorar</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickAccess.map((item) => (
            <button key={item.label}
              className="flex flex-col items-center justify-center aspect-square rounded-2xl p-4 transition-transform active:scale-[0.97]"
              style={{ backgroundColor: "#1a2f42", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
              <item.icon size={32} strokeWidth={1.5} style={{ color: item.color }} />
              <span className="text-white font-semibold text-[13px] mt-2.5">{item.label}</span>
              <span className="text-[11px] mt-0.5" style={{ color: "rgba(240,236,217,0.5)" }}>{item.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Feed */}
      <NewsFeed />

      <BottomNav activeTab="home" onTabChange={handleTab} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Home;
