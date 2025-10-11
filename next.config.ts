/** @type {import('next').NextConfig} */
const isProd = process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/e-reader" : "",
  assetPrefix: isProd ? "/e-reader/" : "",
};

export default nextConfig;
