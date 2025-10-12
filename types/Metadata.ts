import { Article } from "./Article";

export interface Metadata {
  title: string;
  slug: string;
  dichGia: string;
  content: string;
  series: Article[];
  createdAt: string;
  description: string;
  tags: string[];
  maxChapter: number;
  chapters: Array<{ name: string; fileName: string }>;
}
