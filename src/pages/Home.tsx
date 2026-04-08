import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MapPin, CalendarDays, Calendar, Store, Star, Ticket, Map, MessageCircle } from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import BottomNav from "@/components/BottomNav";
import MoreDrawer from "@/components/MoreDrawer";
import ActivityCard from "@/components/ActivityCard";

const Home = () => {
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const target = new Date("2025-06-14T00:00:00").getTime();
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
    { icon: Calendar, label: "Agenda", sub: "Ver programa", color: "#fbba30" },
    { icon: Store, label: "Expositores", sub: "Feria comercial", color: "#aab93e" },
    { icon: Star, label: "Patrocinadores", sub: "Marcas del evento", color: "#fbba30" },
    { icon: Ticket, label: "Mis Entradas", sub: "Ver mis tickets", color: "#aab93e" },
    { icon: Map, label: "Mapa", sub: "Plano del evento", color: "#f0ecd9" },
    { icon: MessageCircle, label: "Soporte", sub: "Ayuda rápida", color: "#aab93e" },
  ];

  const pad = (n: number) => String(n).padStart(2, "0");

  const handleTab = (tab: string) => {
    if (tab === "agenda") navigate("/agenda");
    if (tab === "mas") setMoreOpen(true);
  };

  return (
    <div className="min-h-screen bg-chokao-primary max-w-[390px] mx-auto pb-[100px]">
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
      <div className="px-5 pt-6 pb-2">
        <p className="text-[13px]" style={{ color: "rgba(240,236,217,0.6)" }}>Bienvenido de vuelta</p>
        <h1 className="font-display font-bold text-[24px] text-white mt-1">Hola, María 👋</h1>
      </div>

      {/* Countdown Banner */}
      <div className="mx-5 mt-4 rounded-[20px] overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a2f42, #102132)" }}>
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-[0.07]">
          <ChokaoIcon size={180} />
        </div>
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

      {/* Today Activities */}
      <div className="mt-7">
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="font-semibold text-[18px] text-white">Hoy en CHOKAO</h2>
          <button className="text-[13px] font-medium" style={{ color: "#fbba30" }}
            onClick={() => navigate("/agenda")}>
            Ver agenda →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pl-5 pr-5">
          <div className="min-w-[280px] flex-shrink-0">
            <ActivityCard
              title="Maridaje de Chocolate y Café de Especialidad"
              time="9:00 AM"
              category="Congreso"
              categoryColor="green"
              speaker="Chef María Andrade"
              spots={{ taken: 45, total: 90 }}
              onClick={() => navigate("/activity")}
            />
          </div>
          <div className="min-w-[280px] flex-shrink-0">
            <ActivityCard
              title="Temperado de Chocolate Artesanal"
              time="11:00 AM"
              category="Taller"
              categoryColor="green"
              speaker="Maestro Carlos Vera"
              price="$25"
              spots={{ taken: 18, total: 20 }}
              urgent
              onClick={() => navigate("/activity")}
            />
          </div>
          <div className="min-w-[280px] flex-shrink-0">
            <ActivityCard
              title="Rueda de Negocios Internacional"
              time="2:00 PM"
              category="Negocios"
              categoryColor="green"
              speaker="ANECACAO"
              spots={{ taken: 30, total: 50 }}
              onClick={() => navigate("/activity")}
            />
          </div>
        </div>
      </div>

      <BottomNav activeTab="home" onTabChange={handleTab} />
      <MoreDrawer open={moreOpen} onClose={() => setMoreOpen(false)} />
    </div>
  );
};

export default Home;
