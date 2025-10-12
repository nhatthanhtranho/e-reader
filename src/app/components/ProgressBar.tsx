const getColor = (progress: number) => {
  if (progress < 20) return "bg-yellow-300";
  if (progress < 50) return "bg-yellow-500";
  return "bg-green-500";
};

export const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
    <div
      className={`h-2 bg-blue-600 rounded-full transition-all duration-300 ${getColor(
        progress
      )}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);
