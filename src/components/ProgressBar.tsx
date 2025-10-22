interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  // === Trả màu theo progress, dùng CSS variables theme-aware
  const getColor = (progress: number) => {
    if (progress < 20) return "rgb(var(--color-secondary))"; // warning
    if (progress < 50) return "rgb(var(--color-primary))"; // mid
    return "rgb(var(--color-accent))"; // done
  };

  return (
    <div
      className="w-full h-2 rounded-full bg-[rgb(var(--color-border))] dark:bg-[rgb(var(--color-border))]/40"
    >
      <div
        className="h-2 rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          backgroundColor: getColor(progress),
        }}
      />
    </div>
  );
};
