/** @type {import('next').NextConfig} */
const nextConfig = {
  //: "export",  // <=== enables static exports
  //reactStrictMode: true,
  images: {
    domains: [
      "flagcdn.com",
      "randomuser.me",
      "localhost",
      "4blueprint.duckdns.org",
    ], // Allow external images from flagcdn.com
  },
};

export default nextConfig;
