export function getNumberOfChapterAlreadyRead(slug: string): number {
  if (typeof window === "undefined") return 0;

  try {
    // ✅ Bỏ ký tự đầu tiên (ví dụ: "/" -> "")
    const key = slug.startsWith("/") ? slug.slice(1) : slug;

    const item = localStorage.getItem(key);
    if (!item) return 0;

    const parsed = JSON.parse(item);

    // ✅ Ensure it's a valid object with `read` array
    if (parsed && Array.isArray(parsed.read)) {
      return parsed.read.length; // ← fix bug: phải là parsed.read.length, không phải parsed.length
    }

    return 0;
  } catch (error) {
    console.error(
      `Error reading progress for slug "${slug}" from localStorage:`,
      error
    );
    return 0;
  }
}
