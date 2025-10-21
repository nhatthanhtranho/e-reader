"use client";
import Image from "next/image";
import { useState } from "react";
import books from "@/data/books.json";
import { ReadingBook } from "../../types/ReadingBook";
import { formatLink } from "../../utils/formatLink";

/** 🪶 Bỏ dấu tiếng Việt */
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD") // tách chữ và dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

/** ✨ Highlight phần khớp (có xử lý bỏ dấu) */
const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const plainText = removeVietnameseTones(text).toLowerCase();
  const plainQuery = removeVietnameseTones(query).toLowerCase();

  // Nếu không khớp thì trả về text gốc
  const startIndex = plainText.indexOf(plainQuery);
  if (startIndex === -1) return text;

  const endIndex = startIndex + plainQuery.length;

  return (
    <>
      {text.slice(0, startIndex)}
      <span className="bg-teal-100 text-gray-900 font-semibold">
        {text.slice(startIndex, endIndex)}
      </span>
      {text.slice(endIndex)}
    </>
  );
};

export default function SearchBar({
  placeholder = "Tìm kiếm kinh điển...",
  className = "",
  urlPrefix = "",
}: {
  placeholder?: string;
  className?: string;
  urlPrefix?: string;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReadingBook[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setQuery(value);

    if (value.trim() === "") {
      setShowResults(false);
      setResults([]);
      return;
    }

    const normalizedQuery = removeVietnameseTones(value.toLowerCase());

    const filtered = books.filter((item) => {
      const title = removeVietnameseTones(item.title.toLowerCase());
      const dichGia = removeVietnameseTones(item.dichGia?.toLowerCase() || "");
      const content = removeVietnameseTones(item.content?.toLowerCase() || "");
      const tags = (Array.isArray(item.tags) ? item.tags : []).map((t) =>
        removeVietnameseTones(t.toLowerCase())
      );

      const hasTag = tags.some((tag) => tag.includes(normalizedQuery));

      return (
        title.includes(normalizedQuery) ||
        dichGia.includes(normalizedQuery) ||
        content.includes(normalizedQuery) ||
        hasTag
      );
    });

    setResults(filtered);
    setShowResults(true);
  };

  const handleSelect = (item: ReadingBook) => {
    setQuery("");
    setShowResults(false);

    const url = `${urlPrefix}${item.slug}`;
    const finalUrl =
      item.maxChapter === 1
        ? formatLink(`${url}/chuong-1`)
        : formatLink(url);

    window.location.href = finalUrl;
  };

  return (
    <div className={`relative ${className}`}>
      {/* 🔍 Ô input */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* 📘 Kết quả */}
      {showResults && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            <>
              {/* ✅ Hiện tối đa 3 kết quả */}
              {results.slice(0, 3).map((item) => (
                <div
                  key={item.slug}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                >
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {highlightText(item.title, query)}
                  </p>
                  {item.dichGia && (
                    <p className="text-xs text-gray-600 line-clamp-1">
                      {highlightText(item.dichGia, query)}
                    </p>
                  )}
                </div>
              ))}

              {/* 🔗 Nút xem tất cả */}
              {results.length > 3 && (
                <div
                  onClick={() => {
                    window.location.href = `/tim-kiem?q=${encodeURIComponent(
                      query
                    )}`;
                  }}
                  className="px-4 py-2 text-center text-sm text-blue-600 hover:bg-blue-50 cursor-pointer border-t border-gray-200"
                >
                  Xem tất cả {results.length} kết quả »
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={formatLink("/icons/empty.png")}
                  width={50}
                  height={50}
                  alt="empty"
                  className="mb-2 opacity-80"
                />

                <p className="text-sm font-medium text-gray-700">
                  Không tìm thấy kết quả
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Thử nhập từ khóa khác nhé 🌿
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
