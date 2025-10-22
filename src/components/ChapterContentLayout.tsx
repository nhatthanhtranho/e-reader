/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

import { useSettings } from "@/context/SettingContext";
import Settings from "@/components/Settings";
import ListOfChapter from "@/components/ListOfChapter";
import { ProgressBar } from "@/components/ProgressBar";
import {
  addToLocalStorageArray,
  fetchMetadata,
  getChapterPath,
  saveObjectKeyToLocalStorage,
} from "@/utils";

const threshold = 200;

// === Layout container theme-aware
const Layout = styled.div`
  margin: 0 auto;
  background-color: rgb(var(--color-bg));
  color: rgb(var(--color-text));
  transition: background-color 0.3s ease, color 0.3s ease;
`;

// === Content editable theme-aware
const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
  outline: none;
  white-space: pre-wrap;
  cursor: text;
  transition: color 0.3s ease;
`;

interface ChapterContentLayoutProps {
  isEdit?: boolean;
}

export default function ChapterContentLayout({
  isEdit = true,
}: ChapterContentLayoutProps) {
  const params = useParams();
  const chapter = params?.chapter as string;
  const slug = params?.slug as string;
  const match = chapter?.match(/(\d+)$/);
  const currentChapter = match ? Number(match[1]) : null;

  const [content, setContent] = useState<string[]>([]);
  const [isOpenListOfChapter, setIsOpenListOfChapter] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isModified, setIsModified] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const { fontSize, width, fontFamily } = useSettings();
  const router = useRouter();

  // --- Fetch metadata ---
  useEffect(() => {
    setProgress(0);
    fetchMetadata(slug, setMetadata);
  }, [slug]);

  // --- Compute chapter links ---
  const chapterLinks = useMemo(() => {
    return getChapterPath(
      slug,
      metadata?.chapters?.length || 1,
      currentChapter || 0
    );
  }, [slug, metadata?.chapters?.length, currentChapter]);

  // --- Save latest read chapter ---
  useEffect(() => {
    saveObjectKeyToLocalStorage(slug, "latestRead", `chuong-${currentChapter}`);
  }, [slug, currentChapter]);

  // --- Scroll & progress handling ---
  useEffect(() => {
    if (!slug) return;

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - viewportHeight;

        saveObjectKeyToLocalStorage(
          slug,
          `chuong-${currentChapter}`,
          scrollTop
        );

        if (scrollableHeight - scrollTop < threshold) {
          addToLocalStorageArray(slug, "read", `chuong-${currentChapter}`);
        }

        const chapterProgress =
          scrollableHeight > 0
            ? Math.round((scrollTop / scrollableHeight) * 100)
            : 100;
        setProgress(chapterProgress);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);

    fetch(chapterLinks.currentPath)
      .then((res) => {
        if (!res.ok) throw new Error("Chapter not found");
        return res.text();
      })
      .then((text) => {
        if (typeof text !== "string") return setContent([]);

        const cleaned = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);

        setContent(cleaned);
      })
      .catch((err) => {
        console.error(err);
        setContent([]); // fallback an toàn
      });
  }, [chapterLinks.currentPath, slug, currentChapter]);

  // --- Restore scroll position & progress ---
  useEffect(() => {
    if (!content) return;
    const saved = localStorage.getItem("readPositions");
    const obj = saved ? JSON.parse(saved) : {};
    const scrollY = obj[slug] || 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - window.innerHeight;
      setProgress(
        scrollableHeight > 0
          ? Math.round((scrollY / scrollableHeight) * 100)
          : 100
      );
    });
  }, [slug, content]);

  // --- Detect content changes (editable text) ---
  const handleInputChange = () => {
    if (!contentRef.current) return;

    // Lấy toàn bộ <p> bên trong Content
    const paragraphs = Array.from(contentRef.current.querySelectorAll("p"));
    const updated = paragraphs
      .map((p) => p.innerText.trim())
      .filter((t) => t.length > 0);

    setContent(updated);
    if (!isModified) setIsModified(true);
  };

  // --- Export to .txt ---
  const handleExport = () => {
    const text =
      Array.isArray(content) && content.length > 0
        ? content.join("\n\n")
        : "Không có nội dung";

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-chuong-${currentChapter}.txt`;
    a.click();

    URL.revokeObjectURL(url);
    setIsModified(false);
  };

  // === Theme-aware button classes ===
  const buttonClass =
    "w-48 py-2 rounded shadow border border-[rgb(var(--color-border))] cursor-pointer transition-colors duration-200 " +
    "bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-accent))]";

  return (
    <Layout>
      <Settings
        nextLink={chapterLinks.nextPath}
        prevLink={chapterLinks.prevPath}
        setIsOpenListOfChapter={setIsOpenListOfChapter}
      />
      <ListOfChapter
        chapters={metadata?.chapters}
        slug={metadata?.slug}
        isOpen={isOpenListOfChapter}
        setIsOpen={setIsOpenListOfChapter}
      />

      <div className="mx-auto flex gap-4 items-center justify-center py-12 flex-wrap">
        <button className={buttonClass} onClick={() => router.push("/")}>
          Trang chủ
        </button>

        {chapterLinks.prevPath && (
          <button
            className={buttonClass}
            onClick={() => router.push(chapterLinks.prevPath as any)}
          >
            Chương Trước
          </button>
        )}

        {chapterLinks.nextPath && (
          <button
            className={buttonClass}
            onClick={() => router.push(chapterLinks.nextPath as any)}
          >
            Chương Sau
          </button>
        )}
      </div>

      {/* Chapter Content */}
      <Content
        ref={contentRef}
        className={`py-12 prose max-w-none ${fontFamily} text-[rgb(var(--color-text))]`}
        fontSize={fontSize}
        width={width}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInputChange}
      >
        {content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Content>

      {/* Buttons dưới content */}
      <div className="mx-auto flex gap-4 items-center justify-center pb-12 flex-wrap">
        <button className={buttonClass} onClick={() => router.push("/")}>
          Trang chủ
        </button>

        {chapterLinks.prevPath && (
          <button
            className={buttonClass}
            onClick={() => router.push(chapterLinks.prevPath as any)}
          >
            Chương Trước
          </button>
        )}

        {chapterLinks.nextPath && (
          <button
            className={buttonClass}
            onClick={() => router.push(chapterLinks.nextPath as any)}
          >
            Chương Sau
          </button>
        )}
      </div>

      {/* Export button */}
      {isModified && (
        <div className="flex justify-center my-10">
          <button className={buttonClass} onClick={handleExport}>
            Export TXT
          </button>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-36 fixed top-3 right-3">
        <ProgressBar progress={progress} />
      </div>
    </Layout>
  );
}
