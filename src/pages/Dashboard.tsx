import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Store, Star, Map, MessageCircle, Users } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import BottomNav from "@/components/BottomNav";
import MoreDrawer from "@/components/MoreDrawer";
import NewsFeed from "@/components/NewsFeed";
import EventBanner from "@/components/EventBanner";
import cacaoPattern from "@/assets/cacao-pattern.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

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
    if (tab === "perfil") navigate("/perfil");
    if (tab === "mas") setMoreOpen(true);
  };

  return (
    <div className="min-h-screen max-w-[390px] mx-auto pb-[100px] overflow-x-hidden relative"
      style={{ backgroundColor: "#102132", backgroundImage: `url(${cacaoPattern})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-chokao-primary/70 pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 flex items-center h-[64px] px-5" style={{ backgroundColor: "#102132" }}>
          <ChokaoIcon size={28} />
          <span className="ml-2 font-display font-bold text-[18px] text-white tracking-tight">CHOKAO</span>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative" style={{ color: "rgba(240,236,217,0.7)" }}>
              <Bell size={24} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ backgroundColor: "#e73e40" }}>3</span>
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold"
              style={{ border: "2px solid #fbba30", backgroundColor: "#1a2f42", color: "#f0ecd9" }}>
              MR
            </div>
          </div>
        </header>

        {/* Greeting */}
        <div className="px-5 pt-3 pb-0 flex items-baseline gap-1.5">
          <h1 className="font-display font-bold text-[16px] text-white">Hola, María 👋</h1>
          <span className="text-[12px]" style={{ color: "rgba(240,236,217,0.55)" }}>· listos para CHOKAO</span>
        </div>

        {/* Event Banner Carousel */}
        <EventBanner />

        {/* Countdown Banner */}
        <div className="mx-5 mt-3 rounded-full overflow-hidden relative border border-chokao-border/30"
          style={{ background: "linear-gradient(145deg, #1e3a52 0%, #1a2f42 50%, #162a3c 100%)", boxShadow: "0 2px 12px rgba(0,0,0,0.35), 0 1px 0 rgba(251,186,48,0.05) inset" }}>
          <div className="flex items-center justify-between px-4 py-2">
            <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "rgba(240,236,217,0.55)" }}>
              Comienza en
            </p>
            <div className="flex items-center gap-1.5">
              {[
                { val: countdown.days, label: "d" },
                { val: countdown.hours, label: "h" },
                { val: countdown.mins, label: "m" },
                { val: countdown.secs, label: "s" },
              ].map((b, i) => (
                <div key={b.label} className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-[14px] tabular-nums" style={{ color: "#fbba30" }}>
                    {pad(b.val)}
                    <span className="text-[10px] font-medium ml-0.5" style={{ color: "rgba(240,236,217,0.6)" }}>{b.label}</span>
                  </span>
                  {i < 3 && <span className="text-[10px]" style={{ color: "rgba(251,186,48,0.4)" }}>·</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="px-5 mt-6">
          <h2 className="font-semibold text-[18px] text-white mb-3">Explorar</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {quickAccess.map((item) => (
              <button key={item.label}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 px-2 transition-all active:scale-[0.97] border border-chokao-border/30 hover:border-chokao-yellow/30"
                style={{ background: "linear-gradient(145deg, #1e3a52 0%, #1a2f42 50%, #162a3c 100%)", boxShadow: "0 2px 12px rgba(0,0,0,0.3), 0 1px 0 rgba(251,186,48,0.05) inset" }}>
                <item.icon size={24} strokeWidth={1.5} style={{ color: item.color }} />
                <span className="text-white font-medium text-[11px] leading-tight text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* News Feed */}
        <NewsFeed />
      </div>

      <BottomNav activeTab="home" onTabChange={handleTab} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Dashboard;
