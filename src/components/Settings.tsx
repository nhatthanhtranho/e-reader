"use client";

import { useSettings } from "@/context/SettingContext";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatLink } from "../../utils/formatLink";

const iconSize = 25;

interface SettingsProps {
  nextLink?: string | null;
  prevLink?: string | null;
  setIsOpenListOfChapter?: Function;
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
    theme,
    fontFamily,
    setFontFamily,
    setTheme,
    fontSize,
    increaseFont,
    decreaseFont,
    setWidth,
    width,
  } = useSettings();

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpenMainSettings(false);
        setIsOpenListOfChapter?.(false);
      }
    };

    if (isOpenMainSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMainSettings, setIsOpenListOfChapter]);

  // Update slider fill dynamically
  useEffect(() => {
    const range = document.getElementById(
      "width-range"
    ) as HTMLInputElement | null;
    if (range) {
      const percentage = ((Number(range.value) - 60) / 40) * 100;
      range.style.background = `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`;
      const label = document.getElementById("width-value");
      if (label) {
        label.textContent = `${range.value}%`;
        label.style.left = `${percentage}%`;
      }
    }
  }, [width]);

  return (
    <>
      {/* Floating toolbar */}
      <div
        onClick={() => setShowToolbar(true)}
        className={`bg-gray-100 rounded-r-2xl gap-6 items-center justify-center px-3 py-4 shadow flex flex-col lg:w-auto cursor-pointer fixed z-20 left-0 
    top-1/2 -translate-y-1/2 transform transition-transform duration-300 
    ${showToolbar ? "translate-x-0" : "-translate-x-10"}`}
      >
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative`}
          onClick={(e) => {
            e.stopPropagation();
            setShowToolbar(false);
          }}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink("/icons/close-square.svg")}
            alt="Close"
          />
        </div>

        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative`}
          onClick={() => setIsOpenMainSettings(true)}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink("/icons/settings.svg")}
            alt="Cài đặt"
          />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative`}
          onClick={() => router.push("/")}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink("/icons/home.svg")}
            alt="Trang chủ"
          />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative`}
          onClick={() => setIsOpenListOfChapter?.(true)}
        >
          <Image fill src={formatLink("/icons/episodes.svg")} alt="Episodes" />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative hidden`}
        >
          <Image
            fill
            src={formatLink("/icons/bookmark-a.svg")}
            alt="Bookmark"
          />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative ${
            nextLink ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => nextLink && router.push(nextLink)}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink("/icons/right.svg")}
            alt="Phải"
          />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[${iconSize}px] h-[${iconSize}px] relative ${
            prevLink ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => prevLink && router.push(prevLink)}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink("/icons/left.svg")}
            alt="Trái"
          />
        </div>
      </div>

      {/* Panel settings */}
      <div
        ref={panelRef}
        className={`fixed top-0 h-full left-0 w-80 pl-5 py-4 bg-white shadow-lg text-gray-700 z-20 transform transition-transform duration-300 ease-in-out ${
          isOpenMainSettings ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative overflow-y-auto h-full">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Cài đặt</h2>
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
              <div
                className={`p-2 bg-white shadow rounded-full cursor-pointer border-3 ${
                  theme === "light" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("light")}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/sun.svg")}
                  alt="Sáng"
                />
              </div>
              <div
                className={`p-2 bg-gray-600 shadow rounded-full cursor-pointer border-3 ${
                  theme === "dark" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("dark")}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/moon.svg")}
                  alt="Tối"
                />
              </div>
              <div
                className={`p-2 bg-orange-800 shadow rounded-full cursor-pointer border-3 ${
                  theme === "orange" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("orange")}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/cloud.svg")}
                  alt="Cam"
                />
              </div>
            </div>
          </div>
          <div className="mb-3 w-48">
            <h3 className="text-lg font-bold mb-3">Font chữ</h3>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={fontFamily} // từ useSettings
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option className="raleway-unique" value="raleway-unique">
                Raleway
              </option>
              <option className="open-sans-unique" value="open-sans-unique">
                Open Sans
              </option>
              <option
                className="playfair-display-regular"
                value="playfair-display-regular"
              >
                Playfair
              </option>
              <option className="montserrat-unique" value="montserrat-unique">
                Montserrat
              </option>
            </select>
          </div>

          {/* Font size */}
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-3">Cỡ chữ</h3>
            <div className="flex gap-2 items-center">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={decreaseFont}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/minus.svg")}
                  alt="Giảm cỡ"
                />
              </div>
              <div className="font-bold text-base text-gray-700 px-4 py-3 bg-gray-100">
                {fontSize}
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={increaseFont}
              >
                <Image
                  width={iconSize}
                  height={iconSize}
                  src={formatLink("/icons/add.svg")}
                  alt="Tăng cỡ"
                />
              </div>
            </div>
          </div>

          {/* Width (range slider) */}
          <div className="mb-3 w-48">
            <h3 className="text-lg font-bold mb-3">Chiều ngang</h3>
            <div className="flex flex-col gap-1 relative">
              <input
                id="width-range"
                type="range"
                min="60"
                max="100"
                step="1"
                value={width || 90}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setWidth(value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  const value = Number(input.value);

                  // Tính phần trăm để tô màu (từ 60 đến 100)
                  const percentage = ((value - 60) / 40) * 100;
                  const limitedPercentage = Math.min(
                    97,
                    Math.max(3, percentage)
                  );

                  // Cập nhật màu nền
                  input.style.background = `linear-gradient(to right, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%)`;

                  // Cập nhật label
                  const label = document.getElementById("width-value");
                  if (label) {
                    label.textContent = `${value}%`; // 👈 hiển thị giá trị thực (60–100)
                    label.style.left = `${limitedPercentage}%`;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
