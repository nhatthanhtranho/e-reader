"use client";
import { useState, useRef, useEffect } from "react";

interface TagListProps {
  tags?: string[];
  maxVisible?: number;
  className?: string;
}

const TagList: React.FC<TagListProps> = ({
  tags = [],
  maxVisible = 2,
  className = "",
}) => {
  const [showMore, setShowMore] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenTags = tags.slice(maxVisible);

  // ✅ Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    if (showMore) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  if (!tags || tags.length === 0) return null;

  return (
    <div className={`relative inline-flex flex-wrap items-center ${className}`}>
      {/* Tag hiển thị */}
      {visibleTags.map((tag, i) => (
        <span
          key={tag + i}
          className="inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2
                     bg-[rgb(var(--tag-bg))] text-[rgb(var(--tag-text-color))]
                     shadow-sm border border-[rgb(var(--border-color))]
                     transition-transform hover:scale-105 hover:shadow-md
                     hover:bg-[rgb(var(--accent)/0.1)] hover:text-[rgb(var(--accent))]"
        >
          {tag}
        </span>
      ))}

      {/* Nút +X */}
      {hiddenTags.length > 0 && (
        <div ref={popupRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMore((prev) => !prev);
            }}
            className="inline-flex items-center justify-center px-3 py-1 mr-2 mb-2
                       rounded-full text-sm font-semibold border shadow-sm
                       border-[rgb(var(--border-color))]
                       bg-[rgb(var(--tag-bg))] text-[rgb(var(--tag-text-color))]
                       hover:bg-[rgb(var(--accent)/0.1)] hover:text-[rgb(var(--accent))]
                       transition-all duration-200"
          >
            +{hiddenTags.length}
          </button>

          {/* Popup tag ẩn */}
          {showMore && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[110%] z-30
                         bg-[rgb(var(--card-bg))] text-[rgb(var(--card-text))]
                         border border-[rgb(var(--border-color))] rounded-xl shadow-lg
                         p-3 min-w-[200px] max-w-[260px] animate-fade-in whitespace-normal"
            >
              <div className="flex flex-wrap gap-2">
                {hiddenTags.map((tag, i) => (
                  <span
                    key={tag + i}
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium
                               bg-[rgb(var(--tag-bg))] text-[rgb(var(--tag-text-color))]
                               border border-[rgb(var(--border-color))]
                               hover:bg-[rgb(var(--accent)/0.1)] hover:text-[rgb(var(--accent))]
                               transition-transform duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagList;
