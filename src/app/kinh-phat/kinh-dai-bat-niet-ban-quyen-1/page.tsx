/* eslint-disable @typescript-eslint/no-explicit-any */
// e.g., pages/index.tsx or a component
"use client";
import PostDetailLayout from "@/components/PostDetailLayout";
import { useEffect, useState } from "react";

export default function Page() {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    fetch("/kinh-phat/kinh-dai-bat-niet-ban-quyen-1/metadata.json")
      .then((res) => res.json())
      .then((data) => setMetadata(data));
  }, []);

  return (
    <>
      <PostDetailLayout
        title={metadata?.title}
        tags={metadata?.tags || []}
        translator={metadata?.dichGia}
        imageSrc={`/kinh-phat/kinh-dai-bat-niet-ban-quyen-1/banner.webp`}
        description={metadata?.content || "Không có mô tả"}
        chapterList={metadata?.chapters || []}
        chapterPath={"/kinh-phat/kinh-phat/kinh-dai-bat-niet-ban-quyen-1"}
        series={metadata?.series || []}
      />
    </>
  );    
}
