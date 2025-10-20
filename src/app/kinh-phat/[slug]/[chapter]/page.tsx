import ChapterContentLayout from "@/components/ChapterContentLayout";

export function generateStaticParams() {
  const data = [
    { name: "kinh-quan-the-am-bo-tat-tho-ky", chapter: 7 },
    { name: "kinh-dai-bat-niet-ban-quyen-1", chapter: 23 },
    { name: "kinh-dai-bat-niet-ban-quyen-2", chapter: 9 },
    { name: "kinh-niem-phat-ba-la-mat", chapter: 7 },
    { name: "kinh-duoc-su-luu-ly-bon-nguyen-cong-duc", chapter: 1 },
    { name: "kinh-bat-dai-nhan-giac", chapter: 1 },
    { name: "kinh-bat-chu-tam-muoi", chapter: 18 },
    { name: "kinh-dai-thua-duyen-sinh", chapter: 1 },
    { name: "kinh-phat-danh-ton-thang-da-la-ni", chapter: 3 },
    { name: "kinh-phap-hoa", chapter: 28 },
    { name: "kinh-dia-tang", chapter: 14 },
    { name: "kinh-vien-giac", chapter: 8 },
    { name: "kinh-kim-cang", chapter: 1 },


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
