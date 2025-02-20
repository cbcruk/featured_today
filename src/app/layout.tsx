import type { Metadata } from 'next'
import { RootLayoutProps } from './types'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: `%s | Featured Today`,
      default: 'Featured Today',
    },
    description: '',
    icons: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
    ],
  }
}

async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className="dark:bg-gray-900 dark:text-gray-300">
        <div className="flex flex-col gap-4 max-w-sm p-4 m-auto">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
