import { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'

import { nanumSquare } from '~/shared/fonts/nanumSquare'
import { defaultMetadata, siteConfig } from '~/shared/config'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu'

import '~/shared/styles/markdown.css'
import '~/shared/styles/global.css'
import { EnvelopeOpenIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

export const metadata = defaultMetadata

export default async function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${nanumSquare.variable} h-full flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="w-full max-w-none mx-auto px-4 py-4">
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="text-xl font-bold flex items-center space-x-2">재훈</span>
                </Link>
              </div>

              <NavigationMenu>
                <NavigationMenuList>
                  {Object.entries(siteConfig.links).map(([key, { label, url }]) => (
                    <NavigationMenuItem key={key}>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href={url}>{label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="w-full max-w-4xl mx-auto px-4 py-6">{children}</div>
        </main>

        <footer className="border-t">
          <div className="w-full max-w-none mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">© 2025 Jaehun. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://github.com/jaehunn"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubLogoIcon className="w-6 h-6" />
                </Link>

                <Link
                  href="https://kr.linkedin.com/in/jaehunn"
                  target="_blank"
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInLogoIcon className="w-6 h-6" />
                </Link>

                <Link
                  href="mailto:qkdwogns98@gmail.com"
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label="Email"
                >
                  <EnvelopeOpenIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
