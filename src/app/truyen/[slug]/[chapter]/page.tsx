import ChapterContentLayoutSupportMDFormat from "@/components/ChapterContentLayoutSupportMDFormat";

export function generateStaticParams() {
  const data = [
    { name: "nan-doi-vat-pham-cua-ta-co-the-thang-cap", chapter: 500 },


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
  return <ChapterContentLayoutSupportMDFormat />;
}
