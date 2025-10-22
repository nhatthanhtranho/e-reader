"use client";

import { useState, useRef, useEffect } from "react";

interface TagListProps {
  tags?: string[];
  maxVisible?: number;
  className?: string;
  onTagClick?: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({
  tags = [],
  maxVisible = 2,
  className = "",
  onTagClick,
}) => {
  const [showMore, setShowMore] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const visibleTags = tags.slice(0, maxVisible);
  const hiddenTags = tags.slice(maxVisible);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    if (showMore) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  if (!tags?.length) return null;

  const TagItem = ({ tag }: { tag: string }) => (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onTagClick?.(tag);
        setShowMore(false);
      }}
      className="inline-block px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2
                 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-bg))]
                 border border-[rgb(var(--color-text)/0.1)]
                 shadow-sm cursor-pointer select-none
                 transition-all duration-200 ease-out
                 hover:bg-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-bg))]
                 hover:shadow-md hover:-translate-y-[1px)]"
    >
      {tag}
    </span>
  );

  return (
    <div className={`relative inline-flex flex-wrap items-center ${className}`}>
      {visibleTags.map((tag, i) => (
        <TagItem key={tag + i} tag={tag} />
      ))}

      {hiddenTags.length > 0 && (
        <div ref={popupRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMore((prev) => !prev);
            }}
            className="inline-flex items-center justify-center px-3 py-1 mr-2 mb-2
                       rounded-full text-sm font-semibold border shadow-sm
                       border-[rgb(var(--color-text)/0.1)]
                       bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-bg))]
                       hover:bg-[rgb(var(--color-accent))] hover:text-[rgb(var(--color-bg))]
                       transition-all duration-200 ease-out select-none"
          >
            +{hiddenTags.length}
          </button>

          {showMore && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[110%] z-30
                         bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))]
                         border border-[rgb(var(--color-text)/0.1)] rounded-xl shadow-xl
                         p-3 min-w-[200px] max-w-[260px]
                         animate-tag-popup whitespace-normal"
            >
              <div className="flex flex-wrap gap-2">
                {hiddenTags.map((tag, i) => (
                  <TagItem key={tag + i} tag={tag} />
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
