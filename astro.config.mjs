// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Project Pages: served under a base path matching the repo name.
// URL: https://misterlihao.github.io/blog/
export default defineConfig({
  site: 'https://misterlihao.github.io',
  base: '/blog',
  trailingSlash: 'ignore',
  i18n: {
    locales: ['zh-tw', 'ja'],
    defaultLocale: 'zh-tw',
    routing: {
      // Both languages are prefixed (/zh-tw/, /ja/); the bare root
      // is handled by a tiny client-side language-detect redirect.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
});
