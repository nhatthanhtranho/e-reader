'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import ChapterList from './ChapterList';
import { Article } from '../../types/Article';
import PostCardWithDescription from './PostCard';
import { Metadata } from '../../types/Metadata';
import {
  fetchMetadata,
  getLocalStorageObjectValue,
  updateReadingBooks,
} from '@/utils';
import { formatLink } from '../../utils/formatLink';
import Footer from './Footer';
import BackToHomeButton from './BackToHomeButton';

export default function PostDetailLayout() {
  const { slug } = useParams();
  const router = useRouter();

  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [latestRead, setLatestRead] = useState<string | null>(null);

  // ✅ Fetch metadata
  useEffect(() => {
    if (!slug) return;
    fetchMetadata(slug as string, setMetadata);
  }, [slug]);

  // ✅ Get latestRead from localStorage
  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;
    const latest = getLocalStorageObjectValue(slug as string, 'latestRead');
    setLatestRead(latest as string);
  }, [slug]);

  if (!metadata) return null;

  return (
    <div className="flex flex-col bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] transition-colors duration-300">
      <div className="flex flex-col container mx-auto">
        {/* Thẻ thông tin tổng */}
        <div className="flex flex-col md:flex-row md:shadow-lg rounded-lg overflow-hidden min-h-[50vh] bg-[rgb(var(--color-bg))] border border-[rgb(var(--color-border))] transition-colors">
          {/* Ảnh minh họa */}
          <div className="md:w-1/3 w-full">
            <Image
              src={formatLink(`/assets${metadata.slug}/banner.webp`)}
              alt={metadata.title ?? 'Kinh Phật'}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Nội dung bên phải */}
          <div className="md:w-2/3 w-full p-6 px-4 flex flex-col gap-3 md:gap-4">
            {/* ✅ Tag list theo theme */}
            <div className="flex flex-wrap gap-2">
              {metadata.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium
                             bg-[rgb(var(--color-secondary)/0.2)] text-[rgb(var(--color-secondary))]
                             border border-[rgb(var(--color-border))]
                             hover:bg-[rgb(var(--color-accent)/0.1)] hover:text-[rgb(var(--color-accent))]
                             transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold text-[rgb(var(--color-text))]">
              {metadata.title}
            </h2>

            {/* Dịch giả */}
            <p className="text-[rgb(var(--color-text))]/80">
              <span className="font-semibold">Dịch giả:</span> {metadata.dichGia}
            </p>

            {/* Mô tả */}
            <p className="text-[rgb(var(--color-text))]/90 max-w-4xl">
              {metadata.content}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {/* Nút đọc từ đầu */}
              <button
                className="w-32 py-2 rounded shadow text-sm font-medium
                           bg-[rgb(var(--color-accent))] text-white
                           hover:opacity-90 transition"
                onClick={() => {
                  updateReadingBooks({
                    content: metadata.content || '',
                    dichGia: metadata.dichGia || '',
                    slug: metadata.slug || '',
                    title: metadata.title || '',
                    createdAt: metadata.createdAt || '',
                    maxChapter: metadata.maxChapter || 1,
                  });
                  const firstChapter = metadata.chapters?.[0]?.fileName;
                  if (firstChapter)
                    router.push(`/kinh-phat/${slug}/${firstChapter}`);
                }}
              >
                Đọc từ đầu
              </button>

              {/* Nút đọc tiếp */}
              {latestRead && (
                <button
                  className="w-32 py-2 rounded shadow text-sm font-medium
                             bg-[rgb(var(--color-primary))] text-white
                             hover:opacity-90 transition"
                  onClick={() => {
                    updateReadingBooks({
                      content: metadata.content || '',
                      dichGia: metadata.dichGia || '',
                      slug: metadata.slug || '',
                      title: metadata.title || '',
                      createdAt: metadata.createdAt || '',
                      maxChapter: metadata.maxChapter || 1,
                    });
                    router.push(`/kinh-phat/${slug}/${latestRead}`);
                  }}
                >
                  Đọc tiếp
                </button>
              )}

              <BackToHomeButton />
            </div>
          </div>
        </div>

        {/* Danh sách chương */}
        <div className="md:mt-10 px-4">
          <h2 className="uppercase text-xl font-semibold text-[rgb(var(--color-text))]">
            DANH SÁCH CHƯƠNG
          </h2>
          <div className="border-2 w-12 mt-2 mb-6 border-[rgb(var(--color-accent))]" />
          {metadata.chapters?.length ? (
            <ChapterList
              slug={slug as string}
              chapters={metadata.chapters.map((item) => ({
                name: item.name,
                link: `/kinh-phat/${slug}/${item.fileName}`,
              }))}
            />
          ) : null}
        </div>

        {/* Tuyển tập */}
        {metadata.series?.length ? (
          <div className="container mx-auto px-4">
            <div className="mt-8">
              <h2 className="uppercase text-xl font-bold text-[rgb(var(--color-text))]">
                TUYỂN TẬP
              </h2>
              <div className="border-2 w-12 mt-2 mb-6 border-[rgb(var(--color-accent))]" />
              <div className="grid lg:grid-cols-4 gap-12">
                {metadata.series.map((article: Article, id) => (
                  <div className="lg:col-span-1" key={article.slug + id}>
                    <PostCardWithDescription
                      urlPrefix="/kinh-phat"
                      title={article.title}
                      url={article.slug}
                      content={article.content}
                      dichGia={article.dichGia}
                      date={article.createdAt}
                      className="transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
