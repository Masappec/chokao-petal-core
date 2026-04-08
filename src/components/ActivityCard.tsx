import CategoryChip from "./CategoryChip";
import ChokaoIcon from "./ChokaoIcon";

type ChipColor = "green" | "yellow" | "red" | "cream";

interface ActivityCardProps {
  title: string;
  time: string;
  category: string;
  categoryColor?: ChipColor;
  speaker?: string;
  speakerAvatar?: string;
  spots?: { taken: number; total: number };
  price?: string;
  urgent?: boolean;
  onClick?: () => void;
}

const ActivityCard = ({
  title,
  time,
  category,
  categoryColor = "green",
  speaker,
  spots,
  price,
  urgent,
  onClick,
}: ActivityCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-chokao-surface rounded-2xl p-4 text-left relative overflow-hidden transition-transform active:scale-[0.98]"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
    >
      {/* Watermark */}
      <div className="absolute bottom-2 right-2">
        <ChokaoIcon size={12} opacity={0.1} />
      </div>

      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <CategoryChip label={category} color={categoryColor} />
        {price && (
          <span className="bg-chokao-yellow text-chokao-primary text-[12px] font-bold px-3 py-1 rounded-full">
            {price}
          </span>
        )}
      </div>

      {/* Time */}
      <p className="text-chokao-cream/60 text-[13px] mb-1">{time}</p>

      {/* Title */}
      <h3 className="font-display font-semibold text-[16px] text-foreground leading-snug mb-3">
        {title}
      </h3>

      {/* Speaker */}
      {speaker && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-chokao-border flex items-center justify-center text-[12px] font-bold text-chokao-cream">
            {speaker.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="text-chokao-cream/80 text-[13px]">{speaker}</span>
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center gap-2">
        {spots && !urgent && (
          <span className="text-chokao-cream/50 text-[12px]">
            {spots.taken}/{spots.total} cupos
          </span>
        )}
        {urgent && (
          <span className="bg-chokao-red/20 text-chokao-red text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-chokao-red/40">
            Últimos cupos
          </span>
        )}
      </div>
    </button>
  );
};

export default ActivityCard;
