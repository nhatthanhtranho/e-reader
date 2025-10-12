import { useEffect } from "react";

export function usePageScrollSave(chapterLink: string, delay = 300) {
  useEffect(() => {
    // load scroll cũ khi mở trang
    const saved = localStorage.getItem("readPositions");
    const obj = saved ? JSON.parse(saved) : {};
    const scrollY = obj[chapterLink] || 0;
    window.scrollTo(0, scrollY);

    // debounce function
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const newObj = JSON.parse(
          localStorage.getItem("readPositions") || "{}"
        );
        newObj[chapterLink] = window.scrollY;
        localStorage.setItem("readPositions", JSON.stringify(newObj));
      }, delay);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [chapterLink, delay]);
}
