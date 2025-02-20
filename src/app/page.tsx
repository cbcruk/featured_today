import { Stories } from '@/components/Stories'
import { LAST_DATE } from '@/constants'
import { getDateId, getStories } from '@/lib/query'

async function Page() {
  const id = await getDateId(LAST_DATE)
  const stories = await getStories(id)

  return <Stories data={stories} />
}

export default Page
