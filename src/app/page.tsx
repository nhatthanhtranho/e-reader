"use client";
import { useEffect, useState } from "react";
import Settings from "./components/Settings";

export default function Home() {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    fetch("/kinh-quan-the-am-tho-ky/chapter_1.txt")
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);
  return (
    <div className="container mx-auto py-4">
      <Settings />
      <div className="w-[70%] mx-auto">
        {content.split("\n").map((line, i) => (
          <p className="text-lg" key={i}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
