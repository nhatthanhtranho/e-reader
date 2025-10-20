// components/PostDetailLayout.tsx
"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import ChapterList from "./ChapterList";
import { Article } from "../../types/Article";
import PostCardWithDescription from "./PostCard";
import { Metadata } from "../../types/Metadata";
import {
  fetchMetadata,
  getLocalStorageObjectValue,
  updateReadingBooks,
} from "@/utils";
import { formatLink } from "../../utils/formatLink";
import Footer from "./Footer";
import BackToHomeButton from "./BackToHomeButton";

export default function PostDetailLayout() {
  const { slug } = useParams(); // Lấy slug từ URL
  const router = useRouter();

  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [latestRead, setLatestRead] = useState<string | null>(null);

  // Fetch metadata từ public/kinh-phat/[slug]/metadata.json
  useEffect(() => {
    if (!slug) return;
    fetchMetadata(slug as string, setMetadata);
  }, [slug]);

  // Lấy latestRead từ localStorage (chỉ client-side)
  useEffect(() => {
    if (!slug) return;
    if (typeof window === "undefined") return;
    const latestRead = getLocalStorageObjectValue(slug as string, "latestRead");
    setLatestRead(latestRead as string);
  }, [slug]);

  return (
    <div className="flex flex-col bg-white">
      <div className="flex flex-col container mx-auto">
        <div className="flex flex-col md:flex-row md:shadow-lg rounded-lg overflow-hidden min-h-[50vh]">
          {/* Hình ảnh bên trái */}
          <div className="md:w-1/3 w-full">
            <Image
              src={formatLink(`/assets${metadata?.slug}/banner.webp`)}
              alt={metadata?.title ?? "Kinh Phật"}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>


          {/* Nội dung bên phải */}
          <div className="md:w-2/3 w-full p-6 px-4 flex flex-col gap-3 md:gap-4">
            {/* Tag */}
            <div className="flex flex-wrap gap-2">
              {metadata?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 text-xs font-semibold px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tên truyện */}
            <h2 className="text-2xl font-bold">{metadata?.title}</h2>

            {/* Dịch giả */}
            <p className="text-gray-600">
              <span className="font-semibold">Dịch giả:</span>{" "}
              {metadata?.dichGia}
            </p>

            {/* Description */}
            <p className="text-gray-700 max-w-4xl">{metadata?.content}</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                className="bg-yellow-500 shadow text-gray-50 w-32 py-2 rounded hover:bg-yellow-600 transition cursor-pointer"
                onClick={() => {
                  updateReadingBooks({
                    content: metadata?.content || "",
                    dichGia: metadata?.dichGia || "",
                    slug: metadata?.slug || "",
                    title: metadata?.title || "",
                    createdAt: metadata?.createdAt || "",
                    maxChapter: metadata?.maxChapter || 1,
                  });
                  if (!metadata?.chapters) return;
                  const firstChapter = metadata.chapters[0]?.fileName;
                  if (firstChapter)
                    router.push(`/kinh-phat/${slug}/${firstChapter}`);
                }}
              >
                Đọc từ đầu
              </button>

              <button
                className={`bg-red-600 text-white w-32 py-2 rounded hover:bg-red-700 shadow transition cursor-pointer ${latestRead == null ? "hidden" : ""
                  }`}
                onClick={() => {
                  if (latestRead)
                    updateReadingBooks({
                      content: metadata?.content || "",
                      dichGia: metadata?.dichGia || "",
                      slug: metadata?.slug || "",
                      title: metadata?.title || "",
                      createdAt: metadata?.createdAt || "",
                      maxChapter: metadata?.maxChapter || 1,
                    });
                  router.push(`/kinh-phat/${slug}/${latestRead}`);
                }}
              >
                Đọc tiếp
              </button>

              <BackToHomeButton />

            </div>
          </div>
        </div>

        {/* Danh sách chương */}
        <div className="md:mt-10 px-4">
          <h2 className="uppercase text-xl">DANH SÁCH CHƯƠNG</h2>
          <div className="border-2 border-red-700 w-12 mt-2 mb-6" />
          {metadata?.chapters && metadata.chapters.length > 0 && (
            <ChapterList
              slug={slug as string}
              chapters={metadata.chapters.map((item) => ({
                name: item.name,
                link: `/kinh-phat/${slug}/${item.fileName}`,
              }))}
            />
          )}
        </div>

        {/* Series / tuyển tập */}
        {metadata?.series && metadata.series.length > 0 && (
          <div className="container mx-auto px-4">
            <div className="mt-8">
              <h2 className="uppercase text-xl font-bold">TUYỂN TẬP</h2>
              <div className="border-2 border-red-700 w-12 mt-2 mb-6" />
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
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
