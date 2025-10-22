/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";

import { useSettings } from "@/context/SettingContext";
import Settings from "@/components/Settings";
import ListOfChapter from "@/components/ListOfChapter";
import { ProgressBar } from "@/components/ProgressBar";
import ChapterNavigation from "../ChapterNavigation";
import {
  addToLocalStorageArray,
  fetchMetadata,
  getChapterPath,
  saveObjectKeyToLocalStorage,
} from "@/utils";

const SCROLL_THRESHOLD = 200;

const Layout = styled.div`
  margin: 0 auto;
  background-color: rgb(var(--color-bg));
  color: rgb(var(--color-text));
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
  outline: none;
  white-space: pre-wrap;
  cursor: text;
  transition: color 0.3s ease;
`;

export default function ChapterContentLayout() {
  const params = useParams();
  const slug = params?.slug as string;
  const chapter = params?.chapter as string;
  const match = chapter?.match(/(\d+)$/);
  const currentChapter = match ? Number(match[1]) : null;

  const { fontSize, width, fontFamily } = useSettings();

  const [metadata, setMetadata] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [isModified, setIsModified] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const contentHTML = useRef<string>("");

  // ===== fetch metadata =====
  useEffect(() => {
    if (!slug) return;
    setProgress(0);
    fetchMetadata(slug, setMetadata);
  }, [slug]);

  const chapterLinks = useMemo(
    () =>
      getChapterPath(slug, metadata?.chapters?.length || 1, currentChapter || 0),
    [slug, metadata?.chapters?.length, currentChapter]
  );

  // ===== save last read =====
  useEffect(() => {
    if (slug && currentChapter)
      saveObjectKeyToLocalStorage(slug, "latestRead", `chuong-${currentChapter}`);
  }, [slug, currentChapter]);

  // ===== fetch chapter =====
  const fetchChapterContent = useCallback(async () => {
    if (!chapterLinks.currentPath) return;
    try {
      const res = await fetch(chapterLinks.currentPath);
      if (!res.ok) throw new Error("Chapter not found");
      const text = await res.text();
      const cleaned = text
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((p) => `<p>${p}</p>`)
        .join("");
      contentHTML.current = cleaned;
      if (contentRef.current) contentRef.current.innerHTML = cleaned;
    } catch (err) {
      console.error(err);
    }
  }, [chapterLinks.currentPath]);

  useEffect(() => {
    fetchChapterContent();
  }, [fetchChapterContent]);

  // ===== scroll save/restore =====
  useEffect(() => {
    if (!slug) return;
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const scrollTop = window.scrollY;
        const viewport = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollable = docHeight - viewport;

        saveObjectKeyToLocalStorage(slug, `chuong-${currentChapter}`, scrollTop);
        if (scrollable - scrollTop < SCROLL_THRESHOLD)
          addToLocalStorageArray(slug, "read", `chuong-${currentChapter}`);

        setProgress(scrollable > 0 ? Math.round((scrollTop / scrollable) * 100) : 100);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, currentChapter]);

  useEffect(() => {
    const saved = localStorage.getItem("readPositions");
    const obj = saved ? JSON.parse(saved) : {};
    const scrollY = obj[slug] || 0;
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  }, [slug]);

  // ===== handle input =====
  const handleInput = () => {
    if (!contentRef.current) return;
    contentHTML.current = contentRef.current.innerHTML;
    setIsModified(true);
  };

  // ===== export TXT =====
  const handleExport = () => {
    const text = contentHTML.current
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-chuong-${currentChapter}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setIsModified(false);
  };

  const buttonClass =
    "w-48 py-2 rounded shadow border border-[rgb(var(--color-border))] cursor-pointer transition-colors duration-200 " +
    "bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-accent))]";

  return (
    <Layout>
      <Settings
        nextLink={chapterLinks.nextPath}
        prevLink={chapterLinks.prevPath}
        setIsOpenListOfChapter={setIsOpenList}
      />
      <ListOfChapter
        chapters={metadata?.chapters}
        slug={metadata?.slug}
        isOpen={isOpenList}
        setIsOpen={setIsOpenList}
      />

      <ChapterNavigation
        nextPath={chapterLinks.nextPath}
        prevPath={chapterLinks.prevPath}
        buttonClass={buttonClass}
      />

      <Content
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        className={`py-12 prose max-w-none ${fontFamily}`}
        fontSize={fontSize}
        width={width}
        onInput={handleInput}
      />

      <ChapterNavigation
        nextPath={chapterLinks.nextPath}
        prevPath={chapterLinks.prevPath}
        buttonClass={buttonClass}
      />

      {isModified && (
        <div className="flex justify-center my-10">
          <button className={buttonClass} onClick={handleExport}>
            Export TXT
          </button>
        </div>
      )}

      <div className="w-36 fixed top-3 right-3">
        <ProgressBar progress={progress} />
      </div>
    </Layout>
  );
}
