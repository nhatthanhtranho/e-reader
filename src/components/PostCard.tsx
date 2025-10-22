'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatLink } from "../../utils/formatLink";
import LikeBar from "./LikeBar";
import TagList from "./TagList";

export interface PropTypes {
  title: string;
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
  isOneChapter
}) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".like-button")) return; // tránh click vào LikeBar
    if (isOneChapter) {
      return router.push(formatLink(`${urlPrefix}${url}/chuong-1`));
    }
    return router.push(formatLink(`${urlPrefix}${url}`));
  };

  const bannerURL = `/assets${url}/banner.webp`;

  return (
    <div
      className="post-card relative flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden
                 shadow-md border border-[rgb(var(--border-color))]
                 bg-[var(--card-bg)] text-[var(--card-text)]
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ảnh banner */}
      <div className="w-full h-60 relative flex-shrink-0 rounded-t-2xl overflow-hidden shadow-inner">
        {progress && (
          <div className="absolute top-2 right-2 z-20 flex flex-col items-center animate-fade-in">
            <div className="relative bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]
                            font-semibold px-2 py-1 rounded-md shadow-md text-sm sm:text-base">
              {progress}%
            </div>
          </div>
        )}

        <Image
          fill
          src={formatLink(bannerURL)}
          alt={title}
          loading="lazy"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-0 bottom-0 z-10">
          <LikeBar />
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex-1">
          <TagList tags={tags} maxVisible={2} className="mb-4" />

          <h3 className="font-bold text-xl leading-snug line-clamp-2 text-[var(--card-text)] group-hover:text-[rgb(var(--accent))] transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center mt-2 gap-2 text-[rgb(var(--color-text))] opacity-80 text-xs">
            {dichGia && <p>Dịch giả: {dichGia}</p>}
            <p className="ml-auto">{date}</p>
          </div>

          <p className="text-[var(--card-text)] text-base line-clamp-4 mt-3 opacity-90">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCardWithDescription;
