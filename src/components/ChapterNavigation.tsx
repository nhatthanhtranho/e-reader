"use client";

import { useRouter } from "next/navigation";



interface ChapterNavigationProps {
  prevPath?: string | null
  nextPath?:string | null
  buttonClass?: string;
}

export default function ChapterNavigation({
  prevPath,
  nextPath,
  buttonClass = "px-4 py-2 bg-primary text-white rounded-lg hover:opacity-80 transition",
}: ChapterNavigationProps) {
  const router = useRouter();

  const buttons = [
    { label: "Trang chủ", path: "/" },
    prevPath && { label: "Chương Trước", path: prevPath },
    nextPath && { label: "Chương Sau", path: nextPath },
  ].filter(Boolean) as { label: string; path: string }[];

  return (
    <div className="mx-auto flex gap-4 items-center justify-center py-12 flex-wrap">
      {buttons.map(({ label, path }) => (
        <button key={label} className={buttonClass} onClick={() => router.push(path)}>
          {label}
        </button>
      ))}
    </div>
  );
}
