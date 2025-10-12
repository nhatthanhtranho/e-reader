"use client";

import { useEffect, useState } from "react";
import BookListLayout from "@/components/BookListLayout";
import { getReadingBooks } from "@/utils"; // 👉 đường dẫn tùy nơi bạn đặt function
import { ReadingBook } from "../../types/ReadingBook";


export default function ReadingBookSection() {
    const [readingBooks, setReadingBooks] = useState<ReadingBook[]>([]);

    useEffect(() => {
        // ✅ Lấy data khi component mount (client-side)
        const books = getReadingBooks();
        setReadingBooks(books);
    }, []);

    if (readingBooks.length === 0) {
        return null
    }

    return <BookListLayout books={readingBooks} title="Đọc tiếp" />;
}
