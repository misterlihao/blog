# 寫文章

文章放:`posts/<locale>/<slug>.mdx`,`<locale>` 是 `zh-tw` 或 `ja`。

## 譯本配對(重要)

中日文版用**相同檔名(slug)**互相配對:

```
posts/zh-tw/my-post.mdx   ↔   posts/ja/my-post.mdx
```

- 允許只有單一語言(部分翻譯 OK),語言切換器會自動把缺的那語言變灰。
- slug 跨語言共用,所以**日文文章網址也是英文 slug**(`/ja/posts/my-post`)。
- 加日文版 = 在 `ja/` 下建一個**同名**檔案,不用改任何設定。

## frontmatter

```yaml
---
title: 標題              # 必填
description: 一句話摘要   # 選填,用於列表與 SEO/RSS
pubDate: 2026-07-23      # 必填,YYYY-MM-DD
updatedDate: 2026-07-25  # 選填
tags: [標籤A, 標籤B]      # 選填(中日文各自的標籤,不必對應)
draft: false             # 選填;true 只在 dev 顯示,不會發布
---
```

schema 定義在 `src/content.config.ts`。標題不用寫成 `#` 一級標題(頁面模板會自動渲染)。

## 美化元件

`.mdx` 裡可直接用,**不用 import**(元件清單與用法見 `../components/mdx/CLAUDE.md`):
- 裝飾型:`Callout` `Figure` `Gallery` `Quote` `Columns`/`Col`
- 結構型:`Steps` `Matrix` `Scale` `Term`

**排版平衡原則**:遇到大塊純文字時問兩題——
1. 裡面藏著可列舉/可對比/可排序的結構嗎? → 有 → 用結構型元件攤開。
2. 純論述? → 用 pull-quote(`Quote`)、粗體引導句、小標留白。**別為了圖而圖。**

## 圖片

放 `public/`,引用路徑要帶 base:`/blog/images/x.jpg`。
