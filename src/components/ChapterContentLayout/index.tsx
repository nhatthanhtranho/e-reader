/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { useSettings } from "@/context/SettingContext";
import { useChapterMetadata, useChapterLinks, useChapterContent, useScrollProgress } from "./ChapterHook";
import ChapterHeader from "./ChapterHeader";
import ChapterFooter from "./ChapterFooter";
import ContentEditableSection from "./ContentEditable";
import { useState } from "react";

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

  return (
    <Layout>
      <ChapterHeader
        nextPath={chapterLinks.nextPath}
        prevPath={chapterLinks.prevPath}
        metadata={metadata}
        isOpenList={isOpenList}
        setIsOpenList={setIsOpenList}
      />

      <ContentEditableSection
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
    </Layout>
  );
}
