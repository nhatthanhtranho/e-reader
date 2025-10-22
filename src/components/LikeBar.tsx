"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatLink } from "../../utils/formatLink";

const LikeBar: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Lưu trạng thái "liked" vào localStorage để giữ sau khi reload
  useEffect(() => {
    const saved = localStorage.getItem("liked-post");
    if (saved === "true") setLiked(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("liked-post", liked ? "true" : "false");
  }, [liked]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => !prev);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="like-bar select-none"
    >
      <button
        onClick={handleLikeClick}
        className={`like-button relative w-10 h-10 flex items-center justify-center rounded-full
                    transition-all duration-200 border border-transparent
                    hover:scale-110 active:scale-95
                    ${liked ? "bg-[rgba(var(--accent),0.15)]" : "bg-transparent"}`}
        aria-label="Like this post"
      >
        <Image
          src={
            liked
              ? formatLink("/icons/heart-red.svg")
              : formatLink("/icons/heart.svg")
          }
          alt="Like"
          width={26}
          height={26}
          className={`transition-transform duration-300 ${animating ? "animate-like-ping" : ""
            }`}
        />

        {/* Hiệu ứng glow */}
        {liked && (
          <span className="absolute inset-0 rounded-full bg-[rgb(var(--accent))]/40 blur-md animate-like-glow pointer-events-none" />
        )}
      </button>
    </div>
  );
};

export default LikeBar;
