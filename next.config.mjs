/** @type {import('next').NextConfig} */
const nextConfig = {
  //: "export",  // <=== enables static exports
  //reactStrictMode: true,
  images: {
    domains: ["flagcdn.com", "randomuser.me", "localhost"], // Allow external images from flagcdn.com
  },
};

export default nextConfig;
