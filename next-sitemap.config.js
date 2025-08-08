/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://xn--tschssauto-deb.de', // 🔁 Punycode обязательно
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapBaseFileName: 'sitemap',
  exclude: ['/api/*'],
};
