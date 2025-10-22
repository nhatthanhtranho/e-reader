"use client";

import ThemedIcon from "@/components/ThemeIcon";
import { THEMES, LIGHT_THEME, DARK_THEME, FOREST_THEME, AMBER_THEME } from "@/constants";

interface ThemeSelectorProps {
  theme?: string;
  setTheme: (t: string) => void;
}
const iconSize = 25;

// Hàm map theme -> icon name
function getIconName(theme: string) {
  switch (theme) {
    case LIGHT_THEME:
      return "Sun1";
    case DARK_THEME:
      return "Moon";
    case FOREST_THEME:
      return "Cloud";
    case AMBER_THEME:
      return "EyeSlash";
  }
}

export default function ThemeSelector({ theme, setTheme }: ThemeSelectorProps) {
  return (
    <div className="mb-3">
      <h3 className="text-lg mb-3 font-bold">Giao diện</h3>
      <div className="flex gap-2">
        {THEMES.map((t) => (
          <div
            key={t}
            onClick={() => setTheme(t)}
            className={`p-2 rounded-full cursor-pointer border-2 shadow transition-all flex items-center justify-center ${theme === t ? 'ring-2 ring-[rgb(var(--color-primary))]' : ''}`}
            style={{
              backgroundColor: 'rgb(var(--color-bg))',
              borderColor: theme === t ? 'rgb(var(--color-primary))' : 'rgb(var(--color-border))',
            }}
          >
            <ThemedIcon
              size={iconSize}
              variant="Bold"
              color={theme === t ? 'primary' : 'text'}
              name={getIconName(t) as string}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
