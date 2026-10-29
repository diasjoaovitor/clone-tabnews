import '../styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { DefaultLayout } from '@/app/components/layouts/default'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Clone TabNews',
    default: 'Clone TabNews'
  },
  description:
    'Implementação do https://www.tabnews.com.br para o https://curso.dev'
}

const RootLayout = ({ children }: LayoutProps<'/'>) => (
  <html
    lang="pt-BR"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="flex min-h-full flex-col">
      <DefaultLayout>{children}</DefaultLayout>
    </body>
  </html>
)

export default RootLayout
