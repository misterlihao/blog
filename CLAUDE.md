# haoli 的部落格

繁中(`zh-tw`,預設)/ 日文(`ja`)雙語個人部落格。Astro 5 靜態站,發布到 GitHub Pages。
線上:https://misterlihao.github.io/blog/

## 指令

- `npm run dev` — 開發伺服器(http://localhost:4321/blog/)。
  ⚠️ Pagefind 搜尋在 `dev` **沒有索引**,只有 build 後才有。
- `npm run build` — Astro build + Pagefind 索引 → `dist/`
- `npm run preview` — 預覽建置結果(要看搜尋用這個)

## 硬性慣例(違反會壞掉)

- **絕不手寫 `/blog/...` 路徑。** 一律用 `src/i18n/utils.ts` 的 `withBase()` /
  `localeUrl()` / `swapLocaleInPath()`。base path(`/blog`)只存在 `astro.config.mjs` 一處。
- **i18n**:兩語言都加前綴(`/zh-tw/`、`/ja/`)。locale code 是 `zh-tw` 與 `ja`;
  對應的 html lang 是 `zh-Hant-TW` / `ja`(這個 attribute 驅動 CJK 字體選擇,別亂改)。
- **譯本配對**:中日文用**相同 slug(檔名)**配對。允許只有單一語言;語言切換器只顯示
  實際存在的譯本(見 `src/lib/posts.ts` 的 `getAvailableLocales`)。
- **站點識別 / UI 文字 / locale 定義**全部集中在 `src/config.ts` 一處改,不要散落各元件。

## 部署

- 推 `main` → GitHub Actions(`.github/workflows/deploy.yml`)自動建置 + 部署。
  **不要手動推分支或改動 dist。**
- Pages Source = GitHub Actions(`build_type=workflow`);repo 只有 `main` 分支。
- repo 名稱 `blog` = 網址 base path `/blog`。改 repo 名要同步改 `astro.config.mjs` 的 `base`。
- 日後接自訂域名(根目錄、無 base):改 `base`、加 `public/CNAME`。

## 專案地圖

- `src/config.ts` — 站點識別、locale、**所有 UI 文字**
- `src/i18n/utils.ts` — URL / base / locale helpers(**唯一**組 URL 的地方)
- `src/lib/posts.ts` — 文章查詢、譯本配對、標籤彙總
- `src/content.config.ts` — content collection schema
- `src/content/posts/{zh-tw,ja}/` — 文章(**寫文章前先看該資料夾的 CLAUDE.md**)
- `src/components/mdx/` — MDX 元件庫(**改元件前先看該資料夾的 CLAUDE.md**)
- `src/pages/` — 路由:`[lang]` 動態段,每個頁面 `getStaticPaths()` 產生兩語言;
  文章頁 `[lang]/posts/[slug].astro` 用 `<Content components={mdxComponents}>` 注入元件。
- `src/layouts/BaseLayout.astro` — `<head>`、meta/OG、無閃爍深淺色初始化、頁首頁尾外殼
- `src/styles/global.css` — design tokens(CSS 變數)、深淺色、依 lang 分流的 CJK 字體堆疊、prose 樣式

## 環境

- Windows;git remote 用 HTTPS。
