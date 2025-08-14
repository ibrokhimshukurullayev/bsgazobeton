/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      // "files.glotr.uz",
      // "www.figma.com",
      // "www.google.com",
      // "i0.wp.com",
      "api.bsgazobeton.uz",
    ],
  },
};

export default nextConfig;
