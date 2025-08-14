/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ["files.glotr.uz", "www.figma.com", "www.google.com", "i0.wp.com"],
  },
};

export default nextConfig;
