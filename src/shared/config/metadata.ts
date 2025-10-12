import { Metadata } from 'next'
import { siteConfig } from './site'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(','),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name}'s website`,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}/api/og?title=${encodeURIComponent('jaehun dev')}`,
        width: 1200,
        height: 600,
        alt: siteConfig.description,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    shortcut: `${siteConfig.url}/favicon.ico`,
  },
  alternates: {
    types: {
      'application/rss+xml': `${siteConfig.url}/rss.xml`,
    },
  },
}
