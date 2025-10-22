"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FloatingToolbar from "./FloatingToolBar";
import SettingsPanel from "./SettingPanel";
import { SettingsProps } from "./types";

export default function Settings(props: SettingsProps) {
  const [isOpenMainSettings, setIsOpenMainSettings] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close panel when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpenMainSettings(false);
        props.setIsOpenListOfChapter?.(false);
      }
    };
    if (isOpenMainSettings) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenMainSettings, props, props.setIsOpenListOfChapter]);

  return (
    <>
      <FloatingToolbar
        show={showToolbar}
        setShow={setShowToolbar}
        {...props}
        router={router}
        openSettings={() => setIsOpenMainSettings(true)}
      />

      <SettingsPanel
        ref={panelRef}
        isOpen={isOpenMainSettings}
        closePanel={() => setIsOpenMainSettings(false)}
        {...props}
      />
    </>
  );
}
