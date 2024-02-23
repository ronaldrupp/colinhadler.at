module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: { domains: ["images.prismic.io", "colinhadler.cdn.prismic.io"] },
  i18n: {
    locales: ["de"],
    defaultLocale: "de",
  },
};
