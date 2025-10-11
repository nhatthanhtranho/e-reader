import { DOCUMENT_PATH } from "@/constants";

export const fetchMetadata = async (slug: string, callback: Function) => {
    try {
        const res = await fetch(`${DOCUMENT_PATH}/${slug}/metadata.json`);
        if (!res.ok) throw new Error("Không tìm thấy metadata");
        const data = await res.json();
        callback(data)
    } catch (err) {
        console.error(err);
    }
};

export const getChapterPath = (slug: string, maxChapter: number, currentChapter: number) => {
    const canGoPrev = currentChapter > 1;
    const canGoNext = currentChapter < maxChapter;
    const prevPath = canGoPrev
        ? `/kinh-phat/${slug}/chuong-${currentChapter - 1}`
        : null;

    const nextPath = canGoNext
        ? `/kinh-phat/${slug}/chuong-${currentChapter + 1}`
        : null;
    const currentPath = `${DOCUMENT_PATH}/${slug}/chuong-${currentChapter}.txt`;
    return {
        nextPath,
        prevPath,
        currentPath
    }

}

export const formatLink = (url: string) => {
    if (process.env.NEXT_PUBLIC_ENV === 'PRODUCTION') {
        return `${process.env.NEXT_PUBLIC_IMG_PATH}${url}`
    }
    return url
}