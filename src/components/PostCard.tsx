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
}

const PostCardWithDescription: React.FC<PropTypes> = ({
  title,
  url,
  content,
  date,
  dichGia,
  urlPrefix,
}) => {
  const router = useRouter();
  const [_hovered, setHovered] = useState(false);

  const handleClick = () => {
    router.push(formatLink(`${urlPrefix}${url}`));
  };

  const bannerURL = `/assets${url}/banner.webp`;

  return (
    <div
      className="relative flex flex-col cursor-pointer rounded-2xl overflow-hidden shadow-lg
                 bg-gradient-to-b from-white to-gray-50 transition-transform hover:scale-[1.02]
                 group h-full min-h-[480px]" // 👈 đảm bảo chiều cao tối thiểu
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hình */}
      <div className="w-full h-60 relative flex-shrink-0 rounded-t-2xl overflow-hidden shadow-inner">
        <div className="absolute top-0 right-3 z-20 flex flex-col items-center">
          <div className="bg-gray-50 text-gray-600 font-bold p-2 flex items-center justify-center">
            70%
          </div>
          <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-t-[12px] border-l-transparent border-r-transparent border-t-gray-50"></div>
        </div>

        <Image
          fill
          src={formatLink(bannerURL)}
          alt={title}
          loading="lazy"
          className="object-cover"
        />

        {/* Overlay LikeBar */}
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

        {/* 👇 Thêm khoảng đệm cuối để các card cân bằng */}
        <div className="mt-4" />
      </div>
    </div>
  );
};

export default PostCardWithDescription;
