import { useEffect, useRef, useState, TouchEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
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
  Leaf,
  Briefcase,
  ChefHat,
  FlaskConical,
  Sparkles,
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
            ? "w-6 h-2 bg-chokao-yellow"
            : "w-2 h-2 bg-chokao-border"
        }`}
      />
    ))}
  </div>
);

const CacaoBackdrop = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { top: "8%", left: "-40px", size: 160, rot: 25 },
      { top: "30%", right: "-50px", size: 180, rot: -20 },
      { bottom: "20%", left: "-30px", size: 140, rot: 40 },
      { bottom: "-20px", right: "-30px", size: 170, rot: -30 },
      { top: "55%", left: "12%", size: 80, rot: 15 },
      { top: "18%", right: "20%", size: 70, rot: -10 },
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

const BrandHeader = () => (
  <div className="flex items-center justify-center gap-2 pt-2 pb-1">
    <ChokaoIcon size={28} />
    <span className="font-display font-bold text-chokao-cream text-[20px] tracking-wide">
      CHOKAO
    </span>
  </div>
);

const Mascot = ({
  transform,
  height = 220,
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

/* ---------------- SLIDE 1 ---------------- */
const Slide1 = () => (
  <div className="h-full w-full flex flex-col">
    <BrandHeader />

    {/* Mascot stage */}
    <div className="relative flex-1 flex items-center justify-center px-6">
      {/* Cacao beans cluster left */}
      <div className="absolute left-4 top-6 flex flex-col gap-1.5 opacity-90">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 22,
              height: 28,
              borderRadius: "60% 60% 50% 50% / 70% 70% 40% 40%",
              background:
                "linear-gradient(135deg, #6b3a1a 0%, #4a2410 100%)",
              transform: `rotate(${-15 + i * 8}deg) translateX(${i * 6}px)`,
              boxShadow: "inset -2px -3px 4px rgba(0,0,0,0.4)",
            }}
          />
        ))}
      </div>

      {/* Confetti / party cluster right */}
      <div className="absolute right-4 top-8 flex items-start gap-1">
        <span style={{ fontSize: 28 }}>🎉</span>
        <div className="flex flex-col gap-1 mt-1">
          {[
            "hsl(var(--chokao-yellow))",
            "hsl(var(--chokao-red))",
            "hsl(var(--chokao-green))",
            "hsl(var(--chokao-cream))",
          ].map((c, i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                background: c,
                borderRadius: i % 2 === 0 ? "50%" : "2px",
                transform: i % 2 === 0 ? "none" : "rotate(45deg)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Mascot transform="none" height={230} />
        <div
          className="rounded-[50%]"
          style={{
            width: 110,
            height: 18,
            background: "rgba(0,0,0,0.3)",
            filter: "blur(6px)",
            marginTop: -6,
          }}
        />
      </div>
    </div>

    {/* Copy */}
    <div className="px-7 text-center pb-2">
      <h1 className="font-display font-bold text-[26px] text-chokao-cream leading-tight">
        Bienvenido a<br />
        <span className="text-chokao-yellow">CHOKAO</span>
      </h1>
      <p
        className="font-body text-[14px] mt-3 leading-relaxed mx-auto"
        style={{ color: "hsl(var(--chokao-cream) / 0.65)", maxWidth: 290 }}
      >
        La feria internacional del cacao y chocolate más importante del Ecuador
      </p>
      <div className="flex flex-col items-center gap-1.5 mt-4">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} style={{ color: "hsl(var(--chokao-yellow))" }} />
          <span
            className="text-[13px]"
            style={{ color: "hsl(var(--chokao-cream) / 0.75)" }}
          >
            Guayaquil, Ecuador
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={14} style={{ color: "hsl(var(--chokao-yellow))" }} />
          <span
            className="text-[13px]"
            style={{ color: "hsl(var(--chokao-cream) / 0.75)" }}
          >
            14 · 15 · 16 Jun 2025
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------- SLIDE 2 ---------------- */
const Slide2 = () => {
  const participants = [
    { Icon: Leaf, label: "Productores" },
    { Icon: Plane, label: "Exportadores" },
    { Icon: Sparkles, label: "Chocolateros" },
    { Icon: ChefHat, label: "Chefs" },
    { Icon: FlaskConical, label: "Científicos" },
    { Icon: Briefcase, label: "Compradores" },
  ];
  const tags = [
    { Icon: Plane, label: "Internacional", color: "hsl(var(--chokao-yellow))" },
    { Icon: Building2, label: "Empresarial", color: "hsl(var(--chokao-green))" },
    { Icon: GraduationCap, label: "Académico", color: "hsl(var(--chokao-cream))" },
  ];
  return (
    <div className="h-full w-full flex flex-col">
      <BrandHeader />

      {/* Mascot + side tags */}
      <div className="relative flex-1 flex items-center justify-center px-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
          {tags.map((t, i) => (
            <div
              key={t.label}
              className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] bg-chokao-surface animate-fade-in"
              style={{
                borderColor: t.color,
                color: t.color,
                animationDelay: `${i * 120}ms`,
                animationFillMode: "both",
              }}
            >
              <t.Icon size={13} />
              {t.label}
            </div>
          ))}
        </div>
        <div className="ml-16">
          <Mascot transform="rotate(-6deg)" height={210} />
        </div>
      </div>

      {/* Copy */}
      <div className="px-6 text-center">
        <h1 className="font-display font-bold text-[24px] text-chokao-cream leading-tight">
          Un punto de<br />
          encuentro <span className="text-chokao-yellow">único</span>
        </h1>
        <p
          className="font-body text-[13px] mt-2.5 leading-relaxed mx-auto"
          style={{ color: "hsl(var(--chokao-cream) / 0.65)", maxWidth: 320 }}
        >
          Exportadores, productores, chocolateros, chefs, científicos y
          compradores internacionales, todos en un mismo lugar
        </p>

        {/* Participant chips grid */}
        <div className="grid grid-cols-3 gap-1.5 mt-4 px-2">
          {participants.map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-center gap-1 rounded-full border px-2 py-1.5 text-[11px] bg-chokao-surface"
              style={{
                borderColor: "hsl(var(--chokao-border))",
                color: "hsl(var(--chokao-cream) / 0.8)",
              }}
            >
              <p.Icon size={11} style={{ color: "hsl(var(--chokao-yellow))" }} />
              <span className="truncate">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- SLIDE 3 ---------------- */
const Slide3 = () => {
  const features = [
    { Icon: Calendar, label: "Calendario" },
    { Icon: Ticket, label: "Ticket" },
    { Icon: QrCode, label: "QR" },
    { Icon: Users, label: "Personas" },
    { Icon: Store, label: "Tienda" },
    { Icon: Bell, label: "Campana" },
  ];
  return (
    <div className="h-full w-full flex flex-col">
      <BrandHeader />

      {/* Mascot with phone */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="relative">
          <Mascot transform="rotate(4deg)" height={200} />
          <div
            className="absolute"
            style={{
              width: 54,
              height: 92,
              bottom: 40,
              right: -14,
              borderRadius: 10,
              backgroundColor: "hsl(var(--chokao-cream))",
              border: "2px solid hsl(var(--chokao-yellow))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-10deg)",
              boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="text-[8px] font-bold mb-0.5"
              style={{ color: "hsl(var(--chokao-primary))" }}
            >
              Ticket!
            </div>
            <ChokaoIcon size={22} />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="px-6 text-center">
        <h1 className="font-display font-bold text-[24px] text-chokao-cream leading-tight">
          Todo el evento<br />
          en <span className="text-chokao-yellow">tu bolsillo</span>
        </h1>
        <p
          className="text-[13px] mt-2"
          style={{ color: "hsl(var(--chokao-cream) / 0.6)" }}
        >
          Tu app oficial para vivir CHOKAO al máximo
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 px-2">
          {features.map((f) => (
            <div
              key={f.label}
              className="rounded-[14px] bg-chokao-surface flex flex-col items-center justify-center gap-1.5 py-3"
            >
              <f.Icon size={26} style={{ color: "hsl(var(--chokao-yellow))" }} />
              <span
                className="text-[11px] font-medium"
                style={{ color: "hsl(var(--chokao-cream) / 0.85)" }}
              >
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- SLIDE 4 ---------------- */
const Slide4 = ({ onStart, onLogin }: { onStart: () => void; onLogin: () => void }) => {
  const benefits = [
    { color: "hsl(var(--chokao-yellow))", label: "Visibilidad" },
    { color: "hsl(var(--chokao-yellow))", label: "Oportunidades" },
    { color: "hsl(var(--chokao-green))", label: "Medios" },
    { color: "hsl(var(--chokao-green))", label: "Gastronomía" },
    { color: "hsl(var(--chokao-red))", label: "Oportunidades" },
    { color: "hsl(var(--chokao-red))", label: "Networking" },
    { color: "hsl(var(--chokao-cream))", label: "Gastronomía" },
    { color: "hsl(var(--chokao-cream))", label: "Cadena de valor" },
  ];
  const confetti = Array.from({ length: 18 }).map((_, i) => {
    const colors = [
      "hsl(var(--chokao-yellow))",
      "hsl(var(--chokao-green))",
      "hsl(var(--chokao-red))",
      "hsl(var(--chokao-cream))",
    ];
    return {
      left: `${(i * 6 + 4) % 95}%`,
      top: `${(i * 11) % 30}%`,
      size: 6 + (i % 3) * 2,
      color: colors[i % 4],
      delay: `${(i % 6) * 0.3}s`,
      shape: i % 3 === 0 ? "diamond" : "circle",
    };
  });

  return (
    <div className="h-full w-full flex flex-col">
      <BrandHeader />

      {/* Mascot celebration */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="absolute"
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
        <div
          className="absolute"
          style={{
            width: 220,
            height: 220,
            background:
              "radial-gradient(circle, hsl(var(--chokao-yellow) / 0.18), transparent 70%)",
          }}
        />
        <Mascot transform="scale(1.05) translateY(-4px)" height={220} />
      </div>

      {/* Copy + benefits */}
      <div className="px-6">
        <h1 className="font-display font-bold text-[22px] text-chokao-cream leading-tight text-center">
          Potencia tu experiencia<br />
          en <span className="text-chokao-yellow">CHOKAO</span>
        </h1>
        <p
          className="text-[13px] text-center mt-2 mb-3 mx-auto leading-relaxed"
          style={{ color: "hsl(var(--chokao-cream) / 0.65)", maxWidth: 300 }}
        >
          Únete a la comunidad más importante del cacao y chocolate de América Latina
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-2">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                animation: `slide-up 400ms ease-out ${i * 70}ms both`,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: b.color,
                  flexShrink: 0,
                }}
              />
              <span
                className="text-[13px]"
                style={{ color: "hsl(var(--chokao-cream) / 0.85)" }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <ChokaoButton fullWidth onClick={onStart}>
            ¡Comenzar ahora!
          </ChokaoButton>
          <button
            onClick={onLogin}
            className="text-center text-[13px] py-2"
            style={{ color: "hsl(var(--chokao-cream) / 0.7)" }}
          >
            Ya tengo cuenta · <span className="text-chokao-yellow">Iniciar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */
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
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <CacaoBackdrop />

      {/* Skip button */}
      {index < TOTAL - 1 && (
        <button
          onClick={() => finish("/")}
          className="absolute top-4 right-5 z-30 text-[13px]"
          style={{ color: "hsl(var(--chokao-cream) / 0.6)" }}
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
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-3 pb-32">
            <Slide1 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-3 pb-32">
            <Slide2 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-3 pb-32">
            <Slide3 />
          </div>
          <div style={{ width: `${100 / TOTAL}%` }} className="h-full pt-3 pb-6">
            <Slide4
              onStart={() => finish("/register")}
              onLogin={() => finish("/login")}
            />
          </div>
        </div>
      </div>

      {/* Bottom controls (slides 1-3) — dots above full-width Siguiente button */}
      {index < TOTAL - 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-6 pt-3 bg-gradient-to-t from-chokao-primary via-chokao-primary to-transparent">
          <div className="flex justify-center mb-3">
            <Dots active={index} />
          </div>
          <ChokaoButton fullWidth onClick={goNext}>
            Siguiente <ArrowRight size={18} />
          </ChokaoButton>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
