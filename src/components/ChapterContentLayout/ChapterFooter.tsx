"use client";
import ChapterNavigation from "../ChapterNavigation";
import { ProgressBar } from "@/components/ProgressBar";

interface Props {
  nextPath?: string | null;
  prevPath?: string | null;
  progress: number;
}

export default function ChapterFooter({ nextPath, prevPath, progress }: Props) {
  const buttonClass =
    "w-48 py-2 rounded shadow border border-[rgb(var(--color-border))] cursor-pointer transition-colors duration-200 bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-accent))]";

  return (
    <>
      <ChapterNavigation
        nextPath={nextPath}
        prevPath={prevPath}
        buttonClass={buttonClass}
      />
      <div className="w-36 fixed top-3 right-3">
        <ProgressBar progress={progress} />
      </div>
    </>
  );
}
