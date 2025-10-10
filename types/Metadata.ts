import { Article } from "./Article";

export interface Metadata {
  title: string;
  slug: string;
  series: Article[];
  chapters: Array<{ name: string; fileName: string }>;
}
