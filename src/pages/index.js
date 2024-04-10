import Wrap from '../components/Wrap'

function Home({ data, date }) {
  if (!data) {
    return null
  }

  const { stories } = data

  return <Wrap stories={stories} date={date} />
}

export async function getStaticProps() {
  const response = await fetch(
    'https://raw.githubusercontent.com/cbcruk/featured_today/main/raw_data/KR/data.json'
  )
  const data = await response.json()

  return {
    props: {
      data,
      date: data.date,
    },
  }
}

export default Home
