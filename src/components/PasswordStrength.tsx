interface PasswordStrengthProps {
  password: string;
}

const getStrength = (password: string): number => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const labels = ["Débil", "Regular", "Fuerte", "Muy fuerte"];
const colors = ["#e73e40", "#fbba30", "#aab93e", "#aab93e"];

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= strength ? colors[strength - 1] : "#2a4a62",
            }}
          />
        ))}
      </div>
      <p
        className="text-[12px] mt-1 font-body transition-colors"
        style={{ color: colors[strength - 1] || "#2a4a62" }}
      >
        {strength > 0 ? labels[strength - 1] : ""}
      </p>
    </div>
  );
};

export default PasswordStrength;
