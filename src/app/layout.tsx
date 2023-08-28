import MainSideNav from '@/components/layouts/MainSideNav'
import './globals.css'
import type {Metadata} from 'next'
import {Plus_Jakarta_Sans} from 'next/font/google'
import Script from 'next/script'
import {Suspense} from 'react'
import Analytics from '@/components/Analytics'

const inter = Plus_Jakarta_Sans({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Free AI Tools Library | AiTools',
  description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
  keywords: ['AI Tools', 'Free AI Tools', 'Free AI Tools Library'],
  authors: [{name: 'Allen Ponce de Leon'}],
  creator: 'Allen Ponce de Leon',
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: 'https://aitools.sh',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://aitools.sh',
    title: 'Free AI Tools Library | AiTools',
    description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
    images: {
      url: '/opengraph-image.jpg',
      alt: 'Free AI Tools Library | AiTools',
    },
  },
  twitter: {
    creator: '@cosmiclasagnadev',
    card: 'summary_large_image',
    title: 'Free AI Tools Library | AiTools',
    description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
    images: {
      url: '/opengraph-image.jpg',
      alt: 'Free AI Tools Library | AiTools',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <Analytics />
        </Suspense>
        <MainSideNav>
          {children}
        </MainSideNav>
      </body>
    </html>
  )
}
