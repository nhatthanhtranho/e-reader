"use client";

import { useEffect, useMemo, useState } from "react";
import BookListLayout from "@/components/BookListLayout";
import bookList from "@/data/books.json";
import { getReadingBooks } from "@/utils";
import { ReadingBook } from "../../types/ReadingBook";

export default function ExploreBookSection() {
    const [readingBooks, setReadingBooks] = useState<ReadingBook[]>([]);

    useEffect(() => {
        // ✅ Lấy data từ localStorage khi client render
        const books = getReadingBooks();
        setReadingBooks(books);
    }, []);

    const filteredBooks = useMemo(() => {
        if (!readingBooks.length) return bookList; // chưa có dữ liệu => hiển thị tất cả

        const readingSlugs = new Set(readingBooks.map((b) => b.slug));

        // 🔍 Lọc ra các sách chưa đọc hoặc chưa có trong localStorage
        return bookList.filter((book) => !readingSlugs.has(book.slug));
    }, [readingBooks]);

    return <BookListLayout books={filteredBooks} title="Khám Phá" />;
}
