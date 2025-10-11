/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Xuất static HTML
  trailingSlash: true, // Đảm bảo tất cả URL có dấu "/"
  assetPrefix: "/e-reader/", // Prefix cho assets
  images: { unoptimized: true }, // Github Pages không hỗ trợ image optimization
  experimental: { appDir: true }, // Nếu bạn dùng App Router
};

export default nextConfig;
