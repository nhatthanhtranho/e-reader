import ChapterList from "@/components/ChapterList";
import Image from "next/image";
import { formatLink } from "../../../utils/formatLink";

interface ListOfChapterProps {
  slug: string;
  chapters: Array<{ name: string; fileName: string }>;
  isOpen: boolean;
  setIsOpen: Function;
}

export default function ListOfChapter({
  chapters,
  slug,
  isOpen,
  setIsOpen,
}: ListOfChapterProps) {
  return (
    <div
      className={`fixed top-0 h-full left-0 w-80 py-4 bg-white shadow-lg text-gray-700 z-20 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative overflow-y-auto h-full">
        <button
          className="absolute top-0 right-2 cursor-pointer transition hover:opacity-70"
          onClick={() => setIsOpen(false)}
        >
          <Image
            width={25}
            height={25}
            src={formatLink("/icons/close.svg")}
            alt="Đóng"
          />
        </button>
        <h2 className="text-2xl pt-2 font-bold text-gray-800 text-center w-[85%] mx-auto">
          Danh sách chương
        </h2>
        <div className="mx-auto w-16 border-gray-800 border-3 my-2"></div>
        <div className="p-2">
          <ChapterList
            slug={slug}
            chapters={
              chapters?.map((item) => {
                return {
                  name: item.name,
                  link: `/kinh-phat/${slug}/${item.fileName}`,
                };
              }) || []
            }
          />
        </div>
      </div>
    </div>
  );
}
