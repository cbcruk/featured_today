import { Stories } from '@/components/Stories'
import { getDateId, getStories } from '@/lib/query'
import { FeaturedDateParams } from './types'
import { Body } from '@/components/Body'
import { Header } from '@/components/Header'
import { getDateData } from './utils'
import { Metadata } from 'next/types'

type PageProps = {
  params: Promise<FeaturedDateParams>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { date } = await params
  const { title } = getDateData(date)

  return {
    title,
  }
}

async function Page({ params }: PageProps) {
  const { date } = await params
  const id = await getDateId(date)
  const stories = await getStories(id)
  const { title, defaultDate } = getDateData(date)

  return (
    <>
      <Header>
        <Header.Title>{title}</Header.Title>
        <Header.DatePicker defaultMonth={new Date(defaultDate)} />
      </Header>
      <Body>
        <Stories data={stories} />
      </Body>
    </>
  )
}

export default Page
