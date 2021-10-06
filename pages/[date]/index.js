import Wrap from '../../components/Wrap'

function Detail({ data, date }) {
  if (!data) {
    return null
  }

  return <Wrap stories={data.stories} date={date} />
}

export async function getServerSideProps(context) {
  const { date } = context.params
  const target = date || 'data'
  const response = await fetch(
    `https://raw.githubusercontent.com/cbcruk/featured_today/main/raw_data/KR/${target}.json`
  )

  if (response.status === 404) {
    return {
      props: {
        data: null,
      },
    }
  }

  const data = await response.json()

  return {
    props: {
      data,
      date: date || data.date,
    },
  }
}

export default Detail
