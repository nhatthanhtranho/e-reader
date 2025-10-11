"use client";

import { useSettings } from "@/context/SettingContext";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { formatLink } from "../../../utils/formatLink";

const threshold = 50;
const mobileBreakpoint = 768;
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
  const [showToolbar, setShowToolbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { theme, setTheme, fontSize, increaseFont, decreaseFont, setWidth } =
    useSettings();

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
  }, [isOpenMainSettings]);

  // Scroll handler for mobile only
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth > mobileBreakpoint) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY - lastScrollY > threshold) {
            setShowToolbar(false); // scroll down
            setLastScrollY(currentScrollY);
          } else if (
            lastScrollY - currentScrollY > threshold ||
            currentScrollY < threshold
          ) {
            setShowToolbar(true); // scroll up or near top
            setLastScrollY(currentScrollY);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.innerWidth > mobileBreakpoint) {
        setShowToolbar(true); // always show on desktop
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  return (
    <>
      {/* Floating toolbar */}
      <div
        className={`bg-white gap-6 bottom-0 md:top-52 md:bottom-auto w-full items-center justify-center left-0 px-3 py-4 shadow flex md:flex-col md:w-auto cursor-pointer fixed z-20 transition-transform duration-300 ${showToolbar ? "translate-y-0" : "translate-y-full"
          }`}
      >
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[30px] h-[30px] relative md:order-3 ${prevLink ? "" : "opacity-50 cursor-not-allowed"
            }`}
          onClick={() => prevLink && router.push(prevLink)}
        >
          <Image
            fill
            className="object-cover"
            src={formatLink('/icons/left.svg')}
            alt="Trái"
          />
        </div>

        <div
          className="hover:bg-gray-100 md:order-2 p-2 rounded w-[30px] h-[30px] relative"
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
          className="hover:bg-gray-100 md:order-1 p-2 rounded w-[30px] h-[30px] relative"
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
          className="hover:bg-gray-100 md:order-2 p-2 rounded w-[30px] h-[30px] relative"
          onClick={() => setIsOpenListOfChapter?.(true)}
        >
          <Image fill src={formatLink("/icons/episodes.svg")} alt="Episodes" />
        </div>
        <div className="hover:bg-gray-100 p-2 md:order-2 rounded w-[30px] h-[30px] relative hidden">
          <Image fill src={formatLink("/icons/bookmark-a.svg")} alt="Bookmark" />
        </div>
        <div
          className={`hover:bg-gray-100 p-2 rounded w-[30px] h-[30px] relative md:order-3 ${nextLink ? "" : "opacity-50 cursor-not-allowed"
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
      </div>

      {/* Panel settings */}
      <div
        ref={panelRef}
        className={`fixed top-0 h-full left-0 w-80 pl-5 py-4 bg-white shadow-lg text-gray-700 z-20 transform transition-transform duration-300 ease-in-out ${isOpenMainSettings ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="relative overflow-y-auto h-full">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Cài đặt</h2>
          <button
            onClick={() => setIsOpenMainSettings(false)}
            className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70"
          >
            <Image width={25} height={25} src={formatLink("/icons/close.svg")} alt="Đóng" />
          </button>

          {/* Theme */}
          <div className="mb-3">
            <h3 className="text-lg mb-3 font-bold">Giao diện</h3>
            <div className="flex gap-2">
              <div
                className={`p-2 bg-white shadow rounded-full cursor-pointer border-3 ${theme === "light" ? "border-blue-300" : "border-gray-200"
                  }`}
                onClick={() => setTheme("light")}
              >
                <Image width={25} height={25} src={formatLink("/icons/sun.svg")} alt="Sáng" />
              </div>
              <div
                className={`p-2 bg-gray-600 shadow rounded-full cursor-pointer border-3 ${theme === "dark" ? "border-blue-300" : "border-gray-200"
                  }`}
                onClick={() => setTheme("dark")}
              >
                <Image width={25} height={25} src={formatLink("/icons/moon.svg")} alt="Tối" />
              </div>
              <div
                className={`p-2 bg-orange-800 shadow rounded-full cursor-pointer border-3 ${theme === "orange" ? "border-blue-300" : "border-gray-200"
                  }`}
                onClick={() => setTheme("orange")}
              >
                <Image
                  width={25}
                  height={25}
                  src={formatLink("/icons/cloud.svg")}
                  alt="Cam"
                />
              </div>
            </div>
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
                  width={25}
                  height={25}
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
                  width={25}
                  height={25}
                  src={formatLink("/icons/add.svg")}
                  alt="Tăng cỡ"
                />
              </div>
            </div>
          </div>

          {/* Width */}
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-3">Chiều ngang</h3>
            <div className="flex gap-4 items-center">
              <div
                className="w-[41px] h-[41px] flex justify-center hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={() => setWidth(95)}
              >
                <Image
                  width={30}
                  height={25}
                  src={formatLink("/icons/layout-big.svg")}
                  alt="Giảm"
                />
              </div>
              <div
                className="w-[41px] h-[41px] flex justify-center hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={() => setWidth(85)}
              >
                <Image
                  width={25}
                  height={25}
                  src={formatLink("/icons/layout-medium.svg")}
                  alt="Giảm"
                />
              </div>
              <div
                className="w-[41px] h-[41px] flex justify-center hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={() => setWidth(75)}
              >
                <Image
                  width={20}
                  height={25}
                  src={formatLink("/icons/layout-small.svg")}
                  alt="Giảm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
