import PostDetailLayout from "@/components/PostDetailLayout";

export function generateStaticParams() {
  return [
    { slug: "kinh-quan-the-am-bo-tat-tho-ky" },
    { slug: "kinh-dai-bat-niet-ban-quyen-1" },
    { slug: "kinh-dai-bat-niet-ban-quyen-2", },
    { slug: "kinh-niem-phat-ba-la-mat", },
    { slug: "kinh-duoc-su-luu-ly-bon-nguyen-cong-duc" },
    { slug: "kinh-bat-dai-nhan-giac" },
  ];
}

export default function Page() {
  return (
    <PostDetailLayout />
  );
}
