/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ThemedIcon from "@/components/ThemeIcon";
import { SettingsProps } from "./types";

interface FloatingToolbarProps extends SettingsProps {
  show: boolean;
  setShow: (v: boolean) => void;
  router: any;
  openSettings: () => void;
}

const iconSize = 25;

export default function FloatingToolbar({ show, setShow, nextLink, prevLink, setIsOpenListOfChapter, router, openSettings }: FloatingToolbarProps) {
  return (
    <div
      onClick={() => setShow(true)}
      className={`settings rounded-r-2xl gap-6 items-center justify-center px-3 py-4 shadow flex flex-col lg:w-auto cursor-pointer fixed z-20 left-0 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ${show ? "translate-x-0" : "-translate-x-10"}`}
      style={{ backgroundColor: "rgb(var(--color-primary))", color: "rgb(var(--color-text))" }}
    >
      <div onClick={(e) => { e.stopPropagation(); setShow(false); }}>
        <ThemedIcon name="CloseSquare" color="text" size={iconSize} />
      </div>
      <div onClick={openSettings}><ThemedIcon name="Setting2" color="text" size={iconSize} /></div>
      <div onClick={() => router.push("/")}><ThemedIcon name="Home3" color="text" size={iconSize} /></div>
      <div onClick={() => setIsOpenListOfChapter?.(true)}><ThemedIcon name="Book" color="text" size={iconSize} /></div>
      {nextLink && <div onClick={() => router.push(nextLink)}><ThemedIcon name="ArrowRight" color="text" size={iconSize} /></div>}
      {prevLink && <div onClick={() => router.push(prevLink)}><ThemedIcon name="ArrowLeft" color="text" size={iconSize} /></div>}
    </div>
  );
}
