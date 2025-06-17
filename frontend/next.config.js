const nextConfig = {
  reactStrictMode: true,
  // Temporarily disable i18n to fix redirect issues
  // i18n: {
  //   locales: ["en", "fr"],
  //   defaultLocale: "en",
  // },
  eslint: {
      ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

