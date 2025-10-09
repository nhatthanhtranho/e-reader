"use client";
import Banner from "@/components/Banner";
import PostCardWithDescription from "@/components/PostCard";
import articles from "@/data/posts.json"
import { Article } from "../../types/Article";

export default function Home() {
    return (
        <>
            <Banner
                backgroundUrl="/banner.jpg"
                title="THANH TỊNH TẠNG"
                subtitle="Kho lưu trữ kinh điển Phật Giáo Việt Nam"
                ctaSecondary={{ label: 'Tư Vấn Ngay', link: 'tel:0913673661' }}
                ctaPrimary={{ label: 'Các Gói Dịch Vụ', link: '#products' }}
            />
            <div className="container mx-auto">
                <div className="mt-8">
                    <h2 className="uppercase text-3xl">Đề xuất mới</h2>
                    <div className="border-2 border-red-700 w-12 mt-2 mb-6" />
                    <div className="grid lg:grid-cols-4">
                        <div className="lg:col-span-1">
                             {articles.map((article: Article) => (
                            <div className="mb-6" key={article.slug}>
                                <PostCardWithDescription
                                    urlPrefix={'/kinh-phat'}
                                    title={article.title}
                                    url={`${article.slug}`}
                                    content={article.content}
                                    dichGia={article.dichGia}
                                    date={article.createdAt}
                                />
                            </div>
                        ))} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}