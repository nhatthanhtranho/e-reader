"use client";

import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import CustomSwiper from "@/components/CustomSwiper";
import PostCardWithDescription from "./PostCard";
import { ReadingBook } from "../../types/ReadingBook";


interface ExploreSectionProps {
    title?: string;
    books: ReadingBook[];
}

const BookListLayout: FC<ExploreSectionProps> = ({ title = "Khám phá", books }) => {
    return (
        <div className="container mx-auto px-3 md:px-0">
            <div className="mt-8 mb-8">
                {/* Section Header */}
                <h2 className="uppercase text-3xl font-bold">{title}</h2>
                <div className="border-2 border-red-700 w-12 mt-2 mb-6" />

                {/* ✅ Custom Swiper */}
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
                    {books.map((book) => (
                        <SwiperSlide key={book.slug} className="p-2 h-full">
                            <PostCardWithDescription
                                urlPrefix="/kinh-phat/"
                                title={book.title}
                                url={book.slug}
                                content={book.content}
                                dichGia={book.dichGia}
                                date={book.createdAt}
                            />
                        </SwiperSlide>
                    ))}
                </CustomSwiper>
            </div>
        </div>
    );
};

export default BookListLayout;
