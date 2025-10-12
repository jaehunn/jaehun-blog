export const siteConfig = {
  name: 'Jaehun',
  description: "Jaehun's blog.",
  url: 'https://jaehun.dev',
  locale: 'ko_KR',
  keywords: ['Jaehun', 'frontend developer', 'web developer', 'next.js'],
  author: {
    name: 'Jaehun',
    url: 'https://jaehun.dev',
  },
  links: {
    posts: {
      label: '글',
      url: '/posts',
    },
    // books: {
    //   label: '책',
    //   url: '/books',
    // },
    thinks: {
      label: '생각',
      url: '/thinks',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
