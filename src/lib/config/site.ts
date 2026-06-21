export const siteConfig = {
  name: 'insd blog',
  description: 'MDX로 작성하는 개인 블로그입니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  author: {
    name: '황인성',
    email: 'me@insd.dev',
  },
};

export function getSiteUrl() {
  return siteConfig.url.replace(/\/$/, '');
}
