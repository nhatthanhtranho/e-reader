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

  // ✅ Click ra ngoài để đóng popup
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
      {visibleTags.map((tag, i) => (
        <span
          key={tag + i}
          className="inline-block bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 shadow-sm"
        >
          {tag}
        </span>
      ))}

      {hiddenTags.length > 0 && (
        <div ref={popupRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMore((prev) => !prev);
            }}
            className={`inline-flex items-center justify-center bg-sky-100 text-sky-700 
                       border border-sky-200 rounded-full text-sm font-semibold 
                       px-3 py-1 mr-2 mb-2 shadow-sm hover:bg-sky-200 
                       transition-colors duration-200`}
          >
            +{hiddenTags.length}
          </button>

          {showMore && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[110%] z-30
                         bg-white border border-gray-200 rounded-xl shadow-lg 
                         p-3 min-w-[200px] max-w-[260px] 
                         animate-fade-in whitespace-normal"
            >
              <div className="flex flex-wrap gap-2">
                {hiddenTags.map((tag, i) => (
                  <span
                    key={tag + i}
                    className="inline-block bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
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
