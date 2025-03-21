/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    CANISTER_ID_BACKEND: process.env.CANISTER_ID_BACKEND,
    CANISTER_ID_INTERNET_IDENTITY: process.env.CANISTER_ID_INTERNET_IDENTITY,
  },
};

module.exports = nextConfig;
