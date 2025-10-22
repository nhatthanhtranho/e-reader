"use client";

import { forwardRef } from "react";
import ThemedIcon from "@/components/ThemeIcon";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import FontSizeControl from "./FontSizeControl";
import WidthSlider from "./ContentWidthControl";
import EditModeToggle from "./EditModeToggle";
import { SettingsProps } from "./types";
import { useSettings } from "@/context/SettingContext";
import { useTheme } from "next-themes";

interface SettingsPanelProps extends SettingsProps {
    isOpen: boolean;
    closePanel: () => void;
}

const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
    ({ isOpen, closePanel, isEditMode, setIsEditMode }, ref) => {
        const settings = useSettings();
        const { theme, setTheme } = useTheme();

        return (
            <div
                ref={ref}
                className={`fixed top-0 h-full left-0 w-80 shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                style={{ backgroundColor: "rgb(var(--color-bg))", color: "rgb(var(--color-text))" }}
            >
                <div className={`relative overflow-y-auto h-full p-4 ${isOpen && 'shadow-[0_0_10px_rgb(var(--color-secondary))]'}`}>
                    <h2 className="text-3xl font-bold mb-4">Cài đặt</h2>
                    <button onClick={closePanel} className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70 p-4">
                        <ThemedIcon name="CloseCircle" color="text" size={30} />
                    </button>

                    <ThemeSelector theme={theme} setTheme={setTheme} />
                    <FontSelector fontFamily={settings.fontFamily} setFontFamily={settings.setFontFamily} />
                    <FontSizeControl fontSize={settings.fontSize} increase={settings.increaseFont} decrease={settings.decreaseFont} />
                    <WidthSlider width={settings.width} setWidth={settings.setWidth} theme={theme} />
                    <EditModeToggle isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
                </div>
            </div>
        );
    }
);
SettingsPanel.displayName = "SettingsPanel";

export default SettingsPanel;
