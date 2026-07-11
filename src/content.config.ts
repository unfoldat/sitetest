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

// 활동사진 컬렉션: alt 필드를 z.string().min(1)로 강제.
// CMS에서 대체텍스트를 비워 저장하면 빌드가 실패한다(스키마 레벨 강제).
// "이미지에 입마개를 씌우지 않는다" 원칙의 실제 구현.
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    alt: z.string().min(1, '대체텍스트는 비워둘 수 없습니다.'),
    body: z.string().optional(),
  }),
});

export const collections = { notice, gallery };
