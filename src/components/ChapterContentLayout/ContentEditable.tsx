"use client";
import { useState } from "react";
import styled from "styled-components";

const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
  outline: none;
  white-space: pre-wrap;
  transition: color 0.3s ease;
`;

interface Props {
  isEditMode: boolean;
  contentRef: React.RefObject<HTMLDivElement> | null;
  contentHTML: React.RefObject<string>;
  fontSize: number;
  width: number;
  fontFamily: string;
}

export default function ContentEditableSection({
  isEditMode,
  contentRef,
  contentHTML,
  fontSize,
  width,
  fontFamily,
}: Props) {
  const [isModified, setIsModified] = useState(false);

  const handleInput = () => {
    if (!contentRef?.current) return;
    contentHTML.current = contentRef.current.innerHTML;
    setIsModified(true);
  };

  const handleExport = () => {
    const text = contentHTML.current
      .replace(/<p>/g, "")
      .replace(/<\/p>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chapter.txt";
    a.click();
    URL.revokeObjectURL(url);
    setIsModified(false);
  };

  return (
    <>
      <Content
        ref={contentRef}
        contentEditable={isEditMode} // ✅ chỉ cho edit khi bật edit mode
        suppressContentEditableWarning
        className={`py-12 prose max-w-none ${fontFamily} ${
          isEditMode ? "cursor-text" : "cursor-default select-none"
        }`}
        fontSize={fontSize}
        width={width}
        onInput={isEditMode ? handleInput : undefined} // ✅ chỉ lắng nghe khi đang edit
      />
      {isEditMode && isModified && (
        <div className="flex justify-center my-10">
          <button
            className="w-48 py-2 rounded shadow border border-[rgb(var(--color-border))] cursor-pointer bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-accent))]"
            onClick={handleExport}
          >
            Export TXT
          </button>
        </div>
      )}
    </>
  );
}
