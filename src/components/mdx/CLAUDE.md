# MDX 元件庫

供文章(`.mdx`)使用的美化元件。分三類:

- **裝飾型**:`Callout` `Figure` `Gallery` `Quote` `Columns` `Col` — 圖文、雜記型內容
- **結構型**:`Steps`/`Step` `Matrix` `Scale` — 把散文裡的列舉/對比/光譜攤成視覺(方法論、論述型內容)
- **inline**:`Term` — 術語高亮 + hover 定義

## 註冊機制(加新元件必讀)

作者在 `.mdx` 裡**不用 import** 就能用這些元件,靠的是:

1. 每個元件是一個 `.astro` 檔
2. `index.ts` 把它們 import 進來、放進 `mdxComponents`
3. `src/pages/[lang]/posts/[slug].astro` 用 `<Content components={mdxComponents} />` 注入

所以**加新元件 = 建 `.astro` + 在 `index.ts` 的 `mdxComponents` 補一筆**,兩步缺一不可。

## 樣式慣例

- **只用 `global.css` 的 CSS 變數**:`--bg` `--bg-subtle` `--fg` `--fg-muted` `--accent`
  `--accent-fg` `--border` `--radius` 等。**不要寫死顏色**,否則深淺色會壞。
- 文字繼承 `--font-body`(已依 `lang` 分流 CJK 字體),不要自己指定字體。
- 響應式:窄螢幕要能塌成單欄或 `overflow-x:auto` 橫向捲動(見 `Matrix`/`Columns`)。
- 元件內的 `<style>` 是 scoped 的;需要作用到 slot 進來的 markdown 時用 `:global(...)`。

## 何時該加新元件

內容有「可列舉 / 可對比 / 可排序」的結構、**且會重複出現**才值得加。
一次性的特殊排版用既有元件組合,或在 MDX 裡嵌少量行內 HTML 即可,不要為單篇文章造元件。

## 各元件 API 摘要

- `<Callout type="note|tip|warning" title>` — 提示框
- `<Figure src alt caption width>` — 圖 + 圖說
- `<Gallery images={[{src,alt}]} columns>` — 相簿
- `<Quote cite>` — pull-quote(也用來給純論述段落當視覺錨點)
- `<Columns count><Col>…</Col></Columns>` — 多欄
- `<Steps><Step title>…</Step></Steps>` — 自動編號流程
- `<Matrix xAxis yAxis cols={[]} rows={[]} cells={[[]]}/>` — 雙軸矩陣(cells 為 row-major)
- `<Scale from to items={[]}/>` — 一維光譜
- `<Term def="...">術語</Term>` — inline 高亮 + tooltip
