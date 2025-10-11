import { DOCUMENT_PATH } from "@/constants";
import { formatLink } from "../../utils/formatLink";

export const fetchMetadata = async (slug: string, callback: Function) => {
  try {
    const res = await fetch(
      formatLink(`${DOCUMENT_PATH}/${slug}/metadata.json`)
    );
    if (!res.ok) throw new Error("Không tìm thấy metadata");
    const data = await res.json();
    callback(data);
  } catch (err) {
    console.error(err);
  }
};

export const getChapterPath = (
  slug: string,
  maxChapter: number,
  currentChapter: number
) => {
  const canGoPrev = currentChapter > 1;
  const canGoNext = currentChapter < maxChapter;
  const prevPath = canGoPrev
    ? formatLink(`/kinh-phat/${slug}/chuong-${currentChapter - 1}`)
    : null;

  const nextPath = canGoNext
    ? formatLink(`/kinh-phat/${slug}/chuong-${currentChapter + 1}`)
    : null;
  const currentPath = formatLink(
    `${DOCUMENT_PATH}/${slug}/chuong-${currentChapter}.txt`
  );
  return {
    nextPath,
    prevPath,
    currentPath,
  };
};

export function saveObjectKeyToLocalStorage(
  key: string,
  objectKey: string,
  objectValue: string | number
): void {
  try {
    const existing = localStorage.getItem(key);
    const data = existing ? JSON.parse(existing) : {};

    data[objectKey] = objectValue;

    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(
      `❌ Failed to save ${objectKey} to localStorage key "${key}":`,
      error
    );
  }
}

export function addToLocalStorageArray(
  key: string,
  objectKey: string,
  value: string | number
): void {
  try {
    const existing = localStorage.getItem(key);
    const data = existing ? JSON.parse(existing) : {};

    if (!Array.isArray(data[objectKey])) {
      data[objectKey] = [];
    }

    if (!data[objectKey].includes(value)) {
      data[objectKey].push(value);
      localStorage.setItem(key, JSON.stringify(data));
    } else {
    }
  } catch (error) {
    console.error(`❌ Failed to add to ${key}.${objectKey}:`, error);
  }
}

export function getLocalStorageObjectValue<T = string | number | string[]>(key: string, objectKey: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsed = JSON.parse(item);
    if (typeof parsed !== "object" || parsed === null) return null;
    console.log(parsed[objectKey])
    return parsed[objectKey] ?? null;
  } catch (error) {
    console.error(`Error reading key "${objectKey}" from localStorage item "${key}":`, error);
    return null;
  }
}