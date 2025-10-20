export interface Article {
    slug: string;
    title: string;
    content?:string
    dichGia:string;
    createdAt?: string;
    tags?: string[];
}