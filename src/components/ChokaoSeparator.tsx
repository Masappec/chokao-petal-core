import ChokaoIcon from "./ChokaoIcon";

interface ChokaoSeparatorProps {
  size?: number;
}

const ChokaoSeparator = ({ size = 14 }: ChokaoSeparatorProps) => {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 h-px bg-chokao-border/30" />
      <ChokaoIcon size={size} opacity={0.3} />
      <div className="flex-1 h-px bg-chokao-border/30" />
    </div>
  );
};

export default ChokaoSeparator;
