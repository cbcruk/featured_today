import { Stories } from '@/components/Stories'
import { getRandomDate, getStories } from '@/lib/query'
import { Body } from '@/components/Body'
import { Header } from '@/components/Header'
import { getDateData } from './featured/[date]/utils'

async function Page() {
  const random = await getRandomDate()

  if (!random) {
    return null
  }

  const stories = await getStories(random.id)
  const { title, defaultDate } = getDateData(random.date)

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
