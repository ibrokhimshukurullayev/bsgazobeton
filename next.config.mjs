/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      { source: "/joylashuv", destination: "/contact", permanent: true },
      { source: "/karzinka", destination: "/cart", permanent: true },
      { source: "/katalog", destination: "/catalog", permanent: true },
      { source: "/sotuvlar", destination: "/sales", permanent: true },
      { source: "/sotuvlar/tolovUsullari", destination: "/sales/payment-methods", permanent: true },
      { source: "/taqqoslash", destination: "/compare", permanent: true },
      { source: "/about/vakansiyalar", destination: "/about/vacancies", permanent: true },
      { source: "/profile/buyurtmalar", destination: "/profile/orders", permanent: true },
      { source: "/services/gazablokmantaji", destination: "/services/gas-block-installation", permanent: true },
      { source: "/aboutGazabeton", destination: "/about-gazobeton", permanent: true },
      { source: "/aboutGazabeton/aboutSinovtest", destination: "/about-gazobeton/tests", permanent: true },
      { source: "/aboutGazabeton/aboutSertifikat", destination: "/about-gazobeton/certificates", permanent: true },
      { source: "/aboutGazabeton/aboutQollanilishi", destination: "/about-gazobeton/applications", permanent: true },
      { source: "/aboutGazabeton/aboutIshlatilishi", destination: "/about-gazobeton/usage-guide", permanent: true },
      { source: "/aboutGazabeton/aboutMaterialardanFarqi", destination: "/about-gazobeton/material-differences", permanent: true },
      { source: "/aboutGazabeton/aboutFaq", destination: "/about-gazobeton/faq", permanent: true },
      { source: "/about/aboutSifat", destination: "/about/quality-control", permanent: true },
      { source: "/about/aboutMijoz", destination: "/about/clients-partners", permanent: true },
      { source: "/about/aboutOAV", destination: "/about/media", permanent: true },
      { source: "/webapp/personalinformation", destination: "/webapp/personal-information", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.bsgazobeton.uz",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
