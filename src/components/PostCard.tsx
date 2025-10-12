"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatLink } from "../../utils/formatLink";
import LikeBar from "./LikeBar";

export interface PropTypes {
  title: string;
  url: string;
  content?: string;
  dichGia?: string;
  date?: string;
  urlPrefix?: string;
  progress?: number;
}

const PostCardWithDescription: React.FC<PropTypes> = ({
  title,
  url,
  content,
  date,
  dichGia,
  urlPrefix,
  progress,
}) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Nếu click bắt nguồn từ nút Like → không chuyển trang
    const target = e.target as HTMLElement;
    if (target.closest(".like-button")) return;

    router.push(formatLink(`${urlPrefix}${url}`));
  };

  const bannerURL = `/assets${url}/banner.webp`;

  return (
    <div
      className="relative flex flex-col cursor-pointer rounded-2xl overflow-hidden shadow-lg
                 bg-gradient-to-b from-white to-gray-50 transition-transform hover:scale-[1.02]
                 group h-full min-h-[480px]"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ảnh banner */}
      <div className="w-full h-60 relative flex-shrink-0 rounded-t-2xl overflow-hidden shadow-inner">
        {progress && (
          <div className="absolute top-2 right-2 z-20 flex flex-col items-center animate-fade-in">
            {/* Label */}
            <div className="relative bg-gray-50 text-gray-700 font-semibold px-2 py-1 rounded-md shadow-md text-sm sm:text-base">
              {progress}%{/* Triangle pointer */}
            </div>
          </div>
        )}

        <Image
          fill
          src={formatLink(bannerURL)}
          alt={title}
          loading="lazy"
          className="object-cover"
        />

        <LikeBar visible={true} />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col justify-between flex-1 p-4 text-gray-700">
        <div>
          <h3 className="font-bold text-xl leading-snug line-clamp-2 text-gray-900">
            {title}
          </h3>

          <div className="flex items-center mt-2 gap-2 text-gray-500 text-xs">
            {dichGia && <p>Dịch giả: {dichGia}</p>}
            <p className="ml-auto">{date}</p>
          </div>

          <p className="text-gray-700 text-base line-clamp-4 mt-3">{content}</p>
        </div>
        <div className="mt-4" />
      </div>
    </div>
  );
};

export default PostCardWithDescription;
