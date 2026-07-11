// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://unfoldat.github.io',
  base: '/sitetest/',
  build: {
    // 페이지를 디렉터리(/페이지/index.html)가 아닌 파일(/페이지.html)로 출력.
    // 기존 정적 사이트의 상대 링크("센터소개.html")가 그대로 유효하게 유지됨.
    format: 'file',
  },
});
