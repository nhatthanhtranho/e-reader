"use client";

import { useSettings } from "@/context/SettingContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import ThemedIcon from "./ThemeIcon";
import { DARK_THEME, FOREST_THEME, THEMES } from "@/constants";

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


  return (
    <>
      {/* Floating toolbar */}
      <div
        onClick={() => setShowToolbar(true)}
        className={`settings rounded-r-2xl gap-6 items-center justify-center px-3 py-4 shadow flex flex-col lg:w-auto cursor-pointer fixed z-20 left-0 top-1/2 -translate-y-1/2 transform transition-transform duration-300 ${showToolbar ? "translate-x-0" : "-translate-x-10"
          }`}
        style={{
          backgroundColor: "rgb(var(--color-primary))",
          color: "rgb(var(--color-text))",
        }}
      >
        {/* Close */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowToolbar(false);
          }}
        >
          <ThemedIcon name="CloseSquare" color="text" size={25} />
        </div>

        {/* Settings */}
        <div
          onClick={() => setIsOpenMainSettings(true)}
        >
          <ThemedIcon name="Setting2" color="text" size={25} />
        </div>

        {/* Home */}
        <div
          onClick={() => router.push("/")}
        >
          <ThemedIcon name="Home3" color="text" size={25} />
        </div>

        {/* Episodes */}
        <div
          onClick={() => setIsOpenListOfChapter?.(true)}
        >
          <ThemedIcon name="Book" color="text" size={25} />
        </div>

        {/* Next / Prev */}
        {nextLink && (
          <div
            onClick={() => router.push(nextLink)}
          >
            <ThemedIcon name="ArrowRight" color="text" size={25} />
          </div>
        )}
        {prevLink && (
          <div
            onClick={() => router.push(prevLink)}
          >
            <ThemedIcon name="ArrowLeft" color="text" size={25} />
          </div>
        )}
      </div>

      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 h-full left-0 w-80 shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${isOpenMainSettings ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          backgroundColor: "rgb(var(--color-bg))",
          color: "rgb(var(--color-text))",
        }}
      >
        <div className={`relative overflow-y-auto h-full p-4 ${isOpenMainSettings && 'shadow-[0_0_10px_rgb(var(--color-secondary))]'}`}>
          <h2 className="text-3xl font-bold mb-4">Cài đặt</h2>
          <button
            onClick={() => setIsOpenMainSettings(false)}
            className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70 p-4"
          >
            <ThemedIcon name="CloseCircle" color="text" size={30} />
          </button>

          {/* Theme */}
          <div className="mb-3">
            <h3 className="text-lg mb-3 font-bold">Giao diện</h3>
            <div className="flex gap-2">
              {THEMES.map((t) => (
                <div
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-2 rounded-full cursor-pointer border-2 shadow transition-all flex items-center justify-center ${theme === t ? 'ring-2 ring-[rgb(var(--color-primary))]' : ''
                    }`}
                  style={{
                    backgroundColor: 'rgb(var(--color-bg))',
                    borderColor:
                      theme === t
                        ? 'rgb(var(--color-primary))'
                        : 'rgb(var(--color-border))',
                  }}
                >
                  <ThemedIcon
                    size={iconSize}
                    variant="Bold"
                    color={theme === t ? 'primary' : 'text'}
                    name={
                      t === 'light'
                        ? 'Sun1'
                        : t === 'dark'
                          ? 'Moon'
                          : 'Cloud'
                    }
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
                onClick={decreaseFont}
              >
                <ThemedIcon name="Minus" color="primary" size={30} />

              </div>
              <div className="font-bold text-base px-4 py-3 bg-[rgba(var(--color-text),0.05)]">
                {fontSize}
              </div>
              <div
                onClick={increaseFont}
              >
                <ThemedIcon name="Add" color="primary" size={30} />

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
                      theme === DARK_THEME
                        ? "#818cf8" // Indigo
                        : theme === FOREST_THEME
                          ? "#22c55e" // Green
                          : "#3b82f6"; // Blue
                    const borderColor =
                      theme === DARK_THEME
                        ? "#374151" // Gray-700
                        : theme === FOREST_THEME
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
