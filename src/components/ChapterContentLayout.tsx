"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSettings } from "@/context/SettingContext";
import Settings from "@/app/components/Settings";

// Outer wrapper for background & padding
const Layout = styled.div<{ theme: "light" | "dark" | string }>`
  margin: 0 auto;
  background-color: ${(props) =>
        props.theme === "dark" ? "#1a1a1a" : "#fafafa"};
  color: ${(props) => (props.theme === "dark" ? "#f3f4f6" : "#1e2939")};
  padding: 1rem;
  border-radius: 0.5rem;
`;

// Content block with dynamic width & font size
const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
`;

interface ChapterContentLayoutProps {
    chapterLink: string;
    canGoPrev?: boolean;
    canGoNext?: boolean;
}

export default function ChapterContentLayout({ chapterLink }: ChapterContentLayoutProps) {
    const [content, setContent] = useState<string>("");
    const { fontSize, theme, width } = useSettings();

    useEffect(() => {
        if (!chapterLink) return;

        fetch(chapterLink)
            .then((res) => {
                if (!res.ok) throw new Error("Chapter not found");
                return res.text();
            })
            .then((text) => setContent(text))
            .catch(console.error);
    }, [chapterLink]);

    return (
        <Layout theme={theme} className="py-12">
            <Settings />

            <div className="mx-auto flex gap-4 items-center justify-center">
                <button className="w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
                    Chương Trước
                </button>
                <button className="w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
                    Chương Sau
                </button>
            </div>

            <Content className="py-12" fontSize={fontSize} width={width}>
                {content}
            </Content>

            <div className="mx-auto flex gap-4 items-center justify-center">
                <button className="w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
                    Chương Trước
                </button>
                <button className="w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black">
                    Chương Sau
                </button>
            </div>
        </Layout>
    );
}
