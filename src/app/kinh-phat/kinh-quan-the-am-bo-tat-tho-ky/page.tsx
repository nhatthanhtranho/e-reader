/* eslint-disable @typescript-eslint/no-explicit-any */
// e.g., pages/index.tsx or a component
"use client";
import PostDetailLayout from "@/components/PostDetailLayout";
import { useEffect, useState } from "react";

export default function Page() {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    fetch("/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/metadata.json")
      .then((res) => res.json())
      .then((data) => setMetadata(data));
  }, []);

  return (
    <>
      <PostDetailLayout
        title={metadata?.title}
        tags={metadata?.tags || []}
        translator={metadata?.dichGia}
        imageSrc={`/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/banner.webp`}
        description={metadata?.content || "Không có mô tả"}
        chapterList={metadata?.chapters || []}
        chapterPath={"/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky"}
        series={metadata?.series || []}
      />
    </>
  );
}
