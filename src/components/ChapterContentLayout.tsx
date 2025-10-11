/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";

import { useSettings } from "@/context/SettingContext";
import Settings from "@/app/components/Settings";
import { useRouter } from "next/navigation";
import Banner from "./Banner";
import ListOfChapter from "@/app/components/ListOfChapter";
import { fetchMetadata, getChapterPath } from "@/utils";

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

  useEffect(() => {
    fetchMetadata(slug, setMetadata)
  }, [slug]);


  const chapterLinks = useMemo(() => {
    return getChapterPath(slug, metadata?.chapters?.length || 1, currentChapter);
  }, [slug, metadata?.chapters?.length, currentChapter]);
  useEffect(() => {
    localStorage.setItem(slug, `chuong-${currentChapter}`);
  }, [slug, currentChapter]);
  // --- Load nội dung ---
  useEffect(() => {
    if (!slug) return;
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const saved = localStorage.getItem("readPositions");
        const obj = saved ? JSON.parse(saved) : {};
        obj[slug] = window.scrollY;
        localStorage.setItem("readPositions", JSON.stringify(obj));
      }, 300); // debounce 300ms
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
      clearTimeout(timer);
    };
  }, [chapterLinks.currentPath, slug]);

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
      <Banner
        backgroundUrl={`/kinh-phat${metadata?.slug}/horizontal.png`}
        title={metadata?.title || "Kinh Phật"}
        subtitle={
          metadata?.chapters?.[currentChapter ? currentChapter - 1 : 0].name ||
          `Chương ${currentChapter}`
        }
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
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!chapterLinks.prevPath ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!chapterLinks.prevPath}
          onClick={() => chapterLinks.prevPath && router.push(chapterLinks.prevPath || '')}
        >
          Chương Trước
        </button>
        <button
          className={`w-48 py-2 border shadow bg-white text-gray-800 rounded cursor-pointer hover:bg-gray-200 hover:text-black ${!chapterLinks.nextPath ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={!chapterLinks.nextPath}
          onClick={() => chapterLinks.nextPath && router.push(chapterLinks.nextPath || '')}
        >
          Chương Sau
        </button>
      </div>
    </Layout>
  );
}
