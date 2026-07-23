# haoli 的部落格

以 [Astro](https://astro.build) 建置的雙語(繁體中文 / 日本語)個人部落格,透過 GitHub Actions 發布到 GitHub Pages。

- 網址:`https://misterlihao.github.io/blog/`
- 語言:`/blog/zh-tw/`(繁中,預設)、`/blog/ja/`(日文)
- 根目錄 `/blog/` 會依瀏覽器語言自動導向

## 本機開發

```bash
npm install
npm run dev      # http://localhost:4321/blog/
```

> 注意:**全文搜尋(Pagefind)只在正式建置後可用**,`npm run dev` 看不到搜尋結果。
> 要驗證搜尋:`npm run build && npm run preview`。

## 常用指令

| 指令 | 作用 |
|---|---|
| `npm run dev` | 本機開發伺服器 |
| `npm run build` | 建置網站 + 產生 Pagefind 搜尋索引 → `dist/` |
| `npm run preview` | 預覽已建置的網站(含搜尋) |

## 寫一篇新文章

文章放在 `src/content/posts/<語言>/<slug>.mdx`:

```
src/content/posts/
  zh-tw/my-post.mdx     ← 中文版
  ja/my-post.mdx        ← 日文版(檔名相同 = 互為譯本)
```

**配對規則:** 中日文版用**相同檔名(slug)**配對。語言切換器只會顯示實際存在的譯本;
缺譯時,另一語言會在切換器上變灰,不會連到空頁面。允許一篇只有單一語言。

### frontmatter 欄位

```yaml
---
title: 標題              # 必填
description: 一句話摘要   # 選填,用於列表與 SEO
pubDate: 2026-07-22      # 必填(YYYY-MM-DD)
updatedDate: 2026-07-25  # 選填
tags: [標籤A, 標籤B]      # 選填
draft: false             # 選填;true 時只在 dev 顯示,不會發布
---
```

## 美化元件(MDX)

在 `.mdx` 文章裡可直接使用以下元件,**不需要 import**。元件定義在
`src/components/mdx/`,全部會自動套用深/淺色主題與 CJK 字體。

### 裝飾型(圖文、雜記)

```mdx
<Callout type="tip" title="小技巧">內容</Callout>   <!-- type: note | tip | warning -->

<Figure src="/blog/images/x.jpg" alt="說明" caption="圖說" />

<Gallery images={[{src:"/blog/a.jpg"},{src:"/blog/b.jpg"}]} columns={3} />

<Quote cite="出處">引言內容</Quote>

<Columns count={2}>
  <Col>左欄</Col>
  <Col>右欄</Col>
</Columns>
```

### 結構型(方法論、論述)

把散文裡的列舉、對比、光譜變成一眼可掃的視覺:

```mdx
{/* 有序流程 / 階段,自動編號 */}
<Steps>
  <Step title="第一步">說明文字</Step>
  <Step title="第二步">說明文字</Step>
</Steps>

{/* 雙軸矩陣;cells 為 row-major:cells[列][欄] */}
<Matrix
  xAxis="距離 →" yAxis="↑ 用力"
  cols={["小", "大"]}
  rows={["重", "輕"]}
  cells={[["集中而有勁", "又開闊又強"], ["細碎輕巧", "開闊但柔和"]]}
/>

{/* 一維光譜:有序遞進(可預測性、由輕到重的階梯) */}
<Scale from="最可預測" to="最不可預測" items={["重複", "漸變", "刻意無模式"]} />
```

需要一次性特殊排版時,MDX 也允許嵌少量行內 HTML。

圖片放在 `public/`(例如 `public/images/x.jpg`),引用時路徑要帶 base:`/blog/images/x.jpg`。

## 站點設定

所有站點識別、語言、UI 文字集中在 **`src/config.ts`**(標題、作者、tagline、選單文字)。
`base` 路徑與 `site` 網域在 **`astro.config.mjs`**。網址組合一律經由 `src/i18n/utils.ts`
的 `withBase()` / `localeUrl()`,不要在別處手動拼 `/blog/...`。

## 部署到 GitHub Pages

線上網址:**https://misterlihao.github.io/blog/**

### 目前的部署方式(branch deploy)

網站目前由 `gh-pages` 分支發布(Pages Source = Deploy from a branch)。
`gh-pages` 分支放的是**本機建置好的 `dist/`**,含一個 `.nojekyll`(避免 GitHub 用
Jekyll 吃掉 Astro 的 `_astro/` 資源)。

**發布新文章 / 更新** —— 寫完後在專案根目錄跑:

```bash
npm run build
touch dist/.nojekyll
cd dist && git init -b gh-pages && git add -A \
  && git commit -m deploy \
  && git push -f https://github.com/misterlihao/blog.git gh-pages \
  && cd .. && rm -rf dist/.git
```

`main` 分支放原始碼;`gh-pages` 放建置產物。

### 升級成 CI 自動部署(建議,一次性)

專案已備好 `.github/workflows/deploy.yml`,只是目前的 `gh` token 缺 `workflow`
權限、無法推送 workflow 檔。授權後即可改成「推 `main` 就自動建置部署」:

```bash
gh auth refresh -s workflow          # 瀏覽器授權一次
git add .github/workflows/deploy.yml
git commit -m "Enable Pages CI"
git push
# 然後把 Pages Source 切回 GitHub Actions:
gh api -X PUT repos/misterlihao/blog/pages -f build_type=workflow
```

之後就不必再手動推 `gh-pages`。

> repo 名稱 = 網址 base path。若改用其他 repo 名稱,記得同步改 `astro.config.mjs` 的 `base`。
> 日後若接自訂域名(根目錄、無 base),把 `base` 改掉、加 `public/CNAME` 即可。
