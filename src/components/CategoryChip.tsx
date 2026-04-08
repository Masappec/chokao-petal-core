type ChipColor = "green" | "yellow" | "red" | "cream";

interface CategoryChipProps {
  label: string;
  color?: ChipColor;
  active?: boolean;
  onClick?: () => void;
}

const colorMap: Record<ChipColor, { bg: string; text: string; border: string }> = {
  green: { bg: "bg-chokao-green/15", text: "text-chokao-green", border: "border-chokao-green/40" },
  yellow: { bg: "bg-chokao-yellow/15", text: "text-chokao-yellow", border: "border-chokao-yellow/40" },
  red: { bg: "bg-chokao-red/15", text: "text-chokao-red", border: "border-chokao-red/40" },
  cream: { bg: "bg-chokao-cream/15", text: "text-chokao-cream", border: "border-chokao-cream/40" },
};

const CategoryChip = ({ label, color = "green", active = true, onClick }: CategoryChipProps) => {
  const c = colorMap[color];
  return (
    <button
      onClick={onClick}
      className={`
        rounded-full px-[14px] py-[6px] text-[12px] uppercase tracking-[0.5px] font-medium
        border transition-all whitespace-nowrap
        ${active ? `${c.bg} ${c.text} ${c.border}` : "bg-transparent text-chokao-cream/45 border-chokao-border"}
      `}
    >
      {label}
    </button>
  );
};

export default CategoryChip;
