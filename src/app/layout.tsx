import MainSideNav from '@/components/MainSideNav'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Free AI Tools Library | AiTools',
  description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainSideNav>
          {children}
        </MainSideNav>
      </body>
    </html>
  )
}
