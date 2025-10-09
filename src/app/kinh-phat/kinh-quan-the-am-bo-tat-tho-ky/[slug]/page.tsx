// app/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/[slug]/page.tsx
'use client'

import ChapterContentLayout from "@/components/ChapterContentLayout";
import { useParams } from "next/navigation";

export default function ChapterSlugPage() {
    const params = useParams();
    const slug = params?.slug; // slug từ URL
    const chapterPath = `/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/${slug}.txt`;
    const MAX_CHAPTER = 7

    return (
        <ChapterContentLayout chapterLink={chapterPath} canGoNext={true} canGoPrev={true}/>
    );
}
