interface QrPlaceholderProps {
  size?: number;
}

// Decorative QR-style pattern (not a real scannable QR)
const QrPlaceholder = ({ size = 176 }: QrPlaceholderProps) => {
  // 21x21 grid pseudo-random pattern (deterministic)
  const N = 21;
  const cells: boolean[][] = Array.from({ length: N }, (_, y) =>
    Array.from({ length: N }, (_, x) => {
      // pseudo-random but stable
      return ((x * 31 + y * 17 + x * y) % 7) < 3;
    })
  );

  // Clear finder pattern areas (top-left, top-right, bottom-left)
  const clearFinder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) cells[oy + y][ox + x] = false;
  };
  clearFinder(0, 0);
  clearFinder(N - 7, 0);
  clearFinder(0, N - 7);

  const cell = size / N;

  const Finder = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect x={x} y={y} width={cell * 7} height={cell * 7} fill="#102132" />
      <rect x={x + cell} y={y + cell} width={cell * 5} height={cell * 5} fill="#ffffff" />
      <rect x={x + cell * 2} y={y + cell * 2} width={cell * 3} height={cell * 3} fill="#102132" />
    </>
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="#ffffff" />
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} fill="#102132" /> : null
        )
      )}
      <Finder x={0} y={0} />
      <Finder x={size - cell * 7} y={0} />
      <Finder x={0} y={size - cell * 7} />
    </svg>
  );
};

export default QrPlaceholder;
