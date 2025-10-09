/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BookCard.tsx
'use client';

import Image from 'next/image';
import ChapterList from './ChapterList';
import { metadata } from '@/app/layout';

interface BookCardProps {
  title: string;
  tags: string[];
  translator: string;
  description: string;
  imageSrc: string;
  onReadFromStart?: () => void;
  onGoToChapters?: () => void;
  chapterPath?: string
  chapterList?: any[]
}

export default function PostDetailLayout({
  title,
  tags,
  translator,
  description,
  imageSrc,
  chapterPath,
  chapterList,
  onReadFromStart,
  onGoToChapters,
}: BookCardProps) {
  return (
    <div className='flex flex-col container mx-auto'>
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden min-h-[50vh]">
        {/* Hình ảnh bên trái */}
        <div className="md:w-1/3 w-full relative h-64 md:h-auto">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* Nội dung bên phải */}
        <div className="md:w-2/3 w-full p-6 flex flex-col gap-4">
          {/* Tag */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Tên truyện */}
          <h2 className="text-2xl font-bold">{title}</h2>

          {/* Dịch giả */}
          <p className="text-gray-600">
            <span className="font-semibold">Dịch giả:</span> {translator}
          </p>

          {/* Description */}
          <p className="text-gray-700 max-w-4xl">{description}</p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={onReadFromStart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Đọc từ đầu
            </button>
            <button
              onClick={onGoToChapters}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Tới danh sách chương
            </button>
          </div>
        </div>
      </div>
      <div className='mt-10 '>
        <ChapterList chapters={(chapterList?.map(item => {
          return {
            name: item.name,
            link: `${chapterPath}/${item.fileName}`
          };
        })) || []} />
      </div>
    </div>
  );
}
