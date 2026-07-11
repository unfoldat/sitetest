import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 공지사항 컬렉션: Sveltia CMS가 커밋하는 md 파일의 타입 계약.
// admin/config.yml의 fields와 이 스키마가 거울처럼 대응해야 함.
const notice = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notice' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['공지', '활동']).default('공지'),
    summary: z.string().optional(),
  }),
});

export const collections = { notice };
