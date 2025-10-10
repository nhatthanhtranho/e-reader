/* eslint-disable @typescript-eslint/no-explicit-any */
// components/BookCard.tsx
'use client';

import Image from 'next/image';
import ChapterList from './ChapterList';
import { Article } from '../../types/Article';
import PostCardWithDescription from './PostCard';
import { useRouter } from 'next/navigation';

interface BookCardProps {
  title: string;
  tags: string[];
  translator: string;
  slug: string;
  description: string;
  imageSrc: string;
  chapterPath?: string
  chapterList?: any[]
  series?: Article[]
}

export default function PostDetailLayout({
  title,
  tags,
  translator,
  description,
  imageSrc,
  chapterPath,
  chapterList,
  series,
  slug,
}: BookCardProps) {
  const router = useRouter();
  const latestRead = localStorage.getItem(slug);

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
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => router.push(`${chapterPath}/${chapterList?.[0]?.fileName}`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Đọc từ đầu
            </button>
            <button
              onClick={() => router.push(`${chapterPath}/${latestRead}`)}
              className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer ${latestRead == null ? 'hidden' : ''}`}>

              Đọc tiếp
            </button>
          </div>
        </div>
      </div>
      <div className='mt-10 '>
        <h2 className="uppercase text-xl">DANH SÁCH CHƯƠNG </h2>
        <div className="border-2 border-red-700 w-12 mt-2 mb-6" />
        <ChapterList chapters={(chapterList?.map(item => {
          return {
            name: item.name,
            link: `${chapterPath}/${item.fileName}`
          };
        })) || []} />
      </div>

      {
        series && series.length > 0 && (
          <div className="container mx-auto">
            <div className="mt-8">
              <h2 className="uppercase text-xl">TUYỂN TẬP </h2>
              <div className="border-2 border-red-700 w-12 mt-2 mb-6" />
              <div className="grid lg:grid-cols-4 gap-12">

                {series?.map((article: Article, id) => (
                  <div className="lg:col-span-1" key={article.slug + id}>
                    <PostCardWithDescription
                      urlPrefix={'/kinh-phat'}
                      title={article.title}
                      url={`${article.slug}`}
                      content={article.content}
                      dichGia={article.dichGia}
                      date={article.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
