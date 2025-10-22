"use client";

interface ContentWidthControlProps {
  width: number;
  setWidth: (v: number) => void;
  theme?: string;
}

export default function ContentWidthControl({ width, setWidth, theme }: ContentWidthControlProps) {
  const primaryColor = theme === "dark" ? "#818cf8" : theme === "forest" ? "#22c55e" : "#3b82f6";
  const borderColor = theme === "dark" ? "#374151" : theme === "forest" ? "#064e3b" : "#d1d5db";
  const percent = ((width - 60) / 40) * 100;

  return (
    <div className="mb-3 w-48 relative">
      <h3 className="text-lg font-bold mb-3">Chiều ngang</h3>
      <div className="relative">
        <span className="absolute -top-3 font-bold text-sm px-1 bg-[rgba(var(--color-primary),0.8)] rounded text-white select-none" style={{ left: `0px` }}>{width}%</span>
        <input
          id="width-range"
          type="range"
          min={60}
          max={100}
          step={1}
          value={width || 90}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{ background: `linear-gradient(to right, ${primaryColor} ${percent}%, ${borderColor} ${percent}%)` }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: rgb(var(--color-primary)); border: 2px solid white; box-shadow: 0 0 2px rgba(0,0,0,0.2); transition: background-color 0.2s ease; }
          input[type="range"]::-webkit-slider-thumb:hover { background: rgb(var(--color-accent)); }
          input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: rgb(var(--color-primary)); border: 2px solid white; transition: background-color 0.2s ease; }
          input[type="range"]::-moz-range-thumb:hover { background: rgb(var(--color-accent)); }
        `}</style>
      </div>
    </div>
  );
}
