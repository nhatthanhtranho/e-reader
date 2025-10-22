"use client";

import { useSettings } from "@/context/SettingContext";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatLink } from "../../utils/formatLink";
import { useTheme } from "next-themes";

const iconSize = 25;

interface SettingsProps {
  nextLink?: string | null;
  prevLink?: string | null;
  setIsOpenListOfChapter?: (open: boolean) => void;
}

export default function Settings({
  nextLink,
  prevLink,
  setIsOpenListOfChapter,
}: SettingsProps) {
  const [isOpenMainSettings, setIsOpenMainSettings] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    fontFamily,
    setFontFamily,
    fontSize,
    increaseFont,
    decreaseFont,
    setWidth,
    width,
  } = useSettings();

  const { theme, setTheme } = useTheme();

  // Đóng khi click ngoài panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpenMainSettings(false);
        setIsOpenListOfChapter?.(false);
      }
    };
    if (isOpenMainSettings)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenMainSettings, setIsOpenListOfChapter]);

  // Cập nhật fill slider
  useEffect(() => {
    const range = document.getElementById("width-range") as HTMLInputElement | null;
    if (range) {
      const percent = ((width - 60) / 40) * 100;
      range.style.setProperty(
        "--fill-percent",
        `${percent}%`
      );
    }
  }, [width]);

  const themes: Array<"light" | "dark" | "forest"> = ["light", "dark", "forest"];

  return (
    <>
      {/* Floating toolbar */}
      <div
        onClick={() => setShowToolbar(true)}
        className={`settings rounded-r-2xl gap-6 items-center justify-center px-3 py-4 shadow flex flex-col lg:w-auto cursor-pointer fixed z-20 left-0 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ${showToolbar ? "translate-x-0" : "-translate-x-10"
          }`}
        style={{
          backgroundColor: "rgb(var(--color-bg))",
          color: "rgb(var(--color-text))",
        }}
      >
        {/* Close */}
        <div
          className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
          onClick={(e) => {
            e.stopPropagation();
            setShowToolbar(false);
          }}
        >
          <Image fill src={formatLink("/icons/close-square.svg")} alt="Close" />
        </div>

        {/* Settings */}
        <div
          className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
          onClick={() => setIsOpenMainSettings(true)}
        >
          <Image fill src={formatLink("/icons/settings.svg")} alt="Cài đặt" />
        </div>

        {/* Home */}
        <div
          className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
          onClick={() => router.push("/")}
        >
          <Image fill src={formatLink("/icons/home.svg")} alt="Trang chủ" />
        </div>

        {/* Episodes */}
        <div
          className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
          onClick={() => setIsOpenListOfChapter?.(true)}
        >
          <Image fill src={formatLink("/icons/episodes.svg")} alt="Episodes" />
        </div>

        {/* Next / Prev */}
        {nextLink && (
          <div
            className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
            onClick={() => router.push(nextLink)}
          >
            <Image fill src={formatLink("/icons/right.svg")} alt="Next" />
          </div>
        )}
        {prevLink && (
          <div
            className="p-2 rounded relative hover:bg-[rgba(var(--color-text),0.1)] w-[25px] h-[25px]"
            onClick={() => router.push(prevLink)}
          >
            <Image fill src={formatLink("/icons/left.svg")} alt="Prev" />
          </div>
        )}
      </div>

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 h-full left-0 w-80 pl-5 py-4 shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${isOpenMainSettings ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          backgroundColor: "rgb(var(--color-bg))",
          color: "rgb(var(--color-text))",
        }}
      >
        <div className="relative overflow-y-auto h-full">
          <h2 className="text-3xl font-bold mb-4">Cài đặt</h2>
          <button
            onClick={() => setIsOpenMainSettings(false)}
            className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70"
          >
            <Image
              width={iconSize}
              height={iconSize}
              src={formatLink("/icons/close.svg")}
              alt="Đóng"
            />
          </button>

          {/* Theme */}
          <div className="mb-3">
            <h3 className="text-lg mb-3 font-bold">Giao diện</h3>
            <div className="flex gap-2">
              {themes.map((t) => (
                <div
                  key={t}
                  className="p-2 shadow rounded-full cursor-pointer border-3"
                  style={{
                    backgroundColor:
                      t === "light"
                        ? "rgb(248 250 252)"
                        : t === "dark"
                          ? "rgb(17 24 39)"
                          : "rgb(19 38 28)",
                    borderColor:
                      theme === t
                        ? "rgb(var(--color-primary))"
                        : "rgb(var(--color-border))",
                  }}
                  onClick={() => setTheme(t)}
                >
                  <Image
                    width={iconSize}
                    height={iconSize}
                    src={
                      t === "light"
                        ? formatLink("/icons/sun.svg")
                        : t === "dark"
                          ? formatLink("/icons/moon.svg")
                          : formatLink("/icons/cloud.svg")
                    }
                    alt={t}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Font family */}
          <div className="mb-3 w-48">
            <h3 className="text-lg font-bold mb-3">Font chữ</h3>
            <select
              className="w-full p-2 rounded border"
              style={{
                backgroundColor: "rgb(var(--color-bg))",
                color: "rgb(var(--color-text))",
                borderColor: "rgb(var(--color-border))",
              }}
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="raleway-unique">Raleway</option>
              <option value="open-sans-unique">Open Sans</option>
              <option value="playfair-display-regular">Playfair</option>
              <option value="montserrat-unique">Montserrat</option>
            </select>
          </div>

          {/* Font size */}
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-3">Cỡ chữ</h3>
            <div className="flex gap-2 items-center">
              <div
                className="p-2 cursor-pointer shadow rounded hover:bg-[rgba(var(--color-text),0.1)]"
                onClick={decreaseFont}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/minus.svg")}
                  alt="Giảm"
                />
              </div>
              <div className="font-bold text-base px-4 py-3 bg-[rgba(var(--color-text),0.05)]">
                {fontSize}
              </div>
              <div
                className="p-2 cursor-pointer shadow rounded hover:bg-[rgba(var(--color-text),0.1)]"
                onClick={increaseFont}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/add.svg")}
                  alt="Tăng"
                />
              </div>
            </div>
          </div>

          {/* Width slider */}
          {/* Width slider */}
          <div className="mb-3 w-48 relative">
            <h3 className="text-lg font-bold mb-3">Chiều ngang</h3>

            <div className="relative">
              {/* Hiển thị % phía trên thumb */}
              <span
                id="width-value"
                className="absolute -top-3 font-bold text-sm px-1 bg-[rgba(var(--color-primary),0.8)] rounded text-white select-none"
                style={{
                  left: `0px`,
                  
                }}
              >
                {width}%
              </span>

              {/* Slider không mất khi thay đổi */}
              <input
                id="width-range"
                type="range"
                min={60}
                max={100}
                step={1}
                value={width || 90}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: (() => {
                    const percent = ((width - 60) / 40) * 100;
                    const primaryColor =
                      theme === "dark"
                        ? "#818cf8" // Indigo
                        : theme === "forest"
                          ? "#22c55e" // Green
                          : "#3b82f6"; // Blue
                    const borderColor =
                      theme === "dark"
                        ? "#374151" // Gray-700
                        : theme === "forest"
                          ? "#064e3b" // Dark green
                          : "#d1d5db"; // Gray-300
                    return `linear-gradient(to right, ${primaryColor} ${percent}%, ${borderColor} ${percent}%)`;
                  })(),
                }}
              />

              {/* Thumb styling giữ nguyên khi render lại */}
              <style jsx>{`
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(var(--color-primary));
        border: 2px solid white;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        transition: background-color 0.2s ease;
      }

      input[type="range"]::-webkit-slider-thumb:hover {
        background: rgb(var(--color-accent));
      }

      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(var(--color-primary));
        border: 2px solid white;
        transition: background-color 0.2s ease;
      }

      input[type="range"]::-moz-range-thumb:hover {
        background: rgb(var(--color-accent));
      }
    `}</style>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
