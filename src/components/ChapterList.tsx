'use client';

import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

interface Chapter {
    name: string;
    link?: string;
}

interface ChapterListProps {
    chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

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
        <div className="bg-white shadow rounded-lg p-6">
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
                <ul>
                    {paginatedChapters.map((chapter, index) => (
                        <li
                            key={index}
                            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition"
                            onClick={() => router.push(chapter.link || '#')}
                        >
                            <div className="font-semibold">{chapter.name}</div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded border ${currentPage === 1
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'hover:bg-gray-100 border-gray-300'
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
                        className={`px-4 py-2 rounded border ${currentPage === totalPages
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'hover:bg-gray-100 border-gray-300'
                            }`}
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
}
