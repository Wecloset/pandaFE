/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "panda-products.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};
