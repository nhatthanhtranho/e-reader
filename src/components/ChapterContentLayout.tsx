/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSettings } from "@/context/SettingContext";
import Settings from "@/app/components/Settings";
import { useRouter } from "next/navigation";
import Banner from "./Banner";

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
  metadata: any;
  chapterLink: string;
  nextLink?: string | null;
  prevLink?: string | null;
  currentChapter?: number;
}

export default function ChapterContentLayout({
  chapterLink,
  nextLink,
  prevLink,
  metadata,
  currentChapter
}: ChapterContentLayoutProps) {
  const [content, setContent] = useState<string>("");
  const { fontSize, theme, width } = useSettings();
  const router = useRouter();

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
      <Settings nextLink={nextLink} prevLink={prevLink} />
      <Banner
        backgroundUrl={`/kinh-phat${metadata?.slug}/banner.webp`}
        title={metadata?.title || "Kinh Phật"}
        subtitle={metadata?.chapters?.[currentChapter ? currentChapter - 1 : 0]?.title || `Chương ${currentChapter}`}

      />
      <Content className="py-12" fontSize={fontSize} width={width}>
        {content.split("\n").map((paragraph, idx) => (
          <p className="mb-5" key={idx}>
            {paragraph}
          </p>
        ))}
      </Content>

      <div className="mx-auto flex gap-4 items-center justify-center">
        <button
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!prevLink ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!prevLink}
          onClick={() => prevLink && router.push(prevLink)}
        >
          Chương Trước
        </button>
        <button
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!nextLink ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!nextLink}
          onClick={() => nextLink && router.push(nextLink)}
        >
          Chương Sau
        </button>
      </div>
    </Layout>
  );
}
