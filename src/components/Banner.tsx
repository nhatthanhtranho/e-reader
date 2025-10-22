'use client';

import React from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';

interface BannerProps {
  backgroundUrl: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; link: string };
  ctaSecondary?: { label: string; link: string };
}

const Banner: React.FC<BannerProps> = ({
  backgroundUrl,
  title,
  subtitle,
}) => {
  return (
    <section className="relative w-full h-[20vh] md:h-[30vh] lg:h-[40vh] flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundUrl}
          alt="Banner background"
          fill
          className="object-cover object-center brightness-75"
          priority

        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-2 md:mb-4">
          {title}
        </h1>
        <p className="md:text-3xl text-lg tracking-wide font-bold text-yellow-400 mb-8">{subtitle}</p>

        <SearchBar />
      </div>
    </section>
  );
};

export default Banner;
