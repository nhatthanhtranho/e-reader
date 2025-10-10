const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/<repo-name>",
  assetPrefix: "/<repo-name>/",
  experimental: { appDir: true },
};

export default nextConfig;
