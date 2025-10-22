"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import books from "@/data/books.json";
import { ReadingBook } from "../../types/ReadingBook";
import { formatLink } from "../../utils/formatLink";

/** 🪶 Bỏ dấu tiếng Việt */
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

/** ✨ Highlight phần khớp */
const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const plainText = removeVietnameseTones(text).toLowerCase();
  const plainQuery = removeVietnameseTones(query).toLowerCase();
  const startIndex = plainText.indexOf(plainQuery);
  if (startIndex === -1) return text;
  const endIndex = startIndex + plainQuery.length;

  return (
    <>
      {text.slice(0, startIndex)}
      <span className="bg-primary/20 text-primary font-semibold">
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
        className="w-full border border-border rounded-lg px-4 py-2 text-foreground bg-background focus:ring-2 focus:ring-primary outline-none transition-colors"
      />

      {/* 📘 Kết quả */}
      {showResults && (
        <div className="absolute z-50 w-full bg-background border border-border rounded-lg mt-2 shadow-lg max-h-72 overflow-y-auto transition-colors">
          {results.length > 0 ? (
            <>
              {results.slice(0, 3).map((item) => (
                <div
                  key={item.slug}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 cursor-pointer transition-colors duration-150 border-b border-border last:border-none"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-background">
                    <Image
                      src={`/assets${item.slug}/banner.webp`}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {highlightText(item.title, query)}
                    </p>
                    {item.dichGia && (
                      <p className="text-xs text-secondary line-clamp-1">
                        {highlightText(item.dichGia, query)}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {results.length > 3 && (
                <div
                  onClick={() => {
                    window.location.href = `/tim-kiem?q=${encodeURIComponent(
                      query
                    )}`;
                  }}
                  className="px-4 py-2 text-center text-sm text-primary hover:bg-primary/10 cursor-pointer border-t border-border transition-colors"
                >
                  Xem tất cả {results.length} kết quả »
                </div>
              )}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-secondary">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={formatLink("/icons/empty.png")}
                  width={50}
                  height={50}
                  alt="empty"
                  className="mb-2 opacity-80"
                />
                <p className="text-sm font-medium">Không tìm thấy kết quả</p>
                <p className="text-xs mt-1">
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
