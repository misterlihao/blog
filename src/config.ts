/**
 * Single source of truth for site identity and i18n.
 * Change site metadata, locales, or UI strings here — nowhere else.
 */

export const SITE = {
  author: 'haoli',
  // Root domain (no base path); base path lives in astro.config.mjs.
  domain: 'https://misterlihao.github.io',
} as const;

export type Locale = 'zh-tw' | 'ja';

export const DEFAULT_LOCALE: Locale = 'zh-tw';
export const LOCALES: Locale[] = ['zh-tw', 'ja'];

/** Per-locale presentation: html lang attr, switcher label, and site strings. */
export const LOCALE_META: Record<
  Locale,
  {
    /** value for <html lang="..."> — drives CJK font selection */
    htmlLang: string;
    /** label shown in the language switcher */
    label: string;
    /** site title used in <title>, header, OG */
    title: string;
    /** optional tagline; empty string = hero renders without a subtitle */
    tagline: string;
    /** UI microcopy */
    ui: {
      home: string;
      posts: string;
      tags: string;
      search: string;
      allPosts: string;
      noTranslation: string;
      recentPosts: string;
      readMore: string;
      updatedOn: string;
      taggedWith: string;
      backToPosts: string;
      searchPlaceholder: string;
      notFound: string;
      notFoundBody: string;
      goHome: string;
    };
  }
> = {
  'zh-tw': {
    htmlLang: 'zh-Hant-TW',
    label: '中文',
    title: 'haoli 的部落格',
    tagline: '',
    ui: {
      home: '首頁',
      posts: '文章',
      tags: '標籤',
      search: '搜尋',
      allPosts: '所有文章',
      noTranslation: '此篇尚無此語言版本',
      recentPosts: '最新文章',
      readMore: '閱讀全文',
      updatedOn: '更新於',
      taggedWith: '標籤',
      backToPosts: '← 回到文章列表',
      searchPlaceholder: '搜尋文章…',
      notFound: '找不到頁面',
      notFoundBody: '這個網址不存在,或內容已移動。',
      goHome: '回到首頁',
    },
  },
  ja: {
    htmlLang: 'ja',
    label: '日本語',
    title: 'haoli のブログ',
    tagline: '',
    ui: {
      home: 'ホーム',
      posts: '記事',
      tags: 'タグ',
      search: '検索',
      allPosts: 'すべての記事',
      noTranslation: 'この言語版はまだありません',
      recentPosts: '最新の記事',
      readMore: '続きを読む',
      updatedOn: '更新日',
      taggedWith: 'タグ',
      backToPosts: '← 記事一覧へ戻る',
      searchPlaceholder: '記事を検索…',
      notFound: 'ページが見つかりません',
      notFoundBody: 'このURLは存在しないか、内容が移動しました。',
      goHome: 'ホームへ戻る',
    },
  },
};
