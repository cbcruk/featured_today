import { format } from 'https://deno.land/std@0.97.0/datetime/mod.ts'
import {
  writeJSON,
  readJSONFromURL,
} from 'https://deno.land/x/flat@0.0.10/mod.ts'

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
    const data = await readJSONFromURL(
      `${API_URL}?country=${country}&start_date=${date}}`
    )
    const newFilename = `./raw_data/${country}/${date}.json`

    await writeJSON(newFilename, data[0])
  } catch (error) {
    console.error(error)
  }
}
