/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ChapterContentLayout from "@/components/ChapterContentLayout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterSlugPage() {
    const params = useParams();
    const slug = params?.slug; // slug từ URL
    const TOTAL_CHAPTER = 7;
    const [metadata, setMetadata] = useState<any>(null);

    useEffect(() => {
        fetch("/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/metadata.json")
            .then((res) => res.json())
            .then((data) => setMetadata(data));
    }, []);
    // Lấy số chương từ slug (hỗ trợ nhiều chữ số)
    const slugNumber = Number(slug?.slice(-1)); // lấy ký tự cuối và parse sang number

    const chapterPath = `/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/${slug}.txt`;

    // Tính next và prev paths
    const canGoPrev = slugNumber > 1;
    const canGoNext = slugNumber < TOTAL_CHAPTER;

    const prevPath = canGoPrev
        ? `/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/chuong-${slugNumber - 1}`
        : null;

    const nextPath = canGoNext
        ? `/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/chuong-${slugNumber + 1}`
        : null;

    return (
        <ChapterContentLayout
            metadata={metadata}
            chapterLink={chapterPath}
            nextLink={nextPath}
            prevLink={prevPath}
            name="kinh-quan-the-am-bo-tat-tho-k"
            currentChapter={slugNumber}
        />
    );
}
