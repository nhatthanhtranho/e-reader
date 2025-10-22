import PostDetailLayout from "@/components/PostDetailLayout";

export function generateStaticParams() {
  return [
    { slug: "nan-doi-vat-pham-cua-ta-co-the-thang-cap" },
  ];
}

export default function Page() {
  return (
    <PostDetailLayout prefix="/truyen"/>
  );
}
