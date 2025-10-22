"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;


  const getIcon = (t: string) => {
    switch (t) {
      case "light":
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case "dark":
        return <Moon className="w-4 h-4 text-blue-400" />;
      default:
        return <Laptop className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Nút toggle */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium 
                   bg-white dark:bg-neutral-900 border border-gray-300 dark:border-gray-700 
                   rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-neutral-800 
                   text-gray-800 dark:text-gray-100 transition-all"
      >
        {getIcon(theme ?? "system")}
        <span className="capitalize">{theme ?? "system"}</span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-neutral-900 shadow-lg z-50 transition-all duration-200 ease-out
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <ul className="py-1 text-sm text-gray-800 dark:text-gray-200">
          {themes.map((t) => {
            const isActive = theme === t;
            return (
              <li key={t}>
                <button
                  onClick={() => {
                    setTheme(t);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors
                    ${
                      isActive
                        ? "bg-gray-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                >
                  {getIcon(t)}
                  <span className="capitalize">{t}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
