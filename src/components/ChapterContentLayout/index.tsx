/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { useSettings } from "@/context/SettingContext";
import { useChapterMetadata, useChapterLinks, useChapterContent, useScrollProgress, useTapContinue } from "./ChapterHook";
import ChapterHeader from "./ChapterHeader";
import ChapterFooter from "./ChapterFooter";
import ContentEditableSection from "./ContentEditable";
import { useState, useEffect } from "react";

const Layout = styled.div`
  margin: 0 auto;
  background-color: rgb(var(--color-bg));
  color: rgb(var(--color-text));
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export default function ChapterContentLayout() {
  const params = useParams();
  const slug = params?.slug as string;
  const chapter = params?.chapter as string;
  const match = chapter?.match(/(\d+)$/);
  const currentChapter = match ? Number(match[1]) : 0;

  const { fontSize, width, fontFamily } = useSettings();

  const metadata = useChapterMetadata(slug);
  const chapterLinks = useChapterLinks(slug, metadata, currentChapter);
  const { contentRef, contentHTML } = useChapterContent(chapterLinks.currentPath);
  const progress = useScrollProgress(slug, currentChapter);
  const [isOpenList, setIsOpenList] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Toast message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bật/tắt chế độ edit khi tap
  useTapContinue(contentRef as any, () => {
    setIsEditMode((prev) => !prev);
  });

  // Show toast khi bật chế độ chỉnh sửa
  useEffect(() => {
    if (isEditMode) {
      setToastMessage("Đã bật chế độ chỉnh sửa!");
      const timeout = setTimeout(() => setToastMessage(null), 2000); // 2s tự ẩn
      return () => clearTimeout(timeout);
    }
  }, [isEditMode]);

  return (
    <Layout>
      <ChapterHeader
        nextPath={chapterLinks.nextPath}
        prevPath={chapterLinks.prevPath}
        metadata={metadata}
        isOpenList={isOpenList}
        setIsOpenList={setIsOpenList}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />

      <ContentEditableSection
        isEditMode={isEditMode}
        contentRef={contentRef as any}
        contentHTML={contentHTML}
        fontSize={fontSize}
        width={width}
        fontFamily={fontFamily}
      />

      <ChapterFooter
        nextPath={chapterLinks.nextPath}
        prevPath={chapterLinks.prevPath}
        progress={progress}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-[rgb(var(--color-primary))] text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
          {toastMessage}
        </div>
      )}

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fade-in-out {
          animation: fade-in-out 2s ease forwards;
        }
      `}</style>
    </Layout>
  );
}
