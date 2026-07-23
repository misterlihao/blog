import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One collection holding both languages. Each entry id looks like
 * "zh-tw/my-post" or "ja/my-post" — the first segment is the locale,
 * the rest is the shared slug that pairs translations together.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
