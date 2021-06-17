import { format } from 'https://deno.land/std@0.97.0/datetime/mod.ts'

const API_URL = 'https://sensortower.com/api/ios/featured/today/stories'
const COUNTRIES = [
  'US',
  'AU',
  'CA',
  'CN',
  'FR',
  'DE',
  'GB',
  'IT',
  'KR',
  'JP',
  'RU',
]

const date = format(new Date(), 'yyyy-MM-dd')

for (const country of COUNTRIES) {
  try {
    const response = await fetch(
      `${API_URL}?country=${country}&start_date=${date}}`
    )
    const data = await response.json()
    const newFilename = `./raw_data/${country}/${date}.json`
    const newDataFilename = `./raw_data/${country}/data.json`

    await Deno.writeTextFile(newFilename, JSON.stringify(data[0]))
    await Deno.writeTextFile(newDataFilename, JSON.stringify(data[0]))
  } catch (error) {
    console.error(error)
  }
}
