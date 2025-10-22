"use client";

import { getLocalStorageObjectValue, updateReadingBooks } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { formatLink } from "../../utils/formatLink";
import { Metadata } from "../../types/Metadata";

interface Chapter {
  name: string;
  link?: string;
}

interface ChapterListProps {
  metadata?: Metadata;
  chapters: Chapter[];
  slug: string;
}

export default function ChapterList({
  chapters,
  slug,
  metadata,
}: ChapterListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const reads = getLocalStorageObjectValue<string[]>(slug, "read");
    if (reads) setReadChapters(reads);
  }, [slug]);

  // Lọc chương theo từ khóa
  const filteredChapters = useMemo(() => {
    return chapters.filter((chapter, index) => {
      const chapterNumber = (index + 1).toString();
      return (
        chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapterNumber.includes(searchTerm)
      );
    });
  }, [chapters, searchTerm]);

  const totalPages = Math.ceil(filteredChapters.length / itemsPerPage);
  const paginatedChapters = filteredChapters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div
      className="
        bg-[rgb(var(--color-bg))] 
        text-[rgb(var(--color-text))] 
        rounded-xl 
        shadow-sm 
        border border-[rgb(var(--color-border))] 
        p-4
        transition-colors duration-300
      "
    >
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm theo số chương, tên chương..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="
          w-full mb-4 p-2 rounded-md
          bg-[rgb(var(--color-bg)/0.9)]
          text-[rgb(var(--color-text))]
          border border-[rgb(var(--color-border))]
          focus:outline-none focus:ring-2 
          focus:ring-[rgb(var(--color-primary))]
          transition
        "
      />

      {/* Danh sách chương */}
      {paginatedChapters.length === 0 ? (
        <p className="text-center text-[rgb(var(--color-text)/0.6)]">
          Không tìm thấy chương nào.
        </p>
      ) : (
        <div className="divide-y divide-[rgb(var(--color-border))]">
          {paginatedChapters.map((chapter, index) => {
            const isRead = readChapters.some(
              (ch) => chapter.link?.includes(ch) ?? false
            );
            return (
              <div
                key={index}
                className="
                  relative p-4 cursor-pointer
                  hover:bg-[rgb(var(--color-primary)/0.1)]
                  transition-colors duration-200
                "
                onClick={() => {
                  updateReadingBooks({
                    content: metadata?.content || "",
                    dichGia: metadata?.dichGia || "",
                    slug: metadata?.slug || "",
                    title: metadata?.title || "",
                    maxChapter: metadata?.maxChapter || 1,
                    createdAt: metadata?.createdAt || "",
                  });
                  router.push(chapter.link || "#");
                }}
              >
                <div className="absolute right-2 w-[25px] h-[25px]">
                  <Image
                    fill
                    src={
                      isRead
                        ? formatLink("/icons/complete.png")
                        : formatLink("/icons/not-complete.png")
                    }
                    alt="read status"
                  />
                </div>
                <span
                  className={`${
                    isRead
                      ? "opacity-70 line-through"
                      : "opacity-100"
                  }`}
                >
                  {chapter.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`
              px-4 py-2 rounded border
              border-[rgb(var(--color-border))]
              text-[rgb(var(--color-text))]
              transition
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[rgb(var(--color-primary)/0.1)]"
              }
            `}
          >
            Trang trước
          </button>

          <span className="text-[rgb(var(--color-text)/0.7)]">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`
              px-4 py-2 rounded border
              border-[rgb(var(--color-border))]
              text-[rgb(var(--color-text))]
              transition
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[rgb(var(--color-primary)/0.1)]"
              }
            `}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
