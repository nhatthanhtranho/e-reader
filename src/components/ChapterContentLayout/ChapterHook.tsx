import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import {
  addToLocalStorageArray,
  fetchMetadata,
  getChapterPath,
  saveObjectKeyToLocalStorage,
} from "@/utils";
import { Metadata } from "../../../types/Metadata";

const SCROLL_THRESHOLD = 200;

export function useChapterMetadata(slug?: string) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  useEffect(() => {
    if (!slug) return;
    fetchMetadata(slug, setMetadata);
  }, [slug]);
  return metadata;
}

export function useChapterLinks(slug: string, metadata: Metadata | null, currentChapter: number) {
  return useMemo(
    () => getChapterPath(slug, metadata?.chapters?.length || 1, currentChapter),
    [slug, metadata?.chapters?.length, currentChapter]
  );
}

export function useTapContinue(
  targetRef: React.RefObject<HTMLElement>,
  onTripleTap: () => void,
  tapDelay = 400
) {
  const tapCount = useRef(0);
  const lastTapTime = useRef(0);
  const resetTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTap = () => {
      const now = Date.now();
      const diff = now - lastTapTime.current;

      if (diff < tapDelay) {
        tapCount.current += 1;
      } else {
        tapCount.current = 1;
      }
      lastTapTime.current = now;

      if (tapCount.current >= 3) {
        tapCount.current = 0;
        onTripleTap();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clearTimeout(resetTimer.current as any);
      resetTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, tapDelay);
    };

    const node = targetRef.current;
    if (!node) return;

    node.addEventListener("click", handleTap);
    node.addEventListener("touchend", handleTap);

    return () => {
      node.removeEventListener("click", handleTap);
      node.removeEventListener("touchend", handleTap);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clearTimeout(resetTimer.current as any);
    };
  }, [onTripleTap, tapDelay, targetRef]);
}


export function useChapterContent(chapterPath?: string) {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHTML = useRef<string>("");

  const fetchContent = useCallback(async () => {
    if (!chapterPath) return;
    try {
      const res = await fetch(chapterPath);
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
  }, [chapterPath]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { contentRef, contentHTML };
}

export function useScrollProgress(slug?: string, currentChapter?: number) {
  const [progress, setProgress] = useState(0);

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
    const scrollY = obj[slug || ""] || 0;
    requestAnimationFrame(() => window.scrollTo(0, scrollY));
  }, [slug]);

  return progress;
}
