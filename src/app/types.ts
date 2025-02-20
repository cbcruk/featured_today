import { FeaturedDateParams } from './featured/[date]/types'

export type RootLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<FeaturedDateParams>
}>
