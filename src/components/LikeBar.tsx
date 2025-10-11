"use client";
import { useState } from "react";
import Image from "next/image";
import { formatLink } from "../../utils/formatLink";

interface LikeBarProps {
  visible?: boolean; // cho phép điều khiển hiển thị từ ngoài (hover)
}

const LikeBar: React.FC<LikeBarProps> = ({ visible = true }) => {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setAnimating(true);

    // reset animation state để có thể lặp lại khi click lại
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-16 flex items-center justify-end px-4
                  bg-gradient-to-t from-black/60 to-transparent text-white 
                  transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
        }`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ❤️ Like button */}
      <div
        onClick={handleLikeClick}
        className={`relative w-10 h-10 flex items-center justify-center rounded-full 
                    cursor-pointer transition-transform duration-200
                    ${animating ? "scale-125" : "scale-100"}`}
      >
        <Image
          src={liked ? formatLink("/icons/heart-red.svg") : formatLink("/icons/heart.svg")}
          alt="Like"
          width={26}
          height={26}
          className={`transition-transform duration-300 ${animating ? "animate-pingOnce" : ""
            }`}
        />

        {/* Hiệu ứng glow khi like */}
        {liked && (
          <span
            className="absolute inset-0 rounded-full bg-red-500/40 blur-md animate-pulseOnce pointer-events-none"
            style={{ zIndex: -1 }}
          />
        )}
      </div>

      {/* Custom keyframes for ping / pulse */}
      <style jsx>{`
        @keyframes pingOnce {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pingOnce {
          animation: pingOnce 0.4s ease-in-out;
        }

        @keyframes pulseOnce {
          0% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.4);
          }
        }

        .animate-pulseOnce {
          animation: pulseOnce 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LikeBar;
