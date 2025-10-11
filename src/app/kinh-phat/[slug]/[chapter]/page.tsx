import ChapterContentLayout from "@/components/ChapterContentLayout";

export function generateStaticParams() {
  const data = [
    { name: "kinh-quan-the-am-bo-tat-tho-ky", chapter: 7 },
    { name: "kinh-dai-bat-niet-ban-quyen-1", chapter: 23 },
  ];
  const params = data.flatMap(({ name, chapter }) =>
    Array.from({ length: chapter }, (_, i) => ({
      slug: name,
      chapter: `chuong-${i + 1}`,
    }))
  );

  return params;
}
export default function ChapterSlugPage() {
  return <ChapterContentLayout />;
}
