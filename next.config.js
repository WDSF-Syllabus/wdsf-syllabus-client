/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => [
    {
      source: "/",
      destination: "/figures",
      permanent: false,
    },
  ],
};

module.exports = nextConfig;
