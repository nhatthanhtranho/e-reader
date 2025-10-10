/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostDetailLayout from "@/components/PostDetailLayout";

export default function Page() {
  const { slug } = useParams(); // Lấy slug từ URL
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchMetadata = async () => {
      try {
        const res = await fetch(`/kinh-phat/${slug}/metadata.json`);
        if (!res.ok) throw new Error("Không tìm thấy metadata");
        const data = await res.json();
        setMetadata(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetadata();
  }, [slug]);

  if (!metadata) {
    return <p className="text-center py-10">Đang tải dữ liệu...</p>;
  }

  return (
    <PostDetailLayout
      title={metadata?.title}
      tags={metadata?.tags || []}
      translator={metadata?.dichGia}
      imageSrc={`/kinh-phat/${slug}/banner.webp`}
      description={metadata?.content || "Không có mô tả"}
      chapterList={metadata?.chapters || []}
      chapterPath={`/kinh-phat/${slug}`}
      series={metadata?.series || []}
    />
  );
}
