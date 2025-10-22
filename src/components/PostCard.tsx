"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatLink } from "../../utils/formatLink";
import LikeBar from "./LikeBar";
import TagList from "./TagList";

export interface PropTypes {
  title: string;
  className?: string
  url: string;
  content?: string;
  dichGia?: string;
  date?: string;
  urlPrefix?: string;
  tags?: string[];
  progress?: number;
  isOneChapter?: boolean;
}

const PostCardWithDescription: React.FC<PropTypes> = ({
  title,
  url,
  content,
  date,
  dichGia,
  urlPrefix,
  progress,
  tags,
  isOneChapter,
  className
}) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".like-button")) return; // tránh click vào LikeBar
    const fullUrl = isOneChapter
      ? formatLink(`${urlPrefix}${url}/chuong-1`)
      : formatLink(`${urlPrefix}${url}`);
    router.push(fullUrl);
  };

  const bannerURL = `/assets${url}/banner.webp`;

  return (
    <div
      className={`
        ${className}
        relative flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden
        border border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-bg)/0.95)] text-[rgb(var(--color-text))]
        shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group
      `}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div className="w-full h-60 relative flex-shrink-0 overflow-hidden rounded-t-2xl">
        {/* Tiến độ đọc */}
        {progress && (
          <div
            className="absolute top-2 right-2 z-20 bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]
                       font-semibold px-2 py-1 rounded-md shadow-md text-sm sm:text-base animate-fade-in"
          >
            {progress}%
          </div>
        )}

        <Image
          fill
          src={formatLink(bannerURL)}
          alt={title}
          loading="lazy"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Like bar */}
        <div className="absolute right-0 bottom-0 z-10">
          <LikeBar />
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex-1">
          {/* Tag list */}
          <TagList tags={tags} maxVisible={2} className="mb-3" />

          {/* Tiêu đề */}
          <h3
            className="
              font-bold text-xl leading-snug line-clamp-2
              text-[rgb(var(--color-text))]
              group-hover:text-[rgb(var(--color-primary))]
              transition-colors duration-300
            "
          >
            {title}
          </h3>

          {/* Thông tin dịch giả & ngày */}
          <div
            className="
              flex items-center mt-2 gap-2 text-xs opacity-70
              text-[rgb(var(--color-text))]
            "
          >
            {dichGia && <p>Dịch giả: {dichGia}</p>}
            <p className="ml-auto">{date}</p>
          </div>

          {/* Mô tả */}
          {content && (
            <p
              className="
                text-[rgb(var(--color-text))] opacity-90 text-base mt-3 line-clamp-4
              "
            >
              {content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardWithDescription;
