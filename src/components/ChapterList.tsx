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
    if (reads) {
      setReadChapters(reads);
    }
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

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredChapters.length / itemsPerPage);

  // Lấy chương hiển thị cho trang hiện tại
  const paginatedChapters = filteredChapters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset về trang đầu khi tìm kiếm thay đổi
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white">
      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm theo số chương, tên chương..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Danh sách chương */}
      {paginatedChapters.length === 0 ? (
        <p className="text-center text-gray-500">Không tìm thấy chương nào.</p>
      ) : (
        <div>
          {paginatedChapters.map((chapter, index) => {
            const isRead = readChapters.some(
              (ch) => chapter.link?.includes(ch) ?? false
            );
            return (
              <div
                key={index}
                className="p-4 border-b border-gray-200 cursor-pointer relative hover:bg-gray-50 transition"
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
                <div className="absolute right-2 w-[25px] h-[25px] text-black">
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
                {chapter.name}
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
            className={`px-4 py-2 rounded border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 border-gray-300 cursor-pointer"
            }`}
          >
            Trang trước
          </button>

          <span className="text-gray-600">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100 border-gray-300 cursor-pointer"
            }`}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}
