import { Article } from "./Article";

export type ReadingBook = Article & {
  maxChapter?: number;
};
