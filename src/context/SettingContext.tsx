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
type Alignment = "left" | "center" | "right";

type Settings = {
  theme: Theme;
  fontSize: number;
  width: number;
  alignment: Alignment;
  fontFamily: string;
  setTheme: (theme: Theme) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  setAlignment: (align: Alignment) => void;
  setWidth: (width: number) => void;
  setFontFamily: (font: string) => void;
};

const defaultSettings: Settings = {
  theme: "light",
  fontSize: 16,
  width: 80,
  alignment: "left",
  fontFamily: "Roboto",
  setTheme: () => {},
  increaseFont: () => {},
  decreaseFont: () => {},
  setAlignment: () => {},
  setWidth: () => {},
  setFontFamily: () => {},
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

  const [alignment, setAlignment] = useState<Alignment>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("alignment") as Alignment) || "left";
    }
    return "left";
  });

  const [fontFamily, setFontFamily] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fontFamily") || "Roboto";
    }
    return "Roboto";
  });

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

  useEffect(() => {
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontFamily]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        fontSize,
        width,
        alignment,
        fontFamily,
        setTheme,
        increaseFont: () => setFontSize((s) => s + 1),
        decreaseFont: () => setFontSize((s) => s - 1),
        setAlignment,
        setWidth: (s) => setWidth(s),
        setFontFamily,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
