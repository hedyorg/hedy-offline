const withTM = require("next-transpile-modules")(["ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/level/en/1/default",
        permanent: true,
      },
    ];
  },
};

module.exports = withTM(nextConfig);
