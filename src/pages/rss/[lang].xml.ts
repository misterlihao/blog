import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LOCALES, LOCALE_META, type Locale } from '~/config';
import { getPostsByLocale, parseId } from '~/lib/posts';
import { localeUrl } from '~/i18n/utils';

export function getStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.lang as Locale;
  const meta = LOCALE_META[locale];
  const posts = await getPostsByLocale(locale);

  return rss({
    title: meta.title,
    description: meta.tagline || meta.title,
    site: context.site ?? 'https://misterlihao.github.io',
    items: posts.map((post) => {
      const { slug } = parseId(post.id);
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: localeUrl(locale, `posts/${slug}`),
      };
    }),
  });
}
