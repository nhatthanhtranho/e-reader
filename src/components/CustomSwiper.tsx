/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ReactNode, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CustomSwiperProps {
  children: ReactNode;
  withNavigation?: boolean;
  withPagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  spaceBetween?: number;
  breakpoints?: any;
}

export default function CustomSwiper({
  children,
  withNavigation = true,
  withPagination = true,
  autoplay = true,
  loop = true,
  spaceBetween = 20,
  breakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
  },
}: CustomSwiperProps) {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      {withNavigation && (
        <>
          {/* Nút Next */}
          <div
            ref={nextRef}
            className="swiper-button-next w-[40px] h-[40px] translate-x-6 -translate-y-6"
          >
            <svg
              className="w-full h-full text-[#EFBF04] bg-white rounded-full 
              shadow-lg ring-1 ring-gray-200 hover:ring-gray-300 
              hover:shadow-xl transition-all duration-300 p-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Nút Prev */}
          <div
            ref={prevRef}
            className="swiper-button-prev w-[40px] h-[40px] -translate-x-6 -translate-y-6"
          >
            <svg
              className="w-full h-full text-[#EFBF04] bg-white rounded-full 
              shadow-lg ring-1 ring-gray-200 hover:ring-gray-300 
              hover:shadow-xl transition-all duration-300 p-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </>
      )}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={loop}
        autoplay={autoplay ? { delay: 2500, disableOnInteraction: false } : false}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        navigation={
          withNavigation
            ? {
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }
            : undefined
        }
        pagination={
          withPagination
            ? {
              el: paginationRef.current!,
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className} custom-dot"></span>`,
            }
            : undefined
        }
        onBeforeInit={swiper => {
          if (withNavigation && swiper.params.navigation !== false) {
            const nav = swiper.params.navigation as any;
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
          }
          if (withPagination && swiper.params.pagination) {
            const pag = swiper.params.pagination as any;
            pag.el = paginationRef.current;
          }
        }}
      >
        {children}
      </Swiper>

      {withPagination && (
        <div
          ref={paginationRef}
          className="swiper-pagination !static mt-2 md:mt-6 flex justify-center"
        />
      )}
    </div>
  );
}
