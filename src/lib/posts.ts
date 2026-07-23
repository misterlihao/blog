import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Locale } from '~/config';

export type Post = CollectionEntry<'posts'>;

/** Split an entry id ("zh-tw/my-post") into its locale and shared slug. */
export function parseId(id: string): { locale: Locale; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale: locale as Locale, slug: rest.join('/') };
}

const isPublished = (p: Post) =>
  import.meta.env.DEV ? true : !p.data.draft;

/** All posts for a locale, newest first. Drafts hidden in production. */
export async function getPostsByLocale(locale: Locale): Promise<Post[]> {
  const all = await getCollection('posts', isPublished);
  return all
    .filter((p) => parseId(p.id).locale === locale)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/**
 * Which locales have a translation of this slug (published).
 * Powers the language switcher: only real translations are offered.
 */
export async function getAvailableLocales(slug: string): Promise<Locale[]> {
  const all = await getCollection('posts', isPublished);
  const present = new Set(
    all.map((p) => parseId(p.id)).filter((x) => x.slug === slug).map((x) => x.locale),
  );
  return LOCALES.filter((l) => present.has(l));
}

/** Distinct tags for a locale with post counts, sorted by frequency. */
export async function getTags(locale: Locale): Promise<{ tag: string; count: number }[]> {
  const posts = await getPostsByLocale(locale);
  const counts = new Map<string, number>();
  for (const p of posts) {
    for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
