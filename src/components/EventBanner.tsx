import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import bannerEvent from "@/assets/banner-event.jpg";
import bannerWorkshops from "@/assets/banner-workshops.jpg";
import bannerNetworking from "@/assets/banner-networking.jpg";

const slides = [
  {
    image: bannerEvent,
    eyebrow: "14–16 Junio · Guayaquil",
    title: "CHOKAO 2026",
    subtitle: "La feria del cacao y chocolate del Ecuador",
  },
  {
    image: bannerWorkshops,
    eyebrow: "Talleres especializados",
    title: "Aprende del maestro",
    subtitle: "Masterclasses con chocolatiers internacionales",
  },
  {
    image: bannerNetworking,
    eyebrow: "Networking",
    title: "Conecta con la industria",
    subtitle: "+500 productores, marcas y compradores",
  },
];

const EventBanner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false }),
  ]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="px-5 pt-5">
      <div
        className="relative rounded-2xl overflow-hidden border border-chokao-border/30"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((s, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 relative h-[180px]">
                <img
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  width={1280}
                  height={640}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(16,33,50,0.92) 0%, rgba(16,33,50,0.7) 50%, rgba(16,33,50,0.35) 100%)",
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-center p-5 max-w-[78%]">
                  <p
                    className="text-[10px] uppercase tracking-wider font-semibold mb-1"
                    style={{ color: "#fbba30" }}
                  >
                    {s.eyebrow}
                  </p>
                  <h3 className="font-display font-bold text-[20px] text-white leading-tight">
                    {s.title}
                  </h3>
                  <p
                    className="text-[12px] mt-1 leading-snug"
                    style={{ color: "rgba(240,236,217,0.8)" }}
                  >
                    {s.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-2.5 right-3 flex gap-1.5 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: selected === i ? 18 : 6,
                backgroundColor: selected === i ? "#fbba30" : "rgba(240,236,217,0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
