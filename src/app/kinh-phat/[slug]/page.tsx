import PostDetailLayout from "@/components/PostDetailLayout";

export function generateStaticParams() {
  return [
    { slug: "kinh-quan-the-am-bo-tat-tho-ky" },
    { slug: "kinh-dai-bat-niet-ban-quyen-1" },
    { slug: "kinh-dai-bat-niet-ban-quyen-2", },
    { slug: "kinh-niem-phat-ba-la-mat", },
    { slug: "kinh-duoc-su-luu-ly-bon-nguyen-cong-duc" },
    { slug: "kinh-bat-dai-nhan-giac" },
    { slug: "kinh-bat-chu-tam-muoi" },
    { slug: "kinh-dai-thua-duyen-sinh" },
    { slug: "kinh-phat-danh-ton-thang-da-la-ni" },
    { slug: "kinh-phap-hoa" },
    { slug: "kinh-dia-tang" },

  ];
}

export default function Page() {
  return (
    <PostDetailLayout />
  );
}
