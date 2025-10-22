"use client";

import Banner from "@/components/Banner";
import { formatLink } from "../../utils/formatLink";
import Footer from "@/components/Footer";
import ExploreBookSection from "@/sections/ExploreBookSection";
import ReadingBookSection from "@/sections/ReadingBookSection";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {

  return (
    <div className="relative">
      <Banner
        backgroundUrl={formatLink("/banner.jpg")}
        title="Thanh Tịnh Tạng"
        subtitle="Kho Lưu Trữ Kinh Điển Phật Giáo"
      />

      <div className="absolute top-0 right-0 p-5">
        <ThemeToggle />
      </div>


      {/* 🔍 Thanh tìm kiếm */}
      <div className="container mx-auto mt-8">
        <SearchBar />
      </div>

      {/* 🧩 Truyền searchQuery xuống các section */}
      <ExploreBookSection />
      <div>
        <ReadingBookSection />
      </div>

      <Footer />
    </div>
  );
}
