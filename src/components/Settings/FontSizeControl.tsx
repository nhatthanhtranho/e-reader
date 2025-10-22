"use client";

import ThemedIcon from "@/components/ThemeIcon";

interface FontSizeControlProps {
  fontSize: number;
  increase: () => void;
  decrease: () => void;
}

export default function FontSizeControl({ fontSize, increase, decrease }: FontSizeControlProps) {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-bold mb-3">Cỡ chữ</h3>
      <div className="flex gap-2 items-center">
        <div onClick={decrease}><ThemedIcon name="Minus" color="primary" size={30} /></div>
        <div className="font-bold text-base px-4 py-3 bg-[rgba(var(--color-text),0.05)]">{fontSize}</div>
        <div onClick={increase}><ThemedIcon name="Add" color="primary" size={30} /></div>
      </div>
    </div>
  );
}
