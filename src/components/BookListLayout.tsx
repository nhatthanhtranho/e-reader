'use client';

import { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import CustomSwiper from '@/components/CustomSwiper';
import PostCardWithDescription from './PostCard';
import { ReadingBook } from '../../types/ReadingBook';
import { getNumberOfChapterAlreadyRead } from '@/utils/localStorage';

type ReadingBookWithProgress = ReadingBook & { progress?: number };

interface ExploreSectionProps {
  title?: string;
  books: ReadingBook[];
  renderProgress?: boolean;
}

const BookListLayout: FC<ExploreSectionProps> = ({
  title = 'Khám phá',
  books,
  renderProgress,
}) => {
  const processedBooks: ReadingBookWithProgress[] = renderProgress
    ? books.map((book) => {
        const readCount = getNumberOfChapterAlreadyRead(book.slug);
        const progress = book.maxChapter
          ? Math.round((readCount / book.maxChapter) * 100)
          : 0;
        return { ...book, progress };
      })
    : books;

  return (
    <div className="container mx-auto px-3 md:px-0">
      <div className="mt-8 mb-8">
        {/* Tiêu đề */}
        <h2 className="uppercase text-3xl font-bold text-foreground">{title}</h2>
        <div
          className="w-12 mt-2 mb-6 border-2"
          style={{ borderColor: 'rgb(var(--color-primary))' }}
        />

        {/* Swiper */}
        <CustomSwiper
          withNavigation
          withPagination
          loop
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
            1600: { slidesPerView: 4 },
          }}
        >
          {processedBooks.map((book) => (
            <SwiperSlide
              key={book.slug}
              className="p-2 flex h-auto items-stretch"
            >
              <PostCardWithDescription
                urlPrefix="/kinh-phat/"
                title={book.title}
                url={book.slug}
                content={book.content}
                dichGia={book.dichGia}
                date={book.createdAt}
                progress={book.progress}
                tags={book.tags}
                isOneChapter={book.maxChapter === 1}
                className="bg-background text-foreground border-border transition-colors"
              />
            </SwiperSlide>
          ))}
        </CustomSwiper>
      </div>
    </div>
  );
};

export default BookListLayout;
