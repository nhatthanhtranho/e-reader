"use client";

import Banner from "@/components/Banner";
import PostCardWithDescription from "@/components/PostCard";
import CustomSwiper from "@/components/CustomSwiper";
import articles from "@/data/posts.json";
import { Article } from "../../types/Article";
import { formatLink } from "../../utils/formatLink";
import { SwiperSlide } from "swiper/react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Banner
        backgroundUrl={formatLink("/banner.jpg")}
        title="Thanh Tịnh Tạng"
        subtitle="Kho Lưu Trữ Kinh Điển Phật Giáo"
      />

      <div className="container mx-auto px-3 md:px-0">
        <div className="mt-8 mb-8">
          <h2 className="uppercase text-3xl font-bold">Khám phá</h2>
          <div className="border-2 border-red-700 w-12 mt-2 mb-6" />

          {/* ✅ Dùng CustomSwiper thay vì grid */}
          <CustomSwiper
            withNavigation
            withPagination
            autoplay
            loop
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
              1600: { slidesPerView: 4 },
            }}
          >
            {articles.map((article: Article) => (
              <SwiperSlide key={article.slug} className="p-2 h-full">
                <PostCardWithDescription
                  urlPrefix="/kinh-phat/"
                  title={article.title}
                  url={article.slug}
                  content={article.content}
                  dichGia={article.dichGia}
                  date={article.createdAt}
                />
              </SwiperSlide>
            ))}
          </CustomSwiper>
        </div>
      </div>
      <Footer/>
    </>
  );
}
