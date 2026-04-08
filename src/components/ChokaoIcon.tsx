interface ChokaoIconProps {
  size?: number;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

const ChokaoIcon = ({ size = 48, opacity = 1, className = "", animated = false }: ChokaoIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "animate-chokao-pulse" : ""} ${className}`}
      style={{ opacity }}
    >
      {/* Top-left petal - Yellow */}
      <path
        d="M48 48C48 48 48 8 24 2C0 -4 -4 20 2 36C8 48 48 48 48 48Z"
        fill="#fbba30"
        transform="translate(2, 2)"
      />
      {/* Top-right petal - Green */}
      <path
        d="M52 48C52 48 52 8 76 2C100 -4 104 20 98 36C92 48 52 48 52 48Z"
        fill="#aab93e"
        transform="translate(-2, 2)"
      />
      {/* Bottom-left petal - Cream */}
      <path
        d="M48 52C48 52 48 92 24 98C0 104 -4 80 2 64C8 52 48 52 48 52Z"
        fill="#f0ecd9"
        transform="translate(2, -2)"
      />
      {/* Bottom-right petal - Red */}
      <path
        d="M52 52C52 52 52 92 76 98C100 104 104 80 98 64C92 52 52 52 52 52Z"
        fill="#e73e40"
        transform="translate(-2, -2)"
      />
    </svg>
  );
};

export default ChokaoIcon;
