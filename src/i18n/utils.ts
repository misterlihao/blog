import { DEFAULT_LOCALE, LOCALES, type Locale } from '~/config';

/**
 * All URL construction goes through here so the `base` path (`/blog`)
 * lives in exactly one place. Never hand-concatenate `/blog/...` elsewhere.
 */

// Astro injects the configured base (e.g. "/blog"). Normalize to no trailing slash.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix any absolute-from-root path with the site base. */
export function withBase(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}` || '/';
}

/** Build a localized URL: locale + optional sub-path, base-prefixed. */
export function localeUrl(locale: Locale, path = ''): string {
  const sub = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const tail = sub ? `/${sub}` : '';
  return withBase(`/${locale}${tail}`);
}

/** Extract the active locale from a URL pathname. Falls back to default. */
export function getLocaleFromUrl(url: URL): Locale {
  const segments = url.pathname.replace(BASE, '').split('/').filter(Boolean);
  const first = segments[0];
  return (LOCALES as string[]).includes(first) ? (first as Locale) : DEFAULT_LOCALE;
}

/**
 * Given the current pathname, return the equivalent path in `target`
 * locale by swapping the locale segment. Works for any mirrored page
 * (home, tags, and shared-slug posts).
 */
export function swapLocaleInPath(url: URL, target: Locale): string {
  const rest = url.pathname.replace(BASE, '').split('/').filter(Boolean);
  if ((LOCALES as string[]).includes(rest[0])) rest[0] = target;
  else rest.unshift(target);
  return withBase('/' + rest.join('/'));
}

export { DEFAULT_LOCALE, LOCALES };
export type { Locale };
