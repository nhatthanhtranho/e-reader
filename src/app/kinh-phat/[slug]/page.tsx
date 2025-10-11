import PostDetailLayout from "@/components/PostDetailLayout";

export function generateStaticParams() {
  return [
    { slug: "kinh-quan-the-am-bo-tat-tho-ky" },
    { slug: "kinh-dai-bat-niet-ban-quyen-1" },
    {slug: "kinh-dai-bat-niet-ban-quyen-2",}
  ];
}

export default function Page() {
  return (
    <PostDetailLayout />
  );
}
