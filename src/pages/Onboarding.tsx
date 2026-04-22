import { useEffect, useRef, useState, TouchEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  X,
  MapPin,
  Calendar,
  Plane,
  Building2,
  GraduationCap,
  Ticket,
  QrCode,
  Users,
  Store,
  Bell,
} from "lucide-react";
import ChokaoIcon from "@/components/ChokaoIcon";
import ChokaoButton from "@/components/ChokaoButton";
import mascot from "@/assets/chokao-mascot-explorer.png";

const TOTAL = 4;

const completeOnboarding = () => {
  try {
    localStorage.setItem("chokao_onboarding_completed", "true");
  } catch {
    /* ignore */
  }
};

const Dots = ({ active }: { active: number }) => (
  <div className="flex items-center justify-center gap-2">
    {Array.from({ length: TOTAL }).map((_, i) => (
      <span
        key={i}
        className={`transition-all duration-300 rounded-full ${
          i === active
            ? "w-7 h-2 bg-chokao-yellow"
            : "w-2 h-2 bg-chokao-border"
        }`}
      />
    ))}
  </div>
);

const CacaoBackdrop = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { top: "-40px", left: "-30px", size: 180, rot: 20 },
      { top: "20%", right: "-50px", size: 140, rot: -15 },
      { bottom: "10%", left: "-40px", size: 160, rot: 35 },
      { bottom: "-30px", right: "-20px", size: 200, rot: -25 },
      { top: "45%", left: "10%", size: 90, rot: 10 },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          ...p,
          width: p.size,
          height: p.size,
          opacity: 0.06,
          transform: `rotate(${p.rot}deg)`,
        }}
      >
        <ChokaoIcon size={p.size} opacity={1} />
      </div>
    ))}
  </div>
);

const Mascot = ({
  transform,
  height = 240,
}: {
  transform: string;
  height?: number;
}) => (
  <img
    src={mascot}
    alt="Mascota CHOKAO"
    style={{ height, transform, transition: "transform 400ms ease-out" }}
    className="drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] select-none"
    draggable={false}
  />
);

const Slide1 = () => (
  <div className="h-full w-full flex flex-col">
    {/* Top 58% */}
    <div className="relative" style={{ height: "58%" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full bg-chokao-surface"
          style={{ width: 300, height: 300, opacity: 0.5 }}
        />
      </div>
      {/* Badge */}
      <div className="absolute top-12 right-10 z-10 animate-fade-in">
        <div
          className="rounded-full px-3 py-1 border text-[12px] font-bold"
          style={{
            backgroundColor: "hsl(var(--chokao-yellow) / 0.15)",
            borderColor: "hsl(var(--chokao-yellow))",
            color: "hsl(var(--chokao-yellow))",
          }}
        >
          5ta Edición 🎉
        </div>
      </div>
      <div className="relative h-full flex items-end justify-center pb-2">
        <div className="flex flex-col items-center">
          <Mascot transform="none" height={260} />
          <div
            className="rounded-[50%]"
            style={{
              width: 120,
              height: 20,
              background: "rgba(0,0,0,0.3)",
              filter: "blur(6px)",
              marginTop: -8,
            }}
          />
        </div>
      </div>
    </div>

    {/* Bottom 42% */}
    <div className="flex-1 px-7 flex flex-col items-center text-center">
      <ChokaoIcon size={24} className="mb-2.5" />
      <h1 className="font-display font-bold text-[28px] text-chokao-cream leading-tight">
        Bienvenido a <span className="text-chokao-yellow">CHOKAO</span>
      </h1>
      <p
        className="font-body text-[15px] mt-3 leading-relaxed"
        style={{ color: "hsl(var(--chokao-cream) / 0.6)", maxWidth: 280 }}
      >
        La feria internacional del cacao y chocolate más importante del Ecuador
      </p>
      <div className="flex items-center justify-center gap-4 mt-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} style={{ color: "hsl(var(--chokao-cream) / 0.4)" }} />
          <span
            className="text-[13px]"
            style={{ color: "hsl(var(--chokao-cream) / 0.6)" }}
          >
            Guayaquil, Ecuador
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} style={{ color: "hsl(var(--chokao-cream) / 0.4)" }} />
          <span
            className="text-[13px]"
            style={{ color: "hsl(var(--chokao-cream) / 0.6)" }}
          >
            14 · 15 · 16 Jun 2025
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Slide2 = () => {
  const chips = [
    { icon: "🌿", label: "Productores" },
    { icon: "✈️", label: "Exportadores" },
    { icon: "🍫", label: "Chocolateros" },
    { icon: "👨‍🍳", label: "Chefs" },
    { icon: "🔬", label: "Científicos" },
    { icon: "💼", label: "Compradores" },
  ];
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top 45% */}
      <div className="relative" style={{ height: "45%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-[50%] bg-chokao-surface"
            style={{ width: 320, height: 200, opacity: 0.45 }}
          />
        </div>
        {/* Floating chips */}
        <div
          className="absolute top-10 left-6 z-10 animate-fade-in"
          style={{ animationDelay: "100ms", animationFillMode: "both" }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] bg-chokao-surface"
            style={{
              borderColor: "hsl(var(--chokao-yellow))",
              color: "hsl(var(--chokao-yellow))",
            }}
          >
            <Plane size={12} /> Internacional
          </div>
        </div>
        <div
          className="absolute top-8 right-5 z-10 animate-fade-in"
          style={{ animationDelay: "250ms", animationFillMode: "both" }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] bg-chokao-surface"
            style={{
              borderColor: "hsl(var(--chokao-cream))",
              color: "hsl(var(--chokao-cream))",
            }}
          >
            <GraduationCap size={12} /> Académico
          </div>
        </div>
        <div
          className="absolute bottom-6 right-8 z-10 animate-fade-in"
          style={{ animationDelay: "400ms", animationFillMode: "both" }}
        >
          <div
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] bg-chokao-surface"
            style={{
              borderColor: "hsl(var(--chokao-green))",
              color: "hsl(var(--chokao-green))",
            }}
          >
            <Building2 size={12} /> Empresarial
          </div>
        </div>
        <div className="relative h-full flex items-end justify-center pl-8 pb-1">
          <Mascot transform="rotate(-8deg)" height={210} />
        </div>
      </div>

      {/* Bottom 55% */}
      <div className="flex-1 px-6 flex flex-col items-center text-center">
        <h1 className="font-display font-bold text-[24px] text-chokao-cream leading-tight">
          Un punto de encuentro <span className="text-chokao-yellow">único</span>
        </h1>
        <p
          className="font-body text-[14px] mt-3 leading-relaxed"
          style={{ color: "hsl(var(--chokao-cream) / 0.6)", maxWidth: 300 }}
        >
          Exportadores, productores, chocolateros, chefs, científicos y
          compradores internacionales, todos en un mismo lugar.
        </p>
        <div className="w-full mt-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-2 pb-2 w-max">
            {chips.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] bg-chokao-surface whitespace-nowrap"
                style={{
                  borderColor: "hsl(var(--chokao-border))",
                  color: "hsl(var(--chokao-cream) / 0.7)",
                }}
              >
                <span>{c.icon}</span>
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Slide3 = () => {
  const features = [
    { Icon: Calendar, color: "hsl(var(--chokao-yellow))", title: "Agenda completa", desc: "Programa de los 3 días" },
    { Icon: Ticket, color: "hsl(var(--chokao-yellow))", title: "Compra entradas", desc: "Talleres y masterclass" },
    { Icon: QrCode, color: "hsl(var(--chokao-green))", title: "Acceso digital", desc: "Tu QR siempre listo" },
    { Icon: Users, color: "hsl(var(--chokao-green))", title: "Networking", desc: "Conecta con asistentes" },
    { Icon: Store, color: "hsl(var(--chokao-cream))", title: "Expositores", desc: "Descubre las marcas" },
    { Icon: Bell, color: "hsl(var(--chokao-cream))", title: "Notificaciones", desc: "Sin perderte nada" },
  ];
  return (
    <div className="h-full w-full flex flex-col">
      {/* Top 32% */}
      <div className="relative" style={{ height: "32%" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Mascot transform="rotate(5deg) scaleX(-1)" height={180} />
            {/* Phone */}
            <div
              className="absolute"
              style={{
                width: 50,
                height: 90,
                bottom: 30,
                right: -10,
                borderRadius: 10,
                backgroundColor: "hsl(var(--chokao-surface))",
                border: "2px solid hsl(var(--chokao-yellow))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(-12deg)",
              }}
            >
              <ChokaoIcon size={26} />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 text-center">
        <h1 className="font-display font-bold text-[22px] text-chokao-cream leading-tight">
          Todo el evento en{" "}
          <span className="text-chokao-yellow">tu bolsillo</span>
        </h1>
      </div>

      {/* Bottom */}
      <div className="flex-1 px-5 mt-3 flex flex-col">
        <p
          className="text-center text-[13px] mb-4"
          style={{ color: "hsl(var(--chokao-cream) / 0.5)" }}
        >
          Tu app oficial para vivir CHOKAO al máximo
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-[14px] bg-chokao-surface p-3.5 flex items-start gap-2.5"
            >
              <f.Icon size={26} style={{ color: f.color, flexShrink: 0 }} />
              <div className="flex flex-col min-w-0">
                <span className="text-chokao-cream font-semibold text-[13px] leading-tight">
                  {f.title}
                </span>
                <span
                  className="text-[11px] leading-snug mt-0.5"
                  style={{ color: "hsl(var(--chokao-cream) / 0.55)" }}
                >
                  {f.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Petal = ({ color }: { color: string }) => (
  <span
    style={{
      display: "inline-block",
      width: 10,
      height: 10,
      borderRadius: "60% 40% 60% 40%",
      backgroundColor: color,
      flexShrink: 0,
    }}
  />
);

const Slide4 = ({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) => {
  const benefits = [
    { color: "hsl(var(--chokao-yellow))", text: "Visibilidad y posicionamiento de marca" },
    { color: "hsl(var(--chokao-green))", text: "Acceso a medios y difusión digital (Free press)" },
    { color: "hsl(var(--chokao-red))", text: "Generación de oportunidades comerciales" },
    { color: "hsl(var(--chokao-cream))", text: "Promoción gastronómica y cultural" },
    { color: "hsl(var(--chokao-yellow))", text: "Networking estratégico con líderes del sector" },
    { color: "hsl(var(--chokao-green))", text: "Fortalecimiento de la cadena de valor del cacao" },
  ];
  const confetti = Array.from({ length: 14 }).map((_, i) => {
    const colors = [
      "hsl(var(--chokao-yellow))",
      "hsl(var(--chokao-green))",
      "hsl(var(--chokao-red))",
      "hsl(var(--chokao-cream))",
    ];
    return {
      left: `${(i * 7 + 5) % 95}%`,
      top: `${(i * 13) % 35}%`,
      size: 6 + (i % 3) * 2,
      color: colors[i % 4],
      delay: `${(i % 6) * 0.3}s`,
      shape: i % 3 === 0 ? "diamond" : "circle",
    };
  });

  return (
    <div className="h-full w-full flex flex-col">
      {/* Top 40% */}
      <div className="relative overflow-hidden" style={{ height: "40%" }}>
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute animate-fade-in"
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === "circle" ? "50%" : "2px",
              transform: c.shape === "diamond" ? "rotate(45deg)" : "none",
              animation: `confetti-fall 4s ease-in ${c.delay} infinite`,
              opacity: 0.9,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            style={{
              width: 200,
              height: 200,
              background:
                "radial-gradient(circle, hsl(var(--chokao-yellow) / 0.15), transparent 70%)",
            }}
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <Mascot transform="scale(1.1) translateY(-8px)" height={230} />
        </div>
      </div>

      {/* Bottom 60% */}
      <div className="flex-1 px-6 flex flex-col">
        <h1 className="font-display font-bold text-[22px] text-chokao-cream leading-tight text-center">
          Potencia tu experiencia en{" "}
          <span className="text-chokao-yellow">CHOKAO</span>
        </h1>
        <p
          className="text-[13px] text-center mt-2 mb-4 mx-auto leading-relaxed"
          style={{ color: "hsl(var(--chokao-cream) / 0.6)", maxWidth: 290 }}
        >
          Únete a la comunidad más importante del cacao y chocolate de América
          Latina
        </p>

        <div className="flex flex-col gap-2.5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5"
              style={{
                backgroundColor: "hsl(var(--chokao-surface) / 0.6)",
                animation: `slide-up 400ms ease-out ${i * 80}ms both`,
              }}
            >
              <Petal color={b.color} />
              <span
                className="text-[13px] leading-snug"
                style={{ color: "hsl(var(--chokao-cream) / 0.8)" }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          <ChokaoButton fullWidth onClick={onStart}>
            <ChokaoIcon size={18} />
            ¡Comenzar ahora!
          </ChokaoButton>
          <ChokaoButton variant="ghost" fullWidth onClick={onLogin}>
            Ya tengo cuenta · Iniciar sesión
          </ChokaoButton>
        </div>
      </div>
    </div>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("chokao_onboarding_completed") === "true") {
        navigate("/", { replace: true });
      }
    } catch {
      /* ignore */
    }
  }, [navigate]);

  const goNext = () => setIndex((i) => Math.min(TOTAL - 1, i + 1));
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));

  const finish = (target: string) => {
    completeOnboarding();
    navigate(target);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goNext();
    if (dx > 40) goPrev();
    touchStartX.current = null;
  };

  return (
    <div className="relative min-h-screen bg-chokao-primary max-w-[390px] mx-auto overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(180px) rotate(360deg); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <CacaoBackdrop />

      {/* Skip button */}
      {index < TOTAL - 1 && (
        <button
          onClick={() => finish("/")}
          className="absolute top-4 right-5 z-30 text-[13px]"
          style={{ color: "hsl(var(--chokao-cream) / 0.5)" }}
        >
          Omitir
        </button>
      )}

      {/* Slides container */}
      <div
        className="relative z-10 h-screen"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{
            width: `${TOTAL * 100}%`,
            transform: `translateX(-${index * (100 / TOTAL)}%)`,
          }}
        >
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-12 pb-32">
            <Slide1 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-12 pb-32">
            <Slide2 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-12 pb-32">
            <Slide3 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-12 pb-4">
            <Slide4
              onStart={() => finish("/register")}
              onLogin={() => finish("/login")}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls (slides 1-3) */}
      {index < TOTAL - 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-6 pt-3 bg-gradient-to-t from-chokao-primary via-chokao-primary to-transparent">
          <div className="flex items-center justify-between">
            <Dots active={index} />
            <ChokaoButton onClick={goNext} className="!h-[48px] !px-6">
              Siguiente <ArrowRight size={18} />
            </ChokaoButton>
          </div>
        </div>
      )}
      {index === TOTAL - 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-30 flex justify-center">
          <Dots active={index} />
        </div>
      )}
    </div>
  );
};

export default Onboarding;
