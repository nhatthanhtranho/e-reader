/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";

import { useSettings } from "@/context/SettingContext";
import Settings from "@/app/components/Settings";
import { useRouter } from "next/navigation";
import ListOfChapter from "@/app/components/ListOfChapter";
import {
  addToLocalStorageArray,
  fetchMetadata,
  getChapterPath,
  saveObjectKeyToLocalStorage,
} from "@/utils";

// Vị trí gần cuối trang để biết là đọc xong chapter
const threshold = 200;

// Outer wrapper for background & padding
const Layout = styled.div<{ theme: "light" | "dark" | string }>`
  margin: 0 auto;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#fafafa"};
  color: ${(props) => (props.theme === "dark" ? "#f3f4f6" : "#1e2939")};
  border-radius: 0.5rem;
`;

// Content block with dynamic width & font size
const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
`;

export default function ChapterContentLayout() {
  const params = useParams();
  const chapter = params?.chapter as string;
  const slug = params?.slug as string;

  // Lấy số chương từ slug (hỗ trợ nhiều chữ số)
  const currentChapter = Number(chapter?.slice(-1)); // lấy ký tự cuối và parse sang number

  const [content, setContent] = useState<string>("");
  const [isOpenListOfChapter, setIsOpenListOfChapter] = useState(false);
  const { fontSize, theme, width } = useSettings();
  const router = useRouter();

  const [metadata, setMetadata] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    fetchMetadata(slug, setMetadata);
  }, [slug]);

  const chapterLinks = useMemo(() => {
    return getChapterPath(
      slug,
      metadata?.chapters?.length || 1,
      currentChapter
    );
  }, [slug, metadata?.chapters?.length, currentChapter]);

  useEffect(() => {
    saveObjectKeyToLocalStorage(slug, "latestRead", `chuong-${currentChapter}`);
  }, [slug, currentChapter]);

  useEffect(() => {
    if (!slug) return;

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // Mỗi lần scroll, reset timer
      clearTimeout(scrollTimer);

      // Debounce sau 300–500ms
      scrollTimer = setTimeout(() => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // --- Lưu vị trí cuộn ---
        saveObjectKeyToLocalStorage(
          slug,
          `chuong-${currentChapter}`,
          window.scrollY
        );

        // --- Kiểm tra đọc hết ---
        if (documentHeight - scrollPosition < threshold) {
          addToLocalStorageArray(slug, "read", `chuong-${currentChapter}`);
        }

        // --- Tính progress của chương hiện tại ---
        const chapterProgress = Math.round(
          Math.min(
            (window.scrollY + window.innerHeight) /
              document.documentElement.scrollHeight,
            1
          ) * 100
        );
        setProgress(chapterProgress);
        // 👉 Lưu hoặc hiển thị progress nếu cần:
        // localStorage.setItem(`${slug}-progress`, chapterProgress.toFixed(2));
        // setProgress(chapterProgress);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);

    // --- Fetch nội dung chương ---
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

  // --- Scroll tới vị trí đã lưu sau khi content load ---
  useEffect(() => {
    if (!content) return;

    const saved = localStorage.getItem("readPositions");
    const obj = saved ? JSON.parse(saved) : {};
    const scrollY = obj[slug] || 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [slug, content]);

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
      <Content className="py-12" fontSize={fontSize} width={width}>
        {content.split("\n").map((paragraph, idx) => (
          <p className="mb-5" key={idx}>
            {paragraph}
          </p>
        ))}
      </Content>
      <div className="fixed flex items-center justify-center text-xs font-bold bg-gray-50 text-gray-800 top-2 right-2 w-10 h-10 rounded-full">
        {progress}%
      </div>{" "}
      <div className="mx-auto flex gap-4 items-center justify-center">
        <button
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${
            !chapterLinks.prevPath ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!chapterLinks.prevPath}
          onClick={() =>
            chapterLinks.prevPath && router.push(chapterLinks.prevPath || "")
          }
        >
          Chương Trước
        </button>
        <button
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${
            !chapterLinks.nextPath ? "opacity-50 cursor-not-allowed" : ""
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
