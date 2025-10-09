// context/SettingsContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark" | "orange";

type Settings = {
  theme: Theme;
  fontSize: number;
  width: number;
  alignment: "left" | "center" | "right";
  setTheme: (theme: Theme) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  setAlignment: (align: "left" | "center" | "right") => void;
  increaseWidth: () => void;
  decreaseWidth: () => void;
};

const defaultSettings: Settings = {
  theme: "light",
  fontSize: 16,
  width: 80,
  alignment: "left",
  setTheme: () => {},
  increaseFont: () => {},
  decreaseFont: () => {},
  setAlignment: () => {},
  increaseWidth: () => {},
  decreaseWidth: () => {},
};

const SettingsContext = createContext<Settings>(defaultSettings);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("fontSize")) || 16;
    }
    return 16;
  });

  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("width")) || 80;
    }
    return 80;
  });

  const [alignment, setAlignment] = useState<"left" | "center" | "right">(
    () => {
      if (typeof window !== "undefined") {
        return (
          (localStorage.getItem("alignment") as "left" | "center" | "right") ||
          "left"
        );
      }
      return "left";
    }
  );

  // Persist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("width", width.toString());
  }, [width]);

  useEffect(() => {
    localStorage.setItem("alignment", alignment);
  }, [alignment]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        fontSize,
        width,
        alignment,
        setTheme,
        increaseFont: () => setFontSize((s) => s + 1),
        decreaseFont: () => setFontSize((s) => s - 1),
        setAlignment,
        increaseWidth: () => setWidth((w) => w + 5),
        decreaseWidth: () => setWidth((w) => w - 5),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
