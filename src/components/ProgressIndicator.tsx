interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressIndicator = ({ currentStep, totalSteps = 4 }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 px-5 py-4">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div
            key={step}
            className="flex-1 h-[4px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: isActive
                ? "#fbba30"
                : isCompleted
                ? "#aab93e"
                : "#2a4a62",
            }}
          />
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
