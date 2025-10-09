'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatLink } from '../../utils/formatLink';

export interface PropTypes {
  title: string;
  url: string;
  content?: string;
  dichGia?: string;
  date?: string;
}

const PostCardWithDescription: React.FC<PropTypes> = ({ title, url, content, date, dichGia }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(formatLink(url));
  };
  const bannerURL = `/kinh-phat${url}/banner.webp`;

  return (
    <div
      className="flex flex-col gap-4 cursor-pointer rounded-2xl overflow-hidden shadow-lg 
                 bg-gradient-to-b from-white to-gray-50 transition-transform hover:scale-105"
      onClick={handleClick}
    >
      {/* Hình */}
      <div className="w-full h-60 relative flex-shrink-0 rounded-t-2xl overflow-hidden shadow-inner">
        <Image fill src={bannerURL} alt={title} loading="lazy" className="object-cover" />
      </div>

      {/* Chữ */}
      <div className="flex flex-col justify-start flex-1 text-gray-700 w-full p-4">
        <h3 className="font-bold text-xl leading-snug line-clamp-2 text-gray-900">{title}</h3>

        <div className="flex items-center mt-2 gap-2 text-gray-500 text-xs">
          <p>{date}</p>
          {dichGia && <p className="ml-auto">Dịch giả: {dichGia}</p>}
        </div>

        <p className="text-gray-700 text-base line-clamp-4 mt-3">{content}</p>
      </div>
    </div>
  );
};

export default PostCardWithDescription;
