"use client";

import { useState } from "react";
import books from "@/data/books.json";
import { ReadingBook } from "../../types/ReadingBook";
import { formatLink } from "../../utils/formatLink";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  urlPrefix?: string; // tuỳ chọn, nếu bạn cần thêm prefix cho link
}

export default function SearchBar({
  placeholder = "Tìm kiếm...",
  className = "",
  urlPrefix = "",
}: SearchBarProps) {
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

    const lower = value.toLowerCase();

    const filtered = books.filter((item) => {
      const hasTag =
        Array.isArray(item.tags) &&
        item.tags.some((tag: string) => tag.toLowerCase().includes(lower));

      return (
        item.title.toLowerCase().includes(lower) ||
        item.dichGia?.toLowerCase().includes(lower) ||
        item.content?.toLowerCase().includes(lower) ||
        hasTag
      );
    });

    setResults(filtered);
    setShowResults(true);
  };

  const handleSelect = (item: ReadingBook) => {
    setQuery("");
    setShowResults(false);

    // ✅ Điều hướng thuần HTML
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
            results.map((item) => (
              <div
                key={item.slug}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                {item.dichGia && (
                  <p className="text-xs text-gray-600">{item.dichGia}</p>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">
              ❌ Không tìm thấy kết quả (404)
            </div>
          )}
        </div>
      )}
    </div>
  );
}
