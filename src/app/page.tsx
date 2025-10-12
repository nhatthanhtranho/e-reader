"use client";

import Banner from "@/components/Banner";
import { formatLink } from "../../utils/formatLink";
import Footer from "@/components/Footer";
import ExploreBookSection from "@/sections/ExploreBookSection";
import ReadingBookSection from "@/sections/ReadingBookSection";

export default function Home() {
  return (
    <>
      <Banner
        backgroundUrl={formatLink("/banner.jpg")}
        title="Thanh Tịnh Tạng"
        subtitle="Kho Lưu Trữ Kinh Điển Phật Giáo"
      />
      <ExploreBookSection />
      <div>
        <ReadingBookSection />
      </div>
      <Footer />
    </>
  );
}
