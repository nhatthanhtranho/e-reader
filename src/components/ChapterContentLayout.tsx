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

const Layout = styled.div<{ theme: "light" | "dark" | string }>`
  margin: 0 auto;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#fafafa"};
  color: ${(props) => (props.theme === "dark" ? "#f3f4f6" : "#1e2939")};
  border-radius: 0.5rem;
`;

const Content = styled.div<{
  fontSize: number;
  width: number;
}>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
`;

export default function ChapterContentLayout() {
  const params = useParams();
  const chapter = params?.chapter as string;
  const slug = params?.slug as string;
  const match = chapter?.match(/(\d+)$/);
  const currentChapter = match ? Number(match[1]) : null;

  const [content, setContent] = useState<string>("");
  const [isOpenListOfChapter, setIsOpenListOfChapter] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isModified, setIsModified] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const { fontSize, theme, width, fontFamily } = useSettings();
  const router = useRouter();

  // --- Fetch metadata ---
  useEffect(() => {
    setProgress(0);
    fetchMetadata(slug, setMetadata);
  }, [slug]);

  // --- Compute chapter links ---
  const chapterLinks = useMemo(() => {
    return getChapterPath(slug, metadata?.chapters?.length || 1, currentChapter || 0);
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
      .then((text) => setContent(text))
      .catch(console.error);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
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
    if (!isModified) setIsModified(true);
  };

  // --- Export to .txt ---
  const handleExport = () => {
    const text =
      contentRef.current?.innerText?.trim() ||
      content.trim() ||
      "Không có nội dung";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-chuong-${currentChapter}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setIsModified(false);
  };

  return (
    <Layout theme={theme}>
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

      <Content
        ref={contentRef}
        className={`py-12 prose max-w-none ${fontFamily}`}
        fontSize={fontSize}
        width={width}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInputChange}
        style={{
          outline: "none",
          whiteSpace: "pre-wrap",
          cursor: "text",
        }}
      >
        {content}
      </Content>

      {/* Nút export chỉ hiện khi có chỉnh sửa */}
      {isModified && (
        <div className="flex justify-center my-10">
          <button
            onClick={handleExport}
            className="w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black"
          >
            Export TXT
          </button>
        </div>
      )}

      <div className="w-36 fixed top-3 right-3">
        <ProgressBar progress={progress} />
      </div>

      <div className="mx-auto flex gap-4 items-center justify-center">
        <button
          className={`${!chapterLinks.prevPath && 'hidden'} w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!chapterLinks.prevPath ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!chapterLinks.prevPath}
          onClick={() =>
            chapterLinks.prevPath && router.push(chapterLinks.prevPath || "")
          }
        >
          Chương Trước
        </button>
        <button
          className={`${!chapterLinks.nextPath && 'hidden '} w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!chapterLinks.nextPath ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!chapterLinks.nextPath}
          onClick={() =>
            chapterLinks.nextPath && router.push(chapterLinks.nextPath || "")
          }
        >
          Chương Sau
        </button>
      </div>
    </Layout>
  );
}
