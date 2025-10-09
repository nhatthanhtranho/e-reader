import { useSettings } from "@/context/SettingContext";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Settings() {
  const [isOpenMainSettings, setIsOpenMainSettings] = useState(false);
  const {
    theme,
    setTheme,
    fontSize,
    increaseFont,
    decreaseFont,
    alignment,
    width,
    increaseWidth,
    decreaseWidth,
    setAlignment,
  } = useSettings();

  return (
    <>
      <div
        onClick={() => setIsOpenMainSettings(true)}
        className="bg-white p-3 shadow cursor-pointer fixed left-0 top-1/2 -translate-y-1/2 z-20"
      >
        <div className="hover:bg-gray-100 p-2 mb-2 rounded">
          <Image
            width={25}
            height={25}
            src="/icons/settings.svg"
            alt="Cài đặt"
          />
        </div>
      </div>

      {/* Panel cài đặt */}
      <div
        className={`fixed top-0 h-full left-0 w-80 pl-5 py-4 bg-white shadow-lg text-gray-700 z-20 transform transition-transform duration-300 ease-in-out ${
          isOpenMainSettings ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Cài đặt</h2>
          <button
            onClick={() => setIsOpenMainSettings(false)}
            className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70"
          >
            <Image width={25} height={25} src="/icons/close.svg" alt="Đóng" />
          </button>

          {/* Giao diện */}
          <div className="mb-3">
            <h3 className="text-lg mb-3 font-bold">Giao diện</h3>
            <div className="flex gap-2">
              {/* Light theme */}
              <div
                className={`p-2 bg-white shadow rounded-full cursor-pointer border-3 ${
                  theme === "light" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("light")}
              >
                <Image width={25} height={25} src="/icons/sun.svg" alt="Sáng" />
              </div>

              {/* Dark theme */}
              <div
                className={`p-2 bg-gray-600 shadow rounded-full cursor-pointer border-3 ${
                  theme === "dark" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("dark")}
              >
                <Image width={25} height={25} src="/icons/moon.svg" alt="Tối" />
              </div>

              {/* Orange theme */}
              <div
                className={`p-2 bg-orange-800 shadow rounded-full cursor-pointer border-3 ${
                  theme === "orange" ? "border-blue-300" : "border-gray-200"
                }`}
                onClick={() => setTheme("orange")}
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/cloud.svg"
                  alt="Cam"
                />
              </div>
            </div>
          </div>

          {/* Cỡ chữ */}
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-3">Cỡ chữ</h3>
            <div className="flex gap-2 items-center">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={increaseFont}
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/add.svg"
                  alt="Tăng cỡ"
                />
              </div>
              <div className="font-bold text-base text-gray-700 px-4 py-3 bg-gray-100">
                {fontSize}
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={decreaseFont}
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/minus.svg"
                  alt="Giảm cỡ"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <h3 className="text-lg font-bold mb-3">Chiều Ngang</h3>
            <div className="flex gap-2 items-center">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={increaseWidth}
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/add.svg"
                  alt="Tăng cỡ"
                />
              </div>
              <div className="font-bold text-base text-gray-700 px-4 py-3 bg-gray-100">
                {width}%
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer bg-white shadow rounded"
                onClick={decreaseWidth}
              >
                <Image
                  width={25}
                  height={25}
                  src="/icons/minus.svg"
                  alt="Giảm cỡ"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
