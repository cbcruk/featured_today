import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Body } from '@/components/Body'
import { getDateData } from './utils'
import { RootLayoutProps } from './types'
import './globals.css'

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const { title } = getDateData((await params).date)

  return {
    title: {
      template: `${title} | Featured Today`,
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

async function RootLayout({ children, params }: RootLayoutProps) {
  const { title, defaultDate } = getDateData((await params).date)

  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className="dark:bg-gray-900 dark:text-gray-300">
        <div className="flex flex-col gap-4 max-w-sm p-4 m-auto">
          <Header>
            <Header.Title>{title}</Header.Title>
            <Header.DatePicker defaultMonth={new Date(defaultDate)} />
          </Header>
          <Body>{children}</Body>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
