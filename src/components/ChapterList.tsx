'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Chapter {
    name: string;
    link?: string;
}

interface ChapterListProps {
    chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChapters = chapters.filter((chapter, index) => {
        const chapterNumber = (index + 1).toString();
        return (
            chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chapterNumber.includes(searchTerm)
        );
    });

    return (
        <div className="bg-white shadow rounded-lg p-6">
            {/* Search input */}
            <input
                type="text"
                placeholder="Tìm theo số chương, tên chương..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {filteredChapters.length === 0 ? (
                <p className="text-center text-gray-500">Không tìm thấy chương nào.</p>
            ) : (
                <ul>
                    {filteredChapters.map((chapter, index) => (
                        <li
                            key={index}
                            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() =>router.push(chapter.link || '#') }
                        >
                            <div className="font-semibold">
                                {chapter.name}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
