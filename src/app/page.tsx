"use client";
import Settings from "./components/Settings";

export default function Home() {
  return (
    <div className="relative">
      <Settings />

      {/* Nội dung trang */}
      <p className="container mx-auto bg-white py-5 mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        scelerisque fringilla dui, sed tempor lacus fermentum nec. Pellentesque
        et ipsum ullamcorper, mollis urna varius, pellentesque ex. Aliquam
        hendrerit lorem et massa dictum lacinia. Duis vitae ullamcorper libero.
      </p>
    </div>
  );
}
