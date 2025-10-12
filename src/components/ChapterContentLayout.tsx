/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { useSettings } from "@/context/SettingContext";
import Settings from "@/components/Settings";
import ListOfChapter from "@/components/ListOfChapter";
import {
  addToLocalStorageArray,
  fetchMetadata,
  getChapterPath,
  saveObjectKeyToLocalStorage,
} from "@/utils";
import { ProgressBar } from "@/components/ProgressBar";

// --- Threshold to consider chapter as read ---
const threshold = 200;

// --- Styled components ---
const Layout = styled.div<{ theme: "light" | "dark" | string }>`
  margin: 0 auto;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#fafafa"};
  color: ${(props) => (props.theme === "dark" ? "#f3f4f6" : "#1e2939")};
  border-radius: 0.5rem;
`;

const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
`;

export default function ChapterContentLayout() {
  const params = useParams();
  const chapter = params?.chapter as string;
  const slug = params?.slug as string;
  const currentChapter = Number(chapter?.slice(-1));

  const [content, setContent] = useState<string>("");
  const [isOpenListOfChapter, setIsOpenListOfChapter] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);

  const { fontSize, theme, width } = useSettings();
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
      currentChapter
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

        // Save scroll position
        saveObjectKeyToLocalStorage(
          slug,
          `chuong-${currentChapter}`,
          scrollTop
        );

        // Mark chapter as read
        if (scrollableHeight - scrollTop < threshold) {
          addToLocalStorageArray(slug, "read", `chuong-${currentChapter}`);
        }

        // Calculate progress (0-100%)
        const chapterProgress =
          scrollableHeight > 0
            ? Math.round((scrollTop / scrollableHeight) * 100)
            : 100;
        setProgress(chapterProgress);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);

    // --- Fetch chapter content ---
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

      {/* Progress indicator */}
      <div className="w-36 fixed top-3 right-3">
        <ProgressBar progress={progress}/>
      </div>

      {/* Navigation buttons */}
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
